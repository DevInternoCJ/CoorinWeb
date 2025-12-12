import React, { useState, useEffect, useMemo, forwardRef, useImperativeHandle } from "react";
import { getCatalogoValueCard } from "../../../../../../services/mark/albaz/LokiServices";

// IDs de catálogos del C# LlenaComboBox()
const ID_CATALOGO_SUCURSALES = 1;
const ID_CATALOGO_SITUACIONES = 2;
const ID_CATALOGO_CONTACTOS = 5;
const ID_CATALOGO_CAUSAS_NO_PAGO = 10;
const ID_CATALOGO_PARENTESCOS = 11;

// Funciones de validación de entrada (del C# AgregaEventosTxtKeyPress)
// Solo letras y espacios (txtOnlyChars_KeyPress)
const filterOnlyChars = (value) => value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, "");
// Solo números (txtOnlyNumbers_KeyPress)
const filterOnlyNumbers = (value) => value.replace(/[^0-9]/g, "");
// Números y punto decimal (txtOnlyNumbersPoint_KeyPress)
const filterOnlyNumbersPoint = (value) => {
  // Permitir solo un punto decimal
  const filtered = value.replace(/[^0-9.]/g, "");
  const parts = filtered.split(".");
  if (parts.length > 2) {
    return parts[0] + "." + parts.slice(1).join("");
  }
  return filtered;
};

// Función para calcular fechas con restricciones del C# PreparaVentana()
// Fecha Visita: max = hoy, min = hoy - 30 días
// Fecha Negociación: max = hoy + 7 días, min = hoy - 30 días
const getFechaLimites = () => {
  const hoy = new Date();
  const formatDate = (date) => date.toISOString().split('T')[0];
  
  // Fecha Visita: desde hace 30 días hasta hoy
  const fechaVisitaMin = new Date(hoy);
  fechaVisitaMin.setDate(hoy.getDate() - 30);
  const fechaVisitaMax = hoy;
  
  // Fecha Negociación/Pago: desde hace 30 días hasta 7 días adelante
  const fechaNegociacionMin = new Date(hoy);
  fechaNegociacionMin.setDate(hoy.getDate() - 30);
  const fechaNegociacionMax = new Date(hoy);
  fechaNegociacionMax.setDate(hoy.getDate() + 7);
  
  return {
    visita: {
      min: formatDate(fechaVisitaMin),
      max: formatDate(fechaVisitaMax),
      default: formatDate(hoy)
    },
    negociacion: {
      min: formatDate(fechaNegociacionMin),
      max: formatDate(fechaNegociacionMax),
      default: formatDate(hoy)
    }
  };
};

// Los catálogos se cargan dinámicamente desde el servicio getCatalogoValueCard()

// Filtros de contactos según mapeo de vivienda (del código C#)
const CONTACTO_FILTERS = {
  "Ilocalizable": [1110, 1113, 1114, 1115, 1127, 1128],
  "Habitada Titular": [1101, 1118],
  "Deshabitada": [1114],
  "Correo devuelto": [1103, 1113, 1115, 1116, 1117, 1127, 1128],
  "Existe domicilio": [1112, 1114, 1116, 1117, 1118],
  "Habitada Tercero": [1102, 1103],
  "Vandalizada": [1112],
};

// Filtros de situaciones según mapeo de vivienda (del código C#)
const SITUACION_FILTERS = {
  "Habitada Titular": [1004, 1008, 1028, 1013, 1015, 1016],
  "Habitada Tercero": [1002, 1011, 1018],
};

