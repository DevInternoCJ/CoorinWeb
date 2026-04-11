// src/hu/dashboard/sideBar/processes/accionamientos/TabConsultaAccionamientos.jsx

import React, { useState, useEffect } from 'react';
import FloatingSelect from "../../../../../components/Select/FloatingSelect";

const ConsultaContent = () => {
    const [cartera, setCartera] = useState('');
    const [consulta, setConsulta] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [carterasOptions, setCarterasOptions] = useState([]);
    const [consultasOptions, setConsultasOptions] = useState([]);
    const [loadingConsultas, setLoadingConsultas] = useState(false);
    const [errorConsultas, setErrorConsultas] = useState(null);

    // Obtener datos del usuario desde localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    const idCartera = userData?.idCartera || 0;
    const idProducto = userData?.idProducto ?? 0;
    const jerarquia = userData?.Jerarquía ?? 0;
    const idEjecutivo = userData?.idEjecutivo ?? null;

    // useEffect para cargar carteras
    useEffect(() => {
        // Lógica para cargar carteras (adaptar según tu API)
        // Ejemplo: fetch('/api/carteras').then(res => res.json()).then(setCarterasOptions);
        setCarterasOptions([
            { value: '1', label: 'Cartera 1' },
            { value: '2', label: 'Cartera 2' },
            // Agregar más opciones según sea necesario
        ]);
    }, []);

    // useEffect para cargar consultas basadas en cartera seleccionada
    useEffect(() => {
        if (cartera) {
            setLoadingConsultas(true);
            setErrorConsultas(null);
            // Lógica para cargar consultas (adaptar según tu API)
            // Ejemplo: fetch(`/api/consultas?cartera=${cartera}`).then(res => res.json()).then(setConsultasOptions).catch(setErrorConsultas);
            setConsultasOptions([
                { value: 'consulta1', label: 'Consulta 1' },
                { value: 'consulta2', label: 'Consulta 2' },
                // Agregar más opciones según sea necesario
            ]);
            setLoadingConsultas(false);
        } else {
            setConsultasOptions([]);
        }
    }, [cartera]);

    const handleGuardarExcel = () => {
        // Lógica para guardar Excel (adaptar según tu implementación)
        console.log('Guardando Excel con:', { cartera, consulta, fechaDesde, fechaHasta });
        // Ejemplo: exportToExcel(data);
    };

    return (
        <div className="p-6 flex flex-col h-full space-y-4">
            {/* Row 1: Select Cartera y Select Consulta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full">
                    <FloatingSelect
                        id="cartera-select"
                        label="Cartera"
                        value={cartera}
                        onChange={(e) => setCartera(e.target.value)}
                        options={carterasOptions}
                    />
                </div>
                <div className="w-full">
                    <FloatingSelect
                        id="consulta-select"
                        label="Consulta"
                        value={consulta}
                        onChange={(e) => setConsulta(e.target.value)}
                        options={consultasOptions}
                        disabled={!cartera || loadingConsultas}
                    />
                    {loadingConsultas && <p className="text-sm text-[var(--color-text-muted)] mt-0.5">Cargando consultas...</p>}
                    {errorConsultas && <p className="text-sm text-[var(--color-error,#b71c1c)] mt-0.5">Error al cargar consultas</p>}
                </div>
            </div>

            {/* Row 2: Calendarios Desde y Hasta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative w-full">
                    <input
                        type="date"
                        value={fechaDesde}
                        onChange={(e) => setFechaDesde(e.target.value)}
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="fecha-desde"
                        placeholder=" "
                    />
                    <label
                        htmlFor="fecha-desde"
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
                        id="fecha-hasta"
                        placeholder=" "
                    />
                    <label
                        htmlFor="fecha-hasta"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                        Hasta
                    </label>
                </div>
            </div>

            {/* Row 3: Botón Guardar Excel */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleGuardarExcel}
                    className="btn-success w-full md:w-full lg:w-auto lg:min-w-[120px] px-4 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                >
                    Guardar Excel
                </button>
            </div>
        </div>
    );
};

export default ConsultaContent;