import React, { useState } from "react";
import SelectWallet from "./SelectWallet";

const formatOptions = [
  { label: "Texto", value: 1 },
  { label: "Numero", value: 2 },
  { label: "Moneda", value: 3 },
  { label: "Fecha", value: 4 },
  { label: "Porcentaje", value: 5 }
];

const highlightOptions = [
  { label: "Normal", value: 0 },
  { label: "Resaltado", value: 1 },
  { label: "Sobre Resaltado", value: 2 }
];

const OptionFields = ({ data, onEdit }) => {
  // Estados para drag and drop
  const [isDraggingOverAlias, setIsDraggingOverAlias] = useState(false);
  const [isDraggingOverCampos, setIsDraggingOverCampos] = useState(false);

  // ========== FUNCIONES DE DRAG AND DROP PARA ALIAS ==========
  
  const handleDragOverAlias = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDraggingOverAlias(true);
  };

  const handleDragLeaveAlias = (e) => {
    if (e.currentTarget === e.target) {
      setIsDraggingOverAlias(false);
    }
  };

  const handleDropAlias = (e) => {
    e.preventDefault();
    const droppedText = e.dataTransfer.getData('text/plain');
    
    // Insertar el texto en la posición del cursor o al final
    const inputElement = e.target;
    const cursorPosition = inputElement.selectionStart || 0;
    const currentValue = data.alias || "";
    const textBefore = currentValue.substring(0, cursorPosition);
    const textAfter = currentValue.substring(cursorPosition);
    
    const newValue = textBefore + droppedText + textAfter;
    
    if (onEdit) {
      onEdit("alias", newValue);
    }
    
    setIsDraggingOverAlias(false);
    console.log(`Campo ${droppedText} agregado a Alias`);
  };

  // ========== FUNCIONES DE DRAG AND DROP PARA CAMPOS ==========
  
  const handleDragOverCampos = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDraggingOverCampos(true);
  };

  const handleDragLeaveCampos = (e) => {
    if (e.currentTarget === e.target) {
      setIsDraggingOverCampos(false);
    }
  };

  const handleDropCampos = (e) => {
    e.preventDefault();
    const droppedText = e.dataTransfer.getData('text/plain');
    
    // Insertar el texto en la posición del cursor o al final
    const inputElement = e.target;
    const cursorPosition = inputElement.selectionStart || 0;
    const currentValue = data.campos || "";
    const textBefore = currentValue.substring(0, cursorPosition);
    const textAfter = currentValue.substring(cursorPosition);
    
    const newValue = textBefore + droppedText + textAfter;
    
    if (onEdit) {
      onEdit("campos", newValue);
    }
    
    setIsDraggingOverCampos(false);
    console.log(`Campo ${droppedText} agregado a Campos`);
  };

  // ===============================================

  return (
    <tr className="grid grid-cols-12 gap-3 items-center p-2 border-b-1 border-b-jerarquia3">
      {/* Position - Solo lectura */}
      <td className="col-span-1 text-sm font-bold text-gray-800">
        {data.position}
      </td>
      
      {/* Alias - Editable CON DROP ZONE */}
      <td 
        className="col-span-3 relative"
        onDragOver={handleDragOverAlias}
        onDragLeave={handleDragLeaveAlias}
        onDrop={handleDropAlias}
      >
        <input
          type="text"
          value={data.alias || ""}
          onChange={(e) => onEdit && onEdit("alias", e.target.value)}
          className={`
            w-full border rounded-md px-3 py-1 text-sm 
            focus:outline-none focus:ring-2 
            transition-all duration-200
            ${isDraggingOverAlias 
              ? 'border-blue-500 ring-2 ring-blue-300 bg-blue-50' 
              : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
            }
          `}
          placeholder="Ingresa el alias..."
        />
        {/* Indicador visual de drop zone */}
        {isDraggingOverAlias && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg 
              className="w-4 h-4 text-blue-500 animate-bounce" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        )}
      </td>
      
      {/* Campos - Editable CON DROP ZONE */}
      <td 
        className="col-span-4 relative"
        onDragOver={handleDragOverCampos}
        onDragLeave={handleDragLeaveCampos}
        onDrop={handleDropCampos}
      >
        <input
          type="text"
          value={data.campos || ""}
          onChange={(e) => onEdit && onEdit("campos", e.target.value)}
          className={`
            w-full border rounded-md px-3 py-1 text-sm 
            focus:outline-none focus:ring-2 
            transition-all duration-200
            ${isDraggingOverCampos 
              ? 'border-green-500 ring-2 ring-green-300 bg-green-50' 
              : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
            }
          `}
          placeholder="Ingresa el campo..."
        />
        {/* Indicador visual de drop zone */}
        {isDraggingOverCampos && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg 
              className="w-4 h-4 text-green-500 animate-bounce" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        )}
      </td>
      
      {/* Formato Campo - Sin cambios (mantiene SelectWallet) */}
      <td className="col-span-2">
        <SelectWallet
          options={formatOptions}
          defaultValue={data.formato}
          className="text-sm italic"
          onChange={value => onEdit && onEdit("formato", value)}
        />
      </td>
      
      {/* Resaltado - Sin cambios (mantiene SelectWallet) */}
      <td className="col-span-2">
        <SelectWallet
          options={highlightOptions}
          defaultValue={data.resaltado}
          className="text-sm italic"
          onChange={value => onEdit && onEdit("resaltado", value)}
        />
      </td>
    </tr>
  );
};

export default OptionFields;