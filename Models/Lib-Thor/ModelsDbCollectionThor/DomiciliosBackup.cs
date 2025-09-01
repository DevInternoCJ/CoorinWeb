using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class DomiciliosBackup
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public int IdDomicilio { get; set; }

    public DateOnly FechaInsert { get; set; }

    public int IdEjecutivo { get; set; }

    public short IdInformación { get; set; }

    public string Calle { get; set; } = null!;

    public string? NúmeroExterior { get; set; }

    public string? NúmeroInterior { get; set; }

    public int? IdCódigoPostal { get; set; }

    public string? CódigoPostal { get; set; }

    public string? ColoniaLocalidad { get; set; }

    public string? DelegaciónMunicipio { get; set; }

    public string? Estado { get; set; }

    public int? IdEjecutivoInformación { get; set; }

    public DateTime? FechaHoraInformación { get; set; }

    public int? IdLogProceso { get; set; }

    public short? IdClase { get; set; }

    public short IdOrígen { get; set; }

    public virtual CuentasBackup CuentasBackup { get; set; } = null!;

    public virtual ICollection<GestionesDomiciliariasBackup> GestionesDomiciliariasBackups { get; set; } = new List<GestionesDomiciliariasBackup>();

    public virtual ValoresCatálogo IdInformaciónNavigation { get; set; } = null!;
}
