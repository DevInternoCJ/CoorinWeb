import React, { useState, useEffect } from "react";
import { getAddressesCapture } from "../../../../../../services/mark/Orochi/LokiServices";
import { toast } from "sonner";
import ConsorcioLogo from "../../../../../../assets/logo_coorin_7.svg";
import CapturaVisitsF2 from "../Capture/CapturaVisitsF2";
import CapturaVisitsF3 from "../Capture/CapturaVisitsF3";
import CapturaVisitsF4 from "../Capture/CapturaVisitsF4";
import CapturaVisitsF5 from "../Capture/CapturaVisitsF5";
import CapturaVisitsF6 from "../Capture/CapturaVisitsF6";
import CapturaVisitsF7 from "../Capture/CapturaVisitsF7";

const CaptureVisit = ({ mostrarTabla, setMostrarTabla, tipoInformacion, cuentaData, setCuentaData }) => {
    // Obtener idCartera dinámico desde localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    const idCartera = userData?.idCartera || "";
    const [cartera, setCartera] = useState(idCartera);
    const [carterasOptions, setCarterasOptions] = useState([
        { id: "1", nombre: "Cartera 1" },
        { id: "2", nombre: "Cartera 2" }
    ]);
    const [porExpediente, setPorExpediente] = useState(false);
    const [idCuenta, setIdCuenta] = useState("");


    const [showDropdown, setShowDropdown] = useState(false);
    const [footerMsg] = useState("Elija la consulta de las cuentas que desee las consultas y el periodo.");
    // Estado para datos de cuenta obtenidos
    // cuentaData y setCuentaData ahora vienen del padre (CoorinDashboard)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Estado para dirección seleccionada
    const [direccionSeleccionada, setDireccionSeleccionada] = useState("");

        // Limpiar input cada vez que cambia el checkbox (a true o false)
        useEffect(() => {
            setIdCuenta("");
        }, [porExpediente]);

    // Lógica para mostrar el modal expandido si la cuenta es válida
    useEffect(() => {
        // Ya no se requiere validación de 16 dígitos para expandir modal
        setShowDropdown(false);
    }, [idCuenta, porExpediente, setMostrarTabla]);

    // Función para consultar el endpoint y guardar en localStorage
    // Controlar el estado de expansión solo desde aquí
    const handleBuscarCuenta = async () => {
        setLoading(true);
        setError(null);
        let expandir = false;
        try {
            const cuentaOrExpedienteStr = String(porExpediente ? idCuenta : parseInt(idCuenta, 10));
            let res;
            try {
                res = await getAddressesCapture(
                    cartera,
                    cuentaOrExpedienteStr,
                    porExpediente
                );
            } catch (err) {
                console.error("Error al llamar a getAddressesCapture:", err);
                setCuentaData(null);
                localStorage.removeItem("cuentaDataCapturaVisita");
                expandir = false;
                toast.error("La cuenta a la que desean acceder no existe, verifíquela por favor");
                setLoading(false);
                if (typeof setMostrarTabla === "function") setMostrarTabla(false);
                return;
            }
            if (res && res.status === 200 && res.data && res.data.cuenta) {
                // Guardar el tipo de búsqueda exitosa
                const enrichedData = { ...res.data, _busquedaPorExpediente: porExpediente };
                setCuentaData(enrichedData);
                localStorage.setItem("cuentaDataCapturaVisita", JSON.stringify(enrichedData));
                expandir = true;
            } else {
                setCuentaData(null);
                localStorage.removeItem("cuentaDataCapturaVisita");
                expandir = false;
                toast.error("La cuenta a la que desean acceder no existe, verifíquela por favor");
            }
        } finally {
            setLoading(false);
            // Solo aquí se controla el modo expansivo
            if (typeof setMostrarTabla === "function") setMostrarTabla(expandir);
        }
    };

    // Puedes usar modalSize para cambiar la clase/tamaño del modal si el componente padre lo permite

    return (
        <div
            className={mostrarTabla
                ? "w-[73.33vw] max-w-[1016px] flex flex-col items-center mx-auto"
                : "w-[366px] max-w-full flex flex-col items-center mx-auto"
            }
            style={{ minHeight: 0, height: 'auto' }}
        >
            {/* Layout dinámico según mostrarTabla (modal expandido) */}
            {mostrarTabla ? (
                <>
                    {/* Header con título arriba y logo alineado a la izquierda */}
                    <div className="w-full px-[1vw] pt-[0.5vw] pb-2">
                        <h2 className="text-lg font-semibold text-jerarquia3 truncate">{tipoInformacion}</h2>
                    </div>
                    <div className="flex flex-col w-full sm:grid sm:grid-cols-12 sm:items-center sm:gap-0 px-[1vw]">
                        {/* Logo alineado a la izquierda */}
                        <div className="w-full flex justify-center mb-2 sm:col-span-1 sm:w-auto sm:mb-0 sm:block">
                            <img src={ConsorcioLogo} alt="Logo Coorin" className="h-[2.5rem] w-[2.5rem] object-contain" />
                        </div>
                        {/* Cartera: más pequeño, responsive */}
                        <div className="relative w-full min-w-0 flex flex-col items-center mb-2 sm:col-span-1 sm:w-[6.66vw] sm:mb-0">
                            <select
                                className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                value={cartera}
                                onChange={e => setCartera(e.target.value)}
                                id="cartera-select-carga-visits"
                            >
                                <option value="" hidden></option>
                                {carterasOptions.map((item) => (
                                    <option key={item.id} value={item.id}>{item.nombre}</option>
                                ))}
                            </select>
                            <label htmlFor="cartera-select-carga-visits" className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500">Cartera</label>
                        </div>
                        <div className="w-full flex flex-col items-center justify-center mb-2 sm:col-span-1 sm:w-[6vw] sm:ml-[1vw] sm:mb-0">
                            <label htmlFor="porExpediente" className="text-sm font-medium mb-[0.25rem] text-center flex items-center justify-center h-full">Expte.</label>
                            <input
                                id="porExpediente"
                                type="checkbox"
                                checked={porExpediente}
                                onChange={e => setPorExpediente(e.target.checked)}
                                className="accent-jerarquia2 mt-[0.25rem]"
                                title="cambia a Expediente"
                            />
                        </div>
                        <div className="relative w-full min-w-0 flex flex-col items-center justify-center mb-2 sm:col-span-3 sm:w-[8vw] sm:ml-[1vw] sm:mr-[-1vw] sm:mb-0">
                            <input
                                id="cuentaInput"
                                type="text"
                                inputMode={porExpediente ? "text" : "numeric"}
                                pattern={porExpediente ? undefined : "[0-9]*"}
                                value={idCuenta}
                                maxLength={porExpediente ? 12 : 16}
                                onChange={e => {
                                    let valor = e.target.value;
                                    if (porExpediente) {
                                        // Permitir solo hasta 12 caracteres alfanuméricos
                                        valor = valor.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12);
                                    } else {
                                        valor = valor.replace(/\D/g, "").slice(0, 16);
                                    }
                                    setIdCuenta(valor);
                                }}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        handleBuscarCuenta();
                                    }
                                }}
                                placeholder=" "
                                style={{ color: 'var(--color-jerarquia3)' }}
                                className="peer p-4 block min-w-[150px] w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia4 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                title="Enter"
                            />
                            <label htmlFor="cuentaInput" className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500">
                                {porExpediente ? "Expediente:" : "Cuenta:"}
                            </label>
                        </div>
                        {/* Dirección - dropdown animado */}
                        <div className="relative w-full max-w-lg flex flex-col items-center justify-center mb-2 sm:col-span-6 sm:w-[28vw] sm:ml-[-1vw] sm:mb-0">
                            <select
                                title="Selecciona alguno"
                                className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                value={direccionSeleccionada}
                                onChange={e => setDireccionSeleccionada(e.target.value)}
                            >
                                <option value="" hidden></option>
                                {cuentaData && Array.isArray(cuentaData.domicilios) && cuentaData.domicilios.length > 0 &&
                                    cuentaData.domicilios.map((dom, idx) => (
                                        <option key={idx} value={dom.domicilio}>{dom.domicilio}</option>
                                    ))
                                }
                            </select>
                            <label className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500">Dirección</label>
                        </div>
                    </div>
                    {/* Campos y áreas debajo de los elementos principales reorganizados */}
                    <div
                        className="w-full flex flex-col gap-4 mb-6 mt-4"
                        style={direccionSeleccionada ? {} : { pointerEvents: 'none', opacity: 0.6 }}
                        onClick={e => {
                            if (!direccionSeleccionada) {
                                e.stopPropagation();
                                toast.warning("Primero selecciona un domicilio antes de continuar");
                            }
                        }}
                    >
                        <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 mb-4 w-full">
                            <div className="w-full sm:flex-1 min-w-0"><CapturaVisitsF2 /></div>
                            <div className="w-full sm:flex-[2] min-w-0"><CapturaVisitsF4 /></div>
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 w-full">
                            <div className="w-full sm:flex-1 min-w-0"><CapturaVisitsF3 /></div>
                            <div className="w-full sm:basis-1/4 min-w-0"><CapturaVisitsF5 /></div>
                            <div className="w-full sm:basis-1/6 min-w-0"><CapturaVisitsF6 /></div>
                            <div className="w-full sm:basis-1/4 min-w-0"><CapturaVisitsF7 /></div>
                        </div>
                    </div>
                    <div className="w-full mt-4 flex justify-center">
                        <button
                            type="button"
                            className={`btn-success w-full sm:w-auto sm:min-w-[120px] px-4 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center ${!direccionSeleccionada ? 'opacity-60 cursor-not-allowed' : ''}`}
                            disabled={!direccionSeleccionada}
                            onClick={e => {
                                if (!direccionSeleccionada) {
                                    e.preventDefault();
                                    toast.warning("Primero selecciona un domicilio antes de continuar");
                                    return;
                                }
                                // Aquí va la lógica real de captura
                            }}
                        >
                            Capturar
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {/* Layout original (modal pequeño) */}
                    <div className="flex flex-row items-center gap-6 w-full px-6 py-4">
                        <div className="flex-shrink-0">
                            <img src={ConsorcioLogo} alt="Logo Coorin" className="h-20 w-20 object-contain mx-auto" />
                        </div>
                        <div className="flex flex-col flex-1 justify-center">
                            <h2 className="text-lg font-semibold text-jerarquia3 truncate mb-2">{tipoInformacion}</h2>
                            <div className="flex flex-row w-full gap-4">
                                {/* Cartera - dropdown animado modal pequeño */}
                                <div className="relative flex-1 min-w-[120px] min-w-0">
                                    <select
                                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                        value={cartera}
                                        onChange={e => setCartera(e.target.value)}
                                        id="cartera-select-carga-visits"
                                    >
                                        <option value="" hidden></option>
                                        {carterasOptions.map((item) => (
                                            <option key={item.id} value={item.id}>{item.nombre}</option>
                                        ))}
                                    </select>
                                    <label htmlFor="cartera-select-carga-visits" className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500">Cartera</label>
                                </div>
                                <div className="flex flex-col flex-1 items-center justify-start">
                                    <label htmlFor="porExpediente" className="text-sm font-medium mb-1 text-center flex items-center justify-center h-full">Expdte.</label>
                                    <input
                                        id="porExpediente"
                                        type="checkbox"
                                        checked={porExpediente}
                                        onChange={e => setPorExpediente(e.target.checked)}
                                        className="accent-jerarquia2 mt-1"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-6 pb-4">
                        <div className="flex flex-row gap-4 w-full items-center">
                            {/* Cuenta/Expediente - input animado modal pequeño */}
                            <div className="relative flex-1 justify-center">
                                <input
                                    id="cuentaInput"
                                    type="text"
                                    inputMode={porExpediente ? "text" : "numeric"}
                                    pattern={porExpediente ? undefined : "[0-9]*"}
                                    value={idCuenta}
                                    maxLength={porExpediente ? 12 : 16}
                                    onChange={e => {
                                        let valor = e.target.value;
                                        if (porExpediente) {
                                            // Permitir solo hasta 12 caracteres alfanuméricos
                                            valor = valor.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12);
                                        } else {
                                            valor = valor.replace(/\D/g, "").slice(0, 16);
                                        }
                                        setIdCuenta(valor);
                                    }}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            handleBuscarCuenta();
                                        }
                                    }}
                                    placeholder=" "
                                    style={{ color: 'var(--color-jerarquia3)' }}
                                    className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                />
                                <label htmlFor="cuentaInput" className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500">
                                    {porExpediente ? "Expediente:" : "Cuenta:"}
                                </label>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {/* Footer informativo */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 12 }}>
                <span className="text-gray-600 text-sm pl-2">
                    {footerMsg}
                </span>
            </div>
        </div>
    );
};

export default CaptureVisit;
