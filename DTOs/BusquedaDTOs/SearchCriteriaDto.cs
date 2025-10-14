namespace Loki.DTOs.BusquedaDTOs
{
    public class SearchCriteriaDto
    {
        public string Servidor { get; set; }
        public int IdCartera { get; set; }
        public int IdProducto { get; set; }

        public DateTime DesdeFecha { get; set; }
        public bool EsDetalleResultado { get; set; }
        public IEnumerable<ParameterDto> Parametros { get; set; }
        public IEnumerable<ParameterDto> Agrupar { get; set; }
    }
}