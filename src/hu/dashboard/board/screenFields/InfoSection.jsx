import React, { useEffect, useState } from "react";
import { ShowFieldScreen } from "../../../../services/mark/Orochi/LokiServices";
import useSelectedRowStore from "./selectedRowStore";

const InfoSection = ({
  idProducto,
  fieldNames = { fieldNames: [], aliasNames: [] },
}) => {
  // Recibir fieldNames como prop
  const [infoData, setInfoData] = useState(null);
  const [defaultData, setDefaultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { selectedRowData, selectedRowIndex } = useSelectedRowStore();
  const camposArray = fieldNames.fieldNames || [];
  const aliasArray = fieldNames.aliasNames || [];

  // En el useEffect que carga datos por defecto (PARA ASEGURAR QUE DEFAULTDATA SEA UN ARRAY ORDENADO)
  useEffect(() => {
    if (!idProducto) return;
    const fetchDefaultInfo = async () => {
      try {
        setLoading(true);
        const response = await ShowFieldScreen(idProducto);
        console.log(
          "InfoSection - Datos por defecto (Objeto original):",
          response
        );

        // CAMBIO 1: Convertir la respuesta inicial (objeto) a un Array de objetos
        const initialArrayData = Object.keys(response).map((key, index) => ({
          originalKey: key, // Clave estática original (para referencia)
          label: response[key].alias || key, // Usar la clave original como etiqueta inicial
          valueObject: response[key],
          orderIndex: index, // Guardamos el índice original
        }));

        setDefaultData(initialArrayData); // Guardamos el array ordenado como defaultData
        setInfoData(initialArrayData); // Usamos el array ordenado como infoData inicial
      } catch (error) {
        // ... (manejo de error)
      } finally {
        setLoading(false);
      }
    };
    fetchDefaultInfo();
  }, [idProducto]);

  const processFieldValue = (fieldName, rowData) => {
    if (!fieldName || !rowData) {
      console.log(
        `processFieldValue - Datos faltantes: fieldName=${fieldName}, rowData=`,
        rowData
      );
      return "N/A";
    }

    console.log(`Procesando fieldName: "${fieldName}"`);
    // MEJORA: Manejar múltiples campos separados por ; o \
    if (fieldName.includes("[") && fieldName.includes("]")) {
      const regex = /\[(.*?)\]/g;
      let processedValue = fieldName;
      let match;
      let replacements = [];
      while ((match = regex.exec(fieldName)) !== null) {
        const fieldInBrackets = match[1];
        const actualValue = findValueInRow(rowData, fieldInBrackets);
        const formattedValue = formatValue(actualValue, fieldInBrackets);
        console.log(
          `Reemplazando [${fieldInBrackets}] con:`,
          formattedValue,
          "(valor crudo:",
          actualValue,
          ")"
        );
        // CORRECCIÓN: Reemplazar SIEMPRE, incluso si es "N/A" o vacío
        processedValue = processedValue.replace(
          `[${fieldInBrackets}]`,
          formattedValue
        );

        if (formattedValue !== "N/A" && formattedValue !== "") {
          replacements.push(formattedValue);
        }
      }
      // MEJORA: Si después del reemplazo solo quedan caracteres especiales, limpiar
      const cleanValue = processedValue.replace(/\[\];\\?]/g, "").trim();
      if (cleanValue === "") {
        if (replacements.length > 0) {
          processedValue = replacements[0];
        } else {
          processedValue = ""; // Devolver string vacío en lugar de "N/A"
        }
      } else {
        processedValue = cleanValue;
      }
      console.log(`Resultado procesado: "${processedValue}"`);
      return processedValue;
    } else {
      // Si es un fieldName directo, buscar el valor
      const value = findValueInRow(rowData, fieldName);
      const formattedValue = formatValue(value, fieldName);
      console.log(
        `FieldName directo "${fieldName}" -> valor:`,
        value,
        "formateado:",
        formattedValue
      );
      return formattedValue;
    }
  };
  // Función para buscar valores en la fila seleccionada
  const findValueInRow = (rowData, fieldName) => {
    if (!rowData || !fieldName) {
      console.log(`findValueInRow - Datos faltantes: fieldName=${fieldName}`);
      return "";
    }
    // Buscar coincidencia exacta primero
    if (rowData.hasOwnProperty(fieldName)) {
      const value = rowData[fieldName];
      console.log(`Coincidencia exacta encontrada para "${fieldName}":`, value);
      return value;
    }
    // Buscar coincidencia case insensitive
    const key = Object.keys(rowData).find(
      (k) => k.toLowerCase() === fieldName.toLowerCase()
    );
    if (key) {
      const value = rowData[key];
      console.log(
        `Coincidencia case-insensitive encontrada: "${fieldName}" -> "${key}":`,
        value
      );
      return value;
    }
    console.log(`No se encontró coincidencia para "${fieldName}"`);
    return "";
  };

  // MEJORAR la función formatValue para devolver "" en lugar de "N/A" cuando sea apropiado
  const formatValue = (value, fieldName = "") => {
    if (value === null || value === "NULL" || value === undefined) {
      return ""; //Cambiar a string vacío en lugar de "N/A"
    }
    if (value === "" || value === " ") {
      return ""; // Mantener string vacío
    }
    // Detectar campos monetarios por nombre
    const isMonetaryField =
      fieldName.toLowerCase().includes("balance") ||
      fieldName.toLowerCase().includes("saldo") ||
      fieldName.toLowerCase().includes("amount") ||
      fieldName.toLowerCase().includes("monto") ||
      fieldName.toLowerCase().includes("pago") ||
      fieldName.toLowerCase().includes("income");

    if (isMonetaryField) {
      const numValue = typeof value === "string" ? parseFloat(value) : value;
      if (!isNaN(numValue) && numValue !== 0) {
        return `$${numValue.toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      }
      return ""; // Si no es un número válido, devolver vacío
    }
    // Formatear números
    if (typeof value === "number") {
      return value.toLocaleString("es-MX", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    // Manejar valores booleanos o específicos
    if (value === true) return "Sí";
    if (value === false) return "No";
    if (value === "Yes") return "Sí";
    if (value === "No") return "No";
    return value.toString().trim();
  }; // En el useEffect de InfoSection.jsx - AGREGAR más logging

  useEffect(() => {
    // ... (logging y verificación de defaultData)
    if (!defaultData) {
      console.log("InfoSection - No defaultData disponible");
      return;
    }

    const shouldProcessRowData =
      selectedRowData && selectedRowIndex !== null && camposArray.length > 0;

    if (shouldProcessRowData) {
      console.log(
        "InfoSection - Procesando fila seleccionada con fieldNames:",
        camposArray
      );

      // CAMBIO 2: Trabajamos sobre una copia del array infoData (que ya está ordenado)
      let updatedArrayData = infoData.map((item, index) => {
        const dynamicAlias = aliasArray[index];
        const correspondingFieldName = camposArray[index]; // Asumimos que camposArray y aliasArray están alineados por índice

        // Procesar el valor usando el campo (camposArray)
        const processedValue = processFieldValue(
          correspondingFieldName,
          selectedRowData
        );

        // Crear el nuevo objeto de valor para el campo 'valor'
        const newObj = {
          ...item.valueObject,
          valor: processedValue,
        };

        return {
          ...item,
          label: dynamicAlias || item.originalKey, // Actualizamos solo la etiqueta (ALIAS)
          valueObject: newObj,
        };
      });

      console.log(
        "InfoSection - Datos actualizados (Array ordenado):",
        updatedArrayData
      );
      setInfoData(updatedArrayData);
    } else {
      // Restauración a defaultData (que ahora es el array ordenado inicial)
      let reason = "Razón: ";
      if (!selectedRowData) reason += "sin selectedRowData, ";
      if (selectedRowIndex === null) reason += "sin selectedRowIndex, ";
      if (camposArray.length === 0) reason += "sin fieldNames";
      console.log(
        "InfoSection - Restaurando datos por defecto (Array ordenado). " +
          reason
      );
      setInfoData(defaultData); // defaultData ahora es el array ordenado
    }
  }, [
    selectedRowData,
    selectedRowIndex,
    defaultData,
    camposArray,
    aliasArray,
  ]); // Agregamos infoData a las dependencias

  // CAMBIO 3: Simplificar getInfoArray para usar el array de estado
const getInfoArray = () => {
    // Si infoData es el array, lo devolvemos, mapeando para el formato final
    if (!infoData || !Array.isArray(infoData)) return [];
    
    return infoData.map(item => ({
        label: item.label, // Ya contiene el alias actualizado
        valor: item.valueObject?.valor || "",
        fontWeight: item.valueObject?.fontWeight || "font-weight-normal",
        color: item.valueObject?.color || "FFFFFF",
    }));
};

  const infoArray = getInfoArray();
  // Función para dividir los datos en filas de 4 columnas
  const getRows = () => {
    const rows = [];
    for (let i = 0; i < 5; i++) {
      const start = i * 4;
      const rowItems = infoArray.slice(start, start + 4);
      rows.push(rowItems);
    }
    return rows;
  };

  const rows = getRows();

  if (loading) {
    return (
      <div className="bg-gray-700 p-4 rounded-lg shadow-sm">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
          <span className="ml-3 text-white">Cargando información...</span>
        </div>
      </div>
    );
  }

  if (!infoData || infoArray.length === 0) {
    return (
      <div className="bg-gray-700 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg text-jerarquia1 font-bold mb-3">Info</h3>
        <div className="text-center py-8 text-gray-400">
          No hay datos disponibles
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg text-jerarquia1 font-bold -mb-1">Info</h3>
      <div className="overflow-x-auto">
        <table className="table-border p-2 text-sm border border-jerarquia1 rounded-lg text-background-dashboard w-full">
          <tbody>
            {rows.map((rowItems, rowIdx) => (
              <tr
                key={rowIdx}
                className="border-b border-jerarquia4 last:border-b-0"
              >
                {rowItems.map((item, colIdx) => (
                  <React.Fragment key={`${rowIdx}-${colIdx}`}>
                    <td className="py-1 px-1 font-semibold whitespace-nowrap text-white">
                      {item?.label || ""}
                    </td>
                    <td
                      className="py-1 px-1 "
                      style={{
                        fontWeight:
                          item?.fontWeight === "font-weight-bold"
                            ? "bold"
                            : "normal",
                        color: item ? `#${item.color}` : "#FFFFFF",
                      }}
                    >
                      {item?.valor || ""}
                    </td>
                  </React.Fragment>
                ))}
                {/* Rellenar celdas vacías si faltan columnas */}
                {Array.from({ length: 4 - rowItems.length }).map(
                  (_, emptyIdx) => (
                    <React.Fragment key={`empty-${rowIdx}-${emptyIdx}`}>
                      <td className="py-2 px-2 font-semibold"></td>
                      <td className="py-2 px-2"></td>
                    </React.Fragment>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default InfoSection;
