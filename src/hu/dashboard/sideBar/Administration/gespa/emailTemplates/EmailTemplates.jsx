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
    <div className="modal-blur-bg overflow-hidden fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className={`${bounce ? " animate-bounce-modal" : ""} bg-white rounded-lg shadow-2xl w-ful max-w-6xl max-h-[90vh] overflow-hidden border border-gray-300`}
        onClick={e => e.stopPropagation()}
      >
         <ModalHeader
          icon={<IconTemplate className="size-6" />}
          title="Plantillas Correos"
          onClose={onClose}
        />

        {/* Content específico de EmailTemplates */}
        <div div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] bg-gray-50 space-y-4">
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
    </div>
  );
};

export default EmailTemplates;
