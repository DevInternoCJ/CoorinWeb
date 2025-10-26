import React from "react";

const CapturaVisitsF7 = () => (
  <div className="area-f7 border p-2 rounded mb-2">
    <h3 className="font-bold text-sm mb-2">Energía Eléctrica (F7)</h3>
    <div className="grid grid-cols-1 gap-2">
      <div>
        <label className="block text-xs mb-1">¿Cuenta con energía eléctrica?</label>
        <select disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">¿Cuenta con acuse de cobro?</label>
        <select disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">¿Cuenta con fotografía del predio?</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Número de medidor</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
    </div>
  </div>
);

export default CapturaVisitsF7;
