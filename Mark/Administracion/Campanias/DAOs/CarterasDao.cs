using CoorinWeb.Loki.DTOs.AuthDTOs;
using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using Loki.DTOs.CampaniasDTOs;

using Loki.Mark.Administracion.Carteras.Interfaces;
using Microsoft.AspNetCore.Connections;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System.Data;
using System.Linq;
using System.Reflection;


namespace Loki.Mark.Administracion.Carteras.DAOs
{
    public class CarterasDao : ICarterasDAOs
    {
        private readonly IDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;

        public CarterasDao(IDbContextFactory dbContFactory, DaoBase daoBase)
        {

            _dbContFactory = dbContFactory;
            _daoBase = daoBase;
        }
        public async Task<bool> NuevaCampaña(CampañaDTO request, string servidor)
        {
            const string tipoBase = "Memory";
            if (servidor?.Contains('_') == true) throw new ArgumentException($"Servidor '{servidor}' inválido.");
            using var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);
            try
            {
                await sqlConnection.OpenAsync();
                string sqlInsert = "INSERT INTO dbMemory.AMS.Campañas (Campaña, NúmeroCuentas, Encendida, idEjecutivo_Insert, idProducto) " +
                                     "VALUES (@Campania, @NumeroCuentas, @Encendido, @IdEjecutivoInsert, @IdProducto);";
                using var cmdInsert = new SqlCommand(sqlInsert, sqlConnection);
                cmdInsert.Parameters.Add("@Campania", SqlDbType.NVarChar).Value = request.Campania ?? (object)DBNull.Value;
                cmdInsert.Parameters.Add("@NumeroCuentas", SqlDbType.Int).Value = request.NumeroCuentas;
                cmdInsert.Parameters.Add("@Encendido", SqlDbType.Bit).Value = request.Encendido;
                cmdInsert.Parameters.Add("@IdEjecutivoInsert", SqlDbType.Int).Value = request.IdEjecutivoInsert;
                cmdInsert.Parameters.Add("@IdProducto", SqlDbType.SmallInt).Value = request.IdProducto;

                int rowsAffected = await cmdInsert.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
            catch (SqlException ex)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                await sqlConnection.CloseAsync();
            }
        }
        public async Task<string?> EliminarCampaña(int idCampaña, string servidor)
        {
            const string tipoBase = "Memory";
            if (servidor?.Contains('_') == true)
                throw new ArgumentException("El parámetro 'servidor' es inválido");

            var paramIdCampaña = new SqlParameter("@idCampaña", idCampaña);
            var dbContext = _dbContFactory.GetDbContext(servidor, tipoBase);
            try
            {
                await _daoBase.ExecuteStoredProcedure(
                    dbContext,
                    "[AMS].[EliminaCampaña]",
                    paramIdCampaña
                );
                return $"Campaña con ID '{idCampaña}' eliminada correctamente.";
            }
            catch (SqlException ex)
            {
                return $"Error de base de datos al eliminar: {ex.Message}";
            }
            catch (Exception ex)
            {
                return $"Error inesperado al eliminar: {ex.Message}";
            }
        }


        public async Task<string?> LimpiarCampaña(int idCampaña, string servidor)
        {
            const string tipoBase = "Memory";
            if (servidor?.Contains('_') == true)
                throw new ArgumentException("El parámetro 'servidor' es requerido");
            var paramIdCampaña = new SqlParameter("@idCampaña", idCampaña);
            var dbContext = _dbContFactory.GetDbContext(servidor, tipoBase);
            try
            {
                await _daoBase.ExecuteStoredProcedure(
                    dbContext,
                    "[AMS].[LimpiaCampaña]",
                    paramIdCampaña
                );
                return $"Campaña con ID '{idCampaña}' limpiada correctamente.";
            }
            catch (SqlException ex)
            {
                return $"Error de base de datos al limpiar: {ex.Message}";
            }
            catch (Exception ex)
            {
                return $"Error inesperado al limpiar: {ex.Message}";
            }
        }

