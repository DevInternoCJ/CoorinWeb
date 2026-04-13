import React, { useState } from "react";
import { IconCustomTable } from "../IconesConsultations";
import ModalSeleccionCampania from "../ModalCamapañas/ModalSeleccionCampania";
import IconCircular from "../../../../../components/Iconos/IconCircular";
import ConsultFilter from "../../../../../components/Select/ConsultFilter";
import { toast } from "sonner";
import { getCatalogoValueCard } from "../../../../../services/mark/Orochi/LokiServices";
import FloatingSelect from "../../../../../components/Select/FloatingSelect";
import FloatingInput from "../../../../../components/Select/FloatingInput";
const situacionOptions = [
  { value: "Sin información", label: "Sin información" },
];

const ModalConsultaCuentasFiltros = ({
  onGetSituacionOptions,
  onGetAllAvailableOptions,
  idProducto,
  idCartera,
  onFiltrosCountChange,
  isDateEnabled,
  onFiltrosChange,
}) => {
  const [campoSeleccionado, setCampoSeleccionado] = useState("");
  const [cuenta, setCuenta] = useState("Cuenta");
  const [selectedConsultFilter, setSelectedConsultFilter] = useState(null);
  const [operador, setOperador] = useState("=");
  const [niegan, setNiegan] = useState("");
  const [filtros, setFiltros] = useState([]);
  const [openSeleccionCampania, setOpenSeleccionCampania] = useState(false);
  const [nieganOptions, setNieganOptions] = useState([]);

  const eliminarFiltro = (id) => {
    setFiltros(filtros.filter((filtro) => filtro.id !== id));
  };

  const agregarFiltro = () => {
    const campoSeleccionado = selectedConsultFilter
      ? selectedConsultFilter.label
      : "";

    // Obtener el texto legible del valor seleccionado para "Niegan acreditado"
    let valorMostrar = niegan;
    if (cuenta === "Cuenta" && niegan) {
      const opcionSeleccionada = nieganOptions.find(
        (option) => option.idValor === parseInt(niegan),
      );
      if (opcionSeleccionada) {
        valorMostrar = opcionSeleccionada.valor;
      }
    }

    // Verificar si ya existe un filtro con el mismo concepto y campo
    const filtroExistente = filtros.find(
      (filtro) =>
        filtro.concepto === cuenta && filtro.campo === campoSeleccionado,
    );

    if (filtroExistente) {
      // Extraer los operadores ya usados en el filtro existente
      const operadoresUsados = filtroExistente.valores
        .split(", ")
        .map((v) => {
          const match = v.match(/^([=≠><]+)\s*/);
          return match ? match[1] : null;
        })
        .filter(Boolean);

      // Validación especial para tipo "Cuenta" con operador "="
      if (cuenta === "Cuenta" && operador === "=") {
        // Si ya existe el operador "=" permitir concatenar más valores
        if (operadoresUsados.includes("=")) {
          // Verificar si el valor ya está en la lista
          const valoresArray = filtroExistente.valores
            .split(", ")
            .map((v) => v.replace(/^[=≠]\s*/, "").trim());
          if (valoresArray.includes(valorMostrar.trim())) {
            toast.warning("Este valor ya fue agregado al filtro");
            return;
          }
          // Concatenar sin el operador (se asume que todos usan "=")
          setFiltros((prevFiltros) =>
            prevFiltros.map((filtro) =>
              filtro.id === filtroExistente.id
                ? {
                    ...filtro,
                    valores: filtro.valores + ", " + valorMostrar,
                  }
                : filtro,
            ),
          );
          return;
        }
        // Si no existe "=" pero existe "≠", no permitir concatenar
        if (operadoresUsados.includes("≠")) {
          toast.error(
            'No se puede concatenar el operador "=" cuando ya existe "≠". Elimine el filtro o use el mismo operador.',
          );
          return;
        }
      }

      // Validación especial para tipo "Cuenta" con operador "≠"
      if (cuenta === "Cuenta" && operador === "≠") {
        // Si ya existe el operador "≠" permitir concatenar más valores
        if (operadoresUsados.includes("≠")) {
          // Verificar si el valor ya está en la lista
          const valoresArray = filtroExistente.valores
            .split(", ")
            .map((v) => v.replace(/^[=≠]\s*/, "").trim());
          if (valoresArray.includes(valorMostrar.trim())) {
            toast.warning("Este valor ya fue agregado al filtro");
            return;
          }
          // Concatenar sin el operador (se asume que todos usan "≠")
          setFiltros((prevFiltros) =>
            prevFiltros.map((filtro) =>
              filtro.id === filtroExistente.id
                ? {
                    ...filtro,
                    valores: filtro.valores + ", " + valorMostrar,
                  }
                : filtro,
            ),
          );
          return;
        }
        // Si ya existe el operador "=", no permitir concatenar "≠"
        if (operadoresUsados.includes("=")) {
          toast.error(
            'No se puede concatenar el operador "≠" cuando ya existe "=". Elimine el filtro o cree uno nuevo.',
          );
          return;
        }
      }

      // Validación especial para otros tipos de filtro (NO "Cuenta") con operador "="
      if (cuenta !== "Cuenta" && operador === "=") {
        // Si ya existe el operador "=" permitir concatenar más valores
        if (operadoresUsados.includes("=")) {
          // Verificar si el valor ya está en la lista
          const valoresArray = filtroExistente.valores
            .split(", ")
            .map((v) => v.replace(/^[=]\s*/, "").trim());
          if (valoresArray.includes(valorMostrar.trim())) {
            toast.warning("Este valor ya fue agregado al filtro");
            return;
          }
          // Concatenar con el operador
          setFiltros((prevFiltros) =>
            prevFiltros.map((filtro) =>
              filtro.id === filtroExistente.id
                ? {
                    ...filtro,
                    valores:
                      filtro.valores + ", " + operador + " " + valorMostrar,
                  }
                : filtro,
            ),
          );
          return;
        }
        // Si existe cualquier otro operador, no permitir concatenar "="
        if (operadoresUsados.length > 0 && !operadoresUsados.includes("=")) {
          toast.error(
            'No se puede concatenar el operador "=" con otros operadores. Elimine el filtro o cree uno nuevo.',
          );
          return;
        }
      }

      // Validación especial para otros tipos de filtro (NO "Cuenta") con operador "≠"
      if (cuenta !== "Cuenta" && operador === "≠") {
        // Si ya existe el operador "=", no permitir concatenar "≠"
        if (operadoresUsados.includes("=")) {
          toast.error(
            'No se puede concatenar el operador "≠" con "=". Solo se permite concatenar múltiples valores con el operador "=".',
          );
          return;
        }
        // Si ya existe "≠", permitir concatenar más valores con "≠"
        if (operadoresUsados.includes("≠")) {
          // Verificar si el valor ya está en la lista
          const valoresArray = filtroExistente.valores
            .split(", ")
            .map((v) => v.replace(/^[≠]\s*/, "").trim());
          if (valoresArray.includes(valorMostrar.trim())) {
            toast.warning("Este valor ya fue agregado al filtro");
            return;
          }
          // Concatenar con el operador
          setFiltros((prevFiltros) =>
            prevFiltros.map((filtro) =>
              filtro.id === filtroExistente.id
                ? {
                    ...filtro,
                    valores:
                      filtro.valores + ", " + operador + " " + valorMostrar,
                  }
                : filtro,
            ),
          );
          return;
        }
        // Si "≠" NO existe pero hay otros operadores de comparación, permitir agregar "≠"
        // (caso: >= 12, <= 12 -> agregar ≠ 12 )
      }

      // Validación especial: Si el PRIMER operador fue "≠", no permitir agregar operadores de comparación
      if (cuenta !== "Cuenta" && operadoresUsados.length > 0) {
        // Obtener el primer operador usado
        const primerOperador = filtroExistente.operador.split(",")[0];

        // Si el primer operador fue "≠" y el actual es de comparación, no permitir
        if (primerOperador === "≠") {
          const operadoresComparacion = ["<", ">", "<=", ">="];
          if (operadoresComparacion.includes(operador)) {
            toast.error(
              'No se puede concatenar el operador "' +
                operador +
                '" cuando el primer operador fue "≠". Solo se permite concatenar múltiples "≠".',
            );
            return;
          }
        }
      }

      // Validar si el operador actual ya fue usado (excepto para "=" y "≠" en filtros no-Cuenta que acabamos de manejar)
      if (
        operadoresUsados.includes(operador) &&
        !(cuenta !== "Cuenta" && (operador === "=" || operador === "≠"))
      ) {
        toast.error(
          `No se puede concatenar el mismo operador "${operador}" dos veces. Seleccione un operador diferente.`,
        );
        return;
      }

      // Definir las reglas de operadores complementarios
      const operadoresComplementarios = {
        "<": [">", ">=", "≠"],
        ">": ["<", "<=", "≠"],
        "<=": [">", ">=", "≠"],
        ">=": ["<", "<=", "≠"],
        "=": ["≠"],
        "≠": ["=", "<", ">", "<=", ">="],
      };

      // Validar compatibilidad de operadores
      for (const opUsado of operadoresUsados) {
        const permitidos = operadoresComplementarios[opUsado];
        if (permitidos && !permitidos.includes(operador)) {
          toast.error(
            `No se puede usar el operador "${operador}" con "${opUsado}". Solo se permite: ${permitidos.join(
              ", ",
            )}`,
          );
          return;
        }
      }

      // Verificar si el valor ya está en la lista
      const valoresConOperador = filtroExistente.valores.split(", ");
      const valorDuplicado = valoresConOperador.some((v) => {
        const match = v.match(/^([=≠><]+)\s*(.+)$/);
        if (match) {
          const [, opExistente, valExistente] = match;
          // Solo validar duplicados para operadores de igualdad (= y ≠)
          // Para operadores de comparación (<, >, <=, >=) permitir el mismo valor
          if (
            (opExistente === "=" || opExistente === "≠") &&
            opExistente === operador &&
            valExistente.trim() === valorMostrar.trim()
          ) {
            return true;
          }
        }
        return false;
      });

      if (valorDuplicado) {
        toast.warning(
          "Este valor con el mismo operador ya fue agregado al filtro",
        );
        return;
      }

      // Concatenar el nuevo valor con su operador
      setFiltros((prevFiltros) =>
        prevFiltros.map((filtro) =>
          filtro.id === filtroExistente.id
            ? {
                ...filtro,
                valores: filtro.valores + ", " + operador + valorMostrar,
                operador: filtro.operador + "," + operador, // Guardar múltiples operadores
              }
            : filtro,
        ),
      );
    } else {
      // Crear un nuevo filtro
      const nuevoFiltro = {
        id: Date.now(),
        concepto: cuenta,
        campo: campoSeleccionado,
        valores: operador + valorMostrar,
        operador: operador,
      };
      setFiltros((prevFiltros) => [...prevFiltros, nuevoFiltro]);
    }
  };

  // Actualizar la opción seleccionada para el componente de columnas
  React.useEffect(() => {
    if (onGetSituacionOptions && selectedConsultFilter) {
      // La opción ya viene con el concepto desde ConsultFilter
      onGetSituacionOptions([selectedConsultFilter]);
    }
  }, [selectedConsultFilter, onGetSituacionOptions]);

  // Limpiar la selección cuando cambie el tipo de filtro
  React.useEffect(() => {
    setSelectedConsultFilter(null);
    setCampoSeleccionado("");
    setNiegan("");
    if (onGetSituacionOptions) {
      onGetSituacionOptions([]);
    }
    // Actualizar el operador según el tipo de filtro
    if (cuenta === "Cuenta") {
      setOperador("=");
    } else {
      setOperador(">");
    }
  }, [cuenta, onGetSituacionOptions]);

  // Cargar opciones de "Niegan acreditado" cuando se seleccione "Cuenta"
  React.useEffect(() => {
    const loadNieganOptions = async () => {
      if (cuenta === "Cuenta") {
        try {
          const catalogData = await getCatalogoValueCard();
          if (catalogData && Array.isArray(catalogData)) {
            // Filtrar solo los que tienen idCatálogo === 2
            const filteredOptions = catalogData.filter(
              (item) => item.idCatálogo === 2,
            );
            setNieganOptions(filteredOptions);
            // Seleccionar automáticamente el primer valor
            if (filteredOptions.length > 0) {
              setNiegan(filteredOptions[0].idValor.toString());
            }
          }
        } catch (error) {
          console.error(
            "Error al cargar opciones de Niegan acreditado:",
            error,
          );
          setNieganOptions([]);
        }
      } else {
        // Limpiar opciones si no es "Cuenta"
        setNieganOptions([]);
        setNiegan("");
      }
    };

    loadNieganOptions();
  }, [cuenta]);

  // Notificar cambios en el conteo de filtros
  React.useEffect(() => {
    if (onFiltrosCountChange) {
      onFiltrosCountChange(filtros.length);
    }
    // Notificar cambios en los filtros
    if (onFiltrosChange) {
      onFiltrosChange(filtros);
    }
  }, [filtros.length, onFiltrosCountChange, onFiltrosChange, filtros]);

  return (
    <>
      <div className="bg-surface rounded-lg p-3 h-auto min-h-[400px] flex flex-col">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 flex-shrink-0">
          <IconCircular
            bgColor="bg-iconCircular dark:bg-iconCircularDark"
            textColor="text-jerarquia3"
            borderColor="border-surface"
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

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <input
              type="date"
              className="bg-surface-secondary py-2.5 sm:py-2 px-4 block w-full sm:w-auto border-border rounded-lg text-sm focus:border-jerarquia1 focus:ring-jerarquia1 disabled:opacity-50 disabled:pointer-events-none text-foreground"
              disabled={!isDateEnabled}
            />
            <div className="flex flex-row items-center gap-2 w-full sm:w-auto">
              <button className="btn-success flex-1 sm:flex-none">
                Exportar
                <span className="material-icons text-base align-middle"></span>
              </button>
              <button
                className="btn-info flex-1 sm:flex-none"
                onClick={agregarFiltro}
              >
                Agregar
              </button>

              {/* Tooltip agregado aquí */}
              <span className="hs-tooltip [--placement:top] inline-flex justify-center items-center size-8 rounded-lg bg-surface-secondary flex-shrink-0">
                <IconCustomTable
                  className="size-5 cursor-pointer text-jerarquia3"
                  onClick={() => setOpenSeleccionCampania(true)}
                />
                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-inverse text-foreground-inverse text-[10px] font-medium rounded-md shadow-sm whitespace-nowrap"
                  role="tooltip"
                >
                  Cargar filas de trabajo
                </span>
              </span>
            </div>
          </div>
        </div>
        {/* Selects en columnas y responsivo */}
        <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-2 w-full">
          {/* Cuenta */}
          <div className="relative flex-1">
            <FloatingSelect
              id="cuenta-select"
              label="Cuenta"
              value={cuenta}
              onChange={(e) => setCuenta(e.target.value)}
              required
              options={[
                { value: "Cuenta", label: "Cuenta" },
                { value: "Producto", label: "Producto" },
              ]}
            />
          </div>
          {/* Situación - Usando ConsultFilter */}
          <ConsultFilter
            options={situacionOptions}
            label="Seleccione"
            defaultValue=""
            onSelectionChange={(selectedOption) => {
              if (selectedOption) {
                setSelectedConsultFilter(selectedOption);
                setCampoSeleccionado(selectedOption.label || "");
              }
            }}
            onAllOptionsLoaded={(allOptions) => {
              if (onGetAllAvailableOptions) {
                onGetAllAvailableOptions(allOptions);
              }
            }}
            id="situacion-select"
            filterType={cuenta}
            idProducto={idProducto}
            idCartera={idCartera}
          />
          {/* Operador */}
          <div className="relative flex-1">
            <FloatingSelect
              id="operador-select"
              label="Operador"
              value={operador}
              onChange={(e) => setOperador(e.target.value)}
              required
              options={[
                { value: "=", label: "=" },
                { value: "≠", label: "≠" },
                { value: ">", label: ">" },
                { value: "<", label: "<" },
                { value: ">=", label: ">=" },
                { value: "<=", label: "<=" },
              ]}
            />
          </div>
          {/* Campo de valor - Input o Select según el caso */}
          {cuenta === "Cuenta" && (
            <div className="relative flex-1">
              {campoSeleccionado === "RFC" ? (
                // Input de texto para RFC
                <div className="relative flex-1">
                  <FloatingInput
                    id="rfc-input"
                    label="RFC"
                    value={niegan}
                    onChange={(e) => setNiegan(e.target.value)}
                    required
                    type="text"
                    maxLength={13}
                  />
                </div>
              ) : (
                // Select para otros campos de Cuenta
                <>
                  <FloatingSelect
                    id="niegan-select"
                    label="Niegan"
                    value={niegan}
                    onChange={(e) => setNiegan(e.target.value)}
                    required
                    options={nieganOptions}
                  />
                </>
              )}
            </div>
          )}
          {/* Input de texto/fecha para otros filtros */}
          {cuenta !== "Cuenta" && (
            <div className="relative flex-1">
              <FloatingInput
                id="valores-input"
                label={cuenta === "Fechas" ? "Fecha" : "Ingresa un valor"}
                value={niegan}
                onChange={(e) => setNiegan(e.target.value)}
                required
                type={cuenta === "Fechas" ? "date" : "text"}
              />
            </div>
          )}
        </div>

        <div
          className="flex-1 overflow-y-auto overflow-x-auto scrollbar-gray h-[150px]"
          style={{ minHeight: 0 }}
        >
          <table className="modal-table">
            <thead className="sticky top-0 z-10">
              <tr>
                <th className="py-2 px-3 text-xs uppercase tracking-wider">Concepto</th>
                <th className="py-2 px-3 text-xs uppercase tracking-wider">Campo</th>
                <th className="py-2 px-3 text-xs uppercase tracking-wider">Valores</th>
                <th className="py-2 px-3 text-xs uppercase tracking-wider text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtros.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="py-8 text-center text-muted-foreground italic text-xs"
                  >
                    No hay filtros agregados
                  </td>
                </tr>
              ) : (
                filtros.map((filtro) => (
                  <tr key={filtro.id} className="hover:bg-surface-secondary/50 transition-colors">
                    <td className="py-1 px-3 text-sm text-foreground">{filtro.concepto}</td>
                    <td className="py-1 px-3 text-sm text-foreground">{filtro.campo}</td>
                    <td className="py-1 px-3 text-sm text-foreground font-medium">{filtro.valores}</td>
                    <td className="py-1 px-3 text-right">
                      <IconCircular
                        bgColor="bg-btn-danger-bg"
                        textColor="text-btn-danger-text"
                        borderColor="border-transparent"
                        size="size-7"
                        borderWidth="border-0"
                        tooltip="Eliminar"
                        tooltipPlacement="left"
                        onClick={() => eliminarFiltro(filtro.id)}
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
