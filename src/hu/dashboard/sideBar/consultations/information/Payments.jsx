

import React, { useState } from "react";
import ConsorcioLogo from "../../../../../assets/logo_coorin_7.svg";

const PaymentsContent = () => {
    const [cartera, setCartera] = useState("american_express");
    const [consulta, setConsulta] = useState("");
    const [desde, setDesde] = useState(new Date().toISOString().slice(0, 10));
    const [hasta, setHasta] = useState(new Date().toISOString().slice(0, 10));

    return (
        <div className="w-full max-w-xs mx-auto py-6 flex flex-col items-center">
            {/* Logo centrado arriba de Cartera */}
            <div className="flex justify-center mb-4 w-full">
                <img src={ConsorcioLogo} alt="Logo Coorin" className="h-20 w-20 object-contain mx-auto" />
            </div>
            <div className="w-full mb-6 relative" style={{ minHeight: 320 }}>
                {/* Cartera ocupa todo el ancho */}
                <div className="relative w-full mb-3">
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={cartera}
                        onChange={e => setCartera(e.target.value)}
                        id="cartera-select-payments"
                    >
                        <option value="" disabled hidden></option>
                        <option value="american_express">American Express</option>
                        <option value="hsbc">HSBC</option>
                        <option value="santander">Santander</option>
                    </select>
                    <label
                        htmlFor="cartera-select-payments"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Cartera
                    </label>
                </div>
                {/* Consulta en un row abajo, mismo ancho que Cartera */}
                <div className="relative w-full mb-3">
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={consulta}
                        onChange={e => setConsulta(e.target.value)}
                        id="consulta-select-payments"
                    >
                        <option value="">- Todas -</option>
                        <option value="pagadas">Pagadas</option>
                        <option value="pendientes">Pendientes</option>
                    </select>
                    <label
                        htmlFor="consulta-select-payments"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Consulta
                    </label>
                </div>
                {/* Fechas */}
                <div className="flex gap-3 mb-3">
                    {/* Desde */}
                    <div className="hs-input-group w-full">
                        <span className="hs-input-group-text min-w-[90px]">Desde</span>
                        <input
                            type="date"
                            className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            value={desde}
                            onChange={e => setDesde(e.target.value)}
                        />
                    </div>
                    {/* Hasta */}
                    <div className="hs-input-group w-full">
                        <span className="hs-input-group-text min-w-[90px]">Hasta</span>
                        <input
                            type="date"
                            className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            value={hasta}
                            onChange={e => setHasta(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-center items-end w-full mt-2 mb-2">
                    <button
                        type="button"
                        className="btn-success w-full sm:w-auto min-w-[120px] max-w-full px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                        style={{ margin: '0 auto', display: 'block' }}
                    >
                        Guardar Excel
                    </button>
                </div>
            </div>
            {/* Footer con mensaje en la esquina inferior izquierda */}
            <div className="modal-span-2 text-sm text-left absolute left-0 bottom-0 mb-2 ml-2">
                Elija la consulta de las cuentas que desee los pagos y el periodo de los pagos.
            </div>
        </div>
    );
};

export default PaymentsContent;
