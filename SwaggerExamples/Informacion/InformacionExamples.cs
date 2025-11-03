using Loki.DTOs.Informacion.PagosDTOs;
using Loki.DTOs.Informacion.PagosReportadosDTOs; //
using Swashbuckle.AspNetCore.Filters;
using System;
using System.Collections.Generic;

namespace Loki.SwaggerExamples.Informacion
{
	/// <summary>
	/// Ejemplo de SOLICITUD para el endpoint de Consultar Pagos Reportados.
	/// </summary>
	public class ConsultaPagosReportadosExample : IExamplesProvider<ConsultaPagosRequest>
	{
		public ConsultaPagosRequest GetExamples()
		{
			// Incluimos IdProducto y Jerarquia como solicitaste.
			return new ConsultaPagosRequest
			{
				IdCartera = 1,
				IdConsulta = 31088,
				IdProducto = 1, // <--- Campo añadido
				Desde = new DateTime(2025, 1, 1),
				Hasta = new DateTime(2025, 10, 30),
				Jerarquia = 4  // <--- Campo añadido
			};
		}
	}

	/// <summary>
	/// Ejemplo de RESPUESTA para el endpoint de Consultar Pagos Reportados.
	/// </summary>
	public class PagoReportadoResponseExample : IExamplesProvider<IEnumerable<PagoReportadoDto>>
	{
		public IEnumerable<PagoReportadoDto> GetExamples()
		{
			return new List<PagoReportadoDto>
			{
				new PagoReportadoDto
				{
					Cartera = "CARTERA_EJEMPLO",
					Cuenta = "123456789",
					NombreEjecutivo = "NOMBRE EJECUTIVO PRUEBA",
					FechaPago = new DateTime(2025, 10, 20), //
                    Hora = new TimeSpan(14, 30, 00), //
                    MontoPago = 1500.50m, //
                    Referencia = "REF12345", //
                    Sucursal = "SUCURSAL_PRUEBA" //
                }
			};
		}
	}
}