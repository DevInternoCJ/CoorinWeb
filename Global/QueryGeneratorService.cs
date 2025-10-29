using Dapper;
using Loki.DTOs.Global;
using Loki.DTOs.Informacion.PagosDTOs;
using Loki.Global.DAOs;
using System.Collections;
using System.Data;
using System.Text;

namespace Loki.Global
{
	public class QueryGeneratorService : IQueryGeneratorService
	{
		// En una implementación final, estas listas de validación podrían venir de configuración
		// para no tenerlas hardcodeadas.
		private readonly HashSet<string> _allowedColumns = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
		{
			"Nivel", "RFC", "Bloqueo", "Situación", "Sucursal", "CausaNoPago", "Gestiones", "Visitas", "Pagos", "Saldo", "Expediente", "120" // <-- Añadir aquí TODAS las columnas permitidas
        };

		private readonly HashSet<string> _allowedOperators = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
		{
			"=", ">", "<", ">=", "<=", "<>", "!=", "IN", "NOT IN", "LIKE"
		};

		private readonly IConsultaConfigDAO _configDAO; // <-- NUEVA DEPENDENCIA

		// Si el servicio necesitara dependencias (ej. para obtener catálogos de la BD),
		// se inyectarían en este constructor.
		public QueryGeneratorService(IConsultaConfigDAO configDAO)
		{
			_configDAO = configDAO; // <-- SE INYECTA
		}


		public async Task<SubQueryResult> GenerarQueryCuentas(string servidor, QueryGenerationOptions options)
		{
			// Si idConsulta es 0, replicamos el comportamiento original: no se genera subconsulta.
			if (options.IdConsulta == 0)
			{
				// Devolvemos un resultado vacío. Los servicios que lo consumen
				// ya están diseñados para no añadir el INNER JOIN si el SQL está vacío.
				return new SubQueryResult();
			}

			var tblParámetros = CrearTablaParametros();
			var tblAgrupar = CrearTablaAgrupar();

			var (dtDesde, idProducto) = await LlenaParametrosConsultaAsync(servidor, options.IdConsulta, tblParámetros, tblAgrupar);

			var parametros = new DynamicParameters();
			var columnas = new ArrayList();

			// CORRECCIÓN: El SELECT ahora incluye idCartera como en el original.
			var selectBuilder = new StringBuilder(" C.idCartera, C.idCuenta");
			var fromBuilder = new StringBuilder(" FROM dbCollection..Cuentas C WITH (NOLOCK) ");
			var whereBuilder = new StringBuilder(" WHERE C.CuentaActiva = 1 AND C.idCartera = @IdCartera ");
			var groupByBuilder = new StringBuilder(); // Este lo usaremos condicionalmente

			parametros.Add("IdCartera", options.IdCartera);

			// CORRECCIÓN: Añadimos el filtro por idProducto si existes
			if (idProducto != null)
			{
				whereBuilder.Append(" AND C.idProducto = @IdProducto ");
				parametros.Add("IdProducto", idProducto);
			}

			AplicarFiltros(tblParámetros, fromBuilder, whereBuilder, parametros, options, dtDesde, idProducto);
			AplicarAgrupaciones(tblAgrupar, selectBuilder, fromBuilder, groupByBuilder, columnas, options, dtDesde, idProducto);

			// CORRECCIÓN: El GROUP BY solo se aplica si no es una consulta de 'Cuentas'
			// Para QueryPagos, options.Resultado será 'Agrupado', pero la lógica original no agrupa la subconsulta.
			// La consulta original NUNCA agrupa en este subquery, así que eliminamos el GROUP BY.
			string finalGroupBy = ""; // <--- Se elimina el GROUP BY

			string sqlFinal = $"SELECT {selectBuilder} {fromBuilder} {whereBuilder} {finalGroupBy}";

			return new SubQueryResult
			{
				Sql = sqlFinal,
				Parameters = parametros,
				Columns = columnas
			};
		}



		#region Métodos Privados de Construcción de Query


		// Dentro de QueryGeneratorService.cs

		private void AplicarFiltros(DataTable tblParámetros, StringBuilder fromBuilder, StringBuilder whereBuilder,
			DynamicParameters parametros, QueryGenerationOptions options, DateTime desde, int? idProducto)
		{
			int paramIndex = 0;
			foreach (DataRow drFila in tblParámetros.Rows)
			{
				string concepto = drFila["Concepto"].ToString();
				string campo = drFila["Campo"].ToString();
				string valores = drFila["Parámetros"].ToString(); // Contiene operadores y valores (ej. ">= 1", "'val1','val2'")
				string datoTipo = drFila["Dato"].ToString();
				string sNot = valores.Contains('≠') ? "NOT" : "";

				// --- INICIO DE LA CORRECCIÓN DE PARÁMETROS ---

				// 1. Genera el nombre del parámetro LIMPIO para Dapper (ej. "p0", "p1")
				string dapperParamName = $"p{paramIndex++}";
				// 2. Genera el nombre del parámetro para usar en el SQL (ej. "@p0", "@p1")
				string sqlParamName = $"@{dapperParamName}";

				// Limpiamos operadores de los valores (para listas IN)
				string valoresLimpios = valores.Replace("=", "").Replace("≠", "");
				var listaValores = valoresLimpios.Split(',');

				// --- FIN DE LA CORRECCIÓN DE PARÁMETROS ---

				// if (!EsNombreDeColumnaValido(campo)) continue; // Comentado según tu solicitud

				switch (concepto)
				{
					case "Cuenta":
						if (campo.Equals("RFC", StringComparison.OrdinalIgnoreCase))
						{
							whereBuilder.Append($" AND RTRIM(LTRIM(C.RFC)) {sNot} IN {sqlParamName} ");
						}
						else
						{
							whereBuilder.Append($" AND C.id{campo} {sNot} IN {sqlParamName} ");
						}
						// Añadimos el nombre LIMPIO (p0) y la lista de valores a Dapper
						parametros.Add(dapperParamName, listaValores);
						break;

					case "Producto":
						if (!fromBuilder.ToString().Contains(" Y WITH (NOLOCK)"))
						{
							// Asumimos que idProducto (del método) es el correcto
							fromBuilder.Append($" INNER JOIN dbCollection.Y.Producto_{idProducto} Y WITH (NOLOCK) ON C.idCuenta = Y.idcuenta");
						}

						// CORREGIDO: Usamos el nombre SQL (@p0)
						whereBuilder.Append($" AND Y.[{campo}] {sNot} IN {sqlParamName}");
						// Añadimos el nombre LIMPIO (p0) y la lista de valores a Dapper
						parametros.Add(dapperParamName, listaValores);
						break;

					case "Conteos":
						// Lógica de conteos (simplificada del original)
						string nombreTabla = campo;
						string alias = nombreTabla.Substring(0, 1);
						string fechaFiltro = $" AND Fecha_Insert >= @Desde ";
						// ... (aquí iría la lógica completa de switch para nombreTabla, alias, fechaFiltro) ...

						if (!fromBuilder.ToString().Contains($" {alias} ON C.idCuenta"))
						{
							fromBuilder.Append($" LEFT JOIN (SELECT COUNT(*) Conteo, idCuenta FROM dbCollection..{nombreTabla} WITH (NOLOCK) WHERE idCartera = @IdCartera AND Fecha_Insert >= @Desde GROUP BY idCuenta) {alias} ON C.idCuenta = {alias}.idCuenta");
						}

						// Refactorización para parametrizar el valor numérico (ej. ">= 1")
						string operador = new string(valores.Where(c => !char.IsDigit(c) && !char.IsWhiteSpace(c)).ToArray()).Trim(); // Extrae ">= "
						string valorNumerico = new string(valores.Where(char.IsDigit).ToArray()); // Extrae "1"

						if (string.IsNullOrEmpty(operador)) operador = "="; // Default
						if (int.TryParse(valorNumerico, out int valNum))
						{
							whereBuilder.Append($" AND ISNULL({alias}.Conteo, 0) {operador} {sqlParamName}");
							parametros.Add(dapperParamName, valNum);
						}

						// Asegurarnos de añadir el parámetro @Desde solo una vez
						if (!parametros.ParameterNames.Contains("Desde"))
						{
							parametros.Add("Desde", desde);
						}
						break;

					case "Fechas": // Lógica de fechas refactorizada para seguridad
						string sColumna = "";
						if (campo == "Activación") sColumna = "Fecha_CambioActivación";
						else if (campo == "Última gestión") sColumna = "FechaÚltimaGestión";
						else if (campo == "Última visita") sColumna = "FechaÚltimaVisita";
						else if (campo == "Último pago") sColumna = "FechaÚltimoPago";
						else if (campo == "Última negociación") sColumna = "FechaÚltimaNegociación";
						else if (campo == "Próximo seguimiento") sColumna = "FechaPróximoSeguimiento";

						if (!string.IsNullOrEmpty(sColumna))
						{
							// Asumimos que 'valores' tiene formato ">= 'YYYY-MM-DD'"
							string opFecha = new(valores.Where(c => c == '=' || c == '<' || c == '>').ToArray());
							string valFecha = valores.Split('\'').Length > 1 ? valores.Split('\'')[1] : "1900-01-01"; // Extrae la fecha

							whereBuilder.Append($" AND C.{sColumna} {opFecha} {sqlParamName}");
							parametros.Add(dapperParamName, valFecha);
						}
						break;
				}
			}
		}

