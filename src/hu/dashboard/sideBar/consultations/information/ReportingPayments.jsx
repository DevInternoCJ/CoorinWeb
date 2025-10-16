
import React, { useState, useEffect } from "react";
import ConsorcioLogo from "../../../../../assets/logo_coorin_7.svg";
import { infoEjecutivo, getExportReportPayments } from "../../../../../services/mark/albaz/LokiServices";


const ReportingPaymentsContent = ({ mostrarTabla, setMostrarTabla }) => {
    // Obtener datos de usuario
    const userData = JSON.parse(localStorage.getItem("userData"));
    const idCartera = userData?.idCartera || 1;
    const idProducto = userData?.idProducto ?? userData?.idproducto ?? userData?.producto ?? 1;
    const jerarquia = userData?.jerarquia ?? userData?.Jerarquia ?? 4;
    const idEjecutivo = userData?.idEjecutivo ?? userData?.idejecutivo ?? userData?.ejecutivo ?? null;

    // Estados para filtros y datos
    const [cartera, setCartera] = useState(idCartera);
    const [consulta, setConsulta] = useState("");
    const [desde, setDesde] = useState(new Date().toISOString().slice(0, 10));
    const [hasta, setHasta] = useState(new Date().toISOString().slice(0, 10));
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
                let filtered = Array.isArray(data)
                    ? data.filter(
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

    // Buscar pagos reportados
    const handleBuscar = async () => {
        setLoadingTabla(true);
        setErrorTabla(null);
        setTablaData([]);
        try {
            const params = {
                idCartera: cartera,
                idConsulta: consulta,
                idProducto,
                desde,
                hasta,
                jerarquia
            };
            console.log('📤 Enviando a getExportReportPayments:', params);
            const response = await getExportReportPayments(params);
            // La respuesta puede estar en response.data o response.data.data
            let data = response?.data ?? response;
            if (Array.isArray(data)) {
                setTablaData(data);
            } else if (Array.isArray(data?.data)) {
                setTablaData(data.data);
            } else {
                setTablaData([]);
                setErrorTabla("No se encontraron resultados.");
            }
            setMostrarTabla(true);
        } catch (err) {
            setErrorTabla("Error al obtener los pagos reportados.", err);
        } finally {
            setLoadingTabla(false);
        }
    };

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
    };

    return (
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
                                />
                            </div>
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
                        {/* Dropdown Consulta con estilos de Preline */}
                        <div className="relative w-full max-w-xs" style={{ marginBottom: '0.7rem' }}>
                            <select
                                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                value={consulta}
                                onChange={e => setConsulta(e.target.value)}
                                id="consulta-select-reporting"
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
                                disabled={loadingTabla || !consulta}
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
                        {errorTabla && <div className="text-red-500 text-xs text-center mt-1">{errorTabla}</div>}
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
                                        <option key={item.idConsulta || item.NombreConsulta} value={item.idConsulta}>
                                            {item.NombreConsulta}
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
                    <div style={{ width: '100%', maxWidth: 1000, marginTop: 0, marginBottom: 12, borderRadius: 8, border: '1px solid #e0e0e0', background: '#fff', overflow: 'hidden' }}>
                        <div style={{ width: '100%', overflow: 'hidden' }}>
                            <table className="modal-table" style={{ minWidth: 900, width: '100%', tableLayout: 'fixed', borderCollapse: 'separate' }}>
                                <thead style={{ position: 'sticky', top: 0, zIndex: 2, background: '#fff' }}>
                                    <tr>
                                        <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '12.5%' }}>Cartera</th>
                                        <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '12.5%' }}>Cuenta</th>
                                        <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '15%' }}>Nombre Ejecutivo</th>
                                        <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '12.5%' }}>Fecha Pago</th>
                                        <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '12.5%' }}>Hora</th>
                                        <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '12.5%' }}>Monto Pago</th>
                                        <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '12.5%' }}>Referencia</th>
                                        <th style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '10%' }}>Sucursal</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div style={{ width: '100%', maxHeight: 400, overflowY: 'auto', overflowX: 'hidden' }}>
                            <table className="modal-table" style={{ minWidth: 900, width: '100%', tableLayout: 'fixed', borderCollapse: 'separate' }}>
                                <tbody>
                                    {tablaData.length === 0 && !loadingTabla && (
                                        <tr><td colSpan={8} className="text-center text-gray-500">Sin resultados</td></tr>
                                    )}
                                    {tablaData.map((row, idx) => (
                                        <tr key={idx}>
                                            <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '12.5%' }}>{row.cartera}</td>
                                            <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '12.5%' }}>{row.cuenta}</td>
                                            <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '15%' }}>{row.nombreEjecutivo}</td>
                                            <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '12.5%' }}>{row.fechaPago ? row.fechaPago.replace(/T00:00:00$/, "") : ""}</td>
                                            <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '12.5%' }}>{row.hora}</td>
                                            <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '12.5%' }}>{row.montoPago !== undefined && row.montoPago !== null ? `$${row.montoPago}` : ""}</td>
                                            <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '12.5%' }}>{row.referencia}</td>
                                            <td style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '10%' }}>{row.sucursal}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {errorTabla && <div className="text-red-500 text-xs text-center mt-1">{errorTabla}</div>}
                </>
            )}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 52 }}>
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
    );
};

export default ReportingPaymentsContent;
