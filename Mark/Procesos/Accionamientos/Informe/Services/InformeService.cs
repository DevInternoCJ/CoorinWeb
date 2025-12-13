using Dapper;
using Loki.DTOs.Global;
using Loki.DTOs.Procesos.Accionamientos.InformeDTOs;
using Loki.Global;
using Loki.Mark.Procesos.Accionamientos.Informe.Interfaces;
using System.Text;

namespace Loki.Mark.Procesos.Accionamientos.Informe.Services
{
    public class InformeService : IInformeService
    {
        private readonly IInformeDAO _dao;
        private readonly IQueryGeneratorService _queryGenerator;

        public InformeService(IInformeDAO dao, IQueryGeneratorService queryGenerator)
        {
            _dao = dao;
            _queryGenerator = queryGenerator;
        }

        public async Task<IEnumerable<dynamic>> ConsultarInformeAsync(string servidor, InformeRequestDto request)
        {
            // 1. Obtener la subconsulta de cuentas (CC) usando el servicio reutilizable
            var queryOptions = new QueryGenerationOptions { IdConsulta = request.IdConsulta, IdCartera = request.IdCartera };
            var subQueryResult = await _queryGenerator.GenerarQueryCuentas(servidor, queryOptions);

            // 2. Construir la consulta principal (Detalle o Agrupado)
            var (sqlFinal, parametros) = ConstruirQuerySeguro(request, subQueryResult);

            // 3. Ejecutar
            return await _dao.ObtenerInformeAsync(servidor, sqlFinal, parametros);
        }

        private (string Sql, DynamicParameters Params) ConstruirQuerySeguro(InformeRequestDto request, SubQueryResult subQueryResult)
        {
            var parametros = new DynamicParameters();
            // Añadimos parámetros de la subconsulta de cuentas
            parametros.AddDynamicParams(subQueryResult.Parameters);

            // Parámetros principales
            parametros.Add("IdCartera", request.IdCartera);
            parametros.Add("FechaDesde", request.FechaDesde.ToString("yyyy-MM-dd"));
            parametros.Add("FechaHasta", request.FechaHasta.ToString("yyyy-MM-dd"));
            if (request.IdAcercamiento != 0) parametros.Add("IdAcercamiento", request.IdAcercamiento);

            // Determinar base de datos y tablas
            string dbPrefix = request.UsarComplemento ? "dbComplemento.." : "dbCollection..";

            // Columnas dinámicas de la subconsulta CC
            string columnasCC = subQueryResult.Columns.Count > 0
                ? string.Join(", ", subQueryResult.Columns.Cast<string>().Select(c => $"CC.[{c}]"))
                : "";

            var sb = new StringBuilder();

            if (request.Conteo == TipoConteoAccionamiento.Detalle)
            {
                ConstruirQueryDetalle(sb, request, dbPrefix, subQueryResult, columnasCC);
            }
            else
            {
                ConstruirQueryAgrupado(sb, request, dbPrefix, subQueryResult, columnasCC);
            }

            return (sb.ToString(), parametros);
        }

        private void ConstruirQueryDetalle(StringBuilder sb, InformeRequestDto request, string dbPrefix, SubQueryResult subQueryResult, string columnasCC)
        {
            string columnasCCSelect = string.IsNullOrEmpty(columnasCC) ? "" : "," + columnasCC;

            sb.AppendLine("SELECT X.Fecha, X.Hora, E.NombreEjecutivo AS [Cargó], ");
            sb.AppendLine($"Carteras.Abreviación + CONVERT(VARCHAR(20), CA.Expediente) AS Expediente, ");
            sb.AppendLine("Acercamiento.Valor AS Acercamiento, X.Nombre, X.Mensaje, X.Destino, X.Resultados ");
            sb.AppendLine(columnasCCSelect);

            sb.AppendLine("FROM ( ");
            // --- Parte 1: Accionamientos ---
            sb.AppendLine($"   SELECT A.idCartera, A.Fecha_Insert AS Fecha, A.Segundo_Insert AS Hora, ");
            sb.AppendLine($"          P.idEjecutivo_Insert AS Ejecutivo, A.idAcercamiento, A.idCuenta, P.Nombre, ");
            sb.AppendLine($"          P.Descripción, A.Mensaje, CONVERT(VARCHAR(20), A.NúmeroTelefónico) AS Destino, A.Resultados ");
            sb.AppendLine($"   FROM {dbPrefix}Accionamientos A ");
            sb.AppendLine($"   LEFT JOIN {dbPrefix}Paquetes P ON A.idCartera = P.idCartera AND A.Fecha_Insert = P.Fecha_insert AND A.Segundo_Paquete = P.Segundo_insert ");

            // --- Parte 2: Correos (UNION ALL) ---
            sb.AppendLine("   UNION ALL ");
            sb.AppendLine($"   SELECT A.idCartera, A.Fecha_Insert AS Fecha, A.Segundo_Insert AS Hora, ");
            sb.AppendLine($"          A.idEjecutivo_Insert AS Ejecutivo, 1607 AS idAcercamiento, A.idCuenta, P.Nombre, ");
            sb.AppendLine($"          P.Descripción, A.Mensaje, A.CorreoElectrónico AS Destino, A.Resultados ");
            sb.AppendLine("   FROM CorreosEnviados A "); // Asumiendo ubicación estándar
            sb.AppendLine($"   LEFT JOIN {dbPrefix}Paquetes P ON A.idCartera = P.idCartera AND A.Fecha_Insert = P.Fecha_insert AND A.Segundo_Paquete = P.Segundo_insert ");
            sb.AppendLine(") X ");

            // JOINS Principales
            sb.AppendLine("INNER JOIN dbCollection..Cuentas CA WITH (NOLOCK) ON X.idCartera = CA.idCartera AND X.idCuenta = CA.idCuenta ");
            sb.AppendLine("INNER JOIN dbCollection..Carteras WITH (NOLOCK) ON X.idCartera = Carteras.idCartera ");
            sb.AppendLine("LEFT JOIN dbCollection..Ejecutivos E ON X.Ejecutivo = E.idEjecutivo ");
            sb.AppendLine("LEFT JOIN dbCollection..ValoresCatálogo Acercamiento ON X.idAcercamiento = Acercamiento.idValor ");

            // INNER JOIN con Subconsulta CC (si existe)
            if (!string.IsNullOrEmpty(subQueryResult.Sql))
            {
                sb.AppendLine($"INNER JOIN ({subQueryResult.Sql}) CC ON X.idCuenta = CC.idCuenta ");
            }

            // WHERE Global
            sb.AppendLine("WHERE X.Fecha BETWEEN @FechaDesde AND @FechaHasta AND X.idCartera = @IdCartera ");
            if (request.IdAcercamiento != 0) sb.AppendLine("AND X.idAcercamiento = @IdAcercamiento ");
        }

