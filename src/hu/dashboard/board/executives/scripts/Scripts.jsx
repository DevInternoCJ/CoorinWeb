import React, { useState, useRef } from "react";
import ModalHeader from "../../../sideBar/Administration/gespa/ModalHeader";
import ModalBase from "../../../board/ModalBase";
import { IconScreens } from "../../../sideBar/Administration/gespa/IconsTemplates";
import IconCircular from "../../../../../components/iconos/IconCircular";
import EditionScripts from "./EditionScripts";
import DataCharges from "./DataCharges";
import { IconWarning } from "./IconScripts";
import {IconScripts} from "../../../board/executives/IconesEjecutives";

const Scripts = ({ onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scripts, setScripts] = useState([]); // Scripts disponibles
  const [placeholderValues, setPlaceholderValues] = useState({}); // Valores para reemplazar en vista previa
  const modalRef = useRef(null);
  const { bounce } = ModalBase.useModalLogic();
  const handleDataLoaded = (loadedScripts, valores) => {
    setScripts(loadedScripts);
    setPlaceholderValues(valores);
  };
  // Callback para actualizar scripts desde EditionScripts
  const handleScriptsUpdate = (updatedScripts) => {
    console.log(" Actualizando scripts en Scripts.jsx:", updatedScripts);
    setScripts(updatedScripts);
  };

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
              <IconScripts className="size-5" />
            </IconCircular>
          }
          title="Scripts"
          onClose={onClose}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          verifyResult={verifyResult}
          setVerifyResult={setVerifyResult}
          loading={loading}
          setLoading={setLoading}
        />
      <div className="overflow-auto flex-1">
          <div className="m-5">
            {selectedProduct ? (
              <>
                <EditionScripts
                  scripts={scripts}
                  placeholderValues={placeholderValues}
                  onSaveScript={() => handleDataLoaded([], {})}
                  onScriptsUpdate={handleScriptsUpdate}
                />
                <DataCharges onDataLoaded={handleDataLoaded} />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-gray-500 bg-gray-100 rounded-lg py-20">
                <IconWarning className="size-8"/>
                <p className="text-sm text-gray-400 mt-1">
                  Seleccione el producto para gestionar scripts.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scripts;



