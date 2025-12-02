using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationMictlan;

/// <summary>
/// Campos que contienen el layout de la asignación de cada producto del cliente.
/// </summary>
public partial class CamposAsig
{
    public int IdCampoAsig { get; set; }

    public short IdProducto { get; set; }

    public byte IdTipoCampo { get; set; }

    public string Campo { get; set; } = null!;

    public int? IdEjecutivo { get; set; }

    public DateOnly FechaCampo { get; set; }

    /// <summary>
    /// 0 varchar, 1 real, 2 date
    /// </summary>
    public byte TipoDeDato { get; set; }

    public bool CuentasNuevas { get; set; }

    public bool CuentasActualización { get; set; }

    public virtual Producto IdProductoNavigation { get; set; } = null!;

    public virtual TiposCampo IdTipoCampoNavigation { get; set; } = null!;
}
