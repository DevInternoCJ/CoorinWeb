using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbAllocation;

/// <summary>
/// Producto de cada cliente que se diferencía por el layout del archivo de asignación.
/// </summary>
public partial class Producto
{
    public short IdProducto { get; set; }

    public short IdCartera { get; set; }

    public string Producto1 { get; set; } = null!;

    public string? CampoÚnicoCuenta { get; set; }

    public string? CampoÚnicoRfc { get; set; }

    public string? CampoÚnicoNúmeroCliente { get; set; }

    public string? CampoÚnicoNombre { get; set; }

    public string? CampoÚnicoSaldo { get; set; }

    public string? NombresArchivosVálidos { get; set; }

    public string? NombresArchivosInválidos { get; set; }

    public string? WhereEliminar { get; set; }

    /// <summary>
    /// En caso de ser 1 se cambiará la situación a Reactivación cuando se reactiven las cuentas.
    /// </summary>
    public bool SituaciónReactivación { get; set; }

    public bool Cuadre { get; set; }

    public float Desactivación { get; set; }

    public string? CampoÚnicoPagosVencidos { get; set; }

    public bool? Activo { get; set; }

    public virtual CamposAdicionale? CamposAdicionale { get; set; }

    public virtual ICollection<CamposAsig> CamposAsigs { get; set; } = new List<CamposAsig>();

    public virtual ICollection<CamposCondicionado> CamposCondicionados { get; set; } = new List<CamposCondicionado>();

    public virtual ICollection<CamposTxt> CamposTxts { get; set; } = new List<CamposTxt>();

    public virtual ICollection<Ejecucione> Ejecuciones { get; set; } = new List<Ejecucione>();

    public virtual ICollection<FechasAsignaciónOficial> FechasAsignaciónOficials { get; set; } = new List<FechasAsignaciónOficial>();

    public virtual Cartera IdCarteraNavigation { get; set; } = null!;

    public virtual ICollection<LogAsignación> LogAsignacións { get; set; } = new List<LogAsignación>();

    public virtual ICollection<LogProceso> LogProcesos { get; set; } = new List<LogProceso>();
}
