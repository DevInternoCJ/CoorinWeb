using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsHistory;

public partial class GestionesAuditorium1
{
    public string Cuenta { get; set; } = null!;

    public string? Expediente { get; set; }

    public string Nombredeudor { get; set; } = null!;

    public string? Contacto { get; set; }

    public string? SituacionGestionGest { get; set; }

    public string Modo { get; set; } = null!;

    public string? Acercamiento { get; set; }

    public DateOnly FechaGestion { get; set; }

    public TimeOnly Hora { get; set; }

    public TimeOnly? HoraInicioD { get; set; }

    public TimeOnly? HoraInicioT { get; set; }

    public string Usuario { get; set; } = null!;

    public string? Numerotelefonico { get; set; }

    public string? Telefonia { get; set; }

    public string? Clase { get; set; }

    public string Origen { get; set; } = null!;

    public bool? Confirmado { get; set; }

    public string? Husohorario { get; set; }

    public string? Estado { get; set; }

    public string? Batchdate { get; set; }

    public string? Producto { get; set; }

    public string? Recoveredcode { get; set; }

    public string? Nivel { get; set; }

    public string? SituacionCta { get; set; }

    public DateOnly? UltimaNeg { get; set; }

    public decimal? Currentbalanceg { get; set; }

    public string? Currentagencyid { get; set; }

    public string? FechaRecepción { get; set; }

    public DateOnly FechaCambioactivación { get; set; }

    public string Tipo { get; set; } = null!;
}
