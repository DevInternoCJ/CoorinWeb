using Loki.DTOs.CampaniasDTOs;
using Loki.DTOs.InfoEjecutivoDTO;
using Microsoft.AspNetCore.Mvc;

namespace Loki.Mark.Administracion.Carteras.Interfaces
{
	public interface IInfoEjecutivoDao
	{
        Task<ResultadoConsultasEjecutivoDTO?> GetConsultasEjecutivo(string servidor, int idEjecutivo);
	}
}
