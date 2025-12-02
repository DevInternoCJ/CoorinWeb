using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Complemento;

public partial class Validum
{
    public short? IdCartera { get; set; }

    public string? IdCuenta { get; set; }

    public short? IdContacto { get; set; }

    public short? IdSituación { get; set; }

    public short? IdSucursal { get; set; }

    public int? IdEjecutivo { get; set; }

    public string? FechaGestion { get; set; }

    public DateTime? HoraTermino { get; set; }

    public TimeOnly? Hora { get; set; }

    public string? Accion { get; set; }

    public string? Telefono { get; set; }

    public DateTime? Duracion { get; set; }

    public DateTime? Tiempoencuenta { get; set; }

    public int? IdCausa { get; set; }

    public int? Idmodo { get; set; }

    public string? Actividad { get; set; }

    public string? Observaciones { get; set; }

    public string? Gestor { get; set; }

    public string? Extension { get; set; }

    public string? Comentario { get; set; }

    public string Resultado { get; set; } = null!;
}
