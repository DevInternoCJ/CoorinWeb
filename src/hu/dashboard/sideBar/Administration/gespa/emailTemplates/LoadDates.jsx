import React, { useState, useEffect } from "react";
import { PostLoadData } from "../../../../../../services/mark/albaz/LokiServices";

const LoadDates = ({
  selectedProduct,
  isModalOpen,
  onPlantillasChange,
  onDatosDeudorChange,
  onDatosProductoCompletoChange 
}) => {
  const [datosDeudor, setDatosDeudor] = useState({});
  const [datosProductoCompleto, setDatosProductoCompleto] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [draggedLabel, setDraggedLabel] = useState(""); // Estado para el label/header que se está arrastrando

  // Función para resetear todos los estados
  const resetAllData = () => {
    setDatosDeudor({});
    setDatosProductoCompleto({});
    setLoading(true);
    setError(null);
    onDatosDeudorChange({});
    onDatosProductoCompletoChange({});
  };

  // Efecto para detectar cuando el modal se cierra y resetear los datos
  useEffect(() => {
    if (!isModalOpen) {
      resetAllData();
    }
  }, [isModalOpen]);

  const fetchData = async (productId = 1) => {
    try {
      const data = { idCartera: 1, idProducto: productId };
      console.log(
        "Body enviado a PostLoadData:",
        data,
        typeof data,
        Array.isArray(data)
      );

      const response = await PostLoadData(data);

      if (response && response.exito) {
        if (response.plantillas && onPlantillasChange) {
          onPlantillasChange(response.plantillas);
        }
        // Datos del deudor
        if (response.cuenta) {
          const saldoFormateado = response.cuenta.Saldo
            ? `$${response.cuenta.Saldo.toLocaleString()}`
            : "$0.00";
          const nuevosDatosDeudor = {
            NombreDeudor: response.cuenta.NombreDeudor || "",
            RFC: response.cuenta.RFC || "",
            NúmeroCliente: response.cuenta.NúmeroCliente || "",
            Saldo: saldoFormateado,
          };

          setDatosDeudor(nuevosDatosDeudor);
          onDatosDeudorChange(nuevosDatosDeudor);
        }
        // Guardar todos los datos del producto para la vista completa
        setDatosProductoCompleto(response.producto);
        onDatosProductoCompletoChange(response.producto);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Cuando cambia el producto seleccionado, cargar nuevos datos
    if (selectedProduct && selectedProduct.value) {
      setLoading(true);
      fetchData(selectedProduct.value);
    }
  }, [selectedProduct]);

  // ========== FUNCIONES DE DRAG AND DROP ==========
  
  // Cuando comienza el arrastre del label o header
  const handleDragStart = (e, labelText) => {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', `[${labelText}]`);
    setDraggedLabel(labelText);
  };

  // Cuando termina el arrastre
  const handleDragEnd = () => {
    setDraggedLabel('');
  };

  // ===============================================

  // Función para formatear valores vacíos o undefined
  const formatValue = (value, key) => {
    if (key === "Notas") {
      return "Texto Grande";
    }
    if (key === "idCuenta") {
      return value !== null && value !== undefined && value !== ""
        ? String(value)
        : "N/A";
    }
    if (value === null || value === undefined || value === "") {
      return "N/A";
    }
    if (typeof value === "object" && Object.keys(value).length === 0) {
      return "N/A";
    }
    if (
      (typeof value === "number" ||
        (!isNaN(parseFloat(value)) && isFinite(value))) &&
      key !== "idCuenta"
    ) {
      return `$${parseFloat(value).toLocaleString()}`;
    }
    return value;
  };

  // Función para determinar la clase de estilo basada en el valor
  const getValueClass = (value, key) => {
    if (key === "Notas") {
      return "text-red-600 font-semibold";
    }

    if (
      value === null ||
      value === undefined ||
      value === "" ||
      (typeof value === "object" && Object.keys(value).length === 0)
    ) {
      return "text-gray-400 italic";
    }

    if (
      (typeof value === "number" || !isNaN(parseFloat(value))) &&
      key !== "idCuenta"
    ) {
      return "font-mono text-blue-700";
    }
    if (typeof value === "string" && value.match(/\d{2}\/\d{2}\/\d{4}/)) {
      return "text-green-700";
    }

    return "text-gray-800";
  };

  if (loading) return <div className="text-center py-8">Cargando datos...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "NombreDeudor",
              value: datosDeudor.NombreDeudor,
              icon: "user",
              color: "gray",
            },
            {
              label: "RFC",
              value: datosDeudor.RFC,
              icon: "document",
              color: "blue",
            },
            {
              label: "NúmeroCliente",
              value: datosDeudor.NúmeroCliente,
              icon: "id",
              color: "gray",
            },
            {
              label: "Saldo",
              value: datosDeudor.Saldo,
              icon: "currency",
              color: "green",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-background-tertiary p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200"
            >
              {/* Label con drag and drop */}
              <div
                draggable="true"
                onDragStart={(e) => handleDragStart(e, item.label)}
                onDragEnd={handleDragEnd}
                className={`hs-tooltip [--placement:auto] inline-block
                  text-xs font-medium text-${item.color}-600 tracking-wide mb-2
                  cursor-grabbing select-none
                  hover:bg-gray-100 hover:text-${item.color}-700
                  active:opacity-50
                  px-2 py-1 rounded-md inline-block
                  transition-all duration-150
                  ${draggedLabel === item.label ? 'opacity-50 scale-95' : ''}
                `}
                title="Arrastra el elemento al campo mensaje"
              >
                <span className="inline-flex items-center gap-1 rounded-lg">
                  {/* Icono de drag */}
                  <svg 
                    className="w-3 h-3 opacity-50" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 8h16M4 16h16" 
                    />
                  </svg>
                  {item.label}
                </span>
              </div>
              <div className={`text-sm font-semibold text-${item.color}-700`}>
                {item.value}
              </div>
              
            </div>
          ))}
        </div>
      </div>

      {/* Vista de tabla horizontal - Encabezados TAMBIÉN arrastrables */}
      <div className="mt-8">
           <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="bg-white min-w-full">
            <tbody>
              {/* Fila de encabezados - AHORA ARRASTRABLES */}
              <tr className="bg-ba">
                {Object.keys(datosProductoCompleto).map((key) => (
                  <th
                    key={key}
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, key)}
                    onDragEnd={handleDragEnd}
                    className={`
                      py-3 w-auto px-4 border-b border-r-background-secondary 
                      text-xs font-semibold text-neutral-100 uppercase tracking-wider 
                      whitespace-nowrap align-top
                      cursor-grabbing select-none
                      hover:bg-slate-600 active:bg-slate-500
                      transition-all duration-150
                      ${draggedLabel === key ? 'opacity-50 scale-95 bg-slate-500' : ''}
                    `}
                    title="Arrastra el elemento al campo mensaje"
                  >
                    <span className="inline-flex items-center gap-2">
                      <svg 
                        className="w-3 h-3 text-neutral-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M4 8h16M4 16h16" 
                        />
                      </svg>
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </span>
                  </th>
                ))}
              </tr>

              {/* Fila de valores */}
              <tr className="hover:bg-gray-50">
                {Object.entries(datosProductoCompleto).map(
                  ([key, value], index) => (
                    <td
                      key={index}
                      className={`py-3 px-4 border-b-jerarquia4 text-sm w-auto ${getValueClass(
                        value,
                        key
                      )} break-words align-top`}
                    >
                      {formatValue(value, key)}
                    </td>
                  )
                )}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-2 text-xs text-gray-500 text-center">
          Desliza horizontalmente para ver todos los campos → | Los encabezados también son arrastrables
        </div>
      </div>
    </div>
  );
};

export default LoadDates;