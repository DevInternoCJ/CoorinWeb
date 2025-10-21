import React, { useState } from "react";
import IconCircular from "../../../../../components/iconos/IconCircular";
const ModalConsultaCuentasColumnas = ({ situacionOptions = [] }) => {
  const [columnas, setColumnas] = useState([]);

  const eliminarColumna = (id) => {
    setColumnas(columnas.filter(columna => columna.id !== id));
  };

  const limpiarTodasLasColumnas = () => {
    setColumnas([]);
  };

  const agregarColumna = () => {
    if (situacionOptions.length > 0) {
      // Verificar que la columna no exista ya para evitar duplicados
      const nuevaColumna = situacionOptions[0]; // Solo la primera (que es la seleccionada)
      const existe = columnas.some(col => col.nombre === nuevaColumna.label);
      
      if (!existe) {
        const columnaNueva = {
          id: Date.now(),
          nombre: nuevaColumna.label
        };
        setColumnas(prevColumnas => [...prevColumnas, columnaNueva]);
      }
    }
  };

  return (
    <div
      className="bg-white rounded-lg p-2 h-full flex flex-col"
      style={{ minWidth: 0 }}
    >
      <div className="grid grid-cols-3 items-center gap-2 mb-2 w-full">
        <div className="flex items-center gap-0">
          <IconCircular 
            bgColor="bg-iconCircular" 
            textColor="text-jerarquia3" 
            borderColor="border-gray-50"
            size="size-8"
            borderWidth="border-4"
            tooltip="Columnas"
            tooltipPlacement="right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" viewBox="0 0 448 512"><path fill="currentColor" d="M0 96c0-35.3 28.7-64 64-64h320c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64zm64 64v256h128V160zm320 0H256v256h128z"/></svg>
          </IconCircular>
          <IconCircular 
            bgColor="bg-[#EECCC9]" 
            textColor="text-[#C1493E]" 
            borderColor="border-gray-50"
            size="size-8"
            borderWidth="border-4"
            tooltip="Limpiar todo"
            tooltipPlacement="right"
            onClick={limpiarTodasLasColumnas}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1.078em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512a256 256 0 1 0 0-512a256 256 0 1 0 0 512m-89-345c9.4-9.4 24.6-9.4 33.9 0l55 55l55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55l55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55l-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55l-55-55c-9.4-9.4-9.4-24.6 0-33.9"/></svg>
          </IconCircular>
        </div>
        <div className="flex justify-center items-center gap-1 col-span-1">
          <label className="flex items-center gap-1.5 px-1.5 py-0.5 rounded cursor-pointer bg-white hover:bg-[var(--color-jerarquia2)/10] transition-colors">
            <input
              type="radio"
              name="tipo"
              defaultChecked
              className="modal-radio"
            />
            <span className="whitespace-nowrap text-xs font-semibold" style={{ color: "var(--color-jerarquia4)" }}>Contar</span>
          </label>
          <label className="flex items-center gap-1.5 px-1.5 py-0.5 rounded cursor-pointer bg-white hover:bg-[var(--color-jerarquia2)/10] transition-colors">
            <input 
              type="radio" 
              name="tipo" 
              className="modal-radio" 
            />
            <span className="whitespace-nowrap text-xs font-semibold" style={{ color: "var(--color-jerarquia4)" }}>Detalle</span>
          </label>
          <label className="flex items-center gap-1.5 px-1.5 py-0.5 rounded cursor-pointer bg-white hover:bg-[var(--color-jerarquia2)/10] transition-colors">
            <input 
              type="radio" 
              name="tipo" 
              className="modal-radio" 
            />
            <span className="whitespace-nowrap text-xs font-semibold" style={{ color: "var(--color-jerarquia4)" }}>Cuentas</span>
          </label>
        </div>
        <div className="flex justify-end items-center col-span-1">
          <button
            className="btn-info"
            onClick={agregarColumna}
            disabled={situacionOptions.length === 0}
          >
            Agregar
          </button>
        </div>
      </div>
      <div
        style={{
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: "44vh",
          height: "100%",
          flex: 1,
        }}
        className="scrollbar-gray"
      >
        <table className="modal-table">
          <thead>
            <tr>
              <th>Campo</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {columnas.length === 0 ? (
              <tr>
                <td
                  colSpan="2"
                  style={{
                    textAlign: "center",
                    color: "#666",
                    fontStyle: "italic",
                  }}
                >
                  No hay columnas agregadas
                </td>
              </tr>
            ) : (
              columnas.map((columna) => (
                <tr key={columna.id}>
                  <td>{columna.nombre}</td>
                  <td style={{ textAlign: "right" }}>
                    <div className="inline-flex border border-gray-200 rounded-full p-0.5">
                      <div className="hs-tooltip [--placement:left] inline-block">
                        <button
                          type="button"
                          className="hs-tooltip-toggle inline-flex shrink-0 justify-center items-center size-5 
                          rounded-full
                           text-gray-500
                            hover:bg-red-100
                            hover:text-red-800 focus:outline-none 
                            focus:bg-red-800 focus:text-red-100"
                          onClick={() => eliminarColumna(columna.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="13"
                            viewBox="0 0 448 512"
                          >
                            <path
                              fill="currentColor"
                              d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16H281c13.8 0 26 8.8 30.4 21.9L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96zM32 144h384v304c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64zm88 64c-13.3 0-24 10.7-24 24v192c0 13.3 10.7 24 24 24s24-10.7 24-24V232c0-13.3-10.7-24-24-24m104 0c-13.3 0-24 10.7-24 24v192c0 13.3 10.7 24 24 24s24-10.7 24-24V232c0-13.3-10.7-24-24-24m104 0c-13.3 0-24 10.7-24 24v192c0 13.3 10.7 24 24 24s24-10.7 24-24V232c0-13.3-10.7-24-24-24"
                            />
                          </svg>
                          <span
                            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm"
                            role="tooltip"
                          >
                            Borrar campo
                          </span>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModalConsultaCuentasColumnas;