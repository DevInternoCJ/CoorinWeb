using System;
using System.Collections.Generic;

namespace Loki.ThorLibrary.ModelsHistory;

public partial class ProductividadAmex
{
    public DateOnly? FechaDelDía { get; set; }

    public int IdEjecutivo { get; set; }

    public string Ejecutivo { get; set; } = null!;

    public string NombreEjecutivo { get; set; } = null!;

    public string? Encargado { get; set; }

    public string? NombreEncargado { get; set; }

    public string Cartera { get; set; } = null!;

    public string Sucursal { get; set; } = null!;

    public int? CuentasGestionadas { get; set; }

    public int? GestionesTelefónicas { get; set; }

    public int? Entrada { get; set; }

    public int? Titulares { get; set; }

    public int? Conocidos { get; set; }

    public int? Desconocidos { get; set; }

    public int? SinContacto { get; set; }

    public int? Negociaciones { get; set; }

    public decimal? MontoNegociado { get; set; }

    public decimal? SaldoAsolucionar { get; set; }

    public TimeOnly? TiempoConTitulares { get; set; }

    public TimeOnly? TiempoConConocidos { get; set; }

    public TimeOnly? TiempoConDesconocidos { get; set; }

    public TimeOnly? TiempoSinContacto { get; set; }

    public TimeOnly? TiempoEnCuentas { get; set; }

    public int NúmeroBúsquedas { get; set; }

    public int CuentasConBúsqueda { get; set; }

    public TimeOnly TiempoEnBúsqueda { get; set; }

    public TimeOnly? HoraIngresoSistema { get; set; }

    public TimeOnly HoraSalidaSistema { get; set; }

    public TimeOnly? HoraPrimerGestión { get; set; }

    public TimeOnly? HoraÚltimaGestión { get; set; }

    public TimeOnly TiempoPermiso { get; set; }

    public TimeOnly TiempoCurso { get; set; }

    public TimeOnly TiempoComida { get; set; }

    public TimeOnly TiempoBaño { get; set; }

    public TimeOnly TiempoCalidad { get; set; }

    public TimeOnly TiempoFallaTécnica { get; set; }

    public int? MenorA1Minuto { get; set; }

    public int? Entre1Y3Minutos { get; set; }

    public int? MayorA3Minutos { get; set; }

    public decimal? BalanceInicial { get; set; }

    public string Rpc { get; set; } = null!;

    public int? Charge { get; set; }

    public int? Corporate { get; set; }

    public int? Lending { get; set; }

    public decimal? MontoPagado { get; set; }

    public string PagosRelevantes { get; set; } = null!;

    public string AmountRelevantPayer { get; set; } = null!;

    public decimal? Epay { get; set; }

    public int? Ngc { get; set; }

    public decimal? NgcAmount { get; set; }
}
