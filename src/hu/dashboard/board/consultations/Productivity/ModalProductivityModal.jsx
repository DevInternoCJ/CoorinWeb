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
            title="Productividad en Línea - Coorin"
            icon={IconProductividad}
            iconClassName="text-jerarquia3"
            headerProps={{ titleClassName: "text-jerarquia3" }}
            enableBounce={enableBounce}
            enableShakeOnBackdropClick={enableShakeOnBackdropClick}
            enableBounceOnBackdropOrEscape={enableBounceOnBackdropOrEscape}
            closeOnBackdropClick={closeOnBackdropClick}
            contentClassName="p-0"
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

        </ReusableModal>
    );
};

export default ProductivityModal;