import React, { useState, useEffect } from "react";
import ConsorcioLogo from "../../../../../assets/logo_coorin_7.svg";
import { infoEjecutivo, getPaymentsInformation } from "../../../../../services/mark/albaz/LokiServices";
import { Toaster, toast } from "sonner";


const PaymentsContent = () => {
    // Obtener datos de usuario desde localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    const idCartera = userData?.idCartera || 0;
    const idProducto = userData?.idProducto ?? 0;
    const jerarquia = userData?.Jerarquía ?? 0;
    const idEjecutivo = userData?.idEjecutivo ?? null;


    // El valor mostrado en el dropdown es idCartera
    const [cartera, setCartera] = useState(idCartera);
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
    const [footerColor, setFooterColor] = useState("text-gray-600");

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

    // Función para consumir el endpoint y descargar el Excel
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
            const response = await getPaymentsInformation(params);
            // response.data es un Blob
            if (response && response.data instanceof Blob) {
                // Leer el contenido del blob como texto
                const text = await response.data.text();
                let csvContent = text;
                // Si parece JSON, convertir a CSV
                try {
                    const json = JSON.parse(text);
                    if (Array.isArray(json) && json.length > 0 && typeof json[0] === 'object') {
                        const headers = Object.keys(json[0]);
                        const rows = json.map(obj => headers.map(h => {
                            let value = obj[h];
                            // Formato especial para cada campo
                            if (h.toLowerCase() === 'cuenta' && typeof value === 'number') {
                                // Forzar a string para evitar notación científica
                                value = `'${value.toString()}`;
                            } else if (h.toLowerCase() === 'cuenta' && typeof value === 'string') {
                                value = `'${value}`;
                            }
                            if (h.toLowerCase() === 'fechapago' && typeof value === 'string') {
                                value = value.replace(/T00:00:00$/, '');
                            }
                            if (h.toLowerCase() === 'montopago' && value !== undefined && value !== null) {
                                value = `$${value}`;
                            }
                            // Quitar comas internas para no romper el CSV
                            if (typeof value === 'string') value = value.replace(/,/g, '');
                            return value;
                        }).join(","));
                        csvContent = headers.join(",") + "\n" + rows.join("\n");
                    }
                } catch (e) {
                    console.error('Error al convertir a CSV:', e);
                    // No es JSON, dejar como está
                }
                // Descargar como CSV limpio
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `pagos_${desde}_a_${hasta}.csv`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } else {
                setErrorExcel('No se pudo descargar el archivo.');
            }
    if (response && response.data instanceof Blob) {
        // ...descarga exitosa...
        setFooterMsg("Archivo descargado correctamente. Abre el archivo en Excel para visualizar los pagos.");
        setFooterColor("text-green-600");
    } else {
        setErrorExcel('No se pudo descargar el archivo.');
        setFooterMsg("No se pudo descargar el archivo de pagos o la descarga fue cancelada.");
        setFooterColor("text-red-600");
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
        setErrorExcel('Error al obtener los pagos.');
        setFooterMsg("No se pudo descargar el archivo de pagos.");
        setFooterColor("text-red-600");
    }
} finally {
    setLoadingExcel(false);
}
    };
    return (
        <div className="w-full max-w-xs mx-auto flex flex-col items-center" style={{ minHeight: 0, height: 'auto' }}>
            {/* Logo centrado arriba de Cartera */}
            <div className="flex justify-center mb-4 w-full">
                <img src={ConsorcioLogo} alt="Logo Coorin" className="h-20 w-20 object-contain mx-auto" />
            </div>
            <div className="w-full relative">
                {/* Cartera y Consulta en el mismo row */}
                <div className="flex flex-row gap-3 w-full mb-3">
                    {/* Cartera */}
                    <div className="relative w-1/2">
                        <select
                            className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                            value={cartera}
                            onChange={e => setCartera(e.target.value)}
                            id="cartera-select-payments"
                        >
                            <option value={idCartera}>{`Cartera ${idCartera}`}</option>
                        </select>
                        <label
                            htmlFor="cartera-select-payments"
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
                            id="consulta-select-payments"
                            disabled={loadingConsultas || errorConsultas}
                        >
                            <option value="0" className="text-gray-900">- Todas -</option>
                            {consultasOptions.map((item) => (
                                <option key={item.idConsulta || item.nombreConsulta} value={item.idConsulta} className="text-gray-900">
                                    {item.nombreConsulta}
                                </option>
                            ))}
                        </select>
                        <label
                            htmlFor="consulta-select-payments"
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
                    <div className="hs-input-group w-full">
                        <span className="hs-input-group-text min-w-[90px]">Desde</span>
                        <input
                            type="date"
                            className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            value={desde}
                            min="2016-01-01"
                            max={new Date().toISOString().slice(0, 10)}
                            onChange={e => setDesde(e.target.value)}
                        />
                    </div>
                    {/* Hasta */}
                    <div className="hs-input-group w-full">
                        <span className="hs-input-group-text min-w-[90px]">Hasta</span>
                        <input
                            type="date"
                            className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            value={hasta}
                            min="2016-01-01"
                            max={new Date().toISOString().slice(0, 10)}
                            onChange={e => setHasta(e.target.value)}
                        />
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
                        {loadingExcel ? "Descargando..." : "Guardar Excel"}
                    </button>
                </div>
                {errorExcel && (
                    <div className="text-red-500 text-xs text-center mt-1">{errorExcel}</div>
                )}
            </div>
            {/* Footer informativo */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 52 }}>
                <span className={`${footerColor} text-sm pl-2`}>{footerMsg}</span>
            </div>
            {showToast && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-yellow-200 text-yellow-800 border-l-4 border-yellow-500 px-4 py-2 rounded shadow-lg z-50 transition-all flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M4.93 19a10 10 0 1114.14 0H4.93z" /></svg>
                    <button className="ml-4 text-yellow-800 font-bold" onClick={() => setShowToast(false)}>Cerrar</button>
                </div>
            )}
        </div>
    );
};

export default PaymentsContent;
