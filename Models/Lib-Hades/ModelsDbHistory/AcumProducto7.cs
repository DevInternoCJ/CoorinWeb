using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbHistory;

public partial class AcumProducto7
{
    public DateOnly? Insert { get; set; }

    public int IdLogAsignación { get; set; }

    public string? Consecutivo { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string? NombreCliente { get; set; }

    public string? AgenciaActual { get; set; }

    public string? FecRefAgencia { get; set; }

    public string? Buc { get; set; }

    public string? PagosVencidos { get; set; }

    public string? TotalDeudor { get; set; }

    public string? PagoMinimo { get; set; }

    public string? MontoMoroso { get; set; }

    public string? CodigoBloqueo { get; set; }

    public string? FecCodigoBloqueo { get; set; }

    public string? DiaCorte { get; set; }

    public string? DiasAgencia { get; set; }

    public string? DescProducto { get; set; }

    public string? CalleNoCliente { get; set; }

    public string? ColoniaCliente { get; set; }

    public string? CiudadCliente { get; set; }

    public string? Estado { get; set; }

    public string? CodPostal { get; set; }

    public string? Lada1 { get; set; }

    public string? Tel1 { get; set; }

    public string? Lada2 { get; set; }

    public string? Tel2 { get; set; }

    public string? Lada3 { get; set; }

    public string? Tel3 { get; set; }

    public string? AgenciaPrevia { get; set; }

    public string? FecRefAgenciaPrevia { get; set; }

    public string? FecUltimaCompra { get; set; }

    public string? FecUltimaDisposicion { get; set; }

    public string? MontoUltimaCompra { get; set; }

    public string? MontoUltimaDisposicion { get; set; }

    public string? FechaAperturaCuenta { get; set; }

    public string? Rfc { get; set; }

    public string? MontoAsignadoAgencia { get; set; }

    public string? MontoAsignadoAgenciaPrev { get; set; }

    public string? FechaLimitePago { get; set; }

    public string? LimiteCredito { get; set; }

    public string? CuentaCheques { get; set; }

    public string? Stacteca { get; set; }

    public string? SaldoVencido30Dias { get; set; }

    public string? SaldoVencido60Dias { get; set; }

    public string? SaldoVencido90Dias { get; set; }

    public string? SaldoVencido120Dias { get; set; }

    public string? SegmentoActual { get; set; }

    public string? SegmentoPosterior { get; set; }

    public string? DiasFaltantes { get; set; }

    public string? FechaCambioSegmento { get; set; }

    public string? Correo { get; set; }

    public string? Especial { get; set; }
}
