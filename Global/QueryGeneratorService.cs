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
			AplicarAgrupaciones(tblAgrupar, selectBuilder, fromBuilder, groupByBuilder, columnas, parametros, options, dtDesde, idProducto); ;

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

				// --- Estandarización de Parámetros ---
				string dapperParamName = $"p{paramIndex++}"; // Nombre limpio para Dapper (ej. "p0")
				string sqlParamName = $"@{dapperParamName}"; // Nombre para el SQL (ej. "@p0")
				string valoresLimpios = valores.Replace("=", "").Replace("≠", "");
				var listaValores = valoresLimpios.Split(',');
				// --- Fin Estandarización ---

				// if (!EsNombreDeColumnaValido(campo)) continue; // Validación

				switch (concepto)
				{
					case "Cuenta":
						// --- Lógica de "Nivel" ---
						if (campo.Equals("Nivel", StringComparison.OrdinalIgnoreCase))
						{
							if (!fromBuilder.ToString().Contains("RelacionesCatálogos R"))
								fromBuilder.Append("\t INNER JOIN dbCollection..RelacionesCatálogos R ON C.idSituación = R.idValor1 \r\n");
							if (!fromBuilder.ToString().Contains("ValoresCatálogo Nivel"))
								fromBuilder.Append("\t INNER JOIN dbCollection..ValoresCatálogo Nivel ON R.idValor2 = Nivel.idValor \r\n");

							whereBuilder.Append($" AND R.idValor2 {sNot} IN {sqlParamName} ");
							whereBuilder.Append("\t AND Nivel.idCatálogo = 4 \r\n");
							parametros.Add(dapperParamName, listaValores);
						}
						// --- Fin Lógica de "Nivel" ---
						else if (campo.Equals("RFC", StringComparison.OrdinalIgnoreCase))
						{
							// El original formateaba los strings, la versión Dapper es más segura
							var rfcList = valoresLimpios.Split(',').Select(s => s.Replace("'", "").Trim());
							whereBuilder.Append($" AND RTRIM(LTRIM(C.RFC)) {sNot} IN {sqlParamName} ");
							parametros.Add(dapperParamName, rfcList);
						}
						else if (campo.Equals("Bloqueo", StringComparison.OrdinalIgnoreCase))
						{
							whereBuilder.Append($" AND C.{campo} {sNot} IN {sqlParamName} ");
							parametros.Add(dapperParamName, listaValores);
						}
						else
						{
							whereBuilder.Append($" AND C.id{campo} {sNot} IN {sqlParamName} ");
							parametros.Add(dapperParamName, listaValores);
						}
						break;

					case "Producto":
						if (idProducto == null && !fromBuilder.ToString().Contains("Y.Cartera_"))
							fromBuilder.Append($"\t INNER JOIN dbCollection.Y.Cartera_{options.IdCartera} Y WITH (NOLOCK) ON C.idCuenta = Y.idcuenta \r\n");
						if (idProducto != null && !fromBuilder.ToString().Contains("Y.Producto_"))
							fromBuilder.Append($"\t INNER JOIN dbCollection.Y.Producto_{idProducto} Y WITH (NOLOCK) ON C.idCuenta = Y.idcuenta \r\n");

						if (datoTipo == "char")
						{
							var charList = valoresLimpios.Split(',').Select(s => s.Replace("'", "").Trim());
							whereBuilder.Append($"\t AND ISNULL(Y.[{campo}], '') {sNot} IN {sqlParamName} \r\n");
							parametros.Add(dapperParamName, charList);
						}
						else if (datoTipo == "int")
						{
							foreach (var valorOp in listaValores)
							{
								string op = new string(valorOp.Where(c => !char.IsDigit(c) && c != '.' && c != '-').ToArray()).Trim();
								if (string.IsNullOrEmpty(op)) op = "=";
								string valNum = new string(valorOp.Where(c => char.IsDigit(c) || c == '.' || c == '-').ToArray());

								if (decimal.TryParse(valNum, out decimal dVal))
								{
									string currentDapperParam = $"p{paramIndex++}";
									whereBuilder.Append($"\t AND CASE WHEN ISNUMERIC(Y.[{campo}]) = 1 THEN CONVERT(MONEY, Y.[{campo}]) ELSE NULL END {op} @{currentDapperParam} \r\n");
									parametros.Add(currentDapperParam, dVal);
								}
							}
						}
						else if (datoTipo == "date")
						{
							foreach (var valorOp in listaValores)
							{
								string op = new string(valorOp.Where(c => c == '=' || c == '<' || c == '>').ToArray());
								if (string.IsNullOrEmpty(op)) op = "=";
								string valFecha = valorOp.Split('\'').Length > 1 ? valorOp.Split('\'')[1] : "1900-01-01";

								if (DateTime.TryParse(valFecha, out DateTime dVal))
								{
									string currentDapperParam = $"p{paramIndex++}";
									whereBuilder.Append($"\t AND CASE WHEN ISDATE(Y.[{campo}]) = 1 THEN CONVERT(DATETIME, Y.[{campo}]) ELSE NULL END {op} @{currentDapperParam} \r\n");
									parametros.Add(currentDapperParam, dVal);
								}
							}
						}
						break;

					case "Conteos":
						string nombreTabla = campo;
						string alias = "";
						string sFecha = " AND Fecha_Insert >= @Desde ";

						// --- Mapeo de Tablas (replicado de ClasesCoorin.cs) ---
						switch (campo)
						{
							case "Gestiones": nombreTabla = "GestionesTelefónicas"; alias = "G"; break;
							case "Visitas": nombreTabla = "GestionesDomiciliarias"; alias = "V"; sFecha = " AND Fecha_Visita >= @Desde "; break;
							case "Comentarios": alias = "M"; break; // 'Comentarios' usa 'GestionesTelefónicas'
							case "Chats": nombreTabla = "GestionesChat"; alias = "H"; break;
							case "Correos": nombreTabla = "CorreosCuentas"; alias = "O"; sFecha = ""; break;
							case "Emails": nombreTabla = "CorreosEnviados"; alias = "CE"; break;
							case "Cartas": nombreTabla = "Accionamientos"; alias = "AC"; sFecha += " AND idAcercamiento = 1604 "; break;
							case "Blasters": nombreTabla = "Accionamientos"; alias = "AB"; sFecha += " AND idAcercamiento = 1605 "; break;
							case "SMSs": nombreTabla = "Accionamientos"; alias = "ASMS"; sFecha += " AND idAcercamiento = 1606 "; break;
							case "Telegramas": nombreTabla = "Accionamientos"; alias = "AT"; sFecha += " AND idAcercamiento = 1608 "; break;
							case "Domicilios": nombreTabla = "Domicilios"; alias = "D"; sFecha = ""; break;
							case "Teléfonos": nombreTabla = "Teléfonos"; alias = "T"; sFecha = ""; break;
							case "Pagos": nombreTabla = "Pagos"; alias = "P"; sFecha = " AND FechaPago >= @Desde "; break;
							case "SumaPagos": nombreTabla = "Pagos"; alias = "SP"; sFecha = " AND FechaPago >= @Desde "; break;
							default: alias = nombreTabla.Substring(0, 1); break;
						}
						// --- Fin Mapeo ---

						string countOrSum = (campo == "SumaPagos") ? "SUM(MontoPago)" : "COUNT(*)";

						if (!fromBuilder.ToString().Contains($" {alias} ON C.idCuenta"))
						{
							fromBuilder.Append($" LEFT JOIN (SELECT {countOrSum} Conteo, idCuenta FROM dbCollection..{nombreTabla} WITH (NOLOCK) WHERE idCartera = @IdCartera {sFecha} GROUP BY idCuenta) {alias} ON C.idCuenta = {alias}.idCuenta \r\n ");
						}

						foreach (var valorOp in listaValores)
						{
							string op = new string(valorOp.Where(c => !char.IsDigit(c) && c != '.').ToArray()).Trim();
							string valNum = new string(valorOp.Where(char.IsDigit).ToArray());

							if (string.IsNullOrEmpty(op)) op = "=";
							if (int.TryParse(valNum, out int valNumInt))
							{
								string currentDapperParam = $"p{paramIndex++}";
								whereBuilder.Append($"\t AND ISNULL({alias}.Conteo, 0) {op} @{currentDapperParam} \r\n");
								parametros.Add(currentDapperParam, valNumInt);
							}
						}

						break;

					case "Fechas":
						string sColumna = "";
						// --- Mapeo de Fechas (replicado de ClasesCoorin.cs) ---
						switch (campo)
						{
							case "Activación": sColumna = "Fecha_CambioActivación"; break;
							case "Última gestión": sColumna = "FechaÚltimaGestión"; break;
							case "Última visita": sColumna = "FechaÚltimaVisita"; break;
							case "Último pago": sColumna = "FechaÚltimoPago"; break;
							case "Última negociación": sColumna = "FechaÚltimaNegociación"; break;
							case "Próximo seguimiento": sColumna = "FechaPróximoSeguimiento"; break;
						}
						// --- Fin Mapeo ---

						if (!string.IsNullOrEmpty(sColumna))
						{
							foreach (var valorOp in listaValores)
							{
								string opFecha = new(valorOp.Where(c => c == '=' || c == '<' || c == '>').ToArray());
								string valFecha = valorOp.Split('\'').Length > 1 ? valorOp.Split('\'')[1] : "1900-01-01";

								if (DateTime.TryParse(valFecha, out DateTime dVal))
								{
									string currentDapperParam = $"p{paramIndex++}";
									whereBuilder.Append($"\t AND C.{sColumna} {opFecha} @{currentDapperParam} \r\n");
									parametros.Add(currentDapperParam, dVal);
								}
							}
						}
						break;
				}
			}
		}

		private void AplicarAgrupaciones(DataTable tblAgrupar, StringBuilder selectBuilder, StringBuilder fromBuilder,
										 StringBuilder groupByBuilder, ArrayList columnas, DynamicParameters parametros,
										 QueryGenerationOptions options, DateTime desde, int? idProducto)
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
							string aliasSituacion = "SituaciónCuenta"; // <-- CORRECCIÓN: Renombrado
							selectBuilder.Append(esDetalle ?
								$"\t ,Situacion.Valor AS '{aliasSituacion}' \r\n " : // <-- CORRECCIÓN
								$"\t ,RIGHT('00' + CONVERT(VARCHAR(3), Situacion.Orden), 2) + ' ' + Situacion.Valor AS '{aliasSituacion}' \r\n "); // <-- CORRECCIÓN

							if (!fromBuilder.ToString().Contains("ValoresCatálogo Situacion"))
								fromBuilder.Append("\t INNER JOIN dbCollection..ValoresCatálogo Situacion ON C.idSituación = Situacion.idValor \r\n");

							groupByBuilder.Append("Situacion.Valor, Situacion.Orden, ");
							columnas.Add(aliasSituacion); // <-- CORRECCIÓN

							if (esDetalle)
							{
								selectBuilder.Append("\t ,SD.Valor AS 'SituaciónDesactivación' \r\n ");
								if (!fromBuilder.ToString().Contains("ValoresCatálogo SD"))
									fromBuilder.Append("\t LEFT JOIN dbCollection..ValoresCatálogo SD ON C.idSituaciónDesactivación = SD.idValor \r\n");
								groupByBuilder.Append("SD.Valor, ");
							}
						}
						else if (campo == "Sucursal")
						{
							selectBuilder.Append("\t ,Sucursal.Valor AS 'Sucursal' \r\n ");
							if (!fromBuilder.ToString().Contains("ValoresCatálogo Sucursal"))
								fromBuilder.Append("\t INNER JOIN dbCollection..ValoresCatálogo Sucursal ON C.idSucursal = Sucursal.idValor \r\n");
							groupByBuilder.Append("Sucursal.Valor, ");
							columnas.Add("Sucursal");
						}
						else if (campo == "Nivel")
						{
							selectBuilder.Append(esDetalle ?
								"\t ,Nivel.Valor AS 'Nivel' \r\n " :
								"\t ,CONVERT(VARCHAR(3),Nivel.Orden) + ' ' + Nivel.Valor AS 'Nivel' \r\n ");

							if (!fromBuilder.ToString().Contains("RelacionesCatálogos R"))
								fromBuilder.Append("\t INNER JOIN dbCollection..RelacionesCatálogos R ON C.idSituación = R.idValor1 \r\n");
							if (!fromBuilder.ToString().Contains("ValoresCatálogo Nivel"))
								fromBuilder.Append("\t INNER JOIN dbCollection..ValoresCatálogo Nivel ON R.idValor2 = Nivel.idValor \r\n");

							// No añadimos el WHERE aquí, se asume que el filtro lo hace si es necesario
							groupByBuilder.Append("Nivel.Valor, Nivel.Orden, ");
							columnas.Add("Nivel");
						}
						else if (campo == "CausaNoPago")
						{
							selectBuilder.Append("\t ,CausaNoPago.Valor AS 'CausaNoPago' \r\n ");
							if (!fromBuilder.ToString().Contains("ValoresCatálogo CausaNoPago"))
								fromBuilder.Append("\t LEFT JOIN dbCollection..ValoresCatálogo CausaNoPago ON C.idCausaNoPago = CausaNoPago.idValor \r\n");
							groupByBuilder.Append("CausaNoPago.Valor, ");
							columnas.Add("CausaNoPago");
						}
						else if (campo == "RFC")
						{
							selectBuilder.Append("\t ,C.RFC \r\n ");
							groupByBuilder.Append("C.RFC, ");
							columnas.Add("RFC");
						}
						else if (campo == "Bloqueo")
						{
							selectBuilder.Append("\t ,CASE WHEN C.Bloqueo = 1 THEN 'Sí' ELSE 'No' END Bloqueo \r\n ");
							groupByBuilder.Append("CASE WHEN C.Bloqueo = 1 THEN 'Sí' ELSE 'No' END, ");
							columnas.Add("Bloqueo");
						}
						break;

					case "Producto":
						selectBuilder.Append($", Y.[{campo}] \r\n ");
						columnas.Add(campo);

						if (idProducto == null && !fromBuilder.ToString().Contains("Y.Cartera_"))
							fromBuilder.Append($"\t INNER JOIN dbCollection.Y.Cartera_{options.IdCartera} Y WITH (NOLOCK) ON C.idCuenta = Y.idcuenta \r\n");
						if (idProducto != null && !fromBuilder.ToString().Contains("Y.Producto_"))
							fromBuilder.Append($"\t INNER JOIN dbCollection.Y.Producto_{idProducto} Y WITH (NOLOCK) ON C.idCuenta = Y.idcuenta \r\n");

						groupByBuilder.Append($"Y.[{campo}], ");
						break;

					case "Conteos":
						string nombreTabla = campo;
						string alias = "";
						string sFecha = " AND Fecha_Insert >= @Desde ";

						// --- Mapeo de Tablas (replicado de ClasesCoorin.cs) ---
						switch (campo)
						{
							case "Gestiones": nombreTabla = "GestionesTelefónicas"; alias = "G"; break;
							case "Visitas": nombreTabla = "GestionesDomiciliarias"; alias = "V"; sFecha = " AND Fecha_Visita >= @Desde "; break;
							case "Comentarios": alias = "M"; break; // 'Comentarios' usa 'GestionesTelefónicas'
							case "Chats": nombreTabla = "GestionesChat"; alias = "H"; break;
							case "Correos": nombreTabla = "CorreosCuentas"; alias = "O"; sFecha = ""; break;
							case "Emails": nombreTabla = "CorreosEnviados"; alias = "CE"; break;
							case "Cartas": nombreTabla = "Accionamientos"; alias = "AC"; sFecha += " AND idAcercamiento = 1604 "; break;
							case "Blasters": nombreTabla = "Accionamientos"; alias = "AB"; sFecha += " AND idAcercamiento = 1605 "; break;
							case "SMSs": nombreTabla = "Accionamientos"; alias = "ASMS"; sFecha += " AND idAcercamiento = 1606 "; break;
							case "Telegramas": nombreTabla = "Accionamientos"; alias = "AT"; sFecha += " AND idAcercamiento = 1608 "; break;
							case "Domicilios": nombreTabla = "Domicilios"; alias = "D"; sFecha = ""; break;
							case "Teléfonos": nombreTabla = "Teléfonos"; alias = "T"; sFecha = ""; break;
							case "Pagos": nombreTabla = "Pagos"; alias = "P"; sFecha = " AND FechaPago >= @Desde "; break;
							case "SumaPagos": nombreTabla = "Pagos"; alias = "SP"; sFecha = " AND FechaPago >= @Desde "; break;
							default: alias = nombreTabla.Substring(0, 1); break;
						}
						// --- Fin Mapeo ---

						columnas.Add(campo);

						// --- Lógica de SumaPagos ---
						if (campo == "SumaPagos")
						{
							// --- CORRECCIÓN ---
							// Este método (GeneraQueryCuentas) SIEMPRE genera una subconsulta de listado (como Resultado.Cuentas),
							// nunca una consulta agregada. Por lo tanto, siempre tomamos el camino no agregado
							// y eliminamos la dependencia del enum 'TipoResultadoQuery.Cuentas' que no existe.
							selectBuilder.Append($"\t ,ISNULL({alias}.Conteo,0) AS '{campo}' \r\n ");
							// --- FIN CORRECCIÓN ---

							if (!fromBuilder.ToString().Contains($" {alias} ON "))
							{
								fromBuilder.Append($"\t LEFT JOIN ( SELECT SUM(MontoPago) Conteo, idCuenta FROM dbCollection..{nombreTabla} WITH (NOLOCK) WHERE idCartera = @IdCartera {sFecha} GROUP BY idCuenta) {alias} ON C.idCuenta = {alias}.idCuenta \r\n ");
							}
						}
						// --- Lógica del resto de Conteos ---
						else
						{
							selectBuilder.Append($"\t ,ISNULL({alias}.Conteo,0) AS '{campo}' \r\n ");
							if (!fromBuilder.ToString().Contains($" {alias} ON "))
							{
								fromBuilder.Append($"\t LEFT JOIN ( SELECT COUNT(*) Conteo, idCuenta FROM dbCollection..{nombreTabla} WITH (NOLOCK) WHERE idCartera = @IdCartera {sFecha} GROUP BY idCuenta) {alias} ON C.idCuenta = {alias}.idCuenta \r\n ");
							}
							groupByBuilder.Append($"{alias}.Conteo, ");
						}

						break;

					case "Fechas":
						string sColumna = "";
						string aliasCol = "";
						// --- Mapeo de Fechas (replicado de ClasesCoorin.cs) ---
						switch (campo)
						{
							case "Activación": sColumna = "Fecha_CambioActivación"; aliasCol = "Fecha activación"; break;
							case "Última gestión": sColumna = "FechaÚltimaGestión"; aliasCol = "Última gestión"; break;
							case "Última visita": sColumna = "FechaÚltimaVisita"; aliasCol = "Última visita"; break;
							case "Último pago": sColumna = "FechaÚltimoPago"; aliasCol = "Último pago"; break;
							case "Última negociación": sColumna = "FechaÚltimaNegociación"; aliasCol = "Última negociación"; break;
							case "Próximo seguimiento": sColumna = "FechaPróximoSeguimiento"; aliasCol = "Próximo seguimiento"; break;
						}
						// --- Fin Mapeo ---

						if (!string.IsNullOrEmpty(sColumna))
						{
							selectBuilder.Append($"\t ,C.{sColumna} AS '{aliasCol}' \r\n ");
							groupByBuilder.Append($"C.{sColumna}, ");
							columnas.Add(aliasCol);

							// --- Lógica Detalle (replicada de ClasesCoorin.cs) ---
							if (esDetalle)
							{
								if (campo == "Última gestión")
								{
									selectBuilder.Append("\t ,EG.Usuario AS 'EjecutivoGestión' \r\n ");
									if (!fromBuilder.ToString().Contains("Ejecutivos EG"))
										fromBuilder.Append("\t LEFT JOIN dbCollection..Ejecutivos EG ON C.idEjecutivoÚltimaGestión = EG.idEjecutivo \r\n");
									columnas.Add("EjecutivoGestión");
								}
								else if (campo == "Última visita")
								{
									selectBuilder.Append("\t ,EV.Usuario AS 'EjecutivoVisita' \r\n ");
									if (!fromBuilder.ToString().Contains("Ejecutivos EV"))
										fromBuilder.Append("\t LEFT JOIN dbCollection..Ejecutivos EV ON C.idEjecutivoÚltimaVisita = EV.idEjecutivo \r\n");
									columnas.Add("EjecutivoVisita");
								}
								else if (campo == "Última negociación")
								{
									selectBuilder.Append("\t ,EN.Usuario AS 'EjecutivoNegociación' \r\n ");
									if (!fromBuilder.ToString().Contains("Ejecutivos EN"))
										fromBuilder.Append("\t LEFT JOIN dbCollection..Ejecutivos EN ON C.idEjecutivoÚltimaNegociación = EN.idEjecutivo \r\n");
									columnas.Add("EjecutivoNegociación");
								}
								else if (campo == "Último pago")
								{
									selectBuilder.Append("\t ,C.MontoÚltimoPago AS 'Monto último pago' \r\n ");
									columnas.Add("Monto último pago");
								}
							}
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
