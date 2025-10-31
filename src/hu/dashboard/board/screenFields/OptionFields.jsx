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

  // Las funciones se aplicarán al input directamente
  const handleDragOverAlias = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    // Solo cambiar el estado si es la primera vez que entra en el input
    if (!isDraggingOverAlias) {
      setIsDraggingOverAlias(true);
    }
  };

  const handleDragLeaveAlias = (e) => {
    // Si el elemento que sale es el propio input
    if (e.target === e.currentTarget) {
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
  // Las funciones se aplicarán al input directamente
  const handleDragOverCampos = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    // Solo cambiar el estado si es la primera vez que entra en el input
    if (!isDraggingOverCampos) {
      setIsDraggingOverCampos(true);
    }
  };

  const handleDragLeaveCampos = (e) => {
    // Si el elemento que sale es el propio input
    if (e.target === e.currentTarget) {
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

  return (
    <tr className="grid grid-cols-12 gap-3 items-center mx-3">
      {/* Position - Solo lectura */}
      <td className="col-span-1 text-sm font-bold text-gray-800">
        {data.position}
      </td>

      {/* Alias - Editable CON DROP ZONE */}
      <td className="col-span-3 relative w-full">
        <input
          type="text"
          value={data.alias || ""}
          onChange={(e) => onEdit && onEdit("alias", e.target.value)}
          // 💡 Eventos de Drag and Drop aplicados al INPUT
          onDragOver={handleDragOverAlias}
          onDragLeave={handleDragLeaveAlias}
          onDrop={handleDropAlias}
          className={`
            w-full rounded-md px-3 py-2 text-sm
            focus:outline-none focus:ring-2
            transition-all duration-200
            ${isDraggingOverAlias
              ? 'border-jerarquia3 ring-2 ring-jerarquia2 bg-green-50'
              : 'bg-gray-100 focus:ring-jerarquia2 focus:border-transparent'
            }
          `}
          placeholder="Ingresa el alias..."
        />
        {/* Indicador visual de drop zone */}
        {isDraggingOverAlias && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 640 512"><path fill="currentColor" d="M320 0c17.7 0 32 14.3 32 32v208c0 8.8 7.2 16 16 16s16-7.2 16-16V64c0-17.7 14.3-32 32-32s32 14.3 32 32v176c0 8.8 7.2 16 16 16s16-7.2 16-16V128c0-17.7 14.3-32 32-32s32 14.3 32 32v178.2c-19.2 5.4-34.7 20.4-40.4 40.3l-6.5 22.7l-22.7 6.5c-25.2 7.2-42.5 30.2-42.5 56.4c0 22.1 12.4 42 31.4 51.9c-27.5 17.8-60.2 28.1-95.4 28.1h-19.2c-59.6 0-116.9-22.9-160-64L76.4 341c-16-15.2-16.6-40.6-1.4-56.6s40.6-16.6 56.6-1.4l60.5 57.6c0-1.5-.1-3.1-.1-4.6V64c0-17.7 14.3-32 32-32s32 14.3 32 32v176c0 8.8 7.2 16 16 16s16-7.2 16-16V32c0-17.7 14.3-32 32-32m-7.3 326.6c-1.1-3.9-4.7-6.6-8.7-6.6s-7.6 2.7-8.7 6.6L288 352l-25.4 7.3c-3.9 1.1-6.6 4.7-6.6 8.7s2.7 7.6 6.6 8.7L288 384l7.3 25.4c1.1 3.9 4.7 6.6 8.7 6.6s7.6-2.7 8.7-6.6L320 384l25.4-7.3c3.9-1.1 6.6-4.7 6.6-8.7s-2.7-7.6-6.6-8.7L320 352zM104 120l48.3 13.8c4.6 1.3 7.7 5.5 7.7 10.2s-3.1 8.9-7.7 10.2L104 168l-13.8 48.3c-1.3 4.6-5.5 7.7-10.2 7.7s-8.9-3.1-10.2-7.7L56 168L7.7 154.2C3.1 152.9 0 148.7 0 144s3.1-8.9 7.7-10.2L56 120l13.8-48.3C71.1 67.1 75.3 64 80 64s8.9 3.1 10.2 7.7zm480 288l48.3 13.8c4.6 1.3 7.7 5.5 7.7 10.2s-3.1 8.9-7.7 10.2L584 456l-13.8 48.3c-1.3 4.6-5.5 7.7-10.2 7.7s-8.9-3.1-10.2-7.7L536 456l-48.3-13.8c-4.6-1.3-7.7-5.5-7.7-10.2s3.1-8.9 7.7-10.2L536 408l13.8-48.3c1.3-4.6 5.5-7.7 10.2-7.7s8.9 3.1 10.2 7.7z"></path></svg>
            </div>
        )}
      </td>

      {/* Campos - Editable CON DROP ZONE */}
      <td className="col-span-4 relative">
        <input
          type="text"
          value={data.campos || ""}
          onChange={(e) => onEdit && onEdit("campos", e.target.value)}
          // 💡 Eventos de Drag and Drop aplicados al INPUT
          onDragOver={handleDragOverCampos}
          onDragLeave={handleDragLeaveCampos}
          onDrop={handleDropCampos}
          className={`
            w-full rounded-md px-3 py-2 text-sm
            focus:outline-none focus:ring-2
            transition-all duration-200
            ${isDraggingOverCampos
              ? 'border-jerarquia3 ring-2 ring-jerarquia2 bg-green-50'
              : 'bg-gray-100 focus:ring-jerarquia2 focus:border-transparent'
            }
          `}
          placeholder="Ingresa el campo..."
        />
        {isDraggingOverCampos && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 640 512"><path fill="currentColor" d="M320 0c17.7 0 32 14.3 32 32v208c0 8.8 7.2 16 16 16s16-7.2 16-16V64c0-17.7 14.3-32 32-32s32 14.3 32 32v176c0 8.8 7.2 16 16 16s16-7.2 16-16V128c0-17.7 14.3-32 32-32s32 14.3 32 32v178.2c-19.2 5.4-34.7 20.4-40.4 40.3l-6.5 22.7l-22.7 6.5c-25.2 7.2-42.5 30.2-42.5 56.4c0 22.1 12.4 42 31.4 51.9c-27.5 17.8-60.2 28.1-95.4 28.1h-19.2c-59.6 0-116.9-22.9-160-64L76.4 341c-16-15.2-16.6-40.6-1.4-56.6s40.6-16.6 56.6-1.4l60.5 57.6c0-1.5-.1-3.1-.1-4.6V64c0-17.7 14.3-32 32-32s32 14.3 32 32v176c0 8.8 7.2 16 16 16s16-7.2 16-16V32c0-17.7 14.3-32 32-32m-7.3 326.6c-1.1-3.9-4.7-6.6-8.7-6.6s-7.6 2.7-8.7 6.6L288 352l-25.4 7.3c-3.9 1.1-6.6 4.7-6.6 8.7s2.7 7.6 6.6 8.7L288 384l7.3 25.4c1.1 3.9 4.7 6.6 8.7 6.6s7.6-2.7 8.7-6.6L320 384l25.4-7.3c3.9-1.1 6.6-4.7 6.6-8.7s-2.7-7.6-6.6-8.7L320 352zM104 120l48.3 13.8c4.6 1.3 7.7 5.5 7.7 10.2s-3.1 8.9-7.7 10.2L104 168l-13.8 48.3c-1.3 4.6-5.5 7.7-10.2 7.7s-8.9-3.1-10.2-7.7L56 168L7.7 154.2C3.1 152.9 0 148.7 0 144s3.1-8.9 7.7-10.2L56 120l13.8-48.3C71.1 67.1 75.3 64 80 64s8.9 3.1 10.2 7.7zm480 288l48.3 13.8c4.6 1.3 7.7 5.5 7.7 10.2s-3.1 8.9-7.7 10.2L584 456l-13.8 48.3c-1.3 4.6-5.5 7.7-10.2 7.7s-8.9-3.1-10.2-7.7L536 456l-48.3-13.8c-4.6-1.3-7.7-5.5-7.7-10.2s3.1-8.9 7.7-10.2L536 408l13.8-48.3c1.3-4.6 5.5-7.7 10.2-7.7s8.9 3.1 10.2 7.7z"></path></svg>
            </div>
        )}
      </td>
      <td className="col-span-2">
        <SelectWallet
          options={formatOptions}
          defaultValue={data.formato}
          className="text-sm italic"
          onChange={value => onEdit && onEdit("formato", value)}
        />
      </td>
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