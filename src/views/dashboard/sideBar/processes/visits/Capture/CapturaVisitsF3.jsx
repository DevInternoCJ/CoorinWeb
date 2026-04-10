import React, { useState, useEffect, useMemo, forwardRef, useImperativeHandle } from "react";

// Funciones de validación de entrada (del C# AgregaEventosTxtKeyPress)
// Solo letras y números (txtOnlyNumbersLetters_KeyPress)
const filterOnlyNumbersLetters = (value) => value.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s]/g, "");

const CapturaVisitsF3 = forwardRef((props, ref) => {
  // Generar lista de años dinámicamente (últimos 21 años desde el año actual)
  // Esto viene del C# PreparaVentana(): for (int i = 0; i <= 20; i++) { Año = AñoActual - i; cmbAño.Items.Add(Año); }
  const anioOptionsDinamicos = useMemo(() => {
    const añoActual = new Date().getFullYear();
    const años = [{ value: "", label: "" }];
    for (let i = 0; i <= 20; i++) {
      const año = añoActual - i;
      años.push({ value: String(año), label: String(año) });
    }
    return años;
  }, []);
  // Estados para los campos del formulario
  const [mapeo, setMapeo] = useState("");
  const [marca, setMarca] = useState("");
  const [anio, setAnio] = useState("");
  const [modelo, setModelo] = useState("");
  const [placas, setPlacas] = useState("");

  // Estados para habilitar/deshabilitar campos
  const [camposEnabled, setCamposEnabled] = useState(false);

  // Exponer datos y métodos al padre vía ref
  useImperativeHandle(ref, () => ({
    getData: () => ({
      autoMapeo: mapeo || null,
      autoMarca: marca || null,
      autoModelo: modelo || null,
      autoAño: anio ? parseInt(anio, 10) : null,
      autoPlacas: placas || null
    }),
    reset: () => {
      setMapeo("");
      setMarca("");
      setModelo("");
      setAnio("");
      setPlacas("");
      setCamposEnabled(false);
    }
  }), [mapeo, marca, modelo, anio, placas]);

  // Efecto: Cuando cambia Mapeo
  useEffect(() => {
    // Siempre resetear los campos dependientes al cambiar mapeo
    setMarca("");
    setModelo("");
    setAnio("");
    setPlacas("");

    if (mapeo === "") {
      // Vacío: deshabilitar todos los campos
      setCamposEnabled(false);
    } else {
      // Con valor: habilitar todos los campos
      setCamposEnabled(true);
    }
  }, [mapeo]);

  // Validaciones y manejadores para Modelo (txtModelo)
  const handleModeloChange = (e) => {
    // Permitir solo letras y números y espacios, limitar a 50 caracteres
    const sanitized = filterOnlyNumbersLetters(e.target.value).slice(0, 50);
    setModelo(sanitized);
  };

  const handleModeloBlur = () => {
    // Recortar espacios al inicio/fin y asegurar máximo 50
    setModelo(prev => (prev || "").trim().slice(0, 50));
  };

  const handleModeloPaste = (e) => {
    try {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData('text');
      const sanitized = filterOnlyNumbersLetters(paste).slice(0, 50);
      setModelo(prev => ((prev || "") + sanitized).slice(0, 50));
    } catch {
      // ignore
    }
  };

  // Validaciones y manejadores para Placas (txtPlacas)
  const handlePlacasChange = (e) => {
    // Permitir solo letras y números, limitar a 10 caracteres y forzar mayúsculas
    const sanitized = filterOnlyNumbersLetters(e.target.value).slice(0, 10).toUpperCase();
    setPlacas(sanitized);
  };

  const handlePlacasBlur = () => {
    setPlacas(prev => (prev || "").trim().slice(0, 10).toUpperCase());
  };

  const handlePlacasPaste = (e) => {
    try {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData('text');
      const sanitized = filterOnlyNumbersLetters(paste).slice(0, 10).toUpperCase();
      setPlacas(prev => ((prev || "") + sanitized).slice(0, 10));
    } catch {
      // ignore
    }
  };

  // Opciones para los dropdowns
  const mapeoOptions = [
    { value: "", label: "" },
    { value: "A la vista de gestión", label: "A la vista de gestión" },
    { value: "No a la vista de gestión", label: "No a la vista de gestión" },
    { value: "En poder de familiar", label: "En poder de familiar" },
    { value: "En poder de tercero", label: "En poder de tercero" },
    { value: "No entregado por agencia", label: "No entregado por agencia" },
    { value: "Destinado servicio publico", label: "Destinado servicio publico" },
    { value: "Descompuesto/Deterioro", label: "Descompuesto/Deterioro" },
    { value: "Con Siniestro/Robo", label: "Con Siniestro/Robo" },
  ];

  const marcaOptions = [
    { value: "", label: "" },
    { value: "ABARTH", label: "ABARTH" },
    { value: "ACURA", label: "ACURA" },
    { value: "ALFA ROMEO", label: "ALFA ROMEO" },
    { value: "ASTON MARTIN", label: "ASTON MARTIN" },
    { value: "AUDI", label: "AUDI" },
    { value: "BENTLEY", label: "BENTLEY" },
    { value: "BMW", label: "BMW" },
    { value: "BUGATI", label: "BUGATI" },
    { value: "BUICK", label: "BUICK" },
    { value: "BYD", label: "BYD" },
    { value: "CADILLAC", label: "CADILLAC" },
    { value: "CATERHAM", label: "CATERHAM" },
    { value: "CHANG AN", label: "CHANG AN" },
    { value: "CHEVROLET", label: "CHEVROLET" },
    { value: "CHRYSLER", label: "CHRYSLER" },
    { value: "CITROEN", label: "CITROEN" },
    { value: "DACIA", label: "DACIA" },
    { value: "DAEWOO", label: "DAEWOO" },
    { value: "DAIHATSU", label: "DAIHATSU" },
    { value: "DFSK", label: "DFSK" },
    { value: "DODGE", label: "DODGE" },
    { value: "DS", label: "DS" },
    { value: "FAW", label: "FAW" },
    { value: "FERRARI", label: "FERRARI" },
    { value: "FIAT", label: "FIAT" },
    { value: "FORD", label: "FORD" },
    { value: "GENERAL MOTOR", label: "GENERAL MOTOR" },
    { value: "HOLDEN", label: "HOLDEN" },
    { value: "HONDA", label: "HONDA" },
    { value: "HUMMER", label: "HUMMER" },
    { value: "HYUNDAI", label: "HYUNDAI" },
    { value: "INFINITY", label: "INFINITY" },
    { value: "ISUZU", label: "ISUZU" },
    { value: "JAGUAR", label: "JAGUAR" },
    { value: "JEEP", label: "JEEP" },
    { value: "KIA", label: "KIA" },
    { value: "KOENIGSEGG", label: "KOENIGSEGG" },
    { value: "LADA", label: "LADA" },
    { value: "LAMBORGHINI", label: "LAMBORGHINI" },
    { value: "LANCIA", label: "LANCIA" },
    { value: "LAND ROVER", label: "LAND ROVER" },
    { value: "LEXUS", label: "LEXUS" },
    { value: "LINCOLN", label: "LINCOLN" },
    { value: "LOTUS", label: "LOTUS" },
    { value: "MAHINDRA", label: "MAHINDRA" },
    { value: "MASERATI", label: "MASERATI" },
    { value: "MAZDA", label: "MAZDA" },
    { value: "MC LAREN", label: "MC LAREN" },
    { value: "MERCEDEZ BENZ", label: "MERCEDEZ BENZ" },
    { value: "MERCURY", label: "MERCURY" },
    { value: "MG", label: "MG" },
    { value: "MINI", label: "MINI" },
    { value: "MITSUBISHI", label: "MITSUBISHI" },
    { value: "MORGAN", label: "MORGAN" },
    { value: "NISSAN", label: "NISSAN" },
    { value: "OLDSMOBILE", label: "OLDSMOBILE" },
    { value: "OPEL", label: "OPEL" },
    { value: "PAGANI", label: "PAGANI" },
    { value: "PEUGEOT", label: "PEUGEOT" },
    { value: "PININFARINA", label: "PININFARINA" },
    { value: "PLYMOUTH", label: "PLYMOUTH" },
    { value: "PONTIAC", label: "PONTIAC" },
    { value: "PORSCHE", label: "PORSCHE" },
    { value: "PROTON", label: "PROTON" },
    { value: "RAM", label: "RAM" },
    { value: "RENAULT", label: "RENAULT" },
    { value: "ROLLS ROYCE", label: "ROLLS ROYCE" },
    { value: "ROVER", label: "ROVER" },
    { value: "SAAB", label: "SAAB" },
    { value: "SATURN", label: "SATURN" },
    { value: "SCANIA", label: "SCANIA" },
    { value: "SEAT", label: "SEAT" },
    { value: "SHELBY", label: "SHELBY" },
    { value: "SKODA", label: "SKODA" },
    { value: "SMART", label: "SMART" },
    { value: "SRT", label: "SRT" },
    { value: "SSANGYONG", label: "SSANGYONG" },
    { value: "SUBARU", label: "SUBARU" },
    { value: "SUZUKI", label: "SUZUKI" },
    { value: "TATA", label: "TATA" },
    { value: "TESLA", label: "TESLA" },
    { value: "TOYOTA", label: "TOYOTA" },
    { value: "VAUXHALL", label: "VAUXHALL" },
    { value: "VENTURI", label: "VENTURI" },
    { value: "VOLKSWAGEN", label: "VOLKSWAGEN" },
    { value: "VOLVO", label: "VOLVO" },
    { value: "VUHL", label: "VUHL" },
  ];

  // Usar años generados dinámicamente (21 años hacia atrás desde el actual)
  const anioOptions = anioOptionsDinamicos;

  return (
  <div className="area-f5 p-2 rounded mb-2 h-full w-full sm:max-w-[540px]">
    <h3 className="font-bold text-sm mb-2">Auto – F3</h3>
    <div className="flex flex-col gap-2">
  <div className="relative w-full min-w-0">
        <select
          className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          id="mapeo-auto-select"
          value={mapeo}
          onChange={(e) => setMapeo(e.target.value)}
        >
          <option value="" disabled>Seleccione mapeo auto</option>
          {mapeoOptions.map((opt) => (
            <option key={opt.value} value={opt.value} hidden={opt.value === ""}>
              {opt.label}
            </option>
          ))}
        </select>
        <label
          htmlFor="mapeo-auto-select"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
        >
          Mapeo
        </label>
      </div>
  <div className="flex flex-row gap-1 items-stretch">
  <div className="relative basis-3/5 min-w-0">
          <select
            className={`peer p-4 pe-9 block w-full border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 ${
              camposEnabled ? "bg-gray-50" : "bg-gray-200 cursor-not-allowed opacity-60"
            }`}
            id="marca-select-f3"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            disabled={!camposEnabled}
          >
            <option value="" disabled>Seleccione marca</option>
            {marcaOptions.map((opt) => (
              <option key={opt.value} value={opt.value} hidden={opt.value === ""}>
                {opt.label}
              </option>
            ))}
          </select>
          <label
            htmlFor="marca-select-f3"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
          >
            Marca
          </label>
        </div>
  <div className="relative basis-2/5 min-w-0">
          <select
            className={`peer p-4 pe-9 block w-full border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 ${
              camposEnabled ? "bg-gray-50" : "bg-gray-200 cursor-not-allowed opacity-60"
            }`}
            id="anio-select-f3"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            disabled={!camposEnabled}
          >
            <option value="" disabled>Seleccione año</option>
            {anioOptions.map((opt) => (
              <option key={opt.value} value={opt.value} hidden={opt.value === ""}>
                {opt.label}
              </option>
            ))}
          </select>
          <label
            htmlFor="anio-select-f3"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
          >
            Año
          </label>
        </div>
      </div>
      {/* Modelo - input animado (alfanumérico - txtOnlyNumbersLetters_KeyPress) */}
  <div className="relative w-full min-w-0">
        <input
          type="text"
          id="modelo-input-f3"
          placeholder="Ingrese modelo"
          value={modelo}
          onChange={handleModeloChange}
          onBlur={handleModeloBlur}
          onPaste={handleModeloPaste}
          maxLength={50}
          disabled={!camposEnabled}
          className={`peer p-4 block w-full border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 placeholder:text-transparent focus:placeholder:text-gray-500 ${
            camposEnabled ? "bg-gray-50" : "bg-gray-200 cursor-not-allowed opacity-60"
          }`}
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="modelo-input-f3"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
        >
          Modelo
        </label>
      </div>
      {/* Placas - input animado (alfanumérico - txtOnlyNumbersLetters_KeyPress) */}
  <div className="relative w-full min-w-0">
        <input
          type="text"
          id="placas-input-f3"
          placeholder="Ingrese placas"
          value={placas}
          onChange={handlePlacasChange}
          onBlur={handlePlacasBlur}
          onPaste={handlePlacasPaste}
          maxLength={10}
          disabled={!camposEnabled}
          className={`peer p-4 block w-full border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 placeholder:text-transparent focus:placeholder:text-gray-500 ${
            camposEnabled ? "bg-gray-50" : "bg-gray-200 cursor-not-allowed opacity-60"
          }`}
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="placas-input-f3"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
        >
          Placas
        </label>
      </div>
    </div>
  </div>
  );
});

export default CapturaVisitsF3;
