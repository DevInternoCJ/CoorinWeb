using System;
using System.Collections.Generic;

namespace Loki.AsuraLibrary.ModelsHistory;

public partial class AcumProducto150
{
    public DateOnly? Insert { get; set; }

    public int IdLogAsignación { get; set; }

    public string? FechaDeAdicion { get; set; }

    public string? StatusCartera { get; set; }

    public string IdCuenta { get; set; } = null!;

    public string? SaldoEnQuebranto { get; set; }

    public string? SaldoARecuperar { get; set; }

    public string? Moratorios { get; set; }

    public string? IngresosACuenta { get; set; }

    public string? EstatusEnSistemaAbiertoCerrado { get; set; }

    public string? EstatusHeredado { get; set; }

    public string? TitularYOAvalOs { get; set; }

    public string? Contacto { get; set; }

    public string? Estado { get; set; }

    public string? DomicilioFiscal { get; set; }

    public string? EstatusSeguros { get; set; }

    public string? Vehiculo { get; set; }

    public string? Vin { get; set; }

    public string? Telematica { get; set; }

    public string? PrecioLibroAzulALaCompraMayo2022 { get; set; }

    public string? LibroAzulMayo2022Al80 { get; set; }

    public string? SaldoLibroAzulAl80 { get; set; }

    public string? AntigüedadMeses { get; set; }

    public string? AntigüedadDias { get; set; }

    public string? Id { get; set; }

    public string? DespachoAbanderado { get; set; }

    public string? FechaDePromesaCierre { get; set; }

    public string? DescuentoPactado { get; set; }

    public string? PagoPactado { get; set; }

    public string? ComisiónGenerada { get; set; }
}
