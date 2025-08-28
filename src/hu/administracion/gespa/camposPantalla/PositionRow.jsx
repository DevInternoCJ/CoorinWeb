import React from "react";
import CustomSelect from "./CustomSelect";

const PositionRow = ({ data }) => {
  const formatOptions = ["Texto", "Numero", "Moneda", "Fecha", "Porcentaje"];
  const highlightOptions = ["Normal", "Resaltado", "Sobre Resaltado"];

  return (
    <tr className="grid grid-cols-12 gap-3 items-center p-2 border-b-1 border-b-jerarquia3">
      <td className="col-span-1 text-sm font-bold text-gray-800">
        {data.position}
      </td>
      <td className="col-span-3 text-sm text-gray-700">{data.alias}</td>
      <td className="col-span-4 text-sm text-gray-600">{data.campos}</td>
      <td className="col-span-2">
        <CustomSelect
          options={formatOptions}
          defaultValue={data.formato}
          className="text-sm italic"
        />
      </td>
      <td className="col-span-2">
        <CustomSelect
          options={highlightOptions}
          defaultValue={data.resaltado}
          className="text-sm italic"
        />
      </td>
    </tr>
  );
};

export default PositionRow;