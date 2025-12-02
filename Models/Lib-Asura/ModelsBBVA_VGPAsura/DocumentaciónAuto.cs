using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsBBVA_VGP;

public partial class DocumentaciónAuto
{
    public long IdAuto { get; set; }

    public short IdDocumento { get; set; }

    public bool Original { get; set; }

    public string? Observación { get; set; }

    public virtual Auto IdAutoNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdDocumentoNavigation { get; set; } = null!;
}
