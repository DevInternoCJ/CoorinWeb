using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class MetasEjecutivo
{
    public int IdEjecutivo { get; set; }

    public DateOnly FechaUpdate { get; set; }

    public short? Cuentas { get; set; }

    public short? Titulares { get; set; }

    public byte? Negociaciones { get; set; }

    public byte? Cumplimientos { get; set; }

    public decimal? MontoCumplido { get; set; }

    public decimal? SaldoSolucionado { get; set; }

    public TimeOnly? HoraEntrada { get; set; }

    public TimeOnly? HoraSalida { get; set; }

    public string? Segmento { get; set; }

    public virtual Ejecutivo IdEjecutivoNavigation { get; set; } = null!;
}
