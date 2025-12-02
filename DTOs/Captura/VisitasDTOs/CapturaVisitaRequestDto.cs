// Ubicación: /Mark/Captura/Visitas/DTOs/CapturaVisitaRequestDto.cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Loki.DTOs.Captura.VisitasDTOs
{
	/// <summary>
	/// Contiene toda la información necesaria para registrar una nueva visita domiciliaria.
	/// </summary>
	public class CapturaVisitaRequestDto
	{
		[Required]
		public int IdCartera { get; set; }
		[Required]
		public string IdCuenta { get; set; }
		[Required]
		public int IdDomicilio { get; set; }

		// Datos de la Visita
		[Required]
		public DateTime FechaVisita { get; set; }
		[Required]
		public TimeSpan HoraVisita { get; set; } // time(0)
		[Required(AllowEmptyStrings = false)]
		[StringLength(4)] // Basado en el SP
		public string UsuarioVisitador { get; set; }
		[Required]
		public int IdHabitacion { get; set; } // Mapeo
		[Required]
		public int IdContacto { get; set; }
		public int? IdParentesco { get; set; } // smallint
		public int? IdSituacion { get; set; } // smallint
		public int? IdCausaNoPago { get; set; } // smallint
		public int IdSucursal { get; set; } // smallint
		[StringLength(100)]
		public string? Atendio { get; set; }
		[StringLength(8000)]
		public string? Comentario { get; set; }

		// Datos del Domicilio (Opcionales)
		[StringLength(50)]
		public string? ColorFachada { get; set; }
		[StringLength(50)]
		public string? ColorPuerta { get; set; }
		[StringLength(50)]
		public string? ColorHerreria { get; set; }
		public byte? Pisos { get; set; } // tinyint
		public int? IdVivienda { get; set; }
		public int? IdEconomico { get; set; }
		[StringLength(100)]
		public string? NombrePropietario { get; set; }

		// Datos del Auto (Opcionales)
		[StringLength(50)]
		public string? AutoMapeo { get; set; }
		[StringLength(50)]
		public string? AutoMarca { get; set; }
		[StringLength(50)]
		public string? AutoModelo { get; set; }
		public short? AutoAño { get; set; } // smallint
		[StringLength(10)]
		public string? AutoPlacas { get; set; }

		// Referencias de Calles (Opcionales)
		public int? Paquete { get; set; }
		[StringLength(100)]
		public string? CalleHorizontalNorte { get; set; }
		[StringLength(100)]
		public string? CalleHorizontalSur { get; set; }
		[StringLength(100)]
		public string? CalleVerticalEste { get; set; }
		[StringLength(100)]
		public string? CalleVerticalOeste { get; set; }

		// Negociación (Opcional)
		public decimal? MontoNegociacion { get; set; } // money
		public DateTime? FechaPagoNegociacion { get; set; }

		// Teléfonos Capturados
		public List<string> TelefonosCapturados { get; set; } = new List<string>();

		// Datos CFE (Enviados por Frontend)
		[StringLength(15)]
		public string? NumeroMedidor { get; set; }
		public bool? EnergiaElectrica { get; set; } // bit
		public bool? AcuseRequerimiento { get; set; } // bit
		public bool? FotografiaPredio { get; set; } // bit
		[StringLength(50)]
		public string? Latitud { get; set; }
		[StringLength(50)]
		public string? Longitud { get; set; }
	}
}