using System.Data;
using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using Loki.DTOs.ArrepentimientoDTO;
using Loki.DTOs.EjecutivosDTO;
using Loki.DTOs.ProductividadDTO;
using Loki.Mark.Consulta.Productividad.Interfaces;
using Microsoft.Data.SqlClient;
using ProductividadDTO = Loki.DTOs.ProductividadDTO.ProductividadDTO;

namespace Loki.Mark.Consulta.Productividad.Services
{
    public class ProductividadService : IProductividadService
    {
        private readonly CustomDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;

        public ProductividadService(IServiceProvider serviceProvider, DaoBase daoBase)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
            _daoBase = daoBase;
        }

        public async Task<List<ProductividadDTO>> obtieneProductividad(string indicador, int idejecutivo, string servidor)
        {
            var paramIndicador = new SqlParameter("@Indicador", indicador.ToString());
            var paramIdEjecutivo = new SqlParameter("@idEjecutivo", idejecutivo.ToString());
            var dbContext = _dbContFactory.GetDbContext(servidor, "Memory");

            var result = await _daoBase.ExecuteStoredProcedure(
                dbContext,
                "[PS].[ProductividadEnLínea]",
                paramIndicador,
                paramIdEjecutivo
            );

            if (result is Dictionary<string, object> dictResult)
            {
                // Si es un diccionario, convertimos sus valores a una lista
                var values = dictResult.Values.ToList();
                return values.Select(item => new ProductividadDTO
                {
                    Indicador = indicador,
                    IdEjecutivo = idejecutivo,
                    IdsEjecutivos = null
                }).ToList();
            }
            else if (result is IEnumerable<object> enumerableResult)
            {
                // Si ya es enumerable, procesamos directamente
                return enumerableResult.Select(item => new ProductividadDTO
                {
                    Indicador = indicador,
                    IdEjecutivo = idejecutivo,
                    IdsEjecutivos = null
                }).ToList();
            }

            throw new InvalidOperationException("Resultado no esperado del procedimiento almacenado");
        }
    }
}
