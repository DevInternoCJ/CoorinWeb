using Loki.DTOs.CamposPantallaDTOs;
using Loki.DTOs.EncargadosDTOs;
using Microsoft.Data.SqlClient;

namespace Loki.Mark.Administracion.Gespa.CamposPantalla.Interfaces
{
	public interface ICamposPantallaDao
	{
		Task<dynamic?> CambiaEncargadoEjecutivo(string servidor, CambiaEncargadoDto request);
		Task<int?> ObtenerObjectIdTablaAsync(string servidor, string nombreTabla);
		Task<bool> GuardaCampoPantalla(CampoPantallaDto dto, SqlConnection connection, SqlTransaction transaction);
	}
}
