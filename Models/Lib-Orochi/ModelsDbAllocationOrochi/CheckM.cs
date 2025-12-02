using System;
using System.Collections.Generic;

namespace Loki.OrochiLibrary.Allocation;

public partial class CheckM
{
    public short SessionId { get; set; }

    public string Login { get; set; } = null!;

    public string Database { get; set; } = null!;

    public string TaskState { get; set; } = null!;

    public string Command { get; set; } = null!;

    public string Application { get; set; } = null!;

    public long WaitTimeMs { get; set; }

    public string WaitType { get; set; } = null!;

    public string BlockedBy { get; set; } = null!;

    public string HeadBlocker { get; set; } = null!;

    public string HostName { get; set; } = null!;
}
