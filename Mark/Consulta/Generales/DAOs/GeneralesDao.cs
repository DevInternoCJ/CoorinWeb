using CoorinWeb.Loki.Global;
using CoorinWeb.Loki.Mark.Auth.DAOs;
using Loki.Mark.Administracion.Carteras.Interfaces;
using Loki.Mark.Consulta.Generales.Interfaces;

namespace Loki.Mark.Consulta.Generales.DAOs
{
    public class GeneralesDao: IGeneralesDao
    {

            private readonly IDbContextFactory _dbContFactory;
            private readonly DaoBase _daoBase;

            public GeneralesDao(IDbContextFactory dbContFactory, DaoBase daoBase)
            {

                _dbContFactory = dbContFactory;
                _daoBase = daoBase;
            }
            //public void EstableceValores()
            //{
            //    // Limpia valores previos
            //    LimpiaValores();

            //    string concepto = cmbConceptos.Text;
            //    string campo = cmbCampos.Text;

            //    // Combos simples para campos que deben ser editables
            //    void SetComboSimple() => cmbValores.DropDownStyle = ComboBoxStyle.Simple;

            //    // Combos de lista con datasource
            //    void SetComboList(object dataSource, string valueMember = "idValor", string displayMember = "Valor")
            //    {
            //        cmbValores.DropDownStyle = ComboBoxStyle.DropDownList;
            //        cmbValores.ValueMember = valueMember;
            //        cmbValores.DisplayMember = displayMember;
            //        cmbValores.DataSource = dataSource;
            //    }

            //    switch (concepto)
            //    {
            //        case "Teléfonos":
            //            if (new[] { "HusoHorario", "# Titulares", "# Conocidos", "# Desconocidos", "# SinContacto",
            //                "# Descolgaron_ViciDial", "# Intentos_ViciDial", "ÚltimaMarcación" }.Contains(campo))
            //            {
            //                SetComboSimple();
            //                return;
            //            }

            //            _tblSignos.DefaultView.RowFilter = @"Signo IN ('=', '≠')";

            //            if (new[] { "Teléfono", "EntidadFederativa", "Calificacion" }.Contains(campo))
            //            {
            //                SetComboSimple();
            //                return;
            //            }

            //            if (campo == "Municipio")
            //            {
            //                SetComboList(tblMunicipios, "Municipio", "Municipio");
            //                return;
            //            }

            //            if (campo == "Ranking")
            //            {
            //                _tblSignos.DefaultView.RowFilter = @"Signo IN ('<', '≤', '=', '≥', '>', '≠')";
            //                SetComboSimple();
            //                return;
            //            }

            //            if (campo == "Clase") SetComboList(Catálogo.ValoresDelCatálogo(12));
            //            else if (campo == "Telefonía") SetComboList(Catálogo.ValoresDelCatálogo(23));
            //            else if (campo == "Origen") SetComboList(Catálogo.ValoresDelCatálogo(24));
            //            else if (campo == "Confirmado") SetComboList(Catálogo.TablaBit());
            //            break;

            //        case "Gestiones":
            //            if (new[] { "Fecha", "Hora", "Duración", "TiempoEnCuenta" }.Contains(campo))
            //            {
            //                SetComboSimple();
            //                return;
            //            }

            //            _tblSignos.DefaultView.RowFilter = @"Signo IN ('=', '≠')";

            //            if (new[] { "Usuario", "Teléfono", "Extensión", "Comentario", "NombreContacto" }.Contains(campo))
            //            {
            //                SetComboSimple();
            //                return;
            //            }

            //            switch (campo)
            //            {
            //                case "Contacto": SetComboList(Catálogo.ValoresDelCatálogo(5, 1601)); break;
            //                case "Situación": SetComboList(Catálogo.ValoresDelCatálogo(2)); break;
            //                case "Sucursal": SetComboList(Catálogo.ValoresDelCatálogo(1)); break;
            //                case "Modo": SetComboList(Catálogo.ValoresDelCatálogo(21)); break;
            //                case "Acercamiento": SetComboList(Catálogo.ValoresDelCatálogo(8)); break;
            //                case "Parentesco": SetComboList(Catálogo.ValoresDelCatálogo(11)); break;
            //                case "CausaNoPago": SetComboList(Catálogo.ValoresDelCatálogo(10)); break;
            //            }
            //            break;

            //        case "Negociaciones":
            //            if (new[] { "MontoNegociado", "Pagos", "Plazos", "FechaCreación", "Hora",
            //                "FechaAcordada", "FechaFinNegociación", "MontoPagado", "SaldoNegociación",
            //                "Fecha_Plazo" }.Contains(campo))
            //            {
            //                SetComboSimple();
            //                return;
            //            }

            //            _tblSignos.DefaultView.RowFilter = @"Signo IN ('=', '≠')";

            //            if (new[] { "Usuario", "Validador", "Correo" }.Contains(campo))
            //            {
            //                SetComboSimple();
            //                return;
            //            }

            //            if (campo == "Estado") SetComboList(Catálogo.ValoresDelCatálogo(9));
            //            else if (campo == "CartaConvenio") SetComboList(Catálogo.TablaBit());
            //            else if (campo == "Herramienta") SetComboList(tblHerramientas, "idHerramienta", "Herramienta");
            //            else if (campo == "TipoNegociación") SetComboList(Catálogo.ValoresDelCatálogo(8));
            //            else if (campo == "Modo") SetComboList(Catálogo.ValoresDelCatálogo(21));
            //            break;

            //        case "Seguimientos":
            //            SetComboSimple();
            //            if (new[] { "Recordatorio", "Realizado" }.Contains(campo))
            //            {
            //                _tblSignos.DefaultView.RowFilter = @"Signo IN ('=')";
            //                SetComboList(Catálogo.TablaBit());
            //            }
            //            else if (new[] { "Usuario", "Teléfono" }.Contains(campo))
            //            {
            //                _tblSignos.DefaultView.RowFilter = @"Signo IN ('=', '≠')";
            //            }
            //            break;

            //        case "Chats":
            //            if (new[] { "Fecha", "Hora", "Duración" }.Contains(campo))
            //            {
            //                SetComboSimple();
            //                return;
            //            }

            //            _tblSignos.DefaultView.RowFilter = @"Signo IN ('=', '≠')";

            //            if (new[] { "Usuario", "Teléfono", "Comentario" }.Contains(campo))
            //            {
            //                SetComboSimple();
            //                return;
            //            }

            //            switch (campo)
            //            {
            //                case "Salida": SetComboList(Catálogo.TablaBit()); break;
            //                case "Contacto": SetComboList(Catálogo.ValoresDelCatálogo(5)); break;
            //                case "Etapa": SetComboList(Catálogo.ValoresDelCatálogo(13, 2207)); break;
            //                case "Situación": SetComboList(Catálogo.ValoresDelCatálogo(2)); break;
            //                case "Parentesco": SetComboList(Catálogo.ValoresDelCatálogo(11)); break;
            //                case "CausaNoPago": SetComboList(Catálogo.ValoresDelCatálogo(10)); break;
            //                case "Sucursal": SetComboList(Catálogo.ValoresDelCatálogo(1)); break;
            //            }
            //            break;
            //    }
            //}

        }
}
