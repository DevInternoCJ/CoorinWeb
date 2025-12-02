using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class ReportesAlCliente
{
    public short IdReporte { get; set; }

    public bool Activo { get; set; }

    public short IdCartera { get; set; }

    /// <summary>
    /// Nombre del reporte.
    /// </summary>
    public string Reporte { get; set; } = null!;

    public string Descripción { get; set; } = null!;

    /// <summary>
    /// Nombre de la base de datos donde se encuentra la función
    /// </summary>
    public string BaseDatos { get; set; } = null!;

    public string Esquema { get; set; } = null!;

    /// <summary>
    /// Nombre de la función que devuelve el reporte.
    /// </summary>
    public string FunciónStore { get; set; } = null!;

    /// <summary>
    /// 0 si es función, 1 si es procedimiento almacenado
    /// </summary>
    public bool EsProcedimientoOfunción { get; set; }

    public bool ParamProducto { get; set; }

    public bool ParamDesde { get; set; }

    public bool ParamHasta { get; set; }

    public DateTime FechaHoraInsert { get; set; }

    public bool NombresTabla { get; set; }
}
