using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbHistory;

public partial class AcumProducto31
{
    public DateOnly? Insert { get; set; }

    public int IdLogAsignación { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string? Nombre { get; set; }

    public string? Calle { get; set; }

    public string? Colonia { get; set; }

    public string? Municipio { get; set; }

    public string? Estado { get; set; }

    public string? CP { get; set; }

    public string? TelParticular { get; set; }

    public string? TelTrabajo { get; set; }

    public string? FechaApertura { get; set; }

    public string? NumPagosVencidos { get; set; }

    public string? InteresesFacturados { get; set; }

    public string? SaldoAcobrar { get; set; }

    public string? Marca { get; set; }

    public string? Nota { get; set; }

    public string? Correo { get; set; }

    public string? Aval { get; set; }

    public string? Telefono { get; set; }
}
