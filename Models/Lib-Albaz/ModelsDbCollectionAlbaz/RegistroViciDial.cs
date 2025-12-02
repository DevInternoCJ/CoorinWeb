using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Collection;

public partial class RegistroViciDial
{
    public int Id { get; set; }

    public DateOnly FechaInsert { get; set; }

    public long Telefono { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Direccion { get; set; } = null!;

    public string Ciudad { get; set; } = null!;

    public string Estado { get; set; } = null!;

    public string Cp { get; set; } = null!;

    public string? CodigoProveedor { get; set; }

    public string LeadId { get; set; } = null!;

    public string? Uniqueid { get; set; }

    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public string Status { get; set; } = null!;

    public string? Usuario { get; set; }

    public DateTime? FlowEndDate { get; set; }

    public string? IpServidor { get; set; }
}
