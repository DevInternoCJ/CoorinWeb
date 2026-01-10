import React, { useState, useEffect } from "react";
import { GetGridFields } from "../../../../services/mark/orochi/LokiServices";
import useSelectedRowStore from "./selectedRowStore";
import { useWalletProducts } from "../../../login/WalletProduct";
import { IconDrag } from "../../../../components/iconos/IconDrag";

const GridLampsFields = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [draggedHeader, setDraggedHeader] = useState(""); // Estado para el header que se arrastra
  const servidor = "Orochi";
  const { setSelectedRow, selectedRowIndex } = useSelectedRowStore();
  const { walletProducts } = useWalletProducts();
  const idProducto = walletProducts?.[0]?.idProducto;
  
  useEffect(() => {
    if (!idProducto || idProducto === 0) return;
    const fetchGridData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await GetGridFields(idProducto);
        setTableData(data);
      } catch (err) {
        console.error("Error fetching grid data:", err);
        setError(err.message || "Error al cargar los datos de grid");
      } finally {
        setLoading(false);
      }
    };
    fetchGridData();
  }, [servidor, idProducto]);

  // Cuando comienza el arrastre del header
  const handleDragStart = (e, headerName) => {
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("text/plain", `[${headerName}]`);
    setDraggedHeader(headerName);
    console.log(`Arrastrando header: [${headerName}]`);
  };

  // Cuando termina el arrastre
  const handleDragEnd = () => {
    setDraggedHeader("");
  };

  // Manejar click en fila usando el store
  const handleRowClick = (row, index) => {
    console.log("GridLampsFields - Click en fila:", index, row);
    setSelectedRow(row, index);
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Cargando datos...</span>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold mb-3 text-blue-800 border-b pb-2">
          batchdate
        </h3>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex items-center">
            <div className="text-red-400 mr-2">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-red-800 font-medium">
                Error al cargar los datos
              </h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (tableData.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="text-center py-8 text-gray-500">
          No hay datos disponibles
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="overflow-x-auto border border-background-primary rounded-lg max-h-96">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-background-secondary border-b">
              {Object.keys(tableData[0] || {}).map((key) => (
                <th
                  key={key}
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, key)}
                  onDragEnd={handleDragEnd}
                  className={`
                    py-2 px-3 text-left text-xs font-bold text-neutral-100 whitespace-nowrap
                    cursor-grabb ing select-none
                    hover:bg-green-950 bg-jerarquia4
                    transition-all duration-150
                    cursor-grabbing
                    ${
                      draggedHeader === key
                        ? "opacity-50 scale-95 bg-green-950"
                        : ""
                    }
                  `}
                  title="Arrastra este encabezado a Alias o Campos"
                >
                  <div className="flex text-sm items-center gap-1">
                    <IconDrag className=" text-bgsuccess" />
                    <span className="inline-flex items-center">{key}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr
                key={index}
                className={`
                  ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} 
                  border-b-jerarquia4 
                  cursor-pointer 
                  transition-colors 
                  duration-200
                  ${
                    selectedRowIndex === index
                      ? "bg-blue-100 border-blue-500 border-2"
                      : "hover:bg-gray-200"
                  }
                `}
                onClick={() => handleRowClick(row, index)}
              >
                {Object.values(row).map((value, i) => (
                  <td
                    key={i}
                    className={`py-2 px-3 text-sm border-b-jerarquia4 whitespace-nowrap ${
                      typeof value === "number"
                        ? "text-right font-medium"
                        : "text-left"
                    } ${
                      Object.keys(row)[i] === "currentbalance" ||
                      Object.keys(row)[i] === "initialbalance"
                        ? "text-green-700"
                        : "text-gray-800"
                    }`}
                  >
                    {value === null || value === "NULL"
                      ? "N/A"
                      : typeof value === "number"
                      ? value.toLocaleString("es-MX", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : value.toString().trim()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GridLampsFields;
