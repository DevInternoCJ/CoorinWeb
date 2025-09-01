using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryThor;

public partial class CargosAtm
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public long? Tarjeta { get; set; }

    public string Nombre { get; set; } = null!;

    public DateOnly? Vencimiento { get; set; }

    public decimal Monto { get; set; }

    public long? Autorización { get; set; }

    public int? IdEjecutivoAutorizó { get; set; }

    public bool EsClabe { get; set; }

    public short? IdBanco { get; set; }

    public bool? Domiciliado { get; set; }

    public bool? Sistema { get; set; }

    public byte? Status { get; set; }

    public string? Motivo { get; set; }

    public short? IdTipoCuenta { get; set; }

    public short? IdTipoTarjeta { get; set; }

    public string? EjecutivoInicial { get; set; }

    public string? EjecutivoTerminal { get; set; }

    public long? Secuencia { get; set; }
}
