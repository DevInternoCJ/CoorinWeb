import React, { useRef, useEffect, useState } from "react";
import {
  ClipboardDocumentListIcon,
  StarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import ModalBase from "../../../board/ModalBase";
import CloseButtonCampanas from "../../../components/CloseButtonReusable";
import ModalCicle, { tabsListInformacion } from "./ModalCicle";
import {
  tabsListAccionamientos,
  COMPONENT_ICONS_ACCIONAMIENTOS,
} from "../../processes/accionamientos/ModalAccionamientosTabs";
import {
  tabsListGestiones,
  COMPONENT_ICONS_GESTIONES,
} from "../../processes/managements/ModalGestionesTabs";
import TableCargaAccionamientos from "../../processes/accionamientos/TwoTablesAccionamientos";

import { MODAL_SIZES, BOUNCE_MODAL_STYLES } from "./modalConstants";
import useEjecutivoInfo from "./useEjecutivoInfo";
import VerticalTabsLayout from "./VerticalTabsLayout";
import ModalHeaderInformacion from "./ModalHeaderInformacion";

// ---------------------------------------------------------------------------
// Helpers
const resolveModalSize = ({isConsultaVisitas, isCapturaVisitas, isCargaVisitas, isAccionamientos, isGestiones, isSupervisor,
  isInformacion, size, carouselNav, mostrarTabla, dynamicSize,
}) => {
  if (isConsultaVisitas) return "consultaVisits";
  if (isCapturaVisitas) return size === "pagos-xl" ? "informacion-xl" : "capturaVisit";
  if (isCargaVisitas) return "cargaVisitas";
  if (isAccionamientos) return "accionamientos-xl";
  if (isGestiones) return "gestiones-xl";
  if (isSupervisor) return "informacion-xl";

  if (isInformacion) {
    const isPagosReportados =
      carouselNav &&
      tabsListInformacion[carouselNav.currentIndex]?.key === "Pagos Reportados";

    if (isPagosReportados && mostrarTabla) return "informacion-xl";
    return dynamicSize;
  }

  return size;
};

const ModalBaseInformacion = ({
  onClose,
  tipoInformacion,
  infoCuenta,
  children,
  size = "lg",
  modalStyle = {},
  headerComponent: CustomHeader,
  headerProps = {},
  showHeader = true,
  footerComponent: CustomFooter,
  footerProps = {},
  showFooter = false,
  contentClassName = "",
  modalClassName = "",
  overlayClassName = "",
  enableBounce = true,
  backdropBlur = true,
  ...props
}) => {
  const modalRef = useRef(null);
  const { bounce } = ModalBase.useModalLogic?.() || { bounce: false };
  const [localBounce, setLocalBounce] = useState(false);

  // Navegación del carrusel (modo información)
  const [carouselNav, setCarouselNav] = useState(null);

  // Tamaño dinámico del modal
  const [dynamicSize, setDynamicSize] = useState("informacion");
  const [activeTab, setActiveTab] = useState(0);

  // Confirmación de cierre mientras hay carga en curso
  const [loadingExcel] = useState(false);
  const [mostrarTabla, setMostrarTabla] = useState("");

  // Tipos de modal
  const isConsultaVisitas = tipoInformacion === "Consulta Visitas";
  const isCapturaVisitas = tipoInformacion === "Captura Visitas";
  const isCargaVisitas = tipoInformacion === "Carga Visitas";
  const isInformacion = tipoInformacion === "información";
  const isAccionamientos = tipoInformacion === "Accionamientos";
  const isGestiones = tipoInformacion === "Gestiones";
  const isSupervisor = tipoInformacion === "supervisor";

  // Datos del ejecutivo (desde sessionStorage)
  const userData = JSON.parse(localStorage.getItem("userData"));
  const idProducto = userData?.idProducto ?? 0;
  const idEjecutivo = userData?.idEjecutivo ?? null;

  // Hook de datos del ejecutivo (solo activo en modo información)
  const {
    cartera,
    consulta,
    carterasOptions,
    consultasOptions,
    loadingConsultas,
    errorConsultas,
  } = useEjecutivoInfo({ idEjecutivo, idProducto, enabled: isInformacion });

  // Limpiar mostrarTabla al salir del tab de Carga (índice 1)
  useEffect(() => {
    if (activeTab !== 1) setMostrarTabla("");
  }, [activeTab]);

  // Cierre seguro: si hay carga activa se bloquea; de lo contrario se cierra
  const handleSafeClose = () => {
    if (!loadingExcel) onClose?.();
  };

  // Animación bounce
  const triggerBounce = () => {
    if (!enableBounce) return;
    setLocalBounce(true);
    setTimeout(() => setLocalBounce(false), 500);
  };

  // Interceptar Escape para prevenir cierre y activar bounce
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        triggerBounce();
      }
    };
    window.addEventListener("keydown", handleKey, true);
    return () => window.removeEventListener("keydown", handleKey, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Notificar al sidebar que el modal está abierto / cerrado
  useEffect(() => {
    const dispatch = (open, byClose = false) => {
      try {
        window.dispatchEvent(
          new CustomEvent("coorin-modal-open", { detail: { open, byClose } }),
        );
      } catch (err) {
        console.warn("dispatch modal-open failed", err);
      }
    };

    dispatch(true);
    return () => dispatch(false);
  }, []);

  // Calcular tamaño del modal
  const normalizedSize = resolveModalSize({
    isConsultaVisitas,
    isCapturaVisitas,
    isCargaVisitas,
    isAccionamientos,
    isGestiones,
    isSupervisor,
    isInformacion,
    size,
    carouselNav,
    mostrarTabla,
    dynamicSize,
  });

  const mergedModalStyle = {
    ...(MODAL_SIZES[normalizedSize] ?? MODAL_SIZES.informacion),
    ...modalStyle,
  };

  // Pestaña activa de Ofrecimientos (controla controles extra en header)
  const isOffersTab =
    isInformacion &&
    carouselNav &&
    tabsListInformacion[carouselNav.currentIndex]?.key === "Ofrecimientos";

  // Backdrop click → bounce
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) triggerBounce();
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="modal-blur-bg">
      {/* Overlay */}
      <div
        className={`modal-overlay ${overlayClassName} ${backdropBlur ? "backdrop-blur-sm" : ""}`}
        onClick={handleBackdropClick}
      />

      {/* Contenedor del modal */}
      <div
        ref={modalRef}
        className={`
          modal-content bg-[var(--color-surface)] text-[var(--color-text-primary)]
          rounded-lg shadow-2xl overflow-hidden flex flex-col
          w-full mx-auto my-8 max-h-[90vh] h-auto
          ${modalClassName}
          ${(bounce || localBounce) && enableBounce ? "animate-bounce-modal" : ""}
        `}
        style={mergedModalStyle}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {/* ── Header ───────────────────────────────────────────────── */}
        {showHeader && (
          CustomHeader ? (
            <CustomHeader onClose={handleSafeClose} {...headerProps} />
          ) : isInformacion ? (
            <ModalHeaderInformacion
              carouselNav={carouselNav}
              onClose={handleSafeClose}
            />
          ) : null
        )}

        {/* ── Contenido ─────────────────────────────────────────────── */}
        <div className={`flex-1 w-full overflow-auto ${contentClassName}`}>
          {isInformacion ? (
            <div className="mt-3 px-4 flex-1 overflow-auto">
              <ModalCicle
                renderNavInHeader={false}
                onNavigationReady={setCarouselNav}
                onSizeChange={setDynamicSize}
                headerControlsActive={isOffersTab}
                mostrarTabla={mostrarTabla}
                setMostrarTabla={setMostrarTabla}
                headerStates={{
                  cartera,
                  consulta,
                  carterasOptions,
                  consultasOptions,
                  loadingConsultas,
                  errorConsultas,
                }}
              />
            </div>
          ) : isAccionamientos ? (
            <VerticalTabsLayout
              tabsList={tabsListAccionamientos}
              componentIcons={COMPONENT_ICONS_ACCIONAMIENTOS}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              sectionTitle="Accionamientos"
              sectionIcon={
                <StarIcon
                  className="w-5 h-5 text-[var(--color-jerarquia3)]"
                  aria-hidden="true"
                />
              }
              onClose={handleSafeClose}
              mostrarTabla={mostrarTabla}
              setMostrarTabla={setMostrarTabla}
              onNavigationReady={setCarouselNav}
              onSizeChange={setDynamicSize}
            />
          ) : isGestiones ? (
            <VerticalTabsLayout
              tabsList={tabsListGestiones}
              componentIcons={COMPONENT_ICONS_GESTIONES}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              sectionTitle="Gestiones"
              sectionIcon={
                <DocumentTextIcon
                  className="w-5 h-5 text-[var(--color-jerarquia3)]"
                  aria-hidden="true"
                />
              }
              onClose={handleSafeClose}
              mostrarTabla={mostrarTabla}
              setMostrarTabla={setMostrarTabla}
              onNavigationReady={setCarouselNav}
              onSizeChange={setDynamicSize}
              extraSidebarClass={
                activeTab === 2 || activeTab === 3 || activeTab === 4
                  ? "pt-12"
                  : ""
              }
            />
          ) : isCapturaVisitas || isSupervisor ? (
            <div className="relative">
              <CloseButtonCampanas
                onClose={handleSafeClose}
                className="absolute top-1 right-2"
              />
              {children}
            </div>
          ) : (
            children
          )}
        </div>

        {/* ── Tabla de Accionamientos (fila separada) ───────────────── */}
        {isAccionamientos && mostrarTabla && (
          <TableCargaAccionamientos tipo={mostrarTabla} />
        )}

        {/* ── Footer ───────────────────────────────────────────────── */}
        {showFooter && (
          CustomFooter ? (
            <CustomFooter {...footerProps} />
          ) : (
            <div className="px-4 py-3 bg-[var(--color-surface-secondary)] border-t border-[var(--color-border)] flex justify-end gap-2">
              <button
                onClick={handleSafeClose}
                className="px-4 py-2 text-sm text-[var(--color-text-secondary)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md hover:bg-[var(--color-surface-secondary)]"
              >
                Cerrar
              </button>
            </div>
          )
        )}

        {/* ── Animación bounce CSS ──────────────────────────────────── */}
        <style>{BOUNCE_MODAL_STYLES}</style>
      </div>
    </div>
  );
};

export default ModalBaseInformacion;
