using CoorinWeb.DTOs.AuthDTOs;
using CoorinWeb.Loki.DTOs.AuthDTOs;

namespace CoorinWeb.Loki.Mark.Auth.Interfaces
{
	public interface IAuthInterfaces
	{
		Task<dynamic?> ValidateUser(AuthRequest request);
		Task<dynamic?> ValidateUserRetry(AuthRequest request);
		Task<dynamic?> ValidatePasswordEjecutivoAsync(ValidatePasswordEjecutivoRequest request);
		Task<int?> ValidateExistingSessionAsync(string servidor, int idEjecutivo);
		Task<dynamic?> ResetPasswordAsync(string servidor, ReseteaContra request);
	}
}