import React, { useState, useEffect } from "react";
import PositionRow from "./PositionRow";
import { GetScreenFields } from "../../../../services/LokiServices";

const PositionSection = () => {
  const [positionData, setPositionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Parámetros requeridos por el endpoint
  const servidor = "Cronoss";
  const idProducto = 1;

  useEffect(() => {
    const fetchScreenFields = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Pasar los parámetros al servicio
        const data = await GetScreenFields(servidor, idProducto);
        
        // Transformar los datos según la estructura esperada
        // Ajusta esta transformación basado en la estructura real de la respuesta
        const transformedData = data.map((item, index) => ({
          id: item.id || index + 1,
          position: item.posición,
          alias: item.aliasCampo,
          campos:item.nombreCampo,
          formato: item.idFormatoCampo,
          resaltado: item.resaltado,
        }));
        
        setPositionData(transformedData);
      } catch (err) {
        console.error("Error fetching screen fields:", err);
        setError(err.message || "Error al cargar los campos de pantalla");
      } finally {
        setLoading(false);
      }
    };

    fetchScreenFields();
  }, [servidor, idProducto]); // Dependencias del useEffect

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Cargando campos...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
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

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      {/* Información de los parámetros usados */}
      <div className="mb-4 bg-blue-50 border border-blue-200 rounded-md p-3">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Parámetros usados:</span> servidor = "{servidor}", idProducto = {idProducto}
        </p>
      </div>

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

      {positionData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay campos de pantalla disponibles para los parámetros especificados
        </div>
      )}
    </div>
  );
};

export default PositionSection;