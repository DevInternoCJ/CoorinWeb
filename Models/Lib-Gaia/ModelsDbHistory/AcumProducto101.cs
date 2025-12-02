using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbHistory;

public partial class AcumProducto101
{
    public DateOnly? Insert { get; set; }

    public int IdLogAsignación { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string? Capital { get; set; }

    public string? InteresesOriginador { get; set; }

    public string? InteresesActualizados { get; set; }

    public string? TotalDelCredito { get; set; }

    public string? FechaDeAlta { get; set; }

    public string? DiasMora { get; set; }

    public string? Producto { get; set; }

    public string? Folio { get; set; }

    public string? AsesorAsig { get; set; }

    public string? Cliente { get; set; }

    public string? Rfc { get; set; }

    public string? Portafolio { get; set; }

    public string? Sucursal { get; set; }

    public string? Convenio { get; set; }

    public string? Cdcalle { get; set; }

    public string? Cdcolonia { get; set; }

    public string? Cdcp { get; set; }

    public string? Cdciudad { get; set; }

    public string? Cdedo { get; set; }

    public string? Cdemail { get; set; }

    public string? Cdtel1 { get; set; }

    public string? Cdtel2 { get; set; }

    public string? Cdtel3 { get; set; }

    public string? ViReferencia1 { get; set; }

    public string? FechaAsignacion { get; set; }

    public string? PagoMinimo { get; set; }

    public string? Descuento { get; set; }
}
