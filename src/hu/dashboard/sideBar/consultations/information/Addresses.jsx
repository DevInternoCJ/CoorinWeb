import React, { useState, useEffect } from "react";
import { infoEjecutivo, getAddress } from "../../../../../services/mark/albaz/LokiServices";

const AddressesContent = ({ mostrarTabla }) => {
    // Mensaje de footer dinámico
    const [footerMsg, setFooterMsg] = useState("Elija la consulta de las cuentas que desee los domicilios.");

    // Al abrir el modal (cuando se monta el componente o cambia mostrarTabla a true), mostrar mensaje inicial
    useEffect(() => {
        if (mostrarTabla) {
            setFooterMsg("Elija la consulta de las cuentas que desee los domicilios.");
        }
    }, [mostrarTabla]);
    const [loadingExcel, setLoadingExcel] = useState(false);
    const [errorExcel, setErrorExcel] = useState(null);

    const userData = JSON.parse(localStorage.getItem("userData"));
    const idCartera = userData?.idCartera || 1;
    const idEjecutivo = userData?.idEjecutivo ?? userData?.idejecutivo ?? userData?.ejecutivo ?? null;
    const idProducto = userData?.idProducto ?? userData?.idproducto ?? userData?.producto ?? 1;

    const [cartera, setCartera] = useState(idCartera);
    // Opciones de cartera dinámicas
    const [carterasOptions, setCarterasOptions] = useState([]);
    const [consulta, setConsulta] = useState("");
    const [consultasOptions, setConsultasOptions] = useState([]);
    const [loadingConsultas, setLoadingConsultas] = useState(false);
    const [errorConsultas, setErrorConsultas] = useState(null);


    // Cargar opciones de consulta
    useEffect(() => {
        if (!idEjecutivo) return;
        setLoadingConsultas(true);
        setErrorConsultas(null);
        infoEjecutivo(idEjecutivo)
            .then((data) => {
                // Extraer carteras únicas
                const carterasUnicas = Array.isArray(data)
                    ? Array.from(
                        new Map(
                            data.map(item => [item.idCartera, { id: item.idCartera, nombre: item.NombreCartera || `Cartera ${item.idCartera}` }])
                        ).values()
                    )
                    : [];
                setCarterasOptions(carterasUnicas);
                // Filtrar consultas por cartera e idProducto
                const filtered = Array.isArray(data)
                    ? data.filter(
                        (item) => String(item.idCartera) === String(cartera) && String(item.idProducto) === String(idProducto)
                    )
                    : [];
                setConsultasOptions(filtered);
            })
            .catch(() => {
                setErrorConsultas("Error al cargar las consultas");
                setConsultasOptions([]);
                setCarterasOptions([]);
            })
            .finally(() => setLoadingConsultas(false));
    }, [idEjecutivo, cartera, idProducto]);


    // Handler para exportar domicilios a Excel/CSV
    const handleDownloadExcel = async () => {
    setLoadingExcel(true);
    setErrorExcel(null);
    setFooterMsg("Consulta terminada. Guardando libro de Excell.");
        try {
            // Usar los parámetros actuales
            const idCarteraInt = cartera ? parseInt(cartera, 10) : undefined;
            const idConsultaInt = consulta ? parseInt(consulta, 10) : undefined;
            const response = await getAddress(idCarteraInt, idConsultaInt);
            let data = Array.isArray(response) ? response : (Array.isArray(response?.data) ? response.data : (typeof response === 'object' ? [response] : []));
            if (data.length === 0) throw new Error('No hay datos para exportar.');
            // Obtener headers y loguearlos para revisión
            const headers = Object.keys(data[0]);
            // setHeadersRecibidos(headers); // Ya no se usa para mostrar en pantalla
            console.log('HEADERS RECIBIDOS:', headers);
            // Convertir a CSV asegurando formato correcto
            const rows = data.map(obj => headers.map(h => {
                let value = obj[h];
                // Forzar que cuentas largas se exporten como texto (evitar notación científica)
                if (h.toLowerCase().includes('cuenta')) {
                    if (typeof value === 'number') {
                        value = '\t' + value.toString();
                    } else if (typeof value === 'string') {
                        // Si ya es string, solo anteponer tabulación y quitar comas y comillas
                        value = '\t' + value.replace(/,/g, '').replace(/"/g, '');
                    }
                    return value;
                }
                // Si es string, quitar comas y asegurar codificación UTF-8
                if (typeof value === 'string') {
                    value = value.replace(/,/g, '');
                    // Escapar comillas dobles
                    value = value.replace(/"/g, '""');
                    // Envolver en comillas si contiene caracteres especiales o espacios
                    if (/[^\w\d]/.test(value)) value = '"' + value + '"';
                }
                return value;
            }).join(","));
            // Encabezados en UTF-8
            const csvContent = '\uFEFF' + headers.join(",") + "\n" + rows.join("\n");
            // Descargar como CSV (UTF-8)
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `domicilios_${idCarteraInt}_${idConsultaInt || 'todas'}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setFooterMsg("Libro de Excell Guardado.");
        } catch (err) {
            setErrorExcel('Error al exportar los domicilios.');
            setFooterMsg("Ocurrió un error al guardar el libro de Excell.");
            console.error('Error al exportar los domicilios:', err);
        } finally {
            setLoadingExcel(false);
        }
    };

    return (
        <div style={{ width: '100%' }} className="flex flex-col items-center">
            {/* Layout dinámico según mostrarTabla */}
            {mostrarTabla ? (
                <>
                    {/* Row centrado con logo, cartera y consulta */}
                    <div className="w-full flex justify-center items-center gap-6 mb-4 max-w-5xl">
                        <img src="/logo_coorin_7.svg" alt="Logo Coorin" className="h-20 w-20 object-contain mx-auto" />
                        <div className="relative w-full max-w-xs">
                            <select
                                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                value={cartera}
                                onChange={e => setCartera(e.target.value)}
                                id="cartera-select-addresses-row"
                                disabled={loadingConsultas || carterasOptions.length === 0}
                            >
                                {carterasOptions.length === 0 && <option value="">Cargando...</option>}
                                {carterasOptions.map((item) => (
                                    <option key={item.id} value={item.id}>{item.nombre}</option>
                                ))}
                            </select>
                            <label
                                htmlFor="cartera-select-addresses-row"
                                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                            >
                                Cartera
                            </label>
                        </div>
                        <div className="relative w-full max-w-xs">
                            <select
                                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                value={consulta}
                                onChange={e => setConsulta(e.target.value)}
                                id="consulta-select-addresses-row"
                                disabled={loadingConsultas || errorConsultas}
                            >
                                <option value="">- Todas -</option>
                                {consultasOptions.map((item) => (
                                    <option key={item.idConsulta || item.NombreConsulta} value={item.idConsulta}>
                                        {item.NombreConsulta}
                                    </option>
                                ))}
                            </select>
                            <label
                                htmlFor="consulta-select-addresses-row"
                                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                            >
                                Consulta
                            </label>
                            {loadingConsultas && (
                                <span className="text-xs text-gray-500 absolute right-2 top-2">Cargando...</span>
                            )}
                            {errorConsultas && (
                                <span className="text-xs text-red-500 absolute right-2 top-2">{errorConsultas}</span>
                            )}
                        </div>
                    </div>
                    {/* Botón Guardar Excel centrado debajo */}
                    <div className="flex gap-3 w-full justify-center mb-4">
                        <button
                            type="button"
                            className="btn-success w-full sm:w-auto min-w-[120px] max-w-xs px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                            style={{ margin: '0 auto', display: 'block' }}
                            onClick={handleDownloadExcel}
                            disabled={loadingExcel || !consulta}
                        >
                            {loadingExcel ? "Exportando..." : "Guardar Excel"}
                        </button>
                    </div>
                    {errorExcel && <div className="text-red-500 text-xs text-center mt-1">{errorExcel}</div>}
                </>
            ) : (
                <>
                    <div className="w-full flex justify-center items-center mb-2 mt-2">
                        <img src="/logo_coorin_7.svg" alt="Logo Coorin" className="h-20 w-20 object-contain mx-auto" />
                    </div>
                    <div className="flex flex-col items-center w-full" style={{ marginTop: '1.2rem' }}>
                        <div className="relative w-full max-w-xs" style={{ marginBottom: '0.7rem' }}>
                            <select
                                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                value={cartera}
                                onChange={e => setCartera(e.target.value)}
                                id="cartera-select-addresses"
                                disabled={loadingConsultas || carterasOptions.length === 0}
                            >
                                {carterasOptions.length === 0 && <option value="">Cargando...</option>}
                                {carterasOptions.map((item) => (
                                    <option key={item.id} value={item.id}>{item.nombre}</option>
                                ))}
                            </select>
                            <label
                                htmlFor="cartera-select-addresses"
                                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                            >
                                Cartera
                            </label>
                        </div>
                        <div className="relative w-full max-w-xs" style={{ marginBottom: '0.7rem' }}>
                            <select
                                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                value={consulta}
                                onChange={e => setConsulta(e.target.value)}
                                id="consulta-select-addresses"
                                disabled={loadingConsultas || errorConsultas}
                            >
                                <option value="">- Todas -</option>
                                {consultasOptions.map((item) => (
                                    <option key={item.idConsulta || item.NombreConsulta} value={item.idConsulta}>
                                        {item.NombreConsulta}
                                    </option>
                                ))}
                            </select>
                            <label
                                htmlFor="consulta-select-addresses"
                                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                            >
                                Consulta
                            </label>
                            {loadingConsultas && (
                                <span className="text-xs text-gray-500 absolute right-2 top-2">Cargando...</span>
                            )}
                            {errorConsultas && (
                                <span className="text-xs text-red-500 absolute right-2 top-2">{errorConsultas}</span>
                            )}
                        </div>
                        {/* Botón Guardar Excel centrado debajo */}
                        <div className="flex gap-3 w-full justify-center mb-4">
                            <button
                                type="button"
                                className="btn-success w-full sm:w-auto min-w-[120px] max-w-xs px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center items-center"
                                style={{ margin: '0 auto', display: 'block' }}
                                onClick={handleDownloadExcel}
                                disabled={loadingExcel || !consulta}
                            >
                                {loadingExcel
                                    ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                        </svg>
                                    )
                                    : "Guardar Excel"
                                }
                            </button>
                        </div>
                        {errorExcel && <div className="text-red-500 text-xs text-center mt-1">{errorExcel}</div>}
                    </div>
                </>
            )}

            {/* Footer con mensaje dinámico */}
            <div className="w-full flex justify-center items-center" style={{ marginTop: '60px', marginBottom: '8px' }}>
                <span className="text-xs text-gray-600">{footerMsg}</span>
            </div>

        </div>
    );
}

export default AddressesContent;
