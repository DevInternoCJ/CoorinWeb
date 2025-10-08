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
import ModalConsultaEjecutivos from "./Executives/ModalConsultaEjecutivos";
import ModalBaseEjecutivos from "./Executives/ModaBaseEjecutivos";
const CardConsultations = () => {
    const [open, setOpen] = useState(false);
    const [openProductividad, setOpenProductividad] = useState(false);
    const [openGenerales, setOpenGenerales] = useState(false);
    const [openHistoricos, setOpenHistoricos] = useState(false);
    const [openEjecutivos, setOpenEjecutivos] = useState(false);

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
                        onClick={() => setOpen(true)}
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
                                setOpenProductividad(true);
                            } else if (catalog.title === "Generales") {
                                setOpenGenerales(true);
                            } else if (catalog.title === "Historicos") {
                                setOpenHistoricos(true);
                            }else if (catalog.title === "Ejecutivos") {
                                setOpenEjecutivos(true);
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
            <ModalBaseEjecutivos open={openEjecutivos} onClose={() => setOpenEjecutivos(false)}>
                <ModalConsultaEjecutivos onClose={() => setOpenEjecutivos(false)} />
            </ModalBaseEjecutivos>
        </>
    );
};

export default CardConsultations;