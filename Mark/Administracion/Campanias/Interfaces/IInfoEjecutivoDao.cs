using Loki.DTOs.CampaniasDTOs;
using Microsoft.AspNetCore.Mvc;

namespace Loki.Mark.Administracion.Carteras.Interfaces
{
	public interface IInfoEjecutivoDao
	{
		Task<List<dynamic>?> GetConsultasEjecutivo(string servidor, int idEjecutivo);
	}
}
