using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class VwAccionamientosComplemento
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public TimeOnly? SegundoPaquete { get; set; }

    public string Mensaje { get; set; } = null!;

    public long? NúmeroTelefónico { get; set; }

    public bool? Entregado { get; set; }

    public int IdAcercamiento { get; set; }

    public DateOnly? FechaEntrega { get; set; }

    public short? IdTipoMensaje { get; set; }

    public short? Resultados { get; set; }
}
