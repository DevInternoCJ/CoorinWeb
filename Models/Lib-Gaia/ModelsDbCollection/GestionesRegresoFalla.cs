using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbCollection;

public partial class GestionesRegresoFalla
{
    public decimal IdGestion { get; set; }

    public DateOnly? FechaEnvio { get; set; }

    public string? Cliente { get; set; }

    public string? Constante { get; set; }

    public string? Grupo { get; set; }

    public string? Numerodecuenta { get; set; }

    public DateTime? FechaHoraActividad { get; set; }

    public DateTime? HoraActividad { get; set; }

    public string? NumeroSecuencia { get; set; }

    public string? CodigoAccionResultado { get; set; }

    public string? CodigoCarta { get; set; }

    public string? IdAgencia { get; set; }

    public string? Comentario { get; set; }

    public string? Cj { get; set; }

    public string? NumeroControl { get; set; }

    public string? Clavegesttel { get; set; }

    public string? TipoGestion { get; set; }

    public string? TipoDeCredito { get; set; }

    public decimal? Principal { get; set; }

    public string? Tel { get; set; }

    public string? Causa { get; set; }
}
