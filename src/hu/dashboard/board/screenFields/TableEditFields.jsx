import React, { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import OptionFields from "./OptionFields";
import {
  GetScreenFields,
  SaveScreenFields,
} from "../../../../services/mark/Orochi/LokiServices";
import { useUserStore } from "../../../../contextGlobal/userStore";
import SaveButton from "../../sideBar/Administration/gespa/ButtonSave";

const TableEditFields = ({
  idProducto,
  selectedRowData,
  onFieldNamesChange,
}) => {
  const [editData, setEditData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveResult, setSaveResult] = useState(null);
  const initialLoadRef = useRef(false);
  const user = useUserStore((state) => state.user);
  const idEjecutivo = user?.idEjecutivo;
  const jerarquia = user?.Jerarquía;
  const [confirming, setConfirming] = useState(false);

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

  const getFieldValueFromRow = useCallback(
    (fieldName) => {
      if (!selectedRowData || !fieldName) return "";
      const key = Object.keys(selectedRowData).find(
        (k) => k.toLowerCase() === fieldName.toLowerCase()
      );
      return key ? selectedRowData[key] : "";
    },
    [selectedRowData]
  );

  useEffect(() => {
    if (!selectedRowData || editData.length === 0) return;
    const updatedData = editData.map((item) => {
      const bracketFields = extractBracketFields(item.campos);
      if (bracketFields.length > 0) {
        let newCampos = item.campos;
        bracketFields.forEach((field) => {
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

  useEffect(() => {
    if (!idProducto || idProducto === 0 || initialLoadRef.current) return;

    const fetchScreenFields = async () => {
      try {
        setLoading(true);
        setError(null);
        initialLoadRef.current = true;

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
      } catch (err) {
        console.error("Error fetching screen fields:", err);
        setError(err.message || "Error al cargar los campos de pantalla");
        initialLoadRef.current = false;
      } finally {
        setLoading(false);
      }
    };
    fetchScreenFields();
  }, [idProducto]);

  useEffect(() => {
    if (editData.length === 0 || !onFieldNamesChange) return;

    const currentFieldNames = editData
      .map((item) => item.campos)
      .filter(Boolean);

    const currentAliasNames = editData
      .map((item) => item.alias)
      .filter(Boolean);

    if (currentFieldNames.length > 0) {
      console.log(
        "TableEditFields - Enviando data estructurada (alias/campos):",
        currentAliasNames.length
      );
      onFieldNamesChange({
        fieldNames: currentFieldNames,
        aliasNames: currentAliasNames,
      });
    }
  }, [editData, onFieldNamesChange]);

  const handleEditField = (index, field, value) => {
    const newEditData = editData.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );

    if (field === "alias") {
      setEditData(newEditData);
    } else {
      setEditData(newEditData);
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setSaveResult(null);
    setConfirming(false);
    const campos = editData.map((item) => {
      return {
        posicion: item.position,
        alias: item.alias,
        nombreCampo: item.campos,
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
      toast.success("Cambios guardados correctamente", {
        description: "Los campos de pantalla se han actualizado",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error al guardar:", error);
      setSaveResult("Error al guardar");
      toast.error("Error al guardar", {
        description: error.message || "No se pudieron guardar los cambios",
        duration: 4000,
      });
    } finally {
      setSaving(false);
    }
  };
  const handleSaveClick = () => {
    setConfirming(true);

    toast.custom(
      (t) => (
        <div className="bg-amber-50 text-amber-700 px-4 py-3 rounded-lg shadow-lg flex flex-col gap-3 w-80">
          <span className="font-medium text-sm">
            ¿Está seguro de guardar los cambios?
          </span>
          <div className="flex justify-end gap-2">
            <SaveButton
              onClick={() => {
                toast.dismiss(t);
                setConfirming(false);
                toast.info("Guardado cancelado");
              }}
              className="btn-danger hover:bg-red-600"
            >
              Cancelar
            </SaveButton>
            <SaveButton
              onClick={() => {
                toast.dismiss(t);
                toast.promise(
                  new Promise((resolve, reject) => {
                    handleSaveAll().then(resolve).catch(reject);
                  }),
                  {
                    loading: "Guardando cambios...",
                    success: "Cambios guardados correctamente",
                    error: "Error al guardar los cambios",
                  }
                );
              }}
              className="btn-success hover:bg-green-600"
            >
              Confirmar
            </SaveButton>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
        onDismiss: () => setConfirming(false),
        onAutoClose: () => setConfirming(false),
      }
    );
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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm max-h-75 overflow-auto">
      <div className="bg-background-secondary sticky top-0  rounded-t-lg grid grid-cols-12 gap-3 mb-4 border border-gray-200 shadow-sm py-2 px-3 font-semibold text-white text-sm">
        <div className="col-span-1 w-full">Position</div>
        <div className="col-span-3 w-full">Alias</div>
        <div className="col-span-4 w-full">Campos</div>
        <div className="col-span-2 w-full">Formato Campo</div>
        <div className="col-span-2 w-full">Resaltado</div>
      </div>

      {selectedRowData && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800">
            <strong>Datos de fila seleccionada aplicados:</strong> Los campos
            entre [ ] se han reemplazado con valores reales
          </p>
        </div>
      )}

      <div className="space-y-2">
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
          No hay campos de pantalla disponibles para los parámetros
          especificados
        </div>
      )}

      <div className="flex justify-end my-3 mr-3 sticky bottom-0 bg-white py-2">
        <SaveButton
          onClick={handleSaveClick}
          loading={saving}
          disabled={editData.length === 0 || saving || confirming} // 👈 agregado
          size="medium"
          variant="primary"
          className="btn-success"
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
