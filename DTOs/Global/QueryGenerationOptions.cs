namespace Loki.DTOs.Global
{

	// Enumeración para definir el tipo de resultado deseado
	public enum TipoResultadoQuery
	{
		Agrupado, // Corresponde a 'Contar' o 'ContarCuentas'
		Detalle   // Corresponde a 'Detalle'
	}

	/// <summary>
	/// Contiene los parámetros necesarios para que el QueryGeneratorService construya una subconsulta.
	/// Es un objeto genérico, no está atado a ninguna petición de API específica.
	/// </summary>
	public class QueryGenerationOptions
	{
		public int IdConsulta { get; set; }
		public int IdCartera { get; set; }
		public int? IdProducto { get; set; }

		// PROPIEDAD AÑADIDA: Por defecto, pedimos un resultado agrupado.
		public TipoResultadoQuery Resultado { get; set; } = TipoResultadoQuery.Agrupado;
	}
}
