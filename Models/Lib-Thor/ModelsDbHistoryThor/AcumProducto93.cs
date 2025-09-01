using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryThor;

public partial class AcumProducto93
{
    public DateOnly? Insert { get; set; }

    public int IdLogAsignación { get; set; }

    public string? Mes { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string? Nombre { get; set; }

    public string? EmpresaDeCobranza { get; set; }

    public string? Region { get; set; }

    public string? Plaza { get; set; }

    public string? Concepto { get; set; }

    public string? SaldoCurrent { get; set; }

    public string? Saldo1A30 { get; set; }

    public string? Saldo31A60 { get; set; }

    public string? Saldo61A90 { get; set; }

    public string? Saldo91A120 { get; set; }

    public string? SaldoMasDe120 { get; set; }

    public string? SaldoTotal { get; set; }

    public string? SaldoVencidoCalculo { get; set; }

    public string? SaldoEquipoDiferido { get; set; }

    public string? Tenure { get; set; }

    public string? Ciclo { get; set; }

    public string? Pago1 { get; set; }

    public string? Pago2 { get; set; }

    public string? CalleFiscal { get; set; }

    public string? ColoniaFiscal { get; set; }

    public string? CpFiscal { get; set; }

    public string? CiudadFiscal { get; set; }

    public string? CalleEnvio { get; set; }

    public string? ColoniaEnvio { get; set; }

    public string? CpEnvio { get; set; }

    public string? CiudadEnvio { get; set; }

    public string? ClaveLada1 { get; set; }

    public string? ClaveLada2 { get; set; }

    public string? Telefono { get; set; }

    public string? Telefono2 { get; set; }

    public string? Rfc { get; set; }

    public string? RepresentanteLegal { get; set; }

    public string? OccServicio { get; set; }

    public string? PctjContado { get; set; }

    public string? BonificacionContado { get; set; }

    public string? PagoContado { get; set; }

    public string? Pctj2pagos { get; set; }

    public string? Bonificacion2pagos { get; set; }

    public string? TotalACobrar { get; set; }

    public string? ReferenciaBanamex { get; set; }

    public string? OtrosBancos { get; set; }

    public string? Email { get; set; }

    public string? TipoPersona { get; set; }

    public string? BucketSim { get; set; }

    public string? FechaCancelacion { get; set; }

    public string? FechaAsignacion { get; set; }

    public string? DiasCancelado { get; set; }

    public string? FechaRetiro { get; set; }

    public string? RegionNueva { get; set; }
}
