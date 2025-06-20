import React, { useState } from "react";
import { IconCustomTable } from "./IconesConsultations";
import ModalSeleccionCampania from "./ModalSeleccionCampania";

const ModalConsultaCuentasFooter = () => {
    const [openSeleccionCampania, setOpenSeleccionCampania] = useState(false);
    return (
        <>
            <div className="flex flex-col items-center gap-4 mt-4">
                <div className="flex flex-row w-full items-center">
                    {/* Botón Consultar centrado, alineado con la tabla Filtros (3/4) */}
                    <div className="flex justify-center items-center" style={{ width: "75%" }}>
                        <button
                            className="bg-[var(--color-background-secondary)] text-white rounded px-6 py-2 font-semibold hover:bg-[var(--color-jerarquia3)] transition flex items-center gap-2"
                            style={{ cursor: "pointer" }}
                        >
                            Consultar
                            <span className="material-icons text-base align-middle">table_view</span>
                        </button>
                        <IconCustomTable
                            className="ml-2 size-6 cursor-pointer"
                            style={{ color: "var(--color-jerarquia3)" }}
                            onClick={() => setOpenSeleccionCampania(true)}
                        />
                    </div>
                    {/* Radios alineados con la tabla Columnas (1/4) */}
                    <div className="flex justify-center items-center gap-8 pr-2" style={{ width: "25%" }}>
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
                                className="w-4 h-4 accent-[var(--color-jerarquia3)]"
                            />
                            <span className="text-base text-[var(--color-jerarquia4)] font-semibold">Detalle</span>
                        </label>
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
                    `}</style>
                </div>
            </div>
            <div className="w-full mt-8 mb-2 flex justify-start">
                <span className="text-base text-gray-500">
                    Indique los parámetros que desea buscar y presione Agregar.
                </span>
            </div>
            {openSeleccionCampania && (
                <ModalSeleccionCampania
                    open={openSeleccionCampania}
                    onClose={() => setOpenSeleccionCampania(false)}
                    onCargar={() => setOpenSeleccionCampania(false)}
                />
            )}
        </>
    );
};

export default ModalConsultaCuentasFooter;