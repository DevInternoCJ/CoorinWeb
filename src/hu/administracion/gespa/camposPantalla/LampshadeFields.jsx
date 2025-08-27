import React, { useState } from "react";
import LogoCoorin from "../../../../assets/logo_coorin_3.svg";
import LogoConjur from "../../../../assets/ConsorcioLetras_OLD.png";

const LampshadeFields = ({ isOpen, onClose }) => {
  const [editando, setEditando] = useState(false);

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

  // Componente para Select personalizado
  const CustomSelect = ({ options, className = "" }) => (
    <div className="relative">
      <select
        className={`w-full ps-2 pe-7 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 appearance-none ${className}`}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </div>
  );

  // Componente para la fila de la tabla de Posicion
  const PositionRow = ({ data }) => {
    const formatOptions = ["Texto", "Numero", "Moneda", "Fecha", "Porcentaje"];
    const highlightOptions = ["Normal", "Resaltado", "Sobre Resaltado"];



    return (
      <tr
        className={`grid grid-cols-12 gap-3 items-center p-2 border-b-1 border-b-jerarquia3`}
      >
        <td className="col-span-1 text-sm font-bold text-gray-800">
          {data.position}
        </td>
        <td className="col-span-3 text-sm text-gray-700">{data.alias}</td>
        <td className="col-span-4 text-sm text-gray-600">{data.campos}</td>
        <td className="col-span-2">
          <CustomSelect
            options={formatOptions}
            defaultValue={data.formato}
            className="text-sm italic"
          />
        </td>
        <td className="col-span-2">
          <CustomSelect
            options={highlightOptions}
            defaultValue={data.resaltado}
            className="text-sm italic"
          />
        </td>
      </tr>
    );
  };

  return (
    <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden border border-gray-300">
        {/* Header */}
        <div className="p-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={LogoCoorin} alt="Logo-coorin" className="h-8" />
            <h2 className="text-xl font-bold text-jerarquia4">
              Campos Pantalla - Coorin
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-jerarquia3 hover:text-red-600 text-4xl rounded-full w-8 h-8 flex items-center justify-center transition-colors hover:rotate-20"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)] bg-gray-50 space-y-4">
          {/* Sección Cantera */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex justify-between items-center">
            <div>
              <img src={LogoConjur} alt="logo-conjur" className="h-14" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Select de Cartera */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cartera
                </label>
                <CustomSelect
                  options={["American Express", "Visa", "Mastercard", "Other"]}
                  defaultValue="American Express"
                />
              </div>

              {/* Select de Producto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Producto
                </label>
                <CustomSelect
                  options={["Amex", "Gold Card", "Platinum", "Centurion"]}
                  defaultValue="Amex"
                />
              </div>
            </div>
          </div>

          {/* Sección Info */}
          <div className="bg-background-secondary p-4 rounded-lg shadow-sm">
            <h3 className="text-lg text-white font-bold mb-3">Info</h3>
            <div className="overflow-x-auto">
              <table className="table-border border border-jerarquia1 rounded-lg text-white">
                <tbody>
                  {/* Fila 1 */}
                  <tr className="">
                    <td className="py-2 px-3 font-semibold whitespace-nowrap">
                      Empresa;
                    </td>
                    <td className="py-2 px-3"></td>
                    <td className="py-2 px-3 font-semibold whitespace-nowrap">
                      Asigna
                    </td>
                    <td className="py-2 px-3">08/01/2020</td>
                    <td className="py-2 px-3 font-semibold whitespace-nowrap">
                      Segment
                    </td>
                    <td className="py-2 px-3">MEDIUM RETURN Primes</td>
                    <td className="py-2 px-3 font-semibold whitespace-nowrap">
                      Saldo Actual
                    </td>
                    <td className="py-2 px-3 font-medium">$ 33,880.77</td>
                    <td className="py-2 px-3 font-semibold whitespace-nowrap">
                      Estado
                    </td>
                    <td className="py-2 px-3">NAYARIT</td>
                  </tr>

                  {/* Fila 2 */}
                  <tr className="">
                    <td className="py-2 px-3 font-semibold whitespace-nowrap">
                      Cancel
                    </td>
                    <td className="py-2 px-3">04/01/2020</td>
                    <td className="py-2 px-3 font-semibold whitespace-nowrap">
                      Producto
                    </td>
                    <td className="py-2 px-3">Charge PR</td>
                    <td className="py-2 px-3 font-semibold whitespace-nowrap">
                      Saldo Initial
                    </td>
                    <td className="py-2 px-3 font-medium">$ 33,880.77</td>
                    <td className="py-2 px-3 font-semibold whitespace-nowrap">
                      Dias OA
                    </td>
                    <td className="py-2 px-3">2057</td>
                  </tr>

                  {/* Fila 3 */}
                  <tr className="">
                    <td className="py-2 px-3 font-semibold whitespace-nowrap">
                      / WO \ CBO Ingressos
                    </td>
                    <td className="py-2 px-3">No \ 264.00</td>
                    <td className="py-2 px-3 font-semibold whitespace-nowrap">
                      Aniv
                    </td>
                    <td className="py-2 px-3">12/09/2019</td>
                    <td className="py-2 px-3 font-semibold whitespace-nowrap">
                      AgencyID
                    </td>
                    <td className="py-2 px-3">41 ICMOCO</td>
                    <td className="py-2 px-3 font-semibold whitespace-nowrap">
                      Min Más Atrasado
                    </td>
                    <td className="py-2 px-3 font-medium">$ 23,000.00</td>
                    <td className="py-2 px-3 font-semibold whitespace-nowrap">
                      Ejecutivo
                    </td>
                    <td className="py-2 px-3">E- ANT</td>
                  </tr>

                  {/* Fila 4 */}
                  <tr>
                    <td className="py-2 px-3 font-semibold whitespace-nowrap">
                      Corte
                    </td>
                    <td className="py-2 px-3">06/09/2025</td>
                    <td className="py-2 px-3 font-semibold whitespace-nowrap">
                      Inv
                    </td>
                    <td className="py-2 px-3">Último Pago</td>
                    <td className="py-2 px-3 font-semibold whitespace-nowrap">
                      Fch Últ Pago
                    </td>
                    <td className="py-2 px-3" colSpan="3">
                      -
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sección Posicion */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            {/* Encabezados de la tabla */}
            <div className="bg-background-secondary rounded-md grid grid-cols-12 gap-3 mb-2 py-2 px-3 font-semibold text-white text-sm">
              <div className="col-span-1">Position</div>
              <div className="col-span-3">Alias</div>
              <div className="col-span-4">Campos</div>
              <div className="col-span-2">Formato Campo</div>
              <div className="col-span-2">Resaltado</div>
            </div>

            {/* Tabla con estructura semántica */}
            <table className="w-full">
              <thead className="sr-only">
                <tr>
                  <th>Position</th>
                  <th>Alias</th>
                  <th>Campos</th>
                  <th>Formato Campo</th>
                  <th>Resaltado</th>
                </tr>
              </thead>
              <tbody className="space-y-2 flex flex-col">
                {positionData.map((item) => (
                  <PositionRow key={item.id} data={item} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Sección Batchdate */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold mb-3 text-blue-800 border-b pb-2">
              batchdate
            </h3>
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-200 border-b">
                    {Object.keys(tableData[0]).map((key) => (
                      <th
                        key={key}
                        className="py-2 px-3 text-left text-xs font-bold text-gray-700 uppercase bg-gray-300"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                      {Object.values(row).map((value, i) => (
                        <td
                          key={i}
                          className={`py-2 px-3 text-sm border-b ${
                            i === 0 || i === 2
                              ? "font-mono"
                              : i === 3 || i === 7
                              ? "font-medium"
                              : ""
                          }`}
                        >
                          {i === 7 ? `$${value}` : value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LampshadeFields;
