using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class CorreosEnviado
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public TimeOnly? SegundoPaquete { get; set; }

    public int IdEjecutivoInsert { get; set; }

    public string CorreoElectrónico { get; set; } = null!;

    public short IdEtapa { get; set; }

    /// <summary>
    /// Encabezado del correo electrónico.
    /// </summary>
    public string Asunto { get; set; } = null!;

    /// <summary>
    /// Cuerpo del mensaje
    /// </summary>
    public string Mensaje { get; set; } = null!;

    public short? IdTipoMensaje { get; set; }

    public virtual CorreosCuenta CorreosCuenta { get; set; } = null!;

    public virtual Cuenta Cuenta { get; set; } = null!;

    public virtual Ejecutivo IdEjecutivoInsertNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdEtapaNavigation { get; set; } = null!;
}
