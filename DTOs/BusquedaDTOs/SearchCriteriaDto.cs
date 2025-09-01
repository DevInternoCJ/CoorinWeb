namespace Loki.DTOs.BusquedaDTOs
{
    public class SearchCriteriaDto
    {
        public string Servidor { get; set; } = string.Empty; // El servidor en el que se realizará la búsqueda (ej. "Thor")
        public int IdCartera { get; set; } // idCartera
        public int? IdProducto { get; set; } // idProducto (puede ser nulo si es una vista general)
        public List<ParameterDto> Parametros { get; set; } = new List<ParameterDto>(); // Lista de parámetros de filtro
        public List<ParameterDto> Agrupar { get; set; } = new List<ParameterDto>(); // Lista de criterios de agrupación
        public bool EsDetalleResultado { get; set; } // Reemplaza rdoDetalle.Checked: true para detalle, false para conteo
        public DateTime DesdeFecha { get; set; } = DateTime.Today; // Reemplaza dtpDesde.Value
        public int IdConsulta { get; set; } // El ID de la consulta seleccionada (cmbConsultas.SelectedValue)
    }
}