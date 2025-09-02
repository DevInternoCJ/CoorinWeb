import React, { useState } from "react";
import dataDash from "../../dataDash";
import { ExecutiveChart } from "../../DashboardIcons";
import { IconMetas, IconValidadores, IconEncargados, IconCatalogos, IconScripts, IconPantalla } from "./IconesEjecutives";
import ModalMetasEjecutivos from "./ModalMetasEjecutivos";
import LampshadeFields from "../../../administration/gespa/camposPantalla/LampshadeFields"
import ModalValidadoresEjecutivos from "./ModalValidadoresEjecutivos";
import ModalEncargadosEjecutivos from "./ModalEncargadosEjecutivos";
import ModalCatalogosEjecutivos from "./ModalCatalogosEjecutivos";
import ModalScriptsEjecutivos from "./ModalScriptsEjecutivos";
import ModalPantallaEjecutivos from "./ModalPantallaEjecutivos";

const CardExecutive = () => {
  const [showMetasModal, setShowMetasModal] = useState(false);
  const [showValidadoresModal, setShowValidadoresModal] = useState(false);
  const [showEncargadosModal, setShowEncargadosModal] = useState(false);
  const [showCatalogosModal, setShowCatalogosModal] = useState(false);
  const [showScriptsModal, setShowScriptsModal] = useState(false);
  const [showPantallaModal, setShowPantallaModal] = useState(false);

  const handleCardClick = (title) => {
    if (title === "Metas") {
      setShowMetasModal(true);
    } else if (title === "Validadores") {
      setShowValidadoresModal(true);
    } else if (title === "Encargados") {
      setShowEncargadosModal(true);
    } else if (title === "Catalogos") {
      setShowCatalogosModal(true);
    } else if (title === "Scripts") {
      setShowScriptsModal(true);
    } else if (title === "Pantalla") {
      setShowPantallaModal(true);
    } else {
      alert(`Click en ${title}`);
    }
  };

  return (
    <>
      {dataDash.map((catalog) => (
        <div
          className="card card-sm sm:max-w-sm rounded-xl p-1 xl:max-w-none transition-all duration-200 ease-in-out hover:scale-105 group relative overflow-visible animated-border cursor-pointer"
          key={catalog.id}
          style={{ backgroundColor: `var(--${catalog.color})` }}
          tabIndex={0}
          role="button"
          onClick={() => handleCardClick(catalog.title)}
        >
          {/* Máscara opaca al hacer hover */}
          <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-15 transition-opacity duration-100 bg-black"></div>
          <div className="card-header">
            <h5
              className="card-title font-weight-600"
              style={{ color: `var(--${catalog.fontcolor})` }}
            >
              {catalog.title}
            </h5>
          </div>
          <div key={catalog.id} className="card-body">
            <div className="flex justify-center">
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
          <div className="card-footer text-center">
            <p className="text-base-content group-hover:text-black transition-colors duration-200">Abrir</p>
          </div>
        </div>
      ))}
      
      {/* Modal de Metas */}
      {showMetasModal && (
        <ModalMetasEjecutivos onClose={() => setShowMetasModal(false)} />
      )}

      {/* Modal de Pantalla */}
      {showPantallaModal && (
        <LampshadeFields 
          isOpen={showPantallaModal} 
          onClose={() => setShowPantallaModal(false)} 
        />
      )}
      
      {/* Modal de Validadores */}
      {showValidadoresModal && (
        <ModalValidadoresEjecutivos onClose={() => setShowValidadoresModal(false)} />
      )}
      
      {/* Modal de Encargados */}
      {showEncargadosModal && (
        <ModalEncargadosEjecutivos onClose={() => setShowEncargadosModal(false)} />
      )}
      
      {/* Modal de Catálogos */}
      {showCatalogosModal && (
        <ModalCatalogosEjecutivos onClose={() => setShowCatalogosModal(false)} />
      )}
      
      {/* Modal de Scripts */}
      {showScriptsModal && (
        <ModalScriptsEjecutivos onClose={() => setShowScriptsModal(false)} />
      )}
      
      {/* Modal de Pantalla */}
      {showPantallaModal && (
        <ModalPantallaEjecutivos onClose={() => setShowPantallaModal(false)} />
      )}
    </>
  );
};

export default CardExecutive;