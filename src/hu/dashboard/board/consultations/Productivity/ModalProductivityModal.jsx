import React, { useState, useEffect } from "react";
import ReusableModal from "../../modalGlobalReboot/ReusableModal";
import ModalProductividadContent from "./ModalProductividadContent";
import { IconProductividad } from "../IconesConsultations";
import { getProductivity } from "../../../../../services/mark/orochi/LokeServices";
// Logo eliminado: controles movidos al contenido del modal

// Nota: el dropdown usará el estilo tipo 'peer' con label flotante (ver abajo)

// Header personalizado para centrar el selector entre el título y el botón cerrar
const ProductivityHeader = ({
  title,
  icon: Icon,
  onClose,
  encargadoSelector,
  titleClassName = "",
  iconClassName = "",
}) => {
  return (
    <div
      className={`px-3 pt-4 pb-2 sm:px-4 sm:pt-5 sm:pb-2 md:px-6 md:pt-6 md:pb-2 bg-white border-b border-gray-200`}
    >
      <div className="relative w-full flex items-center">
        <div className="flex items-center gap-2 z-10 flex-shrink-0 min-w-[220px]">
          {Icon && (
            <Icon
              className={`size-5 sm:size-6 flex-shrink-0 ${iconClassName}`}
            />
          )}
          {title && (
            <h2
              className={`text-base sm:text-lg md:text-xl font-semibold text-gray-900 truncate leading-tight ${titleClassName}`}
            >
              {title}
            </h2>
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
            {(timeFilter === "Dia" ? indicadoresDia : indicadoresHora).map(
              (indicador) => (
                <option key={indicador} value={indicador}>
                  {indicador}
                </option>
              )
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
      console.log("📥 Respuesta raw del endpoint de productividad:", data);

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
        console.log("📥 Respuesta procesada (array encontrado):", dataArray);
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
      // Pasamos un headerComponent personalizado para controlar el layout exacto
      headerComponent={ProductivityHeader}
      headerProps={{
        title: "Productividad en Línea - Coorin",
        icon: IconProductividad,
        titleClassName: "text-jerarquia3",
        iconClassName: "text-jerarquia3",
        encargadoSelector: indicadoresSelector,
      }}
      enableBounce={enableBounce}
      enableShakeOnBackdropClick={enableShakeOnBackdropClick}
      enableBounceOnBackdropOrEscape={enableBounceOnBackdropOrEscape}
      closeOnBackdropClick={closeOnBackdropClick}
      contentClassName="p-0"
      {...props}
    >
      <div className="space-y-4">
        {/* Controles movidos al contenido de la derecha. Header simplificado. */}

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
            setTimeFilter={setTimeFilter}
            setSelectedIndicator={setSelectedIndicator}
            indicadoresDia={indicadoresDia}
            indicadoresHora={indicadoresHora}
          />
        </div>
      </div>
    </ReusableModal>
  );
};

export default ProductivityModal;
