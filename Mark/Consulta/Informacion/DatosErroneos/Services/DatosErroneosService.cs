using Dapper;
using Loki.DTOs.Informacion.DatosErroneos;
using Loki.DTOs.Informacion.DatosErroneosDTOs;
using Loki.Mark.Consulta.Informacion.DatosErroneos.Interfaces;
using System.Text;

namespace Loki.Mark.Consulta.Informacion.DatosErroneos.Services
{
	public class DatosErroneosService : IDatosErroneosService
	{
		private readonly IDatosErroneosDAO _dao;

		public DatosErroneosService(IDatosErroneosDAO dao)
		{
			_dao = dao;
		}

		/// <summary>
		/// Orquesta la consulta de datos reportados como erróneos, construyendo y ejecutando la consulta SQL.
		/// </summary>
		/// <param name="servidor">El servidor donde se ejecutará la consulta, obtenido del claim del token.</param>
		/// <param name="request">El DTO que contiene los parámetros de la petición, como la cartera, el tipo de dato y el rango de fechas.</param>
		/// <returns>Una colección de DTOs con los resultados de los datos erróneos encontrados.</returns>
		public async Task<IEnumerable<DatoErroneoDto>> ConsultarDatosErroneosAsync(string servidor, DatosErroneosRequestDto request)
		{
			var sqlBuilder = new StringBuilder(@"
                SELECT
                    P.Producto,
                    D.idCuenta AS Cuenta,
                    Cu.NombreDeudor,
                    Cu.RFC,
                    Cu.NúmeroCliente,
                    Cu.Saldo,
                    E.NombreEjecutivo AS Reporto,
                    V.Valor AS DatoErroneo
                FROM dbo.DatosErróneos D
                INNER JOIN dbo.Ejecutivos E ON E.idEjecutivo = D.idEjecutivo_Insert
                INNER JOIN dbo.ValoresCatálogo V ON V.idValor = D.idDatoErróneo
                INNER JOIN dbo.Cuentas Cu ON Cu.idCuenta = D.idCuenta AND Cu.idCartera = D.idCartera
                INNER JOIN dbo.Productos P ON P.idProducto = Cu.idProducto
                WHERE D.FechaHora_Insert BETWEEN @Desde AND @Hasta AND D.idCartera = @IdCartera");

			var parametros = new DynamicParameters();
			parametros.Add("IdCartera", request.IdCartera);
			parametros.Add("Desde", request.Desde);
			parametros.Add("Hasta", request.Hasta);

			// Se añade el filtro condicional, igual que en la app original
			if (request.IdDatoErroneo != 0)
			{
				sqlBuilder.Append(" AND D.idDatoErróneo = @IdDatoErroneo");
				parametros.Add("IdDatoErroneo", request.IdDatoErroneo);
			}

			return await _dao.ObtenerDatosAsync<DatoErroneoDto>(servidor, sqlBuilder.ToString(), parametros);
		}
	}
}
