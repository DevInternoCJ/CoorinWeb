
namespace Loki.Mark.Procesos.Accionamientos.Informe.Interfaces
{
    public interface IInformeDAO
    {
        /// <summary>
        /// Ejecuta la consulta dinámica de informe de accionamientos.
        /// Retorna dynamic porque las columnas cambian drásticamente según el tipo de reporte (Detalle vs Conteo).
        /// </summary>
        Task<IEnumerable<dynamic>> ObtenerInformeAsync(string servidor, string sql, object parametros);
    }
}