using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.Collection;

public partial class CorreosCuenta
{
    public short IdCartera { get; set; }

    /// <summary>
    /// El número de cuenta con el cual se relacionará con la tabla de asignación.
    /// </summary>
    public string IdCuenta { get; set; } = null!;

    public string CorreoElectrónico { get; set; } = null!;

    /// <summary>
    /// El ejecutivo que ejecutará el seguimiento.
    /// </summary>
    public int IdEjecutivo { get; set; }

    public DateOnly FechaInsert { get; set; }

    public short IdOrigen { get; set; }

    public short IdInformación { get; set; }

    public bool Confirmado { get; set; }

    public int? IdEjecutivoInformación { get; set; }

    public DateTime? FechaHoraInformación { get; set; }

    public virtual ICollection<CorreosEnviado> CorreosEnviados { get; set; } = new List<CorreosEnviado>();

    public virtual Cuenta Cuenta { get; set; } = null!;

    public virtual Ejecutivo IdEjecutivoNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdInformaciónNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdOrigenNavigation { get; set; } = null!;

    public virtual ICollection<Queja> Quejas { get; set; } = new List<Queja>();

    public virtual ICollection<SolicitudesEstadosDeCuentum> SolicitudesEstadosDeCuenta { get; set; } = new List<SolicitudesEstadosDeCuentum>();
}
