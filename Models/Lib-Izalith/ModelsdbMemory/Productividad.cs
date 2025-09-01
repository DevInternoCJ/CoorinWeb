using System;
using System.Collections.Generic;

namespace Izalith.ModelsdbMemory;

public partial class Productividad
{
    public int IdEjecutivo { get; set; }

    public byte Hora { get; set; }

    public DateOnly FechaInsert { get; set; }

    public short? Cuentas { get; set; }

    public short? Gestiones { get; set; }

    public short? Entrada { get; set; }

    public short? Titulares { get; set; }

    public short? Conocidos { get; set; }

    public short? Desconocidos { get; set; }

    public short? SinContacto { get; set; }

    public byte? Negociaciones { get; set; }

    public double? MontoNegociaciones { get; set; }

    public double? SaldoSolucionado { get; set; }
}
