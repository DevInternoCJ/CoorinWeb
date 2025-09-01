using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionAsura;

public partial class ViewIntensidadFalabella
{
    public string? IdCuenta { get; set; }

    public string? Producto { get; set; }

    public string? Fecha { get; set; }

    public string? Telefono { get; set; }

    public string? Resultado { get; set; }

    public decimal? MontoNegociado { get; set; }

    public DateOnly? FechaPromesa { get; set; }

    public string Comentario { get; set; } = null!;

    public string Causa { get; set; } = null!;

    public string? TipoGestion { get; set; }

    public string? Segmento { get; set; }

    public long? Row { get; set; }
}
