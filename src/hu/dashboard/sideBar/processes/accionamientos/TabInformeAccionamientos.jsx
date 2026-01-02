import React, { useState, useEffect } from 'react';

// Componente para los radio buttons de tipo de informe
const TipoInformeRadios = ({ tipoInforme, setTipoInforme, layout = 'horizontal' }) => {
    const options = [
        { value: 'Accionamientos', label: 'Accionamientos' },
        { value: 'Cuentas', label: 'Cuentas' },
        { value: 'Detalles', label: 'Detalles' }
    ];

    const containerClass = layout === 'horizontal' 
        ? 'flex items-center justify-center space-x-4 w-full'
        : 'md:flex md:flex-col md:space-y-4 lg:flex lg:justify-center lg:space-x-4 w-full';

    return (
        <div className={containerClass}>
            {options.map(option => (
                <label key={option.value} className="flex items-center">
                    <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center mr-2">
                        <div className={`w-2 h-2 bg-jerarquia3 rounded-full ${tipoInforme === option.value ? 'opacity-100' : 'opacity-0'}`}></div>
                    </div>
                    <input
                        type="radio"
                        name="tipoInforme"
                        value={option.value}
                        checked={tipoInforme === option.value}
                        onChange={(e) => setTipoInforme(e.target.value)}
                        className="sr-only"
                    />
                    <span className={`text-sm ${tipoInforme === option.value ? 'text-jerarquia3 font-semibold' : 'text-gray-700'}`}>
                        {option.label}
                    </span>
                </label>
            ))}
        </div>
    );
};

// Componente principal para el contenido del informe
const InformeContent = () => {
    const [cartera, setCartera] = useState('');
    const [consulta, setConsulta] = useState('');
    const [acercamiento, setAcercamiento] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [tipoInforme, setTipoInforme] = useState('Accionamientos');
    const [forceRender, setForceRender] = useState(0);

    useEffect(() => {
        // Lógica adicional si es necesaria
    }, []);

    const handleConsultar = () => {
        // Lógica para consultar
        console.log('Consultar informe');
    };

    return (
        <div className="p-6 flex flex-col h-full space-y-4">
            {/* Versión móvil */}
            <div className="lg:hidden space-y-4 mt-2">
                <div className="relative w-full">
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
                <div className="relative w-full">
                    <select
                        value={consulta}
                        onChange={(e) => setConsulta(e.target.value)}
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="consulta-select"
                    >
                        <option value="" disabled hidden></option>
                        <option value="consulta1">Consulta 1</option>
                        <option value="consulta2">Consulta 2</option>
                        <option value="consulta3">Consulta 3</option>
                    </select>
                    <label
                        htmlFor="consulta-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Consulta
                    </label>
                </div>
                {tipoInforme === 'Detalles' && (
                    <div className="relative w-full">
                        <select
                            value={acercamiento}
                            onChange={(e) => setAcercamiento(e.target.value)}
                            className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                            id="acercamiento-select"
                        >
                            <option value="" disabled hidden></option>
                            <option value="acercamiento1">Acercamiento 1</option>
                            <option value="acercamiento2">Acercamiento 2</option>
                            <option value="acercamiento3">Acercamiento 3</option>
                        </select>
                        <label
                            htmlFor="acercamiento-select"
                            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                        >
                            Acercamiento
                        </label>
                    </div>
                )}
            </div>

            {/* Versión desktop */}
            <div className="hidden lg:flex lg:gap-4 lg:items-start">
                <div className="flex-1 space-y-4">
                    <div className={`grid ${tipoInforme === 'Detalles' ? 'grid-cols-3' : 'grid-cols-2'} gap-4 mt-2`}>
                        <div className="relative w-full">
                            <select
                                value={cartera}
                                onChange={(e) => setCartera(e.target.value)}
                                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                id="cartera-select-lg"
                            >
                                <option value="" disabled hidden></option>
                                <option value="cartera1">Cartera 1</option>
                                <option value="cartera2">Cartera 2</option>
                                <option value="cartera3">Cartera 3</option>
                            </select>
                            <label
                                htmlFor="cartera-select-lg"
                                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                            >
                                Cartera
                            </label>
                        </div>
                        <div className="relative w-full">
                            <select
                                value={consulta}
                                onChange={(e) => setConsulta(e.target.value)}
                                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                id="consulta-select-lg"
                            >
                                <option value="" disabled hidden></option>
                                <option value="consulta1">Consulta 1</option>
                                <option value="consulta2">Consulta 2</option>
                                <option value="consulta3">Consulta 3</option>
                            </select>
                            <label
                                htmlFor="consulta-select-lg"
                                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                            >
                                Consulta
                            </label>
                        </div>
                        {tipoInforme === 'Detalles' && (
                            <div className="relative w-full">
                                <select
                                    value={acercamiento}
                                    onChange={(e) => setAcercamiento(e.target.value)}
                                    className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                    id="acercamiento-select-lg"
                                >
                                    <option value="" disabled hidden></option>
                                    <option value="acercamiento1">Acercamiento 1</option>
                                    <option value="acercamiento2">Acercamiento 2</option>
                                    <option value="acercamiento3">Acercamiento 3</option>
                                </select>
                                <label
                                    htmlFor="acercamiento-select-lg"
                                    className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                                >
                                    Acercamiento
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative w-full">
                            <input
                                type="date"
                                value={fechaDesde}
                                onChange={(e) => setFechaDesde(e.target.value)}
                                className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                id="fecha-desde-lg"
                                placeholder=" "
                            />
                            <label
                                htmlFor="fecha-desde-lg"
                                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
                            >
                                Desde
                            </label>
                        </div>
                        <div className="relative w-full">
                            <input
                                type="date"
                                value={fechaHasta}
                                onChange={(e) => setFechaHasta(e.target.value)}
                                className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                id="fecha-hasta-lg"
                                placeholder=" "
                            />
                            <label
                                htmlFor="fecha-hasta-lg"
                                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
                            >
                                Hasta
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-start pt-2">
                    <TipoInformeRadios tipoInforme={tipoInforme} setTipoInforme={setTipoInforme} layout="vertical" key={forceRender} />
                </div>
            </div>

            {/* Fechas móviles */}
            <div className="lg:hidden">
                <div className="md:flex md:flex-col md:space-y-4 lg:flex lg:justify-center lg:space-x-4 w-full">
                    <div className="relative w-full">
                        <input
                            type="date"
                            value={fechaDesde}
                            onChange={(e) => setFechaDesde(e.target.value)}
                            className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                            id="fecha-desde-sm"
                            placeholder=" "
                        />
                        <label
                            htmlFor="fecha-desde-sm"
                            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
                        >
                            Desde
                        </label>
                    </div>
                    <div className="relative w-full">
                        <input
                            type="date"
                            value={fechaHasta}
                            onChange={(e) => setFechaHasta(e.target.value)}
                            className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                            id="fecha-hasta-sm"
                            placeholder=" "
                        />
                        <label
                            htmlFor="fecha-hasta-sm"
                            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
                        >
                            Hasta
                        </label>
                    </div>
                </div>
            </div>

            {/* Radio buttons móviles */}
            <div className="lg:hidden">
                <TipoInformeRadios tipoInforme={tipoInforme} setTipoInforme={setTipoInforme} layout="vertical" key={forceRender} />
            </div>

            {/* Botón Consultar */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleConsultar}
                    className="btn-success w-full md:w-full lg:w-auto lg:min-w-[120px] px-4 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                >
                    Consultar
                </button>
            </div>
        </div>
    );
};

export default InformeContent;