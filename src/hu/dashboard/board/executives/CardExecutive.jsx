import React, { useState } from "react";
import dataDash from "../../dataDash";
import { ExecutiveChart } from "../../DashboardIcons";
import {
  IconMetas,
  IconValidadores,
  IconEncargados,
  IconCatalogos,
  IconScripts,
  IconPantalla,
} from "./IconesEjecutives";
import MetasModal from "./ModalMetasModal";
import LampshadeFields from "../../board/screenFields/LampshadeFields";
import ModalValidadoresEjecutivos from "./ModalValidadoresEjecutivos";
import ModalEncargadosEjecutivos from "./ModalEncargadosEjecutivos";
import CatalogosModal from "./ModalCatalogosModal";
import ModalScriptsEjecutivos from "./ModalScriptsEjecutivos";

const CardExecutive = ({ onModalOpen, onModalClose }) => {
  const [showMetasModal, setShowMetasModal] = useState(false);
  const [showValidadoresModal, setShowValidadoresModal] = useState(false);
  const [showEncargadosModal, setShowEncargadosModal] = useState(false);
  const [showCatalogosModal, setShowCatalogosModal] = useState(false);
  const [showScriptsModal, setShowScriptsModal] = useState(false);
  const [showPantallaModal, setShowPantallaModal] = useState(false);

  // Funciones para manejar la apertura y cierre de modales
  const handleOpenModal = (modalSetter) => {
    modalSetter(true);
    if (onModalOpen) onModalOpen();
  };

  const handleCloseModal = (modalSetter) => {
    modalSetter(false);
    if (onModalClose) onModalClose();
  };

  const handleCardClick = (title) => {
    if (title === "Metas") {
      handleOpenModal(setShowMetasModal);
    } else if (title === "Validadores") {
      handleOpenModal(setShowValidadoresModal);
    } else if (title === "Encargados") {
      handleOpenModal(setShowEncargadosModal);
    } else if (title === "Catalogos") {
      handleOpenModal(setShowCatalogosModal);
    } else if (title === "Scripts") {
      handleOpenModal(setShowScriptsModal);
    } else if (title === "Pantalla") {
      handleOpenModal(setShowPantallaModal);
    } else {
      alert(`Click en ${title}`);
    }
  };

 return (
    <>
      {dataDash.map((catalog) => (
        <div
          className="card card-sm sm:max-w-sm rounded-2xl p-2 xl:max-w-none transition-all duration-200 ease-in-out hover:scale-105 group relative overflow-visible animated-border cursor-pointer shadow-none"
          key={catalog.id}
          style={{ backgroundColor: `var(--${catalog.color})` }}
          tabIndex={0}
          role="button"
          onClick={() => handleCardClick(catalog.title)}>
          {/* Máscara opaca al hacer hover */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-100"></div>
          <div className="card-header p-1">
            <h5
              className="card-title font-weight-600"
              style={{ color: `var(--${catalog.fontcolor})` }}>
              {catalog.title}
            </h5>
          </div>
          <div key={catalog.id} className="card-body p-3 mb-0">
            <div className="flex justify-center">
              <div className="avatar avatar-placeholder">
                <div
                  className={`bg-neutral-300/${catalog.iconShadow} text-neutral-content w-15 rounded-full`}>
                  {catalog.title === "Metas" ? (
                    <IconMetas
                      className="size-8"
                      style={{ color: `var(--${catalog.fontcolor})` }}
                    />
                  ) : catalog.title === "Validadores" ? (
                    <IconValidadores
                      className="size-8"
                      style={{ color: `var(--${catalog.fontcolor})` }}
                    />
                  ) : catalog.title === "Encargados" ? (
                    <IconEncargados
                      className="size-8"
                      style={{ color: `var(--${catalog.fontcolor})` }}
                    />
                  ) : catalog.title === "Catalogos" ? (
                    <IconCatalogos
                      className="size-8"
                      style={{ color: `var(--${catalog.fontcolor})` }}
                    />
                  ) : catalog.title === "Scripts" ? (
                    <IconScripts
                      className="size-8"
                      style={{ color: `var(--${catalog.fontcolor})` }}
                    />
                  ) : catalog.title === "Pantalla" ? (
                    <IconPantalla
                      className="size-8"
                      style={{ color: `var(--${catalog.fontcolor})` }}
                    />
                  ) : (
                    <ExecutiveChart
                      className="size-8"
                      style={{ color: `var(--${catalog.fontcolor})` }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer text-center">
            <p
              className="group-hover:text-black transition-colors duration-200"
              style={{ color: `var(--${catalog.fontcolor})` }}>
              Abrir
            </p>
          </div>
        </div>
      ))}

      {/* Modal de Metas */}
      <MetasModal 
        isOpen={showMetasModal}
        onClose={() => handleCloseModal(setShowMetasModal)}
        // size por defecto es ahora "3xl" (más angosto que el original)
      />

      {/* Modal de Pantalla */}
      {showPantallaModal && (
        <LampshadeFields
          isOpen={showPantallaModal}
          onClose={() => handleCloseModal(setShowPantallaModal)}
        />
      )}

      {/* Modal de Validadores */}
      {showValidadoresModal && (
        <ModalValidadoresEjecutivos
          onClose={() => handleCloseModal(setShowValidadoresModal)}
        />
      )}

      {/* Modal de Encargados */}
      {showEncargadosModal && (
        <ModalEncargadosEjecutivos
          onClose={() => handleCloseModal(setShowEncargadosModal)}
        />
      )}

      {/* Modal de Catálogos */}
      <CatalogosModal 
        isOpen={showCatalogosModal}
        onClose={() => handleCloseModal(setShowCatalogosModal)}
      />

      {/* Modal de Scripts */}
      {showScriptsModal && (
        <ModalScriptsEjecutivos onClose={() => handleCloseModal(setShowScriptsModal)} />
      )}

      {/* Modal de Pantalla */}
      {showPantallaModal && (
        <LampshadeFields onClose={() => handleCloseModal(setShowPantallaModal)} />
      )}
    </>
  );
};

export default CardExecutive;

