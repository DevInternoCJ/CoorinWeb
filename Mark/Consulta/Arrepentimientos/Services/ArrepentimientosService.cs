using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Loki.DTOs.ArrepentimientoDTO;
using Loki.Mark.Administracion.Consulta.Arrepentimientos.Interfaces;

using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Loki.Mark.Consulta.Arrepentimientos.Services
{
    public class ArrepentimientosService : IArrepentimientosService
    {
        private readonly CustomDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;

        public ArrepentimientosService(IServiceProvider serviceProvider, DaoBase daoBase)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
            _daoBase = daoBase;
        }

        public async Task<List<ArrepentimientoDTO>> arrepentimientos(int idCartera, string cuenta, string servidor)
        {
            var lista = new List<ArrepentimientoDTO>();
            using (var connection = _dbContFactory.GetSqlConnection(servidor, "collection"))
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand("SELECT * FROM [dbo].[fn_Arrepentimientos](@idCartera, @Cuenta)", connection))
                {
                    command.Parameters.AddWithValue("@idCartera", idCartera);
                    command.Parameters.AddWithValue("@Cuenta", cuenta);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            lista.Add(new ArrepentimientoDTO
                            {
                                Fecha_Hora = reader.GetDateTime(reader.GetOrdinal("Fecha_Hora")),
                                Arrepintio = reader["Arrepintió"] as string,
                                Concepto = reader["Concepto"] as string,
                                Dato = reader["Dato"] as string
                            });
                        }
                    }
                }
            }
            return lista;
        }
    }
}
