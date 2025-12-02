using Loki.DTOs.ScriptsDTOs;

namespace Loki.Mark.Administracion.Gespa.Scripts.Interfaces
{
	public interface IScriptsDAO
	{
		Task<int> InsertScript(string servidor, guardarScriptsDTO request, int idProducto, int idEjecutivo);
		Task<int> UpdateScript(string servidor, actualizarScriptDTO request);
		Task<bool> DeleteScript(int idScript, string servidor, string nombreBaseDatos);

    }
}
