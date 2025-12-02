using System;
using System.Text.Json.Serialization;

namespace Loki.DTOs.Reportes.ProductividadDTOs
{
	/// <summary>
	/// Representa una fila del reporte de productividad.
	/// Coincide con la salida del SP [3.2.ObtenerProductividad].
	/// </summary>
	public class ProductividadDto
	{
		// General
		public DateTime FechaDelDia { get; set; }
		public string Dia { get; set; }
		public string Cartera { get; set; }
		public string Sucursal { get; set; }
		public string NombreEncargado { get; set; }
		public string Encargado { get; set; }
		public string Ejecutivo { get; set; }
		public string Usuario { get; set; }
		public string Puesto { get; set; }

		// Gestiones
		public int CuentasGestionadas { get; set; }
		public int GestionesTelefonicas { get; set; }
		public int Entrada { get; set; }
		public int Titulares { get; set; }
		public int Conocidos { get; set; }
		public int Desconocidos { get; set; }
		public int SinContacto { get; set; }

		// Chats
		public int CuentasGestionadasChat { get; set; }
		public int GestionesChat { get; set; }
		public int ChatsConTitulares { get; set; }
		public int ChatsNoContestan { get; set; }
		public int ChatsConDesconocidos { get; set; }

		// Negociaciones
		public int Negociaciones { get; set; }
		public decimal MontoNegociado { get; set; }
		public decimal SaldoASolucionar { get; set; }
		public int NegociacionesChat { get; set; }
		public decimal MontoNegociadoChat { get; set; }
		public decimal SaldoASolucionarChat { get; set; }
		public decimal Cumplidas { get; set; } // Viene de ISNULL, podría ser decimal si el original lo es
		public decimal MontosPagados { get; set; } // Viene de ISNULL
		public decimal MontosCumplidos { get; set; } // Viene de ISNULL
		public decimal SaldoSolucionado { get; set; } // Viene de ISNULL

		// Búsquedas
		[JsonPropertyName("NúmeroBúsquedas")]
		public int NumeroBusquedas { get; set; }
		[JsonPropertyName("CuentasConBúsqueda")]
		public int CuentasConBusqueda { get; set; }

		// Metas
		public int MetaCuentas { get; set; }
		public int MetaTitulares { get; set; }
		public int MetaNegociaciones { get; set; }
		public int MetaCumplimientos { get; set; }
		public decimal MetaMontoCumplido { get; set; }
		public decimal MetaSaldoSolucionado { get; set; }

		// Horarios
		public TimeSpan? HoraIngresoSistema { get; set; }
		public TimeSpan? HoraSalidaSistema { get; set; }
		public TimeSpan? HoraPrimerGestion { get; set; }
		public TimeSpan? HoraUltimaGestion { get; set; }

		// Tiempos
		public TimeSpan TiempoConTitulares { get; set; }
		public TimeSpan TiempoConConocidos { get; set; }
		public TimeSpan TiempoConDesconocidos { get; set; }
		public TimeSpan TiempoSinContacto { get; set; }
		public TimeSpan TiempoEnCuenta { get; set; }
		public TimeSpan DuracionChats { get; set; }
		public TimeSpan TiempoEnCuentaChat { get; set; } // Nombre corregido según SP
		[JsonPropertyName("TiempoEnBúsqueda")]
		public TimeSpan TiempoEnBusqueda { get; set; }
		public TimeSpan TiempoPermiso { get; set; }
		public TimeSpan TiempoCurso { get; set; }
		public TimeSpan TiempoCalidad { get; set; }
		public TimeSpan TiempoComida { get; set; }
		public TimeSpan TiempoBaño { get; set; }
		public TimeSpan TiempoFallaTecnica { get; set; } // Nombre corregido según SP

		// Tiempos de Duración de Llamada
		public int Menor1min { get; set; }
		public int Entre1y3min { get; set; }
		public int Mayor3min { get; set; }
	}
}