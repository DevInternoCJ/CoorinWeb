import React, { useState } from "react";
import { IconCustomTable } from "../IconesConsultations";
import ModalSeleccionCampania from "../ModalCamapañas/ModalSeleccionCampania";
import IconCircular from "../../../../../components/iconos/IconCircular";
import ConsultFilter from "../../../../../components/select/ConsultFilter";

const DropdownArrow = () => (
    <span className="modal-dropdown-arrow">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M6 8l4 4 4-4" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </span>
);

const situacionOptions = [
    { value: "situacion1", label: "Situación 1" },
    { value: "situacion2", label: "Situación 2" },
    { value: "situacion3", label: "Situación 3" },
    { value: "situacion4", label: "Situación 4" }
];

const ModalConsultaCuentasFiltros = ({ onGetSituacionOptions, idProducto, idCartera }) => {
    const [cuenta, setCuenta] = useState("Cuenta");
    const [situacion, setSituacion] = useState("situacion1");
    const [operador, setOperador] = useState("=");
    const [niegan, setNiegan] = useState("niegan1");
    const [filtros, setFiltros] = useState([]);
    const [openSeleccionCampania, setOpenSeleccionCampania] = useState(false);

    const eliminarFiltro = (id) => {
        setFiltros(filtros.filter(filtro => filtro.id !== id));
    };

    const agregarFiltro = () => {
        const nuevoFiltro = {
            id: Date.now(),
            concepto: cuenta,
            campo: situacion,
            valores: niegan,
            operador: operador
        };
        setFiltros(prevFiltros => [...prevFiltros, nuevoFiltro]);
    };

    React.useEffect(() => {
        if (onGetSituacionOptions) {
            const selectedOption = situacionOptions.find(option => option.value === situacion);
            if (selectedOption) {
                onGetSituacionOptions([selectedOption]); // Enviar solo la seleccionada como array
            }
        }
    }, [situacion, onGetSituacionOptions]); // Actualizar cuando cambie la situación seleccionada

    return (
      <>
        <div
          className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] h-full flex flex-col"
          style={{ minWidth: 0 }}
        >
          <div className="flex items-center justify-between mb-2">
            <IconCircular
              bgColor="bg-iconCircular"
              textColor="text-gray-800"
              borderColor="border-gray-50"
              size="size-8"
              borderWidth="border-4"
              tooltip="Filtros de búsqueda"
              tooltipPlacement="right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M32 64C19.1 64 7.4 71.8 2.4 83.8s-2.2 25.7 7 34.8L192 301.3V416c0 8.5 3.4 16.6 9.4 22.6l64 64c9.2 9.2 22.9 11.9 34.9 6.9S320 492.9 320 480V301.3l182.6-182.6c9.2-9.2 11.9-22.9 6.9-34.9S492.9 64 480 64z"
                />
              </svg>
            </IconCircular>

            <div className="flex items-center gap-2">
              <input
                type="date"
                className="bg-gray-50 py-2.5 sm:py-2 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="This is placeholder"
              />
              <button className="btn-success">
                Exportar
                <span className="material-icons text-base align-middle"></span>
              </button>
              <button className="btn-info" onClick={agregarFiltro}>
                Agregar
              </button>
              <button className="btn-success">
                Consultar
                <span className="material-icons text-base align-middle"></span>
              </button>
              {/* Tooltip agregado aquí */}
              <span className="hs-tooltip [--placement:top] inline-flex justify-center items-center size-7 rounded-lg bg-iconCircular">
                <IconCustomTable
                  className="size-18 cursor-pointer"
                  style={{ color: "var(--color-jerarquia3)" }}
                  onClick={() => setOpenSeleccionCampania(true)}
                />
                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm"
                  role="tooltip"
                >
                  Cargar filas de trabajo
                </span>
              </span>
            </div>
          </div>
          {/* Selects en columnas y responsivo */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-2 w-full">
            {/* Cuenta */}
            <div className="relative flex-1">
              <select
                className="peer p-4 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none
                            focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                value={cuenta}
                onChange={(e) => setCuenta(e.target.value)}
                id="cuenta-select"
              >
                <option value="" disabled hidden></option>
                <option value="Cuenta">Cuenta</option>
                <option value="Producto">Producto</option>
                <option value="Conteos">Conteos</option>
                <option value="Fechas">Fechas</option>
              </select>
              <label
                htmlFor="cuenta-select"
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                            peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
                            peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
              >
                Filtros
              </label>
            </div>
            {/* Situación - Usando ConsultFilter */}
            <ConsultFilter
              options={situacionOptions}
              label="Seleccione"
              defaultValue={situacion}
              onSelectionChange={(selectedOption) => {
                if (selectedOption) {
                  setSituacion(selectedOption.value);
                }
              }}
              id="situacion-select"
              filterType={cuenta}
              idProducto={idProducto}
              idCartera={idCartera}
            />
            {/* Operador */}
            <div className="relative flex-1">
              <select
                className="peer p-4 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none
                            focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 font-bold"
                value={operador}
                onChange={(e) => setOperador(e.target.value)}
                id="operador-select"
              >
                <option value="=" className="font-bold">
                  =
                </option>
                <option value="≠" className="font-bold">
                  ≠
                </option>
              </select>
              <label
                htmlFor="operador-select"
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                            peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
                            peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
              >
                Operador
              </label>
            </div>
            {/* Niegan Acreditado */}
            <div className="relative flex-1">
              <select
                className="peer p-4 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none
                            focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                value={niegan}
                onChange={(e) => setNiegan(e.target.value)}
                id="niegan-select"
              >
                <option value="" disabled hidden></option>
                <option value="niegan1">Niegan Acreditado 1</option>
                <option value="niegan2">Niegan Acreditado 2</option>
              </select>
              <label
                htmlFor="niegan-select"
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                            peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
                            peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
              >
                Niegan acreditado
              </label>
            </div>
          </div>

          <div
            style={{
              overflowX: "auto",
              overflowY: "auto",
              maxHeight: "31vh",
              height: "100%",
              flex: 1,
            }}
            className="scrollbar-gray"
          >
            <table className="modal-table mb-2">
              <thead>
                <tr>
                  <th>Campo</th>
                  <th>Valores</th>
                  <th>Borrar</th>
                </tr>
              </thead>
              <tbody>
                {filtros.length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      style={{
                        textAlign: "center",
                        color: "#666",
                        fontStyle: "italic",
                      }}
                    >
                      No hay filtros agregados
                    </td>
                  </tr>
                ) : (
                  filtros.map((filtro) => (
                    <tr key={filtro.id}>
                      <td>{filtro.campo}</td>
                      <td>{filtro.valores}</td>
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
                              onClick={() => eliminarFiltro(filtro.id)}
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
                                Borrar filtro
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
        {openSeleccionCampania && (
          <ModalSeleccionCampania
            open={openSeleccionCampania}
            onClose={() => setOpenSeleccionCampania(false)}
            onCargar={() => setOpenSeleccionCampania(false)}
          />
        )}
      </>
    );
};

export default ModalConsultaCuentasFiltros;