import React, { useState, useEffect } from "react";
import ReusableModal from "../../modalGlobalReboot/ReusableModal";
import ModalProductividadContent from "./ModalProductividadContent";
import { IconProductividad } from "../IconesConsultations";
import { getProductivity } from "../../../../../services/mark/albaz/LokiServices";
import ConsorcioLogo from "../../../../../assets/logo_coorin_5.svg";

// Flecha tipo chevron moderna usando clase global
const DropdownArrow = () => (
    <span className="modal-dropdown-arrow">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path
                d="M6 8l4 4 4-4"
                stroke="#2b463c"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    </span>
);

const ProductivityModal = ({
    isOpen,
    onClose,
    // Props opcionales para personalizar
    size = "productivity", // 76% del viewport
    enableBounce = true,
    enableShakeOnBackdropClick = true,
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

    // Definir indicadores según el filtro de tiempo
    const indicadoresDia = [
        "Sesiones",
        "Contactos",
        "Negociaciones",
        "Porcentajes",
        "Tiempos",
        "Tiempo Promedio",
    ];

    const indicadoresHora = [
        "Cuentas",
        "Titulares",
        "Conocidos",
        "Desconocidos",
        "Sin Contacto",
        "Negociaciones",
        "Monto Negociaciones",
        "Saldo Solucionado",
    ];

    // Función para obtener datos de productividad
    const fetchProductivityData = async (indicador, idsEjecutivos) => {
        if (!indicador || !idsEjecutivos || idsEjecutivos.length === 0) return;

        setLoadingProductivity(true);
        setErrorProductivity(null);

        try {
            const requestData = {
                indicador: indicador,
                idsEjecutivos: idsEjecutivos,
            };

            console.log("📤 Enviando datos de productividad:", requestData);
            const data = await getProductivity(requestData);

            // Manejar diferentes tipos de respuesta del servidor
            if (Array.isArray(data)) {
                setProductivityData(data);
            } else if (data && data.message) {
                // Servidor devuelve mensaje (sin datos)
                console.log("📝 Servidor responde:", data.message);
                setProductivityData([]);
            } else if (data && typeof data === "object") {
                // Si es un objeto, intentar extraer array de datos
                const dataArray = Object.values(data).find((val) => Array.isArray(val));
                setProductivityData(dataArray || []);
            } else {
                setProductivityData([]);
            }
        } catch (error) {
            console.error("❌ Error al obtener datos de productividad:", error);
            setErrorProductivity("Error al obtener los datos de productividad");
            setProductivityData([]);
        } finally {
            setLoadingProductivity(false);
        }
    };

    // Efecto para cargar datos cuando cambian el indicador o ejecutivo seleccionado
    useEffect(() => {
        if (selectedIndicator && selectedExecutiveNode) {
            const idsToSend = [selectedExecutiveNode];
            fetchProductivityData(selectedIndicator, idsToSend);
        }
    }, [selectedIndicator, selectedExecutiveNode]);

    return (
        <ReusableModal
            isOpen={isOpen}
            onClose={onClose}
            size={size}
            showHeader={true}
            headerComponent={({ onClose }) => (
                <div className="px-3 pt-4 pb-3 sm:px-4 sm:pt-5 sm:pb-4 md:px-6 md:pt-6 md:pb-4 
                        flex items-center justify-between 
                        border-b-2 border-[var(--color-jerarquia1)]
                        gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <IconProductividad
                            className="size-5 sm:size-6 flex-shrink-0"
                            style={{ color: "var(--color-jerarquia3)" }}
                        />
                        <div className="min-w-0">
                            <h2 className="text-base sm:text-lg md:text-xl font-bold 
                             text-[var(--color-jerarquia3)] 
                             truncate sm:whitespace-normal
                             leading-tight">
                                Productividad en Línea - Coorin
                            </h2>
                        </div>
                    </div>

                    <div className="flex-shrink-0">
                        <button
                            onClick={onClose}
                            className="text-[var(--color-jerarquia3)] hover:text-red-600 
                         transition-colors duration-200 
                         rounded-full p-1 sm:p-1.5
                         hover:bg-gray-100 focus:bg-gray-100
                         focus:outline-none focus:ring-2 focus:ring-red-300"
                            style={{ fontSize: "1.25rem", lineHeight: 1 }}
                            aria-label="Cerrar modal"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
            enableBounce={enableBounce}
            enableShakeOnBackdropClick={enableShakeOnBackdropClick}
            closeOnBackdropClick={closeOnBackdropClick}
            overlayClassName="modal-blur-bg"
            contentClassName="p-0" // Sin padding para el contenido personalizado
            {...props}
        >
            <div className="space-y-4">
                {/* Controles superiores - Responsive */}
                <div className="flex flex-col lg:flex-row gap-4 p-4 border-b border-gray-200">
                    {/* Logo del Consorcio Jurídico */}
                    <div className="flex justify-center lg:w-72 lg:justify-center">
                        <img
                            src={ConsorcioLogo}
                            alt="Consorcio Jurídico"
                            className="h-12 w-auto object-contain"
                        />
                    </div>

                    {/* Controles de Indicadores - Responsive */}
                    <div className="flex-1 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                            <span className="text-sm font-medium text-gray-700">Indicadores</span>
                            <div className="relative">
                                <select
                                    value={selectedIndicator}
                                    onChange={(e) => setSelectedIndicator(e.target.value)}
                                    className="appearance-none bg-white border border-gray-300 rounded px-3 py-1 pr-8 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {(timeFilter === "Dia" ? indicadoresDia : indicadoresHora).map(
                                        (indicador) => (
                                            <option key={indicador} value={indicador}>
                                                {indicador}
                                            </option>
                                        )
                                    )}
                                </select>
                                <DropdownArrow />
                            </div>
                        </div>

                        {/* Radio buttons responsive */}
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
                                    className="text-blue-500"
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
                                    className="text-blue-500"
                                />
                                Hora
                            </label>
                        </div>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="min-h-[400px] max-h-[60vh] overflow-y-auto">
                    <ModalProductividadContent
                        timeFilter={timeFilter}
                        selectedIndicator={selectedIndicator}
                        selectedExecutiveNode={selectedExecutiveNode}
                        setSelectedExecutiveNode={setSelectedExecutiveNode}
                        productivityData={productivityData}
                        loadingProductivity={loadingProductivity}
                        errorProductivity={errorProductivity}
                    />
                </div>
            </div>

            {/* Estilos CSS idénticos al modal de sesiones */}
            <style jsx global>{`
        /* Estilo personalizado para el backdrop del modal - transparente con blur suave */
        .modal-blur-bg {
          background: rgba(255, 255, 255, 0.15) !important;
          backdrop-filter: blur(6px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(6px) saturate(180%) !important;
          animation: fadeInBackdrop 0.3s ease-out;
        }
        
        /* Animación suave para la aparición del backdrop */
        @keyframes fadeInBackdrop {
          from {
            background: rgba(255, 255, 255, 0);
            backdrop-filter: blur(0px);
            -webkit-backdrop-filter: blur(0px);
          }
          to {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(6px) saturate(180%);
            -webkit-backdrop-filter: blur(6px) saturate(180%);
          }
        }

        /* Scroll personalizado */
        .scrollbar-gray::-webkit-scrollbar {
          height: 8px;
          width: 8px;
          background: #f5f5f5;
        }
        .scrollbar-gray::-webkit-scrollbar-thumb {
          background: #b0b0b0;
          border-radius: 4px;
        }
        .scrollbar-gray::-webkit-scrollbar-thumb:hover {
          background: #888;
        }
      `}</style>
        </ReusableModal>
    );
};

export default ProductivityModal;