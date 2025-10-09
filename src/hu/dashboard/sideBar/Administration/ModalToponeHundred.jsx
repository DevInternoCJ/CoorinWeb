import React, { useEffect, useState } from "react";
import { topCampaign } from "../../../../services/mark/albaz/LokiServices";
import { toast } from "sonner";

const ModalToponeHundred = ({ open, onClose, idCampaña }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && idCampaña) {
      setLoading(true);
      setError(null);
      topCampaign({ idCampaña })
        .then((data) => {
          setRows(Array.isArray(data) ? data : []);
          if (Array.isArray(data) && data.length === 0) {
            toast.info("No hay datos para mostrar del Top 100");
          } else {
            toast.success("Datos cargados correctamente (Top 100)");
          }
        })
        .catch((err) => {
          // Si el error es 404 y el mensaje es "No se encontraron datos.", mostrar tabla vacía y toast informativo
          if (
            err?.response?.status === 404 &&
            typeof err?.response?.data === "string" &&
            err.response.data.includes("No se encontraron datos")
          ) {
            setRows([]);
            toast.info("No hay datos para mostrar");
          } else {
            setError("Error al cargar los datos");
            toast.error("Error al cargar los datos del Top 100");
          }
        })
        .finally(() => setLoading(false));
    } else if (!open) {
      setRows([]);
      setError(null);
    }
  }, [open, idCampaña]);

  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 8,
          padding: 24,
          minWidth: 420,
          boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {/* Botón de cerrar en la esquina superior derecha */}
        <button
          className="modal-btn modal-btn-close"
          style={{
            fontSize: 20,
            position: "absolute",
            right: 12,
            top: 8,
            zIndex: 10,
          }}
          onClick={onClose}
          aria-label="Cerrar"
        >
          &times;
        </button>
        <div className="flex items-center mb-2 w-full">
          <span
            className="modal-span-1 pl-1 mr-4"
            style={{
              color: "var(--color-jerarquia2)",
              fontWeight: 600,
              fontSize: 22,
            }}
          >
            Top 100
          </span>
        </div>
        {loading ? (
          <div style={{ marginBottom: 18 }}>Cargando...</div>
        ) : error ? (
          <div style={{ marginBottom: 18, color: "red" }}>{error}</div>
        ) : (
          <div style={{ maxHeight: 350, overflowY: "auto", marginBottom: 18 }}>
            <table className="modal-table" style={{ minWidth: 400 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Cuenta</th>
                  <th style={{ textAlign: "center" }}>Personalizada</th>
                  <th style={{ textAlign: "center" }}>Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ textAlign: "center" }}>{row.Cuenta}</td>
                    <td style={{ textAlign: "center" }}>{row.Personalizada}</td>
                    <td style={{ textAlign: "center" }}>{row.Teléfono}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalToponeHundred;
