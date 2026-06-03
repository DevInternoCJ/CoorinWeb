import React from "react";
import CloseButtonCampanas from "../../../components/CloseButtonReusable";
import ModalCicle from "./ModalCicle";

/**
 * Layout reutilizable de dos columnas con tabs verticales en el sidebar izquierdo.
 * Usado tanto por el modo "Accionamientos" como por "Gestiones".
 *
 * @param {object}   props
 * @param {Array}    props.tabsList         - Lista de tabs [{ key, component }]
 * @param {object}   props.componentIcons   - Mapa de key -> icono React
 * @param {number}   props.activeTab        - Índice del tab activo
 * @param {Function} props.setActiveTab     - Setter del tab activo
 * @param {string}   props.sectionTitle     - Título de la sección (texto)
 * @param {React.ReactNode} props.sectionIcon - Icono del título (heroicon)
 * @param {Function} props.onClose          - Callback para cerrar el modal
 * @param {string}   props.mostrarTabla     - Estado de tabla visible
 * @param {Function} props.setMostrarTabla  - Setter de tabla visible
 * @param {Function} props.onNavigationReady
 * @param {Function} props.onSizeChange
 * @param {string}   props.extraSidebarClass - Clase CSS adicional para el sidebar
 */
const VerticalTabsLayout = ({
  tabsList,
  componentIcons,
  activeTab,
  setActiveTab,
  sectionTitle,
  sectionIcon,
  onClose,
  mostrarTabla,
  setMostrarTabla,
  onNavigationReady,
  onSizeChange,
  extraSidebarClass = "",
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        {/* Columna izquierda: tabs verticales */}
        <div
          className={`w-16 md:w-64 flex-shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface-secondary)] overflow-auto h-fit ${extraSidebarClass}`}
        >
          <div className="p-1 md:p-4">
            {/* Título de la sección */}
            <h3 className="text-sm font-semibold text-[var(--color-jerarquia3)] mb-1.5 md:mb-3 uppercase tracking-wide flex items-center justify-center">
              {sectionIcon && (
                <span className="mr-2 w-5 h-5 flex-shrink-0">{sectionIcon}</span>
              )}
              <span className="hidden md:inline">{sectionTitle}</span>
            </h3>

            {/* Nav de tabs verticales */}
            <nav
              className="flex flex-col gap-y-0.5 md:gap-y-2"
              aria-label={`Tabs ${sectionTitle} Verticales`}
              role="tablist"
              aria-orientation="vertical"
            >
              {tabsList.map((tab, index) => (
                <button
                  key={tab.key}
                  type="button"
                  className={`
                    w-full py-1 px-1 md:py-3 md:px-4
                    inline-flex items-center justify-center md:justify-start
                    gap-x-1 md:gap-x-3 text-sm font-medium text-left
                    border border-[var(--color-border)] rounded-lg
                    transition-colors duration-200
                    hover:bg-[var(--color-surface-secondary)]
                    focus:outline-hidden
                    disabled:opacity-50 disabled:pointer-events-none
                    ${
                      activeTab === index
                        ? "bg-[var(--color-surface)] border-[var(--color-jerarquia2)] text-[var(--color-jerarquia3)] shadow-sm"
                        : "bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-jerarquia3)] hover:border-[var(--color-border)]"
                    }
                  `}
                  id={`tab-${sectionTitle.toLowerCase()}-vertical-item-${index}`}
                  aria-selected={activeTab === index}
                  data-hs-tab={`#tab-${sectionTitle.toLowerCase()}-vertical-content-${index}`}
                  aria-controls={`tab-${sectionTitle.toLowerCase()}-vertical-content-${index}`}
                  role="tab"
                  title={tab.key}
                  onClick={() => setActiveTab(index)}
                >
                  {/* Icono */}
                  <span
                    className={`${
                      activeTab === index
                        ? "text-[var(--color-jerarquia3)]"
                        : "text-[var(--color-text-secondary)]"
                    } flex-shrink-0 scale-75 md:scale-100`}
                  >
                    {componentIcons[tab.key]}
                  </span>

                  {/* Label */}
                  <span className="hidden md:inline flex-1">{tab.key}</span>

                  {/* Indicador activo */}
                  {activeTab === index && (
                    <span className="flex-shrink-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-jerarquia3 rounded-full" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Columna derecha: contenido del tab activo */}
        <div className="flex-1 h-full relative overflow-hidden">
          <div className="overflow-visible h-full">
            <div className="px-4 py-4">
              <ModalCicle
                tabsList={tabsList}
                componentIcons={componentIcons}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                renderNavInHeader={false}
                mostrarTabla={mostrarTabla}
                setMostrarTabla={setMostrarTabla}
                onNavigationReady={onNavigationReady}
                onSizeChange={onSizeChange}
                headerControlsActive={false}
                headerStates={{}}
              />
            </div>
          </div>

          {/* Botón cerrar en la esquina superior derecha */}
          <CloseButtonCampanas
            onClose={onClose}
            className="absolute -top-3 right-0"
          />
        </div>
      </div>
    </div>
  );
};

export default VerticalTabsLayout;
