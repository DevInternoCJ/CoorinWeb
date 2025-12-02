// Ubicación: /Mark/Captura/Visitas/DTOs/DomicilioCapturaDto.cs
using System;

namespace Loki.DTOs.Captura.VisitasDTOs
{
	public class DomicilioCapturaDto
	{
		public int IdDomicilio { get; set; }
		public required string IdCuenta { get; set; } // Aunque ya se sabe, la función lo devuelve
		public int IdProducto { get; set; }
		public required string Domicilio { get; set; }
		public required string DelegacionMunicipio { get; set; }
		public DateTime? UltimaVisita { get; set; }
		public DateTime? UltimaCaptura { get; set; }
		public int? Ilocalizable { get; set; } // Podría ser bool si la BD lo garantiza
		public int? Localizable { get; set; } // Podría ser bool
		public required string URL { get; set; } // La URL original (el frontend la usará o la ignorará)
	}
}