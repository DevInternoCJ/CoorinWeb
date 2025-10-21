using System.ComponentModel.DataAnnotations;
using Loki.DTOs.GeneralesDTOs;

namespace Loki.DTOs.GeneralesDTOs
{
    public class SearchGeneral
    {
        /// <summary>
        /// Nombre del servidor de base de datos
        /// </summary>
        [Required(ErrorMessage = "El servidor es requerido")]
        public string? Servidor { get; set; }

        /// <summary>
        /// ID de la cartera
        /// </summary>
        [Required(ErrorMessage = "El IdCartera es requerido")]
        public int? IdCartera { get; set; }

        /// <summary>
        /// ID del producto
        /// </summary>
        [Required(ErrorMessage = "El IdProducto es requerido")]
        public int? IdProducto { get; set; }

        /// <summary>
        /// Concepto de búsqueda: Teléfonos, Gestiones, Negociaciones, Seguimientos, Chats
        /// Por defecto: Teléfonos
        /// </summary>
        public string? Concepto { get; set; }

        /// <summary>
        /// ID de consulta predefinida (opcional)
        /// </summary>
        public int? IdConsulta { get; set; }

        /// <summary>
        /// Indica si el resultado debe ser en formato detalle
        /// </summary>
        public bool EsDetalleResultado { get; set; } = false;

        /// <summary>
        /// Indica si el resultado debe contar cuentas
        /// </summary>
        public bool EsCuentasResultado { get; set; } = false;

        /// <summary>
        /// Indica si el resultado debe contar registros
        /// </summary>
        public bool EsContarResultado { get; set; } = false;

        /// <summary>
        /// Parámetros adicionales para filtrar la búsqueda
        /// </summary>
        public IEnumerable<ParameterDto>? ParametrosExtra { get; set; }

        /// <summary>
        /// Agrupamientos para la búsqueda
        /// </summary>
        public IEnumerable<AgruparDTO>? AgrupamientoExtra { get; set; }
    }

}
