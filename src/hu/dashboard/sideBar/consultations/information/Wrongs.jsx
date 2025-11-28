import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { getCatalogoValueCard, getWrongsInformation } from "../../../../../services/mark/albaz/LokiServices";

const WrongsContent = ({ mostrarTabla, setMostrarTabla }) => {
    // estado 'buscado' no usado -- eliminado para evitar warnings
    const [catalogoOptions, setCatalogoOptions] = useState([]);
    const [datoErroneo, setDatoErroneo] = useState("");
    const [desde, setDesde] = useState(new Date().toISOString().slice(0, 10));
    const [hasta, setHasta] = useState(new Date().toISOString().slice(0, 10));
    const [loadingTabla, setLoadingTabla] = useState(false);
    const [errorTabla, setErrorTabla] = useState(null);
    const [tablaData, setTablaData] = useState([]);
    // Guardar y restaurar parámetros
    const [paramsGuardados, setParamsGuardados] = useState(() => {
        const saved = localStorage.getItem('wrongsParams');
        return saved ? JSON.parse(saved) : null;
    });
    // Obtener idCartera desde localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    const idCartera = userData?.idCartera || 0;
    // Memorizar los parámetros actuales
    const searchParams = {
        idCartera,
        idDatoErroneo: datoErroneo === "" ? 0 : parseInt(datoErroneo, 10),
        desde,
        hasta
    };
        // ...existing code...
    // Ejecutar búsqueda automática al abrir el modal extendido si hay parámetros guardados
    useEffect(() => {
        if (mostrarTabla && paramsGuardados) {
            // Restaurar filtros
            setDesde(paramsGuardados.desde);
            setHasta(paramsGuardados.hasta);
            setDatoErroneo(paramsGuardados.idDatoErroneo);
            // Simular clic en buscar automáticamente
            buscarConParamsGuardados();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mostrarTabla, paramsGuardados]);

    // Función para ejecutar la búsqueda con los parámetros guardados
    const buscarConParamsGuardados = async () => {
        setLoadingTabla(true);
        setErrorTabla(null);
        setTablaData([]);
        const params = paramsGuardados;
        try {
            const response = await getWrongsInformation(params);
            let text = "";
            if (response && response.data instanceof Blob) {
                text = await response.data.text();
            } else if (response && response.data) {
                text = response.data;
            }
            let json = [];
            try {
                json = JSON.parse(text);
            } catch {
                setErrorTabla("Error al procesar la respuesta del servidor.");
                setLoadingTabla(false);
                return;
            }
            setTablaData(Array.isArray(json) ? json : []);
            if (Array.isArray(json) && json.length > 0) {
                toast.info("Búsqueda realizada exitosamente.", { duration: 5000 });
            }
            localStorage.removeItem('wrongsParams');
        } catch (err) {
            if (err?.response?.status === 404 && err?.response?.statusText === "Not Found") {
                toast.warning("Su consulta no cuenta con registros en la fecha especificada.", { duration: 4000 });
            } else {
                setErrorTabla("Error al obtener los datos erróneos.");
            }
        } finally {
            setLoadingTabla(false);
        }
    };
    // Toast informativo al montar el componente
    useEffect(() => {
        const initialMostrarTabla = mostrarTabla;
        if (!initialMostrarTabla) {
            toast.info("Seleccione un intervalo y el dato erróneo para mostrar los registros y dé click en 'Buscar'.", { duration: 5000 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Cargar catálogo al montar
    useEffect(() => {
        getCatalogoValueCard()
            .then(data => {
                // Filtrar por idCatálogo = 18 (ojo con la tilde)
                const filtrados = Array.isArray(data)
                    ? data.filter(item => item.idCatálogo === 18)
                    : [];
                setCatalogoOptions(filtrados);
            })
            .catch(() => setCatalogoOptions([]));
    }, []);

    // Handler para buscar y mostrar tabla extendida
    const handleBuscar = async () => {
        if (!mostrarTabla) {
            setParamsGuardados(searchParams);
            localStorage.setItem('wrongsParams', JSON.stringify(searchParams));
            setMostrarTabla(true);
            return;
        }
        setLoadingTabla(true);
        setErrorTabla(null);
        setTablaData([]);
        // SIEMPRE usar los parámetros actuales al buscar manualmente
        let params = {
            idCartera,
            idDatoErroneo: datoErroneo === "" ? 0 : parseInt(datoErroneo, 10),
            desde,
            hasta
        };
        try {
            const response = await getWrongsInformation(params);
            // La respuesta es un blob, leer como texto y parsear JSON
            let text = "";
            if (response && response.data instanceof Blob) {
                text = await response.data.text();
            } else if (response && response.data) {
                text = response.data;
            }
            let json = [];
            try {
                json = JSON.parse(text);
            } catch (e) {
                setErrorTabla("Error al procesar la respuesta del servidor.", e);
                setLoadingTabla(false);
                return;
            }
            setTablaData(Array.isArray(json) ? json : []);
            if (Array.isArray(json) && json.length > 0) {
                toast.info("Búsqueda realizada exitosamente.", { duration: 5000 });
            }
            localStorage.removeItem('wrongsParams');
        } catch (err) {
            if (err?.response?.status === 404 && err?.response?.statusText === "Not Found") {
                setErrorTabla("No se encontraron resultados.");
                toast.warning("Su consulta no cuenta con registros en la fecha especificada.", { duration: 4000 });
            } else {
                setErrorTabla("Error al obtener los datos erróneos.");
            }
        } finally {
            setLoadingTabla(false);
        }
    };

    return (
        <div style={{ width: '100%', height: '100%' }} className="flex flex-col items-center min-h-0 h-full">
            {/* Layout extendido si mostrarTabla=true */}
            {!mostrarTabla ? (
                <div className="flex flex-col items-center w-full" style={{ flex: 1 }}>
                    <div className="flex gap-3 mb-3 w-full max-w-sm justify-center">
                        <div className="relative w-full min-w-0">
                            <input
                                type="date"
                                id="fecha-desde-wrongs"
                                className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                value={desde}
                                onChange={e => setDesde(e.target.value)}
                                min="2016-01-01"
                                max={(() => { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().slice(0, 10); })()}
                                placeholder=" "
                            />
                            <label
                                htmlFor="fecha-desde-wrongs"
                                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                            >
                                Desde
                            </label>
                        </div>
                        <div className="relative w-full min-w-0">
                            <input
                                type="date"
                                id="fecha-hasta-wrongs"
                                className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                value={hasta}
                                onChange={e => setHasta(e.target.value)}
                                min="2016-01-01"
                                max={new Date().toISOString().slice(0, 10)}
                                placeholder=" "
                            />
                            <label
                                htmlFor="fecha-hasta-wrongs"
                                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                            >
                                Hasta
                            </label>
                        </div>
                    </div>
                    {/* Dropdown Datos Erróneos */}
                    <div className="relative w-full max-w-sm mb-3">
                        <select
                            className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                            value={datoErroneo}
                            onChange={e => setDatoErroneo(e.target.value)}
                            id="datos-erroneos-select"
                        >
                            <option value="">--Todos--</option>
                            {catalogoOptions.map(item => (
                                <option key={item.idValor} value={item.idValor}>{item.valor}</option>
                            ))}
                        </select>
                        <label
                            htmlFor="datos-erroneos-select"
                            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                        >
                            Datos Erróneos
                        </label>
                    </div>
                    <div className="flex gap-3 w-full max-w-sm justify-center">
                        <button
                            type="button"
                            className="btn-success w-full sm:w-auto min-w-[120px] max-w-full px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                            style={{ margin: '0 auto', display: 'block' }}
                            onClick={handleBuscar}
                        >
                            Buscar
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col w-full items-center" style={{ flex: 1, minHeight: 0 }}>
                    {/* Grid responsivo: lg=4cols | md=2cols x 2filas | sm=1col apilado */}
                    <div className="w-full max-w-4xl mb-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                            {/* Desde */}
                            <div className="relative w-full min-w-0">
                                <input
                                    type="date"
                                    id="fecha-desde-wrongs-ext"
                                    className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                    value={desde}
                                    onChange={e => setDesde(e.target.value)}
                                    min="2016-01-01"
                                    max={new Date().toISOString().slice(0, 10)}
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="fecha-desde-wrongs-ext"
                                    className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                                >
                                    Desde
                                </label>
                            </div>
                            {/* Hasta */}
                            <div className="relative w-full min-w-0">
                                <input
                                    type="date"
                                    id="fecha-hasta-wrongs-ext"
                                    className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                    value={hasta}
                                    onChange={e => setHasta(e.target.value)}
                                    min="2016-01-01"
                                    max={new Date().toISOString().slice(0, 10)}
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="fecha-hasta-wrongs-ext"
                                    className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                                >
                                    Hasta
                                </label>
                            </div>
                            {/* Dato Erróneo */}
                            <div className="relative w-full">
                                <select
                                    className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                    value={datoErroneo}
                                    onChange={e => setDatoErroneo(e.target.value)}
                                    id="datos-erroneos-select-ext"
                                >
                                    <option value="">--Todos--</option>
                                    {catalogoOptions.map(item => (
                                        <option key={item.idValor} value={item.idValor}>{item.valor}</option>
                                    ))}
                                </select>
                                <label
                                    htmlFor="datos-erroneos-select-ext"
                                    className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                                >
                                    Datos Erróneos
                                </label>
                            </div>
                            {/* Buscar */}
                            <div className="flex justify-center">
                                <button
                                    type="button"
                                    className="btn-success w-full min-w-[120px] px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                                    onClick={handleBuscar}
                                    disabled={loadingTabla}
                                >
                                    {loadingTabla ? "Buscando..." : "Buscar"}
                                </button>
                            </div>
                        </div>
                    </div>
                        <div style={{ width: '100%', maxWidth: 1100, flex: '1 1 auto', minHeight: 0, marginTop: 0, marginBottom: 0, borderRadius: 8, border: '1px solid #e0e0e0', background: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                            <div style={{ width: '100%', height: '100%', overflowY: 'auto', flex: 1, minHeight: 0 }}>
                                <table className="modal-table" style={{ minWidth: 900, width: '100%', tableLayout: 'auto', borderCollapse: 'separate' }}>
                                    <thead style={{ position: 'sticky', top: 0, background: '#fff' }}>
                                        <tr>
                                            <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Producto</th>
                                            <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Cuenta</th>
                                            <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Nombre Deudor</th>
                                            <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>RFC</th>
                                            <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Número Cliente</th>
                                            <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Saldo</th>
                                            <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Reportó</th>
                                            <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Dato Erróneo</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ background: '#b6d6f6' }}>
                                        {loadingTabla ? (
                                            <tr>
                                                <td colSpan={8} style={{ textAlign: 'center', verticalAlign: 'middle', padding: '48px 12px' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                                        <div className="animate-spin" style={{ border: '4px solid #e0e0e0', borderTop: '4px solid #3b82f6', borderRadius: '50%', width: 48, height: 48, marginBottom: 12 }}></div>
                                                        <span className="text-gray-500">Cargando...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : tablaData.length === 0 ? (
                                            <tr>
                                                <td colSpan={8} style={{ textAlign: 'center', verticalAlign: 'middle', padding: '48px 12px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                                        <span className="text-gray-500" style={{ fontSize: 18 }}>Aún no hay registros</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            tablaData.map((row, idx) => (
                                                <tr key={idx}>
                                                    <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>{row.producto}</td>
                                                    <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.cuenta}</td>
                                                    <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>{row.nombreDeudor}</td>
                                                    <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.rfc}</td>
                                                    <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.numeroCliente}</td>
                                                    <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.saldo}</td>
                                                    <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.reporto}</td>
                                                    <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row["DatoErróneo"]}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <style>{`
                                .animate-spin {
                                    animation: spin 1s linear infinite;
                                }
                                @keyframes spin {
                                    0% { transform: rotate(0deg); }
                                    100% { transform: rotate(360deg); }
                                }
                            `}</style>
                        </div>
                    {errorTabla && <div className="text-red-500 text-xs text-center mt-1">{errorTabla}</div>}
                </div>
            )}
        </div>
    );
};

export default WrongsContent;
