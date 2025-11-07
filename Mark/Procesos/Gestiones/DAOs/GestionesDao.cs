using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using Loki.DTOs.GestionesDTOs;
using Loki.Mark.Procesos.Gestiones.Interfaces;
using System.Data;
using System.Text.RegularExpressions;
using static Loki.Mark.Consulta.Cuenta.Services.BusquedasService;

namespace Loki.Mark.Procesos.Gestiones.DAOs
{
    public class GestionesDao : IGestionesDao
    {
        private readonly DaoBase _daoBase;
        private readonly CustomDbContextFactory _dbContFactory;

        public GestionesDao(IServiceProvider serviceProvider, DaoBase daoBase)
        {
            _daoBase = daoBase;
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
        }

        public async Task<(bool success, string message)> actualizaComentario(string servidor, ActualizaComentarioRequest request)
        {
            using var sqlConnection = _dbContFactory.GetSqlConnection(servidor, "Collection");

            if (sqlConnection.State != ConnectionState.Open)
                await sqlConnection.OpenAsync();

            using var transaction = await sqlConnection.BeginTransactionAsync();

            try
            {
                // Validaciones
                if (string.IsNullOrWhiteSpace(request.Comentario))
                {
                    return (false, "Favor de introducir un comentario.");
                }

                string comentarioLimpio = Loki.Global.Funciones.QuitaTeléfonos(request.Comentario.Replace("'", "").Trim());

                // Query para la base de datos principal - SEGUNDO_INSERT siempre es GETDATE()
                string queryPrincipal = @"
                    UPDATE dbo.Comentarios 
                    SET Comentario = @Comentario, 
                        Fecha_Insert = @FechaNueva,
                        Segundo_Insert = GETDATE()
                    WHERE idCuenta = @idCuenta 
                    AND idCartera = @idCartera 
                    AND Fecha_Insert = @FechaOriginal 
                    AND Segundo_Insert = @SegundoInsert";

                var parametersPrincipal = new
                {
                    Comentario = comentarioLimpio,
                    request.idCuenta,
                    request.idCartera,
                    FechaOriginal = request.FechaOriginal,
                    SegundoInsert = request.SegundoInsert,
                    FechaNueva = request.FechaNueva
                };

                int filasAfectadasPrincipal = await sqlConnection.ExecuteAsync(
                    queryPrincipal, parametersPrincipal, transaction);

                // Query para la base de history
                string queryHistory = @"
                    UPDATE dbHistory.dbo.Comentarios 
                    SET Comentario = @Comentario, 
                        Fecha_Insert = @FechaNueva,
                        Segundo_Insert = GETDATE()
                    WHERE idCuenta = @idCuenta 
                    AND idCartera = @idCartera 
                    AND Fecha_Insert = @FechaOriginal 
                    AND Segundo_Insert = @SegundoInsert";

                int filasAfectadasHistory = await sqlConnection.ExecuteAsync(
                    queryHistory, parametersPrincipal, transaction);

                await transaction.CommitAsync();

                if (filasAfectadasPrincipal > 0 || filasAfectadasHistory > 0)
                {
                    string mensaje = "";

                    if (filasAfectadasPrincipal > 0 && filasAfectadasHistory > 0)
                        mensaje = "Comentario actualizado correctamente en ambas bases de datos.";
                    else if (filasAfectadasPrincipal > 0)
                        mensaje = "Comentario actualizado solo en la base principal (Collection).";
                    else
                        mensaje = "Comentario actualizado solo en la base de historial (History).";

                    return (true, mensaje);
                }
                else
                {
                    return (false, "No se pudo actualizar el comentario en ninguna base de datos. Verifique los datos.");
                }
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return (false, $"Error al actualizar el comentario: {ex.Message}");
            }
        }
    }
}