
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Toaster, toast } from "sonner";
import ConsorcioLogo from "../../../../../assets/logo_coorin_7.svg";
import { infoEjecutivo, getExportReportPayments } from "../../../../../services/mark/albaz/LokiServices";


const ReportingPaymentsContent = ({ mostrarTabla, setMostrarTabla }) => {
    // Obtener datos de usuario
    const userData = JSON.parse(localStorage.getItem("userData"));
    const idCartera = userData?.idCartera || 1;
    const idEjecutivo = userData?.idEjecutivo ?? userData?.idejecutivo ?? userData?.ejecutivo ?? null;
    const idProductoDefault = userData?.idProducto ?? userData?.idproducto ?? userData?.producto ?? 1;
    const jerarquiaDefault = userData?.jerarquia ?? userData?.Jerarquia ?? 4;

    // Estados para filtros y datos
    // Bandera para controlar el toast de error
    const [errorToastShown, setErrorToastShown] = useState(false);
    // Bandera para saber si la búsqueda fue manual
    const [cartera, setCartera] = useState(idCartera);
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
                toast.success("Consulta realizada correctamente.");
            } else if (Array.isArray(data?.data)) {
                setTablaData(data.data);
                toast.success("Consulta realizada correctamente.");
            } else {
                setTablaData([]);
                setErrorTabla("No se encontraron resultados.");
                toast.warning("Su consulta no cuenta con registros en la fecha especificada", { duration: 4000 });
            }
        } catch (err) {
            if (!errorToastShown) {
                toast.error("Error al obtener los pagos reportados.", err);
                setErrorToastShown(true);
            }
        } finally {
            setLoadingTabla(false);
        }
    }, [searchParams, paramsGuardados]);


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

    // Exportar a Excel (CSV)
    const handleExportar = () => {
        if (!tablaData.length) return;
        const headers = [
            "cartera",
            "cuenta",
            "nombreEjecutivo",
            "fechaPago",
            "hora",
            "montoPago",
            "referencia",
            "sucursal"
        ];
        const rows = tablaData.map(obj => headers.map(h => {
            let value = obj[h];
            if (h === "cuenta" && typeof value === "number") value = `'${value.toString()}`;
            if (h === "cuenta" && typeof value === "string") value = `'${value}`;
            if (h === "fechaPago" && typeof value === "string") value = value.replace(/T00:00:00$/, "");
            if (h === "montoPago" && value !== undefined && value !== null) value = `$${value}`;
            if (typeof value === "string") value = value.replace(/,/g, "");
            return value;
        }).join(","));
        const csvContent = headers.join(",") + "\n" + rows.join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pagos_reportados_${desde}_a_${hasta}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("Archivo exportado correctamente. Ábrelo en Excel para visualizar los pagos.");
    };

    return (
    <>
    <div style={{ width: '100%' }} className="flex flex-col items-center">
            {/* Layout dinámico según mostrarTabla (modo pagos-xl) */}
            {!mostrarTabla && (
                <>
                    {/* Logo centrado arriba de los campos */}
                    <div className="flex flex-col items-center w-full">
                        <img src={ConsorcioLogo} alt="Logo Coorin" className="h-20 w-20 object-contain mx-auto" />
                    </div>
                    {/* Contenedor centralizado para los campos y botones */}
                    <div
                        className="flex flex-col items-center w-full"
                        style={{ flex: 1, marginTop: '1.2rem', transition: 'margin-top 0.2s' }}
                    >
                        <div className="flex gap-3 w-full max-w-xs justify-center" style={{ marginBottom: '1.2rem' }}>
                            <div className="hs-input-group w-full">
                                <span className="hs-input-group-text min-w-[90px]">Desde</span>
                                <input
                                    type="date"
                                    className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                    value={desde}
                                    onChange={e => setDesde(e.target.value)}
                                    min={new Date(new Date().setFullYear(new Date().getFullYear() - 6)).toISOString().slice(0, 10)}
                                    max={(function(){const d=new Date();d.setDate(d.getDate()-1);return d.toISOString().slice(0,10);})()}
                                />
                            </div>
                            <div className="hs-input-group w-full">
                                <span className="hs-input-group-text min-w-[90px]">Hasta</span>
                                <input
                                    type="date"
                                    className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                    value={hasta}
                                    onChange={e => setHasta(e.target.value)}
                                        min={new Date(new Date().setFullYear(new Date().getFullYear() - 6)).toISOString().slice(0, 10)}
                                        max={new Date().toISOString().slice(0, 10)}
                                />
                            </div>
                        </div>
                        {/* Dropdown Consulta con estilos de Preline */}
                        <div className="relative w-full max-w-xs" style={{ marginBottom: '0.7rem' }}>
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
                        <div className="flex gap-3 w-full max-w-xs justify-center">
                            <button
                                type="button"
                                className="btn-success w-full sm:w-auto min-w-[120px] max-w-full px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                                style={{ margin: '0 auto', display: 'block' }}
                                onClick={handleBuscar}
                                disabled={loadingTabla}
                            >
                                {loadingTabla ? "Buscando..." : "Buscar"}
                            </button>
                            <button
                                type="button"
                                className="btn-info w-full sm:w-auto min-w-[120px] max-w-full px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                                style={{ margin: '0 auto', display: 'block' }}
                                onClick={handleExportar}
                                disabled={!tablaData.length}
                            >
                                Exportar
                            </button>
                        </div>
                    </div>
                </>
            )}
            {mostrarTabla && (
                <>
                    {/* Grid row: logo en columna 2, campos en 3, 4, 5, consulta en 5, columna 6 vacía */}
                    <div className="w-full grid grid-cols-6 gap-4 items-center mb-4 max-w-5xl">
                        <div></div>
                        <div className="flex justify-center">
                            <img src={ConsorcioLogo} alt="Logo Coorin" className="h-20 w-20 object-contain" />
                        </div>
                        <div>
                            <div className="hs-input-group w-full">
                                <span className="hs-input-group-text min-w-[90px]">Desde</span>
                                <input
                                    type="date"
                                    className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                    value={desde}
                                    onChange={e => setDesde(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="hs-input-group w-full">
                                <span className="hs-input-group-text min-w-[90px]">Hasta</span>
                                <input
                                    type="date"
                                    className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                    value={hasta}
                                    onChange={e => setHasta(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="relative w-full">
                                <select
                                    className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                    value={consulta}
                                    onChange={e => setConsulta(e.target.value)}
                                    id="consulta-select-reporting"
                                    disabled={loadingConsultas || errorConsultas}
                                >
                                    <option value="">- Todas -</option>
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
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <div className="flex gap-3 w-full justify-center mb-4">
                        <button
                            type="button"
                            className="btn-success w-full sm:w-auto min-w-[120px] max-w-xs px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                            style={{ margin: '0 auto', display: 'block' }}
                            onClick={handleBuscar}
                            disabled={loadingTabla || !consulta}
                        >
                            {loadingTabla ? "Buscando..." : "Buscar"}
                        </button>
                        <button
                            type="button"
                            className="btn-info w-full sm:w-auto min-w-[120px] max-w-xs px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                            style={{ margin: '0 auto', display: 'block' }}
                            onClick={handleExportar}
                            disabled={!tablaData.length}
                        >
                            Exportar
                        </button>
                    </div>
                    <div style={{ width: '100%', maxWidth: 1100, minHeight: 500, maxHeight: 500, marginTop: 0, marginBottom: 0, borderRadius: 8, border: '1px solid #e0e0e0', background: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <div style={{ width: '100%', height: '100%', overflowY: 'auto', flex: 1 }}>
                            <table className="modal-table" style={{ minWidth: 900, width: '100%', height: '100%', tableLayout: 'auto', borderCollapse: 'separate' }}>
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
                                            <td colSpan={8} style={{ textAlign: 'center', height: 320, verticalAlign: 'middle' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                                    <div className="animate-spin" style={{ border: '4px solid #e0e0e0', borderTop: '4px solid #3b82f6', borderRadius: '50%', width: 48, height: 48, marginBottom: 12 }}></div>
                                                    <span className="text-gray-500">Cargando...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    {!loadingTabla && tablaData.length === 0 && (
                                        <tr>
                                            <td colSpan={8} style={{ textAlign: 'center', height: 320, verticalAlign: 'middle' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                                    <span className="text-gray-500" style={{ fontSize: 18 }}>Aún no hay registros</span>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    {!loadingTabla && tablaData.map((row, idx) => (
                                        <tr key={idx}>
                                            <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.cartera}</td>
                                            <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.cuenta}</td>
                                            <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.nombreEjecutivo}</td>
                                            <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.fechaPago ? row.fechaPago.replace(/T00:00:00$/, "") : ""}</td>
                                            <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.hora}</td>
                                            <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.montoPago !== undefined && row.montoPago !== null ? `$${row.montoPago}` : ""}</td>
                                            <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.referencia}</td>
                                            <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{row.sucursal}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                </>
            )}
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: !mostrarTabla ? 52 : 0
                }}
            >
                {!mostrarTabla ? (
                    <span className="text-gray-600 text-sm pl-2">
                        Seleccione un intervalo y la consulta para mostrar los pagos reportados y dé click en "Buscar".
                    </span>
                ) : (
                    <span className="text-gray-600 text-sm pl-2">
                        Búsqueda realizada exitosamente, oprima 'Exportar' si desea que el se exporte a Excel
                    </span>
                )}
            </div>
        </div>
        </>
    );
};

export default ReportingPaymentsContent;