        public async Task<string?> AsignaEjecutivoCampaña(bool insertar, int idCampaña, int idEjecutivo, string servidor)
        {
            if (servidor?.Contains('_') != false)
                throw new ArgumentException("Servidor inválido.");
            var dbContext = _dbContFactory.GetDbContext(servidor, "Memory");
            var parametros = new[]
            {
        new SqlParameter("@Insertar", SqlDbType.Bit) { Value = insertar },
        new SqlParameter("@idEjecutivo", SqlDbType.Int) { Value = idEjecutivo },
        new SqlParameter("@idCampaña", SqlDbType.SmallInt) { Value = idCampaña },
        new SqlParameter("@Encendida", SqlDbType.Bit) { Value = true }
    };
            try
            {
                var resultado = await _daoBase.ExecuteStoredProcedure(
                    dbContext,
                    "AMS.AsignaEjecutivoACampaña",
                    parametros
                );
                int filasAfectadas = resultado is int r ? r : 0;

                return insertar
                    ? filasAfectadas > 0 ? $"Ejecutivo {idEjecutivo} asignado a campaña {idCampaña}." : $"Ejecutivo {idEjecutivo} se ha asignado."
                    : filasAfectadas > 0 ? $"Ejecutivo {idEjecutivo} eliminado." : $"Ejecutivo {idEjecutivo} no estaba asignado.";
            }
            catch (SqlException ex)
            {
                return $"Error de SQL: {ex.Message}";
            }
            catch (Exception ex)
            {
                return $"Error: {ex.Message}";
            }
        }
        //consulta
     
        public async Task<dynamic?> CargaFilasConsulta(int idcampaña, string consulta, bool ejecutivo, bool telefono, string servidor)
        {
            var paramIdCampaña = new SqlParameter("@idCampaña", idcampaña.ToString());
            var paramIdConsulta = new SqlParameter("@consulta", consulta.ToString());
            var paramEjecutivo = new SqlParameter("@Ejecutivo", ejecutivo.ToString());
            var paramTelefono = new SqlParameter("@Teléfono", telefono.ToString());
            var dbContext = _dbContFactory.GetDbContext(servidor, "Memory");
            var result = await _daoBase.ExecuteStoredProcedure(
                dbContext,
                "[AMS].[CargaFilasConsulta]",
                paramIdCampaña,
                paramIdConsulta,
                paramEjecutivo,
                paramTelefono

            );

            return result;
        }

        public async Task<dynamic?> CargaFilasConsulta(string consulta, string servidor)
        {
            var paramIdConsulta = new SqlParameter("@consulta", consulta.ToString());
          
            var dbContext = _dbContFactory.GetDbContext(servidor, "Memory");
            var result = await _daoBase.ExecuteStoredProcedure(
                dbContext,
                "[AMS].[CargaFilasConsulta]",
                paramIdConsulta

            );

            return result;
        }

        //archivo
        public async Task<dynamic?> CreaTablaFilasTemp(int idcampaña, string servidor)
        {
            var paramIdCampaña = new SqlParameter("@idCampaña", idcampaña.ToString());
            var dbContext = _dbContFactory.GetDbContext(servidor, "Memory");
            var result = await _daoBase.ExecuteStoredProcedure(
                dbContext,
                "[AMS].[CreaTablaFilasTemp]",
                paramIdCampaña
            );
            return result;
        }
        public async Task<dynamic?> CargaFilas(int idcampaña, int idcartera, string servidor)
        {
            var paramIdCampaña = new SqlParameter("@idCampaña", idcampaña.ToString());
            var paramIdCartera = new SqlParameter("@idCartera", idcartera.ToString());

            var dbContext = _dbContFactory.GetDbContext(servidor, "Memory");

            var result = await _daoBase.ExecuteStoredProcedure(
                dbContext,
                "[AMS].[CargaFilas]",
                paramIdCampaña,
                paramIdCartera
            );
            return result;
        }

    }
}


