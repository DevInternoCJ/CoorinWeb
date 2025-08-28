import React from "react";
import PositionRow from "./PositionRow";

const PositionSection = ({ positionData }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      {/* Encabezados de la tabla */}
      <div className="bg-background-secondary rounded-md grid grid-cols-12 gap-3 mb-2 py-2 px-3 font-semibold text-white text-sm">
        <div className="col-span-1">Position</div>
        <div className="col-span-3">Alias</div>
        <div className="col-span-4">Campos</div>
        <div className="col-span-2">Formato Campo</div>
        <div className="col-span-2">Resaltado</div>
      </div>

      {/* Tabla con estructura semántica */}
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
          {positionData.map((item) => (
            <PositionRow key={item.id} data={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PositionSection;