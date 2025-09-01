using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

public partial class ComentariosBackup
{
    public string IdCuenta { get; set; } = null!;

    public short IdCartera { get; set; }

    public DateOnly FechaInsert { get; set; }

    public TimeOnly SegundoInsert { get; set; }

    /// <summary>
    /// El ejecutivo que ejecutará el seguimiento.
    /// </summary>
    public int IdEjecutivo { get; set; }

    public string Comentario { get; set; } = null!;

    public virtual CuentasBackup CuentasBackup { get; set; } = null!;

    public virtual GestionesChatBackup? GestionesChatBackup { get; set; }

    public virtual GestionesDomiciliariasBackup? GestionesDomiciliariasBackup { get; set; }

    public virtual GestionesTelefónicasBackup? GestionesTelefónicasBackup { get; set; }
}
