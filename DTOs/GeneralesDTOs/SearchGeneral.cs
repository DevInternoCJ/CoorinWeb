using System.ComponentModel.DataAnnotations;
using Loki.DTOs.GeneralesDTOs;

namespace Loki.DTOs.GeneralesDTOs
{
    public class SearchGeneral
    {
        public string Servidor { get; set; }
        public int IdCartera { get; set; }
        public int IdProducto { get; set; }
        public DateTime? DesdeFecha { get; set; }

        /// <summary>
        /// 1 = Contar | 2 = Detalle | 3 = Cuentas
        /// </summary>
        public int TipoResultado { get; set; }  

        public int? IdConsulta { get; set; }

        public int Jerarquia { get; set; }
        public IEnumerable<ParameterDto>? ParametrosExtra { get; set; }
        public IEnumerable<AgruparDTO>? AgruparExtra { get; set; }
    }

}
