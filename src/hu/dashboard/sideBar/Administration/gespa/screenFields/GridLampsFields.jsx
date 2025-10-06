import React, { useState, useEffect } from "react";
import { GetGridFields } from "../../../../../../services/LokiServices"; // Ajusta la ruta según tu estructura

const GridLampsFields = ({idProducto}) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Parámetros requeridos por el endpoint
  const servidor = "Albaz";

  useEffect(() => {
     if (!idProducto || idProducto === 0) return;
    const fetchGridData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Llamar al servicio con los parámetros
        const data = await GetGridFields(servidor, idProducto);
        
        // Transformar los datos si es necesario
        // La API ya devuelve un array de objetos, así que podemos usarlo directamente
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
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-red-800 font-medium">Error al cargar los datos</h3>
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
        <thead className=" ">
          <tr className=" bg-background-secondary border-b">
            {Object.keys(tableData[0]).map((key) => (
              <th
                key={key}
                className="py-2 px-3 text-left text-xs font-bold text-neutral-100 uppercase whitespace-nowrap"
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
              className={index % 2 === 0 ? "bg-white border-b-jerarquia4" : "bg-gray-100 border-b-jerarquia4"}
            >
              {Object.values(row).map((value, i) => (
                <td
                  key={i}
                  className={`py-2 px-3 text-sm border-b-jerarquia4 whitespace-nowrap ${
                    // Aplicar estilos especiales a ciertas columnas
                    typeof value === 'number' ? 'text-right font-medium' : 'text-left'
                  } ${
                    // Colorear valores monetarios
                    Object.keys(row)[i] === 'currentbalance' || 
                    Object.keys(row)[i] === 'initialbalance'
                      ? 'text-green-700'
                      : 'text-gray-800'
                  }`}
                >
                  {value === null || value === 'NULL' 
                    ? 'N/A' 
                    : typeof value === 'number'
                      ? value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
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
        <span className="font-medium">Desplaza horizontalmente para ver todas las columnas.</span> 
        Se están mostrando {Object.keys(tableData[0]).length} columnas.
      </p>
    </div>
  </div>
);
};

export default GridLampsFields;