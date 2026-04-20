import React, { useState, useEffect, useRef } from "react";
import ModalScriptsHeader from "./ModalScriptsHeader";
import ModalScriptsContent from "./ModalScriptsContent";
import ModalScriptsFooter from "./ModalScriptsFooter";

const ModalScriptsEjecutivos = ({ onClose }) => {
  const [bounce, setBounce] = useState(false);
  const [shakeAnimation, setShakeAnimation] = useState(false);
  const modalRef = useRef(null);

  // Siempre define los hooks antes de cualquier return o condicional
  useEffect(() => {
    setBounce(true);
    const timer = setTimeout(() => setBounce(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      // Activar animación de shake en lugar de cerrar
      setShakeAnimation(true);
      setTimeout(() => setShakeAnimation(false), 500);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        backdropFilter: "blur(5px)",
      }}
      onClick={handleBackdropClick}
    >
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
          transform: bounce ? "scale(1.02)" : "scale(1)",
          transition: "transform 0.2s ease-out",
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
                @keyframes shake-modal {
                    0% { transform: scale(1); }
                    20% { transform: scale(1.05, 0.95); }
                    40% { transform: scale(0.95, 1.05); }
                    60% { transform: scale(1.03, 0.97); }
                    80% { transform: scale(0.97, 1.03); }
                    100% { transform: scale(1); }
                }
                .animate-shake-modal {
                    animation: shake-modal 0.5s;
                }
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
    </div>
  );
};

export default ModalScriptsEjecutivos;
