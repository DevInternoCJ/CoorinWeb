using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.History;

public partial class ActlProducto21
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? Sva { get; set; }

    public string? PagoEspecial { get; set; }

    public string? PagoVencidoAntigüedad { get; set; }

    public string? SaldoVencido { get; set; }

    public string? SaldoTotal { get; set; }

    public string? Riesgo { get; set; }

    public string? Nodo { get; set; }

    public string? ScorerDeCredito { get; set; }

    public string? NoAplicaRenegociación { get; set; }

    public string? SubStatus { get; set; }

    public string? Renegociacion { get; set; }

    public string? StatusMesAnterior { get; set; }

    public string? StatusSeguro { get; set; }

    public string? SubStatusSeguro { get; set; }

    public string? FechaAsignación { get; set; }

    public string? AgenciasDeAltoRiesgo { get; set; }

    public string? DtotcarteracontSoloLunesRc62CierreConPagos { get; set; }

    public string? Autoaprobadas { get; set; }

    public string? Resultado { get; set; }

    public string? Pva { get; set; }
}
