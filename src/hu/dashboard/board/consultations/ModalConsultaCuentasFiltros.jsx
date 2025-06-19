import React from "react";

const ModalConsultaCuentasFiltros = () => (
    <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)]">
        <div className="flex items-center gap-4 mb-2">
            <span className="text-xs font-semibold pl-1" style={{ color: "var(--color-jerarquia2)" }}>Filtros</span>
            <select className="dropdown-select w-32 text-black">
                <option>Cuenta</option>
            </select>
            <select className="dropdown-select w-32 text-black">
                <option>Situación</option>
            </select>
            <select className="dropdown-select w-12 text-black font-bold">
                <option className="font-bold">=</option>
                <option className="font-bold">≠</option>
            </select>
            <select className="dropdown-select w-40 text-black">
                <option>Niegan Acreditado</option>
            </select>
            <button className="bg-[var(--color-jerarquia2)] text-white rounded px-3 py-1 font-semibold hover:bg-[var(--color-jerarquia3)] transition ml-auto">
                Agregar
            </button>
        </div>
        <table className="w-full text-xs mb-2">
            <thead>
                <tr className="bg-[var(--color-background-secondary)] text-white">
                    <th className="px-2 py-1 text-left">Concepto</th>
                    <th className="px-2 py-1 text-left">Campo</th>
                    <th className="px-2 py-1 text-left">Valores</th>
                    <th className="px-2 py-1 text-right">Borrar</th>
                </tr>
            </thead>
            <tbody style={{ minHeight: "30vh", display: "block", width: "100%" }}>
                {/* Aquí van los filtros agregados */}
            </tbody>
        </table>
    </div>
);

export default ModalConsultaCuentasFiltros;
