import React from "react";

const ModalConsultaCuentasColumnas = () => (
    <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] h-full flex flex-col" style={{ minWidth: 0 }}>
        <div className="flex items-center mb-2 w-full">
            <span className="text-xs font-semibold pl-1" style={{ color: "var(--color-jerarquia2)", minWidth: 80 }}>Columnas</span>
            <div className="flex-1 flex justify-center">
                <button className="bg-[var(--color-jerarquia2)] text-white rounded px-3 py-1 font-semibold hover:bg-[var(--color-jerarquia3)] transition">
                    Agregar
                </button>
            </div>
        </div>
        <div
            style={{
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "31vh",
                height: "100%",
                scrollbarColor: "#b0b0b0 #f5f5f5",
                scrollbarWidth: "thin",
                flex: 1
            }}
            className="scrollbar-gray"
        >
            <table className="text-xs text-black" style={{ minWidth: "400px", width: "max-content" }}>
                <thead style={{ position: "sticky", top: 0, zIndex: 2, background: "var(--color-background-secondary)" }}>
                    <tr className="bg-[var(--color-background-secondary)] text-white border-b border-[var(--color-jerarquia1)]">
                        <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)] rounded-tl-md">Campo</th>
                        <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Tipo</th>
                        <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Descripción</th>
                        <th className="px-2 py-1 text-right rounded-tr-md">Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 20 }).map((_, i) => (
                        <tr key={i}>
                            <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)]">Campo {i + 1}</td>
                            <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)]">Tipo {i + 1}</td>
                            <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)]">Descripción {i + 1}</td>
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

export default ModalConsultaCuentasColumnas;
