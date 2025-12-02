// Ubicación: /Mark/Reportes/Ejecutivos/DTOs/ReporteEjecutivoDto.cs
using System;
using System.Text.Json.Serialization;

namespace Loki.DTOs.Reportes.EjecutivosDTOs
{
	/// <summary>
	/// Representa una fila del reporte de productividad de ejecutivos.
	/// </summary>
	public class ReporteEjecutivoDto
	{
		// General
		public string NombreEjecutivo { get; set; }
		public string Ejecutivo { get; set; }
		public string NombreEncargado { get; set; }
		public string Encargado { get; set; }

		// Gestiones
		public int CuentasGestionadas { get; set; }
		public int GestionesTelefonicas { get; set; }
		public int Entrada { get; set; }
		public int Titulares { get; set; }
		public int Conocidos { get; set; }
		public int Desconocidos { get; set; }
		public int SinContacto { get; set; }
		public int CuentasGestionadasChat { get; set; }
		public int GestionesChat { get; set; }
		public int ChatsConTitulares { get; set; }
		public int ChatsNoContestan { get; set; }
		public int ChatsConDesconocidos { get; set; }

		// Negociaciones
		public int Negociaciones { get; set; }
		public decimal MontoNegociado { get; set; }
		public decimal SaldoASolucionar { get; set; }
		public decimal Cumplidas { get; set; }
		public decimal MontosCumplidos { get; set; }
		public decimal MontosPagados { get; set; }
		public decimal SaldoSolucionado { get; set; }

		// Búsquedas
		public int NumeroBusquedas { get; set; }
		public int CuentasConBusqueda { get; set; }

		// Metas
		public int MetaCuentas { get; set; }
		[JsonPropertyName("%Cuentas")]
		public double PorcentajeCuentas { get; set; }

		public int MetaTitulares { get; set; }
		[JsonPropertyName("%Titulares")]
		public double PorcentajeTitulares { get; set; }

		public int MetaNegociaciones { get; set; }
		[JsonPropertyName("%Negociaciones")]
		public double PorcentajeNegociaciones { get; set; }

		public int MetaCumplimientos { get; set; }
		[JsonPropertyName("%Cumplimientos")]
		public double PorcentajeCumplimientos { get; set; }

		public decimal MetaMontoCumplido { get; set; }
		[JsonPropertyName("%MontoCumplido")]
		public double PorcentajeMontoCumplido { get; set; }

		public decimal MetaSaldoSolucionado { get; set; }
		[JsonPropertyName("%SaldoSolucionado")]
		public double PorcentajeSaldoSolucionado { get; set; }

		// Tiempos
		public TimeSpan TiempoConTitulares { get; set; }
		public TimeSpan TiempoConConocidos { get; set; }
		public TimeSpan TiempoConDesconocidos { get; set; }
		public TimeSpan TiempoSinContacto { get; set; }
		public TimeSpan TiempoEnCuenta { get; set; }
		public TimeSpan TiempoEnCuentasChat { get; set; }
		public TimeSpan TiempoEnBusqueda { get; set; }

		// Pausas
		public TimeSpan TiempoPermiso { get; set; }
		public TimeSpan TiempoComida { get; set; }
		public TimeSpan TiempoBaño { get; set; }
		public TimeSpan TiempoCalidad { get; set; }
		public TimeSpan TiempoFallaTecnica { get; set; }
	}
}