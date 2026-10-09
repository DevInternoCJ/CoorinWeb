import React, { useState, useEffect, useRef } from "react";
import GlobalModal from "../../../../../../components/Modal/GlobalModal";
import ModalHeader from "../ModalHeader";
import Template from "./Template";
import LoadDates from "./LoadDates";
import { PostLoadData } from "../../../../../../services/mark/Orochi/LokiServices";
import ModalBase from "../../../../board/ModalBase";
import { IconTemplate } from "../IconsTemplates";
import { useWalletProducts } from "../../../../../login/WalletProduct";
import IconCircular from "../../../../../../components/Iconos/IconCircular";
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
  const { walletProducts } = useWalletProducts();
  const idProducto = walletProducts?.[0]?.idProducto;
  const idCartera = walletProducts?.[0]?.idCartera;

  const actualizarPlantillas = async () => {
    const data = { idCartera, idProducto };
    console.log(
      "Body enviado a PostLoadData:",
      data,
      typeof data,
      Array.isArray(data),
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
  //  NUEVA FUNCIÓN: Actualizar datosProductoCompleto desde LoadDates
  const handleDatosProductoCompletoChange = (nuevosDatosProducto) => {
    setDatosProductoCompleto(nuevosDatosProducto);
  };
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
    <GlobalModal isOpen onClose={onClose} title="Plantillas de correo" mode="content" showHeader={false} showCloseButton={false}>
      <div
        ref={modalRef}
        className={`${
          bounce ? " animate-bounce-modal" : ""
        } bg-[var(--color-surface-modal)] text-[var(--color-text-primary)] modal-container rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden border border-[var(--color-border)] flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader
          icon={
            <IconCircular size="size-10">
              <IconTemplate className="size-6" />
            </IconCircular>
          }
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
          <div className="modal-scroll-body px-3 pb-3 sm:px-6 sm:pb-6 bg-surface-secondary space-y-4">
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
              <div>
                <LoadDates
                  selectedProduct={selectedProduct}
                  onPlantillasChange={setPlantillas}
                  onDatosDeudorChange={handleDatosDeudorChange}
                  onDatosProductoCompletoChange={
                    handleDatosProductoCompletoChange
                  }
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex m-5 flex-col items-center justify-center text-center text-[var(--color-text-muted)] bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg py-20">
              <IconWarning className="size-8" />
              <p className="text-sm text-muted-foreground mt-1">
                Seleccione el producto para gestionar scripts.
              </p>
            </div>
          </div>
        )}
      </div>
    </GlobalModal>
  );
};

export default EmailTemplates;
