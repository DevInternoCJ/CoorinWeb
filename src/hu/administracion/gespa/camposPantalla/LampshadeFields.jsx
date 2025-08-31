import React from "react";
import ModalHeader from "./ModalHeader";
import CanteraSection from "./WalletSection";
import InfoSection from "./InfoSection";
import PositionSection from "./TableEditFields";
import BatchdateSection from "./GridLampsFields";

const LampshadeFields = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  // Datos para la sección Info
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
          <CanteraSection />
          <InfoSection infoData={infoData} />
          <PositionSection />
          <BatchdateSection />
        </div>
      </div>
    </div>
  );
};

export default LampshadeFields;