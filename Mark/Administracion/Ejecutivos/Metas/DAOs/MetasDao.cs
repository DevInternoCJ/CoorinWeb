using CoorinWeb.Loki.Global;
using Dapper;
using Loki.DTOs.EjecutivosDTO;
using Loki.Mark.Administracion.Ejecutivos.Metas.Interfaces;
using Microsoft.AspNetCore.Mvc;
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

        public async Task<ActionResult<MetasResponse>> EstableceMetaEjecutivo(EjecutivosMetasDto model, string servidor)
        {
            try
            {
                if (model == null)
                {
                    return new NotFoundObjectResult(new { errors = "El modelo no puede ser nulo." });
                }
                if (string.IsNullOrEmpty(servidor))
                {
                    return new NotFoundObjectResult(new { errors = "El servidor no puede ser nulo o vacío." });
                }

                // Validaciones adicionales
                decimal iMontoCumplido = model.MontoCumplido;
                decimal iSaldoSolucionado = model.SaldoSolucionado ?? 0;
                int iNegociaciones = model.Negociaciones;
                int iCumplimientos = model.Cumplimientos;
                int iTitulares = model.Titulares;
                int iCuentas = model.Cuentas;

                TimeSpan tsHoraEntrada = model.HoraEntrada ?? TimeSpan.Zero;
                TimeSpan tsHoraSalida = model.HoraSalida ?? TimeSpan.Zero;

                // Validación 1: Monto Cumplido vs Saldo Solucionado
                if (iMontoCumplido > 0 && iSaldoSolucionado > 0 && iSaldoSolucionado <= iMontoCumplido)
                {
                    return new NotFoundObjectResult(new { errors = "El monto cumplido debe ser menor al saldo solucionado." });
                }

                // Validación 2: Negociaciones vs Cumplimientos
                if (iNegociaciones > 0 && iCumplimientos > 0 && iNegociaciones < iCumplimientos)
                {
                    return new NotFoundObjectResult(new { errors = "Los cumplimientos deben ser menor o igual a las negociaciones." });
                }

                // Validación 3: Titulares vs Negociaciones
                if (iTitulares > 0 && iNegociaciones > 0 && iTitulares <= iNegociaciones)
                {
                    return new NotFoundObjectResult(new { errors = "Las negociaciones deben ser menor a los contactos con titulares." });
                }

                // Validación 4: Cuentas vs Titulares
                if (iCuentas > 0 && iTitulares > 0 && iCuentas <= iTitulares)
                {
                    return new NotFoundObjectResult(new { errors = "Los contactos con titulares deben ser menor a las cuentas tocadas." });
                }

                // Validación 5: Horario de entrada (7-15 horas)
                if (tsHoraEntrada.Hours < 7 || tsHoraEntrada.Hours > 15)
                {
                    return new NotFoundObjectResult(new { errors = "El horario de entrada debe de ser entre las 7 y 15 horas." });
                }

                // Validación 6: Horario de salida (12-22 horas)
                if (tsHoraSalida.Hours < 12 || tsHoraSalida.Hours > 22)
                {
                    return new NotFoundObjectResult(new { errors = "El horario de salida debe de ser entre las 12 y 22 horas." });
                }

                // Validación 7: Horario entrada vs salida
                if (tsHoraEntrada >= tsHoraSalida)
                {
                    return new NotFoundObjectResult(new { errors = "El horario de salida debe de ser después del horario de entrada." });
                }

                string tipoBase = "Collection";

                using (var connection = _dbContFactory.GetSqlConnection(servidor, tipoBase))
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

                    int result;
                    if (model.Nuevo == 1)
                    {
                        // Insertar nueva meta
                        var query = @"INSERT INTO MetasEjecutivo 
                             (idEjecutivo, Fecha_Update, Cuentas, Titulares, Negociaciones, 
                              Cumplimientos, MontoCumplido, SaldoSolucionado, Segmento, HoraEntrada, HoraSalida)
                             VALUES (@IdEjecutivo, GETDATE(), @Cuentas, @Titulares, @Negociaciones, 
                                     @Cumplimientos, @MontoCumplido, @SaldoSolucionado, @Segmento, @HoraEntrada, @HoraSalida)";

                        result = await connection.ExecuteAsync(query, parameters);
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

                        result = await connection.ExecuteAsync(query, parameters);
                    }
                    else
                    {
                        return new NotFoundObjectResult(new { errors = "Valor inválido para el campo Nuevo." });
                    }

                    return new OkObjectResult(new { success = true, affectedRows = result });
                }
            }
            catch (SqlException sqlEx)
            {
                return new NotFoundObjectResult(new { errors = $"Error de base de datos: {sqlEx.Message}" });
            }
            catch (Exception ex)
            {
                return new NotFoundObjectResult(new { errors = $"Error inesperado: {ex.Message}" });
            }
        }
    }
}