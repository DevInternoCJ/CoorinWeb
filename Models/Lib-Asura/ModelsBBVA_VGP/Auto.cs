using System;
using System.Collections.Generic;

namespace Loki.ModelsBBVA_VGP;

public partial class Auto
{
    public long IdAuto { get; set; }

    public long? IdDomicilio { get; set; }

    public string Marca { get; set; } = null!;

    public string Modelo { get; set; } = null!;

    public string Versión { get; set; } = null!;

    public string NoSerie { get; set; } = null!;

    public string NoMotor { get; set; } = null!;

    public string Placas { get; set; } = null!;

    public string Color { get; set; } = null!;

    public long? Kilometraje { get; set; }

    public DateOnly FechaInsert { get; set; }

    public virtual ICollection<DocumentaciónAuto> DocumentaciónAutos { get; set; } = new List<DocumentaciónAuto>();

    public virtual DomiciliosRecolección? IdDomicilioNavigation { get; set; }

    public virtual ICollection<Solicitude> Solicitudes { get; set; } = new List<Solicitude>();
}
