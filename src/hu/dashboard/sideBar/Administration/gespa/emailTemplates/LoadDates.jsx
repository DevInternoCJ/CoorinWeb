import React, { useState, useEffect } from "react";
import { PostLoadData } from "../../../../../../services/mark/albaz/LokiServices";
import { useWalletProducts } from "../../../../../login/WalletProduct"; // Importa el hook

const LoadDates = ({
  isModalOpen,
  onPlantillasChange,
  onDatosDeudorChange,
  onDatosProductoCompletoChange,
}) => {
  const [datosDeudor, setDatosDeudor] = useState({});
  const [datosProductoCompleto, setDatosProductoCompleto] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [draggedLabel, setDraggedLabel] = useState("");
    // ✅ Hook corregido
  const { walletProducts, isLoading: isLoadingStore, error: errorStore } = useWalletProducts();
  // Extraer IDs con validación
  const idProducto = walletProducts?.[0]?.idProducto;
  const idCartera = walletProducts?.[0]?.idCartera;

  console.log("Wallet Products:", walletProducts);
  console.log("idProducto:", idProducto);
  console.log("idCartera:", idCartera);

  // Reset function
  const resetAllData = () => {
    setDatosDeudor({});
    setDatosProductoCompleto({});
    setLoading(true);
    setError(null);
    onDatosDeudorChange?.({});
    onDatosProductoCompletoChange?.({});
  };

  // Reset cuando se cierra el modal
  useEffect(() => {
    if (!isModalOpen) {
      resetAllData();
    }
  }, [isModalOpen]);

  // Manejar errores del store
  useEffect(() => {
    if (errorStore) {
      setError(`Error al cargar productos: ${errorStore}`);
      setLoading(false);
    }
  }, [errorStore]);

  // Fetch data function
  const fetchData = async () => {
    if (!idCartera || !idProducto) {
      setLoading(false);
      setError("Faltan datos necesarios (idCartera o idProducto)");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = { idCartera, idProducto };
      console.log("Body enviado a PostLoadData:", data);

      const response = await PostLoadData(data);

      if (response?.exito) {
        // Procesar plantillas
        if (response.plantillas && onPlantillasChange) {
          onPlantillasChange(response.plantillas);
        }
        
        // Procesar cuenta/deudor
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
          onDatosDeudorChange?.(nuevosDatosDeudor);
        }
        
        // Procesar producto
        if (response.producto) {
          setDatosProductoCompleto(response.producto);
          onDatosProductoCompletoChange?.(response.producto);
        }
      } else {
        setError("No se pudieron cargar los datos del servidor");
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setError(error.message || "Error al cargar los datos");
      setLoading(false);
    }
  };

  // Efecto principal para cargar datos
  useEffect(() => {
    if (idCartera && idProducto) {
      fetchData();
    } else if (isLoadingStore) {
      setLoading(true);
    } else if (walletProducts === null && !isLoadingStore) {
      setLoading(false);
      setError("No se encontraron datos del producto en el store");
    }
  }, [idCartera, idProducto, isLoadingStore, walletProducts]);

  // Cuando comienza el arrastre del label o header
  const handleDragStart = (e, labelText) => {
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("text/plain", `[${labelText}]`);
    setDraggedLabel(labelText);
  };

  // Cuando termina el arrastre
  const handleDragEnd = () => {
    setDraggedLabel("");
  };

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

  // ✅ Mejorar los estados de carga para ser más específicos
  if (isLoadingStore && !walletProducts) {
    return <div className="text-center py-8">Cargando productos del portafolio...</div>;
  }

  if (loading) return <div className="text-center py-8">Cargando datos del producto...</div>;
  
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  if (!idCartera || !idProducto) {
    return (
      <div className="text-center py-8 text-yellow-600">
        No se encontraron datos del producto. Por favor, verifica que haya productos disponibles.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto rounded-lg ">
      <div className="">
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
                  py-1 rounded-md inline-block
                  transition-all duration-150
                  ${draggedLabel === item.label ? "opacity-50 scale-95" : ""}
                `}
                title="Arrastra el texto al campo mensaje"
              >
                <span className="inline-flex items-center text-sm font-semibold gap-1 rounded-lg">
                  {item.label}
                </span>
              </div>
              <div className={`text-sm text-${item.color}-700`}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vista de tabla horizontal - Encabezados TAMBIÉN arrastrables */}
      <div className="mt-4">
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
                      text-xs font-semibold  tracking-wider 
                      whitespace-nowrap align-top
                      cursor-grabbing select-none
                      hover:bg-jerarquia4 active:bg-slate-500
                      transition-all duration-150
                      bg-background-dashboard
                      hover:text-background-tertiary 
                      ${
                        draggedLabel === key
                          ? "opacity-50 scale-95 bg-slate-500"
                          : ""
                      }
                    `}
                    title="Arrastra el texto al campo mensaje"
                  >
                    <span className="inline-flex items-center text-neutral-800 gap-2">
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
      </div>
    </div>
  );
};

export default LoadDates;