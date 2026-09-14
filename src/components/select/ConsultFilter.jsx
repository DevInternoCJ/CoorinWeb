import React, { useState, useEffect, useCallback, useRef } from "react";
import { getColumsProduct } from "../../services/mark/orochi/LokiServices";
import { chargueCatalog } from "../../services/mark/orochi/LokiServices";
import FloatingSelect from "./FloatingSelect";
import { useCatalogStore } from "../../contextGlobal/catalogStore";
import { ACTIVE_SERVER } from "../../config/backend";
const EMPTY_OPTIONS = [];
const ConsultFilter = ({
  options = EMPTY_OPTIONS,
  label = "Seleccione",
  onSelectionChange,
  onAllOptionsLoaded, // Nueva prop para enviar todas las opciones cargadas
  defaultValue = "",
  id = "consult-filter-select",
  filterType = "", // Nueva prop para identificar qué tipo de filtro es
  idProducto = null, // ID del producto para la consulta
  idCartera = null,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [dynamicOptions, setDynamicOptions] = useState(options);
  const [isLoading, setIsLoading] = useState(false);
  const consultasCatalogo = useCatalogStore((state) => state.consultas);
  const previousOptionsRef = useRef([]);
  const onSelectionChangeRef = useRef(onSelectionChange);
  const onAllOptionsLoadedRef = useRef(onAllOptionsLoaded);

  useEffect(() => {
    onSelectionChangeRef.current = onSelectionChange;
    onAllOptionsLoadedRef.current = onAllOptionsLoaded;
  }, [onSelectionChange, onAllOptionsLoaded]);

  // Función para cargar opciones dinámicas según el tipo de filtro
  const loadDynamicOptions = useCallback(
    async (filterValue) => {
      setIsLoading(true);

      try {
        if (options.length > 0 && ["Cuenta", "Conteos", "Fechas"].includes(filterValue)) {
          setDynamicOptions(options);
          return;
        }
        switch (filterValue) {
          case "Producto": {
            // Producto
            const productData = await getColumsProduct({
              params: {
                servidor: ACTIVE_SERVER,
                idProducto: idProducto,
              },
            });

            // Mapear la respuesta al formato esperado
            // La respuesta es un array de strings directamente
            if (productData && Array.isArray(productData)) {
              const mappedOptions = productData.map((item) => ({
                value: item,
                label: item,
                concepto: "Producto", // Agregar el concepto
              }));
              setDynamicOptions(mappedOptions);
            }
            break;
          }

          case "Cuenta": {
            if (consultasCatalogo.length) {
              setDynamicOptions(consultasCatalogo.filter((item) => item.detalle === "Cuenta").map((item) => ({ value: item.valor, label: item.valor, concepto: "Cuenta" })));
              break;
            }
            // Cuenta
            const catalogDataCuenta = await chargueCatalog({
              params: {
                servidor: ACTIVE_SERVER,
              },
            });

            if (
              catalogDataCuenta &&
              catalogDataCuenta.catalogosConsultas &&
              Array.isArray(catalogDataCuenta.catalogosConsultas)
            ) {
              // Filtrar solo los elementos con detalle "Cuenta"
              const cuentaOptions = catalogDataCuenta.catalogosConsultas
                .filter((item) => item.detalle === "Cuenta")
                .map((item) => ({
                  value: item.valor,
                  label: item.valor,
                  concepto: "Cuenta", // Agregar el concepto
                }));
              setDynamicOptions(cuentaOptions);
            } else {
              setDynamicOptions(options);
            }
            break;
          }

          case "Conteos": {
            if (consultasCatalogo.length) {
              setDynamicOptions(consultasCatalogo.filter((item) => item.detalle === "Conteos").map((item) => ({ value: item.valor, label: item.valor, concepto: "Conteos" })));
              break;
            }
            // Conteos
            const catalogDataConteos = await chargueCatalog({
              params: {
                servidor: ACTIVE_SERVER,
              },
            });

            if (
              catalogDataConteos &&
              catalogDataConteos.catalogosConsultas &&
              Array.isArray(catalogDataConteos.catalogosConsultas)
            ) {
              // Filtrar solo los elementos con detalle "Conteos"
              const conteosOptions = catalogDataConteos.catalogosConsultas
                .filter((item) => item.detalle === "Conteos")
                .map((item) => ({
                  value: item.valor,
                  label: item.valor,
                  concepto: "Conteos", // Agregar el concepto
                }));
              setDynamicOptions(conteosOptions);
            } else {
              setDynamicOptions(options);
            }
            break;
          }

          case "Fechas": {
            if (consultasCatalogo.length) {
              setDynamicOptions(consultasCatalogo.filter((item) => item.detalle === "Fechas").map((item) => ({ value: item.valor, label: item.valor, concepto: "Fechas" })));
              break;
            }
            // Fechas
            const catalogDataFechas = await chargueCatalog({
              params: {
                servidor: ACTIVE_SERVER,
              },
            });
            if (
              catalogDataFechas &&
              catalogDataFechas.catalogosConsultas &&
              Array.isArray(catalogDataFechas.catalogosConsultas)
            ) {
              // Filtrar solo los elementos con detalle "Fechas"
              const fechasOptions = catalogDataFechas.catalogosConsultas
                .filter((item) => item.detalle === "Fechas")
                .map((item) => ({
                  value: item.valor,
                  label: item.valor,
                  concepto: "Fechas", // Agregar el concepto
                }));
              setDynamicOptions(fechasOptions);
            } else {
              setDynamicOptions(options);
            }
            break;
          }

          default:
            setDynamicOptions(options);
            break;
        }
      } catch (error) {
        console.error("Error al cargar opciones dinámicas:", error);
        setDynamicOptions(options); // Usar opciones por defecto en caso de error
      } finally {
        setIsLoading(false);
      }
    },
    [options, idProducto, idCartera, consultasCatalogo],
  );

  // Efecto para cargar opciones cuando cambia el filterType
  useEffect(() => {
    if (filterType) {
      loadDynamicOptions(filterType);
    } else {
      // Cargar por defecto las opciones de "Cuenta" cuando no hay filterType
      loadDynamicOptions("Cuenta");
    }
  }, [filterType, loadDynamicOptions]);

  // Notificar cuando las opciones se carguen y seleccionar la primera opción
  useEffect(() => {
    if (dynamicOptions.length > 0) {
      // Verificar si las opciones realmente cambiaron comparando con las anteriores
      const optionsChanged =
        JSON.stringify(previousOptionsRef.current) !==
        JSON.stringify(dynamicOptions);

      if (optionsChanged) {
        // Actualizar la referencia con las nuevas opciones
        previousOptionsRef.current = dynamicOptions;

        // Seleccionar automáticamente la primera opción solo cuando las opciones cambien
        const preferredOption = defaultValue && dynamicOptions.find((option) => String(option.value) === String(defaultValue));
        const firstOption = preferredOption || dynamicOptions[0];
        setSelectedValue(firstOption.value);

        // Notificar la selección de la primera opción
        onSelectionChangeRef.current?.(firstOption);
      }

      // Notificar todas las opciones cargadas (esto sí se hace siempre)
      onAllOptionsLoadedRef.current?.(dynamicOptions);
    } else {
      previousOptionsRef.current = [];
      setSelectedValue("");
      onAllOptionsLoadedRef.current?.([]);
    }
  }, [dynamicOptions, defaultValue]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);

    // Enviar el objeto completo de la opción seleccionada
    const selectedOption = dynamicOptions.find(
      (option) => String(option.value) === String(value),
    );
    onSelectionChangeRef.current?.(selectedOption);
  };

  return (
    <div className="flex-1">
      <FloatingSelect
        id={id}
        label={label}
        value={selectedValue}
        onChange={handleChange}
        disabled={isLoading}
        placeholder={isLoading ? "Cargando…" : "Seleccionar…"}
        options={dynamicOptions}
      />
    </div>
  );
};

export default ConsultFilter;