const CapturaVisitsF4 = forwardRef(({ mapeoVivienda = "" }, ref) => {
  // Calcular límites de fechas una vez (memoizado)
  const fechaLimites = useMemo(() => getFechaLimites(), []);
  
  // Estados para los campos del formulario
  const [contacto, setContacto] = useState("");
  const [atendio, setAtendio] = useState("");
  const [parentesco, setParentesco] = useState("");
  const [situacion, setSituacion] = useState("");
  const [noPago, setNoPago] = useState("");
  // Fecha Visita: valor inicial = hoy (según PreparaVentana)
  const [visita, setVisita] = useState(fechaLimites.visita.default);
  const [hora, setHora] = useState("");
  const [visitador, setVisitador] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [paquete, setPaquete] = useState("");
  // Fecha Negociación: valor inicial = hoy (según PreparaVentana)
  const [fechaPago, setFechaPago] = useState(fechaLimites.negociacion.default);
  const [monto, setMonto] = useState("");
  const [observacion, setObservacion] = useState("");

  // Estados para habilitar/deshabilitar campos
  const [parentescoEnabled, setParentescoEnabled] = useState(false);
  const [situacionEnabled, setSituacionEnabled] = useState(false);
  const [noPagoEnabled, setNoPagoEnabled] = useState(false);
  const [montoEnabled, setMontoEnabled] = useState(false);
  const [fechaPagoEnabled, setFechaPagoEnabled] = useState(false);

  // Estados para opciones de catálogos dinámicos (LlenaComboBox del C#)
  const [opcionesContacto, setOpcionesContacto] = useState([]);
  const [opcionesSituacion, setOpcionesSituacion] = useState([]);
  const [opcionesParentesco, setOpcionesParentesco] = useState([]);
  const [opcionesCausaNoPago, setOpcionesCausaNoPago] = useState([]);
  const [opcionesSucursal, setOpcionesSucursal] = useState([]);

  // Cargar catálogos al montar el componente (equivalente a LlenaComboBox del C#)
  useEffect(() => {
    getCatalogoValueCard()
      .then((data) => {
        if (Array.isArray(data)) {
          setOpcionesContacto(data.filter(item => item.idCatálogo === ID_CATALOGO_CONTACTOS));
          setOpcionesSituacion(data.filter(item => item.idCatálogo === ID_CATALOGO_SITUACIONES));
          setOpcionesParentesco(data.filter(item => item.idCatálogo === ID_CATALOGO_PARENTESCOS));
          setOpcionesCausaNoPago(data.filter(item => item.idCatálogo === ID_CATALOGO_CAUSAS_NO_PAGO));
          setOpcionesSucursal(data.filter(item => item.idCatálogo === ID_CATALOGO_SUCURSALES));
        }
      })
      .catch((error) => {
        console.error("Error al cargar catálogos F4:", error);
      });
  }, []);

  // Exponer datos y métodos al padre vía ref
  useImperativeHandle(ref, () => ({
    getData: () => {
      // Obtener el idValor del contacto seleccionado de los catálogos dinámicos
      const contactoObj = opcionesContacto.find(opt => opt.idValor === parseInt(contacto, 10));
      const situacionObj = opcionesSituacion.find(opt => opt.idValor === parseInt(situacion, 10));
      const parentescoObj = opcionesParentesco.find(opt => opt.idValor === parseInt(parentesco, 10));
      const noPagoObj = opcionesCausaNoPago.find(opt => opt.idValor === parseInt(noPago, 10));
      
      return {
        idContacto: contactoObj?.idValor || null,
        valorContacto: contactoObj?.valor || null, // Texto del contacto para validaciones
        atendio: atendio || null,
        idParentesco: parentescoEnabled && parentescoObj?.idValor ? parentescoObj.idValor : null,
        idSituacion: situacionEnabled && situacionObj?.idValor ? situacionObj.idValor : null,
        valorSituacion: situacionObj?.valor || null, // Texto de situación para validaciones
        idCausaNoPago: noPagoEnabled && noPagoObj?.idValor ? noPagoObj.idValor : null,
        fechaVisita: visita || null,
        horaVisita: hora || null,
        usuarioVisitador: visitador || null,
        idSucursal: sucursal ? parseInt(sucursal, 10) : null,
        paquete: paquete ? parseInt(paquete, 10) : null,
        fechaPagoNegociacion: fechaPagoEnabled ? fechaPago || null : null,
        montoNegociacion: montoEnabled && monto ? parseFloat(monto) : null,
        comentario: observacion || null
      };
    },
    reset: () => {
      setContacto("");
      setAtendio("");
      setParentesco("");
      setSituacion("");
      setNoPago("");
      // Al resetear, volver a los valores por defecto (hoy)
      setVisita(fechaLimites.visita.default);
      setHora("");
      setVisitador("");
      setSucursal("");
      setPaquete("");
      setFechaPago(fechaLimites.negociacion.default);
      setMonto("");
      setObservacion("");
      setParentescoEnabled(false);
      setSituacionEnabled(false);
      setNoPagoEnabled(false);
      setMontoEnabled(false);
      setFechaPagoEnabled(false);
    }
  }), [contacto, atendio, parentesco, situacion, noPago, visita, hora, visitador, sucursal, paquete, fechaPago, monto, observacion, parentescoEnabled, situacionEnabled, noPagoEnabled, montoEnabled, fechaPagoEnabled, fechaLimites, opcionesContacto, opcionesSituacion, opcionesParentesco, opcionesCausaNoPago]);

  // Efecto: Cuando cambia Contacto
  useEffect(() => {
    // Resetear campos dependientes
    setParentesco("");
    setSituacion("");
    setNoPago("");

    // Buscar el contacto seleccionado por idValor
    const contactoSeleccionado = opcionesContacto.find(opt => opt.idValor === parseInt(contacto, 10));
    const valorContacto = contactoSeleccionado?.valor || "";

    if (contacto === "") {
      // Vacío: deshabilitar todo
      setParentescoEnabled(false);
      setSituacionEnabled(false);
      setNoPagoEnabled(false);
      setMontoEnabled(false);
      setMonto("");
      setFechaPagoEnabled(false);
    } else if (valorContacto === "Titular") {
      // Titular: habilitar situación, no pago, monto, fecha pago
      setParentescoEnabled(false);
      setSituacionEnabled(true);
      setNoPagoEnabled(true);
      setMontoEnabled(true);
      setMonto("");
      setFechaPagoEnabled(true);
    } else if (valorContacto === "Le conoce") {
      // Le conoce: habilitar parentesco y situación
      setParentescoEnabled(true);
      setSituacionEnabled(true);
      setNoPagoEnabled(false);
      setMontoEnabled(false);
      setMonto("");
      setFechaPagoEnabled(false);
    } else {
      // Otros: deshabilitar todo
      setParentescoEnabled(false);
      setSituacionEnabled(false);
      setNoPagoEnabled(false);
      setMontoEnabled(false);
      setFechaPagoEnabled(false);
    }
  }, [contacto, opcionesContacto]);

  // Efecto: Cuando cambia Situación
  useEffect(() => {
    // Buscar la situación seleccionada por idValor
    const situacionSeleccionada = opcionesSituacion.find(opt => opt.idValor === parseInt(situacion, 10));
    const valorSituacion = situacionSeleccionada?.valor || "";
    
    // Situaciones que habilitan Monto y Fecha Pago
    const situacionesConMonto = [
      "Conocido responsabiliza",
      "Aclaración",
      "Acuerdo en visita",
      "Promesa en visita",
      "Reporte de pago",
      ""
    ];
    
    if (situacionesConMonto.includes(valorSituacion)) {
      setMontoEnabled(true);
      setFechaPagoEnabled(true);
    } else {
      setMontoEnabled(false);
      setMonto("");
      setFechaPagoEnabled(false);
    }
  }, [situacion, opcionesSituacion]);

  // Opciones filtradas según mapeo de vivienda (usando catálogos dinámicos)
  const contactoOptions = useMemo(() => {
    if (!mapeoVivienda || !CONTACTO_FILTERS[mapeoVivienda]) {
      return opcionesContacto;
    }
    const allowedIds = CONTACTO_FILTERS[mapeoVivienda];
    return opcionesContacto.filter(opt => allowedIds.includes(opt.idValor));
  }, [mapeoVivienda, opcionesContacto]);

  const situacionOptions = useMemo(() => {
    if (!mapeoVivienda || !SITUACION_FILTERS[mapeoVivienda]) {
      return opcionesSituacion;
    }
    const allowedIds = SITUACION_FILTERS[mapeoVivienda];
    return opcionesSituacion.filter(opt => allowedIds.includes(opt.idValor));
  }, [mapeoVivienda, opcionesSituacion]);

  // Efecto: Resetear campos cuando cambia el mapeo de vivienda
  useEffect(() => {
    // Resetear todos los campos cuando cambia el mapeo
    setContacto("");
    setAtendio("");
    setParentesco("");
    setSituacion("");
    setNoPago("");
    setMonto("");
    // Restablecer fechas a sus valores por defecto
    setVisita(fechaLimites.visita.default);
    setFechaPago(fechaLimites.negociacion.default);
    
    // Deshabilitar campos por defecto
    setParentescoEnabled(false);
    setSituacionEnabled(false);
    setNoPagoEnabled(false);
    setMontoEnabled(false);
    setFechaPagoEnabled(false);
  }, [mapeoVivienda, fechaLimites]);

  // Validaciones y manejadores para Atendio (txtAtendio)
  const handleAtendioChange = (e) => {
    // Solo letras y espacios, limitar a 50 caracteres
    const sanitized = filterOnlyChars(e.target.value).slice(0, 50);
    setAtendio(sanitized);
  };

  const handleAtendioBlur = () => {
    setAtendio(prev => (prev || "").trim().slice(0, 50));
  };

  const handleAtendioPaste = (e) => {
    try {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData('text');
      const sanitized = filterOnlyChars(paste).slice(0, 50);
      setAtendio(prev => ((prev || "") + sanitized).slice(0, 50));
    } catch {
      // ignore
    }
  };

  // Validaciones y manejadores para Visitador (lblVisitador / txtVisitador)
  const handleVisitadorChange = (e) => {
    // Solo letras y espacios, limitar a 50 caracteres
    const sanitized = filterOnlyChars(e.target.value).slice(0, 50);
    setVisitador(sanitized);
  };

  const handleVisitadorBlur = () => {
    setVisitador(prev => (prev || "").trim().slice(0, 50));
  };

  const handleVisitadorPaste = (e) => {
    try {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData('text');
      const sanitized = filterOnlyChars(paste).slice(0, 50);
      setVisitador(prev => ((prev || "") + sanitized).slice(0, 50));
    } catch {
      // ignore
    }
  };

  // Validaciones y manejadores para Paquete (txtPaquete)
  const handlePaqueteChange = (e) => {
    // Paquete en código original se trata como numérico: permitir solo números, limitar a 9
    const sanitized = filterOnlyNumbers(e.target.value).slice(0, 9);
    setPaquete(sanitized);
  };

  const handlePaqueteBlur = () => {
    setPaquete(prev => (prev || "").trim().slice(0, 9));
  };

  const handlePaquetePaste = (e) => {
    try {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData('text');
      const sanitized = filterOnlyNumbers(paste).slice(0, 9);
      setPaquete(prev => ((prev || "") + sanitized).slice(0, 9));
    } catch {
      // ignore
    }
  };

  // Validaciones y manejadores para Observación (lblObservacion / textarea)
  const sanitizeObservacion = (s) => {
    if (!s) return "";
    const str = String(s);
    let out = "";
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      // permitir tab (9), LF (10), CR (13) y cualquier caracter >= 32
      if (code === 9 || code === 10 || code === 13 || code >= 32) {
        out += str[i];
      }
    }
    return out;
  };

  const handleObservacionChange = (e) => {
    const sanitized = sanitizeObservacion(e.target.value).slice(0, 500);
    setObservacion(sanitized);
  };

  const handleObservacionBlur = () => {
    setObservacion(prev => (sanitizeObservacion(prev || "").trim().slice(0, 500)));
  };

  const handleObservacionPaste = (e) => {
    try {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData('text');
      const sanitized = sanitizeObservacion(paste).slice(0, 500);
      setObservacion(prev => ((prev || "") + sanitized).slice(0, 500));
    } catch {
      // ignore
    }
  };

  // Validaciones y manejadores para Monto (txtMonto)
  const handleMontoChange = (e) => {
    // Permitir sólo números y un punto decimal, limitar a 9 caracteres
    const sanitized = filterOnlyNumbersPoint(e.target.value).slice(0, 9);
    setMonto(sanitized);
  };

  const handleMontoBlur = () => {
    // Recortar espacios, eliminar punto final si existe y limitar longitud
    setMonto(prev => {
      const v = (prev || "").trim().slice(0, 9);
      return v.endsWith('.') ? v.slice(0, -1) : v;
    });
  };

  const handleMontoPaste = (e) => {
    try {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData('text');
      const sanitized = filterOnlyNumbersPoint(paste).slice(0, 9);
      setMonto(prev => ((prev || "") + sanitized).slice(0, 9));
    } catch {
      // ignore
    }
  };

  return (
  <div className="area-f4 p-2 rounded mb-2">
    <h3 className="font-bold text-sm mb-2">Visita – F4</h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {/* Row 1 */}
  <div className="relative w-full min-w-0 sm:max-w-none">
        <select
          className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          id="contacto-select-f4"
          value={contacto}
          onChange={(e) => setContacto(e.target.value)}
        >
          <option value="" hidden></option>
          {contactoOptions.map((opt) => (
            <option key={opt.idValor} value={opt.idValor}>
              {opt.valor}
            </option>
          ))}
        </select>
        <label
          htmlFor="contacto-select-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
        >
          Contacto
        </label>
      </div>
  <div className="relative w-full min-w-0 sm:col-span-2">
        <input
          type="text"
          className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          id="atendio-input-f4"
          placeholder=" "
          value={atendio}
          onChange={handleAtendioChange}
          onBlur={handleAtendioBlur}
          onPaste={handleAtendioPaste}
          maxLength={50}
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="atendio-input-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
        >
          Atendió
        </label>
      </div>
      {/* Row 2 */}
  <div className="relative w-full min-w-0">
        <select
          className={`peer p-4 pe-9 block w-full border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 ${
            parentescoEnabled ? "bg-gray-50" : "bg-gray-200 cursor-not-allowed opacity-60"
          }`}
          id="parentesco-select-f4"
          value={parentesco}
          onChange={(e) => setParentesco(e.target.value)}
          disabled={!parentescoEnabled}
        >
          <option value="" hidden></option>
          {opcionesParentesco.map((opt) => (
            <option key={opt.idValor} value={opt.idValor}>
              {opt.valor}
            </option>
          ))}
        </select>
        <label
          htmlFor="parentesco-select-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
        >
          Parentesco
        </label>
      </div>
  <div className="relative w-full min-w-0">
        <select
          className={`peer p-4 pe-9 block w-full border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 ${
            situacionEnabled ? "bg-gray-50" : "bg-gray-200 cursor-not-allowed opacity-60"
          }`}
          id="situacion-select-f4"
          value={situacion}
          onChange={(e) => setSituacion(e.target.value)}
          disabled={!situacionEnabled}
        >
          <option value="" hidden></option>
          {situacionOptions.map((opt) => (
            <option key={opt.idValor} value={opt.idValor}>
              {opt.valor}
            </option>
          ))}
        </select>
        <label
          htmlFor="situacion-select-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
        >
          Situación
        </label>
      </div>
  <div className="relative w-full min-w-0">
        <select
          className={`peer p-4 pe-9 block w-full border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 ${
            noPagoEnabled ? "bg-gray-50" : "bg-gray-200 cursor-not-allowed opacity-60"
          }`}
          id="nopago-select-f4"
          value={noPago}
          onChange={(e) => setNoPago(e.target.value)}
          disabled={!noPagoEnabled}
        >
          <option value="" hidden></option>
          {opcionesCausaNoPago.map((opt) => (
            <option key={opt.idValor} value={opt.idValor}>
              {opt.valor}
            </option>
          ))}
        </select>
        <label
          htmlFor="nopago-select-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
        >
          No Pago
        </label>
      </div>
      {/* Row 3 */}
      {/* Visita - calendario con label flotante */}
      {/* Restricciones del C#: min = hoy - 30 días, max = hoy */}
  <div className="relative w-full min-w-0">
        <input
          type="date"
          id="visita-date-f4"
          placeholder=" "
          value={visita}
          onChange={(e) => setVisita(e.target.value)}
          min={fechaLimites.visita.min}
          max={fechaLimites.visita.max}
          className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="visita-date-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
        >
          Visita
        </label>
      </div>
      {/* Hora - timer con label flotante */}
  <div className="relative w-full min-w-0">
        <input
          type="time"
          id="hora-time-f4"
          placeholder=" "
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="hora-time-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
        >
          Hora
        </label>
      </div>
  <div className="relative w-full min-w-0">
        <input
          type="text"
          className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          id="visitador-input-f4"
          placeholder=" "
          value={visitador}
          onChange={handleVisitadorChange}
          onBlur={handleVisitadorBlur}
          onPaste={handleVisitadorPaste}
          maxLength={50}
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="visitador-input-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
        >
          Visitador
        </label>
      </div>
      {/* Row 4 */}
  <div className="relative w-full min-w-0">
        <select
          className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          id="sucursal-select-f4"
          value={sucursal}
          onChange={(e) => setSucursal(e.target.value)}
        >
          <option value="" hidden></option>
          {opcionesSucursal.map((opt) => (
            <option key={opt.idValor} value={opt.idValor}>
              {opt.valor}
            </option>
          ))}
        </select>
        <label
          htmlFor="sucursal-select-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
        >
          Sucursal
        </label>
      </div>
  <div className="relative w-full min-w-0">
        <input
          type="text"
          className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
          id="paquete-input-f4"
          placeholder=" "
          value={paquete}
          onChange={handlePaqueteChange}
          onBlur={handlePaqueteBlur}
          onPaste={handlePaquetePaste}
          maxLength={9}
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="paquete-input-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
        >
          Paquete
        </label>
      </div>
      {/* Fecha Pago/Negociación - calendario con label flotante */}
      {/* Restricciones del C#: min = hoy - 30 días, max = hoy + 7 días */}
      <div className="relative w-full min-w-0">
        <input
          type="date"
          id="fechapago-date-f4"
          placeholder=" "
          value={fechaPago}
          onChange={(e) => setFechaPago(e.target.value)}
          disabled={!fechaPagoEnabled}
          min={fechaLimites.negociacion.min}
          max={fechaLimites.negociacion.max}
          className={`peer p-4 block w-full border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 ${
            fechaPagoEnabled ? "bg-gray-50" : "bg-gray-200 cursor-not-allowed opacity-60"
          }`}
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="fechapago-date-f4"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
        >
          Fecha Pago
        </label>
      </div>

      {/* Monto debajo de Fecha Pago, alineado derecha en desktop */}
      <div className="sm:col-start-3 sm:row-start-auto w-full min-w-0">
        <div className="relative w-full min-w-0">
          <input
            type="text"
            className={`peer p-4 block w-full border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 ${
              montoEnabled ? "bg-gray-50" : "bg-gray-200 cursor-not-allowed opacity-60"
            }`}
              id="monto-input-f4"
              placeholder=" "
              value={monto}
              onChange={handleMontoChange}
              onBlur={handleMontoBlur}
              onPaste={handleMontoPaste}
              maxLength={9}
              disabled={!montoEnabled}
              style={{ color: 'var(--color-jerarquia3)' }}
          />
          <label
            htmlFor="monto-input-f4"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"
          >
            Monto
          </label>
        </div>
      </div>

      {/* Observación */}
      <div className="sm:col-span-3 w-full min-w-0 mt-4">
        <div className="sm:col-span-2 flex flex-col gap-1 w-full min-w-0">
          <label className="block text-xs mb-1">Observación</label>
        </div>
        <textarea
          className="px-4 p-1 block w-full min-w-0 rounded-lg sm:text-sm bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1"
          style={{ color: 'var(--color-jerarquia3)', minHeight: '8.2rem', height: '8.2rem' }}
          rows={4}
          value={observacion}
          onChange={handleObservacionChange}
          onBlur={handleObservacionBlur}
          onPaste={handleObservacionPaste}
          maxLength={500}
        />
      </div>
    </div>
  </div>
  );
});

export default CapturaVisitsF4;
