import React, { useState, useEffect } from "react";
import {
  getRegrest,
  infoEjecutivo,
} from "../../../../services/mark/orochi/LokeServices";
import { toast } from "sonner";

const RegrestContent = ({ growModal, isExpanded }) => {
  const [valor, setValor] = useState("");
  const [resultados, setResultados] = useState(null); // array de arrepentimientos
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
                ])
              ).values()
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
    try {
      const data = await getRegrest({ idCartera, cuenta: valor });
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
      console.error("Error al buscar arrepentimientos:", error);
      toast.warning("Verifica que la cuenta sea correcta");
      setError("Verifica que la cuenta sea correcta.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error === "Verifica que la cuenta sea correcta.") {
      toast.warning("Verifica que la cuenta sea correcta.");
    }
    if (!error && !resultados) {
      toast.info(
        "Escriba la cuenta y presione Buscar para mostrar sus arrepentimientos."
      );
    }
  }, [error, resultados]);

  // El layout horizontal solo aplica si el modal está expandido (pagos-xl)
  return (
    <div className="w-full pt-0 px-6 pb-6 box-border flex flex-col">
      <div
        className={
          isExpanded
            ? "w-full max-w-[1100px] mb-4 mx-auto"
            : "w-full max-w-2xl mb-4 mx-auto"
        }
      >
        <div className="flex flex-row justify-center items-center gap-4 w-full">
          {/* Cartera */}
          <div className="relative w-full min-w-0 flex-1">
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
          {/* Cuenta */}
          <div className="flex-[2] min-w-0">
            <input
              type="text"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="Ingrese nú. de cuenta"
              className="block w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2"
              disabled={loading}
            />
          </div>
          {/* Buscar */}
          <div className="flex-1 min-w-0 flex justify-center">
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
