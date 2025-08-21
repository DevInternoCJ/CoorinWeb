import React from "react";
import DropdownTipoInformacion from "./DropdownTipoInformacion";
import InformacionPagoDropdown from "./DropdownComponents/InformacionPagoDropdown";
import InformacionPagosReportDropdown from "./DropdownComponents/InformacionPagosReportDropdown";

const ModalBaseInformacion = ({ children }) => {
    return (
        <div style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(2px)"
        }}>
            <div className="modal-xl-container" style={{
                background: "var(--color-bgcolor1)",
                borderRadius: "1rem",
                boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                padding: "1.5rem",
                maxWidth: "920px", // 800px * 1.15
                minWidth: "690px", // 600px * 1.15
                height: "633px",   // 550px * 1.15
                display: "flex",
                flexDirection: "column",
                position: "relative"
            }}>
                {/* El header/título debe ir antes del dropdown, así que el dropdown va aquí */}
                {children && children[0]}
                <div style={{ margin: '1.5rem 0 1.5rem 0' }}>
                    <DropdownTipoInformacion>
                        <InformacionPagoDropdown value="Pagos" />
                        <InformacionPagosReportDropdown value="Pagos reportados" />
                    </DropdownTipoInformacion>
                </div>
                {/* El resto del contenido va después del dropdown */}
                {children && children.slice(1)}
            </div>
        </div>
    );
};

export default ModalBaseInformacion;
