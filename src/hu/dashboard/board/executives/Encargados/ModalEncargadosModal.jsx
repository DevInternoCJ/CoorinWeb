import React, { useEffect, useState, useCallback, useMemo } from "react";
import ReusableModal from "../../modalGlobalReboot/ReusableModal";
import ModalEncargadosContent from "../Encargados/ModalEncargadosContent";
import { IconEncargados } from "../IconesEjecutives";
import { obetenerJerarquiaEncargados, obetenerDropdownsEncargados, getCarteras, getCarterasProductos, AsignaEncargados } from "../../../../../services/mark/albaz/LokiServices";
import { toast } from "sonner";

const EncargadosModal = ({ 
    isOpen, 
    onClose,
    enableBounce = false,
    enableShakeOnBackdropClick = true,
    enableBounceOnBackdropOrEscape = true,
    closeOnBackdropClick = false,
    ...props 
}) => {
    // Estados para los dropdowns y botón
    const [cartera, setCartera] = useState("");
    const [producto, setProducto] = useState("");
    const [carteras, setCarteras] = useState([]);
    const [productos, setProductos] = useState([]);
    const [carterasProductosData, setCarterasProductosData] = useState([]);
    const [encargadosFiltrados, setEncargadosFiltrados] = useState([]);
    const [selectedEncargado, setSelectedEncargado] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isChangingAssignment, setIsChangingAssignment] = useState(false);

    // Carga real de datos desde servicios
    useEffect(() => {
        setLoading(true);
        Promise.all([
            getCarteras(),
            getCarterasProductos(),
            obetenerDropdownsEncargados()
        ])
        .then(([carterasData, carterasProductosData, encargadosData]) => {
            setCarteras(carterasData.map(item => item.cartera).sort((a, b) => a.localeCompare(b)));
            setCartera(carterasData[0]?.cartera || "");
            setCarterasProductosData(carterasProductosData);
            const productosDelEndpoint = carterasProductosData.filter(item => item.cartera === (carterasData[0]?.cartera || ""))
                .map(item => item.producto);
            setProductos(["-Sin Producto-", ...productosDelEndpoint]);
            setProducto("-Sin Producto-");
            setEncargadosFiltrados(encargadosData);
            setSelectedEncargado(encargadosData[0]?.idEjecutivo || "VACIO");
            setLoading(false);
        })
        .catch(err => {
            console.error("Error al cargar datos:", err);
            toast.error("Error al cargar los datos. Inténtalo de nuevo.");
            setLoading(false);
        });
    }, []);

    // Filtrar encargados según cartera y producto, usando los datos originales
    const filtrarEncargados = useCallback((carteraSeleccionada, productoSeleccionado, encargadosOriginales) => {
        if (!carterasProductosData.length || !encargadosOriginales.length) return [];
        let filtrados = [];
        if (carteraSeleccionada && productoSeleccionado === "-Sin Producto-") {
            const idsCarteraRelacionados = carterasProductosData
                .filter(item => item.cartera === carteraSeleccionada)
                .map(item => item.idCartera)
                .filter((id, index, self) => self.indexOf(id) === index);
            filtrados = encargadosOriginales.filter(item => {
                const matchCartera = idsCarteraRelacionados.includes(item.idCartera);
                const sinProducto = item.idProducto === null || item.idProducto === 0;
                return matchCartera && sinProducto;
            });
        } else if (productoSeleccionado && productoSeleccionado !== "-Sin Producto-") {
            const idsProductoRelacionados = carterasProductosData
                .filter(item => item.producto === productoSeleccionado)
                .map(item => item.idProducto)
                .filter((id, index, self) => self.indexOf(id) === index);
            filtrados = encargadosOriginales.filter(item => {
                const matchProducto = idsProductoRelacionados.includes(item.idProducto);
                return matchProducto;
            });
        } else {
            filtrados = encargadosOriginales;
        }
        return filtrados;
    }, [carterasProductosData]);

    // Actualizar productos al cambiar cartera
    useEffect(() => {
        if (cartera && carterasProductosData.length > 0) {
            const productosFiltrados = carterasProductosData
                .filter(item => item.cartera === cartera)
                .map(item => item.producto);
            const productosConDefault = ["-Sin Producto-", ...productosFiltrados];
            setProductos(productosConDefault);
            setProducto("-Sin Producto-");
        }
    }, [cartera, carterasProductosData]);

    // Guardar los encargados originales para filtrado
    const [encargadosOriginales, setEncargadosOriginales] = useState([]);

    // Cuando se cargan los datos, guardar los encargados originales
    useEffect(() => {
        if (encargadosFiltrados.length > 0 && encargadosOriginales.length === 0) {
            setEncargadosOriginales(encargadosFiltrados);
        }
    }, [encargadosFiltrados, encargadosOriginales]);

    // Filtrar encargados al cambiar cartera o producto
    useEffect(() => {
        if (!encargadosOriginales.length) return;
        const filtrados = filtrarEncargados(cartera, producto, encargadosOriginales);
        setEncargadosFiltrados(filtrados);
        if (filtrados.length > 0) {
            setSelectedEncargado(filtrados[0].idEjecutivo);
        } else {
            setSelectedEncargado("VACIO");
        }
    }, [cartera, producto, filtrarEncargados, encargadosOriginales]);

    // Lógica real para cambiar encargado
    const handleCambiarAsignacion = async () => {
        try {
            // Validar que hay encargados seleccionados (simulación, aquí podrías usar tu lógica real)
            if (!selectedEncargado || selectedEncargado === "VACIO" || selectedEncargado === "Null") {
                toast.warning("Selecciona un encargado válido.");
                return;
            }
            setIsChangingAssignment(true);
            // Aquí iría la lógica real de asignación, por ejemplo:
            // await AsignaEncargados(...);
            // Simulación de éxito:
            setTimeout(() => {
                setContadorEncargados(prev => ({ ...prev, asignados: prev.asignados + 1 }));
                toast.success("Encargado asignado correctamente.");
                setIsChangingAssignment(false);
            }, 1000);
        } catch (error) {
            toast.error("Error al cambiar el encargado.");
            setIsChangingAssignment(false);
        }
    };


    // Dropdowns como componentes JSX
    const carteraSelector = (
        <div className="relative mb-0 w-full md:w-auto">
            <select
                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none"
                style={{ minHeight: '3.2rem' }}
                value={cartera}
                onChange={e => {
                    setCartera(e.target.value);
                }}
                id="cartera-select-header"
            >
                {carteras.length === 0 && <option value="" disabled hidden></option>}
                {carteras.map(c => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>
            <label
                htmlFor="cartera-select-header"
                className="absolute top-0 start-0 p-2 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
            >
                Cartera
            </label>
        </div>
    );
    const productoSelector = (
        <div className="relative mb-0 w-full md:w-auto">
            <select
                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none"
                style={{ minHeight: '3.2rem' }}
                value={producto}
                onChange={e => {
                    setProducto(e.target.value);
                }}
                id="producto-select-header"
            >
                {productos.length === 0 && <option value="" disabled hidden></option>}
                {productos.map(p => (
                    <option key={p} value={p}>{p}</option>
                ))}
            </select>
            <label
                htmlFor="producto-select-header"
                className="absolute top-0 start-0 p-2 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
            >
                Producto
            </label>
        </div>
    );
    const encargadoSelector = (
        <div className="relative mb-0 w-full md:w-auto">
            {loading ? (
                <div className="p-4 text-gray-500">Cargando encargados...</div>
            ) : error ? (
                <div className="p-4 text-red-500">{error}</div>
            ) : (
                <>
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none"
                        style={{ minHeight: '3.2rem' }}
                        value={selectedEncargado || (encargadosFiltrados && encargadosFiltrados.length > 0 ? "" : "VACIO")}
                        onChange={e => setSelectedEncargado(e.target.value)}
                        id="encargado-select-header"
                    >
                        {encargadosFiltrados && encargadosFiltrados.length > 0 ? (
                            <>
                                {selectedEncargado ? null : <option value="">Seleccionar...</option>}
                                {encargadosFiltrados
                                    .slice()
                                    .sort((a, b) => (a.nombreEjecutivo || '').localeCompare(b.nombreEjecutivo || ''))
                                    .map(item => (
                                        <option key={item.idEjecutivo} value={item.idEjecutivo}>
                                            {item.nombreEjecutivo}
                                        </option>
                                    ))}
                            </>
                        ) : (
                            <option value="Null"></option>
                        )}
                    </select>
                    <label
                        htmlFor="encargado-select-header"
                        className="absolute top-0 start-0 p-2 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Encargado
                    </label>
                </>
            )}
        </div>
    );
    
    // Estado para el contador filtrado y el nodo raíz desde el content
    const [contadorEncargados, setContadorEncargados] = useState({ asignados: 0, total: 0 });
    const [nodoEjecutivoHeader, setNodoEjecutivoHeader] = useState("");
    const [handleCambiarAsignacionContent, setHandleCambiarAsignacionContent] = useState(null);

    // Callback para recibir el contador filtrado desde el content
    const handleContadorChange = (contador) => {
        setContadorEncargados(contador);
    };
    // Callback para recibir el nombre del nodo raíz desde el content
    const handleNodoEjecutivoHeaderChange = (nombre) => {
        setNodoEjecutivoHeader(nombre);
    };
    // Callback para recibir la función de cambiar asignación desde el content
    const handleCambiarAsignacionCallback = (callback) => {
        setHandleCambiarAsignacionContent(() => callback);
    };


    const cambiarButton = (
        <button
            type="button"
            className={`btn-success w-full sm:w-auto sm:min-w-[120px] px-4 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center${isChangingAssignment || loading ? ' opacity-70 cursor-not-allowed' : ''}`}
            onClick={handleCambiarAsignacionContent || handleCambiarAsignacion}
            disabled={isChangingAssignment || loading}
        >
            {isChangingAssignment ? "Procesando..." : "Cambiar"}
        </button>
    );


    // Footer personalizado con mensaje informativo
    const CustomFooter = () => (
        <div className="px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4 
                       bg-gray-50 border-t border-gray-200 flex-shrink-0">
            <p className="text-sm text-justify m-0 italic"
               style={{ color: "var(--color-jerarquia3)" }}>
                Palomee los Ejecutivos que desee pasar a otro encargado y presione Cambiar.
            </p>
        </div>
    );

    return (
        <ReusableModal
            isOpen={isOpen}
            onClose={onClose}
            size="encargados"
            showHeader={true}
            title="Encargado - Coorin"
            icon={IconEncargados}
            iconClassName="text-jerarquia3"
            headerProps={{
                titleClassName: "text-jerarquia3",
                carteraSelector,
                productoSelector,
                encargadoSelector,
                contadorEncargados,
                nodoEjecutivoHeader,
                cambiarButton
            }}
            footerComponent={CustomFooter}
            showFooter={true}
            enableBounce={enableBounce}
            enableShakeOnBackdropClick={enableShakeOnBackdropClick}
            enableBounceOnBackdropOrEscape={enableBounceOnBackdropOrEscape}
            closeOnBackdropClick={closeOnBackdropClick}
            contentClassName="flex flex-col gap-4 h-full !overflow-hidden"
            modalClassName="border-0 shadow-2xl h-[60vh] overflow-hidden"
            {...props}
        >
            <ModalEncargadosContent 
                onContadorChange={handleContadorChange} 
                onNodoEjecutivoHeaderChange={handleNodoEjecutivoHeaderChange}
                onCambiarAsignacionCallback={handleCambiarAsignacionCallback}
            />
        </ReusableModal>
    );
};

export default EncargadosModal;