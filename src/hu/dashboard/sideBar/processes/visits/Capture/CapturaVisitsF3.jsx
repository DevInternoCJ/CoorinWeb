import React from "react";

const CapturaVisitsF3 = () => (
<div className="area-f5 p-2 rounded mb-2 h-full">
    <h3 className="font-bold text-sm mb-2">Auto – F3</h3>
    <div className="flex flex-col gap-2">
      <div>
        <label className="block text-xs mb-1 text-emerald-700 font-semibold">Mapeo</label>
        <select disabled className="peer p-2 block w-full bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2" />
      </div>
      <div>
        <label className="block text-xs mb-1 text-emerald-700 font-semibold">Marca</label>
        <select disabled className="peer p-2 block w-full bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2" />
      </div>
      <div>
        <label className="block text-xs mb-1 text-emerald-700 font-semibold">Modelo</label>
        <input
          disabled
          className="px-4 p-1 block w-full rounded-lg sm:text-sm bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1"
          style={{ color: 'var(--color-jerarquia3)' }}
        />
      </div>
      <div>
        <label className="block text-xs mb-1 text-emerald-700 font-semibold">Año</label>
        <select disabled className="peer p-2 block w-full bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2" />
      </div>
      <div>
        <label className="block text-xs mb-1 text-emerald-700 font-semibold">Placas</label>
        <input
          disabled
          className="px-4 p-1 block w-full rounded-lg sm:text-sm bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1"
          style={{ color: 'var(--color-jerarquia3)' }}
        />
      </div>
    </div>
  </div>
);

export default CapturaVisitsF3;
