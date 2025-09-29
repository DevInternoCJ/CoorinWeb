using System;
using System.Collections.Generic;

namespace GaiaLibrary.ModelsDbHistory;

public partial class Fecha
{
    public DateOnly Fecha1 { get; set; }

    public short Año { get; set; }

    public byte Mes { get; set; }

    public byte DíaMes { get; set; }

    public byte DíaSemana { get; set; }

    public bool Festivo { get; set; }

    public bool FinSemana { get; set; }

    public byte SemanaMes { get; set; }

    public byte SemanaAño { get; set; }

    public byte Semestre { get; set; }

    public byte Cuatrimestre { get; set; }

    public byte Trimestre { get; set; }

    public virtual ICollection<Negociacione> Negociaciones { get; set; } = new List<Negociacione>();
}
