import React, { useState, useEffect } from 'react';
import { PostDataCharge } from '../../../../../../services/mark/albaz/LokiServices';
import { useWalletProducts } from '../../../../../login/WalletProduct';
import { useUserStore } from '../../../../../../contextGlobal/userStore';

const DataCharges = () => {
  // Estados
  const [ejemploCuentas, setEjemploCuentas] = useState(null);
  const [ejemploProducto, setEjemploProducto] = useState(null);
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [draggedLabel, setDraggedLabel] = useState("");
  const user = useUserStore((state) => state.user);
    const NombreEjecutivo = user?.nombre;

  // Obtener datos del producto
  const { walletProducts, isLoading: isLoadingStore, error: errorStore } = useWalletProducts(); 
  const idProducto = walletProducts?.[0]?.idProducto;
  const idCartera = walletProducts?.[0]?.idCartera;

  console.log("Wallet Products:", walletProducts);
  console.log("idProducto:", idProducto);
  console.log("idCartera:", idCartera);

  // Fetch data cuando tengamos idCartera e idProducto
  useEffect(() => {
    const fetchData = async () => {
      if (!idCartera || !idProducto) {
        if (!isLoadingStore) {
          setError("No se encontraron idCartera o idProducto");
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const params = {
          idCartera: idCartera,
          idProducto: idProducto
        };

        console.log("📤 Enviando petición con params:", params);

        const response = await PostDataCharge(params);

        console.log("📥 Respuesta recibida:", response);

        if (response?.exitoso) {
          // Guardar datos de cuentas
          if (response.ejemploCuentas) {
            setEjemploCuentas(response.ejemploCuentas);
          }

          // Guardar datos del producto
          if (response.ejemploProducto) {
            setEjemploProducto(response.ejemploProducto);
          }

          // Guardar scripts (opcional)
          if (response.scripts) {
            setScripts(response.scripts);
          }
        } else {
          setError(response?.mensaje || "No se pudieron cargar los datos del servidor");
        }
      } catch (err) {
        console.error("❌ Error al cargar datos:", err);
        setError(err.message || "Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idCartera, idProducto, isLoadingStore]);

  // Handlers para drag and drop
  const handleDragStart = (e, labelText) => {
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("text/plain", `[${labelText}]`);
    setDraggedLabel(labelText);
  };

  const handleDragEnd = () => {
    setDraggedLabel("");
  };

  // Función para formatear valores
  const formatValue = (value, key) => {
    if (value === null || value === undefined || value === "" || value === " ") {
      return "N/A";
    }

    // Formatear saldo como moneda
    if (key === "Saldo" && typeof value === "number") {
      return `$${value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    return String(value).trim();
  };

  // Spinner de carga
  if (loading || isLoadingStore) {
    return (
      <div className="min-h-60 flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl">
        <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
          <div className="flex justify-center">
            <div 
              className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" 
              role="status" 
              aria-label="loading"
            >
              <span className="sr-only">Cargando...</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">Cargando datos del producto...</p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="min-h-60 flex flex-col bg-white border border-red-200 shadow-2xs rounded-xl">
        <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
          <div className="text-red-500 text-center">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-semibold">Error</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Datos de las tarjetas (de ejemploCuentas)
  const cardData = ejemploCuentas ? [
    {
      label: "NombreEjecutivo",
      value: formatValue(NombreEjecutivo, "NombreEjecutivo"),
      color: "gray",
    },
    {
      label: "NombreDeudor",
      value: formatValue(ejemploCuentas.NombreDeudor, "NombreDeudor"),
      color: "gray",
    },
    {
      label: "idCuenta",
      value: formatValue(ejemploCuentas.idCuenta, "idCuenta"),
      color: "gray",
    },
    {
      label: "RFC",
      value: formatValue(ejemploCuentas.RFC, "RFC"),
      color: "blue",
    },
    {
      label: "NúmeroCliente",
      value: formatValue(ejemploCuentas.NúmeroCliente, "NúmeroCliente"),
      color: "gray",
    },
    {
      label: "Saldo",
      value: formatValue(ejemploCuentas.Saldo, "Saldo"),
      color: "green",
    },
  ] : [];

  return (
    <div>
      <div className="mt-3">
        {/* Tarjetas de información */}
        {ejemploCuentas && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {cardData.map((item, index) => (
              <div
                key={index}
                className="bg-background-tertiary p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200"
              >
                <div
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, item.label)}
                  onDragEnd={handleDragEnd}
                  className={`inline-block text-xs font-medium text-${item.color}-600 tracking-wide mb-2 cursor-grabbing select-none hover:bg-gray-100 hover:text-${item.color}-700 active:opacity-50 rounded-md transition-all duration-150 ${
                    draggedLabel === item.label ? "opacity-50 scale-95" : ""
                  }`}
                  title="Arrastra el texto al campo mensaje"
                >
                  <span className="inline-flex items-center text-sm font-semibold gap-1">
                    {item.label}
                  </span>
                </div>
                <div className={`text-sm text-${item.color}-700 font-medium break-words`}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tabla de datos del producto */}
        {ejemploProducto && Object.keys(ejemploProducto).length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Detalles del Producto</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="bg-white min-w-full">
                <tbody>
                  {/* Fila de encabezados */}
                  <tr className="bg-jerarquia4">
                    {Object.keys(ejemploProducto).map((key) => (
                      <th
                        key={key}
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, key)}
                        onDragEnd={handleDragEnd}
                        className={`py-3 overflow-x-auto px-4 text-xs font-semibold tracking-wider whitespace-nowrap align-top cursor-grabbing select-none hover:bg-green-950 active:bg-slate-500 transition-all duration-150 bg-jerarquia4 text-background-tertiary ${
                          draggedLabel === key ? "opacity-50 scale-95" : ""
                        }`}
                        title="Arrastra el texto al campo mensaje"
                      >
                        <span className="inline-flex items-center gap-2">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                      </th>
                    ))}
                  </tr>

                  {/* Fila de valores */}
                  <tr className="hover:bg-gray-50">
                    {Object.entries(ejemploProducto).map(([key, value], index) => (
                      <td
                        key={index}
                        className="py-3 px-4 border-b border-gray-200 text-sm whitespace-nowrap align-top"
                      >
                        {formatValue(value, key)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Sección de Scripts (opcional) */}
        {scripts.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Scripts Disponibles ({scripts.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {scripts.slice(0, 6).map((script) => (
                <div
                  key={script.idScript}
                  className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-sm text-gray-800 mb-1">{script.nombre}</h4>
                  {script.descripcion && (
                    <p className="text-xs text-gray-500 mb-2">{script.descripcion}</p>
                  )}
                  {script.script && (
                    <p className="text-xs text-gray-600 line-clamp-2">{script.script}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataCharges;