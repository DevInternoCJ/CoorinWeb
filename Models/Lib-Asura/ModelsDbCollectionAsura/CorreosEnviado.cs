using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsCollection;

public partial class CorreosEnviado
{
    public short IdCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    public TimeOnly? SegundoPaquete { get; set; }

    public int IdEjecutivoInsert { get; set; }

    public string CorreoElectrónico { get; set; } = null!;

    public short IdEtapa { get; set; }

    public string Asunto { get; set; } = null!;

    public string Mensaje { get; set; } = null!;

    public short? IdTipoMensaje { get; set; }

    public short? Resultados { get; set; }

    public virtual CorreosCuenta CorreosCuenta { get; set; } = null!;

    public virtual Cuenta Cuenta { get; set; } = null!;

    public virtual Ejecutivo IdEjecutivoInsertNavigation { get; set; } = null!;

    public virtual ValoresCatálogo IdEtapaNavigation { get; set; } = null!;
}
