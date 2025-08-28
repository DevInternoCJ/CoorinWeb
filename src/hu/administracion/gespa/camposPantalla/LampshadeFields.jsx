import React from "react";
import ModalHeader from "./ModalHeader";
import CanteraSection from "./WalletSection";
import InfoSection from "./InfoSection";
import PositionSection from "./PositionSection";
import BatchdateSection from "./BatchdateSection";

const LampshadeFields = ({ isOpen, onClose }) => {


  if (!isOpen) return null;

  // Datos de ejemplo para la tabla
  const tableData = [
    {
      customerid: "923706974099MXN",
      batchdate: "13/07/2020",
      name: "19680330",
      loan_productcode: "SB",
      recoveredcode: "TMAC",
      receiptdate: "10/10/2019",
      lastpaymentdate: "20/06/2019",
      initialbalance: "4904.23",
    },
    {
      customerid: "399170560091MXN",
      batchdate: "08/01/2020",
      name: "19840918",
      loan_productcode: "PR",
      recoveredcode: "PCMC",
      receiptdate: "08/01/2020",
      lastpaymentdate: "24/10/2019",
      initialbalance: "33880.77",
    },
    {
      customerid: "761870246099MXN",
      batchdate: "19/10/2021",
      name: "19700923",
      loan_productcode: "PR",
      recoveredcode: "PCMC",
      receiptdate: "19/10/2021",
      lastpaymentdate: "08/10/2021",
      initialbalance: "5548.90",
    },
    {
      customerid: "630139719092MXN",
      batchdate: "17/04/2025",
      name: "19760403",
      loan_productcode: "PL",
      recoveredcode: "WHIC",
      receiptdate: "09/01/2023",
      lastpaymentdate: "03/10/2022",
      initialbalance: "359258.74",
    },
    {
      customerid: "602525651095MXN",
      batchdate: "04/03/2022",
      name: "19900507",
      loan_productcode: "GL",
      recoveredcode: "XXXX",
      receiptdate: "30/10/2020",
      lastpaymentdate: "02/11/2020",
      initialbalance: "44287.02",
    },
  ];

  // Datos para la tabla de Posicion
  const positionData = [
    {
      id: 1,
      position: "1",
      alias: "Empresa",
      campos: "[employersname]; [employersaddress]",
      formato: "Texto",
      resaltado: "Resaltado",
    },
    {
      id: 2,
      position: "2",
      alias: "WO \\ CBO / Ingressos",
      campos: "[WO7] \\ [CBO] \\ [BlogueoHerramienta] \\ [month/income]",
      formato: "Numero",
      resaltado: "Sobre Resaltado",
    },
    {
      id: 3,
      position: "3",
      alias: "Asigna",
      campos: "[batchdate]",
      formato: "Fecha",
      resaltado: "Resaltado",
    },
    {
      id: 4,
      position: "4",
      alias: "Segment",
      campos: "[CollectibilityCode] [SegmentoAMX] [DescuentoAMX]",
      formato: "Texto",
      resaltado: "Sobre Resaltado",
    },
    {
      id: 5,
      position: "5",
      alias: "Saldo Actual",
      campos: "[CurrentbalanceG]",
      formato: "Moneda",
      resaltado: "Sobre Resaltado",
    },
    {
      id: 6,
      position: "6",
      alias: "Estado",
      campos: "[Estado]",
      formato: "Texto",
      resaltado: "Normal",
    },
  ];

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
          <PositionSection positionData={positionData} />
          <BatchdateSection tableData={tableData} />
        </div>
      </div>
    </div>
  );
};

export default LampshadeFields;