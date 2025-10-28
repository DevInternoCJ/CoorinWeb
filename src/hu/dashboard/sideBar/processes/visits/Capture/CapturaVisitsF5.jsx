import React from "react";

const CapturaVisitsF5 = () => (
  <div className="area-f5 p-2 rounded mb-2 h-full">
    <h3 className="font-bold text-sm mb-2">Entre Calles – F5</h3>
    <div className="flex flex-col gap-2">
      <div>
        <label className="block text-xs mb-1 text-emerald-700 font-semibold">Calle Horiznl Norte</label>
        <input
          disabled
          className="px-4 p-1 block w-full rounded-lg sm:text-sm bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1"
          style={{ color: 'var(--color-jerarquia3)' }}
        />
      </div>
      <div>
        <label className="block text-xs mb-1 text-emerald-700 font-semibold">Calle Horiznl Sur</label>
        <input
          disabled
          className="px-4 p-1 block w-full rounded-lg sm:text-sm bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1"
          style={{ color: 'var(--color-jerarquia3)' }}
        />
      </div>
      <div>
        <label className="block text-xs mb-1 text-emerald-700 font-semibold">Calle Vert Este</label>
        <input
          disabled
          className="px-4 p-1 block w-full rounded-lg sm:text-sm bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1"
          style={{ color: 'var(--color-jerarquia3)' }}
        />
      </div>
      <div>
        <label className="block text-xs mb-1 text-emerald-700 font-semibold">Calle Vert Ost.</label>
        <input
          disabled
          className="px-4 p-1 block w-full rounded-lg sm:text-sm bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1"
          style={{ color: 'var(--color-jerarquia3)' }}
        />
      </div>
    </div>
  </div>
);

export default CapturaVisitsF5;
