using Loki.DTOs.CampaniasDTOs;

using Microsoft.AspNetCore.Mvc;

namespace Loki.Mark.Administracion.Carteras.Interfaces
{
    public interface ICarterasDAOs
    {


        Task<bool> NuevaCampaña(CampañaDTO request, string servidor);
        Task<string?> EliminarCampaña(int idCampaña, string servidor);
        Task<string?> LimpiarCampaña(int idCampaña, string servidor);
        Task<string?> AsignaEjecutivoCampaña(bool insertar, int idCampaña, int idEjecutivo, string servidor);
        Task<dynamic?> CargaFilas(int idcampaña, int idcartera, string servidor);
        Task<dynamic?> CargaFilasConsulta(int idcampaña, string consulta, bool ejecutivo, bool telefono, string servidor);
        Task<dynamic?> CreaTablaFilasTemp(int idcampaña, string servidor);
    }
}
