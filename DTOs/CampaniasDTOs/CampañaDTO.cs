namespace Loki.DTOs.CampaniasDTOs
{
    public class CampañaDTO
    {
        public CampañaDTO() { 
        }
        public CampañaDTO(string Campania, int NumeroCuentas, bool Encendido, int esIdEjecutivoInserttado, int IdProducto)
        {
          
            this.Campania = Campania;
            this.NumeroCuentas = NumeroCuentas;
            this.Encendido = Encendido;
            //this.IdEjecutivoInsert = IdEjecutivoInsert;
            this.IdProducto = IdProducto;
           
        }

       
        public string Campania { get; set; }
        public int NumeroCuentas { get; set; }
        public bool Encendido { get; set; }
        public int IdEjecutivoInsert { get; set; }
        public int IdProducto { get; set; }
       
    }

}
