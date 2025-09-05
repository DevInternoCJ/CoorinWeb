import React from "react";
import SelectWallet from "./SelectWallet";

const formatOptions = ["Texto", "Numero", "Moneda", "Fecha", "Porcentaje"];
const highlightOptions = ["Normal", "Resaltado", "Sobre Resaltado"];

// Ahora puedes usar userData.idEjecutivo, userData.usuario, etc.

const OptionFields = ({ data, onEdit }) => {
  return (
    <tr className="grid grid-cols-12 gap-3 items-center p-2 border-b-1 border-b-jerarquia3">
      <td className="col-span-1 text-sm font-bold text-gray-800">
        {data.position}
      </td>
      <td className="col-span-3 text-sm text-gray-700">{data.alias}</td>
      <td className="col-span-4 text-sm text-gray-600">{data.campos}</td>
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