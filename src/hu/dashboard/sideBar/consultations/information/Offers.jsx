import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { infoEjecutivo, getOffersInformation } from "../../../../../services/mark/albaz/LokiServices";
import { exportFromAPIResponse } from "../../../../../utils/ExcelExporter";


const OffersContent = ({ headerControlsActive = false }) => {

    // Obtener datos de usuario desde localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    const idCartera = userData?.idCartera || 0;
    const idProducto = userData?.idProducto ?? 0;
    const jerarquia = userData?.Jerarquía ?? 0;
    const idEjecutivo = userData?.idEjecutivo ?? null;


    // El valor mostrado en el dropdown es idCartera
    const [cartera, setCartera] = useState(idCartera);
    const [carterasOptions, setCarterasOptions] = useState([]);
    const [consulta, setConsulta] = useState("");
    const [desde, setDesde] = useState(new Date().toISOString().slice(0, 10));
    const [hasta, setHasta] = useState(new Date().toISOString().slice(0, 10));
    const [consultasOptions, setConsultasOptions] = useState([]);
    const [loadingConsultas, setLoadingConsultas] = useState(false);
    const [errorConsultas, setErrorConsultas] = useState(null);
    const [loadingExcel, setLoadingExcel] = useState(false);
    const [errorExcel, setErrorExcel] = useState(null);
    const [consultaSinRegistros, setConsultaSinRegistros] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [footerMsg, setFooterMsg] = useState("Elija la consulta de las cuentas que desee los pagos y el periodo de los pagos.");
    const [footerColor, setFooterColor] = useState("text-gray-600")
    // Eliminado: processAPIResponse ya no es necesario

    const minDate = "2016-01-01";
    const maxDate = new Date().toISOString().slice(0, 10);

    useEffect(() => {
        if (!idEjecutivo) return;
        setLoadingConsultas(true);
        setErrorConsultas(null);
        infoEjecutivo(idEjecutivo)
            .then((data) => {
                console.log('Respuesta infoEjecutivo:', data);
                // Filtrar por idCartera e idProducto sobre data.consultas
                let filtered = Array.isArray(data?.consultas)
                    ? data.consultas.filter(
                        (item) =>
                            String(item.idCartera) === String(idCartera) &&
                            String(item.idProducto) === String(idProducto)
                    )
                    : [];
                console.log('Consultas filtradas:', filtered);
                setConsultasOptions(filtered);
            })
            .catch((err) => {
                setErrorConsultas("Error al cargar las consultas");
                setConsultasOptions([]);
                console.error('Error en infoEjecutivo:', err);
            })
            .finally(() => setLoadingConsultas(false));
    }, [idCartera, idProducto, idEjecutivo]);

    // Función para consumir el endpoint y descargar el Excel usando ExcelExporter
    const handleDownloadExcel = async () => {
        setLoadingExcel(true);
        setErrorExcel(null);
        try {
            const idConsultaFinal = consulta === "" ? "0" : consulta;
            const params = {
                idCartera: cartera,
                idConsulta: idConsultaFinal,
                idProducto,
                desde,
                hasta,
                jerarquia
            };
            const response = await getOffersInformation(params);

            // Usar la función centralizada para exportar y mostrar toasts
            const result = await exportFromAPIResponse(
                response,
                `ofrecimientos_${desde}_a_${hasta}`,
                {
                    consultaName: "Ofrecimientos",
                    accountFields: ['cuenta'],
                    dateFields: ['fechaofrecimiento', 'fechaOfrecimiento'],
                    currencyFields: ['montoofrecimiento', 'montoOfrecimiento'],
                    showToast: true,
                    successMessage: "Archivo descargado correctamente. Abre el archivo en Excel para visualizar los ofrecimientos.",
                    errorMessage: "No se pudo descargar el archivo de ofrecimientos."
                }
            );
            if (result) {
                setFooterMsg("Archivo descargado correctamente. Abre el archivo en Excel para visualizar los ofrecimientos.");
                setFooterColor("text-green-600");
            } else {
                setConsultaSinRegistros(true);
                setFooterMsg("Consulta terminada sin registros");
                setFooterColor("text-black");
            }
        } catch (err) {
            const status = err?.response?.status;
            const statusText = err?.response?.statusText;
            if (status === 404 && statusText === "Not Found") {
                setConsultaSinRegistros(true);
                setErrorExcel(null);
                setFooterMsg("Consulta terminada sin registros");
                setFooterColor("text-black");
                toast.warning("Su consulta no cuenta con registros en la fecha especificada", {
                    duration: 4000,
                });
            } else {
                setConsultaSinRegistros(false);
                setErrorExcel('Error al obtener los ofrecimientos.');
                setFooterMsg("No se pudo descargar el archivo de ofrecimientos.");
                setFooterColor("text-red-600");
            }
        } finally {
            setLoadingExcel(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center" style={{ minHeight: 0, height: 'auto' }}>
            {headerControlsActive ? (
                <div className="w-full p-4 text-center">
                    {/* Espacio vacío - controles en header */}
                </div>
            ) : (
                <div className="w-full relative">
                    <div className="flex flex-row gap-3 w-full mb-3">
                        {/* Cartera */}
                        <div className="flex-1 min-w-0">
                            <select
                                className="block w-full bg-white border border-gray-200 rounded-lg p-2 pe-8 text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2"
                                value={cartera}
                                onChange={e => setCartera(e.target.value)}
                                id="cartera-select-ofrecimiento"
                            >
                                {carterasOptions.length === 0
                                    ? <option value={cartera}>{`Cartera ${cartera}`}</option>
                                    : carterasOptions.map((item) => (
                                        <option key={item.id} value={item.id}>{item.nombre}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* Consulta */}
                        <div className="flex-1 min-w-0">
                            <select
                                className="block w-full bg-white border border-gray-200 rounded-lg p-2 pe-8 text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2"
                                value={consulta}
                                onChange={e => setConsulta(e.target.value)}
                                id="consulta-select-ofrecimiento"
                                disabled={loadingConsultas || errorConsultas}
                            >
                                <option value="">- Todas -</option>
                                {consultasOptions.map((item) => (
                                    <option key={item.idConsulta || item.nombreConsulta} value={item.idConsulta}>
                                        {item.nombreConsulta}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Desde */}
                        <div className="flex-1 min-w-0">
                            <input
                                type="date"
                                id="fecha-desde-offers"
                                className="block w-full bg-white border border-gray-200 rounded-lg p-2 pe-8 text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1"
                                value={desde}
                                min={minDate}
                                max={maxDate}
                                onChange={e => setDesde(e.target.value)}
                            />
                        </div>
                        {/* Hasta */}
                        <div className="flex-1 min-w-0">
                            <input
                                type="date"
                                id="fecha-hasta-offers"
                                className="block w-full bg-white border border-gray-200 rounded-lg p-2 pe-8 text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1"
                                value={hasta}
                                min={minDate}
                                max={maxDate}
                                onChange={e => setHasta(e.target.value)}
                            />
                        </div>
                        {/* Botón */}
                        <div className="flex-1 min-w-0 flex justify-center">
                            <button
                                type="button"
                                className="btn-success w-full px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm hover:brightness-95 flex justify-center"
                                onClick={handleDownloadExcel}
                                disabled={loadingExcel}
                            >
                                {loadingExcel ? "Exportando..." : "Guardar Excel"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default OffersContent;
