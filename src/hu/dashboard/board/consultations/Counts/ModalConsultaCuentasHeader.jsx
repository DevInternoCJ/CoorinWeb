import React, { useState } from "react";
import { IconCuentas } from "../IconesConsultations";

// Flecha tipo chevron moderna
const DropdownArrow = () => (
    <span
        style={{
            pointerEvents: "none",
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "1.15rem",
            color: "#2b463c",
            display: "flex",
            alignItems: "center"
        }}
    >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M6 8l4 4 4-4" stroke="#2b463c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </span>
);

const ModalConsultaCuentasHeader = ({ onClose }) => {
    const [cartera, setCartera] = useState("american_express");
    const [producto, setProducto] = useState("amex");
    const [consulta, setConsulta] = useState("");

    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-2 w-full">
            {/* Título */}
            <h2 className="modal-title whitespace-nowrap lg:flex-shrink-0">
                <IconCuentas className="modal-title-icon" />
                Consulta cuentas
            </h2>
            
            {/* Grid de selects - 3 columnas en móvil/tablet, fila horizontal en desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-row gap-2 sm:gap-3 lg:gap-4 flex-1">
                {/* Cartera */}
                <div className="relative w-full lg:flex-1">
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none
                            focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={cartera}
                        onChange={(e) => setCartera(e.target.value)}
                        id="cartera-select"
                    >
                        <option value="" disabled hidden></option>
                        <option value="american_express">American Express</option>
                        <option value="hsbc">HSBC</option>
                        <option value="santander">Santander</option>
                    </select>
                    <label
                        htmlFor="cartera-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                            peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
                            peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Cartera
                    </label>
                </div>
                
                {/* Producto */}
                <div className="relative w-full lg:flex-1">
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none
                            focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={producto}
                        onChange={(e) => setProducto(e.target.value)}
                        id="producto-select"
                    >
                        <option value="" disabled hidden></option>
                        <option value="amex">Amex</option>
                        <option value="visa">Visa</option>
                        <option value="mastercard">Mastercard</option>
                    </select>
                    <label
                        htmlFor="producto-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                            peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
                            peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Producto
                    </label>
                </div>
                
                {/* Consulta */}
                <div className="relative w-full lg:flex-1">
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none
                            focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={consulta}
                        onChange={(e) => setConsulta(e.target.value)}
                        id="consulta-select"
                    >
                        <option value="" disabled hidden></option>
                        <option value="general">General</option>
                        <option value="detalle">Detalle</option>
                    </select>
                    <label
                        htmlFor="consulta-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                            peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
                            peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Consulta
                    </label>
                </div>
            </div>
            
            {/* Botón de cierre */}
            <button
                onClick={onClose}
                className="modal-btn modal-btn-close self-end lg:self-auto lg:flex-shrink-0"
                aria-label="Cerrar"
            >
                &times;
            </button>
        </div>
    );
};

export default ModalConsultaCuentasHeader;