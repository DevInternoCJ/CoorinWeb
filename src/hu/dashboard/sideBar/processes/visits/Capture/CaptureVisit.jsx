import React, { useState, useEffect } from "react";
import ConsorcioLogo from "../../../../../../assets/logo_coorin_7.svg";
import CapturaVisitsF2 from "../Capture/CapturaVisitsF2";
import CapturaVisitsF3 from "../Capture/CapturaVisitsF3";
import CapturaVisitsF4 from "../Capture/CapturaVisitsF4";
import CapturaVisitsF5 from "../Capture/CapturaVisitsF5";
import CapturaVisitsF6 from "../Capture/CapturaVisitsF6";
import CapturaVisitsF7 from "../Capture/CapturaVisitsF7";

const CaptureVisit = ({ mostrarTabla, setMostrarTabla }) => {
    // Obtener idCartera dinámico desde localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    const idCartera = userData?.idCartera || "";
    const [cartera, setCartera] = useState(idCartera);
    const [carterasOptions, setCarterasOptions] = useState([
        { id: "1", nombre: "Cartera 1" },
        { id: "2", nombre: "Cartera 2" }
    ]);
    const [porExpediente, setPorExpediente] = useState(false);
    const [customInput, setCustomInput] = useState("");
    const [idCuenta, setIdCuenta] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [footerMsg] = useState("Elija la consulta de las cuentas que desee las consultas y el periodo.");

    useEffect(() => {
        if (!porExpediente && idCuenta.length === 16) {
            setShowDropdown(true);
            if (typeof setMostrarTabla === "function") setMostrarTabla(true);
        } else {
            setShowDropdown(false);
            if (typeof setMostrarTabla === "function") setMostrarTabla(false);
        }
    }, [idCuenta, porExpediente, setMostrarTabla]);

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
                    {/* Row con todos los elementos */}
                    <div className="flex flex-col w-full px-[1vw] py-[0.5vw] sm:grid sm:grid-cols-12 sm:items-center sm:gap-0">
                        <div className="w-full flex justify-center mb-2 sm:col-span-1 sm:w-auto sm:mb-0 sm:block">
                            <img src={ConsorcioLogo} alt="Logo Coorin" className="h-[4vw] w-[4vw] min-h-[2.5rem] min-w-[2.5rem] object-contain" />
                        </div>
                        {/* Cartera: más pequeño, responsive */}
                        <div className="w-full flex flex-col items-center mb-2 sm:col-span-1 sm:w-[6.66vw] sm:mb-0">
                            <label htmlFor="cartera-select-carga-visits" className="text-sm font-medium mb-[0.25rem]">Cartera</label>
                            <select
                                className="peer p-[0.33rem] block w-full max-w-xs mx-auto bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2"
                                value={cartera}
                                onChange={e => setCartera(e.target.value)}
                                id="cartera-select-carga-visits"
                            >
                                <option value="">Seleccione cartera</option>
                                {carterasOptions.map((item) => (
                                    <option key={item.id} value={item.id}>{item.nombre}</option>
                                ))}
                            </select>
                        </div>
                        {/* Checkbox pegado a cartera, sin padding */}
                        <div className="w-full flex flex-col items-center justify-center mb-2 sm:col-span-1 sm:w-[6vw] sm:ml-[1vw] sm:mb-0">
                            <label htmlFor="porExpediente" className="text-sm font-medium mb-[0.25rem] text-center">Expte.</label>
                            <input
                                id="porExpediente"
                                type="checkbox"
                                checked={porExpediente}
                                onChange={e => setPorExpediente(e.target.checked)}
                                className="accent-jerarquia2 mt-[0.25rem]"
                            />
                        </div>
                        {/* Input Cuenta: más grande y separado del checkbox */}
                        <div className="w-full flex flex-col items-center justify-center mb-2 sm:col-span-3 sm:w-[8vw] sm:ml-[1vw] sm:mr-[-1vw] sm:mb-0">
                            <label htmlFor="cuentaInput" className="modal-span-1 whitespace-nowrap text-sm font-medium mb-[0.25rem]">
                                {porExpediente ? "Expediente:" : "Cuenta:"}
                            </label>
                            <input
                                id="cuentaInput"
                                type="text"
                                inputMode={porExpediente ? "text" : "numeric"}
                                pattern={porExpediente ? undefined : "[0-9]*"}
                                value={idCuenta}
                                maxLength={porExpediente ? undefined : 16}
                                onChange={e => {
                                    const valor = porExpediente ? e.target.value : e.target.value.replace(/\D/g, "");
                                    setIdCuenta(valor);
                                }}
                                placeholder={porExpediente ? "Ingrese el expediente" : "Ingrese el nú. de cuenta"}
                                style={{ padding: "0.33rem", border: idCuenta.length < 6 ? "0.125rem solid #e53e3e" : "0.125rem solid #d1d5db", borderRadius: "0.5rem", fontSize: "0.875rem" }}
                                className="w-full max-w-xs mx-auto"
                            />
                        </div>
                        {/* Dropdown extra: prioridad visual, ocupa el resto */}
                        <div className="w-full flex flex-col items-center justify-center mb-2 sm:col-span-6 sm:w-[28vw] sm:ml-[-1vw] sm:mb-0">
                            <label className="text-sm font-medium mb-[0.25rem]">Dirección</label>
                            <select className="p-[0.33rem] border border-gray-300 rounded-lg text-sm bg-gray-50 w-full max-w-lg mx-auto">
                                <option value="">Direcciones</option>
                                <option value="1">Opción 1</option>
                                <option value="2">Opción 2</option>
                            </select>
                        </div>
                    </div>
                {/* Campos y áreas debajo de los elementos principales reorganizados */}
                <div className="w-full flex flex-col gap-4 mb-6 mt-4">
                    <div className="flex flex-col w-full gap-4 sm:grid sm:grid-cols-2 sm:gap-4" style={{ gridTemplateColumns: '1fr 2fr' }}>
                        {/* F2 y F3 en columna 1, 1/3 exacto del modal */}
                        <div className="flex flex-col gap-4 w-full mb-4 sm:mb-0">
                            <CapturaVisitsF2 />
                            <CapturaVisitsF3 />
                        </div>
                        {/* F4 expandido arriba de F5 y F7, 2/3 exacto del modal */}
                        <div className="flex flex-col gap-4 w-full mb-4 sm:mb-0">
                            <CapturaVisitsF4 />
                            <div className="flex flex-col w-full gap-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                <div className="flex flex-col gap-4 mb-4 sm:mb-0">
                                    <CapturaVisitsF5 />
                                </div>
                                <div className="flex flex-col gap-4 mb-4 sm:mb-0">
                                    <CapturaVisitsF6 />
                                </div>
                                <div className="flex flex-col h-full justify-stretch mb-4 sm:mb-0">
                                    <CapturaVisitsF7 />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Botón Capturar centrado debajo de todos los F's */}
                <div className="w-full mt-4 flex justify-center">
                    <button
                        type="button"
                        className="btn-success w-full sm:w-auto sm:min-w-[120px] px-4 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                        onClick={() => {}}
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
                        <div className="flex flex-row w-full gap-4">
                            <div className="flex flex-col flex-1 min-w-[120px] max-w-xs">
                                <label htmlFor="cartera-select-carga-visits" className="text-sm font-medium mb-1">Cartera</label>
                                <select
                                    className="peer p-2 block w-full bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2"
                                    value={cartera}
                                    onChange={e => setCartera(e.target.value)}
                                    id="cartera-select-carga-visits"
                                >
                                    <option value="">Seleccione cartera</option>
                                    {carterasOptions.map((item) => (
                                        <option key={item.id} value={item.id}>{item.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col flex-1 items-center justify-start">
                                <label htmlFor="porExpediente" className="text-sm font-medium mb-1 text-center">Por Expediente</label>
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
                    <div className="w-full px-6 pb-4">
                        <div className="flex flex-row gap-4 w-full items-center">
                            <div className="flex flex-col flex-1 justify-center">
                                <label htmlFor="cuentaInput" className="modal-span-1 whitespace-nowrap text-sm font-medium mb-1">
                                    {porExpediente ? "Expediente:" : "Cuenta:"}
                                </label>
                                <div className="flex flex-row items-center gap-2 w-full">
                                    <input
                                        id="cuentaInput"
                                        type="text"
                                        inputMode={porExpediente ? "text" : "numeric"}
                                        pattern={porExpediente ? undefined : "[0-9]*"}
                                        value={idCuenta}
                                        maxLength={porExpediente ? undefined : 16}
                                        onChange={e => {
                                            const valor = porExpediente ? e.target.value : e.target.value.replace(/\D/g, "");
                                            setIdCuenta(valor);
                                        }}
                                        placeholder={porExpediente ? "Ingrese el expediente" : "Ingrese el número de cuenta"}
                                        style={{ padding: "0.5rem", border: idCuenta.length < 6 ? "2px solid #e53e3e" : "2px solid #d1d5db", borderRadius: "0.5rem", fontSize: "0.875rem" }}
                                        className="w-full max-w-md"
                                    />
                                    {showDropdown && (
                                        <select className="p-2 border border-gray-300 rounded-lg text-sm bg-gray-50">
                                            <option value="">Opciones</option>
                                            <option value="1">Opción 1</option>
                                            <option value="2">Opción 2</option>
                                        </select>
                                    )}
                                </div>
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
