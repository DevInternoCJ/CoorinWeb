import React, { useState, useRef } from "react";
import ModalHeader from "../ModalHeader";
import ModalBase from "../../../../board/ModalBase";
import { IconScreens } from "../IconsTemplates";
import { useWalletProducts } from "../../../../../login/WalletProduct";
import IconCircular from "../../../../../../components/iconos/IconCircular";
import { InputPhrases } from "./InputPhrases";
import SavePhrases from "./SavePhrases";

const Phrases = ({ onClose }) => {
  // Estados
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState(null); // 'add', 'list', o null

  // Refs y hooks
  const modalRef = useRef(null);
  const { bounce } = ModalBase.useModalLogic();
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
        {/* Header */}
        <ModalHeader
          icon={
            <IconCircular size="size-10">
              <IconScreens className="size-6" />
            </IconCircular>
          }
          title="Frases"
          onClose={onClose}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          verifyResult={verifyResult}
          setVerifyResult={setVerifyResult}
          loading={loading}
          setLoading={setLoading}
        />

        {/* Body con scroll */}
        <div className="flex-1 overflow-y-auto bg-gray-100">
          {/* Controles - Checkboxes */}
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

          {/* Contenido principal */}
          <div className="">
            {/* Mensaje cuando no hay nada seleccionado */}
            {!activeView && (
              <div className="flex my-3 flex-col items-center justify-center bg-gray-100 text-gray-500">
                <svg
                  className="w-10 h-10 mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm font-medium">Selecciona una opción</p>
              </div>
            )}

            {/* Vista: Agregar Frase */}
            {activeView === "add" && (
              <div className="transition-all duration-300 ease-in-out">
                <InputPhrases />
              </div>
            )}

            {/* Vista: Lista de Frases */}
            {activeView === "list" && (
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