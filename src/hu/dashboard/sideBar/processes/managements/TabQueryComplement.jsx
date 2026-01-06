// consulta complemento
import React, { useState } from 'react';

const TabQueryComplement = () => {
    const [desde, setDesde] = useState('');
    const [hasta, setHasta] = useState('');
    const [cartera, setCartera] = useState('');

    const handleGuardarExcel = () => {
        console.log('Guardar Excel');
    };

    return (
        <div className="p-6 md:pt-25 flex flex-col h-full space-y-4 sm:space-y-8">
            
            {/* Row 1: Calendario Desde y Select Cartera */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                <div className="relative flex-1 order-2 sm:order-1">
                    <input
                        type="date"
                        value={desde}
                        onChange={(e) => setDesde(e.target.value)}
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="desde-date"
                        placeholder=" "
                    />
                    <label
                        htmlFor="desde-date"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                        Desde
                    </label>
                </div>

                <div className="relative flex-1 order-1 sm:order-2">
                    <select
                        value={cartera}
                        onChange={(e) => setCartera(e.target.value)}
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="cartera-select"
                    >
                        <option value="" disabled hidden></option>
                        <option value="cartera1">Cartera 1</option>
                        <option value="cartera2">Cartera 2</option>
                        <option value="cartera3">Cartera 3</option>
                    </select>
                    <label
                        htmlFor="cartera-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Cartera
                    </label>
                </div>
            </div>

            {/* Row 2: Calendario Hasta y Botón Guardar Excel */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 sm:items-center">
                <div className="relative flex-1">
                    <input
                        type="date"
                        value={hasta}
                        onChange={(e) => setHasta(e.target.value)}
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="hasta-date"
                        placeholder=" "
                    />
                    <label
                        htmlFor="hasta-date"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                        Hasta
                    </label>
                </div>

                <button
                    onClick={handleGuardarExcel}
                    className="btn-success w-full sm:flex-1 px-4 py-4 text-base font-medium rounded-lg shadow-sm flex justify-center items-center sm:h-full"
                >
                    Guardar Excel
                </button>
            </div>
        </div>
    );
};

export default TabQueryComplement;