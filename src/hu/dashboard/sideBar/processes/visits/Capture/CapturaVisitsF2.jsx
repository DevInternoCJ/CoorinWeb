import React from "react";
import { useEffect, useState } from "react";
import { getCatalogoValueCard } from "../../../../../../services/mark/albaz/LokiServices";


const CapturaVisitsF2 = () => {
  const [opcionesMapeo, setOpcionesMapeo] = useState([]);
  const [mapeoSeleccionado, setMapeoSeleccionado] = useState("");
  const ID_CATALOGO_MAPEO = 26;

  useEffect(() => {
    getCatalogoValueCard()
      .then(data => {
        const mapeoOptions = Array.isArray(data)
          ? data.filter(item => item.idCatálogo === ID_CATALOGO_MAPEO)
          : [];
        setOpcionesMapeo(mapeoOptions);
      })
      .catch(() => setOpcionesMapeo([]));
  }, []);

  return (
    <div className="area-f2 p-2 rounded mb-2">
      <h3 className="font-bold text-sm mb-2">Vivienda – F2</h3>
      <div className="grid grid-cols-2 gap-2">
        {/* Mapeo */}
        <div className="relative w-full sm:col-span-2">
          <select
            className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
            id="mapeo-select"
            value={mapeoSeleccionado}
            onChange={e => setMapeoSeleccionado(e.target.value)}
          >
            <option value="" hidden></option>
            {opcionesMapeo.map(opt => (
              <option key={opt.idValor} value={opt.idValor}>{opt.valor}</option>
            ))}
          </select>
          <label
            htmlFor="mapeo-select"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
          >
            Mapeo
          </label>
        </div>
        {/* Fachada */}
        <div className="relative w-full sm:col-span-2">
          <select
            className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
            id="fachada-select"
          >
            <option value="" hidden></option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
          </select>
          <label
            htmlFor="fachada-select"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
          >
            Fachada
          </label>
        </div>
        {/* Puerta */}
        <div className="relative w-full sm:col-span-2">
          <select
            className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
            id="puerta-select"
          >
            <option value="" hidden></option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
          </select>
          <label
            htmlFor="puerta-select"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
          >
            Puerta
          </label>
        </div>
        {/* Herrería */}
        <div className="relative w-full sm:col-span-2">
          <select
            className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
            id="herreria-select"
          >
            <option value="" hidden></option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
          </select>
          <label
            htmlFor="herreria-select"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
          >
            Herrería
          </label>
        </div>
        {/* NivelesPisos y N.Economico en la misma fila */}
        <div className="relative w-full sm:col-span-2">
          <select
            className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
            id="nivelespisos-select"
          >
            <option value="" hidden></option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
          </select>
          <label
            htmlFor="nivelespisos-select"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
          >
            NivelesPisos
          </label>
        </div>
        <div className="relative w-full sm:col-span-2">
          <select
            className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
            id="neconomico-select"
          >
            <option value="" hidden></option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
          </select>
          <label
            htmlFor="neconomico-select"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
          >
            N.Economico
          </label>
        </div>
        {/* Vivienda */}
        <div className="relative w-full sm:col-span-2">
          <select
            className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
            id="vivienda-select"
          >
            <option value="" hidden></option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
          </select>
          <label
            htmlFor="vivienda-select"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
          >
            Vivienda
          </label>
        </div>
      </div>
      {/* Propietario - input animado */}
      <div className="relative w-full min-w-0 sm:col-span-2 mt-4">
        <input
          type="text"
          id="propietario-input"
          placeholder=" "
          className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="propietario-input"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
        >
          Propietario
        </label>
      </div>
    </div>
  );
}

export default CapturaVisitsF2;
