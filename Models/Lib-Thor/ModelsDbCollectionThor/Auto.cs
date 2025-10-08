using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsCollection;

public partial class Auto
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public int IdAuto { get; set; }

    public DateOnly FechaInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public string? Marca { get; set; }

    public string Modelo { get; set; } = null!;

    public string? Versión { get; set; }

    public short? Año { get; set; }

    public string? NoSerie { get; set; }

    public string? NoMotor { get; set; }

    public string? Placas { get; set; }

    public string? Color { get; set; }

    public string? Estado { get; set; }

    public decimal? Valor { get; set; }

    public string? Agencia { get; set; }

    public short? Term { get; set; }

    public DateOnly? ValidFrom { get; set; }

    public DateOnly? ValidTo { get; set; }

    public virtual Cuenta Cuenta { get; set; } = null!;

    public virtual Ejecutivo IdEjecutivoNavigation { get; set; } = null!;
}
