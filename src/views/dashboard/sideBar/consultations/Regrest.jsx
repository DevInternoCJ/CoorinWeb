import React, { useState, useEffect, useRef } from "react";
import FloatingSelect from "../../../../components/Select/FloatingSelect";
import FloatingInput from "../../../../components/Select/FloatingInput";
import CatalogSelect from "../../../../components/Select/CatalogSelect";
import {
  getRegrest,
} from "../../../../services/mark/Orochi/LokiServices";
import { toast } from "sonner";

const RegrestContent = ({ growModal, isExpanded }) => {
  const [valor, setValor] = useState("");
  const [resultados, setResultados] = useState(null); // array de arrepentimientos
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const [cartera, setCartera] = useState("");

  const handleBuscar = async () => {
    setResultados(null);
    setError(null);
    if (!valor) {
      toast.warning("Ingrese un número de cuenta válido");
      setError("Ingrese un número de cuenta válido.");
      return;
    }

    if (!cartera) {
      toast.warning("Seleccione una cartera");
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    abortControllerRef.current = controller;
    try {
      const data = await getRegrest(
        { idCartera: Number(cartera), cuenta: valor },
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
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
    }
  };

  // Cancelar petición al desmontar el componente
  useEffect(() => () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
  }, []);

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
          <div className="w-full mb-4 lg:mb-0 lg:flex-shrink-0 lg:max-w-[180px]">
            <CatalogSelect
              id="cartera-select"
              label="Cartera"
              value={cartera}
              onChange={(e) => setCartera(e.target.value)}
            />
          </div>
          {/* Input cuenta adaptado de DarkList.jsx */}
          <div className="mb-4 lg:mb-0 flex-1 lg:flex-[5] xl:flex-[5] 2xl:flex-[5] min-w-0 flex items-center justify-center">
            <FloatingInput
              type="text"
              id="cuenta-input"
              label="Ingrese nú. de cuenta"
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
                  background: "var(--color-surface)",
                  borderRadius: 8,
                  border: "1px solid var(--color-border)",
                }
              : { maxHeight: 480, minHeight: 480 }
          }
        >
          <table className="modal-table w-full">
            <thead>
              <tr>
                <th
                  style={{
                    position: "sticky",
                    top: 0,
                    background: "var(--color-surface-secondary)",
                    zIndex: 2,
                  }}
                >
                  Fecha/Hora
                </th>
                <th
                  style={{
                    position: "sticky",
                    top: 0,
                    background: "var(--color-surface-secondary)",
                    zIndex: 2,
                  }}
                >
                  Arrepintió
                </th>
                <th
                  style={{
                    position: "sticky",
                    top: 0,
                    background: "var(--color-surface-secondary)",
                    zIndex: 2,
                  }}
                >
                  Concepto
                </th>
                <th
                  style={{
                    position: "sticky",
                    top: 0,
                    background: "var(--color-surface-secondary)",
                    zIndex: 2,
                  }}
                >
                  Dato
                </th>
              </tr>
            </thead>
            <tbody className="bg-[var(--color-surface)] text-[var(--color-text-primary)]">
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
