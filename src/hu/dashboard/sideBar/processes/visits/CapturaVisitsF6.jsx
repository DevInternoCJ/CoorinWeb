import React from "react";

const CapturaVisitsF6 = () => (
  <div className="area-f6 border p-2 rounded mb-2">
    <h3 className="font-bold text-sm mb-2">Teléfonos – F6</h3>
    <div className="grid grid-cols-2 gap-2">
      <div className="col-span-2">
        <label className="block text-xs mb-1">Teléfono</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <button disabled className="px-2 py-1 text-xs bg-gray-300 rounded mr-2">Eliminar</button>
        <button disabled className="px-2 py-1 text-xs bg-gray-300 rounded">Teléfono</button>
      </div>
    </div>
  </div>
);

export default CapturaVisitsF6;
