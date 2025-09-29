using System;
using System.Collections.Generic;

namespace HadesLibrary.ModelsDbCollection;

public partial class Ejecutivo
{
    public int IdEjecutivo { get; set; }

    /// <summary>
    /// Fecha que se insertó el Ejecutivo.
    /// </summary>
    public DateOnly FechaInsert { get; set; }

    public short IdÁrea { get; set; }

    public short? IdSucursal { get; set; }

    public short? IdCartera { get; set; }

    public short? IdProducto { get; set; }

    /// <summary>
    /// Persona inmediata superior en jerarquía laboral.
    /// </summary>
    public int IdEncargado { get; set; }

    public string NombreEjecutivo { get; set; } = null!;

    public string Usuario { get; set; } = null!;

    public byte[]? Contraseña { get; set; }

    public DateOnly? FechaUpdate { get; set; }

    public bool Bloqueado { get; set; }

    /// <summary>
    /// Nivel de jerarquía del ejecutivo, 0 es la más baja. Se utiliza para permisos.
    /// </summary>
    public byte Jerarquía { get; set; }

    public bool Telefónico { get; set; }

    public bool Domiciliario { get; set; }

    public byte[]? Contraseña2 { get; set; }

    public byte[]? Contraseña3 { get; set; }

    public short? IdBaja { get; set; }

    public short? IdPuesto { get; set; }

    public DateOnly? FechaBaja { get; set; }

    public int? IdSegmento { get; set; }

    public virtual ICollection<Adicionale> Adicionales { get; set; } = new List<Adicionale>();

    public virtual ICollection<Auto> Autos { get; set; } = new List<Auto>();

    public virtual ICollection<Búsqueda> Búsqueda { get; set; } = new List<Búsqueda>();

    public virtual ICollection<CamposPantalla> CamposPantallas { get; set; } = new List<CamposPantalla>();

    public virtual ICollection<CargosAtm> CargosAtmIdEjecutivoAutorizóNavigations { get; set; } = new List<CargosAtm>();

    public virtual ICollection<CargosAtm> CargosAtmIdEjecutivoNavigations { get; set; } = new List<CargosAtm>();

    public virtual ICollection<CarteoDevuelto> CarteoDevueltos { get; set; } = new List<CarteoDevuelto>();

    public virtual ConfiguraciónCorreo? ConfiguraciónCorreo { get; set; }

    public virtual ICollection<CorreosCuenta> CorreosCuenta { get; set; } = new List<CorreosCuenta>();

    public virtual ICollection<CorreosCuentasBackup> CorreosCuentasBackups { get; set; } = new List<CorreosCuentasBackup>();

    public virtual ICollection<Cuenta> CuentaIdEjecutivoÚltimaGestiónNavigations { get; set; } = new List<Cuenta>();

    public virtual ICollection<Cuenta> CuentaIdEjecutivoÚltimaNegociaciónNavigations { get; set; } = new List<Cuenta>();

    public virtual ICollection<Cuenta> CuentaIdEjecutivoÚltimaVisitaNavigations { get; set; } = new List<Cuenta>();

    public virtual ICollection<CuentasBackup> CuentasBackupIdEjecutivoÚltimaGestiónNavigations { get; set; } = new List<CuentasBackup>();

    public virtual ICollection<CuentasBackup> CuentasBackupIdEjecutivoÚltimaNegociaciónNavigations { get; set; } = new List<CuentasBackup>();

    public virtual ICollection<CuentasBackup> CuentasBackupIdEjecutivoÚltimaVisitaNavigations { get; set; } = new List<CuentasBackup>();

    public virtual ICollection<DatosErróneo> DatosErróneos { get; set; } = new List<DatosErróneo>();

    public virtual ICollection<DatosErróneosback> DatosErróneosbacks { get; set; } = new List<DatosErróneosback>();

    public virtual ICollection<GestionesChatBackup> GestionesChatBackups { get; set; } = new List<GestionesChatBackup>();

    public virtual ICollection<GestionesChat> GestionesChats { get; set; } = new List<GestionesChat>();

    public virtual ICollection<GestionesTelefónica> GestionesTelefónicaIdEjecutivoNavigations { get; set; } = new List<GestionesTelefónica>();

