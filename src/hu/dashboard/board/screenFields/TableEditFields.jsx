import React, { useState, useEffect, useCallback, useRef} from "react";
import OptionFields from "./OptionFields";
import {
  GetScreenFields,
  SaveScreenFields,
} from "../../../../services/mark/albaz/LokiServices";
import { useUserStore } from "../../../../contextGlobal/userStore";
import SaveButton from "../../sideBar/Administration/gespa/ButtonSave";

const TableEditFields = ({ idProducto, selectedRowData, onFieldNamesChange }) => { 
  const [editData, setEditData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveResult, setSaveResult] = useState(null);
  
   // ✅ NUEVO: useRef para evitar efectos infinitos
  const initialLoadRef = useRef(false);
  const fieldNamesSentRef = useRef(false);
  const user = useUserStore((state) => state.user);
  const idEjecutivo = user?.idEjecutivo;
  const jerarquia = user?.Jerarquía;

  // ✅ CORRECCIÓN: Usar useCallback para evitar recreación de función
  const extractBracketFields = useCallback((text) => {
    if (!text) return [];
    const regex = /\[(.*?)\]/g;
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  }, []);

  // ✅ CORRECCIÓN: Usar useCallback y mover fuera del useEffect
  const getFieldValueFromRow = useCallback((fieldName) => {
    if (!selectedRowData || !fieldName) return "";
    
    // Buscar el campo en la fila seleccionada (case insensitive)
    const key = Object.keys(selectedRowData).find(
      k => k.toLowerCase() === fieldName.toLowerCase()
    );
    
    return key ? selectedRowData[key] : "";
  }, [selectedRowData]); // ✅ Solo depende de selectedRowData

   // ✅ CORRECCIÓN: Actualizar campos con selectedRowData
  useEffect(() => {
    if (!selectedRowData || editData.length === 0) return;

    const updatedData = editData.map(item => {
      const bracketFields = extractBracketFields(item.campos);
      
      if (bracketFields.length > 0) {
        let newCampos = item.campos;
        bracketFields.forEach(field => {
          const value = getFieldValueFromRow(field);
          if (value && value !== "" && value !== "NULL" && value !== null) {
            newCampos = newCampos.replace(`[${field}]`, value);
          }
        });
        
        return { ...item, campos: newCampos };
      }
      
      return item;
    });

    setEditData(updatedData);
  }, [selectedRowData, editData, extractBracketFields, getFieldValueFromRow]);

  // ✅ CORRECCIÓN PRINCIPAL: Cargar datos solo una vez
  useEffect(() => {
    if (!idProducto || idProducto === 0 || initialLoadRef.current) return;
  
    const fetchScreenFields = async () => {
      try {
        setLoading(true);
        setError(null);
        initialLoadRef.current = true; // ✅ Marcar como cargado
        
        console.log("TableEditFields - Cargando datos por primera vez...");
        const data = await GetScreenFields(idProducto);

        const transformedData = data.map((item, index) => ({
          id: item.id || index + 1,
          position: item.posición,
          alias: item.aliasCampo,
          campos: item.nombreCampo,
          formato: item.idFormatoCampo,
          resaltado: item.resaltado,
        }));

        setEditData(transformedData);

        // ✅ Enviar fieldNames solo una vez
        const fieldNames = data
          .map(item => item.nombreCampo)
          .filter(Boolean);
        
        console.log("TableEditFields - Enviando fieldNames iniciales:", fieldNames.length);
        
        if (onFieldNamesChange && !fieldNamesSentRef.current) {
          fieldNamesSentRef.current = true;
          onFieldNamesChange(fieldNames);
        }
        
      } catch (err) {
        console.error("Error fetching screen fields:", err);
        setError(err.message || "Error al cargar los campos de pantalla");
        initialLoadRef.current = false; // ✅ Permitir reintento si falla
      } finally {
        setLoading(false);
      }
    };
    
    fetchScreenFields();
  }, [idProducto, onFieldNamesChange]); // ✅ Eliminada dependencia de servidor


  // ✅ CORRECCIÓN: Actualizar fieldNames solo si realmente cambiaron
  useEffect(() => {
    if (editData.length === 0 || !onFieldNamesChange || fieldNamesSentRef.current) return;

    const currentFieldNames = editData
      .map(item => item.campos)
      .filter(Boolean);
    
    // ✅ Solo enviar si hay fieldNames y no los hemos enviado ya
    if (currentFieldNames.length > 0 && !fieldNamesSentRef.current) {
      console.log("TableEditFields - Enviando fieldNames desde edición:", currentFieldNames.length);
      fieldNamesSentRef.current = true;
      onFieldNamesChange(currentFieldNames);
    }
  }, [editData, onFieldNamesChange]);

  const handleEditField = (index, field, value) => {
    setEditData((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setSaveResult(null);
    
    // ✅ PREPARAR datos para guardar - revertir los reemplazos si es necesario
    const campos = editData.map((item) => {
      // Si necesitas guardar los campos originales (con [ ]) en lugar de los reemplazados,
      // aquí deberías tener lógica para revertir los cambios
      return {
        posicion: item.position,
        alias: item.alias,
        nombreCampo: item.campos, // Esto contendrá los valores reemplazados
        formatoCampo: item.formato,
        resaltado: typeof item.resaltado === "number" ? item.resaltado : 1,
        editar: true,
      };
    });
    
    const payload = {
      idProducto,
      idEjecutivo,
      jerarquia,
      campos,
    };
    
    console.log("TableEditFields - Payload para guardar:", payload);
    
    try {
      await SaveScreenFields(payload);
      setSaveResult("Guardado correctamente");
    } catch (error) {
      console.error("Error al guardar:", error);
      setSaveResult("Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  // ... (resto del componente igual: loading, error, return)
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

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm max-h-80 overflow-auto">
      <div className="bg-background-secondary rounded-md grid grid-cols-12 gap-3 mb-4 py-3 px-3 font-semibold text-white text-sm">
        <div className="col-span-1">Position</div>
        <div className="col-span-3">Alias</div>
        <div className="col-span-4">Campos</div>
        <div className="col-span-2">Formato Campo</div>
        <div className="col-span-2">Resaltado</div>
      </div>
      
      {/* ✅ Indicador de datos seleccionados */}
      {selectedRowData && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800">
            <strong>Datos de fila seleccionada aplicados:</strong> Los campos entre [ ] se han reemplazado con valores reales
          </p>
        </div>
      )}
      
      <div className="space-y-3">
        {editData.map((item, idx) => (
          <OptionFields
            key={item.id}
            data={item}
            onEdit={(field, value) => handleEditField(idx, field, value)}
          />
        ))}
      </div>

      {editData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay campos de pantalla disponibles para los parámetros especificados
        </div>
      )}

      <div className="flex justify-end mt-6">
        <SaveButton
          onClick={handleSaveAll}
          loading={saving}
          disabled={editData.length === 0 || saving}
          size="medium"
          variant="primary"
          className="min-w-[120px]"
        />
        {saveResult && (
          <span
            className={`ml-3 text-sm font-medium ${
              saveResult === "Guardado correctamente"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {saveResult}
          </span>
        )}
      </div>
    </div>
  );
};

export default TableEditFields;