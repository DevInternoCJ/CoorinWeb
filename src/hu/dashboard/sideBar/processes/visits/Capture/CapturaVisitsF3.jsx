import React from "react";

const CapturaVisitsF3 = () => (
  <div className="area-f5 p-2 rounded mb-2 h-full w-full sm:max-w-[540px]">
    <h3 className="font-bold text-sm mb-2">Auto – F3</h3>
    <div className="flex flex-col gap-2">
  <div className="relative w-full min-w-0">
        <select
          className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          id="mapeo-select-f3"
        >
          <option value="" hidden></option>
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
        </select>
        <label
          htmlFor="mapeo-select-f3"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
        >
          Mapeo
        </label>
      </div>
  <div className="flex flex-row gap-1 items-stretch">
  <div className="relative basis-3/5 min-w-0">
          <select
            className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
            id="marca-select-f3"
          >
            <option value="" hidden></option>
            <option value="opcion1">Mercedez Benz</option>
            <option value="opcion2">Opción 2</option>
          </select>
          <label
            htmlFor="marca-select-f3"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
          >
            Marca
          </label>
        </div>
  <div className="relative basis-2/5 min-w-0">
          <select
            className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
            id="anio-select-f3"
          >
            <option value="" hidden></option>
            <option value="opcion1">2025</option>
            <option value="opcion2">2026</option>
          </select>
          <label
            htmlFor="anio-select-f3"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
          >
            Año
          </label>
        </div>
      </div>
      {/* Modelo - input animado */}
  <div className="relative w-full min-w-0">
        <input
          type="text"
          id="modelo-input-f3"
          placeholder=" "
          className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="modelo-input-f3"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"        >
          Modelo
        </label>
      </div>
      {/* Placas - input animado */}
  <div className="relative w-full min-w-0">
        <input
          type="text"
          id="placas-input-f3"
          placeholder=" "
          className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="placas-input-f3"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"        >
          Placas
        </label>
      </div>
    </div>
  </div>
);

export default CapturaVisitsF3;
