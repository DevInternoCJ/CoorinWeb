using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationThor;

public partial class Agent
{
    public int? Id { get; set; }

    public string Name { get; set; } = null!;

    public string Active { get; set; } = null!;

    public DateTime Created { get; set; }

    public int? State { get; set; }

    public DateTime Changed { get; set; }

    public string Login { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Station { get; set; }

    public string? Coordinador { get; set; }

    public int? RefShift { get; set; }

    public string? Grupo { get; set; }

    public int? Meta { get; set; }

    public int? ClaveRh { get; set; }

    public string? ClaveCjc { get; set; }

    public string? Clavesucursal { get; set; }

    public int? Clavetelefonica { get; set; }

    public string? Cartera { get; set; }

    public string? Turno { get; set; }

    public string? Ingreso { get; set; }

    public int? LlamadasCc { get; set; }

    public int? LlamadasSc { get; set; }

    public string? Userblk { get; set; }

    public int? Idproducto { get; set; }

    public string? IpCoord { get; set; }

    public int? Ban { get; set; }

    public string? Puesto { get; set; }

    public bool? Bloqueo { get; set; }

    public byte[]? Contrasena { get; set; }

    public string? Passwordold { get; set; }
}
