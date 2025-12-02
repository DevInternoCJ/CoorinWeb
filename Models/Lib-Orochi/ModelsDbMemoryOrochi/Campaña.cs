using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.Memory;

public partial class Campaña
{
    public short IdCampaña { get; set; }

    public string Campaña1 { get; set; } = null!;

    public int NúmeroCuentas { get; set; }

    public bool Encendida { get; set; }

    public int IdEjecutivoInsert { get; set; }

    public short? IdProducto { get; set; }
}
