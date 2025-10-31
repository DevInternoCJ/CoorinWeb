import React from "react";

const CapturaVisitsF7 = () => (
  <div className="area-f7 p-2 rounded mb-2">
    <h3 className="font-bold text-sm mb-2">Energía Eléctrica (F7)</h3>
    <div className="grid grid-cols-1 gap-2">
      <div>
        <label className="block text-xs mb-1">¿Cuenta con energía eléctrica?</label>
        <select disabled className="peer p-2 block w-full bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2" />
      </div>
      <div>
        <label className="block text-xs mb-1">¿Cuenta con acuse de cobro?</label>
        <select disabled className="peer p-2 block w-full bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2" />
      </div>
      <div>
        <label className="block text-xs mb-1">¿Cuenta con fotografía del predio?</label>
        <select disabled className="peer p-2 block w-full bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2" />
      </div>
      <div>
        <label className="block text-xs mb-1">Número de medidor</label>
        <input
          disabled
          className="px-4 p-1 block w-full rounded-lg sm:text-sm bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1"
          style={{ color: 'var(--color-jerarquia3)' }}
        />
      </div>
    </div>
  </div>
);

export default CapturaVisitsF7;
