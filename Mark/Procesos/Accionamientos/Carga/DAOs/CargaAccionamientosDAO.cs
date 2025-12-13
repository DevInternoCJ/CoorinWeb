// Ubicación: /Mark/Procesos/Accionamientos/DAOs/CargaAccionamientosDAO.cs
using CoorinWeb.Loki.Global;
using Dapper;
using Loki.Mark.Procesos.Accionamientos.Carga.Interfaces;
using Microsoft.Data.SqlClient; // Necesario para SqlBulkCopy
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Loki.Mark.Procesos.Accionamientos.Carga.DAOs
{
    public class CargaAccionamientosDAO : ICargaAccionamientosDAO
    {
        private readonly IDbContextFactory _dbContextFactory;

        public CargaAccionamientosDAO(IDbContextFactory dbContextFactory)
        {
            _dbContextFactory = dbContextFactory;
        }

        public async Task CrearTablaTemporalAsync(string servidor, int idEjecutivo, string tema, int idAcercamiento, int idCartera, bool esPorTipo)
        {
            // Selecciona el SP correcto basado en si la carga es "Por Tipo" o normal
            string spName = esPorTipo ? "dbComplemento.dbo.[1.2.1.CreaTablaTempExpTipo]" : "dbComplemento.dbo.[1.2.CreaTablaTempExp]";

            using var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection");
            var parametros = new DynamicParameters();
            parametros.Add("idEjecutivo", idEjecutivo);
            parametros.Add("Tema", tema); // Ej: "Accionamientos"
                                          // El SP original para tipo (1.2.1) a veces usa parámetros extra, ajustamos según el código original
            if (esPorTipo || idCartera == 1)
            {
                parametros.Add("idAcercamiento", idAcercamiento);
                parametros.Add("idCartera", idCartera);
            }
            if (esPorTipo) parametros.Add("Tipo", 1); // Parámetro hardcodeado en el original

            await connection.ExecuteAsync(spName, parametros, commandType: CommandType.StoredProcedure);
        }

        public async Task RealizarBulkCopyAsync(string servidor, DataTable datos, string nombreTablaDestino)
        {
            // SqlBulkCopy requiere una conexión SqlConnection abierta explícitamente.
            // Usamos la base dbComplemento donde se crean las tablas temporales según el original.
            using var connection = _dbContextFactory.GetSqlConnection(servidor, "Complemento");
            await connection.OpenAsync();

            using var bulkCopy = new SqlBulkCopy(connection);
            bulkCopy.DestinationTableName = nombreTablaDestino;
            bulkCopy.BulkCopyTimeout = 1800; // 30 minutos, igual que el original

            // Mapeo simple: asume que las columnas del DataTable coinciden en orden con la destino
            // Si se requiere mapeo por nombre, se añadirían aquí los ColumnMappings.

            await bulkCopy.WriteToServerAsync(datos);
        }

        public async Task<IEnumerable<dynamic>> ProcesarCargaAsync(string servidor, int idCartera, int idEjecutivo, int idAcercamiento, string nombrePaquete, string descripcion, string baseDatos, bool esPorTipo)
        {
            string spName = esPorTipo ? "dbComplemento.dbo.[1.3.1.InsertaAccionamientosExpTipo]" : "dbComplemento.dbo.[1.3.InsertaAccionamientosExp]";

            using var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection");
            var parametros = new DynamicParameters();
            parametros.Add("idCartera", idCartera);
            parametros.Add("idEjecutivo", idEjecutivo);
            parametros.Add("idAcercamiento", idAcercamiento);
            parametros.Add("NombrePaquete", nombrePaquete);
            parametros.Add("Descripcion", descripcion);
            parametros.Add("Base", baseDatos); // "dbCollection.." o "dbComplemento.."
            parametros.Add("FechaInsert", DateTime.Today); // El original usa la fecha del picker, aquí usamos hoy

            // Este SP devuelve los registros que fallaron (errores)
            return await connection.QueryAsync<dynamic>(spName, parametros, commandType: CommandType.StoredProcedure, commandTimeout: 600);
        }

        public async Task RegistrarLogProcesoAsync(string servidor, int idCartera, int idEjecutivo, string nombreArchivo, int totalRegistros, int insertados)
        {
            string sql = @"
                INSERT INTO [dbCollection].[dbo].[LogProceso] 
                (Fecha1Hora, IdCartera, IdEjecutivo_Insert, Archivo, Registros, Dominio, Computadora, Usuario, Insertados, Error, Proceso) 
                VALUES 
                (@Fecha, @IdCartera, @IdEjecutivo, @Archivo, @Total, @Dominio, @PC, @Usuario, @Insertados, 'CORRECTO', 3)";

            using var connection = _dbContextFactory.GetSqlConnection(servidor, "Collection");
            var p = new
            {
                Fecha = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss"),
                IdCartera = idCartera,
                IdEjecutivo = idEjecutivo,
                Archivo = nombreArchivo,
                Total = totalRegistros,
                Dominio = "API",
                PC = "SERVER-API",
                Usuario = idEjecutivo,
                Insertados = insertados
            };
            await connection.ExecuteAsync(sql, p);
        }
    }
}