import React from "react";
import IconCircular from "../../../../../components/Iconos/IconCircular";
import { toast } from "sonner";
const ModalConsultaCuentasColumnas = ({
  situacionOptions = [],
  allAvailableOptions = [],
  onColumnasCountChange,
  onColumnasChange,
  onTipoChange,
}) => {
  const [columnas, setColumnas] = React.useState([]);
  const [tipoConsulta, setTipoConsulta] = React.useState("contar");

  const [filtroTab, setFiltroTab] = React.useState("");

  const eliminarColumna = (id) => {
    setColumnas(columnas.filter((columna) => columna.id !== id));
  };

  const limpiarTodasLasColumnas = () => {
    if (columnas.length === 0) {
      toast.warning("No hay columnas para limpiar");
      return;
    }
    setColumnas([]);
  };

  const agregarColumna = () => {
    if (situacionOptions.length > 0) {
      // Verificar que la columna no exista ya para evitar duplicados
      const nuevaColumna = situacionOptions[0]; // Solo la primera (que es la seleccionada)
      const existe = columnas.some((col) => col.nombre === nuevaColumna.label);

      if (!existe) {
        const columnaNueva = {
          id: Date.now(),
          nombre: nuevaColumna.label,
          concepto: nuevaColumna.concepto || "Cuenta", // Agregar el concepto
        };
        setColumnas((prevColumnas) => [...prevColumnas, columnaNueva]);
      }
    }
  };

  const agregarTodasLasColumnas = () => {
    if (allAvailableOptions.length > 0) {
      // Filtrar las opciones que no estén ya agregadas
      const baseTime = Date.now();
      const nuevasColumnas = allAvailableOptions
        .filter(
          (option) => !columnas.some((col) => col.nombre === option.label),
        )
        .map((option, index) => ({
          id: baseTime + index, // Asegurar IDs únicos incrementales
          nombre: option.label,
          concepto: option.concepto || "Cuenta", // Agregar el concepto
        }));

      if (nuevasColumnas.length > 0) {
        setColumnas((prevColumnas) => [...prevColumnas, ...nuevasColumnas]);
      }
    }
  };

  // Filtrar columnas por texto
  const columnasFiltradas = columnas.filter((col) =>
    col.nombre.toLowerCase().includes(filtroTab.toLowerCase()),
  );

  // Notificar cambios en el conteo de columnas
  React.useEffect(() => {
    if (onColumnasCountChange) {
      onColumnasCountChange(columnas.length);
    }
    // Notificar cambios en las columnas
    if (onColumnasChange) {
      onColumnasChange(columnas);
    }
  }, [columnas.length, onColumnasCountChange, onColumnasChange, columnas]);

  return (
    <div className="bg-surface rounded-lg p-3 flex flex-col h-[400px]">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 flex-shrink-0">
        <div className="flex items-center justify-center gap-0">
          <IconCircular
            bgColor="bg-iconCircular"
            textColor="text-jerarquia3"
            borderColor="border-surface"
            size="size-8"
            borderWidth="border-2"
            tooltip="Columnas"
            tooltipPlacement="right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="0.88em"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M0 96c0-35.3 28.7-64 64-64h320c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64zm64 64v256h128V160zm320 0H256v256h128z"
              />
            </svg>
          </IconCircular>
          <IconCircular
            bgColor="bg-[#EECCC9]"
            textColor="text-[#C1493E]"
            borderColor="border-surface"
            size="size-8"
            borderWidth="border-2"
            tooltip="Limpiar todo"
            tooltipPlacement="right"
            onClick={limpiarTodasLasColumnas}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.078em"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 512a256 256 0 1 0 0-512a256 256 0 1 0 0 512m-89-345c9.4-9.4 24.6-9.4 33.9 0l55 55l55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55l55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55l-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55l-55-55c-9.4-9.4-9.4-24.6 0-33.9"
              />
            </svg>
          </IconCircular>
          <IconCircular
            bgColor="bg-[#bfdbfe]"
            textColor="text-[#1F4356]"
            borderColor="border-surface"
            size="size-8"
            borderWidth="border-2"
            tooltip="Agregar todas las columnas"
            tooltipPlacement="right"
            onClick={agregarTodasLasColumnas}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 512a256 256 0 1 0 0-512a256 256 0 1 0 0 512m-24-168v-64h-64c-13.3 0-24-10.7-24-24s10.7-24 24-24h64v-64c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24h-64v64c0 13.3-10.7 24-24 24s-24-10.7-24-24"
              />
            </svg>
          </IconCircular>
        </div>
        <div className="flex justify-center items-center gap-1 flex-1 sm:flex-none">
          <label className="flex items-center gap-1.5 px-1.5 py-0.5 rounded cursor-pointer bg-surface hover:bg-jerarquia1/20 transition-colors">
            <input
              type="radio"
              name="tipo"
              value="contar"
              checked={tipoConsulta === "contar"}
              onChange={(e) => {
                setTipoConsulta(e.target.value);
                onTipoChange(e.target.value);
              }}
              className="modal-radio"
            />
            <span className="whitespace-nowrap text-xs font-semibold text-jerarquia4">
              Contar
            </span>
          </label>
          <label className="flex items-center gap-1.5 px-1.5 py-0.5 rounded cursor-pointer bg-surface hover:bg-jerarquia1/20 transition-colors">
            <input
              type="radio"
              name="tipo"
              value="detalle"
              checked={tipoConsulta === "detalle"}
              onChange={(e) => {
                setTipoConsulta(e.target.value);
                onTipoChange(e.target.value);
              }}
              className="modal-radio"
            />
            <span className="whitespace-nowrap text-xs font-semibold text-jerarquia4">
              Detalle
            </span>
          </label>

          <label className="hidden items-center gap-1.5 px-1.5 py-0.5 rounded cursor-pointer bg-surface hover:bg-jerarquia1/20 transition-colors">
            <input type="radio" name="tipo" className="modal-radio" />
            <span className="whitespace-nowrap text-xs font-semibold text-jerarquia4">
              Cuentas
            </span>
          </label>
        </div>
        <div className="flex items-center sm:ml-auto">
          <button
            className="btn-info w-full sm:w-auto"
            onClick={agregarColumna}
            disabled={situacionOptions.length === 0}
          >
            Agregar
          </button>
        </div>
      </div>

      {/* Buscador interno */}
      <div className="relative mb-2">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="size-3.5 text-muted-foreground"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>
        <input
          type="text"
          className="py-1.5 ps-9 pe-8 block w-full bg-background-dashboard border-transparent rounded-lg text-xs focus:border-jerarquia2 focus:ring-jerarquia2 disabled:opacity-50 disabled:pointer-events-none placeholder:text-muted-foreground/60 transition-all font-medium"
          placeholder="Buscar campo..."
          value={filtroTab}
          onChange={(e) => setFiltroTab(e.target.value)}
        />
        {filtroTab && (
          <button
            type="button"
            onClick={() => setFiltroTab("")}
            className="absolute inset-y-0 end-0 flex items-center pe-3 text-muted-foreground/60 hover:text-destructive transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-auto scrollbar-gray">
        <table className="modal-table">
          <thead className="sticky top-0 z-10">
            <tr>
              <th className="py-2 px-3 text-[10px] uppercase tracking-wider font-bold">
                Campo
              </th>
              <th className="py-2 px-3 text-[10px] uppercase tracking-wider font-bold text-right">
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {columnasFiltradas.length === 0 ? (
              <tr>
                <td
                  colSpan="2"
                  className="py-8 text-center text-muted-foreground italic text-xs"
                >
                  {filtroTab
                    ? "No se encontraron coincidencias"
                    : "No hay columnas agregadas"}
                </td>
              </tr>
            ) : (
              columnasFiltradas.map((columna) => (
                <tr
                  key={columna.id}
                  className="hover:bg-surface-secondary/50 transition-colors"
                >
                  <td className="py-1 px-3 text-xs font-semibold text-foreground max-w-[200px] truncate">
                    {columna.nombre}
                  </td>
                  <td className="py-1 px-3 text-right">
                    <IconCircular
                      bgColor="bg-[#EECCC9]"
                      textColor="text-[#C1493E]"
                      borderColor="border-surface"
                      size="size-7"
                      borderWidth="border-0"
                      tooltip="Eliminar"
                      tooltipPlacement="left"
                      onClick={() => eliminarColumna(columna.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="currentColor"
                          d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16H281c13.8 0 26 8.8 30.4 21.9L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96zM32 144h384v304c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64zm88 64c-13.3 0-24 10.7-24 24v192c0 13.3 10.7 24 24 24s24-10.7 24-24V232c0-13.3-10.7-24-24-24m104 0c-13.3 0-24 10.7-24 24v192c0 13.3 10.7 24 24 24s24-10.7 24-24V232c0-13.3-10.7-24-24-24m104 0c-13.3 0-24 10.7-24 24v192c0 13.3 10.7 24 24 24s24-10.7 24-24V232c0-13.3-10.7-24-24-24"
                        />
                      </svg>
                    </IconCircular>
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
