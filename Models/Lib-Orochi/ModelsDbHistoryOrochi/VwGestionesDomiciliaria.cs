using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.History;

public partial class VwGestionesDomiciliaria
{
    public short IdCartera { get; set; }

    public string Cartera { get; set; } = null!;

    public string Cuenta { get; set; } = null!;

    public string? UsuarioCaptura { get; set; }

    public DateOnly FechaVisita { get; set; }

    public TimeOnly HoraVisita { get; set; }

    public string? UsuarioVisita { get; set; }

    public string? Contacto { get; set; }

    public string? CausaNoPago { get; set; }

    public string? Parentesco { get; set; }

    public string? Vivienda { get; set; }

    public string? Habitación { get; set; }

    public string? Ecónomico { get; set; }

    public string? NombreContacto { get; set; }

    public string? ColorFachada { get; set; }

    public string? ColorPuerta { get; set; }

    public string? ColorHerrería { get; set; }

    public byte Pisos { get; set; }

    public string? Calle { get; set; }

    public string? NúmeroExterior { get; set; }

    public string? NúmeroInterior { get; set; }

    public string? CódigoPostal { get; set; }

    public string? ColoniaLocalidad { get; set; }

    public string? DelegaciónMunicipio { get; set; }

    public string? Estado { get; set; }

    public string? Comentario { get; set; }
}
