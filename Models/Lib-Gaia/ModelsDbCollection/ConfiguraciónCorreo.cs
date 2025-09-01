using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbCollection;

public partial class ConfiguraciónCorreo
{
    public int IdEjecutivo { get; set; }

    public string CorreoElectrónico { get; set; } = null!;

    public string Contraseña { get; set; } = null!;

    public string ServidorSmtp { get; set; } = null!;

    public short PuertoSmtp { get; set; }

    public virtual Ejecutivo IdEjecutivoNavigation { get; set; } = null!;
}
