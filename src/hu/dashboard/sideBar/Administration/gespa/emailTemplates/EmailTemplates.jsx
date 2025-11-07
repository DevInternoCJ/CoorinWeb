import React, { useState, useEffect, useRef } from "react";
import ModalHeader from "../ModalHeader";
import Template from "./Template";
import LoadDates from "./LoadDates";
import { PostLoadData } from "../../../../../../services/mark/albaz/LokiServices";
import ModalBase from "../../../../board/ModalBase";
import { IconTemplate } from "../IconsTemplates";
import { useWalletProducts } from "../../../../../login/WalletProduct"
import IconCircular from "../../../../../../components/iconos/IconCircular"; 
import { IconWarning } from "../../../../board/executives/scripts/IconScripts";

const EmailTemplates = ({ onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDataTables, setShowDataTables] = useState(false); // Estado para controlar la visibilidad de las tablas
  const [plantillas, setPlantillas] = useState([]);
  const modalRef = useRef(null);
  const { bounce } = ModalBase.useModalLogic();
  const [datosDeudor, setDatosDeudor] = useState({}); // Nuevo estado para datosDeudor
  const [datosProductoCompleto, setDatosProductoCompleto] = useState({});
  const { walletProducts} = useWalletProducts();
  const idProducto = walletProducts?.[0]?.idProducto;
  const idCartera = walletProducts?.[0]?.idCartera;

  const actualizarPlantillas = async () => {
    const data = { idCartera, idProducto};
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
    <div className="modal-blur-bg overflow-hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className={`${
          bounce ? " animate-bounce-modal" : ""
        } bg-white rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden border border-gray-300 flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader
          icon={ <IconCircular size="size-10">
               <IconTemplate className="size-6" />
            </IconCircular>}
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
        {selectedProduct ? (
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
        ) : (
           <div>
                        <div className="flex m-5 flex-col items-center justify-center text-center text-gray-500 bg-gray-200 rounded-lg py-20">
                                    <IconWarning className="size-8"/>
                                    <p className="text-sm text-gray-400 mt-1">
                                      Seleccione el producto para gestionar scripts.
                                    </p>
                                  </div>
                                  </div>
                                )}
      </div>
    </div>
  );
};

export default EmailTemplates;

