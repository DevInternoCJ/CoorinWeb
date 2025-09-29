namespace Loki.Mark.Administracion.Ejecutivos.Sesiones.Interfaces
{
	public interface ISesionesService
	{
		Task<List<object>> CargaSesionesEjecutivos(string servidor, int idEjecutivo);
		Task<bool> ResetearContraseniaAsync(string usuario, string servidor);
		Task<bool> CerrarSesionAsync(int idEjecutivo, string servidor);
		Task<bool> QuitarBloqueoAsync(int idEjecutivo, string servidor);

	}
}
