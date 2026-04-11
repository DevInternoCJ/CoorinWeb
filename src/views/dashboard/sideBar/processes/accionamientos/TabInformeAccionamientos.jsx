import React, { useState, useEffect } from 'react';
import FloatingSelect from "../../../../../components/Select/FloatingSelect";

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
        <div className="p-6 flex flex-col h-full space-y-6">
            {/* Versión móvil */}
            <div className="lg:hidden space-y-4 mt-2">
                {/* Radio buttons móviles */}
                <TipoInformeRadios tipoInforme={tipoInforme} setTipoInforme={setTipoInforme} layout="vertical" key={forceRender} />
                <div className="w-full">
                    <FloatingSelect
                        id="cartera-select"
                        label="Cartera"
                        value={cartera}
                        onChange={(e) => setCartera(e.target.value)}
                        options={[
                            { value: "cartera1", label: "Cartera 1" },
                            { value: "cartera2", label: "Cartera 2" },
                            { value: "cartera3", label: "Cartera 3" },
                        ]}
                    />
                </div>
                <div className="w-full">
                    <FloatingSelect
                        id="consulta-select"
                        label="Consulta"
                        value={consulta}
                        onChange={(e) => setConsulta(e.target.value)}
                        options={[
                            { value: "consulta1", label: "Consulta 1" },
                            { value: "consulta2", label: "Consulta 2" },
                            { value: "consulta3", label: "Consulta 3" },
                        ]}
                    />
                </div>
                {tipoInforme === 'Detalles' && (
                    <div className="w-full">
                        <FloatingSelect
                            id="acercamiento-select"
                            label="Acercamiento"
                            value={acercamiento}
                            onChange={(e) => setAcercamiento(e.target.value)}
                            options={[
                                { value: "acercamiento1", label: "Acercamiento 1" },
                                { value: "acercamiento2", label: "Acercamiento 2" },
                                { value: "acercamiento3", label: "Acercamiento 3" },
                            ]}
                        />
                    </div>
                )}
            </div>

            {/* Versión desktop */}
            <div className="hidden lg:block space-y-6">
                <TipoInformeRadios tipoInforme={tipoInforme} setTipoInforme={setTipoInforme} layout="horizontal" key={forceRender} />
                <div className="space-y-2 mt-8">
                    <div className={`grid ${tipoInforme === 'Detalles' ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
                        <div className="w-full">
                            <FloatingSelect
                                id="cartera-select-lg"
                                label="Cartera"
                                value={cartera}
                                onChange={(e) => setCartera(e.target.value)}
                                options={[
                                    { value: "cartera1", label: "Cartera 1" },
                                    { value: "cartera2", label: "Cartera 2" },
                                    { value: "cartera3", label: "Cartera 3" },
                                ]}
                            />
                        </div>
                        <div className="w-full">
                            <FloatingSelect
                                id="consulta-select-lg"
                                label="Consulta"
                                value={consulta}
                                onChange={(e) => setConsulta(e.target.value)}
                                options={[
                                    { value: "consulta1", label: "Consulta 1" },
                                    { value: "consulta2", label: "Consulta 2" },
                                    { value: "consulta3", label: "Consulta 3" },
                                ]}
                            />
                        </div>
                        {tipoInforme === 'Detalles' && (
                            <div className="w-full">
                                <FloatingSelect
                                    id="acercamiento-select-lg"
                                    label="Acercamiento"
                                    value={acercamiento}
                                    onChange={(e) => setAcercamiento(e.target.value)}
                                    options={[
                                        { value: "acercamiento1", label: "Acercamiento 1" },
                                        { value: "acercamiento2", label: "Acercamiento 2" },
                                        { value: "acercamiento3", label: "Acercamiento 3" },
                                    ]}
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4 items-end">
                        <div className="relative flex-1">
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
                        <div className="relative flex-1">
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
                        <div className="flex items-center">
                            <button
                                onClick={handleConsultar}
                                className="btn-success w-full lg:w-auto lg:min-w-[120px] px-4 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                            >
                                Consultar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fechas móviles */}
            <div className="lg:hidden">
                <div className="w-full mb-4">
                    <div className="relative">
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
                </div>
                <div className="w-full mb-4">
                    <div className="relative">
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
                <div className="w-full">
                    <button
                        onClick={handleConsultar}
                        className="btn-success w-full px-4 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                    >
                        Consultar
                    </button>
                </div>
            </div>


        </div>
    );
};

export default InformeContent;