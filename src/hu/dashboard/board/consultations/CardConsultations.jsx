import React from "react";
import DataDashConsul from "../../DataDashConsul";
import { ExecutiveChart } from "../../DashboardIcons";
import { IconCuentas, IconProductividad, IconGenerales, IconHistoricos } from "./IconesConsultations";

const CardConsultations = () => {
    // Puedes personalizar la función según la acción deseada
    const handleCardClick = (catalog) => {
        // Aquí va la lógica de navegación, modal, etc.
        alert(`Click en ${catalog.title}`);
    };

    return (
        <>
            {DataDashConsul.map((catalog) => (
                <div
                    className="card card-sm sm:max-w-sm rounded-xl p-1 xl:max-w-none transition-all duration-200 ease-in-out hover:scale-105 group relative overflow-visible animated-border cursor-pointer"
                    key={catalog.id}
                    style={{ backgroundColor: `var(--${catalog.color})` }}
                    onClick={() => handleCardClick(catalog)}
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
                    <div key={catalog.id} className="card-body">
                        <div className="flex justify-center">
                            {catalog.title === "Cuentas" ? (
                                <IconCuentas
                                    className="size-8"
                                    style={{ color: `var(--${catalog.fontcolor})` }}
                                />
                            ) : catalog.title === "Productividad" ? (
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
                </div>
            ))}
        </>
    );
};

export default CardConsultations;
