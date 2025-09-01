using System;
using System.Collections.Generic;

namespace Loki.ModelsBBVA_VGP;

public partial class DomiciliosRecolección
{
    public long IdDomicilio { get; set; }

    public DateOnly FechaInsert { get; set; }

    public string Calle { get; set; } = null!;

    public string NúmeroExterior { get; set; } = null!;

    public string NúmeroInterior { get; set; } = null!;

    public string CódigoPostal { get; set; } = null!;

    public string ColoniaLocalidad { get; set; } = null!;

    public string DelegaciónMunicipio { get; set; } = null!;

    public string Estado { get; set; } = null!;

    public bool Existía { get; set; }

    public virtual ICollection<Auto> Autos { get; set; } = new List<Auto>();
}
