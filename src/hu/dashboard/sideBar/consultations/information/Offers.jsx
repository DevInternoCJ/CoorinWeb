import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { infoEjecutivo, getOffersInformation } from "../../../../../services/mark/albaz/LokiServices";
import { exportFromAPIResponse } from "../../../../../utils/ExcelExporter";


const OffersContent = () => {

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
        const toastId = toast.loading(`Exportando ofrecimientos...`);
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
                toast.success("Archivo descargado correctamente. Abre el archivo en Excel para visualizar los ofrecimientos.");
            } else {
                setConsultaSinRegistros(true);
                toast.warning("Consulta terminada sin registros");
            }
        } catch (err) {
            const status = err?.response?.status;
            const statusText = err?.response?.statusText;
            if (status === 404 && statusText === "Not Found") {
                setConsultaSinRegistros(true);
                setErrorExcel(null);
                toast.warning("Consulta terminada sin registros");
                toast.warning("Su consulta no cuenta con registros en la fecha especificada", {
                    duration: 4000,
                });
            } else {
                setConsultaSinRegistros(false);
                setErrorExcel('Error al obtener los ofrecimientos.');
                toast.error("No se pudo descargar el archivo de ofrecimientos.");
            }
        } finally {
            setLoadingExcel(false);
            toast.dismiss(toastId);
        }
    };

    return (
        <div className="w-full relative">
            {/* xl y 2xl: 1 fila, 5 columnas */}
            <div className="hidden xl:grid grid-cols-5 gap-3 w-full mb-3">
                <div className="relative w-full">
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={cartera}
                        onChange={e => setCartera(e.target.value)}
                        id="cartera-select-offers-xl"
                        disabled={loadingConsultas}
                    >
                        {carterasOptions.length === 0
                            ? <option value={cartera}>{`Cartera ${cartera}`}</option>
                            : carterasOptions.map((item) => (
                                <option key={item.id} value={item.id}>{item.nombre}</option>
                            ))
                        }
                    </select>
                    <label
                        htmlFor="cartera-select-offers-xl"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Cartera
                    </label>
                </div>
                <div className="relative w-full">
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={consulta}
                        onChange={e => setConsulta(e.target.value)}
                        id="consulta-select-offers-xl"
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
                        htmlFor="consulta-select-offers-xl"
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
                <div className="relative w-full min-w-0">
                    <input
                        type="date"
                        id="fecha-desde-offers-xl"
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={desde}
                        min={minDate}
                        max={maxDate}
                        onChange={e => setDesde(e.target.value)}
                        placeholder=" "
                    />
                    <label
                        htmlFor="fecha-desde-offers-xl"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                        Desde
                    </label>
                </div>
                <div className="relative w-full min-w-0">
                    <input
                        type="date"
                        id="fecha-hasta-offers-xl"
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={hasta}
                        min={minDate}
                        max={maxDate}
                        onChange={e => setHasta(e.target.value)}
                        placeholder=" "
                    />
                    <label
                        htmlFor="fecha-hasta-offers-xl"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                        Hasta
                    </label>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        className="btn-success w-full min-w-[120px] max-w-full px-6 py-1 text-base font-medium rounded-lg shadow-sm flex justify-center self-center"
                        style={{ margin: '0 auto', display: 'block', height: '32px' }}
                        onClick={handleDownloadExcel}
                        disabled={loadingExcel}
                    >
                        {loadingExcel ? "Exportando..." : "Guardar Excel"}
                    </button>
                </div>
            </div>
            {/* md: 3 filas, 2 col + 2 col + 1 col */}
            <div className="hidden md:grid xl:hidden w-full gap-3 mb-3">
                <div className="grid grid-cols-2 gap-3">
                    {/* Cartera */}
                    <div className="relative w-full">
                        <select
                            className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                            value={cartera}
                            onChange={e => setCartera(e.target.value)}
                            id="cartera-select-offers-md"
                        >
                            {carterasOptions.length === 0
                                ? <option value={cartera}>{`Cartera ${cartera}`}</option>
                                : carterasOptions.map((item) => (
                                    <option key={item.id} value={item.id}>{item.nombre}</option>
                                ))
                            }
                        </select>
                        <label
                            htmlFor="cartera-select-offers-md"
                            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                        >
                            Cartera
                        </label>
                    </div>
                    {/* Consulta */}
                    <div className="relative w-full">
                        <select
                            className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                            value={consulta}
                            onChange={e => setConsulta(e.target.value)}
                            id="consulta-select-offers-md"
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
                            htmlFor="consulta-select-offers-md"
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
                <div className="grid grid-cols-2 gap-3">
                    {/* Desde */}
                    <div className="relative w-full min-w-0">
                        <input
                            type="date"
                            id="fecha-desde-offers-md"
                            className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                            value={desde}
                            min={minDate}
                            max={maxDate}
                            onChange={e => setDesde(e.target.value)}
                            placeholder=" "
                        />
                        <label
                            htmlFor="fecha-desde-offers-md"
                            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                        >
                            Desde
                        </label>
                    </div>
                    {/* Hasta */}
                    <div className="relative w-full min-w-0">
                        <input
                            type="date"
                            id="fecha-hasta-offers-md"
                            className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                            value={hasta}
                            min={minDate}
                            max={maxDate}
                            onChange={e => setHasta(e.target.value)}
                            placeholder=" "
                        />
                        <label
                            htmlFor="fecha-hasta-offers-md"
                            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                        >
                            Hasta
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    <button
                        type="button"
                        className="btn-success w-full min-w-[120px] max-w-full px-6 py-1 text-base font-medium rounded-lg shadow-sm flex justify-center self-center"
                        style={{ margin: '0 auto', display: 'block', height: '32px' }}
                        onClick={handleDownloadExcel}
                        disabled={loadingExcel}
                    >
                        {loadingExcel ? "Exportando..." : "Guardar Excel"}
                    </button>
                </div>
            </div>
            {/* sm: 5 filas, 1 columna cada una */}
            <div className="grid md:hidden w-full grid-cols-1 gap-3 mb-3">
                <div className="relative w-full">
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={cartera}
                        onChange={e => setCartera(e.target.value)}
                        id="cartera-select-offers-sm"
                    >
                        {carterasOptions.length === 0
                            ? <option value={cartera}>{`Cartera ${cartera}`}</option>
                            : carterasOptions.map((item) => (
                                <option key={item.id} value={item.id}>{item.nombre}</option>
                            ))
                        }
                    </select>
                    <label
                        htmlFor="cartera-select-offers-sm"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Cartera
                    </label>
                </div>
                <div className="relative w-full">
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={consulta}
                        onChange={e => setConsulta(e.target.value)}
                        id="consulta-select-offers-sm"
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
                        htmlFor="consulta-select-offers-sm"
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
                <div className="relative w-full min-w-0">
                    <input
                        type="date"
                        id="fecha-desde-offers-sm"
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={desde}
                        min={minDate}
                        max={maxDate}
                        onChange={e => setDesde(e.target.value)}
                        placeholder=" "
                    />
                    <label
                        htmlFor="fecha-desde-offers-sm"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                        Desde
                    </label>
                </div>
                <div className="relative w-full min-w-0">
                    <input
                        type="date"
                        id="fecha-hasta-offers-sm"
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={hasta}
                        min={minDate}
                        max={maxDate}
                        onChange={e => setHasta(e.target.value)}
                        placeholder=" "
                    />
                    <label
                        htmlFor="fecha-hasta-offers-sm"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                        Hasta
                    </label>
                </div>
                <button
                    type="button"
                    className="btn-success w-full min-w-[120px] max-w-full px-6 py-1 text-base font-medium rounded-lg shadow-sm flex justify-center self-center"
                    style={{ margin: '0 auto', display: 'block', height: '32px' }}
                    onClick={handleDownloadExcel}
                    disabled={loadingExcel}
                >
                    {loadingExcel ? "Exportando..." : "Guardar Excel"}
                </button>
            </div>
        </div>
    );
};
export default OffersContent;
