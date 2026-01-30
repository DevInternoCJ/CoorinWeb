import React, { useState, useEffect } from "react";
import {
  getRegrest,
  infoEjecutivo,
} from "../../../../services/mark/Orochi/LokiServices";
import { toast } from "sonner";

const RegrestContent = ({ growModal, isExpanded }) => {
  const [valor, setValor] = useState("");
  const [resultados, setResultados] = useState(null); // array de arrepentimientos
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [abortController, setAbortController] = useState(null);

  const [cartera, setCartera] = useState(() => {
    const ud = JSON.parse(localStorage.getItem("userData") || "{}");
    return ud?.idCartera || 0;
  });
  const [carterasOptions, setCarterasOptions] = useState([]);

  // Obtener idCartera desde localStorage
  const getIdCartera = () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    return userData?.idCartera || 0; // fallback a 1 si no existe
  };

  // Obtener idEjecutivo desde localStorage
  const getIdEjecutivo = () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    return userData?.idEjecutivo ?? null;
  };

  // Cargar carteras (similar a Addresses.jsx)
  useEffect(() => {
    const idEjecutivo = getIdEjecutivo();
    if (!idEjecutivo) return;
    infoEjecutivo(idEjecutivo)
      .then((data) => {
        const carterasUnicas = Array.isArray(data)
          ? Array.from(
              new Map(
                data.map((item) => [
                  item.idCartera,
                  {
                    id: item.idCartera,
                    nombre: item.NombreCartera || `Cartera ${item.idCartera}`,
                  },
                ]),
              ).values(),
            )
          : [];
        setCarterasOptions(carterasUnicas);
        // Si cartera actual no está en opciones, mantenerla
      })
      .catch(() => setCarterasOptions([]));
  }, []);

  const handleBuscar = async () => {
    setResultados(null);
    setError(null);
    if (!valor) {
      toast.warning("Ingrese un número de cuenta válido");
      setError("Ingrese un número de cuenta válido.");
      return;
    }

    const idCartera = getIdCartera();
    console.log("🔍 Usando idCartera:", idCartera);

    setLoading(true);
    const controller = new AbortController();
    setAbortController(controller);
    try {
      const data = await getRegrest(
        { idCartera, cuenta: valor },
        { signal: controller.signal },
      );
      if (Array.isArray(data) && data.length > 0) {
        // Ordenar por fecha y hora descendente
        const ordenados = [...data].sort((a, b) => {
          const fechaA = new Date(a.fecha_Hora);
          const fechaB = new Date(b.fecha_Hora);
          return fechaB - fechaA;
        });
        setResultados(ordenados);
        // Solo expandir si la cuenta es válida y hay resultados
        if (typeof growModal === "function") {
          growModal();
        }
      } else {
        setResultados([]);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Petición cancelada");
        return;
      }
      console.error("Error al buscar arrepentimientos:", error);
      toast.warning("Verifica que la cuenta sea correcta");
      setError("Verifica que la cuenta sea correcta.");
    } finally {
      setLoading(false);
      setAbortController(null);
    }
  };

  // Cancelar petición al desmontar el componente
  useEffect(() => {
    return () => {
      if (abortController) {
        toast.warning("Petición cancelada al cerrar el modal.");
        abortController.abort();
      }
    };
  }, [abortController]);

  useEffect(() => {
    if (error === "Verifica que la cuenta sea correcta.") {
      toast.warning("Verifica que la cuenta sea correcta.");
    }
    if (!error && !resultados) {
      toast.info(
        "Escriba la cuenta y presione Buscar para mostrar sus arrepentimientos.",
      );
    }
  }, [error, resultados]);

  // El layout horizontal solo aplica si el modal está expandido (pagos-xl)
  return (
    <div className="w-full box-border flex flex-col">
      <div className="w-full max-w-[1100px] mb-4 mx-auto">
        {/* sm y md: estructura vertical, lg/xl/2xl: horizontal con input expandible */}
        <div className="block lg:flex lg:flex-row lg:items-center lg:gap-2 w-full">
          {/* Dropdown cartera */}
          <div className="relative w-full mb-4 lg:mb-0 lg:flex-shrink-0 lg:max-w-[180px]">
            <select
              id="cartera-select"
              className="peer py-3 px-3 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none"
              value={cartera}
              onChange={(e) => setCartera(e.target.value)}
            >
              {carterasOptions.length === 0 ? (
                <option value={cartera}>{`Cartera ${cartera}`}</option>
              ) : (
                carterasOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nombre}
                  </option>
                ))
              )}
            </select>
            <label
              htmlFor="cartera-select"
              className="absolute top-0 start-0 py-1 px-3 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500"
            >
              Cartera
            </label>
          </div>
          {/* Input cuenta adaptado de DarkList.jsx */}
          <div className="mb-4 lg:mb-0 flex-1 lg:flex-[5] xl:flex-[5] 2xl:flex-[5] min-w-0 flex items-center justify-center">
            <input
              className="block w-full lg:max-w-xl xl:max-w-xl 2xl:max-w-xl bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2"
              type="text"
              value={valor}
              onChange={(e) =>
                setValor(e.target.value.replace(/\D/g, "").slice(0, 16))
              }
              onPaste={(e) => {
                e.preventDefault();
                const pasted = e.clipboardData.getData("text");
                const soloNumeros = pasted.replace(/\D/g, "").slice(0, 16);
                setValor(soloNumeros);
              }}
              placeholder="Ingrese nú. de cuenta"
              disabled={loading}
              maxLength={16}
            />
          </div>
          {/* Botón buscar */}
          <div className="flex justify-center lg:flex-[2] xl:flex-[2] 2xl:flex-[2]">
            <button
              className="btn-success w-full px-4 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
              onClick={handleBuscar}
              disabled={loading}
            >
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </div>
        </div>
      </div>

      {/* Tabla y mensajes */}
      {resultados && resultados.length > 0 ? (
        <div
          className={
            isExpanded
              ? "flex-1 w-full overflow-auto"
              : "w-full max-w-full overflow-auto"
          }
          style={
            isExpanded
              ? {
                  maxWidth: 1100,
                  minHeight: 480,
                  maxHeight: "68vh",
                  background: "#fff",
                  borderRadius: 8,
                  border: "1px solid #e0e0e0",
                }
              : { maxHeight: 480, minHeight: 480 }
          }
        >
          <table className="modal-table w-full">
            <thead>
              <tr className="bg-gray-100">
                <th
                  style={{
                    position: "sticky",
                    top: 0,
                    background: "var(--color-jerarquia4)",
                    color: "#fff",
                    zIndex: 2,
                  }}
                >
                  Fecha/Hora
                </th>
                <th
                  style={{
                    position: "sticky",
                    top: 0,
                    background: "var(--color-jerarquia4)",
                    color: "#fff",
                    zIndex: 2,
                  }}
                >
                  Arrepintió
                </th>
                <th
                  style={{
                    position: "sticky",
                    top: 0,
                    background: "var(--color-jerarquia4)",
                    color: "#fff",
                    zIndex: 2,
                  }}
                >
                  Concepto
                </th>
                <th
                  style={{
                    position: "sticky",
                    top: 0,
                    background: "var(--color-jerarquia4)",
                    color: "#fff",
                    zIndex: 2,
                  }}
                >
                  Dato
                </th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    {(() => {
                      if (!item.fecha_Hora) return "";
                      const [fecha, hora] = item.fecha_Hora.split("T");
                      if (!hora) return fecha;
                      const horaSinMs = hora.split(".")[0];
                      return `${fecha} ${horaSinMs}`;
                    })()}
                  </td>
                  <td>{item.arrepintio}</td>
                  <td>{item.concepto}</td>
                  <td>{item.dato}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : resultados && resultados.length === 0 && !error ? (
        <div className="text-sm text-[var(--color-jerarquia2)] mt-2">
          No se encontraron arrepentimientos para la cuenta ingresada.
        </div>
      ) : null}
    </div>
  );
};

export default RegrestContent;
