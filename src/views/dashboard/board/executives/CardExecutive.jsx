import React, { useState } from "react";
import { useDashboardModalUrlSync } from "./../../../../hooks/useDashboardModalUrlSync";
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
import MetasModal from "./Metas/ModalMetasModal";
import LampshadeFields from "../../board/screenFields/LampshadeFields";
import ValidadoresModal from "./Validadores/ModalValidadoresModal";
import EncargadosModal from "../executives/Encargados/ModalEncargadosModal";
import CatalogosModal from "../../board/executives/Catalogos/ModalCatalogosModal";
import ModalScriptsEjecutivos from "./ModalScriptsEjecutivos";
import Scripts from "./scripts/Scripts";

const CardExecutive = ({ onModalOpen, onModalClose }) => {
  const [showMetasModal, setShowMetasModal] = useState(false);
  const [showValidadoresModal, setShowValidadoresModal] = useState(false);
  const [showEncargadosModal, setShowEncargadosModal] = useState(false);
  const [showCatalogosModal, setShowCatalogosModal] = useState(false);
  const [showScriptsModal, setShowScriptsModal] = useState(false);
  const [showPantallaModal, setShowPantallaModal] = useState(false);
  // Estado para el nombre del modal actual
  const [activeModalName, setActiveModalName] = useState("");

  const handleOpenModal = (modalSetter, modalName) => {
    modalSetter(true);
    setActiveModalName(modalName);
    if (onModalOpen) onModalOpen();
  };

  const handleCloseModal = (modalSetter) => {
    modalSetter(false);
    setActiveModalName("");
    if (onModalClose) onModalClose();
  };

  const handleCardClick = (title) => {
    if (title === "Metas") {
      handleOpenModal(setShowMetasModal, "Metas");
    } else if (title === "Validadores") {
      handleOpenModal(setShowValidadoresModal, "Validadores");
    } else if (title === "Encargados") {
      handleOpenModal(setShowEncargadosModal, "Encargados");
    } else if (title === "Catalogos") {
      handleOpenModal(setShowCatalogosModal, "Catalogos");
    } else if (title === "Scripts") {
      handleOpenModal(setShowScriptsModal, "Scripts");
    } else if (title === "Pantalla") {
      handleOpenModal(setShowPantallaModal, "Pantalla");
    } else {
      setActiveModalName(title);
      alert(`Click en ${title}`);
    }
  };
  // Sincroniza la URL con el nombre del modal abierto
  useDashboardModalUrlSync(
    "dashboardPage",
    showMetasModal ? "Metas" :
    showValidadoresModal ? "Validadores" :
    showEncargadosModal ? "Encargados" :
    showCatalogosModal ? "Catalogos" :
    showScriptsModal ? "Scripts" :
    showPantallaModal ? "Pantalla" :
    activeModalName ? activeModalName : ""
  );

  // Subcomponente que mide su propio ancho y decide si ocultar título
  const CardTile = ({ catalog }) => {
    return (
      <div
        className="card card-sm sm:max-w-sm rounded-2xl p-2 xl:max-w-none transition-all duration-200 ease-in-out hover:scale-105 group relative overflow-visible animated-border cursor-pointer shadow-none h-[156px] min-h-[156px] flex flex-col justify-between"
        style={{ backgroundColor: `var(--${catalog.color})` }}
        tabIndex={0}
        role="button"
        onClick={() => handleCardClick(catalog.title)}
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-100"></div>
        <div className="card-header p-1">
          <h5
            className={`card-title font-medium px-3 py-1 inline-block`}
            style={{ color: `var(--${catalog.fontcolor})` }}
          >
            {catalog.title}
          </h5>
        </div>
        <div className="card-body p-3 mb-0">
          <div className="flex justify-center">
            <div className="avatar avatar-placeholder">
              <div
                className="w-15 h-15 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:w-16 group-hover:h-16"
                style={{
                  backgroundColor: "rgba(253, 253, 253, 0.16)",
                }}
              >
                {catalog.title === "Metas" ? (
                  <IconMetas
                    className="size-9 transition-all duration-300 group-hover:size-12"
                    style={{ color: `var(--${catalog.fontcolor})` }}
                  />
                ) : catalog.title === "Validadores" ? (
                  <IconValidadores
                    className="size-9 transition-all duration-300 group-hover:size-12"
                    style={{ color: `var(--${catalog.fontcolor})` }}
                  />
                ) : catalog.title === "Encargados" ? (
                  <IconEncargados
                    className="size-9 transition-all duration-300 group-hover:size-12"
                    style={{ color: `var(--${catalog.fontcolor})` }}
                  />
                ) : catalog.title === "Catalogos" ? (
                  <IconCatalogos
                    className="size-9 transition-all duration-300 group-hover:size-12"
                    style={{ color: `var(--${catalog.fontcolor})` }}
                  />
                ) : catalog.title === "Scripts" ? (
                  <IconScripts
                    className="size-9 transition-all duration-300 group-hover:size-12"
                    style={{ color: `var(--${catalog.fontcolor})` }}
                  />
                ) : catalog.title === "Pantalla" ? (
                  <IconPantalla
                    className="size-9 transition-all duration-300 group-hover:size-12"
                    style={{ color: `var(--${catalog.fontcolor})` }}
                  />
                ) : (
                  <ExecutiveChart
                    className="size-9 transition-all duration-300 group-hover:size-12"
                    style={{ color: `var(--${catalog.fontcolor})` }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer text-center">
          <p
            className={`group-hover:text-black transition-colors duration-200`}
            style={{ color: `var(--${catalog.fontcolor})` }}
          >
            Abrir
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      {dataDash.map((catalog) => (
        <CardTile key={catalog.id} catalog={catalog} />
      ))}

      {/* Modal de Metas */}
      <MetasModal 
        isOpen={showMetasModal}
        onClose={() => handleCloseModal(setShowMetasModal)}
      />

      {/* Modal de Pantalla */}
      {showPantallaModal && (
        <LampshadeFields
          isOpen={showPantallaModal}
          onClose={() => handleCloseModal(setShowPantallaModal)}
        />
      )}

      {/* Modal de Validadores */}
      <ValidadoresModal 
        isOpen={showValidadoresModal}
        onClose={() => handleCloseModal(setShowValidadoresModal)}
      />

      {/* Modal de Encargados */}
      <EncargadosModal 
        isOpen={showEncargadosModal}
        onClose={() => handleCloseModal(setShowEncargadosModal)}
      />

      {/* Modal de Catálogos */}
      <CatalogosModal 
        isOpen={showCatalogosModal}
        onClose={() => handleCloseModal(setShowCatalogosModal)}
      />

      {/* Modal de Scripts */}
      {showScriptsModal && (
        <Scripts onClose={() => handleCloseModal(setShowScriptsModal)} />
      )}

      {/* Modal de Pantalla */}
      {showPantallaModal && (
        <LampshadeFields onClose={() => handleCloseModal(setShowPantallaModal)} />
      )}
    </>
  );
};

export default CardExecutive;

