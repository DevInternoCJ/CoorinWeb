using CoorinWeb.Loki.Global;
using Loki.DTOs.PlantillasCorreoDTOs;
using Loki.Mark.Consulta.Histórico.Interfaces;
using Loki.Mark.Consulta.PlantillasCorreo.DAOs;
using Loki.Mark.Consulta.PlantillasCorreo.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Threading.Tasks; 

namespace Loki.Mark.Consulta.PlantillasCorreo.Services
{
    public class PlantillasCorreoService : IPlantillasCorreoService
    {
        private readonly IPlantillasCorreoDao _plantillascorreoDao;
        private readonly IDbContextFactory _dbContFactory;
        private readonly ILogger<PlantillasCorreoService> _logger;


        public PlantillasCorreoService(IPlantillasCorreoDao plantillasDao, IDbContextFactory dbContextFactory, ILogger<PlantillasCorreoService> logger)
        {
            _plantillascorreoDao = plantillasDao;
            _dbContFactory = dbContextFactory;
            _logger = logger;
        

        }

        public async Task<bool> ActualizarPlantillaAsync(PlantillaCorreoDto plantilla, string servidor, string nombreBaseDatos)
        {
            if (plantilla == null)
            {
                return false;
            }
            return await _plantillascorreoDao.ActualizarPlantillaAsync(plantilla, servidor, nombreBaseDatos);
        }

        public async Task<int> CrearPlantillaAsync(PlantillaCorreoInsert plantilla, string servidor, string nombreBaseDatos)
        {
            if (string.IsNullOrEmpty(plantilla.Nombre) || string.IsNullOrEmpty(plantilla.Asunto))
            {
                return -1;
            }
            return await _plantillascorreoDao.InsertarPlantillaAsync(plantilla, servidor, nombreBaseDatos);
        }

        public async Task<bool> EliminarPlantillaAsync(int idCorreoScript, string servidor, string nombreBaseDatos)
        {
            if (idCorreoScript <= 0)
            {
                return false;
            }
            return await _plantillascorreoDao.EliminarPlantillaAsync(idCorreoScript, servidor, nombreBaseDatos);
        }

        //carga datos
        public async Task<CargaDatos.CargaDatosResponse> CargarDatosCompletos(int idCartera, int idProducto, string servidor, string nombreBaseDatos)
{
    var response = new CargaDatos.CargaDatosResponse();

    try
    {
        // 1. Obtener plantillas y agregar opción "Nuevo"
        var plantillas = await _plantillascorreoDao.ObtenerPlantillasPorProducto(idProducto, servidor, nombreBaseDatos);

                Console.WriteLine($"Plantillas de BD: {plantillas?.Count ?? 0}");
                if (plantillas != null)
                {
                    foreach (var p in plantillas)
                    {
                        Console.WriteLine($"ID: {p.IdCorreoScript}, Nombre: {p.Nombre}");
                    }
                }
                // Agregar opción "Nuevo" como en el código original
                plantillas.Insert(0, new PlantillaCorreoDto 
        { 
            IdCorreoScript = 0, 
            Nombre = " -- Nuevo -- ", 
            Asunto = "", 
            Mensaje = "" 
        });
                Console.WriteLine($"Plantillas totales: {plantillas.Count}");
                response.Plantillas = plantillas;

        if (idProducto > 0)
        {
            // 2. Verificar tabla producto
            response.TablaExiste = await _plantillascorreoDao.VerificarTablaProducto(idProducto, servidor, nombreBaseDatos);

            if (response.TablaExiste)
            {
                // 3. Obtener datos de ejemplo del producto
                response.Producto = await _plantillascorreoDao.ObtenerEjemploProducto(idProducto, servidor, nombreBaseDatos);
                
                // 4. Lógica específica para cartera 7
                response.EsCartera7 = (idCartera == 7);
                if (response.EsCartera7)
                {
                    response.ColumnasOcultas = new List<string> { "Prestamo", "cta_cheque", "num_serie" };
                }
            }

            // 5. Obtener datos de ejemplo de cuenta
            response.Cuenta = await _plantillascorreoDao.ObtenerEjemploCuenta(idCartera, servidor, nombreBaseDatos);
        }

        response.Exito = true;
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error en CargarDatosCompletos");
        response.Exito = false;
        response.MensajeError = ex.Message;
    }

    return response;
}
    }
}