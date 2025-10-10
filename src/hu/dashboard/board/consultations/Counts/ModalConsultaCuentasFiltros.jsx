import React, { useState } from "react";

const DropdownArrow = () => (
    <span className="modal-dropdown-arrow">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M6 8l4 4 4-4" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </span>
);

const ModalConsultaCuentasFiltros = () => {
    const [cuenta, setCuenta] = useState("cuenta1");
    const [situacion, setSituacion] = useState("situacion1");
    const [operador, setOperador] = useState("=");
    const [niegan, setNiegan] = useState("niegan1");

    return (
        <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] h-full flex flex-col" style={{ minWidth: 0 }}>
            <span className="modal-span-1 pl-1 mr-4" style={{ color: "var(--color-jerarquia2)" }}>Filtros</span>
            {/* Selects en columnas y responsivo */}
            <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-2 w-full">
                {/* Cuenta */}
                <div className="relative flex-1">
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none
                            focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={cuenta}
                        onChange={e => setCuenta(e.target.value)}
                        id="cuenta-select"
                    >
                        <option value="" disabled hidden></option>
                        <option value="cuenta1">Cuenta 1</option>
                        <option value="cuenta2">Cuenta 2</option>
                    </select>
                    <label
                        htmlFor="cuenta-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                            peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
                            peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Cuenta
                    </label>
                </div>
                {/* Situación */}
                <div className="relative flex-1">
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none
                            focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={situacion}
                        onChange={e => setSituacion(e.target.value)}
                        id="situacion-select"
                    >
                        <option value="" disabled hidden></option>
                        <option value="situacion1">Situación 1</option>
                        <option value="situacion2">Situación 2</option>
                    </select>
                    <label
                        htmlFor="situacion-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                            peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
                            peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Situación
                    </label>
                </div>
                {/* Operador */}
                <div className="relative flex-1">
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none
                            focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 font-bold"
                        value={operador}
                        onChange={e => setOperador(e.target.value)}
                        id="operador-select"
                    >
                        <option value="=" className="font-bold">=</option>
                        <option value="≠" className="font-bold">≠</option>
                    </select>
                    <label
                        htmlFor="operador-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                            peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
                            peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Operador
                    </label>
                </div>
                {/* Niegan Acreditado */}
                <div className="relative flex-1">
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none
                            focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={niegan}
                        onChange={e => setNiegan(e.target.value)}
                        id="niegan-select"
                    >
                        <option value="" disabled hidden></option>
                        <option value="niegan1">Niegan Acreditado 1</option>
                        <option value="niegan2">Niegan Acreditado 2</option>
                    </select>
                    <label
                        htmlFor="niegan-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                            peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
                            peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Niegan acreditado
                    </label>
                </div>
            </div>
            <div className="flex justify-end mb-2">
                <button className="btn-success">
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
};

export default ModalConsultaCuentasFiltros;