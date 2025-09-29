using System;
using System.Collections.Generic;

namespace Loki.DbHistory.ModelsCronoss;

public partial class AcumProducto32
{
    public DateOnly? Insert { get; set; }

    public int IdLogAsignación { get; set; }

    public string? BatchDate { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string? CustomerId { get; set; }

    public string? Name { get; set; }

    public string? BirthDate { get; set; }

    public string? LoanProductCode { get; set; }

    public string? RecoveredCode { get; set; }

    public string? ReceiptDate { get; set; }

    public string? LastPaymentDate { get; set; }

    public string? InitialBalance { get; set; }

    public string? CurrentBalance { get; set; }

    public string? MontlyIncome { get; set; }

    public string? CommisionRate { get; set; }

    public string? EmployersName { get; set; }

    public string? EmployersAddress { get; set; }

    public string? FechaCorteLc { get; set; }

    public string? SocialSecurityNumber { get; set; }

    public string? AnniversaryDate { get; set; }

    public string? UserDefinedNumeric1 { get; set; }

    public string? UserDefinedNumeric2 { get; set; }

    public string? AcctBalanceInMonth01 { get; set; }

    public string? Prorroga { get; set; }

    public string? Cur { get; set; }

    public string? T30 { get; set; }

    public string? S60 { get; set; }

    public string? N90 { get; set; }

    public string? C120 { get; set; }

    public string? C150 { get; set; }

    public string? C180 { get; set; }
}
