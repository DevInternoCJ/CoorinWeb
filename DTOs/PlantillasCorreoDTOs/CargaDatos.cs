namespace Loki.DTOs.PlantillasCorreoDTOs
{
    public class CargaDatos
    {
        public class CargaDatosRequest
        {
            public int IdCartera { get; set; }
            public int IdProducto { get; set; }
        }

        public class CargaDatosResponse
        {
            public bool Exito { get; set; }
            public string MensajeError { get; set; }
            public bool TablaExiste { get; set; }
            public List<PlantillaCorreoDto> Plantillas { get; set; } = new List<PlantillaCorreoDto>();
            public Dictionary<string, object> Producto { get; set; }
            public Dictionary<string, object> Cuenta { get; set; }
        }
    }
}
