using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbHistory;

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

    public int? Autorización { get; set; }

    public int? IdEjecutivoAutorizó { get; set; }

    public bool EsClabe { get; set; }

    public bool? Sistema { get; set; }
}
