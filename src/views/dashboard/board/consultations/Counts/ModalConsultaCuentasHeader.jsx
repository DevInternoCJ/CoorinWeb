import React, { useState } from "react";
import { IconCuentas } from "../IconesConsultations";
import FloatingSelect from "../../../../../components/Select/FloatingSelect";
import CatalogSelect from "../../../../../components/Select/CatalogSelect";

// ModalHeader Component
const ModalConsultaCuentasHeader = ({ onClose, onHeaderDataChange, jerarquia = 0 }) => {
  const [cartera, setCartera] = useState("");
  const [producto, setProducto] = useState("");
  const [consulta, setConsulta] = useState("");

  // Notificar cambios en los datos del header
  React.useEffect(() => {
    if (onHeaderDataChange) {
      onHeaderDataChange({
        idCartera: Number(cartera) || null,
        idProducto: Number(producto) || null,
        tipoConsulta: consulta,
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
          className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive text-4xl rounded-full w-8 h-8 flex items-center justify-center transition-colors focus:outline-none"
        >
          &times;
        </button>
      </div>

      {/* Fila 2: Grid de selects - 3 columnas en móvil/tablet, fila horizontal en desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-row gap-3 w-full">
        {/* Consulta */}
        <div className="relative w-full lg:flex-1">
          <FloatingSelect
            id="consulta-select"
            value={consulta}
            label="Tipo de consulta"
            onChange={(e) => setConsulta(e.target.value)}
            required
            options={[
              { value: "general", label: "General" },
              ...(Number(jerarquia) > 1 ? [{ value: "detalle", label: "Detalle" }] : []),
            ]}
          />
        </div>

        {/* Cartera */}
        <div className="relative w-full lg:flex-1"><CatalogSelect id="cartera-select" label="Cartera" value={cartera} onChange={(e) => { setCartera(e.target.value); setProducto(""); }} required /></div>

        {/* Producto */}
        <div className="relative w-full lg:flex-1"><CatalogSelect type="producto" id="producto-select" label="Producto (opcional)" idCartera={cartera} value={producto} onChange={(e) => setProducto(e.target.value)} /></div>
      </div>
    </div>
  );
};

export default ModalConsultaCuentasHeader;
