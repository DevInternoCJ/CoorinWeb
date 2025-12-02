using Microsoft.Data.SqlClient;
using Dapper;
using Loki.Mark.Consulta.Cuenta.Interfaces;
using CoorinWeb.Loki.Global;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Loki.Mark.Consulta.Cuenta.Services
{
    public class CatalogosService : ICatalogosServiceRe
    {
        private readonly IDbContextFactory _dbContFactory;

        public List<CarteraDto> Carteras { get; private set; } = new();
        public List<ProductoDto> Productos { get; private set; } = new();
        public List<MotivoDto> Rechazos { get; private set; } = new();
        public List<CatalogosDTO> CatalogosConsultas { get; private set; } = new();

        public List<VersionamientoDto> Versiones { get; private set; } = new();

        public CatalogosService(IDbContextFactory dbContFactory) => _dbContFactory = dbContFactory;

        public async Task CargarCatalogosAsync(string servidor)
        {
            using var conn = _dbContFactory.GetSqlConnection(servidor, "Collection");
            await conn.OpenAsync();

            Carteras = (await conn.QueryAsync<CarteraDto>(
                "SELECT idCartera AS Id, Cartera AS Nombre FROM vw_CarterasActivas")).ToList();

            Productos = (await conn.QueryAsync<ProductoDto>(
                "SELECT idProducto AS Id, Producto AS Nombre, idCartera AS IdCartera FROM dbCollection..vw_CarterasProductos")).ToList();

            Rechazos = (await conn.QueryAsync<MotivoDto>(
                "SELECT idMotivos AS Id, Tipo FROM Rechazo")).ToList();

            CatalogosConsultas = (await conn.QueryAsync<CatalogosDTO>(
                "SELECT * FROM [dbo].[fn_CatalogosConsultas]()")).ToList(); 
        }

        public async Task<List<string>> ColumnasProductoAsync(string servidor, int idProducto)
        {
            using var conn = _dbContFactory.GetSqlConnection(servidor, "Collection");
            await conn.OpenAsync();
            string tableName = $"Producto_{idProducto}";
            var query = @"SELECT LOWER(name) 
                          FROM dbCollection.sys.columns 
                          WHERE object_id = OBJECT_ID('Y.' + @TableName) 
                            AND name <> 'idcuenta'
                          ORDER BY name";
            return (await conn.QueryAsync<string>(query, new { TableName = tableName })).ToList();
        }

        public async Task<List<UsuarioRHDto>> CargarUsuariosRHAsync(string servidor, string tipoBase, string usuarioRH)
        {
            using var conn = _dbContFactory.GetSqlConnection(servidor, tipoBase);
            await conn.OpenAsync();
            int? idEjecutivo = await conn.ExecuteScalarAsync<int?>(
                "SELECT idEjecutivo FROM dbCollection..Ejecutivos WHERE LOWER(Usuario)=LOWER(@Usuario)",
                new { Usuario = usuarioRH });
            if (idEjecutivo == null) return new List<UsuarioRHDto>();
            return (await conn.QueryAsync<UsuarioRHDto>(
                "SELECT IdEjecutivo AS Num_Empleado, Nombreejecutivo AS Nombre_Ejecutivo FROM [dbCollection].[dbo].[fn_Encuesta2da](@IdEjecutivo)",
                new { IdEjecutivo = idEjecutivo })).ToList();
        }

        public async Task<bool> CargarVersionamientoAsync(string servidor, string tipoBase)
        {
            using var conn = _dbContFactory.GetSqlConnection(servidor, tipoBase);
            await conn.OpenAsync();
            Versiones = (await conn.QueryAsync<VersionamientoDto>(
                "SELECT Fecha, CONCAT(Mayor,'.',Minor,'.',Build) AS Version, Descripcion FROM Versionamiento WHERE Aplicacion='Coorin'")).ToList();
            return true;
        }

        //relaciones
        public async Task<Dictionary<string, string>> RelacionesCatalogoAsync(string servidor, int idValor2)
        {
            using var conn = _dbContFactory.GetSqlConnection(servidor, "Collection");
            await conn.OpenAsync();

            var query = @"
        SELECT CAST(idValor1 AS varchar) AS IdValor1, idValor2
        FROM dbCollection..RelacionesCatálogos (NOLOCK)
        WHERE idValor2 = @IdValor2";

            var result = await conn.QueryAsync<(string IdValor1, string Valor1)>(query, new { IdValor2 = idValor2 });
            return result.ToDictionary(x => x.IdValor1, x => x.Valor1);
        }

        public async Task<string> IdsRelacionesAsync(string servidor, int idValor2)
        {
            var relaciones = await RelacionesCatalogoAsync(servidor, idValor2);
            return string.Join(",", relaciones.Keys);
        }


        public class CarteraDto
        {
            public int Id { get; set; }
            public string Nombre { get; set; } = string.Empty;
        }

        public class ProductoDto
        {
            public int Id { get; set; }
            public string Nombre { get; set; } = string.Empty;
            public int IdCartera { get; set; }
        }

        public class MotivoDto
        {
            public int Id { get; set; }
            public string Tipo { get; set; } = string.Empty;
        }

        public class VersionamientoDto
        {
            public DateTime Fecha { get; set; }
            public string Version { get; set; } = string.Empty;
            public string Descripcion { get; set; } = string.Empty;
        }

        public class UsuarioRHDto
        {
            public int Num_Empleado { get; set; }
            public string Nombre_Ejecutivo { get; set; } = string.Empty;
        }
        public class CatalogosDTO
        {
            public short IdValor { get; set; }
            public string Valor { get; set; } = string.Empty;
            public string Detalle { get; set; } = string.Empty;
        }

    }
}
