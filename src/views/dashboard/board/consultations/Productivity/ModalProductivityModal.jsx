import React, { useState, useEffect, useCallback, useRef } from "react";
import ReusableModal from "../../modalGlobalReboot/ReusableModal";
import ModalProductividadContent from "./ModalProductividadContent";
import { IconProductividad } from "../IconesConsultations";
import { getProductivity } from "../../../../../services/mark/Orochi/LokiServices";
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
      className={`px-3 pt-4 pb-2 sm:px-4 sm:pt-5 sm:pb-2 md:px-6 md:pt-6 md:pb-2
                  bg-[var(--color-surface-modal)] border-b border-[var(--color-border)]
                  transition-colors duration-300`}
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
              className={`text-base sm:text-lg md:text-xl font-semibold text-[var(--color-text-primary)] truncate leading-tight ${titleClassName}`}
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
  const [allProductivityData, setAllProductivityData] = useState([]); // Todos los datos sin filtrar
  const [loadingProductivity, setLoadingProductivity] = useState(false);
  const [errorProductivity, setErrorProductivity] = useState(null);
  const [selectedExecutiveNode, setSelectedExecutiveNode] = useState(null);
  const [selectedExecutiveInfo, setSelectedExecutiveInfo] = useState(null);
  const [idEjecutivoPrincipal, setIdEjecutivoPrincipal] = useState(null); // ID del usuario logueado

  // Obtener el idEjecutivo del usuario logueado al abrir el modal
 useEffect(() => {
    if (isOpen) {
      try {
        // ✅ Usar sessionStorage primero (consistente con otros componentes)
        const userData = JSON.parse(
          sessionStorage.getItem("userData") || 
          localStorage.getItem("userData") || 
          "{}"
        );
        console.log("📋 userData completo:", userData);

        let idEjecutivo =
          userData?.idEjecutivo ||
          userData?.idejecutivo ||
          userData?.id ||
          null;

        if (idEjecutivo && typeof idEjecutivo === "string") {
          idEjecutivo = parseInt(idEjecutivo, 10);
        }

        console.log("idEjecutivo extraído:", idEjecutivo, "tipo:", typeof idEjecutivo);

        if (idEjecutivo && Number.isInteger(idEjecutivo) && idEjecutivo > 0) {
          setIdEjecutivoPrincipal(idEjecutivo);
          setSelectedExecutiveNode(idEjecutivo);
          setSelectedExecutiveInfo({
            idEjecutivo: idEjecutivo,
            usuario: userData?.usuario || userData?.Usuario || "--",
            nombreEjecutivo: userData?.nombre || userData?.nombreEjecutivo || userData?.NombreEjecutivo || "--",
          });
          console.log("ID Ejecutivo Principal establecido:", idEjecutivo);
        } else {
          console.warn("No se encontró idEjecutivo válido en userData. Valor:", idEjecutivo);
        }
      } catch (error) {
        console.error(" Error al obtener idEjecutivo:", error);
      }
    } else {
      // Limpiar estados cuando se cierra el modal
      setIdEjecutivoPrincipal(null);
      setSelectedExecutiveNode(null);
      setSelectedExecutiveInfo(null);
      setAllProductivityData([]);
    }
  }, [isOpen]);

  // Definir indicadores según el filtro de tiempo
  const indicadoresDia = [
    "Sesiones",
    "Contactos",
    "Negociaciones",
    "Porcentajes",
    "Tiempos",
    "TiempoPromedio",
  ];

  const indicadoresHora = [
    "Cuentas",
    "Titulares",
    "Conocidos",
    "Desconocidos",
    "SinContacto",
    "Negociaciones",
    "MontoNegociaciones",
    "SaldoSolucionado",
  ];

  const productivityData = React.useMemo(() => {
    if (!allProductivityData || allProductivityData.length === 0) return [];

    if (
      !selectedExecutiveNode ||
      !selectedExecutiveInfo ||
      selectedExecutiveNode === idEjecutivoPrincipal
    ) {
      return allProductivityData;
    }

    const filtered = allProductivityData.filter((item) => {
      const matchEncargado =
        item.encargado === String(selectedExecutiveInfo.idEjecutivo) ||
        item.idEncargado === String(selectedExecutiveInfo.idEjecutivo);

      const matchEjecutivo = item.ejecutivo === selectedExecutiveInfo.usuario;

      return matchEncargado || matchEjecutivo;
    });

    console.log(`🔍 Filtrando para "${selectedExecutiveInfo.usuario}":`, filtered.length, "de", allProductivityData.length);
    return filtered;
  }, [allProductivityData, selectedExecutiveNode, selectedExecutiveInfo, idEjecutivoPrincipal]);


  // JSX para pasar como selector al header del modal (centrado junto al título)
  const indicadoresSelector = (
    <div className="flex items-center justify-center lg:justify-center">
      <div className="flex items-center gap-6 lg:gap-8 bg-transparent">
        <div className="relative w-[260px]">
          <select
            id="indicador-select"
            value={selectedIndicator}
            onChange={(e) => setSelectedIndicator(e.target.value)}
            className="peer pt-6 pb-2 px-4 pe-9 block w-full
                       bg-[var(--color-surface-secondary)] border-transparent rounded-lg text-sm
                       text-[var(--color-text-primary)]
                       focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1
                       disabled:opacity-50 disabled:pointer-events-none
                       transition-colors duration-150"
          >
            <option value="" disabled hidden></option>
            {(timeFilter === "Dia" ? indicadoresDia : indicadoresHora).map(
              (indicador) => (
                <option key={indicador} value={indicador}>
                  {indicador}
                </option>
              ),
            )}
          </select>
          <label
            htmlFor="indicador-select"
            className="absolute left-3 top-1 text-xs text-[var(--color-text-muted)] pointer-events-none"
          >
            Indicadores
          </label>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1 text-[var(--color-text-secondary)] text-sm font-medium">
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
          <label className="flex items-center gap-1 text-[var(--color-text-secondary)] text-sm font-medium">
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
   const fetchProductivityData = useCallback(async (indicador, idsEjecutivos) => {
    if (!indicador) {
      console.warn("⚠️ No se puede hacer fetch sin indicador");
      return;
    }

    console.log("🚀 Iniciando fetchProductivityData con:", { indicador, idsEjecutivos, timeFilter });

    setLoadingProductivity(true);
    setErrorProductivity(null);

    try {
      const idEjecutivoPrincipalLocal = Array.isArray(idsEjecutivos)
        ? idsEjecutivos[0]
        : idsEjecutivos;
      const esModoHora = timeFilter === "Hora";

      const idsToSend = !idEjecutivoPrincipalLocal ? [0] : [idEjecutivoPrincipalLocal];

      const requestData = {
        indicador: indicador,
        idsEjecutivos: idsToSend,
        idEjecutivoPrincipal: idEjecutivoPrincipalLocal || 0,
        esModoHora: esModoHora,
      };

      console.log("========================================");
      console.log("📤 REQUEST COMPLETO QUE SE ENVÍA:");
      console.log(JSON.stringify(requestData, null, 2));
      console.log("========================================");

      const data = await getProductivity(requestData);
      console.log("📥 Respuesta raw del endpoint:", data);

      // Procesar respuesta
      let processedData = [];

      if (data && data.datos && Array.isArray(data.datos)) {
        processedData = data.datos.map((item) => {
          const normalizedItem = { ...item };

          if (item.encargado !== undefined && !item.idEncargado) {
            normalizedItem.idEncargado = item.encargado;
          }

          if (esModoHora && item.hora6 !== undefined) {
            normalizedItem["6"] = item.hora6 ?? 0;
            normalizedItem["7"] = item.hora7 ?? 0;
            normalizedItem["8"] = item.hora8 ?? 0;
            normalizedItem["9"] = item.hora9 ?? 0;
            normalizedItem["10"] = item.hora10 ?? 0;
            normalizedItem["11"] = item.hora11 ?? 0;
            normalizedItem["12"] = item.hora12 ?? 0;
            normalizedItem["13"] = item.hora13 ?? 0;
            normalizedItem["14"] = item.hora14 ?? 0;
            normalizedItem["15"] = item.hora15 ?? 0;
            normalizedItem["16"] = item.hora16 ?? 0;
            normalizedItem["17"] = item.hora17 ?? 0;
            normalizedItem["18"] = item.hora18 ?? 0;
            normalizedItem["19"] = item.hora19 ?? 0;
            normalizedItem["20"] = item.hora20 ?? 0;
            normalizedItem["21"] = item.hora21 ?? 0;
            normalizedItem["22"] = item.hora22 ?? 0;

            if (normalizedItem.total === undefined || normalizedItem.total === null) {
              const sum = [
                item.hora6, item.hora7, item.hora8, item.hora9, item.hora10,
                item.hora11, item.hora12, item.hora13, item.hora14, item.hora15,
                item.hora16, item.hora17, item.hora18, item.hora19, item.hora20,
                item.hora21, item.hora22,
              ].reduce((acc, val) => acc + (Number(val) || 0), 0);
              normalizedItem.total = sum;
            }
          }

          if (selectedExecutiveInfo && (normalizedItem.ejecutivo === null || normalizedItem.idEncargado === null)) {
            normalizedItem.ejecutivo = normalizedItem.ejecutivo || selectedExecutiveInfo.usuario || "--";
            normalizedItem.idEncargado = normalizedItem.idEncargado || selectedExecutiveInfo.idEjecutivo || "--";
          }

          return normalizedItem;
        });
        console.log("📊 Datos procesados (con datos):", processedData.length, "registros");
      } else if (Array.isArray(data)) {
        processedData = data;
        console.log("📊 Datos procesados (array directo):", processedData.length, "registros");
      } else if (data && typeof data === "object") {
        const dataArray = Object.values(data).find((val) => Array.isArray(val));
        processedData = dataArray || [];
        console.log("📊 Datos procesados (objeto):", processedData.length, "registros");
      } else {
        processedData = [];
        console.warn("⚠️ No se encontraron datos válidos en la respuesta");
      }

      setAllProductivityData(processedData);
      console.log("✅ Datos guardados en estado:", processedData.length, "registros");
    } catch (error) {
      console.error("❌ Error al obtener datos de productividad:", error);
      setErrorProductivity("Error al obtener los datos de productividad");
      setAllProductivityData([]);
    } finally {
      setLoadingProductivity(false);
    }
  }, [timeFilter, selectedExecutiveInfo]); // ✅ Dependencias correctas
 
    useEffect(() => {
    console.log("🔄 useEffect ejecutado. Estado:", {
      selectedIndicator,
      idEjecutivoPrincipal,
      timeFilter,
      isOpen
    });

    if (isOpen && selectedIndicator && idEjecutivoPrincipal) {
      console.log("✅ Condiciones cumplidas, llamando a fetchProductivityData");
      fetchProductivityData(selectedIndicator, [idEjecutivoPrincipal]);
    } else {
      console.warn("⚠️ Condiciones NO cumplidas para fetch:", {
        isOpen,
        selectedIndicator,
        idEjecutivoPrincipal
      });
    }
  }, [selectedIndicator, timeFilter, idEjecutivoPrincipal, isOpen, fetchProductivityData]); // ✅ Todas las dependencias


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
            selectedExecutiveInfo={selectedExecutiveInfo}
            setSelectedExecutiveInfo={setSelectedExecutiveInfo}
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
