import React from "react";

const ModalConsultaCuentasColumnas = () => (
    <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)]">
        <div className="flex items-center mb-2">
            <span className="text-xs text-gray-700 font-semibold pl-1">Columnas</span>
            <div className="flex-1 flex justify-center">
                <button className="bg-[var(--color-jerarquia2)] text-white rounded px-3 py-1 font-semibold hover:bg-[var(--color-jerarquia3)] transition">
                    Agregar
                </button>
            </div>
        </div>
        <table className="w-full text-xs">
            <thead>
                <tr className="bg-[var(--color-background-secondary)] text-white">
                    <th className="px-2 py-1 text-left">Campo</th>
                    <th className="px-2 py-1 text-right">Borrar</th>
                </tr>
            </thead>
            <tbody style={{ minHeight: "31vh", display: "block", width: "100%" }}>
                {/* Aquí van las columnas seleccionadas */}
            </tbody>
        </table>
    </div>
);

export default ModalConsultaCuentasColumnas;
