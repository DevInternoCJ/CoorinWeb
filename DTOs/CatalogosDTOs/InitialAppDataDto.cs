namespace Loki.DTOs.CatalogosDTOs
{
    public class InitialAppDataDto
    {
        public List<SignoDto> Signos { get; set; }
        public List<CarteraDto> Carteras { get; set; }
        public List<ProductoDto> Productos { get; set; }
        public List<ConsultaDto> Consultas { get; set; }
        public bool RdoDetalleVisible { get; set; } // Para controlar la visibilidad del botón de detalle
        public int? SelectedIdCartera { get; set; } // Si hay una cartera preseleccionada
        public int? SelectedIdProducto { get; set; } // Si hay un producto preseleccionado
        public List<string> Conceptos { get; set; } // Para cmbConceptos
    }
}
