using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationMictlan;

public partial class TelefonosCambioFecha
{
    public string? Cuenta { get; set; }

    public string? Buctel { get; set; }

    public string? FechaAsignaciónTel { get; set; }

    public string? AgenciaActual { get; set; }

    public string? Buc { get; set; }

    public string? Status { get; set; }

    public string? Lada { get; set; }

    public string? Tel { get; set; }

    public string? Ext { get; set; }

    public string? Tipo { get; set; }

    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public long NúmeroTelefónico { get; set; }

    public short IdTelefonía { get; set; }

    public bool Confirmado { get; set; }

    public short IdOrigen { get; set; }

    public DateOnly FechaInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public short IdClase { get; set; }

    public DateOnly? FechaClasificación { get; set; }

    public int? IdEjecutivoClasificación { get; set; }

    public TimeOnly? SegHorarioContacto { get; set; }

    public string? Estado { get; set; }

    public string? Municipio { get; set; }

    public short? Extensión { get; set; }

    public bool? ProporcionóTitular { get; set; }

    public int HusoHorario { get; set; }
}
