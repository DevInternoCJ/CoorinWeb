import React, { useState } from "react";
import ModalCampanasCampanias from "./ModalCampanasCampanias";
import ModalCampanasEjecutivos from "./ModalCampanasEjecutivos";
import ModalHeader from "../gespa/ModalHeader";
import IconCircular from "../../../../../components/Iconos/IconCircular";
import { IconCampaign } from "./IconCampaign";

const ModalCampanas = ({ onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCartera, setSelectedCartera] = useState(null); //  Nuevo estado
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [campañaSeleccionada, setCampañaSeleccionada] = useState({
    id: null,
    nombre: "",
  });

  const handleProductChange = (product) => {
    setSelectedProduct(product);
  };

  const handleCarteraChange = (cartera) => { //  Nueva función
    setSelectedCartera(cartera);
  };

  const handleSeleccionCampaña = (idCampaña, nombreCampaña) => {
    setCampañaSeleccionada({ id: idCampaña, nombre: nombreCampaña || "" });
  };

  return (
    <div>
      <ModalHeader
        icon={
          <IconCircular size="size-10">
            <IconCampaign className="size-6" />
          </IconCircular>
        }
        title="Campañas"
        onClose={onClose}
        selectedProduct={selectedProduct}
        setSelectedProduct={handleProductChange}
        selectedCartera={selectedCartera} //  Pasar cartera seleccionada
        setSelectedCartera={handleCarteraChange} //  Pasar función para actualizar cartera
        verifyResult={verifyResult}
        setVerifyResult={setVerifyResult}
        loading={loading}
        setLoading={setLoading}
      />

      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 w-full scrollbar-gray"
        style={{
          minHeight: "1px",
          alignItems: "stretch",
          overflowX: "auto",
        }}
      >
        <div className="min-w-0 flex flex-col">
          <ModalCampanasCampanias 
            onSeleccionCampaña={handleSeleccionCampaña}
            selectedCartera={selectedCartera} //  Pasar cartera
            selectedProduct={selectedProduct} //  Pasar producto
          />
        </div>
        <div className="min-w-0 flex flex-col">
          <ModalCampanasEjecutivos
            idCampaña={campañaSeleccionada.id}
            nombreCampaña={campañaSeleccionada.nombre}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalCampanas;