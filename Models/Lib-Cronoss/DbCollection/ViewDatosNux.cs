using System;
using System.Collections.Generic;

namespace Loki.DbCollection.ModelsCronoss;

public partial class ViewDatosNux
{
    public int CalId { get; set; }

    public int CalloutId { get; set; }

    public string CalTelefono { get; set; } = null!;

    public short CalPuerto { get; set; }

    public short CamId { get; set; }

    public short UserId { get; set; }

    public string Login { get; set; } = null!;

    public string CalKey { get; set; } = null!;

    public byte StatusCallId { get; set; }

    public DateTime CalInicio { get; set; }

    public Guid Rowguid { get; set; }

    public string? OriginalName { get; set; }

    public string? Tag { get; set; }

    public short CalTDialog { get; set; }
}
