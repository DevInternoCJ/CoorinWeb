namespace Loki.DTOs.ConsultaDTOs
{
    public class CuentaDTO
    {
        public short IdCartera { get; set; }
        public string? IdCuenta { get; set; }
        public long? FolioRedeco { get; set; }
        public string? Solicitante { get; set; }

        // Tipo de registro: "Queja", "Telefono", "Correo"
        public string Tipo { get; set; } = null!;

        // Datos específicos de tipo queja
        public DateOnly? FechaCuentaQueja { get; set; }

        // Datos específicos de tipo teléfono
        public long? NumeroTelefonico { get; set; }
        public DateOnly? FechaListaNegraTelefono { get; set; }
        public int? IdEjecutivoTelefono { get; set; }

        // Datos específicos de tipo correo
        public string? Correo { get; set; }
        public DateOnly? FechaListaNegraCorreo { get; set; }
        public int? IdEjecutivoCorreo { get; set; }
    }
}
