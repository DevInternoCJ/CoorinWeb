import React from "react";

const CapturaVisitsF4 = () => (
  <div className="area-f4 p-2 rounded mb-2">
    <h3 className="font-bold text-sm mb-2">Visita – F4</h3>
    <div className="grid grid-cols-3 gap-2">
      {/* Row 1 */}
      <div>
        <label className="block text-xs mb-1">Contacto</label>
        <select disabled className="peer p-2 block w-full bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2" />
      </div>
      <div className="col-span-2">
        <label className="block text-xs mb-1">Atendió</label>
        <select disabled className="px-4 p-1 block w-full rounded-lg sm:text-sm bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1" style={{ color: 'var(--color-jerarquia3)' }} />
      </div>
      {/* Row 2 */}
      <div>
        <label className="block text-xs mb-1">Parentesco</label>
        <select disabled className="peer p-2 block w-full bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2" />
      </div>
      <div>
        <label className="block text-xs mb-1">Situación</label>
        <select disabled className="peer p-2 block w-full bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2" />
      </div>
      <div>
        <label className="block text-xs mb-1">No Pago</label>
        <select disabled className="peer p-2 block w-full bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2" />
      </div>
      {/* Row 3 */}
      <div>
        <label className="block text-xs mb-1">Visita</label>
        <div className="hs-input-group w-full max-w-full sm:max-w-[260px] md:max-w-[180px]">
          <input
            type="date"
            className="bg-gray-50 py-2 px-3 block w-full border-gray-200 rounded-lg text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            style={{ fontSize: '0.75rem' }}
          />
        </div>
      </div>
      <div>
        <label className="block text-xs mb-1">Hora</label>
        <div className="hs-input-group w-full max-w-full sm:max-w-[260px] md:max-w-[180px]">
          <input
            type="time"
            className="bg-gray-50 py-2 px-3 block w-full border-gray-200 rounded-lg text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            style={{ fontSize: '0.75rem' }}
          />
        </div>
      </div>
      <div>
        <label className="block text-xs mb-1">Visitador</label>
        <input disabled className="px-4 p-1 block w-full rounded-lg sm:text-sm bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1" style={{ color: 'var(--color-jerarquia3)' }} />
      </div>
      {/* Row 4 */}
      <div>
        <label className="block text-xs mb-1">Sucursal</label>
        <select disabled className="peer p-2 block w-full bg-gray-50 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2" />
      </div>
      <div>
        <label className="block text-xs mb-1">Paquete</label>
        <input disabled className="px-4 p-1 block w-full rounded-lg sm:text-sm bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1" style={{ color: 'var(--color-jerarquia3)' }} />
      </div>
      <div>
        <label className="block text-xs mb-1">Fecha Pago</label>
        <div className="hs-input-group w-full max-w-full sm:max-w-[260px] md:max-w-[180px]">
          <input
            type="date"
            className="bg-gray-50 py-2 px-3 block w-full border-gray-200 rounded-lg text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            style={{ fontSize: '0.75rem' }}
          />
        </div>
      </div>
      {/* Observación y Monto */}
      <div className="col-span-3 flex items-end justify-between gap-2">
        <label className="block text-xs mb-1">Observación</label>
        <div className="flex items-center gap-2">
          <label className="block text-xs mb-1">Monto</label>
          <input
            disabled
            className="px-4 p-1 block w-[120px] rounded-lg sm:text-sm bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1"
            style={{ color: 'var(--color-jerarquia3)' }}
          />
        </div>
      </div>
      <div className="col-span-3">
        <textarea
          disabled
          className="px-4 p-1 block w-full rounded-lg sm:text-sm bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1"
          style={{ color: 'var(--color-jerarquia3)', minHeight: '3.05rem', height: '4.2rem' }}
          rows={4}
        />
      </div>
    </div>
  </div>
);

export default CapturaVisitsF4;
