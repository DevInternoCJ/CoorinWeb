// src/hu/dashboard/sideBar/processes/accionamientos/ModalAccionamientosTabs.jsx

// Importar componentes de información (adaptados de ModalCicle.jsx)
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
        setForceRender(1);
    }, []);

    const handleConsultar = () => {
        console.log('Consultando:', { cartera, consulta, acercamiento, fechaDesde, fechaHasta, tipoInforme });
    };

    return (
        <div className="p-6 space-y-4">
            {/* Primera fila: Selects Cartera, Consulta y Acercamiento (si Detalles) - oculto en lg */}
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

            {/* Segunda fila: Layout flex para lg (selects, fechas y radiobuttons verticales), grid para xl y 2xl (fechas y radiobuttons) */}
            <div className="hidden lg:flex lg:gap-4 lg:items-start">
                <div className="flex-1 space-y-4">
                    {/* Selects para lg */}
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

                    {/* Fechas */}
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

                {/* Radio buttons verticales */}
                <div className="flex flex-col justify-start pt-2">
                    <TipoInformeRadios tipoInforme={tipoInforme} setTipoInforme={setTipoInforme} layout="vertical" key={forceRender} />
                </div>
            </div>

            {/* Tercera fila: Fechas para lg, md y sm (centrados y abarcando ancho) */}
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

            {/* Cuarta fila: Radio buttons para lg, md y sm (centrados y abarcando ancho) */}
            <div className="lg:hidden">
                <TipoInformeRadios tipoInforme={tipoInforme} setTipoInforme={setTipoInforme} layout="vertical" key={forceRender} />
            </div>

            {/* Tercera fila: Botón Consultar */}
            <div className="flex justify-center mt-12">
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

const CargaContent = () => (
    <div>
    </div>
);

const CapturaContent = () => (
    <div>
    </div>
);

const ConsultaContent = () => (
    <div>
    </div>
);

// Identificadores para los componentes (basados en ModalCicle.jsx)
const COMPONENT_KEYS = {
    INFORME: "Informe",
    CARGA: "Carga",
    CAPTURA: "Captura",
    CONSULTA: "Consulta",
};

// Iconos para cada componente (usa iconos de Heroicons o similares)
const COMPONENT_ICONS = {
    [COMPONENT_KEYS.INFORME]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-4 h-4">
            <path fill="currentColor" d="M16 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8zM7 7h5v2H7zm10 10H7v-2h10zm0-4H7v-2h10zm-2-4V5l4 4z" />
        </svg>
    ),
    [COMPONENT_KEYS.CARGA]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-4 h-4">
            <path fill="currentColor" d="M22 5v2h-3v3h-2V7h-3V5h3V2h2v3zm-3 14H5V5h6V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6h-2zm-4-6v4h2v-4zm-4 4h2V9h-2zm-2 0v-6H7v6z" />
        </svg>
    ),
    [COMPONENT_KEYS.CAPTURA]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-4 h-4">
            <path fill="currentColor" d="M7 14H5v5h5v-2H7zm-2-4h2V7h3V5H5zm12 7h-3v2h5v-5h-2zM14 5v2h3v3h2V5z" />
        </svg>
    ),
    [COMPONENT_KEYS.CONSULTA]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-4 h-4">
            <path fill="currentColor" d="M7 9H2V7h5zm0 3H2v2h5zm13.59 7l-3.83-3.83c-.8.52-1.74.83-2.76.83c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L22 17.59zM17 11c0-1.65-1.35-3-3-3s-3 1.35-3 3s1.35 3 3 3s3-1.35 3-3M2 19h10v-2H2z" />
        </svg>
    ),
};

// Lista de tabs para Accionamientos
export const tabsListAccionamientos = [
    { key: COMPONENT_KEYS.INFORME, component: InformeContent },
    { key: COMPONENT_KEYS.CARGA, component: CargaContent },
    { key: COMPONENT_KEYS.CAPTURA, component: CapturaContent },
    { key: COMPONENT_KEYS.CONSULTA, component: ConsultaContent },
];

// Exportar iconos para uso externo
export { COMPONENT_ICONS as COMPONENT_ICONS_ACCIONAMIENTOS };
