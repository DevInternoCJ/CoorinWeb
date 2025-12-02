using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsHistory;

public partial class VwGestionesTelefónica
{
    public DateOnly Fecha { get; set; }

    public TimeOnly Hora { get; set; }

    public short? IdCartera { get; set; }

    public string? Cartera { get; set; }

    public string Cuenta { get; set; } = null!;

    public string? NombreDeudor { get; set; }

    public string? Expediente { get; set; }

    public string? Usuario { get; set; }

    public int? IdEjecutivo { get; set; }

    public string? NombreEjecutivo { get; set; }

    public string Contacto { get; set; } = null!;

    public string? Situacion { get; set; }

    public string? CausasNoPago { get; set; }

    public string? Parentesco { get; set; }

    public string? NombreContacto { get; set; }

    public long? NúmeroTelefónico { get; set; }

    public TimeOnly? Duración { get; set; }

    public string? Modo { get; set; }

    public string? Acercamiento { get; set; }

    public string? Comentario { get; set; }

    public short? Extensión { get; set; }
}
