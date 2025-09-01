using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class Ejecutivos2
{
    public int IdEjecutivo { get; set; }

    public DateOnly FechaInsert { get; set; }

    public short IdÁrea { get; set; }

    public short? IdSucursal { get; set; }

    public short? IdCartera { get; set; }

    public short? IdProducto { get; set; }

    public int IdEncargado { get; set; }

    public string NombreEjecutivo { get; set; } = null!;

    public string Usuario { get; set; } = null!;

    public byte[]? Contraseña { get; set; }

    public DateOnly? FechaUpdate { get; set; }

    public bool Bloqueado { get; set; }

    public byte Jerarquía { get; set; }

    public bool Telefónico { get; set; }

    public bool Domiciliario { get; set; }

    public byte[]? Contraseña2 { get; set; }

    public byte[]? Contraseña3 { get; set; }

    public short? IdBaja { get; set; }

    public short? IdPuesto { get; set; }

    public DateOnly? FechaBaja { get; set; }
}
