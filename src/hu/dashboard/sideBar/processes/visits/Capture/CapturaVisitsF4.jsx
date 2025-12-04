import React from "react";

const CapturaVisitsF4 = () => (
  <div className="area-f4 p-2 rounded mb-2">
    <h3 className="font-bold text-sm mb-2">Visita – F4</h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {/* Row 1 */}
  <div className="relative w-full min-w-0 sm:max-w-none">
        <select
          className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          id="contacto-select-f4"
        >
          <option value="" hidden></option>
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
        </select>
        <label
          htmlFor="contacto-select-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
        >
          Contacto
        </label>
      </div>
  <div className="relative w-full min-w-0 sm:col-span-2">
        <input
          type="text"
        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          id="atendio-input-f4"
          placeholder=" "
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="atendio-input-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
        >
          Atendió
        </label>
      </div>
      {/* Row 2 */}
  <div className="relative w-full min-w-0">
        <select
          className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          id="parentesco-select-f4"
        >
          <option value="" hidden></option>
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
        </select>
        <label
          htmlFor="parentesco-select-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
        >
          Parentesco
        </label>
      </div>
  <div className="relative w-full min-w-0">
        <select
          className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          id="situacion-select-f4"
        >
          <option value="" hidden></option>
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
        </select>
        <label
          htmlFor="situacion-select-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
        >
          Situación
        </label>
      </div>
  <div className="relative w-full min-w-0">
        <select
          className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          id="nopago-select-f4"
        >
          <option value="" hidden></option>
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
        </select>
        <label
          htmlFor="nopago-select-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
        >
          No Pago
        </label>
      </div>
      {/* Row 3 */}
      {/* Visita - calendario con label flotante */}
  <div className="relative w-full min-w-0">
        <input
          type="date"
          id="visita-date-f4"
          placeholder=" "
        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="visita-date-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
        >
          Visita
        </label>
      </div>
      {/* Hora - timer con label flotante */}
  <div className="relative w-full min-w-0">
        <input
          type="time"
          id="hora-time-f4"
          placeholder=" "
          className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="hora-time-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
        >
          Hora
        </label>
      </div>
  <div className="relative w-full min-w-0">
        <input
          type="text"
        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          id="visitador-input-f4"
          placeholder=" "
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="visitador-input-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"        >
          Visitador
        </label>
      </div>
      {/* Row 4 */}
  <div className="relative w-full min-w-0">
        <select
          className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          id="sucursal-select-f4"
        >
          <option value="" hidden></option>
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
        </select>
        <label
          htmlFor="sucursal-select-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
        >
          Sucursal
        </label>
      </div>
  <div className="relative w-full min-w-0">
        <input
          type="text"
        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          id="paquete-input-f4"
          placeholder=" "
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="paquete-input-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"        >
          Paquete
        </label>
      </div>
      {/* Fecha Pago - calendario con label flotante */}
      <div className="relative w-full min-w-0">
        <input
          type="date"
          id="fechapago-date-f4"
          placeholder=" "
          className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="fechapago-date-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
        >
          Fecha Pago
        </label>
      </div>

      {/* Monto debajo de Fecha Pago, alineado derecha en desktop */}
      <div className="sm:col-start-3 sm:row-start-auto w-full min-w-0">
        <div className="relative w-full min-w-0">
          <input
            type="text"
        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
            id="monto-input-f4"
            placeholder=" "
            style={{ color: 'var(--color-jerarquia3)' }}
          />
          <label
            htmlFor="monto-input-f4"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
          >
            Monto
          </label>
        </div>
      </div>

      {/* Observación */}
      <div className="sm:col-span-3 w-full min-w-0 mt-4">
        <div className="sm:col-span-2 flex flex-col gap-1 w-full min-w-0">
          <label className="block text-xs mb-1">Observación</label>
        </div>
        <textarea
          className="px-4 p-1 block w-full min-w-0 rounded-lg sm:text-sm bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1"
          style={{ color: 'var(--color-jerarquia3)', minHeight: '8.2rem', height: '8.2rem' }}
          rows={4}
        />
      </div>
    </div>
  </div>
);

export default CapturaVisitsF4;
