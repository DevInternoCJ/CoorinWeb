using System;
using System.Collections.Generic;

namespace Loki.ModelsDbAllocationThor;

public partial class VwLogAsignación
{
    public int IdLogAsignación { get; set; }

    public string Cartera { get; set; } = null!;

    public string Producto { get; set; } = null!;

    public string? Fecha { get; set; }

    public string? Comienzo { get; set; }

    public string? Término { get; set; }

    public string? Duración { get; set; }

    public string Proceso { get; set; } = null!;

    public byte NúmeroArchivos { get; set; }

    public int Columnas { get; set; }

    public int InventarioInicial { get; set; }

    public int InventarioFinal { get; set; }

    public int Nuevas { get; set; }

    public int Activadas { get; set; }

    public int Desactivadas { get; set; }

    public int CambiosProducto { get; set; }

    public int Actualizadas { get; set; }

    public int Quejas { get; set; }

    public string Dominio { get; set; } = null!;

    public string Computadora { get; set; } = null!;

    public string Usuario { get; set; } = null!;

    public string? Mensaje { get; set; }
}
