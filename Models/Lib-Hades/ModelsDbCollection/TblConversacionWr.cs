using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

public partial class TblConversacionWr
{
    public string? TicketId { get; set; }

    public string? Chat { get; set; }

    public DateTime? Date { get; set; }

    public string? SendBy { get; set; }

    public string? NameSend { get; set; }

    public string? Message { get; set; }

    public string? Caption { get; set; }

    public string? IdCuenta { get; set; }

    public DateOnly? FechaInsert { get; set; }
}
