import React, { useState, useEffect } from 'react';

// Componente para los radio buttons de tipo de carga
const TipoCargaRadios = ({ tipoCarga, setTipoCarga }) => {
    const options = [
        { value: 'Carga', label: 'Carga' },
        { value: 'Consulta', label: 'Consulta' }
    ];

    return (
        <div className="flex items-center space-x-4">
            {options.map(option => (
                <label key={option.value} className="flex items-center">
                    <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center mr-2">
                        <div className={`w-2 h-2 bg-jerarquia3 rounded-full ${tipoCarga === option.value ? 'opacity-100' : 'opacity-0'}`}></div>
                    </div>
                    <input
                        type="radio"
                        name="tipoCarga"
                        value={option.value}
                        checked={tipoCarga === option.value}
                        onChange={(e) => setTipoCarga(e.target.value)}
                        className="sr-only"
                    />
                    <span className={`text-sm ${tipoCarga === option.value ? 'text-jerarquia3 font-semibold' : 'text-gray-700'}`}>
                        {option.label}
                    </span>
                </label>
            ))}
        </div>
    );
};

const CargaContent = ({ setMostrarTabla } = {}) => {
    const [tipoCarga, setTipoCarga] = useState('Carga');
    const [acercamiento, setAcercamiento] = useState('');
    const [fecha, setFecha] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [archivoNombre, setArchivoNombre] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    // Función para truncar el path del archivo si es demasiado largo, asegurando que el nombre del archivo se vea completo al final
    const truncatePath = (fullPath, maxLength = 100) => {
        const fileName = fullPath.split('\\').pop() || fullPath.split('/').pop();
        const pathWithoutName = fullPath.slice(0, -fileName.length);
        if (fullPath.length <= maxLength) {
            return fullPath;
        }
        const availableLength = maxLength - fileName.length - 3; // 3 for "..."
        if (availableLength <= 0) {
            return "..." + fileName.slice(- (maxLength - 3));
        }
        const truncatedPath = pathWithoutName.slice(-availableLength);
        return "..." + truncatedPath + fileName;
    };

    useEffect(() => {
        if (setMostrarTabla) {
            setMostrarTabla(tipoCarga.toLowerCase());
        }
    }, [tipoCarga, setMostrarTabla]);

    return (
        <div className="p-6 flex flex-col h-full space-y-4">
            {/* Primer row: Select Acercamiento, Radiobuttons Carga/Consulta, Calendarios condicionales */}
            <div className="flex gap-4 items-end flex-wrap pt-4">
                <div className="relative flex-1">
                    <select
                        value={acercamiento}
                        onChange={(e) => setAcercamiento(e.target.value)}
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 disabled:bg-gray-200 disabled:text-gray-500"
                        id="acercamiento-carga-select"
                    >
                        <option value="" disabled hidden></option>
                        <option value="acercamiento1">Acercamiento 1</option>
                        <option value="acercamiento2">Acercamiento 2</option>
                        <option value="acercamiento3">Acercamiento 3</option>
                    </select>
                    <label
                        htmlFor="acercamiento-carga-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Acercamiento
                    </label>
                </div>

                <div className="flex-shrink-0 self-center">
                    <TipoCargaRadios tipoCarga={tipoCarga} setTipoCarga={setTipoCarga} />
                </div>

                {tipoCarga === 'Carga' ? (
                    <div className="relative flex-1">
                        <input
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            disabled={tipoCarga === 'Consulta'}
                            className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 disabled:bg-gray-200 disabled:text-gray-500"
                            id="fecha-carga"
                            placeholder=" "
                        />
                        <label
                            htmlFor="fecha-carga"
                            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
                        >
                            Fecha
                        </label>
                    </div>
                ) : (
                    <div className="flex gap-4 flex-1 items-center">
                        <div className="relative flex-1">
                            <input
                                type="date"
                                value={fechaDesde}
                                onChange={(e) => setFechaDesde(e.target.value)}
                                className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                id="fecha-desde-carga"
                                placeholder=" "
                            />
                            <label
                                htmlFor="fecha-desde-carga"
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
                                id="fecha-hasta-carga"
                                placeholder=" "
                            />
                            <label
                                htmlFor="fecha-hasta-carga"
                                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
                            >
                                Hasta
                            </label>
                        </div>
                        {tipoCarga === 'Consulta' && (
                            <button
                                onClick={() => console.log('Consultar accionamientos')}
                                className="btn-success px-4 py-2.5 text-base font-medium rounded-lg shadow-sm flex justify-center items-center whitespace-nowrap"
                            >
                                Consultar
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Segundo row: Input readonly para archivo seleccionado y botón Archivo */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative w-full sm:flex-1">
                    <input
                        type="text"
                        value={archivoNombre}
                        readOnly
                        disabled={tipoCarga === 'Consulta'}
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 disabled:bg-gray-200 disabled:text-gray-500"
                        id="archivo-seleccionado-input"
                        placeholder=" "
                        style={{ direction: 'rtl', textAlign: 'left' }}
                    />
                    <label
                        htmlFor="archivo-seleccionado-input"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-sm peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        U. Archivo
                    </label>
                </div>

                <input
                    type="file"
                    id="archivo-file-input"
                    className="hidden"
                    disabled={tipoCarga === 'Consulta'}
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const simulatedPath = "C:\\Users\\Alan De La O\\Downloads\\CARÉTA1\\CARPETA2\\CARPETA3\\CARPETA4\\CARETA5\\CARPETA6\\" + file.name;
                            setArchivoNombre(truncatePath(simulatedPath));
                        }
                    }}
                />

                <label
                    htmlFor="archivo-file-input"
                    className={`btn-success w-full sm:w-auto px-4 py-2.5 text-base font-medium rounded-lg shadow-sm flex justify-center items-center whitespace-nowrap ${tipoCarga === 'Consulta' ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
                >
                    Archivo
                </label>
            </div>

            {/* Tercer row: Inputs Nombre y Descripción */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:flex-[1]">
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        disabled={tipoCarga === 'Consulta'}
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 disabled:bg-gray-200 disabled:text-gray-500"
                        id="nombre-input"
                        placeholder=" "
                    />
                    <label
                        htmlFor="nombre-input"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-sm peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Nombre
                    </label>
                </div>

                <div className="relative w-full sm:flex-[2]">
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        disabled={tipoCarga === 'Consulta'}
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 disabled:bg-gray-200 disabled:text-gray-500"
                        id="descripcion-input"
                        placeholder=" "
                    />
                    <label
                        htmlFor="descripcion-input"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-sm peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Descripción
                    </label>
                </div>
            </div>
        </div>
    );
};

export default CargaContent;