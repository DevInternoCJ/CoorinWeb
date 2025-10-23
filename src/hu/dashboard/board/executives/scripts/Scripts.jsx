import React, { useState, useRef } from "react";
import ModalHeader from "../../../sideBar/Administration/gespa/ModalHeader";
import ModalBase from "../../../board/ModalBase";
import { IconScreens } from "../../../sideBar/Administration/gespa/IconsTemplates";
import IconCircular from "../../../../../components/iconos/IconCircular";
import EditionScripts from "./EditionScripts";
import DataCharges from "./DataCharges";

const Scripts = ({ onClose }) => {
  // Estados
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scripts, setScripts] = useState([]); // ✅ NUEVO ESTADO PARA SCRIPTS
  
  // Refs y hooks
  const modalRef = useRef(null);
  const { bounce } = ModalBase.useModalLogic();

  // ✅ Función para recibir scripts desde DataCharges
  const handleScriptsLoaded = (loadedScripts) => {
    setScripts(loadedScripts);
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
              <IconScreens className="size-6" />
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
        <div className="overflow-auto">
          <div className="m-5">
            {/* ✅ Pasa los scripts a EditionScripts */}
            <EditionScripts scripts={scripts} />
            
            {/* ✅ Pasa la función callback a DataCharges */}
            <DataCharges onScriptsLoaded={handleScriptsLoaded} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scripts;