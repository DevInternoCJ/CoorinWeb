import React, { useState, useEffect } from 'react';

const CapturaContent = () => {
    const [cartera, setCartera] = useState('');
    const [cuenta, setCuenta] = useState('');
    const [expediente, setExpediente] = useState(false);
    const [direccion, setDireccion] = useState('');
    const [envio, setEnvio] = useState('');
    const [devuelto, setDevuelto] = useState('');
    const [causaDevolucion, setCausaDevolucion] = useState('');

    useEffect(() => {
        // Lógica adicional si es necesaria
    }, []);

    return (
        <div className="p-6 flex flex-col h-full space-y-4">
            {/* Row 1: Select Cartera, Input Cuenta, Checkbox Expediente */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-">
                <div className="relative flex-1">
                    <select
                        value={cartera}
                        onChange={(e) => setCartera(e.target.value)}
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="cartera-captura-select"
                    >
                        <option value="" disabled hidden></option>
                        <option value="cartera1">Cartera 1</option>
                        <option value="cartera2">Cartera 2</option>
                        <option value="cartera3">Cartera 3</option>
                    </select>
                    <label
                        htmlFor="cartera-captura-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Cartera
                    </label>
                </div>
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={cuenta}
                        onChange={(e) => setCuenta(e.target.value)}
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="cuenta-input"
                        placeholder=" "
                    />
                    <label
                        htmlFor="cuenta-input"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-sm peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        {expediente ? "Expediente" : "Cuenta"}
                    </label>
                </div>
                <div className="flex items-center self-center">
                    <input
                        type="checkbox"
                        checked={expediente}
                        onChange={(e) => setExpediente(e.target.checked)}
                        className="w-4 h-4 text-jerarquia1 bg-gray-100 border-gray-300 rounded focus:ring-jerarquia1 focus:ring-2"
                        id="expediente-checkbox"
                    />
                    <label
                        htmlFor="expediente-checkbox"
                        className="ml-2 text-sm font-medium text-gray-900"
                    >
                        Expediente
                    </label>
                </div>
            </div>

            {/* Row 2: Select Dirección y Input Nombre (solo lectura) */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                <div className="relative flex-1">
                    <select
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="direccion-select"
                    >
                        <option value="" disabled hidden></option>
                        <option value="direccion1">Dirección 1</option>
                        <option value="direccion2">Dirección 2</option>
                        <option value="direccion3">Dirección 3</option>
                    </select>
                    <label
                        htmlFor="direccion-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Dirección
                    </label>
                </div>
                <div className="relative flex-1">
                    <input
                        type="text"
                        value="Juan Maradonio Uriel Pascual Montes."
                        readOnly
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="nombre-input"
                        placeholder=" "
                    />
                    <label
                        htmlFor="nombre-input"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-sm peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Nombre
                    </label>
                </div>
            </div>

            {/* Row 3: Calendario Envio y calendario Devuelto + select Causa devolucion */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                <div className="relative flex-1">
                    <input
                        type="date"
                        value={envio}
                        onChange={(e) => setEnvio(e.target.value)}
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="envio-date"
                        placeholder=" "
                    />
                    <label
                        htmlFor="envio-date"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                        Envío
                    </label>
                </div>
                <div className="relative flex-1">
                    <input
                        type="date"
                        value={devuelto}
                        onChange={(e) => setDevuelto(e.target.value)}
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="devuelto-date"
                        placeholder=" "
                    />
                    <label
                        htmlFor="devuelto-date"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                        Devuelto
                    </label>
                </div>
                <div className="relative flex-1 sm:hidden md:hidden lg:flex">
                    <select
                        value={causaDevolucion}
                        onChange={(e) => setCausaDevolucion(e.target.value)}
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="causa-devolucion-select"
                    >
                        <option value="" disabled hidden></option>
                        <option value="causa1">Causa 1</option>
                        <option value="causa2">Causa 2</option>
                        <option value="causa3">Causa 3</option>
                    </select>
                    <label
                        htmlFor="causa-devolucion-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Causa Devolución
                    </label>
                </div>
            </div>

            {/* Row 4: Select Causa Devolución y Botón Captura */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 sm:items-stretch lg:justify-center">
                <div className="relative flex-1 lg:hidden">
                    <select
                        value={causaDevolucion}
                        onChange={(e) => setCausaDevolucion(e.target.value)}
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="causa-devolucion-select-row4"
                    >
                        <option value="" disabled hidden></option>
                        <option value="causa1">Causa 1</option>
                        <option value="causa2">Causa 2</option>
                        <option value="causa3">Causa 3</option>
                    </select>
                    <label
                        htmlFor="causa-devolucion-select-row4"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Causa Devolución
                    </label>
                </div>
                <button
                    onClick={() => console.log('Captura')}
                    className="btn-success w-full sm:flex-1 md:flex-1 lg:w-auto lg:flex-none lg:min-w-[120px] sm:h-full md:h-full px-4 py-2.5 lg:py-2.5 text-base font-medium rounded-lg shadow-sm flex justify-center items-center sm:self-center md:self-center"
                >
                    Captura
                </button>
                
            </div>
        </div>
    );
};

export default CapturaContent;