    public virtual ICollection<GestionesTelefónica> GestionesTelefónicaIdValidadorNavigations { get; set; } = new List<GestionesTelefónica>();

    public virtual ICollection<GestionesTelefónicasBackup> GestionesTelefónicasBackupIdEjecutivoNavigations { get; set; } = new List<GestionesTelefónicasBackup>();

    public virtual ICollection<GestionesTelefónicasBackup> GestionesTelefónicasBackupIdValidadorNavigations { get; set; } = new List<GestionesTelefónicasBackup>();

    public virtual ValoresCatálogo? IdBajaNavigation { get; set; }

    public virtual Cartera1? IdCarteraNavigation { get; set; }

    public virtual Ejecutivo IdEncargadoNavigation { get; set; } = null!;

    public virtual Producto? IdProductoNavigation { get; set; }

    public virtual ValoresCatálogo? IdPuestoNavigation { get; set; }

    public virtual ValoresCatálogo? IdSucursalNavigation { get; set; }

    public virtual ValoresCatálogo IdÁreaNavigation { get; set; } = null!;

    public virtual ICollection<Ejecutivo> InverseIdEncargadoNavigation { get; set; } = new List<Ejecutivo>();

    public virtual ICollection<LogIngreso> LogIngresos { get; set; } = new List<LogIngreso>();

    public virtual MetasEjecutivo? MetasEjecutivo { get; set; }

    public virtual ICollection<Negociacione> NegociacioneIdEjecutivoNavigations { get; set; } = new List<Negociacione>();

    public virtual ICollection<Negociacione> NegociacioneIdEjecutivoValidadorNavigations { get; set; } = new List<Negociacione>();

    public virtual ICollection<NegociacionesBackup> NegociacionesBackupIdEjecutivoNavigations { get; set; } = new List<NegociacionesBackup>();

    public virtual ICollection<NegociacionesBackup> NegociacionesBackupIdEjecutivoValidadorNavigations { get; set; } = new List<NegociacionesBackup>();

    public virtual ICollection<Ofrecimiento> Ofrecimientos { get; set; } = new List<Ofrecimiento>();

    public virtual ICollection<OfrecimientosBackup> OfrecimientosBackups { get; set; } = new List<OfrecimientosBackup>();

    public virtual ICollection<PagosReportado> PagosReportados { get; set; } = new List<PagosReportado>();

    public virtual ICollection<PagosReportadosBackup> PagosReportadosBackups { get; set; } = new List<PagosReportadosBackup>();

    public virtual ICollection<PagosReportadosResp> PagosReportadosResps { get; set; } = new List<PagosReportadosResp>();

    public virtual ICollection<Paquete> Paquetes { get; set; } = new List<Paquete>();

    public virtual ICollection<Pausa> Pausas { get; set; } = new List<Pausa>();

    public virtual ICollection<PlantillasCorreo> PlantillasCorreos { get; set; } = new List<PlantillasCorreo>();

    public virtual ICollection<Queja> QuejaIdEjecutivoInsertNavigations { get; set; } = new List<Queja>();

    public virtual ICollection<Queja> QuejaIdEjecutivoQuejaNavigations { get; set; } = new List<Queja>();

    public virtual ICollection<QuejasBackup> QuejasBackupIdEjecutivoInsertNavigations { get; set; } = new List<QuejasBackup>();

    public virtual ICollection<QuejasBackup> QuejasBackupIdEjecutivoQuejaNavigations { get; set; } = new List<QuejasBackup>();

    public virtual ICollection<Revisione> Revisiones { get; set; } = new List<Revisione>();

    public virtual ICollection<Seguimiento> Seguimientos { get; set; } = new List<Seguimiento>();

    public virtual ICollection<SeguimientosBackup> SeguimientosBackups { get; set; } = new List<SeguimientosBackup>();

    public virtual ICollection<SolicitudesEstadosDeCuentum> SolicitudesEstadosDeCuenta { get; set; } = new List<SolicitudesEstadosDeCuentum>();

    public virtual ICollection<Teléfono> Teléfonos { get; set; } = new List<Teléfono>();

    public virtual ICollection<TeléfonosBackup> TeléfonosBackups { get; set; } = new List<TeléfonosBackup>();
}
