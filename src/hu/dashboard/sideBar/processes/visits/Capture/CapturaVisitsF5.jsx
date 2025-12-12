import React, { useState, forwardRef, useImperativeHandle } from "react";

// Función de validación de entrada (del C# AgregaEventosTxtKeyPress)
// Solo letras y números (txtOnlyNumbersLetters_KeyPress) - para calles
const filterOnlyNumbersLetters = (value) => value.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,#-]/g, "");

// Sanitiza cadenas de calle: elimina caracteres de control y limita longitud
const sanitizeStreet = (value, maxLen = 100) => {
  if (!value) return "";
  // eliminar chars de control (permitir desde código 32 en adelante)
  let out = "";
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (code >= 32) out += value[i];
  }
  // aplicar filtro de caracteres permitidos y recortar a maxLen
  out = filterOnlyNumbersLetters(out);
  if (out.length > maxLen) out = out.slice(0, maxLen);
  return out;
};
const CapturaVisitsF5 = forwardRef(({ disabled = false }, ref) => {
  // Estados para los campos
  const [calleNorte, setCalleNorte] = useState("");
  const [calleSur, setCalleSur] = useState("");
  const [calleEste, setCalleEste] = useState("");
  const [calleOeste, setCalleOeste] = useState("");

  // Exponer datos y métodos al padre vía ref
  useImperativeHandle(ref, () => ({
    getData: () => ({
      calleHorizontalNorte: calleNorte || null,
      calleHorizontalSur: calleSur || null,
      calleVerticalEste: calleEste || null,
      calleVerticalOeste: calleOeste || null
    }),
    reset: () => {
      setCalleNorte("");
      setCalleSur("");
      setCalleEste("");
      setCalleOeste("");
    },
    // Retorna array de calles vacías para advertencia
    getEmptyStreets: () => {
      const empty = [];
      if (!calleNorte.trim()) empty.push("Horizontal norte");
      if (!calleSur.trim()) empty.push("Horizontal sur");
      if (!calleEste.trim()) empty.push("Vertical este");
      if (!calleOeste.trim()) empty.push("Vertical oeste");
      return empty;
    }
  }), [calleNorte, calleSur, calleEste, calleOeste]);

  // Clases dinámicas para campos habilitados/deshabilitados (equivalente a grpCalles.Enabled)
  const disabledClasses = disabled ? "bg-gray-100 cursor-not-allowed opacity-60 text-gray-600" : "bg-gray-50 text-gray-700";

  return (
    <div className="area-f5 p-2 rounded mb-2 h-full w-full">
      <h3 className="font-bold text-sm mb-2">Entre Calles – F5</h3>
      <div className="flex flex-col gap-2">
  <div className="relative w-full min-w-0">
        <input
          type="text"
          className={`peer p-4 block w-full ${disabledClasses} border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2`}
          id="calle-norte-input-f5"
          placeholder=" "
          value={calleNorte}
          maxLength={100}
          onChange={(e) => setCalleNorte(sanitizeStreet(e.target.value, 100))}
          onBlur={() => setCalleNorte((v) => v.trim().slice(0, 100))}
          onPaste={(e) => {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData("text");
            setCalleNorte(sanitizeStreet(text, 100));
          }}
          disabled={disabled}
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="calle-norte-input-f5"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"        >
          Calle Horiznl Norte
        </label>
      </div>
  <div className="relative w-full min-w-0">
        <input
          type="text"
          className={`peer p-4 block w-full ${disabledClasses} border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2`}
          id="calle-sur-input-f5"
          placeholder=" "
          value={calleSur}
          maxLength={100}
          onChange={(e) => setCalleSur(sanitizeStreet(e.target.value, 100))}
          onBlur={() => setCalleSur((v) => v.trim().slice(0, 100))}
          onPaste={(e) => {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData("text");
            setCalleSur(sanitizeStreet(text, 100));
          }}
          disabled={disabled}
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="calle-sur-input-f5"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"        >
          Calle Horiznl Sur
        </label>
      </div>
  <div className="relative w-full min-w-0">
        <input
          type="text"
          className={`peer p-4 block w-full ${disabledClasses} border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2`}
          id="calle-este-input-f5"
          placeholder=" "
          value={calleEste}
          maxLength={100}
          onChange={(e) => setCalleEste(sanitizeStreet(e.target.value, 100))}
          onBlur={() => setCalleEste((v) => v.trim().slice(0, 100))}
          onPaste={(e) => {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData("text");
            setCalleEste(sanitizeStreet(text, 100));
          }}
          disabled={disabled}
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="calle-este-input-f5"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"        >
          Calle Vert Este
        </label>
      </div>
  <div className="relative w-full min-w-0">
        <input
          type="text"
          className={`peer p-4 block w-full ${disabledClasses} border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2`}
          id="calle-ost-input-f5"
          placeholder=" "
          value={calleOeste}
          maxLength={100}
          onChange={(e) => setCalleOeste(sanitizeStreet(e.target.value, 100))}
          onBlur={() => setCalleOeste((v) => v.trim().slice(0, 100))}
          onPaste={(e) => {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData("text");
            setCalleOeste(sanitizeStreet(text, 100));
          }}
          disabled={disabled}
          style={{ color: 'var(--color-jerarquia3)' }}
        />
        <label
          htmlFor="calle-ost-input-f5"
          className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-4 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-gray-500"        >
          Calle Vert Ost.
        </label>
      </div>
    </div>
  </div>
  );
});

export default CapturaVisitsF5;
