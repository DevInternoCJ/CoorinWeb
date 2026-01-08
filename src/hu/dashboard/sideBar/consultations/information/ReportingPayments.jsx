
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Toaster, toast } from "sonner";
import { infoEjecutivo, getExportReportPayments } from "../../../../../services/mark/Orochi/LokiServices";
import { exportFromAPIResponse } from "../../../../../utils/ExcelExporter";


const ReportingPaymentsContent = ({ mostrarTabla, setMostrarTabla, activeTab }) => {
    // Obtener datos de usuario
    const userData = JSON.parse(localStorage.getItem("userData"));
    const idCartera = userData?.idCartera || 0;
    const idEjecutivo = userData?.idEjecutivo ?? null;
    const idProductoDefault = userData?.idProducto ?? 0;
    const jerarquiaDefault = userData?.Jerarquía ?? 0;

    // Estados para filtros y datos
    // Bandera para controlar el toast de error
    const [errorToastShown, setErrorToastShown] = useState(false);
    // Bandera para saber si la búsqueda fue manual
    const [cartera, setCartera] = useState(() => {
        const saved = localStorage.getItem('selectedCartera');
        return saved ? parseInt(saved, 10) : idCartera;
    });
    const [consulta, setConsulta] = useState("0");
    const [desde, setDesde] = useState(new Date().toISOString().slice(0, 10));
    const [hasta, setHasta] = useState(new Date().toISOString().slice(0, 10));
    const [idProducto, setIdProducto] = useState(idProductoDefault);
    const [jerarquia, setJerarquia] = useState(jerarquiaDefault);
    const [consultasOptions, setConsultasOptions] = useState([]);
    const [loadingConsultas, setLoadingConsultas] = useState(false);
    const [errorConsultas, setErrorConsultas] = useState(null);
    const [loadingTabla, setLoadingTabla] = useState(false);
    const [errorTabla, setErrorTabla] = useState(null);
    const [tablaData, setTablaData] = useState([]);
    const [abortController, setAbortController] = useState(null);

    // Persistir la cartera seleccionada
    useEffect(() => {
        localStorage.setItem('selectedCartera', cartera);
    }, [cartera]);

    // Efecto para reiniciar estados al cambiar de tab
    useEffect(() => {
        // Reinicia solo si el tab cambia
        setMostrarTabla(false);
        setDesde(new Date().toISOString().slice(0, 10));
        setHasta(new Date().toISOString().slice(0, 10));
        setConsulta("0");
        setTablaData([]);
        setErrorTabla(null);
        setParamsGuardados(null);
        localStorage.removeItem('reportingPaymentsParams');
    }, [activeTab]);

    // Toast informativo al montar el componente (solo si no está mostrando tabla)
    useEffect(() => {
        // Solo mostrar al montar, no al cambiar mostrarTabla
        const initialMostrarTabla = mostrarTabla;
        if (!initialMostrarTabla) {
            toast.info("Seleccione un intervalo y la consulta para mostrar los pagos reportados y dé click en 'Buscar'.", { duration: 5000 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Cargar opciones de consulta igual que Payments.jsx
    useEffect(() => {
        if (!idEjecutivo) return;
        setLoadingConsultas(true);
        setErrorConsultas(null);
        infoEjecutivo(idEjecutivo)
            .then((data) => {
                let filtered = Array.isArray(data?.consultas)
                    ? data.consultas.filter(
                        (item) =>
                            String(item.idCartera) === String(idCartera) &&
                            String(item.idProducto) === String(idProducto)
                    )
                    : [];
                setConsultasOptions(filtered);
            })
            .catch(() => {
                setErrorConsultas("Error al cargar las consultas");
                setConsultasOptions([]);
            })
            .finally(() => setLoadingConsultas(false));
    }, [idCartera, idProducto, idEjecutivo]);

    // Efecto para reiniciar estados al cambiar de tab
    useEffect(() => {
        // Reinicia solo si el tab cambia
        setMostrarTabla(false);
        setDesde(new Date().toISOString().slice(0, 10));
        setHasta(new Date().toISOString().slice(0, 10));
        setConsulta("0");
        setTablaData([]);
        setErrorTabla(null);
        setParamsGuardados(null);
        localStorage.removeItem('reportingPaymentsParams');
    }, [activeTab]);


    // Estado para guardar los parámetros usados en la primera solicitud (persistente)
    const [paramsGuardados, setParamsGuardados] = useState(() => {
        const saved = localStorage.getItem('reportingPaymentsParams');
        return saved ? JSON.parse(saved) : null;
    });

    // Memorizar los parámetros actuales
    const searchParams = useMemo(() => ({
        idCartera: cartera,
        idConsulta: consulta === "0" ? "0" : consulta,
        idProducto,
        desde,
        hasta,
        jerarquia
    }), [cartera, consulta, idProducto, desde, hasta, jerarquia]);


    // Callback para solicitar los datos usando los parámetros guardados si existen
    const fetchPagosReportados = useCallback(async () => {
        setLoadingTabla(true);
        setErrorTabla(null);
        setTablaData([]);
        setErrorToastShown(false);
        // Usar los parámetros guardados si existen, si no los actuales
        const params = paramsGuardados || searchParams;
        try {
            console.log('Enviando a getExportReportPayments:', params);
            const response = await getExportReportPayments(params);
            let data = response?.data ?? response;
            if (Array.isArray(data)) {
                setTablaData(data);
                toast.info("Búsqueda realizada exitosamente, oprima 'Exportar' si desea exportar a Excel.", { duration: 5000 });
            } else if (Array.isArray(data?.data)) {
                setTablaData(data.data);
                toast.info("Búsqueda realizada exitosamente, oprima 'Exportar' si desea exportar a Excel.", { duration: 5000 });
            } else {
                setTablaData([]);
                setErrorTabla("No se encontraron resultados.");
                toast.warning("Su consulta no cuenta con registros en la fecha especificada.", { duration: 4000 });
            }
        } catch (err) {
            // Manejo especial para el mensaje del backend
            const mensajeBackend = err?.response?.data?.mensaje;
            if (mensajeBackend === "No se encontraron registros para los pagos reportados.") {
                setTablaData([]);
                setErrorTabla("No se encontraron resultados.");
                toast.warning("Su consulta no cuenta con registros en la fecha especificada.", { duration: 4000 });
            } else if (!errorToastShown) {
                toast.error("Error al obtener los pagos reportados.", err);
                setErrorToastShown(true);
            }
        } finally {
            setLoadingTabla(false);
        }
    }, [searchParams, paramsGuardados, errorToastShown]);


    // El primer click expande el modal y guarda los parámetros, el segundo hace la búsqueda con esos parámetros
    const handleBuscar = useCallback(() => {
        console.log('🔎 searchParams (useMemo) al hacer clic en Buscar:', searchParams);
        if (!mostrarTabla) {
            setParamsGuardados(searchParams); // Guardar los parámetros actuales
            localStorage.setItem('reportingPaymentsParams', JSON.stringify(searchParams));
            setMostrarTabla(true);
        } else {
            setParamsGuardados(null); // Limpiar los parámetros guardados para usar los actuales
            fetchPagosReportados();
            localStorage.removeItem('reportingPaymentsParams');
        }
    }, [mostrarTabla, fetchPagosReportados, setMostrarTabla, searchParams]);

    // Cuando se expande el modal, restaurar los parámetros guardados y hacer la búsqueda
    useEffect(() => {
        if (mostrarTabla && paramsGuardados) {
            // Restaurar los valores visuales de los campos controlados
            if (paramsGuardados.desde !== undefined) setDesde(paramsGuardados.desde);
            if (paramsGuardados.hasta !== undefined) setHasta(paramsGuardados.hasta);
            if (paramsGuardados.idConsulta !== undefined) setConsulta(paramsGuardados.idConsulta);
            if (paramsGuardados.idCartera !== undefined) setCartera(paramsGuardados.idCartera);
            if (paramsGuardados.idProducto !== undefined) setIdProducto(paramsGuardados.idProducto);
            if (paramsGuardados.jerarquia !== undefined) setJerarquia(paramsGuardados.jerarquia);
            fetchPagosReportados();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mostrarTabla, paramsGuardados]);

    // Exportar a Excel (CSV) usando ExcelExporter
    const handleExportar = () => {
        if (!tablaData.length) return;
        const toastId = toast.loading(`Exportando pagos reportados...`);
        exportFromAPIResponse(
            tablaData,
            `pagos_reportados_${desde}_a_${hasta}`,
            {
                consultaName: "Pagos Reportados",
                headers: ["Cartera", "Cuenta", "NombreEjecutivo", "FechaPago", "Hora", "MontoPago", "Referencia", "Sucursal"],
                dateFields: ["FechaPago"],
                currencyFields: ["MontoPago"],
                accountFields: ["Cuenta"],
                showToast: true,
                successMessage: "Archivo exportado correctamente. Ábrelo en Excel para visualizar los pagos.",
                errorMessage: "Error al exportar los pagos reportados."
            }
        ).finally(() => {
            toast.dismiss(toastId);
        });
    };

    return (
        <>
            <div style={{ width: '100%', height: '100%' }} className="flex flex-col items-center min-h-0 h-full flex-1">
                {/* Layout dinámico según mostrarTabla (modo pagos-xl) */}
                {!mostrarTabla && (
                    <>
                        {/* Contenedor horizontal tipo grid igual al expansivo */}
                        <div className="w-full">
                            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
                                {/* Desde */}
                                <div className="relative w-full min-w-0">
                                    <input
                                        type="date"
                                        id="fecha-desde-reporting"
                                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                        value={desde}
                                        onChange={e => setDesde(e.target.value)}
                                        min="2016-01-01"
                                        max={new Date().toISOString().slice(0, 10)}
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="fecha-desde-reporting"
                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                                    >
                                        Desde
                                    </label>
                                </div>
                                {/* Hasta */}
                                <div className="relative w-full min-w-0">
                                    <input
                                        type="date"
                                        id="fecha-hasta-reporting"
                                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                        value={hasta}
                                        onChange={e => setHasta(e.target.value)}
                                        min="2016-01-01"
                                        max={new Date().toISOString().slice(0, 10)}
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="fecha-hasta-reporting"
                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                                    >
                                        Hasta
                                    </label>
                                </div>
                                {/* Consulta */}
                                <div className="relative w-full">
                                    <select
                                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                        value={consulta}
                                        onChange={e => setConsulta(e.target.value)}
                                        id="consulta-select-reporting"
                                        disabled={loadingConsultas || errorConsultas}
                                    >
                                        <option value="0">- Todas -</option>
                                        {consultasOptions.map((item) => (
                                            <option key={item.idConsulta || item.nombreConsulta} value={item.idConsulta}>
                                                {item.nombreConsulta}
                                            </option>
                                        ))}
                                    </select>
                                    <label
                                        htmlFor="consulta-select-reporting"
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
                                {/* Botón Buscar */}
                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        className="btn-success w-full min-w-[120px] px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                                        style={{ margin: '0 auto', display: 'block' }}
                                        onClick={handleBuscar}
                                        disabled={loadingTabla}
                                    >
                                        {loadingTabla ? "Buscando..." : "Buscar"}
                                    </button>
                                </div>
                                {/* Botón Exportar */}
                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        className="btn-info w-full min-w-[120px] px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                                        style={{ margin: '0 auto', display: 'block' }}
                                        onClick={handleExportar}
                                        disabled={!tablaData.length}
                                    >
                                        Exportar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {mostrarTabla && (
                    <div className="flex flex-col w-full items-center flex-1 min-h-0 h-full">
                        <div className="w-full max-w-4xl mb-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
                                {/* Desde */}
                                <div className="relative w-full min-w-0">
                                    <input
                                        type="date"
                                        id="fecha-desde-reporting-ext"
                                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                        value={desde}
                                        onChange={e => setDesde(e.target.value)}
                                        min="2016-01-01"
                                        max={new Date().toISOString().slice(0, 10)}
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="fecha-desde-reporting-ext"
                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                                    >
                                        Desde
                                    </label>
                                </div>
                                {/* Hasta */}
                                <div className="relative w-full min-w-0">
                                    <input
                                        type="date"
                                        id="fecha-hasta-reporting-ext"
                                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                        value={hasta}
                                        onChange={e => setHasta(e.target.value)}
                                        min="2016-01-01"
                                        max={new Date().toISOString().slice(0, 10)}
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="fecha-hasta-reporting-ext"
                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                                    >
                                        Hasta
                                    </label>
                                </div>
                                {/* Consulta */}
                                <div className="relative w-full">
                                    <select
                                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                        value={consulta}
                                        onChange={e => setConsulta(e.target.value)}
                                        id="consulta-select-reporting-ext"
                                        disabled={loadingConsultas || errorConsultas}
                                    >
                                        <option value="0">- Todas -</option>
                                        {consultasOptions.map((item) => (
                                            <option key={item.idConsulta || item.nombreConsulta} value={item.idConsulta}>
                                                {item.nombreConsulta}
                                            </option>
                                        ))}
                                    </select>
                                    <label
                                        htmlFor="consulta-select-reporting-ext"
                                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                                    >
                                        Consulta
                                    </label>
                                </div>
                                {/* Botones: visibles en lg dentro del grid de 5 cols */}
                                <div className="hidden lg:flex justify-center">
                                    <button
                                        type="button"
                                        className="btn-success w-full min-w-[120px] px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                                        onClick={handleBuscar}
                                        disabled={loadingTabla}
                                    >
                                        {loadingTabla ? "Buscando..." : "Buscar"}
                                    </button>
                                </div>
                                <div className="hidden lg:flex justify-center">
                                    <button
                                        type="button"
                                        className="btn-info w-full min-w-[120px] px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                                        onClick={handleExportar}
                                        disabled={!tablaData.length}
                                    >
                                        Exportar
                                    </button>
                                </div>
                            </div>
                            {/* Botones: visibles solo en md y sm (debajo de los campos) */}
                            <div className="flex lg:hidden gap-4 mt-4 justify-center">
                                <button
                                    type="button"
                                    className="btn-success flex-1 sm:flex-none min-w-[120px] px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                                    onClick={handleBuscar}
                                    disabled={loadingTabla}
                                >
                                    {loadingTabla ? "Buscando..." : "Buscar"}
                                </button>
                                <button
                                    type="button"
                                    className="btn-info flex-1 sm:flex-none min-w-[120px] px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                                    onClick={handleExportar}
                                    disabled={!tablaData.length}
                                >
                                    Exportar
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 w-full overflow-auto" style={{ maxWidth: 1100, marginTop: 0, marginBottom: 0, borderRadius: 8, border: '1px solid #e0e0e0', background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                            <div className="flex-1 w-full overflow-auto" style={{ height: '100%' }}>
                                <div className="max-h-[68vh] overflow-y-auto">
                                <table className="modal-table" style={{ minWidth: 900, width: '100%', tableLayout: 'auto', borderCollapse: 'separate' }}>
                                    <thead style={{ position: 'sticky', top: 0, background: '#fff' }}>
                                        <tr>
                                            <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Cartera</th>
                                            <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Cuenta</th>
                                            <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Nombre Ejecutivo</th>
                                            <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Fecha Pago</th>
                                            <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Hora</th>
                                            <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Monto Pago</th>
                                            <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Referencia</th>
                                            <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Sucursal</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ background: '#b6d6f6' }}>
                                        {loadingTabla && (
                                            <tr>
                                                <td colSpan={8} style={{ textAlign: 'center', height: 200, verticalAlign: 'middle' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                                        <div className="animate-spin" style={{ border: '4px solid #e0e0e0', borderTop: '4px solid #3b82f6', borderRadius: '50%', width: 48, height: 48, marginBottom: 12 }}></div>
                                                        <span className="text-gray-500">Cargando...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        {!loadingTabla && tablaData.length === 0 && (
                                            <tr>
                                                <td colSpan={8} style={{ textAlign: 'center', height: 200, verticalAlign: 'middle' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                                        <span className="text-gray-500" style={{ fontSize: 18 }}>Aún no hay registros</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        {!loadingTabla && tablaData.map((row, idx) => (
                                            <tr key={idx}>
                                                <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.Cartera}</td>
                                                <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.Cuenta}</td>
                                                <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.NombreEjecutivo}</td>
                                                <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.FechaPago ? row.FechaPago.replace(/T00:00:00$/, "") : ""}</td>
                                                <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.Hora}</td>
                                                <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.MontoPago !== undefined && row.MontoPago !== null ? `$${row.MontoPago}` : ""}</td>
                                                <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.Referencia}</td>
                                                <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.Sucursal}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                            {/* Spinner animación CSS */}
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
        </>
    );
};

export default ReportingPaymentsContent;