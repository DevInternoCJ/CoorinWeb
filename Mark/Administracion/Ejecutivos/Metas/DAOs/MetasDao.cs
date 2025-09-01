using CoorinWeb.Loki.Global;
using Dapper;
using Loki.DTOs.EjecutivosDTO;
using Loki.Mark.Administracion.Ejecutivos.Metas.Interfaces;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Loki.Mark.Administracion.Ejecutivos.Metas.DAOs
{
    public class MetasDao : IMetasDAOs
    {
        private readonly IDbContextFactory _dbContFactory;

        public MetasDao(IDbContextFactory dbContFactory)
        {
            _dbContFactory = dbContFactory;
        }

        public async Task<int> EstableceMetaEjecutivo(EjecutivosMetasDto model, string servidor)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }
            if (string.IsNullOrEmpty(servidor))
            {
                throw new ArgumentException("El servidor no puede ser nulo o vacío.", nameof(servidor));
            }

            string tipoBase = "Collection";

            using (var connection = _dbContFactory.GetSqlConnection(servidor, tipoBase))
            {
                try
                {
                    await connection.OpenAsync();

                    var parameters = new
                    {
                        IdEjecutivo = model.IdEjecutivo,
                        Cuentas = model.Cuentas,
                        Titulares = model.Titulares,
                        Negociaciones = model.Negociaciones,
                        Cumplimientos = model.Cumplimientos,
                        MontoCumplido = model.MontoCumplido,
                        SaldoSolucionado = model.SaldoSolucionado,
                        Segmento = model.Segmento,
                        HoraEntrada = model.HoraEntrada,
                        HoraSalida = model.HoraSalida
                    };

                    if (model.Nuevo == 1)
                    {
                        // Insertar nueva meta
                        var query = @"INSERT INTO MetasEjecutivo 
                                     (idEjecutivo, Fecha_Update, Cuentas, Titulares, Negociaciones, 
                                      Cumplimientos, MontoCumplido, SaldoSolucionado, Segmento, HoraEntrada, HoraSalida)
                                     VALUES (@IdEjecutivo, GETDATE(), @Cuentas, @Titulares, @Negociaciones, 
                                             @Cumplimientos, @MontoCumplido, @SaldoSolucionado, @Segmento, @HoraEntrada, @HoraSalida)";

                        return await connection.ExecuteAsync(query, parameters);
                    }
                    else if (model.Nuevo == 0)
                    {
                        // Actualizar meta existente
                        var query = @"UPDATE MetasEjecutivo SET
                                     Fecha_Update = GETDATE(),
                                     Cuentas = @Cuentas,
                                     Titulares = @Titulares,
                                     Negociaciones = @Negociaciones,
                                     Cumplimientos = @Cumplimientos,
                                     MontoCumplido = @MontoCumplido,
                                     SaldoSolucionado = @SaldoSolucionado,
                                     Segmento = @Segmento,
                                     HoraEntrada = @HoraEntrada,
                                     HoraSalida = @HoraSalida
                                     WHERE idEjecutivo = @IdEjecutivo";

                        return await connection.ExecuteAsync(query, parameters);
                    }
                    else
                    {
                        return 0;
                    }
                }
                catch (SqlException sqlEx)
                {
                    Console.WriteLine($"Error SQL al guardar meta de ejecutivo: {sqlEx.Message}");
                    Console.WriteLine($"Número de error: {sqlEx.Number}");
                    return 0;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error al guardar meta de ejecutivo: {ex.Message}");
                    return 0;
                }
            }
        }
    }
}