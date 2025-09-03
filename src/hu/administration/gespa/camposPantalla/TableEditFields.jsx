import React, { useState, useEffect } from "react";
import OptionFields from "./OptionFields";
import { GetScreenFields, SaveScreenFields } from "../../../../services/LokiServices";
import { useUserStore } from "../../../../contextGlobal/userStore";

const TableEditFields = ({ idProducto }) => {
  const [editData, setEditData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveResult, setSaveResult] = useState(null);
  const servidor = "Cronoss";

const user = useUserStore((state) => state.user);
  console.log("Datos de usuario en el store:", user);
  const idEjecutivo = user?.idEjecutivo;
  const Jerarquía = user?.Jerarquía;
  useEffect(() => {
    if (!idProducto || idProducto === 0) return;
    const fetchScreenFields = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await GetScreenFields(servidor, idProducto);
        const transformedData = data.map((item, index) => ({
          id: item.id || index + 1,
          position: item.posición,
          alias: item.aliasCampo,
          campos: item.nombreCampo,
          formato: item.idFormatoCampo,
          resaltado: item.resaltado,
        }));
        setEditData(transformedData.map((d) => ({ ...d }))); // Copia editable
      } catch (err) {
        console.error("Error fetching screen fields:", err);
        setError(err.message || "Error al cargar los campos de pantalla");
      } finally {
        setLoading(false);
      }
    };
    fetchScreenFields();
  }, [servidor, idProducto]);

  // Actualiza un campo editable
  const handleEditField = (index, field, value) => {
    setEditData(prev =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  // Guardar todos los campos
  const handleSaveAll = async () => {
    setSaving(true);
    setSaveResult(null);
    const campos = editData.map(item => ({
      posicion: item.position,
      alias: item.alias,
      nombreCampo: item.campos,
      formatoCampo: item.formato,
      resaltado: true, //item.resaltado === "Resaltado" || item.resaltado === "Sobre Resaltado",
    }));
    const payload = {
      idProducto,
      idEjecutivo,
      Jerarquía,
      campos,
    };
    try {
      await SaveScreenFields(servidor, payload);
      setSaveResult("Guardado correctamente");
    } catch {
      setSaveResult("Error al guardar");
    } finally {
      setSaving(false);
    }
  };

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
      <div className="bg-background-secondary rounded-md grid grid-cols-12 gap-3 mb-2 py-2 px-3 font-semibold text-white text-sm">
        <div className="col-span-1">Position</div>
        <div className="col-span-3">Alias</div>
        <div className="col-span-4">Campos</div>
        <div className="col-span-2">Formato Campo</div>
        <div className="col-span-2">Resaltado</div>
      </div>
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
          {editData.map((item, idx) => (
            <OptionFields
              key={item.id}
              data={item}
              onEdit={(field, value) => handleEditField(idx, field, value)}
            />
          ))}
        </tbody>
      </table>
      {editData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay campos de pantalla disponibles para los parámetros especificados
        </div>
      )}
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
          onClick={handleSaveAll}
          disabled={saving}
        >
          {saving ? "Guardando..." : "Guardar"}
        </button>
        {saveResult && (
          <span className="ml-3 text-xs text-green-700">{saveResult}</span>
        )}
      </div>
    </div>
  );
};

export default TableEditFields;