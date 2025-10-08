using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.History;

public partial class ActlProducto9
{
    public string IdCuenta { get; set; } = null!;

    public DateOnly VálidoDesde { get; set; }

    public DateOnly? VálidoHasta { get; set; }

    public string? FecAsig { get; set; }

    public string? Estado { get; set; }

    public decimal? SdoLiqP { get; set; }

    public string? RegAct { get; set; }

    public string? Soluciones { get; set; }

    public decimal? NumMRecp { get; set; }

    public decimal? PagoRequerido { get; set; }

    public string? ImFactorMinimoDcpPesos { get; set; }

    public string? ImComisionDañosPesosAcum { get; set; }

    public string? TxFppPaga1 { get; set; }

    public string? VectorPago { get; set; }

    public string? TxSegmento { get; set; }

    public string? FacreaP { get; set; }

    public string? ImFactorMinimoStmVsm { get; set; }

    public string? VectorPago1 { get; set; }
}
