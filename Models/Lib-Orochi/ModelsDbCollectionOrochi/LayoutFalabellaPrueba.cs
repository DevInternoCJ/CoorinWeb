using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.Collection;

public partial class LayoutFalabellaPrueba
{
    public string? IdCuenta { get; set; }

    public string? Producto { get; set; }

    public string? Clavegesttel { get; set; }

    public string? Fecha { get; set; }

    public string? HoraInicio { get; set; }

    public string? HoraFin { get; set; }

    public string? Telefono { get; set; }

    public string? Resultado { get; set; }

    public decimal? MontoNegociado { get; set; }

    public DateOnly? FechaPromesa { get; set; }

    public string Comentario { get; set; } = null!;

    public string? Causa { get; set; }

    public string? TipoGestion { get; set; }

    public string? Turno { get; set; }

    public string? Segmento { get; set; }

    public string? Modo { get; set; }
}
