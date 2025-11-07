import React, { useState, useRef } from "react";
import ModalHeader from "../ModalHeader";
import ModalBase from "../../../../board/ModalBase";
import IconCircular from "../../../../../../components/iconos/IconCircular";
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
    <div className="modal-blur-bg overflow-hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className={`${
          bounce ? "animate-bounce-modal" : ""
        } bg-white rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden border border-gray-300 flex flex-col max-h-[90vh]`}
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
        <div className="flex-1 overflow-y-auto bg-gray-100">
          {selectedProduct && (
            <div className="flex items-center gap-6 px-6 py-4 bg-200 border-b border-gray-200">
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
                    className="shrink-0 w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          )}
          {/* Contenido principal */}
          <div className="">
            {!selectedProduct && (
              <div className="flex py-10 m-5 flex-col items-center h-60 justify-center rounded-lg bg-gray-200 text-gray-500">
                <IconWarning className="size-8 mb-2" />
                <p className="text-sm font-medium">
                  Selecciona un producto para continuar
                </p>
              </div>
            )}
            {/* Mensaje cuando hay producto pero no hay vista seleccionada */}
            {selectedProduct && !activeView && (
              <div className="flex flex-col items-center justify-center text-center text-gray-500 bg-gray-100 rounded-lg py-20">
                <IconWarning className="size-8" />
                <p className="text-sm text-gray-400 mt-1">
                  Seleccione el producto para gestionar scripts.
                </p>
              </div>
            )}
            {/* Vista: Agregar Frase */}
            {selectedProduct && activeView === "add" && (
              <div className="transition-all duration-300 ease-in-out">
                <InputPhrases />
              </div>
            )}
            {/* Vista: Lista de Frases */}
            {selectedProduct && activeView === "list" && (
              <div className="transition-all duration-300 ease-in-out">
                <SavePhrases />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phrases;
