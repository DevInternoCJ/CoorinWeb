import React, { useEffect, useState } from "react";
import { ShowFieldScreen } from "../../../../services/mark/albaz/LokiServices";
import useSelectedRowStore from "./selectedRowStore";

const InfoSection = ({ idProducto, fieldNames = [] }) => {
  // ✅ Recibir fieldNames como prop
  const [infoData, setInfoData] = useState(null);
  const [defaultData, setDefaultData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Usar el store de Zustand
  const { selectedRowData, selectedRowIndex } = useSelectedRowStore();

  // ✅ DEBUG: Verificar qué está llegando
  console.log("InfoSection - Props recibidas:", {
    idProducto,
    fieldNames,
    fieldNamesCount: fieldNames.length,
    selectedRowData: !!selectedRowData,
    selectedRowIndex,
  });
  // Cargar datos por defecto una vez
  useEffect(() => {
    if (!idProducto) return;

    const fetchDefaultInfo = async () => {
      try {
        setLoading(true);
        const response = await ShowFieldScreen(idProducto);
        console.log("InfoSection - Datos por defecto:", response);
        setDefaultData(response);
        setInfoData(response);
      } catch (error) {
        console.error("Error fetching default info:", error);
        setDefaultData(null);
        setInfoData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultInfo();
  }, [idProducto]);

 const processFieldValue = (fieldName, rowData) => {
  if (!fieldName || !rowData) {
    console.log(`processFieldValue - Datos faltantes: fieldName=${fieldName}, rowData=`, rowData);
    return "N/A";
  }
  
  console.log(`Procesando fieldName: "${fieldName}"`);
  
  // ✅ MEJORA: Manejar múltiples campos separados por ; o \
  if (fieldName.includes('[') && fieldName.includes(']')) {
    const regex = /\[(.*?)\]/g;
    let processedValue = fieldName;
    let match;
    let replacements = [];
    
    while ((match = regex.exec(fieldName)) !== null) {
      const fieldInBrackets = match[1];
      const actualValue = findValueInRow(rowData, fieldInBrackets);
      const formattedValue = formatValue(actualValue, fieldInBrackets);
      
      console.log(`Reemplazando [${fieldInBrackets}] con:`, formattedValue, "(valor crudo:", actualValue, ")");
      
      // ✅ CORRECCIÓN: Reemplazar SIEMPRE, incluso si es "N/A" o vacío
      processedValue = processedValue.replace(
        `[${fieldInBrackets}]`, 
        formattedValue
      );
      
      if (formattedValue !== "N/A" && formattedValue !== "") {
        replacements.push(formattedValue);
      }
    }
    
    // ✅ MEJORA: Si después del reemplazo solo quedan caracteres especiales, limpiar
    const cleanValue = processedValue.replace(/\[\];\\?]/g, '').trim();
    
    // ✅ CORRECCIÓN: Si queda vacío después de limpiar caracteres especiales
    if (cleanValue === '') {
      if (replacements.length > 0) {
        processedValue = replacements[0];
      } else {
        processedValue = ""; // ✅ Devolver string vacío en lugar de "N/A"
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
    console.log(`FieldName directo "${fieldName}" -> valor:`, value, "formateado:", formattedValue);
    return formattedValue;
  }
};

  // ✅ Función para buscar valores en la fila seleccionada
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

 // ✅ MEJORAR la función formatValue para devolver "" en lugar de "N/A" cuando sea apropiado
const formatValue = (value, fieldName = "") => {
  if (value === null || value === "NULL" || value === undefined) {
    return ""; // ✅ Cambiar a string vacío en lugar de "N/A"
  }
  
  if (value === "" || value === " ") {
    return ""; // ✅ Mantener string vacío
  }
  
  // Detectar campos monetarios por nombre
  const isMonetaryField = fieldName.toLowerCase().includes('balance') || 
                         fieldName.toLowerCase().includes('saldo') ||
                         fieldName.toLowerCase().includes('amount') ||
                         fieldName.toLowerCase().includes('monto') ||
                         fieldName.toLowerCase().includes('pago') ||
                         fieldName.toLowerCase().includes('income');
  
  if (isMonetaryField) {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (!isNaN(numValue) && numValue !== 0) {
      return `$${numValue.toLocaleString("es-MX", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;
    }
    return ""; // ✅ Si no es un número válido, devolver vacío
  }
  
  // Formatear números
  if (typeof value === "number") {
    return value.toLocaleString("es-MX", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  
  // Manejar valores booleanos o específicos
  if (value === true) return "Sí";
  if (value === false) return "No";
  if (value === "Yes") return "Sí";
  if (value === "No") return "No";
  
  return value.toString().trim();
};

  // En el useEffect de InfoSection.jsx - AGREGAR más logging
  useEffect(() => {
    console.log("InfoSection - useEffect triggered:", {
      hasDefaultData: !!defaultData,
      hasSelectedRowData: !!selectedRowData,
      hasFieldNames: fieldNames.length > 0,
      selectedRowIndex,
    });

    if (!defaultData) {
      console.log("InfoSection - No defaultData disponible");
      return;
    }

    if (selectedRowData && selectedRowIndex !== null && fieldNames.length > 0) {
      console.log(
        "InfoSection - Procesando fila seleccionada con fieldNames:",
        fieldNames
      );

      const updatedData = { ...defaultData };

      Object.keys(updatedData).forEach((key, index) => {
        if (updatedData[key] && typeof updatedData[key] === "object") {
          const correspondingFieldName = fieldNames[index] || key;
          console.log(
            `Procesando campo ${key} con fieldName: ${correspondingFieldName}`
          );

          const processedValue = processFieldValue(
            correspondingFieldName,
            selectedRowData
          );

          updatedData[key] = {
            ...updatedData[key],
            valor: processedValue,
          };

          console.log(`Campo ${key} procesado: "${processedValue}"`);
        }
      });

      console.log("InfoSection - Datos actualizados:", updatedData);
      setInfoData(updatedData);
    } else {
      let reason = "Razón: ";
      if (!selectedRowData) reason += "sin selectedRowData, ";
      if (selectedRowIndex === null) reason += "sin selectedRowIndex, ";
      if (fieldNames.length === 0) reason += "sin fieldNames";

      console.log("InfoSection - Restaurando datos por defecto. " + reason);
      setInfoData(defaultData);
    }
  }, [selectedRowData, selectedRowIndex, defaultData, fieldNames]);

  // ✅ Convertir el objeto a array para renderizar
  const getInfoArray = () => {
    if (!infoData || typeof infoData !== "object") return [];

    return Object.entries(infoData).map(([label, obj]) => ({
      label,
      valor: obj?.valor || "",
      fontWeight: obj?.fontWeight || "font-weight-normal",
      color: obj?.color || "FFFFFF",
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
      <h3 className="text-lg text-jerarquia1 font-bold mb-3">
        Info
      </h3>

      <div className="overflow-x-auto">
        <table className="table-border border border-jerarquia1 rounded-lg text-background-dashboard w-full">
          <tbody>
            {rows.map((rowItems, rowIdx) => (
              <tr
                key={rowIdx}
                className="border-b border-jerarquia4 last:border-b-0"
              >
                {rowItems.map((item, colIdx) => (
                  <React.Fragment key={`${rowIdx}-${colIdx}`}>
                    <td className="py-2 px-2 font-semibold whitespace-nowrap text-white">
                      {item?.label || ""}
                    </td>
                    <td
                      className="py-2 px-2 whitespace-nowrap"
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
