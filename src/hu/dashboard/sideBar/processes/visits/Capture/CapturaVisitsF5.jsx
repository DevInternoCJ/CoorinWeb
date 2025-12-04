import React from "react";

const CapturaVisitsF5 = () => (
  <div className="area-f5 p-2 rounded mb-2 h-full w-full">
    <h3 className="font-bold text-sm mb-2">Entre Calles – F5</h3>
    <div className="flex flex-col gap-2">
  <div className="relative w-full min-w-0">
        <input
          type="text"
          className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          id="calle-norte-input-f5"
          placeholder=" "
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="calle-norte-input-f5"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"        >
          Calle Horiznl Norte
        </label>
      </div>
  <div className="relative w-full min-w-0">
        <input
          type="text"
          className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          id="calle-sur-input-f5"
          placeholder=" "
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="calle-sur-input-f5"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"        >
          Calle Horiznl Sur
        </label>
      </div>
  <div className="relative w-full min-w-0">
        <input
          type="text"
          className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          id="calle-este-input-f5"
          placeholder=" "
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="calle-este-input-f5"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"        >
          Calle Vert Este
        </label>
      </div>
  <div className="relative w-full min-w-0">
        <input
          type="text"
          className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          id="calle-ost-input-f5"
          placeholder=" "
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="calle-ost-input-f5"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"        >
          Calle Vert Ost.
        </label>
      </div>
    </div>
  </div>
);

export default CapturaVisitsF5;
