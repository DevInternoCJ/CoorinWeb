import React from "react";
import GridExecutives from "./board/executives/gridExecutives";
import GridConsultations from "./board/consultations/GridConsultations";

export default function CoorinDashboard() {
  return (
    <div className="relative bg-background-dashboard py-14 sm:py-2 overflow-hidden">
      <div className="mx-auto max-w-2xl px-2 lg:max-w-screen lg:px-8 relative">
        <h2 className="text-base/7 font-semibold text-indigo-600">
          Menu Principal
        </h2>
        <span className="mx-auto mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-4xl">
          Ejecutivos
        </span>
        <div className="mt-2 grid grid-cols-6 gap-4 sm:mt-8 md:mt-8 lg:mt-0 xl:mt-0">
          <div className="col-span-6">
            <GridExecutives />
          </div>
        </div>
        
        <div className="col-span-6 row-start-2 relative">
          <hr className="my-8 border-t border-gray-500 opacity-60" />
          <span className="mx-auto mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-4xl ">
            Consultas
          </span>
          <div className="-mt-10">
            <GridConsultations />
          </div>
          <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5"></div>
        </div>


        <div className="grid grid-cols-2 gap-4 mt-8">
        
          <div className="relative bg-white shadow-lg ring-1 ring-black/5 rounded-bl-4xl flex flex-col p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
              <span className="mr-2">
                {/* Icono personalizado para Sesiones */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="inline-block w-6 h-6 text-gray-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                </svg>
              </span>
              Sesiones
            </h3>
            <div className="bg-[#e5ebf2] rounded-lg flex-1 min-h-[200px] p-4">
              <div className="overflow-x-auto max-h-[200vmax]">
                <table className="min-w-full border border-gray-200 rounded-lg bg-[var(--color-jerarquia1)]">
                  <thead>
                    <tr className="bg-[var(--color-jerarquia1)]">
                      <th className="px-4 py-2 text-left text-sm text-[var(--color-base-200)] font-bold">Dato 1</th>
                      <th className="px-4 py-2 text-left text-sm text-[var(--color-base-200)] font-bold">Dato 2</th>
                      <th className="px-4 py-2 text-left text-sm text-[var(--color-base-200)] font-bold">Dato 3</th>
                      <th className="px-4 py-2 text-left text-sm text-[var(--color-base-200)] font-bold">Dato 4</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border-t text-[var(--color-base-200)] font-bold">Valor 1</td>
                      <td className="px-4 py-2 border-t text-[var(--color-base-200)] font-bold">Valor 2</td>
                      <td className="px-4 py-2 border-t text-[var(--color-base-200)] font-bold">Valor 3</td>
                      <td className="px-4 py-2 border-t text-[var(--color-base-200)] font-bold">Valor 4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Lado derecho vacío como en la imagen */}
          <div className="relative bg-white shadow-lg ring-1 ring-black/5 rounded-br-4xl flex flex-col p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
              <span className="mr-2">
                {/* Icono de ramificación (puedes usar un ícono de tu librería de iconos preferida) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7a3 3 0 11-6 0 3 3 0 016 0zm0 0v10a3 3 0 006 0V7m0 10a3 3 0 006 0V7a3 3 0 10-6 0" /></svg>
              </span>
              Ramificación
            </h3>
            <div className="bg-[#e5ebf2] rounded-lg flex-1 min-h-[200px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
