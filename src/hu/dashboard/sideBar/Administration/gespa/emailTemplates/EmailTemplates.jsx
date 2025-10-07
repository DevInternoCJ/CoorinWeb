import React, { useState, useEffect, useRef } from "react";
import WalletSection from "../WalletSection";
import ModalHeader from "../ModalHeader";
import Template from "./Template";
import { IconTemplate } from "../IconsTemplates";
import LoadDates from "./LoadDates";
import { PostLoadData } from "../../../../../../services/LokiServices";
import ModalBase from "../../../../board/ModalBase"

const EmailTemplates = ({ onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDataTables, setShowDataTables] = useState(false); // Estado para controlar la visibilidad de las tablas
  const [saldo, setSaldo] = useState("");
  const [plantillas, setPlantillas] = useState([]);
  const modalRef = useRef(null);
  const { bounce } = ModalBase.useModalLogic();

  const actualizarPlantillas = async () => {
    // Puedes usar el mismo requestData que usa LoadDates
    const data = { idCartera: 1, idProducto: 1 };
    console.log(
      "Body enviado a PostLoadData:",
      data,
      typeof data,
      Array.isArray(data)
    );

    const response = await PostLoadData(data);
    console.log("requestData", data);
    if (response && response.plantillas) {
      setPlantillas(response.plantillas);
    }
  };
  // Limpiar estados cuando el modal se cierra
  useEffect(() => {
    return () => {
      setSelectedProduct(null);
      setVerifyResult(null);
      setLoading(false);
      setShowDataTables(false);
      setSaldo("");
      setPlantillas([]);
    };
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    // Mostrar las tablas de datos cuando se selecciona Amex (value = 1)
    if (product && product.value === 1) {
      setShowDataTables(true);
    } else {
      setShowDataTables(false);
    }
  };

  return (
    <div className="modal-blur-bg">
      <div className="modal-overlay" onClick={onClose} />
      <div
        ref={modalRef}
        className={`modal-content modal-xl-container${bounce ? " animate-bounce-modal" : ""}`}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: "1200px",
          minWidth: "900px", 
          height: "600px",
          display: "flex",
          flexDirection: "column",
          position: "relative"
        }}
      >
        {/* Header personalizado para EmailTemplates */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          borderBottom: "1px solid #e0e0e0",
          paddingBottom: "1rem"
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src="/public/logo_coorin_7.svg" alt="Logo Coorin" style={{ height: 36, marginRight: 8 }} />
            <IconTemplate className="inline mr-2" />
            <h2 className="modal-title">Plantillas Correos</h2>
          </div>
          <button
            onClick={onClose}
            className="modal-btn modal-btn-close ml-4"
            aria-label="Cerrar"
          >
            &times;
          </button>
        </div>

        {/* Content específico de EmailTemplates */}
        <div style={{ flex: 1, overflow: "auto", width: '100%', padding: '0 1rem' }}>
          <WalletSection
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            verifyResult={verifyResult}
            setVerifyResult={setVerifyResult}
            loading={loading}
            setLoading={setLoading}
            onProductSelect={handleProductSelect}
          />
          <Template
            saldo={saldo}
            plantillas={plantillas}
            onActualizarPlantillas={actualizarPlantillas}
          />
          {showDataTables && selectedProduct && (
            <div className="mt-6 border-t pt-6">
              <LoadDates
                selectedProduct={selectedProduct}
                onSaldoChange={setSaldo}
                onPlantillasChange={setPlantillas}
              />
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes bounce-modal {
          0% { transform: scale(1); }
          20% { transform: scale(1.05, 0.95); }
          40% { transform: scale(0.95, 1.05); }
          60% { transform: scale(1.03, 0.97); }
          80% { transform: scale(0.97, 1.03); }
          100% { transform: scale(1); }
        }
        .animate-bounce-modal {
          animation: bounce-modal 0.5s;
        }
      `}</style>
    </div>
  );
};

export default EmailTemplates;
