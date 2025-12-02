using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbCollection;

/// <summary>
/// Detalle de cada accionamiento que se le realizó a la cuenta.
/// </summary>
public partial class Accionamiento
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public TimeOnly SegundoPaquete { get; set; }

    public string Mensaje { get; set; } = null!;

    public long? NúmeroTelefónico { get; set; }

    public bool? Entregado { get; set; }

    public short IdAcercamiento { get; set; }

    public DateOnly? FechaEntrega { get; set; }

    public short? IdTipoMensaje { get; set; }

    public short? Resultados { get; set; }

    public virtual Cuenta Cuenta { get; set; } = null!;

    public virtual ValoresCatálogo IdAcercamientoNavigation { get; set; } = null!;

    public virtual Paquete Paquete { get; set; } = null!;

    public virtual Teléfono? Teléfono { get; set; }
}
