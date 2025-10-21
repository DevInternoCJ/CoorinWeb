import React, { useState, useEffect } from "react";
import ConsorcioLogo from "../../../../../assets/logo_coorin_7.svg";
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
    // Memorizar los parámetros actuales
    const searchParams = {
        idCartera: 1,
        idDatoErroneo: datoErroneo || 1,
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
            localStorage.removeItem('wrongsParams');
        } catch {
            setErrorTabla("Error al obtener los datos erróneos.");
        } finally {
            setLoadingTabla(false);
        }
    };
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
        // Usar los parámetros guardados si existen, si no los actuales
        const params = paramsGuardados || searchParams;
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
            localStorage.removeItem('wrongsParams');
        } catch (err) {
            setErrorTabla("Error al obtener los datos erróneos.", err);
        } finally {
            setLoadingTabla(false);
        }
    };

    return (
        <div style={{ width: '100%', height: '100%' }} className="flex flex-col items-center min-h-0 h-full">
            {/* Logo centrado arriba de los campos solo si mostrarTabla es falso */}
            {!mostrarTabla && (
                <div className="flex flex-col items-center w-full mb-2">
                    <img src={ConsorcioLogo} alt="Logo Coorin" className="h-20 w-20 object-contain mx-auto" />
                </div>
            )}
            {/* Layout extendido si mostrarTabla=true */}
            {!mostrarTabla ? (
                <div className="flex flex-col items-center w-full" style={{ flex: 1 }}>
                    <div className="flex gap-3 mb-3 w-full max-w-xs justify-center">
                        <div className="hs-input-group w-full">
                            <span className="hs-input-group-text min-w-[90px]">Desde</span>
                            <input
                                type="date"
                                className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                value={desde}
                                onChange={e => setDesde(e.target.value)}
                                min="2016-01-01"
                                max={new Date().toISOString().slice(0, 10)}
                            />
                        </div>
                        <div className="hs-input-group w-full">
                            <span className="hs-input-group-text min-w-[90px]">Hasta</span>
                            <input
                                type="date"
                                className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                value={hasta}
                                onChange={e => setHasta(e.target.value)}
                                min="2016-01-01"
                                max={new Date().toISOString().slice(0, 10)}
                            />
                        </div>
                    </div>
                    {/* Dropdown Datos Erróneos */}
                    <div className="relative w-full max-w-xs mb-3">
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
                    <div className="flex gap-3 w-full max-w-xs justify-center">
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
                <>
                    {/* Row de 6 columnas para controles */}
                    <div className="w-full grid grid-cols-6 items-center mb-2 max-w-5xl" style={{ minHeight: 70 }}>
                        {/* Col 1 vacía */}
                        <div></div>
                        {/* Col 2: Logo */}
                        <div className="flex items-center justify-center">
                            <img src={ConsorcioLogo} alt="Logo Coorin" className="h-20 w-20 object-contain mx-auto" />
                        </div>
                        {/* Col 3: Dropdown Dato Erróneo */}
                        <div className="relative">
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
                        {/* Col 4: Calendario Desde */}
                        <div className="hs-input-group">
                            <span className="hs-input-group-text min-w-[90px]">Desde</span>
                            <input
                                type="date"
                                className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                value={desde}
                                onChange={e => setDesde(e.target.value)}
                                min="2016-01-01"
                                max={new Date().toISOString().slice(0, 10)}
                            />
                        </div>
                        {/* Col 5: Calendario Hasta */}
                        <div className="hs-input-group">
                            <span className="hs-input-group-text min-w-[90px]">Hasta</span>
                            <input
                                type="date"
                                className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                value={hasta}
                                onChange={e => setHasta(e.target.value)}
                                min="2016-01-01"
                                max={new Date().toISOString().slice(0, 10)}
                            />
                        </div>
                        {/* Col 6 vacía */}
                        <div></div>
                    </div>
                    {/* Botón buscar en un row abajo, centrado */}
                    <div className="w-full flex justify-center mb-4">
                        <button
                            type="button"
                            className="btn-success min-w-[120px] px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                            onClick={handleBuscar}
                            disabled={loadingTabla}
                        >
                            {loadingTabla ? "Buscando..." : "Buscar"}
                        </button>
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
                                        {loadingTabla && (
                                            <tr>
                                                <td colSpan={8} style={{ textAlign: 'center', verticalAlign: 'middle', padding: '48px 12px' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                                        <div className="animate-spin" style={{ border: '4px solid #e0e0e0', borderTop: '4px solid #3b82f6', borderRadius: '50%', width: 48, height: 48, marginBottom: 12 }}></div>
                                                        <span className="text-gray-500">Cargando...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        {!loadingTabla && tablaData.length === 0 && (
                                            <tr>
                                                <td colSpan={8} style={{ textAlign: 'center', verticalAlign: 'middle', padding: '48px 12px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                                        <span className="text-gray-500" style={{ fontSize: 18 }}>Aún no hay registros</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        {!loadingTabla && tablaData.map((row, idx) => (
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
                                        ))}
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
                </>
            )}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: !mostrarTabla ? 52 : 0 }}>
                {!mostrarTabla ? (
                    <span className="text-gray-600 text-sm pl-2">
                        Seleccione un intervalo y el dato erróneo para mostrar los registros y dé click en "Buscar".
                    </span>
                ) : (
                    <span className="text-gray-600 text-sm pl-2">
                        Búsqueda realizada exitosamente.
                    </span>
                )}
            </div>
        </div>
    );
};

export default WrongsContent;
