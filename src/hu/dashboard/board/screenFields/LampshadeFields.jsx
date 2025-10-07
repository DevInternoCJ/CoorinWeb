import React, { useState } from "react";
import ModalHeader from "../../sideBar/Administration/gespa/ModalHeader";
import WalletSection from "../../sideBar/Administration/gespa/WalletSection";
import InfoSection from "./InfoSection";
import TableEditFields from "./TableEditFields";
import GridLampsFields from "./GridLampsFields";
import { IconScreens } from "../../sideBar/Administration/gespa/IconsTemplates";

const LampshadeFields = ({ isOpen, onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  return (
    <div className=" modal-blur-bg fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-6xl max-h-[90vh] overflow-hidden border border-gray-300">
        <ModalHeader icon={<IconScreens className="size-6" />} title="Campos Pantalla" onClose={onClose} />
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)] bg-gray-50 space-y-4">
          <WalletSection
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            verifyResult={verifyResult}
            setVerifyResult={setVerifyResult}
            loading={loading}
            setLoading={setLoading}
          />
          {selectedProduct && (
  <InfoSection idProducto={selectedProduct.value} />
)}
          {selectedProduct && selectedProduct.value !== 0 && (
            <>
              <TableEditFields idProducto={selectedProduct.value} />
              <GridLampsFields idProducto={selectedProduct.value} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LampshadeFields;
