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

			// CORRECCIÓN: Añadimos el filtro por idProducto si existe
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

		private void AplicarFiltros(DataTable tblParámetros, StringBuilder fromBuilder, StringBuilder whereBuilder, DynamicParameters parametros, QueryGenerationOptions options, DateTime desde, int? idProducto)
		{
			int paramIndex = 0;
			foreach (DataRow drFila in tblParámetros.Rows)
			{
				string concepto = drFila["Concepto"].ToString();
				string campo = drFila["Campo"].ToString();
				string valores = drFila["Parámetros"].ToString();
				string datoTipo = drFila["Dato"].ToString();
				string sNot = valores.Contains("≠") ? "NOT" : "";
				valores = valores.Replace("≠", "").Replace("=", "");

				// Generar un nombre de parámetro único para cada filtro
				string paramName = $"@p{paramIndex++}";

				// -- Validación de seguridad --
				ValidarNombreDeColumna(campo);

				switch (concepto)
				{
					case "Cuenta":
						// --- INICIO DE LA CORRECCIÓN ---
						if (campo.Equals("RFC", StringComparison.OrdinalIgnoreCase))
						{
							// Lógica especial para el campo RFC
							whereBuilder.Append($" AND RTRIM(LTRIM(C.RFC)) {sNot} IN {paramName} ");
						}
						else
						{
							// Lógica general para los demás campos de 'Cuenta'
							whereBuilder.Append($" AND C.id{campo} {sNot} IN {paramName} ");
						}
						parametros.Add(paramName, valores.Split(','));
						break;

					case "Producto":
						if (!fromBuilder.ToString().Contains(" Y WITH (NOLOCK)"))
						{
							// Asumimos que idProducto existe en el request si se necesita
							//int idProducto = (int)options.IdProducto; // Ajustar según tu DTO
							fromBuilder.Append($" INNER JOIN dbCollection.Y.Producto_{idProducto} Y WITH (NOLOCK) ON C.idCuenta = Y.idcuenta");
						}

						whereBuilder.Append($" AND Y.[{campo}] {sNot} IN @{paramName}");
						parametros.Add(paramName, valores.Split(','));
						break;

					case "Conteos":
						// Esta es la parte más compleja. Implica añadir LEFT JOINs a subconsultas.
						// Este es un ejemplo simplificado del patrón.
						string nombreTabla = campo; // Simplificación, la lógica original es más compleja
						string alias = nombreTabla.Substring(0, 1);
						fromBuilder.Append($" LEFT JOIN (SELECT COUNT(*) Conteo, idCuenta FROM dbCollection..{nombreTabla} WITH (NOLOCK) WHERE idCartera = @IdCartera AND Fecha_Insert >= @Desde GROUP BY idCuenta) {alias} ON C.idCuenta = {alias}.idCuenta");

						whereBuilder.Append($" AND ISNULL({alias}.Conteo, 0) {valores}"); // 'valores' aquí contendría el operador y valor, ej: ">= 1"
						parametros.Add("Desde", desde);
						break;

						// ... Aquí iría la lógica refactorizada para los demás casos ('Fechas', etc.)
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
