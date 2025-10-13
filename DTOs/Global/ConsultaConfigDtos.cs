namespace Loki.DTOs.Global
{
	// DTO para las filas de la tabla 'ConsultaParámetros'
	public class ConsultaParametroDto
	{
		public string Concepto { get; set; }
		public string Campo { get; set; }
		public string Valores { get; set; }
		public string Parametros { get; set; } // El nombre original es 'Parámetros', pero es mejor evitar tildes
		public string Dato { get; set; }
	}

	// DTO para las filas de la tabla 'ConsultaAgrupar'
	public class ConsultaAgruparDto
	{
		public string Concepto { get; set; }
		public string Campo { get; set; }
		public string Origen { get; set; }
	}

	// DTO que contendrá la configuración completa de una consulta
	public class ConsultaConfigDto
	{
		public int? IdProducto { get; set; }
		public DateTime? Desde { get; set; }
		public List<ConsultaParametroDto> Parametros { get; set; } = [];
		public List<ConsultaAgruparDto> Agrupaciones { get; set; } = [];
	}
}
