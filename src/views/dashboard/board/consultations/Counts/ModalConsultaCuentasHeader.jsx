import React, { useState } from "react";
import { IconCuentas } from "../IconesConsultations";
import FloatingSelect from "../../../../../components/Select/FloatingSelect";

// Flecha tipo chevron moderna
const DropdownArrow = () => (
  <span
    style={{
      pointerEvents: "none",
      position: "absolute",
      right: "0.75rem",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "1.15rem",
      color: "#2b463c",
      display: "flex",
      alignItems: "center",
    }}
  >
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M6 8l4 4 4-4"
        stroke="#2b463c"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const ModalConsultaCuentasHeader = ({ onClose, onHeaderDataChange }) => {
  const [cartera, setCartera] = useState("american_express");
  const [producto, setProducto] = useState("amex");
  const [consulta, setConsulta] = useState("");

  // Notificar cambios en los datos del header
  React.useEffect(() => {
    if (onHeaderDataChange) {
      onHeaderDataChange({
        idCartera: 1, // Por ahora hardcodeado, podrías mapear los valores
        idProducto: 1, // Por ahora hardcodeado
        esDetalleResultado: consulta === "detalle",
      });
    }
  }, [cartera, producto, consulta, onHeaderDataChange]);

  return (
    <div className="flex flex-col gap-3 mb-2 w-full">
      {/* Fila 1: Título y botón de cierre alineados */}
      <div className="flex items-center justify-between w-full">
        <h2 className="modal-title whitespace-nowrap">
          <IconCuentas className="modal-title-icon" />
          Consulta cuentas
        </h2>

        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="text-jerarquia3 hover:bg-background-dashboard hover:text-red-600 text-4xl rounded-full w-8 h-8 flex items-center justify-center transition-colors "
        >
          &times;
        </button>
      </div>

      {/* Fila 2: Grid de selects - 3 columnas en móvil/tablet, fila horizontal en desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-row gap-2 sm:gap-3 lg:gap-4 w-full">
        {/* Cartera */}
        <div className="relative w-full lg:flex-1">
          <FloatingSelect
            id="cartera-select"
            label="Cartera"
            value={cartera}
            onChange={(e) => setCartera(e.target.value)}
            required
            options={[
              { value: "american_express", label: "American Express" },
              { value: "hsbc", label: "HSBC" },
              { value: "santander", label: "Santander" },
            ]}
          />
        </div>

        {/* Producto */}
        <div className="relative w-full lg:flex-1">
          <FloatingSelect
            id="producto-select"
            label="Producto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            required
            options={[
              { value: "amex", label: "Amex" },
              { value: "visa", label: "Visa" },
              { value: "mastercard", label: "Mastercard" },
            ]}
          />
        </div>

        {/* Consulta */}
        <div className="relative w-full lg:flex-1">
          <FloatingSelect
            id="consulta-select"
            label="Consulta"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            required
            options={[
              { value: "general", label: "General" },
              { value: "detalle", label: "Detalle" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalConsultaCuentasHeader;
