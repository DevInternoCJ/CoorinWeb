namespace CoorinWeb.Loki.DTOs.AuthDTOs
{
    public class ReseteaContra
    {
        public string? Servidor { get; set; }
        public string? Usuario { get; set; }
        public string? NuevaContra { get; set; }
        public string? Contra { get; set; }

		public class ResultadoCambioContra
		{
			public string Mensaje { get; set; }
			public int? Éxito { get; set; }
		}
	}
}