		private void AplicarAgrupaciones(DataTable tblAgrupar, StringBuilder selectBuilder, StringBuilder fromBuilder, StringBuilder groupByBuilder, ArrayList columnas, QueryGenerationOptions options, DateTime desde, int? idProducto)
		{
			bool esDetalle = options.Resultado == TipoResultadoQuery.Detalle;

			foreach (DataRow drFila in tblAgrupar.Rows)
			{
				string concepto = drFila["Concepto"].ToString();
				string campo = drFila["Campo"].ToString();

				// No validamos aquí para replicar el comportamiento original exacto con columnas numéricas
				// ValidarNombreDeColumna(campo);

				switch (concepto)
				{
					case "Cuenta":
						if (campo == "Situación")
						{
							string alias = "SituaciónCuenta";
							selectBuilder.Append($", RIGHT('00' + CONVERT(VARCHAR(3), Situacion.Orden), 2) + ' ' + Situacion.Valor AS '{alias}'");
							if (!fromBuilder.ToString().Contains("ValoresCatálogo Situacion"))
								fromBuilder.Append(" INNER JOIN dbCollection..ValoresCatálogo Situacion ON C.idSituación = Situacion.idValor");
							columnas.Add(alias);
						}
						break;

					case "Producto":
						// El nombre de la columna aquí puede ser numérico (ej. '120')
						selectBuilder.Append($", Y.[{campo}]");
						columnas.Add(campo);
						if (!fromBuilder.ToString().Contains(" Y WITH (NOLOCK)"))
						{
							if (idProducto != null)
							{
								fromBuilder.Append($" INNER JOIN dbCollection.Y.Producto_{idProducto} Y WITH (NOLOCK) ON C.idCuenta = Y.idcuenta");
							}
							else
							{
								fromBuilder.Append($" INNER JOIN dbCollection.Y.Cartera_{options.IdCartera} Y WITH (NOLOCK) ON C.idCuenta = Y.idcuenta");
							}
						}
						break;

					case "Conteos":
						if (campo == "Gestiones")
						{
							string alias = "G";
							selectBuilder.Append($", ISNULL({alias}.Conteo, 0) AS '{campo}'");
							columnas.Add(campo);
							string fechaFiltro = desde.ToString("yyyy-MM-dd");
							string joinClause = $" LEFT JOIN (SELECT COUNT(*) AS Conteo, idCuenta FROM dbCollection..GestionesTelefónicas WITH (NOLOCK) WHERE idCartera = {options.IdCartera} AND Fecha_Insert >= '{fechaFiltro}' GROUP BY idCuenta) {alias} ON C.idCuenta = {alias}.idCuenta";
							if (!fromBuilder.ToString().Contains($" {alias} ON "))
							{
								fromBuilder.Append(joinClause);
							}
						}
						break;

					case "Fechas":
						if (campo == "Activación")
						{
							string alias = "Fecha activación";
							selectBuilder.Append($", C.Fecha_CambioActivación AS '{alias}'");
							columnas.Add(alias);
						}
						break;
				}
			}
		}


		#endregion

		#region Métodos de Seguridad

		private void ValidarNombreDeColumna(string nombreColumna)
		{
			if (!_allowedColumns.Contains(nombreColumna))
			{
				// En producción, esto debería ser logueado como un intento de ataque.
				throw new InvalidOperationException($"Se ha detectado un nombre de columna no permitido: {nombreColumna}");
			}
		}

		private string ValidarOperador(string operador)
		{
			if (!_allowedOperators.Contains(operador))
			{
				throw new InvalidOperationException($"Se ha detectado un operador SQL no permitido: {operador}");
			}
			return operador;
		}

		#endregion

		#region Lógica de Carga de Parámetros (Heredada)
		// Esta sección replica la lógica original para determinar qué filtros y columnas usar.
		// En una evolución del sistema, esto debería venir de una base de datos de configuración.

		private async Task<(DateTime, int?)> LlenaParametrosConsultaAsync(string servidor, int idConsulta, DataTable tblParámetros, DataTable tblAgrupar)
		{
			var config = await _configDAO.GetConsultaConfigAsync(servidor, idConsulta);

			if (config == null)
			{
				return (DateTime.Today.AddMonths(-1), null);
			}

			tblParámetros.Rows.Clear();
			tblAgrupar.Rows.Clear();

			// Se llenan las tablas a partir de los DTOs recibidos
			foreach (var p in config.Parametros)
			{
				tblParámetros.Rows.Add(p.Concepto, p.Campo, p.Valores, p.Parametros, p.Dato);
			}

			foreach (var a in config.Agrupaciones)
			{
				tblAgrupar.Rows.Add(a.Concepto, a.Campo, a.Origen);
			}

			return (config.Desde ?? DateTime.Today.AddMonths(-1), config.IdProducto);
		}


		private DataTable CrearTablaParametros()
		{
			var dt = new DataTable("Parametros");
			dt.Columns.Add("Concepto", typeof(string));
			dt.Columns.Add("Campo", typeof(string));
			dt.Columns.Add("Valores", typeof(string));
			dt.Columns.Add("Parámetros", typeof(string));
			dt.Columns.Add("Dato", typeof(string));
			return dt;
		}

		private DataTable CrearTablaAgrupar()
		{
			var dt = new DataTable("Agrupar");
			dt.Columns.Add("Concepto", typeof(string));
			dt.Columns.Add("Campo", typeof(string));
			dt.Columns.Add("Origen", typeof(string));
			return dt;
		}
		#endregion
	}
}
