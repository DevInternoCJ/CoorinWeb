import React, { useState, useEffect, useRef } from "react";
import ModalHeader from "../ModalHeader";
import Template from "./Template";
import LoadDates from "./LoadDates";
import { PostLoadData } from "../../../../../../services/mark/albaz/LokiServices";
import ModalBase from "../../../../board/ModalBase";
import { IconScreens } from "../IconsTemplates";

const EmailTemplates = ({ onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDataTables, setShowDataTables] = useState(false); // Estado para controlar la visibilidad de las tablas
  const [plantillas, setPlantillas] = useState([]);
  const modalRef = useRef(null);
  const { bounce } = ModalBase.useModalLogic();
  const [datosDeudor, setDatosDeudor] = useState({}); // ✅ Nuevo estado para datosDeudor
  const [datosProductoCompleto, setDatosProductoCompleto] = useState({});

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

  // Función para actualizar datosDeudor desde LoadDates
  const handleDatosDeudorChange = (nuevosDatosDeudor) => {
    setDatosDeudor(nuevosDatosDeudor);
  };
  // ✅ NUEVA FUNCIÓN: Actualizar datosProductoCompleto desde LoadDates
  const handleDatosProductoCompletoChange = (nuevosDatosProducto) => {
    setDatosProductoCompleto(nuevosDatosProducto);
  }
  // Limpiar estados cuando el modal se cierra
  useEffect(() => {
    return () => {
      setSelectedProduct(null);
      setVerifyResult(null);
      setLoading(false);
      setShowDataTables(false);
      setPlantillas([]);
       setDatosProductoCompleto({});
    };
  }, []);


  return (
    <div className="modal-blur-bg overflow-hidden fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className={`${
          bounce ? " animate-bounce-modal" : ""
        } bg-white rounded-lg shadow-2xl w-ful max-w-6xl max-h-[90vh] overflow-hidden border border-gray-300`}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader
          icon={<IconScreens className="size-6" />}
          title="Plantillas de Correo"
          onClose={onClose}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          verifyResult={verifyResult}
          setVerifyResult={setVerifyResult}
          loading={loading}
          setLoading={setLoading}
          setShowDataTables={setShowDataTables}
        />
        <div
          className="px-6 pb-6 overflow-y-auto max-h-[calc(90vh-120px)] bg-gray-50 space-y-4"
        >
          {selectedProduct && (
            <Template
              plantillas={plantillas}
              onActualizarPlantillas={actualizarPlantillas}
              idProducto={selectedProduct.value}
              datosDeudor={datosDeudor}
              datosProductoCompleto={datosProductoCompleto} 
            />
          )}
          {showDataTables && selectedProduct && (
            <div >
              <LoadDates
                selectedProduct={selectedProduct}
                onPlantillasChange={setPlantillas}
                onDatosDeudorChange={handleDatosDeudorChange} 
                onDatosProductoCompletoChange={handleDatosProductoCompletoChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailTemplates;

