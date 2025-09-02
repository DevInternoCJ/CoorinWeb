import React from "react";


const DropdownArrow = () => (
    <span className="modal-dropdown-arrow">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M6 8l4 4 4-4" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </span>
);

const ModalConsultaCuentasFiltros = () => (
    <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] h-full flex flex-col" style={{ minWidth: 0 }}>
        {/* Fila de filtros con label a la izquierda, selects centrados y botón a la derecha */}
        <div className="flex items-center mb-2 w-full">
            <span className="modal-span-1 pl-1 mr-4" style={{ color: "var(--color-jerarquia2)" }}>Filtros</span>
            <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <select className="modal-dropdown-select appearance-none">
                            <option>Cuenta</option>
                        </select>
                        <DropdownArrow />
                    </div>
                    <div className="relative">
                        <select className="modal-dropdown-select appearance-none">
                            <option>Situación</option>
                        </select>
                        <DropdownArrow />
                    </div>
                    <div className="relative">
                        <select className="modal-dropdown-select appearance-none font-bold w-12">
                            <option className="font-bold">=</option>
                            <option className="font-bold">≠</option>
                        </select>
                        <DropdownArrow />
                    </div>
                    <div className="relative">
                        <select className="modal-dropdown-select appearance-none w-45">
                            <option>Niegan Acreditado</option>
                        </select>
                        <DropdownArrow />
                    </div>
                </div>
            </div>
            <button className="modal-btn modal-btn-primary ml-4">
                Agregar
            </button>
        </div>
        <div
            style={{
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "31vh",
                height: "100%",
                flex: 1
            }}
            className="scrollbar-gray"
        >
            <table className="modal-table mb-2">
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>Campo</th>
                        <th>Valores</th>
                        <th>Operador</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 15 }).map((_, i) => (
                        <tr key={i}>
                            <td>Concepto {i + 1}</td>
                            <td>Campo {i + 1}</td>
                            <td>Valor {i + 1}</td>
                            <td>=</td>
                            <td style={{ textAlign: "right" }}>
                                <button className="text-red-500 hover:underline">Borrar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default ModalConsultaCuentasFiltros;