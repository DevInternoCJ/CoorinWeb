import React from "react";

const DropdownArrow = () => (
    <span
        style={{
            pointerEvents: "none",
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "1.15rem",
            color: "#222",
            display: "flex",
            alignItems: "center"
        }}
    >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M6 8l4 4 4-4" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </span>
);

const ModalConsultaGeneralesFiltros = () => (
    <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] h-full flex flex-col" style={{ minWidth: 0 }}>
        {/* Fila de filtros con label a la izquierda, selects centrados y botón a la derecha */}
        <div className="flex items-center mb-2 w-full">
            <span className="text-xs font-semibold pl-1 mr-4" style={{ color: "var(--color-jerarquia2)" }}>Filtros</span>
            <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-4">
                    <div className="relative">
                    </div>
                    <div className="relative">
                        <select className="w-32 font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none">
                            <option>Telefonía</option>
                            <option>Clase</option>
                            <option>Origen</option>
                            <option>Confirmado</option>
                            <option>EntidadFederativa</option>
                            <option>HusoHorario</option>
                            <option>Teléfono</option>
                            <option># SinContacto</option>
                            <option># Desconocidos</option>
                            <option># Conocidos</option>
                            <option># Titulares</option>
                            <option>Municipio</option>
                            <option>UltimaMarcacion</option>
                            <option>Calificacion</option>
                            <option>EstatusNegociacion</option>
                        </select>
                        <DropdownArrow />
                    </div>
                    <div className="relative">
                        <select className="w-12 font-bold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none">
                            <option className="font-bold">=</option>
                            <option className="font-bold">≠</option>
                        </select>
                        <DropdownArrow />
                    </div>
                    <div className="relative">
                        <select className="w-45 font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none">
                            <option>Extranjero 1</option>
                            <option>Internacional 1</option>
                            <option>Fija</option>
                            <option>Movil</option>
                            <option>De paga</option>
                            <option>Sin red</option>
                        </select>
                        <DropdownArrow />
                    </div>
                </div>
            </div>
            <button className="bg-[var(--color-jerarquia2)] text-white rounded px-3 py-1 font-semibold hover:bg-[var(--color-jerarquia3)] transition ml-4">
                Agregar
            </button>
        </div>
        <div
            style={{
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "23vh",
                height: "100%",
                scrollbarColor: "#b0b0b0 #f5f5f5",
                scrollbarWidth: "thin",
                flex: 1
            }}
            className="scrollbar-gray"
        >
            <table className="w-full text-xs mb-2 text-black">
                <thead style={{ position: "sticky", top: 0, zIndex: 2, background: "var(--color-background-secondary)" }}>
                    <tr className="bg-[var(--color-background-secondary)] text-white">
                        <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)] rounded-tl-md w-1/3">Campo</th>
                        <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)] w-1/3">Valores</th>
                        <th className="px-2 py-1 text-right rounded-tr-md w-1/3">Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <tr key={i}>
                            <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)]">Campo {i + 1}</td>
                            <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)]">Valor {i + 1}</td>
                            <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)] text-right">
                                <button className="text-red-500 hover:underline">Borrar</button>
                            </td>
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
);

export default ModalConsultaGeneralesFiltros;
