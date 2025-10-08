using Loki.DTOs.ScriptsDTOs;

namespace Loki.Mark.Administracion.Gespa.Scripts.Interfaces
{
	public interface IScriptsDAO
	{
		Task<int> InsertScript(string servidor, ScriptsDTO request, int idProducto, int idEjecutivo);

		Task<int> UpdateScript(string servidor, ScriptsDTO request);
	}
}
