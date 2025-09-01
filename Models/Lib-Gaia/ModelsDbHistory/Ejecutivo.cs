using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbHistory;

public partial class Ejecutivo
{
    public int IdEjecutivo { get; set; }

    /// <summary>
    /// Fecha que se insertó el Ejecutivo.
    /// </summary>
    public DateOnly FechaInsert { get; set; }

    public short IdÁrea { get; set; }

    public short? IdSucursal { get; set; }

    public short? IdCartera { get; set; }

    public short? IdProducto { get; set; }

    /// <summary>
    /// Persona inmediata superior en jerarquía laboral.
    /// </summary>
    public int IdEncargado { get; set; }

    public string NombreEjecutivo { get; set; } = null!;

    public string Usuario { get; set; } = null!;

    public byte[]? Contraseña { get; set; }

    public DateOnly? FechaUpdate { get; set; }

    public bool Bloqueado { get; set; }

    /// <summary>
    /// Nivel de jerarquía del ejecutivo, 0 es la más baja. Se utiliza para permisos.
    /// </summary>
    public byte Jerarquía { get; set; }

    public bool Telefónico { get; set; }

    public bool Domiciliario { get; set; }

    public short? IdBaja { get; set; }

    public short? IdPuesto { get; set; }

    public DateOnly? FechaBaja { get; set; }
}
