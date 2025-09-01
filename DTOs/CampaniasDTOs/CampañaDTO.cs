namespace Loki.DTOs.CampaniasDTOs
{
    public class CampañaDTO
    {
        public CampañaDTO() { 
        }
        public CampañaDTO(int IdCampania,string Campania, int NumeroCuentas, bool Encendido, int esIdEjecutivoInserttado, int IdProducto)
        {
            this.IdCampania = IdCampania;
            this.Campania = Campania;
            this.NumeroCuentas = NumeroCuentas;
            this.Encendido = Encendido;
            //this.IdEjecutivoInsert = IdEjecutivoInsert;
            this.IdProducto = IdProducto;
           
        }

        public int IdCampania { get; set; }
        public string Campania { get; set; }
        public int NumeroCuentas { get; set; }
        public bool Encendido { get; set; }
        public int IdEjecutivoInsert { get; set; }
        public int IdProducto { get; set; }
       
    }

}
