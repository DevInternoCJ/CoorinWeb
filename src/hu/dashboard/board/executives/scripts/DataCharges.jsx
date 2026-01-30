import React, { useState, useEffect } from "react";
import { PostDataCharge } from "../../../../../services/mark/Orochi/LokiServices";
import { useWalletProducts } from "../../../../login/WalletProduct";
import { useUserStore } from "../../../../../contextGlobal/userStore";
import { IconError } from "./IconScripts";
import { IconDrag } from "../../../../../components/iconos/IconDrag";

const DataCharges = ({ onDataLoaded }) => {
  // Estados
  const [ejemploCuentas, setEjemploCuentas] = useState(null);
  const [ejemploProducto, setEjemploProducto] = useState(null);
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [draggedLabel, setDraggedLabel] = useState("");
  const [lastFetchParams, setLastFetchParams] = useState(null);
  const user = useUserStore((state) => state.user);
  const NombreEjecutivo = user?.nombre;
  const {
    walletProducts,
    isLoading: isLoadingStore,
    error: errorStore,
  } = useWalletProducts();
  const idProducto = walletProducts?.[0]?.idProducto;
  const idCartera = walletProducts?.[0]?.idCartera;
  // Fetch data cuando tengamos idCartera e idProducto
  useEffect(() => {
    return () => {
      localStorage.removeItem("ejemploCuentas");
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      // Verificar si tenemos los datos necesarios y no estamos ya cargando
      if (!idCartera || !idProducto || isLoadingStore) {
        return;
      }
      // Crear un objeto de parámetros para comparar
      const currentParams = JSON.stringify({ idCartera, idProducto });
      // Evitar llamadas duplicadas con los mismos parámetros
      if (lastFetchParams === currentParams) {
        return;
      }
      if (isMounted) {
        setLoading(true);
        setError(null);
        setLastFetchParams(currentParams);
      }
      try {
        const params = {
          idCartera: idCartera,
          idProducto: idProducto,
        };
        const response = await PostDataCharge(params);
        console.log(" Respuesta recibida:", response);
        if (response?.exitoso) {
          // Preparar los datos
          if (
            response.ejemploCuentas ||
            response.ejemploProducto ||
            response.scripts
          ) {
            // Preparar los valores de reemplazo
            const allValues = {
              ...response.ejemploCuentas,
              ...(response.ejemploProducto || {}),
              NombreEjecutivo: NombreEjecutivo,
            };
            // Actualizar estados locales
            if (response.ejemploCuentas) {
              setEjemploCuentas(response.ejemploCuentas);
            }
            if (response.ejemploProducto) {
              setEjemploProducto(response.ejemploProducto);
            }
            if (response.scripts) {
              setScripts(response.scripts);
            }
            // Notificar al componente padre con todos los datos
            if (onDataLoaded) {
              console.log("Enviando datos al EditionScripts:", {
                scripts: response.scripts || [],
                placeholders: allValues,
              });
              onDataLoaded(response.scripts || [], allValues);
            }
          }
        } else {
          setError(
            response?.mensaje || "No se pudieron cargar los datos del servidor",
          );
        }
      } catch (err) {
        console.error(" Error al cargar datos:", err);
        setError(err.message || "Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [
    idCartera,
    idProducto,
    isLoadingStore,
    onDataLoaded,
    NombreEjecutivo,
    lastFetchParams,
  ]);
  // Handlers para drag and drop
  const handleDragStart = (e, labelText) => {
    e.dataTransfer.effectAllowed = "copy";
    // Asegurarse de que el texto tenga el formato correcto para placeholders
    const placeholderText = `[${labelText}]`;
    e.dataTransfer.setData("text/plain", placeholderText);
    e.dataTransfer.setData("application/x-placeholder", labelText); // Para identificar que es un placeholder
    setDraggedLabel(labelText);
  };

  const handleDragEnd = () => {
    setDraggedLabel("");
  };

  // Función para formatear valores
  const formatValue = (value, key) => {
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      value === " "
    ) {
      return "";
    }
    // Formatear saldo como moneda
    if (key === "Saldo" && typeof value === "number") {
      return `$${value.toLocaleString("es-MX", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
    return String(value).trim();
  };

  document.addEventListener("dragstart", () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      window._savedRange = selection.getRangeAt(0);
    }
  });
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
          <p className="mt-4 text-sm text-gray-600">
            Cargando datos del producto...
          </p>
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
            <IconError className="w-12 h-12 mx-auto mb-4" />
            <p className="font-semibold">Error</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }
  // Datos de las tarjetas (de ejemploCuentas)
  const cardData = ejemploCuentas
    ? [
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
      ]
    : [];

  return (
    <div>
      <div className="mt-3">
        {ejemploCuentas && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {cardData.map((item, index) => (
              <div
                key={index}
                className="bg-background-tertiary p-2 rounded-lg border-none"
              >
                <div
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, item.label)}
                  onDragEnd={handleDragEnd}
                  className={`inline-block text-xs font-medium text-${
                    item.color
                  }-600 tracking-wide mb-2 cursor-grabbing select-none hover:bg-gray-100 hover:text-${
                    item.color
                  }-700 active:opacity-50 rounded-md transition-all duration-150 ${
                    draggedLabel === item.label ? "opacity-50 scale-95" : ""
                  }`}
                  title="Arrastra el texto al campo mensaje"
                >
                  <div className=" flex items-center gap-1 bg-jerarquia1/50 pt-1 pr-1 rounded-sm hover:bg-jerarquia3/30 hover:shadow-jerarquia3 shadow-sm  hover:shadow-md transition-shadow duration-200">
                    <IconDrag className=" text-jerarquia3" />
                    <span className="inline-flex items-center text-sm font-semibold gap-1 text-jerarquia4">
                      {item.label}
                    </span>
                  </div>
                </div>
                <div
                  className={`text-sm text-${item.color}-700 font-medium break-words`}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Tabla de datos del producto */}
        {ejemploProducto && Object.keys(ejemploProducto).length > 0 && (
          <div className="mt-4">
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="bg-white min-w-full">
                <tbody>
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
                        <div className=" flex items-center gap-1">
                          <IconDrag className=" text-bgsuccess" />
                          <span className="inline-fle text-sm items-center gap-2">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                  {/* Fila de valores */}
                  <tr className="hover:bg-gray-50">
                    {Object.entries(ejemploProducto).map(
                      ([key, value], index) => (
                        <td
                          key={index}
                          className="py-3 px-4 border-b border-gray-200 text-sm whitespace-nowrap align-top"
                        >
                          {formatValue(value, key)}
                        </td>
                      ),
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataCharges;
