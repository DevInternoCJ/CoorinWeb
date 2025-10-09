import React, { useState, useRef } from "react";
import ModalBase from "../../board/ModalBase";
import { getRegrest } from "../../../../services/mark/albaz/LokiServices";

const Regrest = ({ onClose }) => {
  const modalRef = useRef(null);
  const { bounce, handleBackdropClick } = ModalBase.useModalLogic();

  const [valor, setValor] = useState("");
  const [resultados, setResultados] = useState(null); // array de arrepentimientos
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener idCartera desde localStorage
  const getIdCartera = () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    return userData?.idCartera || userData?.idcartera || userData?.cartera || 1; // fallback a 1 si no existe
  };

  const handleBuscar = async () => {
    setResultados(null);
    setError(null);
    if (!valor) {
      setError("Ingrese una cuenta para buscar.");
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
      } else {
        setResultados([]);
      }
    } catch (error) {
      console.error("Error al buscar arrepentimientos:", error);
      setError("Verifica que la cuenta sea correcta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-blur-bg">
      <div className="modal-overlay" onClick={handleBackdropClick} />
      <div
        ref={modalRef}
        className={`modal-content modal-xl-container${
          bounce ? " animate-bounce-modal" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "920px",
          minWidth: "690px",
          height: "633px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Header personalizado para Regrest */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
            borderBottom: "1px solid #e0e0e0",
            paddingBottom: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <img
              src="/public/logo_coorin_7.svg"
              alt="Logo Coorin"
              style={{ height: 36, marginRight: 8 }}
            />
            <h2 className="modal-title">Arrepentimientos</h2>
          </div>
          <button
            onClick={onClose}
            className="modal-btn modal-btn-close ml-4"
            aria-label="Cerrar"
          >
            &times;
          </button>
        </div>

        {/* Content específico de Regrest */}
        <div style={{ flex: 1, overflow: "auto", width: "100%" }}>
          <div
            style={{
              width: "100%",
              padding: "1.5rem 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Información de cartera */}
            <div
              style={{
                textAlign: "center",
                marginBottom: 12,
                fontSize: 15,
                color: "#526581",
              }}
            >
              Cartera: <strong>{getIdCartera()}</strong>
            </div>

            <div className="modal-form-row">
              <div className="modal-input-group">
                <label className="modal-label">Cuenta</label>
                <input
                  type="text"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  placeholder="Ingrese número de cuenta"
                  className="modal-input"
                  disabled={loading}
                />
              </div>
              <button
                className="modal-button"
                onClick={handleBuscar}
                disabled={loading}
              >
                {loading ? "Buscando..." : "Buscar"}
              </button>
            </div>

            {error && (
              <div
                style={{
                  color: "red",
                  fontSize: 15,
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                {error}
              </div>
            )}

            {!resultados && !error && (
              <div
                className="modal-span-2"
                style={{
                  fontSize: 15,
                  marginTop: 8,
                  textAlign: "center",
                  color: "#526581",
                }}
              >
                Escriba la cuenta y presione Buscar para mostrar sus
                arrepentimientos.
              </div>
            )}

            {resultados && resultados.length > 0 && (
              <div
                className="modal-table-scroll"
                style={{
                  width: "100%",
                  maxHeight: 260,
                  overflowY: "auto",
                  overflowX: "auto",
                  marginTop: 8,
                }}
              >
                <table className="modal-table">
                  <thead>
                    <tr>
                      <th>Fecha/Hora</th>
                      <th>Arrepintió</th>
                      <th>Concepto</th>
                      <th>Dato</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultados.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          {(() => {
                            // Quitar la 'T' y los milisegundos
                            if (!item.fecha_Hora) return "";
                            const [fecha, hora] = item.fecha_Hora.split("T");
                            if (!hora) return fecha;
                            // Quitar milisegundos si existen
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
            )}

            {resultados && resultados.length === 0 && !error && (
              <div
                style={{
                  fontSize: 15,
                  marginTop: 8,
                  textAlign: "center",
                  color: "#526581",
                }}
              >
                No se encontraron arrepentimientos para la cuenta ingresada.
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
                @keyframes bounce-modal {
                    0% { transform: scale(1); }
                    20% { transform: scale(1.05, 0.95); }
                    40% { transform: scale(0.95, 1.05); }
                    60% { transform: scale(1.03, 0.97); }
                    80% { transform: scale(0.97, 1.03); }
                    100% { transform: scale(1); }
                }
                .animate-bounce-modal {
                    animation: bounce-modal 0.5s;
                }
            `}</style>
    </div>
  );
};

export default Regrest;
