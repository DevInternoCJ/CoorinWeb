import React from "react";
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
]

const OptionFields = ({ data, onEdit }) => {
  return (
    <tr className="grid grid-cols-12 gap-3 items-center p-2 border-b-1 border-b-jerarquia3">
      {/* Position - Solo lectura */}
      <td className="col-span-1 text-sm font-bold text-gray-800">
        {data.position}
      </td>
      
      {/* Alias - Editable */}
      <td className="col-span-3">
        <input
          type="text"
          value={data.alias || ""}
          onChange={(e) => onEdit && onEdit("alias", e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ingresa el alias..."
        />
      </td>
      
      {/* Campos - Editable */}
      <td className="col-span-4">
        <input
          type="text"
          value={data.campos || ""}
          onChange={(e) => onEdit && onEdit("campos", e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ingresa el campo..."
        />
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