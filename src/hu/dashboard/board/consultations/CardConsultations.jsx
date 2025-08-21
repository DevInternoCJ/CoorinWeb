import React, { useState } from "react";
import DataDashConsul from "../../DataDashConsul";
import { ExecutiveChart } from "../../DashboardIcons";
import { IconCuentas, IconProductividad, IconGenerales, IconHistoricos } from "./IconesConsultations";
import ModalConsultaCuentas from "./counts/ModalConsultaCuentas";
import ModalBaseCuentas from "./counts/ModalBaseCuentas";
import ModalConsultaProductividad from "./Productivity/ModalConsultaProductividad";
import ModalBaseProductividad from "./productivity/ModalBaseProductividad";
import ModalConsultaGenerales from "./Generals/ModalConsultaGenerales";
import ModalBaseGenerales from "./Generals/ModalBaseGenerales";
import ModalConsultaHistoricos from "./Historical/ModalConsultaHistoricos";
import ModalBaseHistoricos from "./Historical/ModalBaseHistoricos";
import ModalBaseInformation from "./Informacion/ModalBaseInformation";
import ModalConsultaInformationHeader from "./Informacion/ModalConsultaInformationHeader";
import ModalConsultaInformationContent from "./Informacion/ModalConsultaInformationContent";
import ModalConsultaInformationFooter from "./Informacion/ModalConsultaInformationFooter";

const CardConsultations = () => {
    const [open, setOpen] = useState(false);
    const [openProductividad, setOpenProductividad] = useState(false);
    const [openGenerales, setOpenGenerales] = useState(false);
    const [openHistoricos, setOpenHistoricos] = useState(false);
    const [openInformation, setOpenInformation] = useState(false);

    return (
        <>
            {/* Tarjetas originales */}
            {DataDashConsul.map((catalog) =>
                catalog.title === "Cuentas" ? (
                    <div
                        key={catalog.id}
                        className="card card-sm sm:max-w-sm rounded-xl p-1 xl:max-w-none transition-all duration-200 ease-in-out hover:scale-105 group relative overflow-visible animated-border cursor-pointer"
                        style={{ backgroundColor: `var(--${catalog.color})` }}
                        tabIndex={0}
                        role="button"
                        onClick={() => setOpen(true)}
                    >
                        {/* Máscara opaca al hacer hover */}
                        <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-15 transition-opacity duration-100 bg-black"></div>
                        <div className="card-header">
                            <h5
                                className="card-title font-weight-600"
                                style={{ color: `var(--${catalog.fontcolor})` }}
                            >
                                {catalog.title}
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="flex justify-center">
                                <IconCuentas
                                    className="size-8"
                                    style={{ color: `var(--${catalog.fontcolor})` }}
                                />
                            </div>
                        </div>
                        <div className="card-footer text-center">
                            <p className="text-base-content group-hover:text-black transition-colors duration-200">Abrir</p>
                        </div>
                    </div>
                ) : (
                    <div
                        className="card card-sm sm:max-w-sm rounded-xl p-1 xl:max-w-none transition-all duration-200 ease-in-out hover:scale-105 group relative overflow-visible animated-border cursor-pointer"
                        key={catalog.id}
                        style={{ backgroundColor: `var(--${catalog.color})` }}
                        onClick={() => {
                            if (catalog.title === "Productividad") {
                                setOpenProductividad(true);
                            } else if (catalog.title === "Generales") {
                                setOpenGenerales(true);
                            } else if (catalog.title === "Historicos") {
                                setOpenHistoricos(true);
                            } else {
                                alert(`Click en ${catalog.title}`);
                            }
                        }}
                        tabIndex={0}
                        role="button"
                    >
                        {/* Máscara opaca al hacer hover */}
                        <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-15 transition-opacity duration-100 bg-black"></div>
                        <div className="card-header">
                            <h5
                                className="card-title font-weight-600"
                                style={{ color: `var(--${catalog.fontcolor})` }}
                            >
                                {catalog.title}
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="flex justify-center">
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
                        <div className="card-footer text-center">
                            <p className="text-base-content group-hover:text-black transition-colors duration-200">Abrir</p>
                        </div>
                    </div>                )
            )}
            <ModalBaseCuentas open={open} onClose={() => setOpen(false)}>
                <ModalConsultaCuentas onClose={() => setOpen(false)} />
            </ModalBaseCuentas>
            <ModalBaseProductividad open={openProductividad} onClose={() => setOpenProductividad(false)}>
                <ModalConsultaProductividad onClose={() => setOpenProductividad(false)} />
            </ModalBaseProductividad>
            <ModalBaseGenerales open={openGenerales} onClose={() => setOpenGenerales(false)}>
                <ModalConsultaGenerales onClose={() => setOpenGenerales(false)} />
            </ModalBaseGenerales>
            <ModalBaseHistoricos open={openHistoricos} onClose={() => setOpenHistoricos(false)}>
                <ModalConsultaHistoricos onClose={() => setOpenHistoricos(false)} />
            </ModalBaseHistoricos>
            {/* Tarjeta de Información al final */}
            <div
                className="card card-sm sm:max-w-sm rounded-xl p-1 xl:max-w-none transition-all duration-200 ease-in-out hover:scale-105 group relative overflow-visible animated-border cursor-pointer"
                style={{ backgroundColor: "var(--color-jerarquia3)" }}
                tabIndex={0}
                role="button"
                onClick={() => setOpenInformation(true)}
            >
                {/* Máscara opaca al hacer hover */}
                <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-15 transition-opacity duration-100 bg-black"></div>
                <div className="card-header">
                    <h5
                        className="card-title font-weight-600"
                        style={{ color: "#fff" }}
                    >
                        Informacio
                    </h5>
                </div>
                <div className="card-body">
                    <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16" style={{ color: "#fff" }}>
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                        </svg>
                    </div>
                </div>
                <div className="card-footer text-center">
                    <p className="text-base-content group-hover:text-black transition-colors duration-200">Abrir</p>
                </div>
            </div>
            {/* Modal de Información */}
            <ModalBaseInformation open={openInformation} onClose={() => setOpenInformation(false)}>
                <ModalConsultaInformationHeader onClose={() => setOpenInformation(false)} />
                <ModalConsultaInformationContent />
                <ModalConsultaInformationFooter />
            </ModalBaseInformation>
        </>
    );
};

export default CardConsultations;