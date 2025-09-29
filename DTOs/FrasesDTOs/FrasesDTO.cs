namespace Loki.DTOs.FrasesDTOs
{
	public class FrasesDTO
	{
			public string IdEjecutivo { get; set; }
			public string IdCartera { get; set; }
			public string IdProducto { get; set; }
			public string TextoFrase { get; set; }

			public FrasesDTO(string idEjecutivo, string idCartera, string idProducto, string textoFrase)
			{
				IdEjecutivo = idEjecutivo;
				IdCartera = idCartera;
				IdProducto = idProducto;
				TextoFrase = textoFrase;
			}

			public FrasesDTO() { }
	}
}
