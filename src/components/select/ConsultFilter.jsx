import React, { useState, useEffect, useCallback, useRef } from "react";
import { getColumsProduct } from "../../services/mark/Orochi/LokiServices";
import { chargueCatalog } from "../../services/mark/Orochi/LokiServices";
import FloatingSelect from "./FloatingSelect";
const ConsultFilter = ({
  options = [],
  label = "Seleccione",
  onSelectionChange,
  onAllOptionsLoaded, // Nueva prop para enviar todas las opciones cargadas
  defaultValue = "",
  id = "consult-filter-select",
  filterType = "", // Nueva prop para identificar qué tipo de filtro es
  idProducto = null, // ID del producto para la consulta
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [dynamicOptions, setDynamicOptions] = useState(options);
  const [isLoading, setIsLoading] = useState(false);
  const previousOptionsRef = useRef([]);

  // Función para cargar opciones dinámicas según el tipo de filtro
  const loadDynamicOptions = useCallback(
    async (filterValue) => {
      setIsLoading(true);

      try {
        switch (filterValue) {
          case "Producto": {
            // Producto
            const productData = await getColumsProduct({
              params: {
                servidor: "Orochi",
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
            // Cuenta
            const catalogDataCuenta = await chargueCatalog({
              params: {
                servidor: "Orochi",
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
            // Conteos
            const catalogDataConteos = await chargueCatalog({
              params: {
                servidor: "Orochi",
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
            // Fechas
            const catalogDataFechas = await chargueCatalog({
              params: {
                servidor: "Orochi",
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
    [options, idProducto],
  );

  // Efecto para cargar opciones cuando cambia el filterType
  useEffect(() => {
    if (filterType) {
      loadDynamicOptions(filterType);
    } else {
      // Cargar por defecto las opciones de "Cuenta" cuando no hay filterType
      loadDynamicOptions("Cuenta");
    }
  }, [filterType, loadDynamicOptions, options]);

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
        const firstOption = dynamicOptions[0];
        setSelectedValue(firstOption.value);

        // Notificar la selección de la primera opción
        if (onSelectionChange) {
          onSelectionChange(firstOption);
        }
      }

      // Notificar todas las opciones cargadas (esto sí se hace siempre)
      if (onAllOptionsLoaded) {
        onAllOptionsLoaded(dynamicOptions);
      }
    }
  }, [dynamicOptions, onAllOptionsLoaded, onSelectionChange]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);

    // Enviar el objeto completo de la opción seleccionada
    if (onSelectionChange) {
      const selectedOption = dynamicOptions.find(
        (option) => option.value === value,
      );
      onSelectionChange(selectedOption);
    }
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
