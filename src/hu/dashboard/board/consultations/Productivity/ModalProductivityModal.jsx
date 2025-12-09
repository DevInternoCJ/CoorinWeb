import React, { useState, useEffect, useCallback, useRef } from "react";
import ReusableModal from "../../modalGlobalReboot/ReusableModal";
import ModalProductividadContent from "./ModalProductividadContent";
import { IconProductividad } from "../IconesConsultations";
import { getProductivity } from "../../../../../services/mark/Orochi/LokiServices";
// Logo eliminado: controles movidos al contenido del modal

// Nota: el dropdown usará el estilo tipo 'peer' con label flotante (ver abajo)

// Header personalizado para centrar el selector entre el título y el botón cerrar
const ProductivityHeader = ({ title, icon: Icon, onClose, encargadoSelector, titleClassName = '', iconClassName = '' }) => {
    return (
        <div className={`px-3 pt-4 pb-2 sm:px-4 sm:pt-5 sm:pb-2 md:px-6 md:pt-6 md:pb-2 bg-white border-b border-gray-200`}>
            <div className="relative w-full flex items-center">
                <div className="flex items-center gap-2 z-10 flex-shrink-0 min-w-[220px]">
                    {Icon && (
                        <Icon className={`size-5 sm:size-6 flex-shrink-0 ${iconClassName}`} />
                    )}
                    {title && (
                        <h2 className={`text-base sm:text-lg md:text-xl font-semibold text-gray-900 truncate leading-tight ${titleClassName}`}>{title}</h2>
                    )}
                </div>

                {/* Contenedor centrado absolutamente para el selector */}
                <div className="absolute inset-x-0 flex justify-center pointer-events-none">
                    <div className="pointer-events-auto">{encargadoSelector}</div>
                </div>

                {/* Botón cerrar a la derecha */}
                <button
                    onClick={onClose}
                    className="ml-auto text-jerarquia3 hover:bg-background-dashboard hover:text-red-600 text-4xl rounded-full w-8 h-8 flex items-center justify-center transition-colors z-20"
                    aria-label="Cerrar modal"
                    type="button"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

const ProductivityModal = ({
    isOpen,
    onClose,
    // Props opcionales para personalizar
    size = "productivity", // 76% del viewport
    enableBounce = false,
    enableShakeOnBackdropClick = true,
    enableBounceOnBackdropOrEscape = true,
    closeOnBackdropClick = false,
    ...props
}) => {
    // Estados para productividad
    const [timeFilter, setTimeFilter] = useState("Dia"); // 'Dia' o 'Hora'
    const [selectedIndicator, setSelectedIndicator] = useState("Sesiones"); // Seleccionar "Sesiones" por defecto
    const [productivityData, setProductivityData] = useState([]);
    const [loadingProductivity, setLoadingProductivity] = useState(false);
    const [errorProductivity, setErrorProductivity] = useState(null);
    const [selectedExecutiveNode, setSelectedExecutiveNode] = useState(null);
    
    // Estado para caché de datos completos (cuando idsEjecutivos es [0])
    const [cachedFullData, setCachedFullData] = useState({});
    // Estado para el usuario seleccionado del árbol (para filtrado)
    const [selectedUserFromTree, setSelectedUserFromTree] = useState(null);
    
    // Ref para acceder al caché actual sin recrear funciones
    const cachedFullDataRef = useRef(cachedFullData);
    cachedFullDataRef.current = cachedFullData;

    // Definir indicadores según el filtro de tiempo
    const indicadoresDia = [
        { label: "Sesiones", value: "Sesiones" },
        { label: "Contactos", value: "Contactos" },
        { label: "Negociaciones", value: "Negociaciones" },
        { label: "Porcentajes", value: "Porcentajes" },
        { label: "Tiempos", value: "Tiempos" },
        { label: "Tiempo Promedio", value: "TiempoPromedio" }
    ];

    const indicadoresHora = [
        { label: "Cuentas", value: "Cuentas" },
        { label: "Titulares", value: "Titulares" },
        { label: "Conocidos", value: "Conocidos" },
        { label: "Desconocidos", value: "Desconocidos" },
        { label: "Sin Contacto", value: "SinContacto" },
        { label: "Negociaciones", value: "Negociaciones" },
        { label: "Monto Negociaciones", value: "MontoNegociaciones" },
        { label: "Saldo Solucionado", value: "SaldoSolucionado" },
    ];

    // JSX para pasar como selector al header del modal (centrado junto al título)
    const indicadoresSelector = (
        <div className="flex items-center justify-center lg:justify-center">
            <div className="flex items-center gap-6 lg:gap-8 bg-transparent">
                <div className="relative w-[260px]">
                    <select
                        id="indicador-select"
                        value={selectedIndicator}
                        onChange={(e) => setSelectedIndicator(e.target.value)}
                        className="peer pt-6 pb-2 px-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <option value="" disabled hidden></option>
                        {(timeFilter === "Dia"
                            ? indicadoresDia.map((indicador) => (
                                <option key={indicador.value} value={indicador.value}>
                                    {indicador.label}
                                </option>
                            ))
                            : indicadoresHora.map((indicador) => (
                                <option key={indicador.value} value={indicador.value}>
                                    {indicador.label}
                                </option>
                            ))
                        )}
                    </select>
                    <label
                        htmlFor="indicador-select"
                        className="absolute left-3 top-1 text-xs text-gray-500 pointer-events-none"
                    >
                        Indicadores
                    </label>
                </div>

                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                        <input
                            type="radio"
                            name="timeFilter"
                            value="Dia"
                            checked={timeFilter === "Dia"}
                            onChange={(e) => {
                                setTimeFilter(e.target.value);
                                setSelectedIndicator("Sesiones");
                            }}
                            className="modal-radio"
                        />
                        Día
                    </label>
                    <label className="flex items-center gap-1 text-gray-700 text-sm font-medium">
                        <input
                            type="radio"
                            name="timeFilter"
                            value="Hora"
                            checked={timeFilter === "Hora"}
                            onChange={(e) => {
                                setTimeFilter(e.target.value);
                                setSelectedIndicator("Cuentas");
                            }}
                            className="modal-radio"
                        />
                        Hora
                    </label>
                </div>
            </div>
        </div>
    );

    // Función para obtener datos de productividad
    const fetchProductivityData = useCallback(async (indicador, currentTimeFilter, shouldFetchAll = true, userFilter = null) => {
        if (!indicador) return;

        // Crear clave única para el caché basada en indicador y timeFilter
        const cacheKey = `${indicador}_${currentTimeFilter}`;

        // Si no debemos hacer fetch (solo filtrar), usar datos del caché
        if (!shouldFetchAll && cachedFullDataRef.current[cacheKey]) {
            if (userFilter) {
                // Filtrar datos del caché por usuario
                const filteredData = cachedFullDataRef.current[cacheKey].filter(item => {
                    // Buscar coincidencia en campo 'usuario', 'ejecutivo', 'Ejecutivo' o 'Usuario'
                    const itemUser = item.usuario || item.ejecutivo || item.Ejecutivo || item.Usuario || '';
                    return itemUser.toLowerCase() === userFilter.toLowerCase();
                });
                console.log(`Filtrando datos del caché para usuario: ${userFilter}`, filteredData);
                setProductivityData(filteredData);
            } else {
                // Mostrar todos los datos del caché
                setProductivityData(cachedFullDataRef.current[cacheKey]);
            }
            return;
        }

        setLoadingProductivity(true);
        setErrorProductivity(null);

        try {
            // Obtener el idEjecutivo de la sesión
            const userData = JSON.parse(localStorage.getItem('userData')) || {};
            const idEjecutivoSesion = userData?.idEjecutivo || userData?.idejecutivo || userData?.id || 0;

            // Siempre enviar [0] para obtener todos los datos
            const idsToSend = [0];

            // esModoHora: true si el radiobutton Hora está activo
            const esModoHora = currentTimeFilter === 'Hora';

            const requestData = {
                indicador: indicador,
                idsEjecutivos: idsToSend,
                idEjecutivoPrincipal: idEjecutivoSesion,
                esModoHora: esModoHora
            };

            console.log('Enviando datos de productividad (fetch completo con [0]):', requestData);
            const data = await getProductivity(requestData);
            console.log('Respuesta raw del endpoint de productividad:', data);

            // Manejar diferentes tipos de respuesta del servidor
            let processedData = [];
            if (Array.isArray(data)) {
                processedData = data;
            } else if (data && data.message) {
                // Servidor devuelve mensaje (sin datos)
                console.log('Servidor responde:', data.message);
                processedData = [];
            } else if (data && typeof data === 'object') {
                // Si es un objeto, intentar extraer array de datos
                const dataArray = Object.values(data).find((val) => Array.isArray(val));
                console.log('Respuesta procesada (array encontrado):', dataArray);
                processedData = dataArray || [];
            }

            // Guardar en caché los datos completos
            setCachedFullData(prev => ({
                ...prev,
                [cacheKey]: processedData
            }));
            console.log(`Datos guardados en caché con clave: ${cacheKey}`, processedData);

            // Si hay un filtro de usuario activo, aplicarlo
            if (userFilter && processedData.length > 0) {
                const filteredData = processedData.filter(item => {
                    const itemUser = item.usuario || item.ejecutivo || item.Ejecutivo || item.Usuario || '';
                    return itemUser.toLowerCase() === userFilter.toLowerCase();
                });
                console.log(`Aplicando filtro de usuario: ${userFilter}`, filteredData);
                setProductivityData(filteredData);
            } else {
                setProductivityData(processedData);
            }
        } catch (error) {
            console.error('Error al obtener datos de productividad:', error);
            setErrorProductivity('Error al obtener los datos de productividad');
            setProductivityData([]);
        } finally {
            setLoadingProductivity(false);
        }
    }, []);

    // Efecto para cargar datos cuando cambia el indicador o timeFilter (siempre hace fetch con [0])
    useEffect(() => {
        if (selectedIndicator) {
            // Al cambiar indicador o timeFilter, hacer fetch completo
            // El filtro se aplicará en el segundo useEffect si hay usuario seleccionado
            fetchProductivityData(selectedIndicator, timeFilter, true, selectedUserFromTree);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedIndicator, timeFilter, fetchProductivityData]);

    // Efecto para filtrar datos cuando cambia el usuario seleccionado del árbol
    useEffect(() => {
        if (!selectedIndicator) return;
        
        const cacheKey = `${selectedIndicator}_${timeFilter}`;
        
        // Solo filtrar si tenemos datos en caché (es decir, ya se hizo el fetch inicial)
        if (cachedFullDataRef.current[cacheKey]) {
            if (selectedUserFromTree) {
                // Filtrar por el usuario seleccionado
                const filteredData = cachedFullDataRef.current[cacheKey].filter(item => {
                    const itemUser = item.usuario || item.ejecutivo || item.Ejecutivo || item.Usuario || '';
                    return itemUser.toLowerCase() === selectedUserFromTree.toLowerCase();
                });
                console.log(`Filtrando datos del caché para usuario: ${selectedUserFromTree}`, filteredData);
                setProductivityData(filteredData);
            } else {
                // Mostrar todos los datos del caché (usuario de sesión seleccionado)
                console.log('Mostrando todos los datos del caché');
                setProductivityData(cachedFullDataRef.current[cacheKey]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedUserFromTree]);

    return (
        <ReusableModal
            isOpen={isOpen}
            onClose={onClose}
            size={size}
            showHeader={true}
            // Pasamos un headerComponent personalizado para controlar el layout exacto
            headerComponent={ProductivityHeader}
            headerProps={{
                title: "Productividad en Línea - Coorin",
                icon: IconProductividad,
                titleClassName: "text-jerarquia3",
                iconClassName: "text-jerarquia3",
                encargadoSelector: indicadoresSelector
            }}
            enableBounce={enableBounce}
            enableShakeOnBackdropClick={enableShakeOnBackdropClick}
            enableBounceOnBackdropOrEscape={enableBounceOnBackdropOrEscape}
            closeOnBackdropClick={closeOnBackdropClick}
            contentClassName="p-0"
            {...props}
        >
            <div className="h-full flex flex-col">
                {/* Controles movidos al contenido de la derecha. Header simplificado. */}

                {/* Contenido principal - sin scroll, los componentes internos manejan su propio scroll */}
                <div className="flex-1 h-full overflow-hidden">
                    <ModalProductividadContent
                        timeFilter={timeFilter}
                        selectedIndicator={selectedIndicator}
                        selectedExecutiveNode={selectedExecutiveNode}
                        setSelectedExecutiveNode={setSelectedExecutiveNode}
                        productivityData={productivityData}
                        loadingProductivity={loadingProductivity}
                        errorProductivity={errorProductivity}
                        setTimeFilter={setTimeFilter}
                        setSelectedIndicator={setSelectedIndicator}
                        indicadoresDia={indicadoresDia}
                        indicadoresHora={indicadoresHora}
                        setSelectedUserFromTree={setSelectedUserFromTree}
                    />
                </div>
            </div>

        </ReusableModal>
    );
};

export default ProductivityModal;