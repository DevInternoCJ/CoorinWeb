import React, { useState } from "react";
import ModalHeader from "./ModalHeader";
import WalletSection from "./WalletSection";
import InfoSection from "./InfoSection";
import TableEditFields from "./TableEditFields";
import GridLampsFields from "./GridLampsFields";

const PRODUCT_OPTIONS = [
  { label: "Producto", value: 0 },
  { label: "Amex", value: 1 },
];

const LampshadeFields = ({ isOpen, onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const infoData = [
    // Fila 1
    [
      { label: "Empresa;", value: "" },
      { label: "Asigna", value: "08/01/2020" },
      { label: "Segment", value: "MEDIUM RETURN Primes" },
      { label: "Saldo Actual", value: "$ 33,880.77", highlight: true },
      { label: "Estado", value: "NAYARIT" },
    ],
    // Fila 2
    [
      { label: "Cancel", value: "04/01/2020" },
      { label: "Producto", value: "Charge PR" },
      { label: "Saldo Initial", value: "$ 33,880.77", highlight: true },
      { label: "Dias OA", value: "2057" },
    ],
    // Fila 3
    [
      { label: "/ WO \\ CBO Ingressos", value: "No \\ 264.00" },
      { label: "Aniv", value: "12/09/2019" },
      { label: "AgencyID", value: "41 ICMOCO" },
      { label: "Min Más Atrasado", value: "$ 23,000.00", highlight: true },
      { label: "Ejecutivo", value: "E- ANT" },
    ],
    // Fila 4
    [
      { label: "Corte", value: "06/09/2025" },
      { label: "Inv", value: "Último Pago" },
      { label: "Fch Últ Pago", value: "-" },
    ],
  ];

  return (
    <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden border border-gray-300">
        <ModalHeader onClose={onClose} />
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)] bg-gray-50 space-y-4">
          <WalletSection
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            verifyResult={verifyResult}
            setVerifyResult={setVerifyResult}
            loading={loading}
            setLoading={setLoading}
          />
          <InfoSection infoData={infoData} />
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
