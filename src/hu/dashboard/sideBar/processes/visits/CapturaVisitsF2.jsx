import React from "react";

const CapturaVisitsF2 = () => (
  <div className="area-f2 border p-2 rounded mb-2">
    <h3 className="font-bold text-sm mb-2">Vivienda – F2</h3>
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className="block text-xs mb-1">Mapeo</label>
        <select disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Habitada Titular</label>
        <select disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Fachada</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Puerta</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Herrería</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">NivelesPisos</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Vivienda</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">N.Economico</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Propietario</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
    </div>
  </div>
);

export default CapturaVisitsF2;
