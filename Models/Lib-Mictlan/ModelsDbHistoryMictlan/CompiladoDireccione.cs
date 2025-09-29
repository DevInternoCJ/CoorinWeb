using System;
using System.Collections.Generic;

namespace Loki.ModelsDbHistoryMictlan;

public partial class CompiladoDireccione
{
    public byte MesAsignación { get; set; }

    public string Producto { get; set; } = null!;

    public int Créditos { get; set; }

    public int Direcciones { get; set; }

    public int Completas { get; set; }

    public int SinColonia { get; set; }

    public int SinDelMunCp { get; set; }

    public int SinCp { get; set; }

    public int SinCalleNum { get; set; }

    public int CompletarSepomex { get; set; }

    public int AlMenos1Dir { get; set; }

    public int AlMenos1DirCompleta { get; set; }

    public int CréditosConDirSinColonia { get; set; }

    public int CréditosConDirSinMun { get; set; }

    public int CréditosConDirSinCp { get; set; }

    public int CréditosConDirSinCalleNum { get; set; }

    public int CréditosConDirSepomex { get; set; }
}
