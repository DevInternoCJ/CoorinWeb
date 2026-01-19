using Dapper;
using Loki.DTOs.Global;
using Loki.DTOs.Procesos.Visitas;
using Loki.Global;
using Loki.Mark.Procesos.Visitas.Consulta.DAOs; // Namespace actualizado
using System.Text;

namespace Loki.Mark.Procesos.Visitas.Consulta.Services
{
    public class ConsultaVisitasService : IConsultaVisitasService
    {
        private readonly IConsultaVisitasDAO _dao;
        private readonly IQueryGeneratorService _queryGenerator;

        public ConsultaVisitasService(IConsultaVisitasDAO dao, IQueryGeneratorService queryGenerator)
        {
            _dao = dao;
            _queryGenerator = queryGenerator;
        }

        public async Task<IEnumerable<dynamic>> ConsultarVisitasAsync(string servidor, ConsultaVisitasRequestDto request)
        {
            var queryOptions = new QueryGenerationOptions { IdConsulta = request.IdConsulta, IdCartera = request.IdCartera };
            var subQueryResult = await _queryGenerator.GenerarQueryCuentas(servidor, queryOptions);

            var parametros = new DynamicParameters();
            parametros.AddDynamicParams(subQueryResult.Parameters);
            parametros.Add("IdCartera", request.IdCartera);
            parametros.Add("FechaDesde", request.FechaDesde);
            parametros.Add("FechaHasta", request.FechaHasta);

            string columnasCC = subQueryResult.Columns.Count > 0
                ? ", " + string.Join(", ", subQueryResult.Columns.Cast<string>().Select(c => $"CC.[{c}]"))
                : "";

            var sb = new StringBuilder();
            sb.AppendLine(ConstruirSelectBase("dbCollection", columnasCC, subQueryResult.Sql));

            if (request.IncluirComplemento)
            {
                sb.AppendLine(" UNION ALL ");
                sb.AppendLine(ConstruirSelectBase("dbComplemento", columnasCC, subQueryResult.Sql));
            }

            sb.AppendLine(" ORDER BY Fecha DESC, Hora DESC ");

            return await _dao.ObtenerVisitasAsync(servidor, sb.ToString(), parametros);
        }

        private string ConstruirSelectBase(string dbName, string columnasCC, string sqlSubQuery)
        {
            var sb = new StringBuilder();
            sb.AppendLine("SELECT V.idCuenta, C.Expediente, V.Fecha_Insert AS Fecha, V.Hora_Insert AS Hora, ");
            sb.AppendLine("E.NombreEjecutivo AS Gestor, R.Valor AS Resultado, V.Comentario, V.Latitud, V.Longitud ");
            sb.AppendLine(columnasCC);
            sb.AppendLine($"FROM {dbName}..Visitas V ");
            sb.AppendLine($"INNER JOIN dbCollection..Cuentas C ON V.idCuenta = C.idCuenta AND V.idCartera = C.idCartera ");
            sb.AppendLine($"LEFT JOIN dbCollection..Ejecutivos E ON V.idEjecutivo = E.idEjecutivo ");
            sb.AppendLine($"LEFT JOIN dbCollection..ValoresCatálogo R ON V.idResultado = R.idValor ");

            if (!string.IsNullOrEmpty(sqlSubQuery))
            {
                sb.AppendLine($"INNER JOIN ({sqlSubQuery}) CC ON V.idCuenta = CC.idCuenta ");
            }

            sb.AppendLine("WHERE V.idCartera = @IdCartera AND V.Fecha_Insert BETWEEN @FechaDesde AND @FechaHasta ");
            return sb.ToString();
        }
    }
}