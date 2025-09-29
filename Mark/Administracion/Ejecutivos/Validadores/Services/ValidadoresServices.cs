using System.Data;
using CoorinWeb.Loki.Global;
using Dapper;
using Loki.DTOs.EjecutivosDTO;
using Loki.Mark.Administracion.Ejecutivos.Validadores.Interfaces;
using Microsoft.Data.SqlClient;

namespace Loki.Mark.Administracion.Ejecutivos.Validadores.Services
{
    public class ValidadoresServices : IValidadoresService
    {

        public ValidadoresServices(IServiceProvider serviceProvider)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);

        }
        private readonly CustomDbContextFactory _dbContFactory;

        

        public async Task<IEnumerable<ValidadoresDTO>?> ObtieneValidadores(int idProducto, string servidor, string tipoBase)
        {
            try
            {
                using var conn = _dbContFactory.GetSqlConnection(servidor, tipoBase);
                if (conn.State != ConnectionState.Open)
                {
                    await conn.OpenAsync();
                }
                const string sqlQuery = "SELECT idEjecutivo AS IdEjecutivo FROM dbo.Validadores WHERE idProducto = @idProducto";
                var resultados = await conn.QueryAsync<int>(sqlQuery, new { idProducto });

                if (resultados != null)
                {
                    List<ValidadoresDTO> listaValidadores = new List<ValidadoresDTO>();
                    foreach (int idEjecutivo in resultados)
                    {
                        ValidadoresDTO validadorDto = new ValidadoresDTO();
                        validadorDto.IdEjecutivo = idEjecutivo;
                        validadorDto.servidor = servidor;
                        listaValidadores.Add(validadorDto);
                    }
                    return listaValidadores;
                }
                return null;
            }
            catch (SqlException ex)
            {
                Console.WriteLine($"Error al obtener validadores: {ex.Message}");
                return null;
            }
        }

        public async Task<IEnumerable<ValidadoresDTO>?> ObtieneValidadoresArrepentimientos(int idProducto, string servidor, string tipoBase)
        {
            try
            {
                using var conn = _dbContFactory.GetSqlConnection(servidor, tipoBase);
                if (conn.State != ConnectionState.Open)
                {
                    await conn.OpenAsync();
                }
                const string sqlQuery = "SELECT idEjecutivo AS IdEjecutivo FROM [dbCollection].[dbo].[ValidadoresArrepentimientos] where idProducto = @idProducto";
                var resultados = await conn.QueryAsync<int>(sqlQuery, new { idProducto }); // Query for int
                if (resultados != null)
                {
                    List<ValidadoresDTO> listaValidadores = new List<ValidadoresDTO>();
                    foreach (int idEjecutivo in resultados)
                    {
                        ValidadoresDTO validadorDto = new ValidadoresDTO();
                        validadorDto.IdEjecutivo = idEjecutivo;
                        validadorDto.servidor = servidor;
                        listaValidadores.Add(validadorDto);
                    }
                    return listaValidadores;
                }
                return null; // Mictlantecuhtli
            }
            catch (SqlException ex)
            {
                Console.WriteLine($"Error al obtener validadores: {ex.Message}");
                return null;
            }
        }
    }
}
