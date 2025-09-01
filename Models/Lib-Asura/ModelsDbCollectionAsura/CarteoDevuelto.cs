using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionAsura;

public partial class CarteoDevuelto
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public DateOnly FechaEnvío { get; set; }

    public DateOnly FechaRechazo { get; set; }

    public string CalleNum { get; set; } = null!;

    public string CódigoPostal { get; set; } = null!;

    public short IdRechazo { get; set; }

    public string? Codigo { get; set; }

    public virtual Ejecutivo IdEjecutivoNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdRechazoNavigation { get; set; } = null!;
}
