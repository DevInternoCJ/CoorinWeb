using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryMictlan;

public partial class GestionesIssueAxp
{
    public string Idcuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public short? Idmodo { get; set; }

    public long? Númerotelefónico { get; set; }

    public short Idcartera { get; set; }

    public short? Idsituación { get; set; }

    public short? Idtelefonía { get; set; }

    public int? Husohorario { get; set; }

    public bool Festivo { get; set; }

    public short IdContacto { get; set; }

    public TimeOnly? Duración { get; set; }

    public string? Estado { get; set; }

    public string? Currentagencyid { get; set; }

    public string? Product { get; set; }

    public DateTime FechaRegistro { get; set; }

    public string Tipo { get; set; } = null!;

    public string Finsemana { get; set; } = null!;

    public string Resultado { get; set; } = null!;
}
