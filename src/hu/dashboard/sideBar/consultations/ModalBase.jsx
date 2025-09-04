import React from "react";
import DarkList from "./DarkList";
import Regrest from "./Regrest";
import Payments from "./information/Payments";
import ReportingPayments from "./information/ReportingPayments";
import Wrongs from "./information/Wrongs";
import Addresses from "./information/Addresses";
import Emails from "./information/Emails";
import Searches from "./information/Searches";
import Offers from "./information/Offers";
import Comments from "./information/Comments";
import VGP from "./information/VGP";

const ModalBase = ({ onClose, selectedOption = "Lista Negra" }) => {
    // Mapeo de componentes para cada opción del sidebar
    const componentsMap = {
        "Lista Negra": <DarkList />,
        "Arrepentimientos": <Regrest />,
        "Pagos": <Payments />,
        "Pagos reportados": <ReportingPayments />,
        "Datos Erroneos": <Wrongs />,
        "Domicilios": <Addresses />,
        "Correos": <Emails />,
        "Búsquedas": <Searches />,
        "Ofrecimientos": <Offers />,
        "Comentarios": <Comments />,
        "VGP": <VGP />
    };

    return (
        <div className="modal-blur-bg">
            <div className="modal-content modal-xl-container" style={{
                maxWidth: "920px",
                minWidth: "690px",
                height: "633px",
                display: "flex",
                flexDirection: "column",
                position: "relative"
            }}>
                {/* Header simplificado sin dropdown */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                    borderBottom: "1px solid #e0e0e0",
                    paddingBottom: "1rem"
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src="/public/logo_coorin_7.svg" alt="Logo Coorin" style={{ height: 36, marginRight: 8 }} />
                        <h2 className="modal-title">
                            {selectedOption}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="modal-btn modal-btn-close ml-4"
                        aria-label="Cerrar"
                    >
                        &times;
                    </button>
                </div>

                {/* Content - mostrando el componente correspondiente */}
                <div style={{ flex: 1, overflow: "auto", width: '100%' }}>
                    {componentsMap[selectedOption] || (
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            height: '100%',
                            color: '#666',
                            fontSize: '1.1rem'
                        }}>
                            Componente para "{selectedOption}" no disponible aún
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalBase;
