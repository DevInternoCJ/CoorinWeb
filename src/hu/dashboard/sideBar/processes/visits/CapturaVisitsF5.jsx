import React from "react";

const CapturaVisitsF5 = () => (
  <div className="area-f5 border p-2 rounded mb-2">
    <h3 className="font-bold text-sm mb-2">Entre Calles – F5</h3>
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className="block text-xs mb-1">Calle Horiznl Norte</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Calle Horiznl Sur</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Calle Vert Este</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Calle Vert Ost.</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
    </div>
  </div>
);

export default CapturaVisitsF5;
