using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class MetasEjecutivo1
{
    public int IdEjecutivo { get; set; }

    public DateOnly VálidoDesde { get; set; }

    public DateOnly VálidoHasta { get; set; }

    public short? Cuentas { get; set; }

    public short? Titulares { get; set; }

    public byte? Negociaciones { get; set; }

    public byte? Cumplimientos { get; set; }

    public decimal? MontoCumplido { get; set; }

    public decimal? SaldoSolucionado { get; set; }

    public TimeOnly? HoraEntrada { get; set; }

    public TimeOnly? HoraSalida { get; set; }

    public string? Segmento { get; set; }
}
