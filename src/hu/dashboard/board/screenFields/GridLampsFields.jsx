import React, { useState, useEffect } from "react";
import { GetGridFields } from "../../../../services/mark/albaz/LokiServices";
import useSelectedRowStore from "./selectedRowStore";

const GridLampsFields = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [draggedHeader, setDraggedHeader] = useState(""); // Estado para el header que se arrastra
  
  const servidor = "Albaz";
  const idProducto = 1;
  const { setSelectedRow, selectedRowIndex } = useSelectedRowStore();

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

  // ========== FUNCIONES DE DRAG AND DROP ==========
  
  // Cuando comienza el arrastre del header
  const handleDragStart = (e, headerName) => {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', `[${headerName}]`);
    setDraggedHeader(headerName);
    console.log(`Arrastrando header: [${headerName}]`);
  };

  // Cuando termina el arrastre
  const handleDragEnd = () => {
    setDraggedHeader('');
  };

  // ===============================================

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
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="overflow-x-auto border rounded-lg max-h-96">
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
                    cursor-move select-none
                    hover:bg-slate-600 active:bg-slate-500
                    transition-all duration-150
                    ${draggedHeader === key ? 'opacity-50 scale-95 bg-slate-500' : ''}
                  `}
                  title="Arrastra este encabezado a Alias o Campos"
                >
                  <span className="inline-flex items-center gap-2">
                    {/* Icono de drag */}
                    <svg 
                      className="w-3 h-3 text-neutral-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 8h16M4 16h16" 
                      />
                    </svg>
                    {key}
                  </span>
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
                  ${selectedRowIndex === index ? 'bg-blue-100 border-blue-500 border-2' : 'hover:bg-gray-200'}
                `}
                onClick={() => handleRowClick(row, index)}
              >
                {Object.values(row).map((value, i) => (
                  <td
                    key={i}
                    className={`py-2 px-3 text-sm border-b-jerarquia4 whitespace-nowrap ${
                      typeof value === "number" ? "text-right font-medium" : "text-left"
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

      <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-md p-2">
        <p className="text-xs text-yellow-800">
          <span className="font-medium">
            Desplaza horizontalmente para ver todas las columnas.
          </span>
          Se están mostrando {Object.keys(tableData[0] || {}).length} columnas.
        </p>
        <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Arrastra los encabezados a los campos de "Alias" o "Campos"
        </p>
        {selectedRowIndex !== null && (
          <p className="text-xs text-blue-800 mt-1">
            Fila {selectedRowIndex + 1} seleccionada - Haz click en cualquier fila para seleccionar
          </p>
        )}
      </div>
    </div>
  );
};

export default GridLampsFields;