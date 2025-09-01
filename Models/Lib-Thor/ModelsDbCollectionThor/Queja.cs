using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class Queja
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public string? Folio { get; set; }

    public int IdEjecutivoInsert { get; set; }

    public short IdQueja { get; set; }

    public short IdInstitución { get; set; }

    public string Solicitante { get; set; } = null!;

    /// <summary>
    ///  
    /// </summary>
    public bool LlamadaEntrada { get; set; }

    public long? NúmeroTelefónico { get; set; }

    public string? CorreoElectrónico { get; set; }

    public int? IdDomicilio { get; set; }

    public string? Comentario { get; set; }

    public int? IdEjecutivoQueja { get; set; }

    public long? NúmeroTelefónicoContacto { get; set; }

    public string? CorreoElectrónicoContacto { get; set; }

    public virtual CorreosCuenta? CorreosCuenta { get; set; }

    public virtual Cuenta Cuenta { get; set; } = null!;

    public virtual Ejecutivo IdEjecutivoInsertNavigation { get; set; } = null!;

    public virtual Ejecutivo? IdEjecutivoQuejaNavigation { get; set; }

    public virtual ValoresCatálogo IdInstituciónNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdQuejaNavigation { get; set; } = null!;

    public virtual Teléfono? Teléfono { get; set; }
}
