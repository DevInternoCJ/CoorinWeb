using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbAllocation;

public partial class Cartera
{
    public string NumeroControl { get; set; } = null!;

    public decimal? GrupoGestoresIdGrupoGestores { get; set; }

    public string? NumeroDeCuenta { get; set; }

    public string? NombreDeudor { get; set; }

    public string? DirCalleNumero { get; set; }

    public string? DirColonia { get; set; }

    public string? DirDelMun { get; set; }

    public string? CodigoPostalPart { get; set; }

    public string? TelParticular { get; set; }

    public string? NombreEmpresa { get; set; }

    public string? Puesto { get; set; }

    public string? DirTrabajoCalleNumero { get; set; }

    public string? DirTrabajoColonia { get; set; }

    public string? DirTrabajoEstado { get; set; }

    public string? CodigoPostalTrab { get; set; }

    public string? TelTrabajo { get; set; }

    public string? Extension { get; set; }

    public string? ClaveCliente { get; set; }

    public decimal? Remesa { get; set; }

    public string? Referencia { get; set; }

    public decimal? NumeroDeEstado { get; set; }

    public string? ClaveDeZona { get; set; }

    public string? ClaveDeSucursal { get; set; }

    public string? TipoDeCredito { get; set; }

    public string? GrupoDeTrabajo { get; set; }

    public string? GrupoAnterior { get; set; }

    public DateTime? FechaApertura { get; set; }

    public DateTime? FechaCorte { get; set; }

    public DateTime? FechaCancel { get; set; }

    public DateTime? FechaCastigo { get; set; }

    public decimal? NumPagosVencidos { get; set; }

    public decimal? SaldoInicial { get; set; }

    public decimal? SaldoInicialDolares { get; set; }

    public decimal? SaldoVencido { get; set; }

    public decimal? SaldoVencidoDolares { get; set; }

    public decimal? InteresesFacturados { get; set; }

    public decimal? InteresesNoFacturados { get; set; }

    public decimal? SaldoActualPesos { get; set; }

    public decimal? SaldoActualDolares { get; set; }

    public decimal? SaldoAcobrar { get; set; }

    public decimal? SaldoAcobrarDolares { get; set; }

    public DateTime? FechaAsigCliente { get; set; }

    public DateTime? FechaAsigArchivo { get; set; }

    public DateTime? FechaDeIngresoAcjc { get; set; }

    public DateTime? FechaReasig { get; set; }

    public DateTime? FechaActualizacion { get; set; }

    public DateTime? FechaDevolucion { get; set; }

    public decimal? AcumuladoPagos { get; set; }

    public decimal? AcumuladoPagosDolares { get; set; }

    public string? Llave1 { get; set; }

    public string? Llave2 { get; set; }

    public string? Llave3 { get; set; }

    public DateTime? FechaRevision { get; set; }

    public string? StatusCuenta { get; set; }

    public string? StatusEquivCliente { get; set; }

    public string? ClaveContacto { get; set; }

    public string? StatusUltimaGestTel { get; set; }

    public DateTime? FechaUltimaGestTel { get; set; }

    public string? ClaveUltimoGestTel { get; set; }

    public DateTime? FechaSegGestTel { get; set; }

    public string? HoraSegGestTel { get; set; }

    public decimal? LlamadasCcontacto { get; set; }

    public decimal? LlamadasScontacto { get; set; }

    public string? StatusUltimaGestDom { get; set; }

    public DateTime? FechaUltimaGestDom { get; set; }

    public string? ClaveUltimoGestDom { get; set; }

    public DateTime? FechaSegGestDom { get; set; }

    public string? HoraSeguimGestDom { get; set; }

    public decimal? VisitasCcontacto { get; set; }

    public decimal? VisitasScontacto { get; set; }

    public decimal? NumRegistrosDatosNuevos { get; set; }

    public decimal? NumeroAvales { get; set; }

    public string? Base { get; set; }

    public string? Nota { get; set; }

    public string? Val { get; set; }

    public short? MarcadoParaHistorico { get; set; }

    public DateTime? FechaActOper { get; set; }

    public DateTime? FechaActMov { get; set; }

    public string? Gestor { get; set; }

    public string? ClaveDeAsignacion { get; set; }

    public string? Estrategia { get; set; }

    public string? Estilo { get; set; }

    public string? TelAd1 { get; set; }

    public string? TelAd2 { get; set; }

    public string? TelAd3 { get; set; }

    public decimal? AdNum1 { get; set; }

    public decimal? AdNum2 { get; set; }

    public decimal? AdNum3 { get; set; }

    public decimal? AdNum4 { get; set; }

    public decimal? AdNum5 { get; set; }

    public decimal? AdNum6 { get; set; }

    public decimal? AdNum7 { get; set; }

    public decimal? AdNum8 { get; set; }

    public decimal? AdNum9 { get; set; }

    public decimal? AdNum0 { get; set; }

    public string? AdCar0 { get; set; }

    public string? AdCar1 { get; set; }

    public string? AdCar2 { get; set; }

    public string? AdCar3 { get; set; }

    public string? AdCar4 { get; set; }

    public string? AdCar5 { get; set; }

    public string? AdCar6 { get; set; }

    public string? AdCar7 { get; set; }

    public string? AdCar8 { get; set; }

    public string? AdCar9 { get; set; }

    public short? Log1 { get; set; }

    public short? Log2 { get; set; }

    public short? Log3 { get; set; }
}
