import React, { useState, useEffect } from "react";
// import ExcelDownloader from "./ExcelDownloader";
import ConsorcioLogo from "../../../../../assets/logo_coorin_5.svg";
import { toast } from "sonner";

import { historySingle, historyArchivoUpload } from "../../../../../services/LokiServices";


async function fetchHistorySingle(params) {
    // Construir el body según los parámetros recibidos
    const body = {
        idCartera: params.idCartera,
        incluirCuenta: params.incluirCuenta,
        incluirNegociaciones: params.incluirNegociaciones,
        incluirVisitas: params.incluirVisitas,
        incluirGestiones: params.incluirGestiones,
        incluirAccionamientos: params.incluirAccionamientos,
        incluirPagos: params.incluirPagos,
        usarPeriodo: params.usarPeriodo,
        fechaDesde: params.usarPeriodo ? params.fechaDesde : null,
        fechaHasta: params.usarPeriodo ? params.fechaHasta : null,
        cuenta: params.cuenta || null
    };
    // Llamar al endpoint con el body
    return await historySingle(body);
}

const ModalConsultaHistoricosFiltros = ({ onIndividualChange }) => {
    const [tipoSeleccionado, setTipoSeleccionado] = useState(null); // null: ninguno, true: individual, false: archivo
    const [isIndividual, setIsIndividual] = useState(null);
    const [idCuenta, setIdCuenta] = useState("");
    const [checkedItems, setCheckedItems] = useState({
        cuenta: true,
        gestiones: false,
        visitas: false,
        negociaciones: false,
        accionamientos: false,
        pagos: false
    });
    const [periodo, setPeriodo] = useState(true);
    const [fechaDesde, setFechaDesde] = useState(() => {
        const hoy = new Date();
        const mesAtras = new Date(hoy);
        mesAtras.setMonth(hoy.getMonth() - 1);
        const dd = String(mesAtras.getDate()).padStart(2, '0');
        const mm = String(mesAtras.getMonth() + 1).padStart(2, '0');
        const yyyy = mesAtras.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    });
    const [fechaHasta, setFechaHasta] = useState(() => {
        const hoy = new Date();
        const dd = String(hoy.getDate()).padStart(2, '0');
        const mm = String(hoy.getMonth() + 1).padStart(2, '0');
        const yyyy = hoy.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    });

    const handleCheckboxChange = (item) => {
        setCheckedItems(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    const [excelBlob, setExcelBlob] = useState(null);
    const [archivo, setArchivo] = useState(null);
    const [cuentaError, setCuentaError] = useState("");
    const [showToast, setShowToast] = useState(false);

    // Descargar el archivo Excel cuando excelBlob cambie
    useEffect(() => {
        if (excelBlob) {
            const fileName = isIndividual ? `historico_${idCuenta}.xlsx` : `historico_archivo.xlsx`;
            const url = window.URL.createObjectURL(excelBlob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            setExcelBlob(null);
        }
    }, [excelBlob, isIndividual, idCuenta]);

    // Ocultar el toast automáticamente después de 2 segundos
    useEffect(() => {
        if (showToast && cuentaError) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showToast, cuentaError]);

    // Bandera para evitar petición individual al cambiar de modo
    const [allowSubmit, setAllowSubmit] = useState(true);

    const handleBuscar = async () => {
        if (isIndividual) {
            if (!allowSubmit) return;
            // Validación antes de enviar
            if (!idCuenta || idCuenta.length < 6) {
                toast.warning("Ingrese un número de cuenta válido (mínimo 6 dígitos)");
                return;
            }
            const checkboxesValidos = Object.entries(checkedItems)
                .filter(([key]) => key !== "periodo")
                .some(([_, checked]) => checked);
            if (!checkboxesValidos) {
                toast.warning("Seleccione al menos un tipo de consulta");
                return;
            }
            try {
                const userData = JSON.parse(localStorage.getItem("userData"));
                const idCartera = userData?.idCartera || 1;
                const formatFecha = (fecha) => {
                    if (!fecha) return null;
                    const [dia, mes, anio] = fecha.split("/");
                    return `${anio}-${mes}-${dia}`;
                };
                const params = {
                    idCartera,
                    incluirCuenta: checkedItems.cuenta,
                    incluirNegociaciones: checkedItems.negociaciones,
                    incluirVisitas: checkedItems.visitas,
                    incluirGestiones: checkedItems.gestiones,
                    incluirAccionamientos: checkedItems.accionamientos,
                    incluirPagos: checkedItems.pagos,
                    usarPeriodo: periodo,
                    fechaDesde: periodo ? formatFecha(fechaDesde) : null,
                    fechaHasta: periodo ? formatFecha(fechaHasta) : null,
                    cuenta: idCuenta || null
                };
                console.log("Body enviado al endpoint:", params);
                const result = await fetchHistorySingle(params);
                if (result?.data && result.data.size === 0) {
                    toast.warning("La cuenta ingresada no existe");
                    setExcelBlob(null);
                    return;
                }
                setExcelBlob(result.data);
            } catch (error) {
                console.error("Error al consultar histórico individual:", error);
                toast.error("Error al consultar histórico individual");
            }
        }
    };

    const handleTipoSeleccion = (individual) => {
        setAllowSubmit(false); // Evita submit al cambiar
        setIsIndividual(individual);
        onIndividualChange(individual);
        // Función para obtener fecha un mes atrás en formato DD/MM/YYYY
        const getFechaMesAtras = () => {
            const hoy = new Date();
            const mesAtras = new Date(hoy);
            mesAtras.setMonth(hoy.getMonth() - 1);
            const dd = String(mesAtras.getDate()).padStart(2, '0');
            const mm = String(mesAtras.getMonth() + 1).padStart(2, '0');
            const yyyy = mesAtras.getFullYear();
            return `${dd}/${mm}/${yyyy}`;
        };
        // Función para obtener fecha actual en formato DD/MM/YYYY
        const getFechaActual = () => {
            const hoy = new Date();
            const dd = String(hoy.getDate()).padStart(2, '0');
            const mm = String(hoy.getMonth() + 1).padStart(2, '0');
            const yyyy = hoy.getFullYear();
            return `${dd}/${mm}/${yyyy}`;
        };
    setArchivo(null);
    setExcelBlob(null);
        if (individual) {
            setIdCuenta("");
            setCheckedItems(prev => ({
                ...prev,
                cuenta: true,
                gestiones: false,
                visitas: false,
                negociaciones: false,
                accionamientos: false,
                pagos: false
            }));
            setPeriodo(true);
            setFechaDesde(getFechaMesAtras());
            setFechaHasta(getFechaActual());
        } else {
            setIdCuenta("");
            setCheckedItems(prev => ({
                ...prev,
                cuenta: false,
                gestiones: false,
                visitas: false,
                negociaciones: false,
                accionamientos: false,
                pagos: false
            }));
            setPeriodo(true);
            setFechaDesde(getFechaMesAtras());
            setFechaHasta(getFechaActual());
        }
        setTimeout(() => setAllowSubmit(true), 100); // Reactiva submit tras cambio
    };

    return (
        <div style={{ minWidth: "400px", paddingRight: "1rem" }}>
            {/* Logo del Consorcio */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
                <img src={ConsorcioLogo} alt="Consorcio Jurídico" style={{ height: "60px", objectFit: "contain" }} />
            </div>

            {/* Sección Cartera */}
            <div style={{ marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                    <label className="modal-span-1">Cartera:</label>
                    <span className="modal-span-2">American Express</span>
                </div>
            </div>

            {/* Radio buttons Individual/Archivo */}
            <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                        <input
                            type="radio"
                            name="tipo"
                            checked={isIndividual === true}
                            onChange={function(){ setTipoSeleccionado(true); handleTipoSeleccion(true); }}
                            className="modal-radio"
                        />
                        <span className="modal-span-2">Individual</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                        <input
                            type="radio"
                            name="tipo"
                            checked={isIndividual === false}
                            onChange={function(){ setTipoSeleccionado(false); handleTipoSeleccion(false); }}
                            className="modal-radio"
                        />
                        <span className="modal-span-2">Archivo</span>
                    </label>
                </div>
            </div>

            {/* Mostrar el resto solo si se seleccionó un radio button */}
            {tipoSeleccionado !== null && (
                <>
                    {/* Checkboxes de tipos de consulta */}
                    <div style={{ marginBottom: "1.5rem" }}>
                        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: isIndividual ? "center" : "flex-start" }}>
                            {Object.entries(checkedItems).map(([key, checked]) => (
                                <label key={key} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => handleCheckboxChange(key)}
                                        className="modal-checkbox"
                                    />
                                    <span className="modal-span-2 capitalize">
                                        {key === "accionamientos" ? "Accionamientos" : key}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Período */}
                    <div style={{ marginBottom: "1.5rem" }}>
                        <div style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center" }}>
                            {/* Checkbox Período */}
                            <div style={{ minWidth: "80px" }}>
                                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                                    <input
                                        type="checkbox"
                                        checked={periodo}
                                        onChange={() => setPeriodo(!periodo)}
                                        className="modal-checkbox"
                                    />
                                    <span className="modal-span-1">Período</span>
                                </label>
                            </div>
                            {/* Campos de fecha */}
                            {periodo && (
                                <>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <label className="modal-span-2 whitespace-nowrap">Desde:</label>
                                        <input
                                            type="date"
                                            value={fechaDesde.split('/').reverse().join('-')}
                                            onChange={(e) => setFechaDesde(e.target.value.split('-').reverse().join('/'))}
                                            className="w-32 px-2 py-1 text-sm bg-white border border-black rounded focus:outline-none focus:border-[var(--color-jerarquia3)] cursor-pointer calendar-input"
                                            style={{ fontSize: "14px", color: "#000000", colorScheme: "light" }}
                                        />
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <label className="modal-span-2 whitespace-nowrap">Hasta:</label>
                                        <input
                                            type="date"
                                            value={fechaHasta.split('/').reverse().join('-')}
                                            onChange={(e) => setFechaHasta(e.target.value.split('-').reverse().join('/'))}
                                            className="w-32 px-2 py-1 text-sm bg-white border border-black rounded focus:outline-none focus:border-[var(--color-jerarquia3)] cursor-pointer calendar-input"
                                            style={{ fontSize: "14px", color: "#000000", colorScheme: "light" }}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Campo de cuenta individual */}
                    {isIndividual && (
                        <>
                            <div style={{ marginBottom: "1.5rem" }}>
                                <div style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center" }}>
                                    <label className="modal-span-1 whitespace-nowrap">Cuenta:</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={idCuenta}
                                        onChange={(e) => {
                                            const valor = e.target.value.replace(/\D/g, "");
                                            setIdCuenta(valor);
                                            setExcelBlob(null);
                                        }}
                                        placeholder="Ingrese el número de cuenta"
                                        style={{ flex: 1, padding: "0.5rem", border: idCuenta.length < 6 ? "2px solid #e53e3e" : "2px solid #d1d5db", borderRadius: "0.5rem", fontSize: "0.875rem", minWidth: "610px" }}
                                    />
                                    <button
                                        onClick={handleBuscar}
                                        className="modal-btn modal-btn-primary"
                                        style={{ whiteSpace: "nowrap" }}
                                        disabled={!idCuenta || idCuenta.length < 6 || !Object.entries(checkedItems).filter(([key]) => key !== "periodo").some(([, checked]) => checked)}
                                    >
                                        Buscar
                                    </button>
                                </div>
                            </div>
                            {/* Descarga automática del Excel ahora se realiza por useEffect */}
                        </>
                    )}

                    {/* Input file oculto y botón Seleccionar para modo Archivo */}
                    {!isIndividual && (
                        <div style={{ marginBottom: "1.5rem" }}>
                            <div style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "flex-end" }}>
                                <input
                                    type="file"
                                    accept=".xlsx,.xls"
                                    id="archivoInput"
                                    style={{ display: "none" }}
                                    onChange={async (e) => {
                                        const archivoSeleccionado = e.target.files[0];
                                        if (archivoSeleccionado) {
                                            setArchivo(archivoSeleccionado);
                                            setExcelBlob(null);
                                            
                                            // Ejecutar automáticamente el endpoint historyArchivoUpload
                                            try {
                                                const userData = JSON.parse(localStorage.getItem("userData"));
                                                const idCartera = userData?.idCartera || 1;
                                                
                                                const formatFecha = (fecha) => {
                                                    if (!fecha) return null;
                                                    const [dia, mes, anio] = fecha.split("/");
                                                    return `${anio}-${mes}-${dia}`;
                                                };
                                                
                                                const body = {
                                                    Archivo: archivoSeleccionado,
                                                    IdCartera: idCartera,
                                                    IncluirCuenta: checkedItems.cuenta,
                                                    IncluirNegociaciones: checkedItems.negociaciones,
                                                    IncluirVisitas: checkedItems.visitas,
                                                    IncluirGestiones: checkedItems.gestiones,
                                                    IncluirAccionamientos: checkedItems.accionamientos,
                                                    IncluirPagos: checkedItems.pagos,
                                                    UsarPeriodo: periodo
                                                };
                                                
                                                // Solo incluir las fechas si UsarPeriodo es true
                                                if (periodo) {
                                                    body.FechaDesde = formatFecha(fechaDesde);
                                                    body.FechaHasta = formatFecha(fechaHasta);
                                                }
                                                
                                                console.log("Body enviado al endpoint archivo:", body);
                                                const result = await historyArchivoUpload(body);
                                                
                                                console.log("Respuesta del endpoint:", result);
                                                
                                                // Manejar la respuesta según lo que devuelva el servidor
                                                if (result?.data) {
                                                    // Crear blob directamente del ArrayBuffer
                                                    const excelBlob = new Blob([result.data], {
                                                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                                                    });
                                                    
                                                    // Verificar que el blob tenga contenido
                                                    if (excelBlob.size === 0) {
                                                        toast.warning("El archivo no contiene cuentas válidas");
                                                        return;
                                                    }
                                                    
                                                    // Descargar automáticamente
                                                    const fileName = `historico_archivo_${new Date().toISOString().slice(0,10)}.xlsx`;
                                                    const url = window.URL.createObjectURL(excelBlob);
                                                    const link = document.createElement("a");
                                                    link.href = url;
                                                    link.setAttribute("download", fileName);
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    link.remove();
                                                    window.URL.revokeObjectURL(url);
                                                    
                                                    toast.success("Archivo procesado y descargado correctamente");
                                                    console.log("Archivo procesado exitosamente");
                                                } else {
                                                    toast.warning("El archivo no pudo ser procesado");
                                                }
                                                
                                            } catch (error) {
                                                console.error("Error al consultar histórico por archivo:", error);
                                                toast.error("Error al consultar histórico por archivo");
                                            }
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    className="modal-btn modal-btn-primary"
                                    style={{ whiteSpace: "nowrap" }}
                                    onClick={() => {
                                        const algunoSeleccionado = Object.entries(checkedItems)
                                            .filter(([key]) => ["cuenta","gestiones","visitas","negociaciones","accionamientos","pagos"].includes(key))
                                            .some(([, checked]) => checked);
                                        if (!algunoSeleccionado) {
                                            toast.warning("Debe seleccionar al menos un tipo de histórico");
                                            return;
                                        }
                                        document.getElementById('archivoInput').click();
                                    }}
                                    disabled={
                                        !Object.entries(checkedItems)
                                            .filter(([key]) => ["cuenta","gestiones","visitas","negociaciones","accionamientos","pagos"].includes(key))
                                            .some(([, checked]) => checked)
                                    }
                                >
                                    Seleccionar
                                </button>
                                {/* Mostrar nombre del archivo seleccionado, sin mensaje extra */}
                                {archivo && (
                                    <span style={{ marginLeft: "1rem", fontSize: "0.9rem" }}>{archivo.name}</span>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Mensaje del footer */}
        </div>
    );
};

export default ModalConsultaHistoricosFiltros;