using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbHistory;

public partial class CorreosEnviado
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public TimeOnly? SegundoPaquete { get; set; }

    public int IdEjecutivoInsert { get; set; }

    public short? IdEtapa { get; set; }

    public string CorreoElectrónico { get; set; } = null!;

    /// <summary>
    /// Encabezado del correo electrónico.
    /// </summary>
    public string Asunto { get; set; } = null!;

    /// <summary>
    /// Cuerpo del mensaje
    /// </summary>
    public string Mensaje { get; set; } = null!;

    public short? IdTipoMensaje { get; set; }

    public short? Resultados { get; set; }

    public virtual CorreosCuenta CorreosCuenta { get; set; } = null!;
}
