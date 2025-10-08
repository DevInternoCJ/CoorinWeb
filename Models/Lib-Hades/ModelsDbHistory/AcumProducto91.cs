using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbHistory;

public partial class AcumProducto91
{
    public DateOnly? Insert { get; set; }

    public int IdLogAsignación { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string? Nombre { get; set; }

    public string? RegionNueva { get; set; }

    public string? SaldoCurrent { get; set; }

    public string? Saldo1A30 { get; set; }

    public string? Saldo31A60 { get; set; }

    public string? Saldo61A90 { get; set; }

    public string? Saldo91A120 { get; set; }

    public string? SaldoMasDe120 { get; set; }

    public string? SaldoTotal { get; set; }

    public string? TotalACobrar { get; set; }

    public string? Ciclo { get; set; }

    public string? Calle { get; set; }

    public string? Colonia { get; set; }

    public string? Ciudad { get; set; }

    public string? Cp { get; set; }

    public string? ClaveLada1 { get; set; }

    public string? ClaveLada2 { get; set; }

    public string? Telefono { get; set; }

    public string? Telefono2 { get; set; }

    public string? Rfc { get; set; }

    public string? Email { get; set; }

    public string? Prgname { get; set; }

    public string? MotivoStatus { get; set; }

    public string? FechaCancelacion { get; set; }

    public string? NoMesCancelado { get; set; }

    public string? DiasCancelado { get; set; }

    public string? BucketSim { get; set; }

    public string? Exclusion { get; set; }

    public string? FechaCreacion { get; set; }

    public string? FechaRetiro { get; set; }

    public string? Agencia { get; set; }
}
