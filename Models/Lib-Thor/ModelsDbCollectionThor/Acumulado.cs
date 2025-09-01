using System;
using System.Collections.Generic;

namespace Loki.ModelsDbCollectionThor;

public partial class Acumulado
{
    public double? No { get; set; }

    public string? Agencia { get; set; }

    public string? UsuarioWd { get; set; }

    public string? IdProveedor { get; set; }

    public string? NombreGestor { get; set; }

    public string? IdDelGestor { get; set; }

    public string? Producto { get; set; }

    public string? InboundOutbound { get; set; }

    public string? ReferenciaLlamada { get; set; }

    public string? Contrato { get; set; }

    public string? Folio { get; set; }

    public string? NombreArchivo { get; set; }

    public string? CódigoDeAcciónYResultado { get; set; }

    public double? T { get; set; }
}
