import React from "react";

const CapturaVisitsF3 = () => (
  <div className="area-f3 border p-2 rounded mb-2">
    <h3 className="font-bold text-sm mb-2">Auto – F3</h3>
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className="block text-xs mb-1">Mapeo</label>
        <select disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Marca</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Modelo</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Año</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Placas</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
    </div>
  </div>
);

export default CapturaVisitsF3;
