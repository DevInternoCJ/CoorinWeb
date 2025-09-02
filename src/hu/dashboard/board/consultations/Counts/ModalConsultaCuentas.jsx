import React from "react";
import ModalConsultaCuentasHeader from "./ModalConsultaCuentasHeader";
import ModalConsultaCuentasFiltros from "./ModalConsultaCuentasFiltros";
import ModalConsultaCuentasColumnas from "./ModalConsultaCuentasColumnas";
import ModalConsultaCuentasFooter from "./ModalConsultaCuentasFooter";

const ModalConsultaCuentas = ({ onClose }) => {
    return (
        <div className="modal-xl-container" style={{ maxWidth: "98vw", overflowX: "hidden" }}>
            <ModalConsultaCuentasHeader onClose={onClose} />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    overflowX: "auto",
                    width: "100%",
                    minHeight: "1px",
                    alignItems: "stretch"
                }}
                className="scrollbar-gray"
            >
                <div style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column" }}>
                    <ModalConsultaCuentasFiltros />
                </div>
                <div style={{ minWidth: 0, flex: "0 0 450px", maxWidth: "450px", display: "flex", flexDirection: "column" }}>
                    <ModalConsultaCuentasColumnas />
                </div>
            </div>
            <div style={{ width: "100%", overflowX: "auto" }}>
                <ModalConsultaCuentasFooter />
            </div>
        </div>
    );
};

export default ModalConsultaCuentas;