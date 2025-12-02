// Ubicación: /Mark/Captura/Visitas/DTOs/CuentaConDomiciliosDto.cs
using System.Collections.Generic;

namespace Loki.DTOs.Captura.VisitasDTOs
{
	public class CuentaConDomiciliosDto
	{
		public required CuentaBusquedaDto Cuenta { get; set; }
		public List<DomicilioCapturaDto> Domicilios { get; set; } = new List<DomicilioCapturaDto>();
	}
}