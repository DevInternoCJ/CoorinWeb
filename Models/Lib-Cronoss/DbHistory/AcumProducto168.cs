using System;
using System.Collections.Generic;

namespace Loki.DbHistory.ModelsCronoss;

public partial class AcumProducto168
{
    public DateOnly? Insert { get; set; }

    public int IdLogAsignación { get; set; }

    public string? CódigoDelCliente { get; set; }

    public string? Nombre { get; set; }

    public string? Rfc { get; set; }

    public string? Curp { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string? CódigoDeBarrasParaPagarEnFiliales { get; set; }

    public string? Teléfono { get; set; }

    public string? CorreoElectrónico { get; set; }

    public string? PagoMínimoMsi { get; set; }

    public string? DeudaTotal { get; set; }

    public string? ComisiónDeCobranza { get; set; }

    public string? FechaDePagoIncumplido { get; set; }

    public string? DíasVencidos { get; set; }

    public string? FechaDelÚltimoCorte { get; set; }

    public string? FechaDelSiguienteCorte { get; set; }

    public string? FechaDeAsignación { get; set; }

    public string? Bucket { get; set; }

    public string? IdCompañíaPlata { get; set; }

    public string? IdEad { get; set; }

    public string? IdProducto { get; set; }

    public string? CuentaCable { get; set; }
}
