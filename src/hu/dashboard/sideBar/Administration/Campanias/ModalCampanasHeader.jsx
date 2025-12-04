import React, { useState } from "react";
import logoCoorin from "../../../../../assets/logo_coorin_7.svg";

const ModalCampanasHeader = ({ onClose }) => {
    const [cartera, setCartera] = useState("");
    const [producto, setProducto] = useState("amex");
    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-center mb-2 w-full gap-2 lg:gap-4">
            {/* Fila superior en móvil: Título y botón cerrar */}
            <div className="flex items-center justify-between w-full lg:w-auto gap-2">
                <div className="flex items-center gap-2">
                    <span className="modal-title-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                        </svg>
                    </span>
                    <h2 className="modal-title text-sm sm:text-base lg:text-lg">Campañas - Coorin</h2>
                </div>
                {/* Botón cerrar visible en móvil junto al título */}
                <button
                    onClick={onClose}
                    className="modal-btn modal-btn-close lg:hidden"
                    aria-label="Cerrar"
                    style={{ fontSize: '1.5rem' }}
                >
                    &times;
                </button>
            </div>
            {/* Elementos centrados: logo y dropdowns - grid responsivo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 lg:gap-4 flex-1 w-full lg:w-auto items-center">
                <div className="hidden sm:flex justify-center">
                    <img src={logoCoorin} alt="Logo Coorin" style={{ height: 36 }} />
                </div>
                <div className="relative w-full">
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={cartera}
                        onChange={e => setCartera(e.target.value)}
                        id="cartera-select"
                    >
                        <option value="american_express">-American Express</option>
                    </select>
                    <label
                        htmlFor="cartera-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Cartera
                    </label>
                </div>
                <div className="relative w-full">
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={producto}
                        onChange={e => setProducto(e.target.value)}
                        id="producto-select"
                    >
                        <option value="amex">Amex</option>
                    </select>
                    <label
                        htmlFor="producto-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Producto
                    </label>
                </div>
            </div>
            {/* Botón de cerrar solo visible en desktop */}
            <button
                onClick={onClose}
                className="modal-btn modal-btn-close hidden lg:block ml-auto"
                aria-label="Cerrar"
                style={{ fontSize: '2rem' }}
            >
                &times;
            </button>
        </div>
    );
};

export default ModalCampanasHeader;