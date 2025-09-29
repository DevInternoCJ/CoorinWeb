using System;
using System.Collections.Generic;

namespace Loki.AlbazLibrary.History;

public partial class SegmentaciónInternaReporte
{
    public byte IdSegmentación { get; set; }

    public string Grupo { get; set; } = null!;

    public string Segmentación { get; set; } = null!;

    public int IdCartera { get; set; }
}
