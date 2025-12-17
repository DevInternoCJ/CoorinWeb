import React, { useState, forwardRef, useImperativeHandle } from "react";

const CapturaVisitsF7 = forwardRef(({ disabled = false }, ref) => {
  // Estados para los campos
  const [energia, setEnergia] = useState("");
  const [energiaDetalle, setEnergiaDetalle] = useState("");
  const [acuse, setAcuse] = useState("");
  const [fotografia, setFotografia] = useState("");
  const [acuseDetalle, setAcuseDetalle] = useState("");
  const [fotografiaDetalle, setFotografiaDetalle] = useState("");
  const [medidor, setMedidor] = useState("");
  // Opciones para los detalles
  const detalleOptions = [
    "No aplica",
    "En proceso",
    "Completado",
    "Pendiente",
    "Rechazado"
  ];
  // Sanitizador para número de medidor: elimina control-chars, fuerza mayúsculas y permite solo A-Z0-9
  const sanitizeMedidor = (value, maxLen = 15) => {
    if (!value) return "";
    let out = "";
    for (let i = 0; i < value.length; i++) {
      const code = value.charCodeAt(i);
      if (code >= 32) out += value[i];
    }
    out = out.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (out.length > maxLen) out = out.slice(0, maxLen);
    return out;
  };
  
  // Clases dinámicas para campos deshabilitados
  const disabledClasses = disabled ? "bg-gray-200 cursor-not-allowed opacity-60" : "bg-gray-50";

  // Exponer datos y métodos al padre vía ref
  useImperativeHandle(ref, () => ({
    getData: () => ({
      energiaElectrica: energia === "Si" ? true : energia === "No" ? false : null,
      energiaDetalle: energia === "Si" ? (energiaDetalle || "No aplica") : "No aplica",
      acuseRequerimiento: acuse === "Si" ? true : acuse === "No" ? false : null,
      acuseDetalle: acuse === "Si" ? (acuseDetalle || "No aplica") : "No aplica",
      fotografiaPredio: fotografia === "Si" ? true : fotografia === "No" ? false : null,
      fotografiaDetalle: fotografia === "Si" ? (fotografiaDetalle || "No aplica") : "No aplica",
      numeroMedidor: medidor || null
    }),
    reset: () => {
      setEnergia("");
      setEnergiaDetalle("");
      setAcuse("");
      setAcuseDetalle("");
      setFotografia("");
      setFotografiaDetalle("");
      setMedidor("");
    }
  }), [energia, energiaDetalle, acuse, acuseDetalle, fotografia, fotografiaDetalle, medidor]);

  return (
  <div className={`area-f7 p-2 rounded mb-2 w-full mx-auto ${disabled ? 'opacity-70' : ''}`}>
    <h3 className="font-bold text-sm mb-2">Energía Eléctrica (F7)</h3>
    <div className="grid grid-cols-1 gap-2">
      {!(energia === "Si" && energiaDetalle !== "No aplica") && (
        <div className="relative w-full min-w-0">
          <select
            className={`peer p-4 pe-9 block w-full ${disabledClasses} border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2`}
            id="energia-select-f7"
            value={energia}
            onChange={(e) => {
              setEnergia(e.target.value);
              if (e.target.value !== "Si") setEnergiaDetalle("");
              if (e.target.value === "Si") setEnergiaDetalle("");
            }}
            disabled={disabled}
          >
            <option value="" hidden></option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
          <label
            htmlFor="energia-select-f7"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
          >
            ¿Cuenta con energía eléctrica?
          </label>
        </div>
      )}
      {energia === "Si" && energiaDetalle !== "No aplica" && (
        <div className="relative w-full min-w-0">
          <select
            className={`peer p-4 pe-9 block w-full ${disabledClasses} border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2`}
            id="energia-detalle-select-f7"
            value={energiaDetalle}
            onChange={(e) => {
              setEnergiaDetalle(e.target.value);
              if (e.target.value === "No aplica") {
                setEnergia("No");
              }
            }}
            disabled={disabled}
          >
            <option value="" disabled selected>Selecciona alguno</option>
            {detalleOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <label
            htmlFor="energia-detalle-select-f7"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
          >
            Detalle Energía
          </label>
        </div>
      )}
      {!(acuse === "Si" && acuseDetalle !== "No aplica") && (
        <div className="relative w-full">
          <select
            className={`peer p-4 pe-9 block w-full ${disabledClasses} border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2`}
            id="acuse-select-f7"
            value={acuse}
            onChange={(e) => {
              setAcuse(e.target.value);
              if (e.target.value !== "Si") setAcuseDetalle("");
              if (e.target.value === "Si") setAcuseDetalle("");
            }}
            disabled={disabled}
          >
            <option value="" hidden></option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
          <label
            htmlFor="acuse-select-f7"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
          >
            ¿Cuenta con acuse de cobro?
          </label>
        </div>
      )}
      {acuse === "Si" && acuseDetalle !== "No aplica" && (
        <div className="relative w-full">
          <select
            className={`peer p-4 pe-9 block w-full ${disabledClasses} border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2`}
            id="acuse-detalle-select-f7"
            value={acuseDetalle}
            onChange={(e) => {
              setAcuseDetalle(e.target.value);
              if (e.target.value === "No aplica") {
                setAcuse("No");
              }
            }}
            disabled={disabled}
          >
            <option value="" disabled selected>Selecciona alguno</option>
            {detalleOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <label
            htmlFor="acuse-detalle-select-f7"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
          >
            Detalle Acuse
          </label>
        </div>
      )}
      {!(fotografia === "Si" && fotografiaDetalle !== "No aplica") && (
        <div className="relative w-full">
          <select
            className={`peer p-4 pe-9 block w-full ${disabledClasses} border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2`}
            id="foto-select-f7"
            value={fotografia}
            onChange={(e) => {
              setFotografia(e.target.value);
              if (e.target.value !== "Si") setFotografiaDetalle("");
              if (e.target.value === "Si") setFotografiaDetalle("");
            }}
            disabled={disabled}
          >
            <option value="" hidden></option>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
          <label
            htmlFor="foto-select-f7"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
          >
            ¿Cuenta con fotografía del predio?
          </label>
        </div>
      )}
      {fotografia === "Si" && fotografiaDetalle !== "No aplica" && (
        <div className="relative w-full">
          <select
            className={`peer p-4 pe-9 block w-full ${disabledClasses} border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2`}
            id="foto-detalle-select-f7"
            value={fotografiaDetalle}
            onChange={(e) => {
              setFotografiaDetalle(e.target.value);
              if (e.target.value === "No aplica") {
                setFotografia("No");
              }
            }}
            disabled={disabled}
          >
            <option value="" disabled selected>Selecciona alguno</option>
            {detalleOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <label
            htmlFor="foto-detalle-select-f7"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
          >
            Detalle Fotografía
          </label>
        </div>
      )}
      <div className="relative w-full">
        <input
          type="text"
          className={`peer p-4 block w-full ${disabledClasses} border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2`}
          id="medidor-input-f7"
          placeholder=" "
          value={medidor}
          maxLength={15}
          onChange={(e) => setMedidor(sanitizeMedidor(e.target.value, 15))}
          onBlur={() => setMedidor((v) => v.trim().slice(0, 15))}
          onPaste={(e) => {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData("text");
            setMedidor(sanitizeMedidor(text, 15));
          }}
          disabled={disabled}
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="medidor-input-f7"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"        >
          Número de medidor
        </label>
      </div>
    </div>
  </div>
  );
});

export default CapturaVisitsF7;
