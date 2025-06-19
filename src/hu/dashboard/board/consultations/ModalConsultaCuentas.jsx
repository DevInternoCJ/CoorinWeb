import React from "react";
import ModalConsultaCuentasHeader from "./ModalConsultaCuentasHeader";
import ModalConsultaCuentasFiltros from "./ModalConsultaCuentasFiltros";
import ModalConsultaCuentasColumnas from "./ModalConsultaCuentasColumnas";
import ModalConsultaCuentasFooter from "./ModalConsultaCuentasFooter";

const ModalConsultaCuentas = () => {
    return (
        <div className="modal-xl-container">
            <ModalConsultaCuentasHeader />
            <div className="flex flex-col md:flex-row gap-4 mt-2">
                <div className="flex-1">
                    <ModalConsultaCuentasFiltros />
                </div>
                <div className="w-full md:w-1/3">
                    <ModalConsultaCuentasColumnas />
                </div>
            </div>
            <ModalConsultaCuentasFooter />
        </div>
    );
};

export default ModalConsultaCuentas;
