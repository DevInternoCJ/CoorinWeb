using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionAsura;

public partial class VHerramienta
{
    public short IdHerramienta { get; set; }

    public short IdProducto { get; set; }

    public bool Activa { get; set; }

    public string Nombre { get; set; } = null!;

    public string Descripción { get; set; } = null!;

    public byte Días1erPago { get; set; }

    public byte Margen { get; set; }

    public byte Mensualidades { get; set; }

    public byte DíasEntrePagos { get; set; }

    public bool Descuento { get; set; }

    public bool Enganche { get; set; }

    public bool CartaConvenio { get; set; }

    public DateOnly FechaInsert { get; set; }

    public int IdEjecutivoInsert { get; set; }

    public string? CálculoMontoRequerido { get; set; }

    public string? CálculoPorcentajeDescuento { get; set; }

    public string? CampoFechaCorte { get; set; }

    public int? DiasMaximo { get; set; }
}
