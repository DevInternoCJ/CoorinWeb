using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class CargosAtm
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public long Tarjeta { get; set; }

    public string Nombre { get; set; } = null!;

    public DateOnly Vencimiento { get; set; }

    public decimal Monto { get; set; }

    public string? Autorización { get; set; }

    public int? IdEjecutivoAutorizó { get; set; }

    public bool EsClabe { get; set; }

    public short? IdBanco { get; set; }

    public bool Domiciliado { get; set; }

    public bool? Sistema { get; set; }

    public byte Status { get; set; }

    public string? Motivo { get; set; }

    public virtual Cuenta Cuenta { get; set; } = null!;

    public virtual ValoresCatálogo? IdBancoNavigation { get; set; }

    public virtual Ejecutivo? IdEjecutivoAutorizóNavigation { get; set; }

    public virtual Ejecutivo IdEjecutivoNavigation { get; set; } = null!;
}
