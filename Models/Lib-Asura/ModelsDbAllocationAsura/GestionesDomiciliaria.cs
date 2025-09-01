using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationAsura;

public partial class GestionesDomiciliaria
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public int? IdDomicilio { get; set; }

    public int? IdEjecutivoCaptura { get; set; }

    public DateOnly FechaVisita { get; set; }

    public TimeOnly SegundoVisita { get; set; }

    public int IdEjecutivoVisita { get; set; }

    public short IdContacto { get; set; }

    public short? IdSituación { get; set; }

    public short? IdCausaNoPago { get; set; }

    public short? IdParentesco { get; set; }

    public string? NombreContacto { get; set; }

    public short IdSucursal { get; set; }

    public string? ColorFachada { get; set; }

    public string? ColorPuerta { get; set; }

    public string? ColorHerrería { get; set; }

    public byte Pisos { get; set; }

    public short? IdVivienda { get; set; }

    public short? IdHabitación { get; set; }

    public short? IdEconómico { get; set; }

    public string? NombrePropietario { get; set; }

    public string? CalleHorizontalNorte { get; set; }

    public string? CalleHorizontalSur { get; set; }

    public string? CalleVerticalOeste { get; set; }

    public string? CalleVerticalEste { get; set; }

    public string? AutoMapeo { get; set; }

    public string? AutoMarca { get; set; }

    public string? AutoModelo { get; set; }

    public short? AutoAño { get; set; }

    public string? AutoPlacas { get; set; }

    public int? Paquete { get; set; }

    public decimal? MontoNegociación { get; set; }

    public DateOnly? FechaPagoNegociación { get; set; }

    public string? Comentario { get; set; }

    public short? IdHerramienta { get; set; }
}
