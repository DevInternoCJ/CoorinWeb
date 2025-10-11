using Loki.DTOs.Global;

namespace Loki.Global.DAOs
{
	public interface IConsultaConfigDAO
	{
		Task<ConsultaConfigDto?> GetConsultaConfigAsync(string servidor, int idConsulta);
	}
}
