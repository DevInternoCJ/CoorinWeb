import React, { useState, useRef } from "react";
import GlobalModal from "../../../../components/Modal/GlobalModal";
import ModalScriptsHeader from "./ModalScriptsHeader";
import ModalScriptsContent from "./ModalScriptsContent";
import ModalScriptsFooter from "./ModalScriptsFooter";

const ModalScriptsEjecutivos = ({ onClose }) => {
  const [shakeAnimation, setShakeAnimation] = useState(false);
  const modalRef = useRef(null);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      // Activar animación de shake en lugar de cerrar
      setShakeAnimation(true);
      setTimeout(() => setShakeAnimation(false), 500);
    }
  };

  return (
    <GlobalModal isOpen onClose={onClose} onBackdropClick={handleBackdropClick} title="Scripts de ejecutivos" mode="content" showHeader={false} showCloseButton={false} closeOnBackdropClick={false}>
      <div
        ref={modalRef}
        style={{
          backgroundColor: "var(--color-surface-modal)",
          borderRadius: "12px",
          padding: "1.5rem",
          maxWidth: "95vw",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
        className={`scrollbar-gray${shakeAnimation ? " animate-shake-modal" : ""}`}
      >
        <div
          className="modal-xl-container"
          style={{ width: "70vw", maxWidth: "70vw", overflowX: "hidden" }}
        >
          <ModalScriptsHeader onClose={onClose} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
              height: "calc(100% - 80px)", // Altura ajustada para mostrar el footer
              overflow: "hidden",
            }}
          >
            {/* Contenido principal con los scripts */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                flex: 1,
                overflow: "hidden",
              }}
            >
              <ModalScriptsContent />
            </div>

            {/* Footer con mensaje informativo - siempre visible */}
            <div
              style={{
                padding: "0.5rem 0",
                backgroundColor: "#f9fafb",
                borderTop: "1px solid #e5e7eb",
                borderRadius: "0 0 8px 8px",
                flexShrink: 0,
              }}
            >
              <ModalScriptsFooter />
            </div>
          </div>
        </div>
      </div>
      <style>{`
                .scrollbar-gray::-webkit-scrollbar {
                    height: 8px;
                    width: 8px;
                    background: #f5f5f5;
                }
                .scrollbar-gray::-webkit-scrollbar-thumb {
                    background: #b0b0b0;
                    border-radius: 4px;
                }
                .scrollbar-gray::-webkit-scrollbar-thumb:hover {
                    background: #888;
                }
            `}</style>
    </GlobalModal>
  );
};

export default ModalScriptsEjecutivos;
