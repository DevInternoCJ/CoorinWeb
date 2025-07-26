import React, { useState } from "react";
import { IconCustomTable } from "../IconesConsultations";
import ModalSeleccionCampania from "../ModalCamapañas/ModalSeleccionCampania";

const ModalConsultaGeneralesFooter = () => {
    const [isModalCampaniaOpen, setIsModalCampaniaOpen] = useState(false);

    const handleOpenModalCampania = () => {
        setIsModalCampaniaOpen(true);
    };

    const handleCloseModalCampania = () => {
        setIsModalCampaniaOpen(false);
    };

    const handleCargar = () => {
        // Lógica para cargar datos
        console.log("Cargando datos...");
        setIsModalCampaniaOpen(false);
    };

    return (
        <>
            <div className="flex flex-col items-center gap-4 mt-4">
                <div className="flex flex-row w-full items-center gap-4">
                    {/* Lado izquierdo - alineado con tabla Filtros */}
                    <div className="flex items-center justify-between pr-2" style={{ flex: "1", minWidth: 0 }}>
                        {/* Radios al inicio */}
                        <div className="flex items-center gap-3">
                            <label className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer bg-white hover:bg-[var(--color-jerarquia2)/10]`}>
                                <input
                                    type="radio"
                                    name="tipo"
                                    defaultChecked
                                    className="w-4 h-4 accent-[var(--color-jerarquia3)]"
                                />
                                <span className="text-base text-[var(--color-jerarquia4)] font-semibold">Contar</span>
                            </label>
                            <label className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer bg-white hover:bg-[var(--color-jerarquia2)/10]`}>
                                <input
                                    type="radio"
                                    name="tipo"
                                    defaultChecked
                                    className="w-4 h-4 accent-[var(--color-jerarquia3)]"
                                />
                                <span className="text-base text-[var(--color-jerarquia4)] font-semibold">Cuentas</span>
                            </label>
                            <label className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer bg-white hover:bg-[var(--color-jerarquia2)/10]`}>
                                <input
                                    type="radio"
                                    name="tipo"
                                    className="w-4 h-4 accent-[var(--color-jerarquia3)]"
                                />
                                <span className="text-base text-[var(--color-jerarquia4)] font-semibold">Detalle</span>
                            </label>
                        </div>
                        
                        {/* Botón Exportar al centro */}
                        <div className="flex justify-center">
                            <button className="bg-[var(--color-jerarquia2)] text-white rounded px-3 py-1 font-semibold hover:bg-[var(--color-jerarquia3)] transition">
                                Exportar
                            </button>
                        </div>
                        
                        {/* Calendario al final */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[var(--color-jerarquia4)]">A partir de</span>
                            <div className="relative">
                                <input
                                    type="date"
                                    defaultValue="2025-07-26"
                                    className="w-32 px-2 py-1 text-sm bg-white border border-black rounded focus:outline-none focus:border-[var(--color-jerarquia3)] cursor-pointer calendar-input"
                                    style={{ 
                                        fontSize: "14px",
                                        color: "#000000"
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Lado derecho - alineado con tabla Columnas */}
                    <div className="flex items-center justify-center gap-3" style={{ flex: "0 0 450px", maxWidth: "450px" }}>
                        <IconCustomTable
                            className="size-8 cursor-pointer"
                            style={{ color: "var(--color-jerarquia3)" }}
                            onClick={handleOpenModalCampania}
                        />
                        <button
                            className="bg-[var(--color-background-secondary)] text-white rounded px-3 py-1 font-semibold hover:bg-[var(--color-jerarquia3)] transition flex items-center gap-2"
                            style={{ cursor: "pointer" }}
                        >
                            Consultar
                            <span className="material-icons text-base align-middle"></span>
                        </button>
                    </div>
                </div>
                {/* Tabla vacía visual con mismo estilo que Filtros */}
                <div className="w-full flex justify-center rounded-lg bg-white border border-[var(--color-jerarquia1)] p-0.5">
                    <div
                        style={{
                            overflowX: "auto",
                            overflowY: "auto",
                            maxHeight: "20vh",
                            width: "100%",
                            scrollbarColor: "#b0b0b0 #f5f5f5",
                            scrollbarWidth: "thin"
                        }}
                        className="scrollbar-gray"
                    >
                        <table className="w-full text-xs mb-2 min-w-[1400px] bg-white text-black">
                            <thead style={{ position: "sticky", top: 0, zIndex: 2, background: "var(--color-background-secondary)" }}>
                                <tr className="bg-[var(--color-background-secondary)] text-white">
                                    <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)] rounded-tl-md">Columna 1</th>
                                    <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Columna 2</th>
                                    <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Columna 3</th>
                                    <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Columna 4</th>
                                    <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Columna 5</th>
                                    <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Columna 6</th>
                                    <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Columna 7</th>
                                    <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Columna 8</th>
                                    <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Columna 9</th>
                                    <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Columna 10</th>
                                    <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Columna 11</th>
                                    <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Columna 12</th>
                                    <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Columna 13</th>
                                    <th className="px-2 py-1 text-left rounded-tr-md">Columna 14</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 25 }).map((_, i) => (
                                    <tr key={i}>
                                        {Array.from({ length: 14 }).map((_, j) => (
                                            <td key={j} className="px-2 py-1 border-b border-[var(--color-jerarquia1)]">
                                                Dato {j + 1}-{i + 1}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <style>{`
                        .scrollbar-gray::-webkit-scrollbar {
                            height: 8px;
                            width: 8px;
                            background: #f5f5f5;
                        }
                        .scrollbar-gray::-webkit-scrollbar-thumb {
                            background: #b0b0b0;
                            border-radius: 4px;
                        }
                        .scrollbar-gray::-webkit-scrollbar-thumb:hover {
                            background: #888;
                        }
                        .calendar-input::-webkit-calendar-picker-indicator {
                            filter: invert(1);
                            color: #000000;
                            opacity: 1;
                            cursor: pointer;
                        }
                        .calendar-input::-webkit-inner-spin-button,
                        .calendar-input::-webkit-outer-spin-button {
                            opacity: 1;
                        }
                    `}</style>
                </div>
            </div>
            <div className="w-full mt-8 mb-2 flex justify-start">
                <span className="text-base text-gray-500">
                    Indique los parámetros que desea buscar y presione Agregar.
                </span>
            </div>

            {/* Modal de Selección de Campaña */}
            <ModalSeleccionCampania
                open={isModalCampaniaOpen}
                onClose={handleCloseModalCampania}
                onCargar={handleCargar}
            />
        </>
    );
};

export default ModalConsultaGeneralesFooter;
