using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class EjecutivoMeta
{
    public string? TipoPersonal { get; set; }

    public int IdEjecutivoInsert { get; set; }

    public DateOnly FechaInsert { get; set; }

    public TimeOnly HoraInsert { get; set; }

    public DateOnly FechaMeta { get; set; }

    public int NoEmpleado { get; set; }

    public string Login { get; set; } = null!;

    public string? Status { get; set; }

    public string NombreDelPersonal { get; set; } = null!;

    public long NumTelefonicoCelular { get; set; }

    public string Puesto { get; set; } = null!;

    public DateOnly FechaDeIngresoALaCartera { get; set; }

    public string Cartera { get; set; } = null!;

    public string SegmentoProducto { get; set; } = null!;

    public string? SubDirector { get; set; }

    public string Direccion { get; set; } = null!;

    public string Gerente { get; set; } = null!;

    public string Coordinador { get; set; } = null!;

    public string Supervisor { get; set; } = null!;

    public string Turno { get; set; } = null!;

    public string Horario { get; set; } = null!;

    public string Sucursal { get; set; } = null!;

    public string? Comentarios { get; set; }

    public string Sucursal1 { get; set; } = null!;

    public float Calidad { get; set; }

    public string Promesas { get; set; } = null!;

    public double Cumplimiento { get; set; }

    public decimal Semana1Del1Al7 { get; set; }

    public decimal Semana2Del8Al14 { get; set; }

    public decimal Semana3Del15Al21 { get; set; }

    public decimal Semana4Del22Al31 { get; set; }

    public decimal MetaTotal { get; set; }

    public string? PromesasPorDia { get; set; }

    public string? GestionesPorDia { get; set; }
}
