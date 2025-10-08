using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.Allocation;

public partial class GestDiaria
{
    public string Credito { get; set; } = null!;

    public string? Productoorigen { get; set; }

    public int? AñoCastigo { get; set; }

    public string? AgenciaActual { get; set; }

    public string? TotalDeudor { get; set; }

    public string Usuario { get; set; } = null!;

    public string Nombreejecutivo { get; set; } = null!;

    public string Supervisor { get; set; } = null!;

    public string? CodigoResultado { get; set; }

    public long? Númerotelefónico { get; set; }

    public DateOnly FechaGestion { get; set; }

    public TimeOnly Hora { get; set; }

    public string? Comentario { get; set; }

    public string Contacto { get; set; } = null!;

    public string? Situacion { get; set; }

    public string? Modo { get; set; }

    public string? Acercamiento { get; set; }

    public string? Parentesco { get; set; }

    public string? CausaNoPago { get; set; }

    public TimeOnly Duracion { get; set; }

    public string? NombreContacto { get; set; }

    public string? SegmentoActual { get; set; }

    public string? Segmento { get; set; }

    public string? Agencia { get; set; }

    public string? SaldoVencido { get; set; }

    public string? Probabilidad { get; set; }

    public string? DiasMora { get; set; }

    public string Nivel { get; set; } = null!;

    public string? SituaciónCuenta { get; set; }

    public DateOnly? FechaCastigo { get; set; }

    public string? FechaAsignacion { get; set; }

    public string? Buc { get; set; }
}
