import React, { useState, useRef, useEffect } from "react";
import ModalHeader from "../../../sideBar/Administration/gespa/ModalHeader";
import ModalBase from "../../../board/ModalBase";
import IconCircular from "../../../../../components/iconos/IconCircular";
import EditionScripts from "./EditionScripts";
import DataCharges from "./DataCharges";
import { IconWarning } from "./IconScripts";
import { IconScripts } from "../../../board/executives/IconesEjecutives";
import { toast } from "sonner";

const Scripts = ({ onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scripts, setScripts] = useState([]); // Scripts disponibles
  const [placeholderValues, setPlaceholderValues] = useState({}); // Valores de vista previa
  const [isDragging, setIsDragging] = useState(false); // Estado global del drag
  const modalRef = useRef(null);
  const dropAreaRef = useRef(null); // Referencia para el área editable
  const { bounce } = ModalBase.useModalLogic();

  // Cargar datos iniciales
  const handleDataLoaded = (loadedScripts, valores) => {
    setScripts(loadedScripts);
    setPlaceholderValues(valores);
  };

  // Actualizar scripts desde EditionScripts
  const handleScriptsUpdate = (updatedScripts) => {
    console.log("Actualizando scripts en Scripts.jsx:", updatedScripts);
    setScripts(updatedScripts);
  };

  // Manejador global para evitar drops fuera del área editable
  useEffect(() => {
    const handleDragOver = (e) => {
      e.preventDefault(); // necesario para permitir el drop
      if (!dropAreaRef.current) return;

      const rect = dropAreaRef.current.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      document.body.style.cursor = inside ? "grabbing" : "not-allowed";
    };

  const handleDrop = (e) => {
  if (!dropAreaRef.current) return;
  const rect = dropAreaRef.current.getBoundingClientRect();
  const inside =
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom;

  if (!inside) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    document.body.style.cursor = "default";

    toast.wa("Debes soltar el placeholder dentro del área editable.", {
      duration: 2500,
      position: "top-center",
      style: {
        background: "#fef2f2",
        border: "1px solid #fca5a5",
        color: "#b91c1c",
        fontWeight: "500",
      },
    });
  }
};


    const handleDragStart = () => setIsDragging(true);
    const handleDragEnd = () => {
      setIsDragging(false);
      document.body.style.cursor = "default";
    };

    window.addEventListener("dragstart", handleDragStart);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);
    window.addEventListener("dragend", handleDragEnd);

    return () => {
      window.removeEventListener("dragstart", handleDragStart);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
      window.removeEventListener("dragend", handleDragEnd);
      document.body.style.cursor = "default";
    };
  }, []);

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
                {/* Área editable con referencia para controlar drops */}
                <div ref={dropAreaRef} className="relative">
                  <EditionScripts
                    scripts={scripts}
                    placeholderValues={placeholderValues}
                    onSaveScript={() => handleDataLoaded([], {})}
                    onScriptsUpdate={handleScriptsUpdate}
                  />
                </div>
                <DataCharges onDataLoaded={handleDataLoaded} />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-gray-500 bg-gray-100 rounded-lg py-20">
                <IconWarning className="size-8" />
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