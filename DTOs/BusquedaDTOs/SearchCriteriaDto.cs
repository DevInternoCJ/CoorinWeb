namespace Loki.DTOs.BusquedaDTOs
{
    public class SearchCriteriaDto
    {
        public string Servidor { get; set; }
        public int IdCartera { get; set; }
        public int IdProducto { get; set; }
        public DateTime? DesdeFecha { get; set; }
        public bool EsDetalleResultado { get; set; }
        public int? IdConsulta { get; set; }
        public IEnumerable<ParametroDto> Parametros { get; set; }
        public IEnumerable<AgruparDto> Agrupar { get; set; }
        public int JerarquiaEjecutivo { get; set; }
    }
}