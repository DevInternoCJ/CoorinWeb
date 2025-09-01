using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Swashbuckle.AspNetCore.Annotations;

namespace Loki.DTOs.EjecutivosDTO
{
    public class ValidadoresDTO
    {
        public ValidadoresDTO(){}
        public ValidadoresDTO(int IdEjecutivo, int idProducto, bool inserta, string servidor, string tipoBase)
        {
            this.IdEjecutivo = IdEjecutivo;
            this.idProducto = idProducto;
            this.inserta = inserta;
            this.tipoBase = tipoBase;
            this.servidor = servidor;
        }
        public int IdEjecutivo { get; set; }
        public int idProducto { get; set; } 
        public bool inserta { get; set; }  
        public string tipoBase { get; set; }
        [BindNever]
        public string servidor { get; set; }

    }
}