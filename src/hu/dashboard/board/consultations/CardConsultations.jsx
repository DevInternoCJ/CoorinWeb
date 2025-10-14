import React, { useState } from "react";
import DataDashConsul from "../../DataDashConsul";
import { ExecutiveChart } from "../../DashboardIcons";
import { IconCuentas, IconProductividad, IconGenerales, IconHistoricos } from "./IconesConsultations";
import ModalConsultaCuentas from "./counts/ModalConsultaCuentas";
import ModalBaseCuentas from "./counts/ModalBaseCuentas";
import ProductivityModal from "./Productivity/ModalProductivityModal";
import ModalConsultaGenerales from "./Generals/ModalConsultaGenerales";
import ModalBaseGenerales from "./Generals/ModalBaseGenerales";
import HistoricosModal from "./Historical/ModalHistoricosModal";
import ModalConsultaEjecutivosModal from "./Executives/ModalConsultaEjecutivosModal";
const CardConsultations = ({ onModalOpen, onModalClose }) => {
    const [open, setOpen] = useState(false);
    const [openProductividad, setOpenProductividad] = useState(false);
    const [openGenerales, setOpenGenerales] = useState(false);
    const [openHistoricos, setOpenHistoricos] = useState(false);
    const [openEjecutivos, setOpenEjecutivos] = useState(false);

    // Funciones para manejar la apertura de modales
    const handleOpenModal = (modalSetter) => {
        modalSetter(true);
        if (onModalOpen) onModalOpen();
    };

    // Función para manejar el cierre de modales
    const handleCloseModal = (modalSetter) => {
        modalSetter(false);
        if (onModalClose) onModalClose();
    };

    return (
        <>
            {/* Tarjetas originales */}
            {DataDashConsul.map((catalog) =>
                catalog.title === "Cuentas" ? (
                    <div
                        key={catalog.id}
                        className="card card-sm sm:max-w-sm rounded-2xl p-2 xl:max-w-none transition-all duration-200 ease-in-out hover:scale-105 group relative overflow-visible animated-border cursor-pointer shadow-none"
                        style={{ backgroundColor: `var(--${catalog.color})` }}
                        tabIndex={0}
                        role="button"
                        onClick={() => handleOpenModal(setOpen)}
                    >
                        {/* Máscara opaca al hacer hover */}
                        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-100"></div>
                        <div className="card-header p-1">
                            <h5
                                className="card-title font-weight-600"
                                style={{ color: `var(--${catalog.fontcolor})` }}
                            >
                                {catalog.title}
                            </h5>
                        </div>
                        <div className="card-body p-3 mb-0">
                            <div className="flex justify-center">
                                <div className="avatar avatar-placeholder">
                                    <div className={`bg-neutral-300/${catalog.iconShadow} text-neutral-content w-15 rounded-full flex items-center justify-center`}>
                                        <IconCuentas
                                            className="size-8"
                                            style={{ color: `var(--${catalog.fontcolor})` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer text-center">
                            <p
                                className="group-hover:text-black transition-colors duration-200"
                                style={{ color: `var(--${catalog.fontcolor})` }}
                            >
                                Abrir
                            </p>
                        </div>
                    </div>
                ) : (
                    <div
                        className="card card-sm sm:max-w-sm rounded-2xl p-2 xl:max-w-none transition-all duration-200 ease-in-out hover:scale-105 group relative overflow-visible animated-border cursor-pointer shadow-none"
                        key={catalog.id}
                        style={{ backgroundColor: `var(--${catalog.color})` }}
                        onClick={() => {
                            if (catalog.title === "Productividad") {
                                handleOpenModal(setOpenProductividad);
                            } else if (catalog.title === "Generales") {
                                handleOpenModal(setOpenGenerales);
                            } else if (catalog.title === "Historicos") {
                                handleOpenModal(setOpenHistoricos);
                            }else if (catalog.title === "Ejecutivos") {
                                handleOpenModal(setOpenEjecutivos);
                            } 
                            
                            else {
                                alert(`Click en ${catalog.title}`);
                            }
                        }}
                        tabIndex={0}
                        role="button"
                    >
                        {/* Máscara opaca al hacer hover */}
                        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-100"></div>
                        <div className="card-header p-1">
                            <h5
                                className="card-title font-weight-600"
                                style={{ color: `var(--${catalog.fontcolor})` }}
                            >
                                {catalog.title}
                            </h5>
                        </div>
                        <div className="card-body p-3 mb-0">
                            <div className="flex justify-center">
                                <div className="avatar avatar-placeholder">
                                    <div className={`bg-neutral-300/${catalog.iconShadow} text-neutral-content w-15 rounded-full flex items-center justify-center`}>
                                        {catalog.title === "Productividad" ? (
                                            <IconProductividad
                                                className="size-8"
                                                style={{ color: `var(--${catalog.fontcolor})` }}
                                            />
                                        ) : catalog.title === "Generales" ? (
                                            <IconGenerales
                                                className="size-8"
                                                style={{ color: `var(--${catalog.fontcolor})` }}
                                            />
                                        ) : catalog.title === "Historicos" ? (
                                            <IconHistoricos
                                                className="size-8"
                                                style={{ color: `var(--${catalog.fontcolor})` }}
                                            />
                                        ) : (
                                            <ExecutiveChart
                                                className="size-8"
                                                style={{ color: `var(--${catalog.fontcolor})` }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer text-center">
                            <p
                                className="group-hover:text-black transition-colors duration-200"
                                style={{ color: `var(--${catalog.fontcolor})` }}
                            >
                                Abrir
                            </p>
                        </div>
                    </div>                )
            )}
            <ModalBaseCuentas open={open} onClose={() => handleCloseModal(setOpen)}>
                <ModalConsultaCuentas onClose={() => handleCloseModal(setOpen)} />
            </ModalBaseCuentas>
            <ProductivityModal 
                isOpen={openProductividad} 
                onClose={() => handleCloseModal(setOpenProductividad)}
            />
            <ModalBaseGenerales open={openGenerales} onClose={() => handleCloseModal(setOpenGenerales)}>
                <ModalConsultaGenerales onClose={() => handleCloseModal(setOpenGenerales)} />
            </ModalBaseGenerales>
            
            {/* Modal de Históricos */}
            <HistoricosModal 
                isOpen={openHistoricos}
                onClose={() => handleCloseModal(setOpenHistoricos)}
            />
            <ModalConsultaEjecutivosModal 
                isOpen={openEjecutivos}
                onClose={() => handleCloseModal(setOpenEjecutivos)}
            />
        </>
    );
};

export default CardConsultations;