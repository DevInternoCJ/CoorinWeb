import React, { useState, useRef } from "react";
import GlobalModal from "../../../../../../components/Modal/GlobalModal";
import ModalHeader from "../ModalHeader";
import ModalBase from "../../../../board/ModalBase";
import IconCircular from "../../../../../../components/Iconos/IconCircular";
import { InputPhrases } from "./InputPhrases";
import SavePhrases from "./SavePhrases";
import { IconWarning } from "../../../../board/executives/scripts/IconScripts";
import { IconPhrases } from "../IconsTemplates";

const Phrases = ({ onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState(null); // 'add', 'list', o null
  const modalRef = useRef(null);
  const { bounce } = ModalBase.useModalLogic();
  const handleProductChange = (product) => {
    setSelectedProduct(product);
    if (!product) {
      setActiveView(null); // Resetear vista si se deselecciona el producto
    }
  };
  // Manejar cambio de vista (mutuamente excluyente)
  const handleViewChange = (view) => {
    setActiveView(activeView === view ? null : view);
  };

  // Configuración de checkboxes
  const checkboxOptions = [
    {
      id: "add-checkbox",
      label: "Agregar",
      view: "add",
      checked: activeView === "add",
      onChange: () => handleViewChange("add"),
    },
    {
      id: "list-checkbox",
      label: "Ver Lista",
      view: "list",
      checked: activeView === "list",
      onChange: () => handleViewChange("list"),
    },
  ];

  return (
    <GlobalModal isOpen onClose={onClose} title="Frases" mode="content" showHeader={false} showCloseButton={false}>
      <div
        ref={modalRef}
        className={`${
          bounce ? "animate-bounce-modal" : ""
        } bg-[var(--color-surface-modal)] text-[var(--color-text-primary)] modal-container rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden border border-[var(--color-border)] flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader
          icon={
            <IconCircular size="size-10">
              <IconPhrases className="size-6" />
            </IconCircular>
          }
          title="Frases"
          onClose={onClose}
          selectedProduct={selectedProduct}
          setSelectedProduct={handleProductChange}
          verifyResult={verifyResult}
          setVerifyResult={setVerifyResult}
          loading={loading}
          setLoading={setLoading}
        />
        <div className="modal-scroll-body bg-[var(--color-surface-secondary)]">
          {selectedProduct && (
            <div className="flex flex-wrap items-center gap-3 px-3 py-3 sm:px-6 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
              {checkboxOptions.map((option) => (
                <label
                  key={option.id}
                  htmlFor={option.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    id={option.id}
                    checked={option.checked}
                    onChange={option.onChange}
                    className="modal-checkbox shrink-0 w-4 h-4 rounded transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                  />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          )}
          {/* Contenido principal */}
          <div className="">
            {!selectedProduct && (
              <div className="flex py-10 m-5 flex-col items-center h-60 justify-center rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
                <IconWarning className="size-8 mb-2" />
                <p className="text-sm font-medium">
                  Selecciona un producto para continuar
                </p>
              </div>
            )}
            {/* Mensaje cuando hay producto pero no hay vista seleccionada */}
            {selectedProduct && !activeView && (
              <div className="flex flex-col items-center justify-center text-center text-[var(--color-text-muted)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg py-20">
                <IconWarning className="size-8" />
                <p className="text-sm text-muted-foreground mt-1">
                  Seleccione el producto para gestionar scripts.
                </p>
              </div>
            )}
            {/* Vista: Agregar Frase */}
            {selectedProduct && activeView === "add" && (
              <div>
                <InputPhrases />
              </div>
            )}
            {/* Vista: Lista de Frases */}
            {selectedProduct && activeView === "list" && (
              <div>
                <SavePhrases />
              </div>
            )}
          </div>
        </div>
      </div>
    </GlobalModal>
  );
};

export default Phrases;
