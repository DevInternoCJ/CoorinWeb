namespace Loki.DTOs.HistoricoDTOs
{
    public class Consulta
    {
        public class ConsultaBaseRequest
        {
            public int IdCartera { get; set; }
            public bool IncluirCuenta { get; set; }
            public bool IncluirNegociaciones { get; set; }
            public bool IncluirVisitas { get; set; }
            public bool IncluirGestiones { get; set; }
            public bool IncluirAccionamientos { get; set; }
            public bool IncluirPagos { get; set; }
            public bool UsarPeriodo { get; set; }
            public DateTime? FechaDesde { get; set; }
            public DateTime? FechaHasta { get; set; }
        }

        public class ConsultaIndividualRequest : ConsultaBaseRequest
        {
            public string Cuenta { get; set; }
        }

        public class ConsultaArchivoRequest : ConsultaBaseRequest
        {
            // Propiedades específicas para archivo si las hay
        }

        public class ExcelResponse
        {
            public string NombreArchivo { get; set; }
            public byte[] Contenido { get; set; }
            public string ContentType { get; set; } = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        }
    }
}
