import React, { useMemo, forwardRef, useImperativeHandle } from "react";
import { useEffect, useState } from "react";
import { getCatalogoValueCard } from "../../../../../../services/mark/Orochi/LokiServices";
import { toast } from "sonner";

// Funciones de validación de entrada (del C# AgregaEventosTxtKeyPress)
// Solo letras y espacios (txtOnlyChars_KeyPress)
const filterOnlyChars = (value) =>
  value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, "");

const CapturaVisitsF2 = forwardRef(
  ({ onMapeoChange, filtroExcluirId }, ref) => {
    const [opcionesMapeo, setOpcionesMapeo] = useState([]);
    const [mapeoSeleccionado, setMapeoSeleccionado] = useState("");
    const [mapeoTexto, setMapeoTexto] = useState("");

    // IDs de catálogos del C# LlenaComboBox():
    // 25 - Viviendas, 26 - Habitación, 27 - Económicos
    const ID_CATALOGO_HABITACION = 26;
    const ID_CATALOGO_VIVIENDAS = 25;
    const ID_CATALOGO_ECONOMICOS = 27;

    // Estados para opciones de catálogos dinámicos
    const [opcionesVivienda, setOpcionesVivienda] = useState([]);
    const [opcionesEconomico, setOpcionesEconomico] = useState([]);

    // Estados para los demás campos
    const [fachada, setFachada] = useState("");
    const [puerta, setPuerta] = useState("");
    const [herreria, setHerreria] = useState("");
    const [nivelesPisos, setNivelesPisos] = useState("");
    const [nEconomico, setNEconomico] = useState("");
    const [vivienda, setVivienda] = useState("");
    const [propietario, setPropietario] = useState("");

    // Estados para habilitar/deshabilitar campos
    const [camposHabilitados, setCamposHabilitados] = useState(false);

    // Exponer datos y métodos al padre vía ref
    useImperativeHandle(
      ref,
      () => ({
        getData: () => ({
          idHabitacion: mapeoSeleccionado
            ? parseInt(mapeoSeleccionado, 10)
            : null,
          colorFachada: fachada || null,
          colorPuerta: puerta || null,
          colorHerreria: herreria || null,
          pisos: nivelesPisos ? parseInt(nivelesPisos, 10) : null,
          idEconomico: nEconomico || null,
          idVivienda: vivienda || null,
          nombrePropietario: propietario || null,
        }),
        reset: () => {
          setMapeoSeleccionado("");
          setMapeoTexto("");
          setFachada("");
          setPuerta("");
          setHerreria("");
          setNivelesPisos("");
          setNEconomico("");
          setVivienda("");
          setPropietario("");
          setCamposHabilitados(false);
        },
      }),
      [
        mapeoSeleccionado,
        fachada,
        puerta,
        herreria,
        nivelesPisos,
        nEconomico,
        vivienda,
        propietario,
      ],
    );

    // Filtrar opciones de mapeo excluyendo el ID si está definido (ej: 2805 = Ilocalizable cuando domicilio es "Localizable")
    // En lugar de filtrar, mantenemos todas pero deshabilitamos las excluidas para evitar que el select se resetee
    const opcionesMapeoConFiltro = useMemo(() => {
      return opcionesMapeo.map((opt) => ({
        ...opt,
        disabled: filtroExcluirId ? opt.idValor === filtroExcluirId : false,
      }));
    }, [opcionesMapeo, filtroExcluirId]);

    // Cargar catálogos al montar el componente (del C# LlenaComboBox)
    useEffect(() => {
      getCatalogoValueCard()
        .then((data) => {
          if (!Array.isArray(data)) {
            setOpcionesMapeo([]);
            setOpcionesVivienda([]);
            setOpcionesEconomico([]);
            return;
          }

          // Catálogo 26 - Habitación (Mapeo)
          // Excluir idValor = 2807 según el C#: .Select("idValor <> 2807")
          const mapeoOptions = data.filter(
            (item) =>
              item.idCatálogo === ID_CATALOGO_HABITACION &&
              item.idValor !== 2807,
          );
          setOpcionesMapeo(mapeoOptions);

          // Catálogo 25 - Viviendas
          const viviendaOptions = data.filter(
            (item) => item.idCatálogo === ID_CATALOGO_VIVIENDAS,
          );
          setOpcionesVivienda(viviendaOptions);

          // Catálogo 27 - Económicos
          const economicoOptions = data.filter(
            (item) => item.idCatálogo === ID_CATALOGO_ECONOMICOS,
          );
          setOpcionesEconomico(economicoOptions);
        })
        .catch(() => {
          setOpcionesMapeo([]);
          setOpcionesVivienda([]);
          setOpcionesEconomico([]);
        });
    }, []);

    // Efecto: Cuando cambia Mapeo (Habitación)
    useEffect(() => {
      // Resetear todos los campos dependientes
      setFachada("");
      setPuerta("");
      setHerreria("");
      setNivelesPisos("");
      setNEconomico("");
      setVivienda("");
      setPropietario("");

      if (mapeoTexto === "") {
        // Vacío: deshabilitar campos y mostrar mensaje
        setCamposHabilitados(false);
        if (mapeoSeleccionado !== "") {
          toast.warning("Seleccione una opción de mapeo.");
        }
      } else if (mapeoTexto === "Ilocalizable") {
        // Ilocalizable: deshabilitar todos los campos de vivienda
        setCamposHabilitados(false);
      } else {
        // Cualquier otro valor: habilitar campos
        setCamposHabilitados(true);
      }

      // Notificar al padre el cambio de mapeo para que pueda filtrar contactos/situaciones
      if (onMapeoChange) {
        onMapeoChange(mapeoTexto, mapeoSeleccionado);
      }
    }, [mapeoTexto, mapeoSeleccionado, onMapeoChange]);

    // Handler para cambio de mapeo
    const handleMapeoChange = (e) => {
      const selectedId = e.target.value;

      // Verificar si la opción seleccionada está deshabilitada
      const opcionSeleccionada = opcionesMapeoConFiltro.find(
        (opt) => String(opt.idValor) === String(selectedId),
      );
      if (opcionSeleccionada && opcionSeleccionada.disabled) {
        // Si está deshabilitada, no cambiar la selección
        return;
      }

      console.log(
        "Seleccionando mapeo:",
        selectedId,
        opcionSeleccionada?.valor,
      );
      setMapeoSeleccionado(selectedId);

      // Obtener el texto del mapeo seleccionado
      const opcion = opcionesMapeo.find(
        (opt) => String(opt.idValor) === String(selectedId),
      );
      setMapeoTexto(opcion ? opcion.valor : "");
    };

    // Validaciones y manejadores para Propietario (txtPropietario)
    const handlePropietarioChange = (e) => {
      // Permitir solo letras y espacios, y limitar a 50 caracteres
      const sanitized = filterOnlyChars(e.target.value).slice(0, 50);
      setPropietario(sanitized);
    };

    const handlePropietarioBlur = () => {
      // Recortar espacios al inicio/fin y asegurar máximo 50
      setPropietario((prev) => (prev || "").trim().slice(0, 50));
    };

    const handlePropietarioPaste = (e) => {
      // Interceptar pegado para sanitizar y limitar longitud
      try {
        e.preventDefault();
        const paste = (e.clipboardData || window.clipboardData).getData("text");
        const sanitized = filterOnlyChars(paste).slice(0, 50);
        setPropietario((prev) => ((prev || "") + sanitized).slice(0, 50));
      } catch (err) {
        console.error("Error al pegar en Propietario:", err);
        // En caso de que no haya clipboard disponible, no hacemos nada
      }
    };

    // Opciones de colores para Fachada, Puerta y Herrería (del C# cmbFachada, cmbPuerta, cmbHerreria)
    const coloresOptions = [
      { value: "", label: "" },
      { value: "Amarillo", label: "Amarillo" },
      { value: "Azul", label: "Azul" },
      { value: "Blanco", label: "Blanco" },
      { value: "Café", label: "Café" },
      { value: "Dorado", label: "Dorado" },
      { value: "Gris", label: "Gris" },
      { value: "Lila", label: "Lila" },
      { value: "Morado", label: "Morado" },
      { value: "Naranja", label: "Naranja" },
      { value: "Negro", label: "Negro" },
      { value: "Plata", label: "Plata" },
      { value: "Púrpura", label: "Púrpura" },
      { value: "Rojo", label: "Rojo" },
      { value: "Rosa", label: "Rosa" },
      { value: "Verde", label: "Verde" },
      { value: "Violeta", label: "Violeta" },
      { value: "Otro", label: "Otro" },
    ];

    // Fachada, Puerta y Herrería usan las mismas opciones de colores
    const fachadaOptions = coloresOptions;
    const puertaOptions = coloresOptions;
    const herreriaOptions = coloresOptions;

    const nivelesPisosOptions = [
      { value: "", label: "" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" },
      { value: "6", label: "6" },
      { value: "7", label: "7" },
      { value: "8", label: "8" },
      { value: "9", label: "9" },
      { value: "10", label: "10" },
    ];

    // Los catálogos de Económicos (27) y Viviendas (25) se cargan dinámicamente desde el servidor
    // Ya no necesitamos nEconomicoOptions y viviendaOptions estáticos

    // Clase base para campos habilitados/deshabilitados
    const getSelectClass = (enabled) =>
      `peer p-4 pe-9 block w-full border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 ${
        enabled ? "bg-gray-50" : "bg-gray-200 cursor-not-allowed opacity-60"
      }`;

    const getInputClass = (enabled) =>
      `peer p-4 block w-full border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 placeholder:text-transparent focus:placeholder:text-gray-500 ${
        enabled ? "bg-gray-50" : "bg-gray-200 cursor-not-allowed opacity-60"
      }`;

    return (
      <div className="area-f2 p-2 rounded mb-2">
        <h3 className="font-bold text-sm mb-2">Vivienda – F2</h3>
        <div className="grid grid-cols-2 gap-2">
          {/* Mapeo - siempre habilitado */}
          <div className="relative w-full sm:col-span-2">
            <select
              className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
              id="mapeo-select"
              value={mapeoSeleccionado}
              onChange={handleMapeoChange}
            >
              <option value="" disabled>
                Seleccione mapeo
              </option>
              {opcionesMapeoConFiltro.map((opt) => (
                <option
                  key={opt.idValor}
                  value={opt.idValor}
                  disabled={opt.disabled}
                >
                  {opt.valor}
                </option>
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
              className={getSelectClass(camposHabilitados)}
              id="fachada-select"
              value={fachada}
              onChange={(e) => setFachada(e.target.value)}
              disabled={!camposHabilitados}
            >
              <option value="" disabled>
                Seleccione color fachada
              </option>
              {fachadaOptions.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  hidden={opt.value === ""}
                >
                  {opt.label}
                </option>
              ))}
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
              className={getSelectClass(camposHabilitados)}
              id="puerta-select"
              value={puerta}
              onChange={(e) => setPuerta(e.target.value)}
              disabled={!camposHabilitados}
            >
              <option value="" disabled>
                Seleccione color puerta
              </option>
              {puertaOptions.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  hidden={opt.value === ""}
                >
                  {opt.label}
                </option>
              ))}
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
              className={getSelectClass(camposHabilitados)}
              id="herreria-select"
              value={herreria}
              onChange={(e) => setHerreria(e.target.value)}
              disabled={!camposHabilitados}
            >
              <option value="" disabled>
                Seleccione color herrería
              </option>
              {herreriaOptions.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  hidden={opt.value === ""}
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <label
              htmlFor="herreria-select"
              className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
            >
              Herrería
            </label>
          </div>
          {/* NivelesPisos */}
          <div className="relative w-full sm:col-span-2">
            <select
              className={getSelectClass(camposHabilitados)}
              id="nivelespisos-select"
              value={nivelesPisos}
              onChange={(e) => setNivelesPisos(e.target.value)}
              disabled={!camposHabilitados}
            >
              <option value="" disabled>
                Seleccione niveles
              </option>
              {nivelesPisosOptions.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  hidden={opt.value === ""}
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <label
              htmlFor="nivelespisos-select"
              className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
            >
              NivelesPisos
            </label>
          </div>
          {/* N.Economico - Catálogo 27 */}
          <div className="relative w-full sm:col-span-2">
            <select
              className={getSelectClass(camposHabilitados)}
              id="neconomico-select"
              value={nEconomico}
              onChange={(e) => setNEconomico(e.target.value)}
              disabled={!camposHabilitados}
            >
              <option value="" disabled>
                Seleccione económico
              </option>
              {opcionesEconomico.map((opt) => (
                <option key={opt.idValor} value={opt.idValor}>
                  {opt.valor}
                </option>
              ))}
            </select>
            <label
              htmlFor="neconomico-select"
              className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
            >
              N.Economico
            </label>
          </div>
          {/* Vivienda - Catálogo 25 */}
          <div className="relative w-full sm:col-span-2">
            <select
              className={getSelectClass(camposHabilitados)}
              id="vivienda-select"
              value={vivienda}
              onChange={(e) => setVivienda(e.target.value)}
              disabled={!camposHabilitados}
            >
              <option value="" disabled>
                Seleccione vivienda
              </option>
              {opcionesVivienda.map((opt) => (
                <option key={opt.idValor} value={opt.idValor}>
                  {opt.valor}
                </option>
              ))}
            </select>
            <label
              htmlFor="vivienda-select"
              className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
            >
              Vivienda
            </label>
          </div>
        </div>
        {/* Propietario - input animado (solo letras - txtOnlyChars_KeyPress) */}
        <div className="relative w-full min-w-0 sm:col-span-2 mt-4">
          <input
            type="text"
            id="propietario-input"
            placeholder="Ingrese propietario"
            value={propietario}
            onChange={handlePropietarioChange}
            onBlur={handlePropietarioBlur}
            onPaste={handlePropietarioPaste}
            maxLength={50}
            disabled={!camposHabilitados}
            className={getInputClass(camposHabilitados)}
            style={{ color: "var(--color-jerarquia3)" }}
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
  },
);

export default CapturaVisitsF2;
