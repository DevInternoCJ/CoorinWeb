using System;
using System.Collections.Generic;

namespace Loki.DbHistory.ModelsCronoss;

public partial class Productividad
{
    public DateOnly FechaDelDía { get; set; }

    public int IdEjecutivo { get; set; }

    public string Ejecutivo { get; set; } = null!;

    public string NombreEjecutivo { get; set; } = null!;

    public string? Encargado { get; set; }

    public string? NombreEncargado { get; set; }

    public string Cartera { get; set; } = null!;

    public string Sucursal { get; set; } = null!;

    public short CuentasGestionadas { get; set; }

    public short GestionesTelefónicas { get; set; }

    public short Entrada { get; set; }

    public short Titulares { get; set; }

    public short Conocidos { get; set; }

    public short Desconocidos { get; set; }

    public short SinContacto { get; set; }

    public byte Negociaciones { get; set; }

    public decimal MontoNegociado { get; set; }

    public decimal SaldoAsolucionar { get; set; }

    public TimeOnly TiempoConTitulares { get; set; }

    public TimeOnly TiempoConConocidos { get; set; }

    public TimeOnly TiempoConDesconocidos { get; set; }

    public TimeOnly TiempoSinContacto { get; set; }

    public TimeOnly TiempoEnCuenta { get; set; }

    public short CuentasGestionadasChat { get; set; }

    public short GestionesChat { get; set; }

    public short ChatsConTitulares { get; set; }

    public short ChatsNoContestan { get; set; }

    public short ChatsConDesconocidos { get; set; }

    public short NegociacionesChat { get; set; }

    public decimal MontoNegociadoChat { get; set; }

    public decimal SaldoAsolucionarChat { get; set; }

    public TimeOnly TiempoEnCuentasChat { get; set; }

    public TimeOnly DuraciónChats { get; set; }

    public short NúmeroBúsquedas { get; set; }

    public short CuentasConBúsqueda { get; set; }

    public TimeOnly TiempoEnBúsqueda { get; set; }

    public TimeOnly? HoraIngresoSistema { get; set; }

    public TimeOnly? HoraSalidaSistema { get; set; }

    public TimeOnly? HoraPrimerGestión { get; set; }

    public TimeOnly? HoraÚltimaGestión { get; set; }

    public TimeOnly TiempoPermiso { get; set; }

    public TimeOnly TiempoCurso { get; set; }

    public TimeOnly TiempoComida { get; set; }

    public TimeOnly TiempoBaño { get; set; }

    public TimeOnly TiempoCalidad { get; set; }

    public TimeOnly TiempoFallaTécnica { get; set; }

    public short Menor1min { get; set; }

    public short Entre1y3min { get; set; }

    public short Mayor3min { get; set; }
}
