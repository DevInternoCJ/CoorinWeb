import React, { useState } from "react";
import ModaBaseEjecutivos from "./ModaBaseEjecutivos";
import ConsorcioLogo from "../../../../../assets/logo_coorin_5.svg";

const ModalConsultaEjecutivos = ({ open, onClose }) => {
  // Estados de ejemplo
  const [cartera, setCartera] = useState("american_express");
  const [producto, setProducto] = useState("american_express");
  const [encargado, setEncargado] = useState("marilin");
  const [desde, setDesde] = useState("2025-08-08");
  const [hasta, setHasta] = useState("2025-10-07");
  const [indicador, setIndicador] = useState("todos");

  return (
    < >
      <div className="coorin-modal-xl-container" style={{ maxWidth: "98vw", overflowX: "hidden" }}>
        {/* Header y formulario */}
        <div className="flex gap-6 mb-4 px-4">
          {/* Logo */}
          <div className="w-72 flex flex-col items-center justify-center">
            <img
              src={ConsorcioLogo}
              alt="Consorcio Jurídico"
              style={{ height: "60px", width: "auto", objectFit: "contain" }}
            />
          </div>
          {/* Formulario */}
          <form className="flex-1 grid grid-cols-3 gap-x-6 gap-y-2 items-center">
            <label className="text-[var(--color-jerarquia4)] font-semibold col-span-1">Cartera:</label>
            <select
              className="modal-dropdown-select col-span-2"
              value={cartera}
              onChange={e => setCartera(e.target.value)}
            >
              <option value="american_express">American Express</option>
              <option value="hsbc">HSBC</option>
              <option value="santander">Santander</option>
            </select>

            <label className="text-[var(--color-jerarquia4)] font-semibold col-span-1">Producto:</label>
            <select
              className="modal-dropdown-select col-span-2"
              value={producto}
              onChange={e => setProducto(e.target.value)}
            >
              <option value="american_express">American Express</option>
              <option value="hsbc">HSBC</option>
              <option value="santander">Santander</option>
            </select>

            <label className="text-[var(--color-jerarquia4)] font-semibold col-span-1">Encargado:</label>
            <select
              className="modal-dropdown-select col-span-2"
              value={encargado}
              onChange={e => setEncargado(e.target.value)}
            >
              <option value="marilin">Marilin Hernández García</option>
              <option value="otro">Otro encargado</option>
            </select>

            <label className="text-[var(--color-jerarquia4)] font-semibold col-span-1">Desde:</label>
            <input
              type="date"
              className="modal-dropdown-select col-span-2"
              value={desde}
              onChange={e => setDesde(e.target.value)}
            />

            <label className="text-[var(--color-jerarquia4)] font-semibold col-span-1">Hasta:</label>
            <input
              type="date"
              className="modal-dropdown-select col-span-2"
              value={hasta}
              onChange={e => setHasta(e.target.value)}
            />

            <label className="text-[var(--color-jerarquia4)] font-semibold col-span-1">Indicador:</label>
            <select
              className="modal-dropdown-select col-span-2"
              value={indicador}
              onChange={e => setIndicador(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="uno">Uno</option>
            </select>
          </form>
        </div>

        {/* Botones */}
        <div className="flex justify-between items-center px-4 mb-2">
          <button className="modal-btn-primary" type="button">
            Buscar
          </button>
          <button className="modal-btn-outline" type="button">
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