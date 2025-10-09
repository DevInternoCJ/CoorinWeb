import React, { useState } from "react";
import ModaBaseEjecutivos from "./ModaBaseEjecutivos";
import ConsorcioLogo from "../../../../../assets/logo_coorin_7.svg";

const ModalConsultaEjecutivos = ({ open, onClose }) => {
  // Estados de ejemplo
  const [cartera, setCartera] = useState("american_express");
  const [producto, setProducto] = useState("american_express");
  const [encargado, setEncargado] = useState("marilin");
  const [desde, setDesde] = useState("2025-08-08");
  const [hasta, setHasta] = useState("2025-10-07");
  const [indicador, setIndicador] = useState("todos");

  return (
    <>
      <div
        className="coorin-modal-xl-container"
        style={{ maxWidth: "98vw", overflowX: "hidden" }}
      >
        {/* Header y formulario */}
        <div className="flex gap-6 mb-4 mt-4 px-4">
          {/* Logo */}
          <div className="w-32 h-32 flex flex-col items-center justify-center bg-gray-50 rounded-full overflow-hidden">
            <img
              src={ConsorcioLogo}
              alt="Consorcio Jurídico"
              style={{ height: "90px", width: "90px", objectFit: "cover" }}
            />
          </div>
          {/* Formulario con input group Preline */}
          <form className="flex-1 grid grid-cols-4 gap-x-6 gap-y-2 items-center">
            {/* Cartera */}
            <div className="relative">
              <select
  
                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none
                  focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                value={cartera}
                onChange={(e) => setCartera(e.target.value)}
                id="cartera-select"
              >
                <option value="" disabled hidden></option>
                <option value="american_express">American Express</option>
                <option value="hsbc">HSBC</option>
                <option value="santander">Santander</option>
              </select>
              <label
                htmlFor="cartera-select"
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                  peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
                  peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
              >
                Cartera
              </label>
            </div>
            {/* Producto */}
            <div className="relative">
              <select
                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none
                  focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                value={producto}
                onChange={(e) => setProducto(e.target.value)}
                id="producto-select"
              >
                <option value="" disabled hidden></option>
                <option value="american_express">American Express</option>
                <option value="hsbc">HSBC</option>
                <option value="santander">Santander</option>
              </select>
              <label
                htmlFor="producto-select"
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                  peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
                  peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
              >
                Producto
              </label>
            </div>
            {/* Encargado */}
            <div className="relative">
              <select
                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none
                  focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                value={encargado}
                onChange={(e) => setEncargado(e.target.value)}
                id="encargado-select"
                
              >
                <option value="" disabled hidden></option>
                <option value="marilin">Marilin Hernández García</option>
                <option value="otro">Otro encargado</option>
              </select>
              <label
                htmlFor="encargado-select"
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                  peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
                  peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
              >
                Encargado
              </label>
            </div>
            {/* Indicador */}
            <div className="relative">
              <select
                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none
                  focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                value={indicador}
                onChange={(e) => setIndicador(e.target.value)}
                id="indicador-select"
              >
                <option value="" disabled hidden></option>
                <option value="todos">Todos</option>
                <option value="uno">Uno</option>
              </select>
              <label
                htmlFor="indicador-select"
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                  peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
                  peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
              >
                Indicador
              </label>
            </div>
            {/* Desde */}
            <div className="hs-input-group">
              <span className="hs-input-group-text min-w-[90px]">Desde</span>
              <input
                type="date"
                className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                value={desde}
                onChange={(e) => setDesde(e.target.value)}
              />
            </div>
            {/* Hasta */}
            <div className="hs-input-group">
              <span className="hs-input-group-text min-w-[90px]">Hasta</span>

              <div className="max-w-sm space-y-3">
                <input
                  type="date"
                  className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="This is placeholder"
                  value={hasta}
                  onChange={(e) => setHasta(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>

        {/* Botones */}
        <div className="flex justify-between items-center px-4 mb-2">
          <button type="button" className="btn-success">
            Buscar
          </button>

          <button className="btn-info" type="button">
            Exportar
          </button>
        </div>

        {/* Tabla de resultados */}
        <div className="overflow-x-auto" style={{ maxHeight: "400px" }}>
          <table className="modal-table min-w-[900px]">
            <thead>
              <tr>
                <th>NombreEjecutivo</th>
                <th>Ejecutivo</th>
                <th>NombreEncargado</th>
                <th>Encargado</th>
                <th>CuentasGestionadas</th>
                <th>GestionesT</th>
              </tr>
            </thead>
            <tbody>
              {/* Aquí renderiza tus filas dinámicamente */}
              <tr>
                <td>Brisa Belem Barragan Alvarez</td>
                <td>BRBA</td>
                <td>Claudia Perez Bernal</td>
                <td>PLCA</td>
                <td>175</td>
                <td>219</td>
              </tr>
              {/* ...más filas */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ModalConsultaEjecutivos;