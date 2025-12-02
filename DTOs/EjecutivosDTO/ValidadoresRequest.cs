using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Loki.DTOs.EjecutivosDTO
{
    public class ValidadoresRequest
    {
        public ValidadoresRequest() { }
        public ValidadoresRequest(int IdEjecutivo, int idProducto, bool inserta)
        {
            this.IdEjecutivo = IdEjecutivo;
            this.idProducto = idProducto;
            this.inserta = inserta;
            //this.tipoBase = tipoBase;
           
        }
        public int IdEjecutivo { get; set; }
        public int idProducto { get; set; }
        public bool inserta { get; set; }
        //public string tipoBase { get; set; }
       
    
    }
}
