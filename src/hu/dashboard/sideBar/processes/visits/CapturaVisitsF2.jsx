import React from "react";

const CapturaVisitsF2 = () => (
  <div className="area-f2 p-2 rounded mb-2">
    <h3 className="font-bold text-sm mb-2">Vivienda – F2</h3>
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className="block text-xs mb-1">Mapeo</label>
        <select disabled className="peer p-2 block w-full bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2" />
      </div>
      <div>
        <label className="block text-xs mb-1">Habitada Titular</label>
        <select disabled className="peer p-2 block w-full bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2" />
      </div>
      <div>
        <label className="block text-xs mb-1">Fachada</label>
        <select disabled className="peer p-2 block w-full bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2" />
      </div>
      <div>
        <label className="block text-xs mb-1">Puerta</label>
        <select disabled className="peer p-2 block w-full bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2" />
      </div>
      <div>
        <label className="block text-xs mb-1">Herrería</label>
        <select disabled className="peer p-2 block w-full bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2" />
      </div>
      <div>
        <label className="block text-xs mb-1">NivelesPisos</label>
        <select disabled className="peer p-2 block w-full bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2" />
      </div>
      <div>
        <label className="block text-xs mb-1">Vivienda</label>
        <select disabled className="peer p-2 block w-full bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2" />
      </div>
      <div>
        <label className="block text-xs mb-1">N.Economico</label>
        <select disabled className="peer p-2 block w-full bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2" />
      </div>
      
    </div>
    <div className="col-span-2" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <label className="block text-xs mb-1">Propietario</label>
      <input
        disabled
        className="px-4 p-1 block w-full rounded-lg sm:text-sm bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1"
        style={{ color: 'var(--color-jerarquia3)' }}
      />
    </div>
  </div>
);

export default CapturaVisitsF2;
