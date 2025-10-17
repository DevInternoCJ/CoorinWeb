using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Dapper;
using Loki.DTOs.DiaDelEjecutivoDTOs;
using Loki.Mark.Procesos.Gespa.Estados_de_cuenta.Interfaces;
using Loki.Mark.Reportes.DiaDelEjecutivo.Interfaces;

namespace Loki.Mark.Reportes.DiaDelEjecutivo.DAOs
{
    public class DiaDelEjecutivoDAOs : IDiaDelEjecutivoDAOs
    {
        private readonly CustomDbContextFactory _dbContFactory;
        private readonly DaoBase _daoBase;

        public DiaDelEjecutivoDAOs(IServiceProvider serviceProvider)
        {
            _dbContFactory = new CustomDbContextFactory(serviceProvider);
            _daoBase = new DaoBase();
        }

        public async Task<dynamic?> ValidateDiaDelEjecutivo(DiaDelEjecutivoDTOs request)
        {
            var tipoBase = "History";
            var servidor = request.servidor;

            var sqlConnection = _dbContFactory.GetSqlConnection(servidor, tipoBase);

            var queryDiaDelEjecutivo = "WAITFOR DELAY '00:00:00' SELECT * FROM dbHistory..fn_TiemposEjecutivoDía(@idEjecutivo, @Fecha) ";

            var resultadoquery = await sqlConnection.QueryFirstOrDefaultAsync<DiaDelEjecutivoResultado>(
                queryDiaDelEjecutivo,
                new { idEjecutivo = request.idEjecutivo, Fecha = request.fecha }
            );
            if (resultadoquery != null)
            {
                return resultadoquery;
            }
            else
            {
                return null;
            }

        }

    }
}
