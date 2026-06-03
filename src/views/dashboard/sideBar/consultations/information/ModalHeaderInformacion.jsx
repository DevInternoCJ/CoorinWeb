import React from "react";
import {
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import ConsorcioLogo from "../../../../../assets/logo_coorin_7.svg";
import CloseButtonCampanas from "../../../components/CloseButtonReusable";
import { tabsListInformacion, COMPONENT_ICONS_INFORMACION } from "./ModalCicle";

// Mapa de alias cortos para mostrar en los tabs cuando el espacio es reducido
const TAB_SHORT_LABELS = {
  Ofrecimientos: "Ofrecimientos",
  Pagos: "Pagos",
  "Pagos Reportados": "Pagos Reportados",
  Búsquedas: "Búsquedas",
  "Datos Erróneos": "Errores",
  "Lista Negra": "Lista Negra",
  Arrepentimientos: "Arrepentimientos",
  Domicilios: "Domicilios",
  Correos: "Correos",
  Comentarios: "Comentarios",
  VGP: "VGP",
};

/**
 * Header completo para el modo "Información":
 * - Fila 1: logo + título + botón cerrar
 * - Fila 2: tabs horizontales con icono/label
 *
 * @param {object}   props
 * @param {object}   props.carouselNav     - { currentIndex, onTabChange }
 * @param {Function} props.onClose         - Callback para cerrar el modal
 */
const ModalHeaderInformacion = ({ carouselNav, onClose }) => {
  return (
    <>
      {/* Fila 1: logo · título · cerrar */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3 bg-[var(--color-surface-secondary)]">
        {/* Logo */}
        <div className="flex items-center shrink-0 mr-4">
          <img src={ConsorcioLogo} alt="Coorin" className="h-6 w-auto" />
        </div>

        {/* Título centrado */}
        <div className="flex-1 min-w-0 flex justify-center">
          <h2 className="text-lg font-semibold truncate text-jerarquia3 flex items-center gap-1.5">
            <InformationCircleIcon
              className="w-5 h-5 text-[var(--color-jerarquia3)]"
              aria-hidden="true"
            />
            Información
          </h2>
        </div>

        {/* Botón cerrar */}
        <div className="shrink-0 ml-4">
          <CloseButtonCampanas onClose={onClose} />
        </div>
      </div>

      {/* Fila 2: tabs horizontales */}
      <div className="w-full border-b border-[var(--color-border)] px-4 py-2 bg-[var(--color-surface-secondary)] flex justify-center">
        <nav
          className="w-full grid grid-cols-5 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-x-0.5 gap-y-0.5 justify-center"
          aria-label="Tabs de Información"
          role="tablist"
          aria-orientation="horizontal"
        >
          {tabsListInformacion.map((tab, index) => {
            const isActive = carouselNav?.currentIndex === index;
            const shortLabel = TAB_SHORT_LABELS[tab.key] ?? tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                className={`
                  w-full py-2 px-2 lg:px-3 xl:px-4
                  inline-flex items-center gap-x-1 text-xs font-medium text-center
                  border border-[var(--color-border)] rounded-t-lg
                  transition-colors duration-200
                  hover:bg-[var(--color-surface-secondary)]
                  focus:outline-hidden
                  disabled:opacity-50 disabled:pointer-events-none
                  ${
                    isActive
                      ? "bg-[var(--color-surface)] border-b-transparent text-[var(--color-jerarquia3)] border-[var(--color-jerarquia2)]"
                      : "bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-jerarquia3)]"
                  }
                `}
                id={`tab-info-item-${index}`}
                aria-selected={isActive}
                data-hs-tab={`#tab-info-content-${index}`}
                aria-controls={`tab-info-content-${index}`}
                role="tab"
                title={tab.key}
                onClick={() => carouselNav?.onTabChange?.(index)}
              >
                {/* Icono (solo en pantallas pequeñas) */}
                <span
                  className={`${
                    isActive
                      ? "text-[var(--color-jerarquia3)]"
                      : "text-[var(--color-text-muted)]"
                  } inline lg:hidden`}
                >
                  {COMPONENT_ICONS_INFORMACION[tab.key]}
                </span>

                {/* Label (solo en pantallas grandes) */}
                <span className="hidden lg:inline xl:inline 2xl:inline">
                  {shortLabel}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default ModalHeaderInformacion;
