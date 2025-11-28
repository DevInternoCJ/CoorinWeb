import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { infoEjecutivo, getCommentsInformation } from "../../../../../services/mark/albaz/LokiServices";
import { exportFromAPIResponse } from "../../../../../utils/ExcelExporter";

const CommentsContent = () => {
    // Mensaje de footer dinámico
    const [footerMsg, setFooterMsg] = useState("Elija la consulta de las cuentas que desee el comentarioso y el periodo.");

    // Obtener datos de usuario desde localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    const idCartera = userData?.idCartera || 0;
    const idProducto = userData?.idProducto ?? 0;
    const jerarquia = userData?.Jerarquía ?? 0;
    const idEjecutivo = userData?.idEjecutivo ?? null;


    // Estados para selects y fechas
    const [cartera, setCartera] = useState(idCartera);
    const [carterasOptions, setCarterasOptions] = useState([]);
    const [consulta, setConsulta] = useState("");
    const [consultasOptions, setConsultasOptions] = useState([]);
    // Limitar fechas: mínimo 2016-01-01, máximo hoy
    const minDate = "2016-01-01";
    const maxDate = new Date().toISOString().slice(0, 10);
    const [desde, setDesde] = useState(maxDate);
    const [hasta, setHasta] = useState(maxDate);
    const [loadingConsultas, setLoadingConsultas] = useState(false);
    const [errorConsultas, setErrorConsultas] = useState(null);
    const [loadingExcel, setLoadingExcel] = useState(false);
    const [errorExcel, setErrorExcel] = useState(null);

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
                const filtered = Array.isArray(data.consultas)
                    ? data.consultas.filter(
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
    
        // Handler para exportar comentarios a Excel/CSV usando ExcelExporter
        const handleDownloadExcel = async () => {
            setLoadingExcel(true);
            setErrorExcel(null);
            setFooterMsg("Consulta terminada. Guardando libro de Excel.");
            try {
                const idConsulta = consulta === "" ? 0 : parseInt(consulta, 10);
                const params = {
                    idCartera: cartera,
                    idConsulta,
                    idProducto,
                    desde,
                    hasta,
                    jerarquia
                };
                const response = await getCommentsInformation(params);
                
                // Obtener nombre de la consulta para mensajes
                let nombreConsulta = "Comentarios";
                if (consulta !== "" && consulta !== 0) {
                    const consultaObj = consultasOptions.find(opt => String(opt.idConsulta) === String(consulta));
                    if (consultaObj?.nombreConsulta) nombreConsulta = consultaObj.nombreConsulta;
                }

                const result = await exportFromAPIResponse(
                    response,
                    `comentarios_${desde}_a_${hasta}`,
                    {
                        consultaName: nombreConsulta,
                        accountFields: ['cuenta'],
                        dateFields: ['fecha'],
                        showToast: true,
                        successMessage: "Libro de Excel Guardado."
                    }
                );

                if (result) {
                    setFooterMsg("Libro de Excel Guardado.");
                } else {
                    setFooterMsg("Consulta terminada sin registros.");
                }
            } catch (err) {
                console.error('Error al exportar comentarios:', err);
                setErrorExcel('Error al exportar los comentarios.');
                setFooterMsg("Ocurrió un error al guardar el libro de Excel.");
            } finally {
                setLoadingExcel(false);
            }
        };
    

    return (
        <div className="w-full flex flex-col items-center" style={{ minHeight: 0, height: 'auto' }}>
            <div className="w-full relative">
                {/* Cartera y Consulta en el mismo row */}
                <div className="flex flex-row gap-3 w-full mb-3">
                    {/* Cartera */}
                    <div className="relative w-1/2">
                        <select
                            className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                            value={cartera}
                            onChange={e => setCartera(e.target.value)}
                            id="cartera-select-comentarioso"
                        >
                                {carterasOptions.length === 0
                                ? <option value={cartera}>{`Cartera ${cartera}`}</option>
                                : carterasOptions.map((item) => (
                                <option key={item.id} value={item.id}>{item.nombre}</option>
                                ))
                            }
                        </select>
                        <label
                            htmlFor="cartera-select-comentarioso"
                            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                        >
                            Cartera
                        </label>
                    </div>
                    {/* Consulta */}
                    <div className="relative w-1/2">
                        <select
                            className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                            value={consulta}
                            onChange={e => setConsulta(e.target.value)}
                            id="consulta-select-comentarioso"
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
                            htmlFor="consulta-select-comentarioso"
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
                {/* Fechas */}
                <div className="flex gap-3 mb-3">
                    {/* Desde */}
                    <div className="relative w-full min-w-0">
                        <input
                            type="date"
                            id="fecha-desde-comments"
                            className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                            value={desde}
                            min={minDate}
                            max={maxDate}
                            onChange={e => setDesde(e.target.value)}
                            placeholder=" "
                        />
                        <label
                            htmlFor="fecha-desde-comments"
                            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                        >
                            Desde
                        </label>
                    </div>
                    {/* Hasta */}
                    <div className="relative w-full min-w-0">
                        <input
                            type="date"
                            id="fecha-hasta-comments"
                            className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                            value={hasta}
                            min={minDate}
                            max={maxDate}
                            onChange={e => setHasta(e.target.value)}
                            placeholder=" "
                        />
                        <label
                            htmlFor="fecha-hasta-comments"
                            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                        >
                            Hasta
                        </label>
                    </div>
                </div>
                <div className="flex justify-center items-end w-full">
                    <button
                        type="button"
                        className="btn-success w-full sm:w-auto min-w-[120px] max-w-full px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                        style={{ margin: '0 auto', display: 'block' }}
                        onClick={handleDownloadExcel}
                        disabled={loadingExcel}
                    >
                        {loadingExcel ? "Exportando..." : "Guardar Excel"}
                    </button>
                </div>
                {errorExcel && (
                    <div className="text-red-500 text-xs text-center mt-1">{errorExcel}</div>
                )}
            </div>
            {/* Footer informativo */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 52 }}>
                <span className="text-gray-600 text-sm pl-2">
                    {footerMsg}
                </span>
            </div>
        </div>
    );
}
export default CommentsContent;