        private void ConstruirQueryAgrupado(StringBuilder sb, InformeRequestDto request, string dbPrefix, SubQueryResult subQueryResult, string columnasCC)
        {
            sb.Append("SELECT ");
            if (!string.IsNullOrEmpty(columnasCC)) sb.Append(columnasCC + ", ");

            string conteoCol = request.Conteo == TipoConteoAccionamiento.ContarCuentas
                ? "COUNT(DISTINCT AC.idCuenta) AS Cuentas"
                : "COUNT(AC.idCuenta) AS Accionamientos";
            sb.AppendLine(conteoCol + ", ");

            // Columnas fijas de conteo por tipo
            sb.AppendLine("SUM(CASE WHEN AC.idAcercamiento = 1604 THEN 1 ELSE 0 END) AS Carta,");
            sb.AppendLine("SUM(CASE WHEN AC.idAcercamiento = 1605 THEN 1 ELSE 0 END) AS Blaster,");
            sb.AppendLine("SUM(CASE WHEN AC.idAcercamiento = 1606 THEN 1 ELSE 0 END) AS SMS,");
            sb.AppendLine("SUM(CASE WHEN AC.idAcercamiento = 1607 THEN 1 ELSE 0 END) AS Mail,");
            sb.AppendLine("SUM(CASE WHEN AC.idAcercamiento = 1609 THEN 1 ELSE 0 END) AS Whatsapp,");
            sb.AppendLine("SUM(CASE WHEN AC.idAcercamiento = 1608 THEN 1 ELSE 0 END) AS Telegrama");

            sb.AppendLine("FROM (");
            // Subconsulta AC (Unión de Accionamientos y Correos)
            sb.AppendLine("   SELECT DISTINCT " + (string.IsNullOrEmpty(columnasCC) ? "" : columnasCC + ",") + " A.idAcercamiento, A.idCuenta");
            sb.AppendLine($"   FROM {dbPrefix}Accionamientos A");

            // El INNER JOIN con CC debe ir DENTRO del UNION para filtrar antes de unir
            if (!string.IsNullOrEmpty(subQueryResult.Sql))
                sb.AppendLine($"   INNER JOIN ({subQueryResult.Sql}) CC ON A.idCuenta = CC.idCuenta");

            sb.AppendLine("   WHERE A.Fecha_Insert BETWEEN @FechaDesde AND @FechaHasta AND A.idCartera = @IdCartera");
            if (request.IdAcercamiento != 0) sb.AppendLine("   AND A.idAcercamiento = @IdAcercamiento");

            sb.AppendLine("   UNION ALL");

            sb.AppendLine("   SELECT DISTINCT " + (string.IsNullOrEmpty(columnasCC) ? "" : columnasCC + ",") + " 1607 AS idAcercamiento, A.idCuenta");
            sb.AppendLine("   FROM CorreosEnviados A");

            if (!string.IsNullOrEmpty(subQueryResult.Sql))
                sb.AppendLine($"   INNER JOIN ({subQueryResult.Sql}) CC ON A.idCuenta = CC.idCuenta");

            sb.AppendLine("   WHERE A.Fecha_Insert BETWEEN @FechaDesde AND @FechaHasta AND A.idCartera = @IdCartera");

            // Lógica especial para filtrar correos si se seleccionó un acercamiento específico que NO sea Mail (1607)
            if (request.IdAcercamiento != 0 && request.IdAcercamiento != 1607)
                sb.AppendLine("   AND 1=0"); // Filtro "falso" para que no traiga correos

            sb.AppendLine(") AC");

            // GROUP BY (Solo si hay columnas dinámicas)
            if (!string.IsNullOrEmpty(columnasCC))
            {
                sb.AppendLine($"GROUP BY {columnasCC}");
            }
        }
    }
}