import React, { useState } from "react";
import { IconCustomTable } from "../IconesConsultations";
import ModalSeleccionCampania from "../ModalCamapañas/ModalSeleccionCampania";
import IconCircular from "../../../../../components/iconos/IconCircular";
import ConsultFilter from "../../../../../components/select/ConsultFilter";
import { toast } from "sonner";
import {getCatalogoValueCard} from "../../../../../services/mark/albaz/LokiServices";
const situacionOptions = [
    { value: "Sin información", label: "Sin información" },
  
];

const ModalConsultaCuentasFiltros = ({ onGetSituacionOptions, onGetAllAvailableOptions, idProducto, idCartera, onFiltrosCountChange, isDateEnabled, onFiltrosChange }) => {
    const [campoSeleccionado, setCampoSeleccionado] = useState("");
    const [cuenta, setCuenta] = useState("Cuenta");
    const [selectedConsultFilter, setSelectedConsultFilter] = useState(null);
    const [operador, setOperador] = useState("=");
    const [niegan, setNiegan] = useState("");
    const [filtros, setFiltros] = useState([]);
    const [openSeleccionCampania, setOpenSeleccionCampania] = useState(false);
    const [nieganOptions, setNieganOptions] = useState([]);
  
    const eliminarFiltro = (id) => {
        setFiltros(filtros.filter(filtro => filtro.id !== id));
    };

    const agregarFiltro = () => {
        const campoSeleccionado = selectedConsultFilter ? selectedConsultFilter.label : "";
        
        // Obtener el texto legible del valor seleccionado para "Niegan acreditado"
        let valorMostrar = niegan;
        if (cuenta === "Cuenta" && niegan) {
            const opcionSeleccionada = nieganOptions.find(option => option.idValor === parseInt(niegan));
            if (opcionSeleccionada) {
                valorMostrar = opcionSeleccionada.valor;
            }
        }

        // Verificar si ya existe un filtro con el mismo concepto y campo
        const filtroExistente = filtros.find(
            filtro => filtro.concepto === cuenta && filtro.campo === campoSeleccionado
        );

        if (filtroExistente) {
            // Extraer los operadores ya usados en el filtro existente
            const operadoresUsados = filtroExistente.valores.split(", ").map(v => {
                const match = v.match(/^([=≠><]+)\s*/);
                return match ? match[1] : null;
            }).filter(Boolean);

            // Validación especial para tipo "Cuenta" con operador "="
            if (cuenta === "Cuenta" && operador === "=") {
                // Si ya existe el operador "=" permitir concatenar más valores
                if (operadoresUsados.includes("=")) {
                    // Verificar si el valor ya está en la lista
                    const valoresArray = filtroExistente.valores.split(", ").map(v => v.replace(/^[=≠]\s*/, "").trim());
                    if (valoresArray.includes(valorMostrar.trim())) {
                        toast.warning("Este valor ya fue agregado al filtro");
                        return;
                    }
                    // Concatenar sin el operador (se asume que todos usan "=")
                    setFiltros(prevFiltros => 
                        prevFiltros.map(filtro => 
                            filtro.id === filtroExistente.id
                                ? { 
                                    ...filtro, 
                                    valores: filtro.valores + ", " + valorMostrar
                                  }
                                : filtro
                        )
                    );
                    return;
                }
                // Si no existe "=" pero existe "≠", no permitir concatenar
                if (operadoresUsados.includes("≠")) {
                    toast.error('No se puede concatenar el operador "=" cuando ya existe "≠". Elimine el filtro o use el mismo operador.');
                    return;
                }
            }

            // Validación especial para tipo "Cuenta" con operador "≠"
            if (cuenta === "Cuenta" && operador === "≠") {
                // Si ya existe el operador "≠" permitir concatenar más valores
                if (operadoresUsados.includes("≠")) {
                    // Verificar si el valor ya está en la lista
                    const valoresArray = filtroExistente.valores.split(", ").map(v => v.replace(/^[=≠]\s*/, "").trim());
                    if (valoresArray.includes(valorMostrar.trim())) {
                        toast.warning("Este valor ya fue agregado al filtro");
                        return;
                    }
                    // Concatenar sin el operador (se asume que todos usan "≠")
                    setFiltros(prevFiltros => 
                        prevFiltros.map(filtro => 
                            filtro.id === filtroExistente.id
                                ? { 
                                    ...filtro, 
                                    valores: filtro.valores + ", " + valorMostrar
                                  }
                                : filtro
                        )
                    );
                    return;
                }
                // Si ya existe el operador "=", no permitir concatenar "≠"
                if (operadoresUsados.includes("=")) {
                    toast.error('No se puede concatenar el operador "≠" cuando ya existe "=". Elimine el filtro o cree uno nuevo.');
                    return;
                }
            }

            // Validación especial para otros tipos de filtro (NO "Cuenta") con operador "="
            if (cuenta !== "Cuenta" && operador === "=") {
                // Si ya existe el operador "=" permitir concatenar más valores
                if (operadoresUsados.includes("=")) {
                    // Verificar si el valor ya está en la lista
                    const valoresArray = filtroExistente.valores.split(", ").map(v => v.replace(/^[=]\s*/, "").trim());
                    if (valoresArray.includes(valorMostrar.trim())) {
                        toast.warning("Este valor ya fue agregado al filtro");
                        return;
                    }
                    // Concatenar con el operador
                    setFiltros(prevFiltros => 
                        prevFiltros.map(filtro => 
                            filtro.id === filtroExistente.id
                                ? { 
                                    ...filtro, 
                                    valores: filtro.valores + ", " + operador + " " + valorMostrar
                                  }
                                : filtro
                        )
                    );
                    return;
                }
                // Si existe cualquier otro operador, no permitir concatenar "="
                if (operadoresUsados.length > 0 && !operadoresUsados.includes("=")) {
                    toast.error('No se puede concatenar el operador "=" con otros operadores. Elimine el filtro o cree uno nuevo.');
                    return;
                }
            }

            // Validación especial para otros tipos de filtro (NO "Cuenta") con operador "≠"
            if (cuenta !== "Cuenta" && operador === "≠") {
                // Si ya existe el operador "=", no permitir concatenar "≠"
                if (operadoresUsados.includes("=")) {
                    toast.error('No se puede concatenar el operador "≠" con "=". Solo se permite concatenar múltiples valores con el operador "=".');
                    return;
                }
                // Si ya existe "≠", permitir concatenar más valores con "≠"
                if (operadoresUsados.includes("≠")) {
                    // Verificar si el valor ya está en la lista
                    const valoresArray = filtroExistente.valores.split(", ").map(v => v.replace(/^[≠]\s*/, "").trim());
                    if (valoresArray.includes(valorMostrar.trim())) {
                        toast.warning("Este valor ya fue agregado al filtro");
                        return;
                    }
                    // Concatenar con el operador
                    setFiltros(prevFiltros => 
                        prevFiltros.map(filtro => 
                            filtro.id === filtroExistente.id
                                ? { 
                                    ...filtro, 
                                    valores: filtro.valores + ", " + operador + " " + valorMostrar
                                  }
                                : filtro
                        )
                    );
                    return;
                }
                // Si "≠" NO existe pero hay otros operadores de comparación, permitir agregar "≠"
                // (caso: >= 12, <= 12 -> agregar ≠ 12 ✅)
            }

            // Validación especial: Si el PRIMER operador fue "≠", no permitir agregar operadores de comparación
            if (cuenta !== "Cuenta" && operadoresUsados.length > 0) {
                // Obtener el primer operador usado
                const primerOperador = filtroExistente.operador.split(',')[0];
                
                // Si el primer operador fue "≠" y el actual es de comparación, no permitir
                if (primerOperador === "≠") {
                    const operadoresComparacion = ['<', '>', '<=', '>='];
                    if (operadoresComparacion.includes(operador)) {
                        toast.error('No se puede concatenar el operador "' + operador + '" cuando el primer operador fue "≠". Solo se permite concatenar múltiples "≠".');
                        return;
                    }
                }
            }

            // Validar si el operador actual ya fue usado (excepto para "=" y "≠" en filtros no-Cuenta que acabamos de manejar)
            if (operadoresUsados.includes(operador) && !(cuenta !== "Cuenta" && (operador === "=" || operador === "≠"))) {
                toast.error(`No se puede concatenar el mismo operador "${operador}" dos veces. Seleccione un operador diferente.`);
                return;
            }

            // Definir las reglas de operadores complementarios
            const operadoresComplementarios = {
                '<': ['>', '>=', '≠'],
                '>': ['<', '<=', '≠'],
                '<=': ['>', '>=', '≠'],
                '>=': ['<', '<=', '≠'],
                '=': ['≠'],
                '≠': ['=', '<', '>', '<=', '>=']
            };

            // Validar compatibilidad de operadores
            for (const opUsado of operadoresUsados) {
                const permitidos = operadoresComplementarios[opUsado];
                if (permitidos && !permitidos.includes(operador)) {
                    toast.error(`No se puede usar el operador "${operador}" con "${opUsado}". Solo se permite: ${permitidos.join(', ')}`);
                    return;
                }
            }

            // Verificar si el valor ya está en la lista
            const valoresConOperador = filtroExistente.valores.split(", ");
            const valorDuplicado = valoresConOperador.some(v => {
                const match = v.match(/^([=≠><]+)\s*(.+)$/);
                if (match) {
                    const [, opExistente, valExistente] = match;
                    // Solo validar duplicados para operadores de igualdad (= y ≠)
                    // Para operadores de comparación (<, >, <=, >=) permitir el mismo valor
                    if ((opExistente === '=' || opExistente === '≠') && opExistente === operador && valExistente.trim() === valorMostrar.trim()) {
                        return true;
                    }
                }
                return false;
            });

            if (valorDuplicado) {
                toast.warning("Este valor con el mismo operador ya fue agregado al filtro");
                return;
            }
            
            // Concatenar el nuevo valor con su operador
            setFiltros(prevFiltros => 
                prevFiltros.map(filtro => 
                    filtro.id === filtroExistente.id
                        ? { 
                            ...filtro, 
                            valores: filtro.valores + ", " + operador + valorMostrar,
                            operador: filtro.operador + "," + operador // Guardar múltiples operadores
                          }
                        : filtro
                )
            );
        } else {
            // Crear un nuevo filtro
            const nuevoFiltro = {
                id: Date.now(),
                concepto: cuenta,
                campo: campoSeleccionado,
                valores: operador + valorMostrar,
                operador: operador
            };
            setFiltros(prevFiltros => [...prevFiltros, nuevoFiltro]);
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
                        const filteredOptions = catalogData.filter(item => item.idCatálogo === 2);
                        setNieganOptions(filteredOptions);
                        // Seleccionar automáticamente el primer valor
                        if (filteredOptions.length > 0) {
                            setNiegan(filteredOptions[0].idValor.toString());
                        }
                    }
                } catch (error) {
                    console.error("Error al cargar opciones de Niegan acreditado:", error);
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
        <div
          className="bg-white rounded-lg p-3 h-auto lg:h-[400px] flex flex-col"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2 flex-shrink-0">
            <IconCircular
              bgColor="bg-iconCircular"
              textColor="text-jerarquia3"
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

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <input
                type="date"
                className="bg-gray-50 py-2.5 sm:py-2 px-4 block w-full sm:w-auto border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="This is placeholder"
                disabled={!isDateEnabled}
              />
              <div className="flex flex-row items-center gap-2 w-full sm:w-auto">
                <button className="btn-success flex-1 sm:flex-none">
                  Exportar
                  <span className="material-icons text-base align-middle"></span>
                </button>
                <button className="btn-info flex-1 sm:flex-none" onClick={agregarFiltro}>
                  Agregar
                </button>
                <button className="btn-success flex-1 sm:flex-none">
                  Consultar
                  <span className="material-icons text-base align-middle"></span>
                </button>
                {/* Tooltip agregado aquí */}
                <span className="hs-tooltip [--placement:top] inline-flex justify-center items-center size-7 rounded-lg bg-iconCircular flex-shrink-0">
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
              <select
                className="peer p-4 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none
                            focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 font-bold"
                value={operador}
                onChange={(e) => setOperador(e.target.value)}
                id="operador-select"
              >
                {cuenta === "Cuenta" ? (
                  <>
                    <option value="=" className="font-bold">
                      =
                    </option>
                    <option value="≠" className="font-bold">
                      ≠
                    </option>
                  </>
                ) : (
                  <>
                    <option value=">" className="font-bold">
                      &gt; Mayor
                    </option>
                    <option value="<" className="font-bold">
                      &lt; Menor
                    </option>
                    <option value=">=" className="font-bold">
                      &gt;= Mayor o igual
                    </option>
                    <option value="<=" className="font-bold">
                      &lt;= Menor o igual
                    </option>
                    <option value="=" className="font-bold">
                      = Igual
                    </option>
                    <option value="≠" className="font-bold">
                      ≠ Diferente
                    </option>
                  </>
                )}
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
            {/* Campo de valor - Input o Select según el caso */}
            {cuenta === "Cuenta" && (
              <div className="relative flex-1">
                {campoSeleccionado === "RFC" ? (
                  // Input de texto para RFC
                  <div className="relative flex-1">
                    <input
                      type="text"
                      className="peer p-4 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none
                                focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2"
                      value={niegan}
                      onChange={(e) => setNiegan(e.target.value)}
                      id="rfc-input"
                      placeholder=" "
                      maxLength={13}
                    />
                    <label
                      htmlFor="rfc-input"
                      className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                                peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
                                peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                      Ingresa el RFC
                    </label>
                  </div>
                ) : (
                  // Select para otros campos de Cuenta
                  <>
                    <select
                      className="peer p-4 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none
                                focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                      value={niegan}
                      onChange={(e) => setNiegan(e.target.value)}
                      id="niegan-select"
                      disabled={nieganOptions.length === 0}
                    >
                      {nieganOptions.map((option) => (
                        <option key={option.idValor} value={option.idValor}>
                          {option.valor}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor="niegan-select"
                      className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                                peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
                                peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                      Campo
                    </label>
                  </>
                )}
              </div>
            )}
            {/* Input de texto/fecha para otros filtros */}
            {cuenta !== "Cuenta" && (
              <div className="relative flex-1">
                <input
                  type={cuenta === "Fechas" ? "date" : "text"}
                  className="peer p-4 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none
                              focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2"
                  value={niegan}
                  onChange={(e) => setNiegan(e.target.value)}
                  id="valores-input"
                  placeholder=" "
                />
                <label
                  htmlFor="valores-input"
                  className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                              peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500
                              peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
                >
                  {cuenta === "Fechas" ? "Fecha" : "Ingresa un valor"}
                </label>
              </div>
            )}
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
                  <th>Concepto</th>
                  <th>Campo</th>
                  <th>Valores</th>
                  <th>Borrar</th>
                </tr>
              </thead>
              <tbody>
                {filtros.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
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
                      <td>{filtro.concepto}</td>
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