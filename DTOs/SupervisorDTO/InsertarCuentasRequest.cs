namespace Loki.DTOs.SupervisorDTO
{
    public class InsertarCuentasRequest
    {
        public int idCartera { get; set; }
        // Corresponde a ((object[])oDatos)[1]
        public int idConsulta { get; set; }
        // Corresponde a ((object[])oDatos)[2] - iFilas
        public int NumeroCuentasAAsignar { get; set; }
        // Corresponde a ((object[])oDatos)[3] - tblEjecutivos
        public List<EjecutivoAsignacion> Ejecutivos { get; set; }

    }
}
