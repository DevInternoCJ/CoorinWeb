import React, { useState } from "react";
import ModalConsultaHistoricosHeader from "./ModalConsultaHistoricosHeader";
import ModalConsultaHistoricosFiltros from "./ModalConsultaHistoricosFiltros";

const ModalConsultaHistoricos = ({ onClose }) => {
    const [isIndividual, setIsIndividual] = useState(false);

    return (
        <div className="modal-xl-container" style={{ maxWidth: "800px", minWidth: "600px", height: "550px" }}>
            <ModalConsultaHistoricosHeader onClose={onClose} />
            
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                height: "calc(100% - 120px)", // Altura fija menos el header
                overflow: "hidden"
            }}>
                {/* Contenido principal con filtros */}
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    flex: 1
                }}>
                    <ModalConsultaHistoricosFiltros onIndividualChange={setIsIndividual} />
                </div>

                {/* Mensaje informativo */}
                <div style={{
                    padding: "1rem",
                    marginTop: "auto"
                }}>
                    <p className="text-sm text-[var(--color-jerarquia3)]" style={{ 
                        textAlign: "justify",
                        margin: 0,
                        fontStyle: "italic"
                    }}>
                        {isIndividual 
                            ? 'Introduzca la cuenta, seleccione que concepto(s) para buscar en histórico y presione "Buscar"'
                            : 'Seleccione qué concepto(s) y seleccione el libro de Excel (UNA pestaña, UNA columna) con las cuentas para buscarlas en histórico.'
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ModalConsultaHistoricos;
