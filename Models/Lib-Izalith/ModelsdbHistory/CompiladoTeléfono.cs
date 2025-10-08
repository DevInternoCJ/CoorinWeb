using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbHistory;

public partial class CompiladoTeléfono
{
    public byte MesAsignación { get; set; }

    public string Producto { get; set; } = null!;

    public int Teléfonos { get; set; }

    public int Completos { get; set; }

    public int Celulares { get; set; }

    public int Ring { get; set; }

    public int Bocina { get; set; }

    public int Relacionado { get; set; }

    public int Titular { get; set; }

    public int Créditos { get; set; }

    public int CréditosValidos { get; set; }

    public int CréditosCelular { get; set; }

    public int CréditosCampañas { get; set; }

    public int CréditosRing { get; set; }

    public int CréditosBocina { get; set; }

    public int CréditosRelacionado { get; set; }

    public int CréditosTitular { get; set; }
}
