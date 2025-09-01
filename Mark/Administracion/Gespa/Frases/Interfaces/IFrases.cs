using Loki.DTOs.FrasesDTOs;


namespace Loki.Mark.Administracion.Gespa.Frases.Interfaces
{
	public interface IFrases
	{
		Task<bool> GuardaFrasesAsync(FrasesDTO pFrases, string servidor);
	}
}
