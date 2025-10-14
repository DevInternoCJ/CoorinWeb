import React, { useState } from "react";
import ConsorcioLogo from "../../../../../assets/logo_coorin_7.svg";

const WrongsContent = () => {
    const [buscado, setBuscado] = useState(false);

    return (
        <div style={{ width: '100%', height: '100%' }} className="flex flex-col items-center min-h-[400px]">
            {/* Logo centrado arriba de los campos */}
            <div className="flex flex-col items-center w-full mb-2">
                <img src={ConsorcioLogo} alt="Logo Coorin" className="h-20 w-20 object-contain mx-auto" />
            </div>
            {/* Contenedor centralizado para los campos y botones */}
            <div className="flex flex-col items-center w-full" style={{ flex: 1 }}>
                <div className="flex gap-3 mb-3 w-full max-w-xs justify-center">
                    <div className="hs-input-group w-full">
                        <span className="hs-input-group-text min-w-[90px]">Desde</span>
                        <input
                            type="date"
                            className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            defaultValue={new Date().toISOString().slice(0, 10)}
                        />
                    </div>
                    <div className="hs-input-group w-full">
                        <span className="hs-input-group-text min-w-[90px]">Hasta</span>
                        <input
                            type="date"
                            className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            defaultValue={new Date().toISOString().slice(0, 10)}
                        />
                    </div>
                </div>
                {/* Dropdown Datos Erróneos */}
                <div className="relative w-full max-w-xs mb-3">
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        defaultValue=""
                        id="datos-erroneos-select"
                    >
                        <option value="">--Todos--</option>
                        <option value="telefono">Teléfono</option>
                        <option value="correo">Correo</option>
                        <option value="domicilio">Domicilio</option>
                    </select>
                    <label
                        htmlFor="datos-erroneos-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Datos Erróneos
                    </label>
                </div>
                <div className="flex gap-3 w-full max-w-xs justify-center">
                    <button
                        type="button"
                        className="btn-success w-full sm:w-auto min-w-[120px] max-w-full px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                        style={{ margin: '0 auto', display: 'block' }}
                        onClick={() => setBuscado(true)}
                    >
                        Buscar
                    </button>
                </div>
            </div>
            {/* Área de resultados debajo, pegada al botón Buscar */}
            <div style={{ width: '100%', minHeight: 120, background: '#f8f8f8', borderRadius: 8, border: '1px solid #e0e0e0', marginTop: 0, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {buscado && (
                    <span className="modal-span-2" style={{ color: '#888', fontSize: 16, textAlign: 'center', padding: 16 }}>
                        No se cuenta con datos reportados como erróneos de la cartera seleccionada.
                    </span>
                )}
            </div>
        </div>
    );
};

export default WrongsContent;
