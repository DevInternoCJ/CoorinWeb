/**
 * FloatingInput — Componente reutilizable de input con label flotante
 * Patrón: Preline floating label (equivalente a FloatingSelect para inputs de texto)
 * Soporta: modo claro / oscuro · tipo de input · ícono opcional · hint / error inline
 *
 * @param {string}   id          — ID único del input (requerido para a11y)
 * @param {string}   label       — Texto del label flotante
 * @param {string}   value       — Valor controlado
 * @param {Function} onChange    — Handler de cambio (e) => void
 * @param {string}   type        — Tipo de input HTML (default: "text")
 * @param {boolean}  required    — Muestra asterisco y agrega validación HTML5
 * @param {boolean}  disabled    — Deshabilita el input
 * @param {boolean}  readOnly    — Solo lectura
 * @param {string}   className   — Clases extra para el wrapper
 * @param {React.ReactNode} icon — Ícono SVG opcional (se renderiza a la izquierda)
 * @param {string}   hint        — Texto de ayuda debajo del input
 * @param {string}   error       — Mensaje de error (reemplaza hint y pone borde rojo)
 * @param {string}   size        — "sm" | "md" (default) | "lg"
 * @param {number}   maxLength   — maxLength nativo del input
 * @param {string}   autoComplete — autocomplete nativo
 * @param {Function} onBlur      — Handler blur
 * @param {Function} onFocus     — Handler focus
 * @param {Function} onKeyDown   — Handler keydown
 */
import React from "react";

const SIZE_MAP = {
  sm: {
    input:    "ps-3 pe-3 pt-4 pb-1 text-xs",
    label:    "ps-3 text-xs",
    icon:     "w-4 h-4",
    iconWrap: "left-3 top-1/2 -translate-y-1/2",
  },
  md: {
    input:    "ps-4 pe-4 pt-5 pb-2 text-sm",
    label:    "ps-4 text-sm",
    icon:     "w-4 h-4",
    iconWrap: "left-4 top-1/2 -translate-y-1/2",
  },
  lg: {
    input:    "ps-5 pe-5 pt-6 pb-2 text-base",
    label:    "ps-5 text-base",
    icon:     "w-5 h-5",
    iconWrap: "left-5 top-1/2 -translate-y-1/2",
  },
};

const FloatingInput = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  disabled = false,
  readOnly = false,
  className = "",
  icon = null,
  hint = "",
  error = "",
  size = "md",
  maxLength,
  autoComplete,
  onBlur,
  onFocus,
  onKeyDown,
  ...rest
}) => {
  const s = SIZE_MAP[size] || SIZE_MAP.md;

  const hasValue =
    value !== "" && value !== null && value !== undefined;

  const hasError = Boolean(error);

  // Padding izquierdo dinámico si hay ícono
  const inputPaddingStart = icon
    ? s.input.replace(/ps-\S+/, "ps-10")
    : s.input;

  return (
    <div className={`floating-input-wrapper relative ${className}`}>
      {/* Ícono opcional */}
      {icon && (
        <span
          className={`absolute ${s.iconWrap} pointer-events-none text-[var(--color-text-muted)] z-10`}
          aria-hidden="true"
        >
          <span className={s.icon}>{icon}</span>
        </span>
      )}

      {/* Input */}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        autoComplete={autoComplete}
        placeholder=" "
        className={[
          "peer block w-full rounded-lg",
          // Borde: rojo si hay error, normal en caso contrario
          hasError
            ? "border border-[var(--color-btn-danger-text,#b91c1c)] focus:ring-[var(--color-btn-danger-text,#b91c1c)]"
            : "border border-[var(--color-border)] focus:ring-[var(--color-jerarquia2)] focus:border-[var(--color-jerarquia2)]",
          "bg-[var(--color-surface-secondary)]",
          "text-[var(--color-text-primary)]",
          "transition-colors duration-150",
          // Padding dinámico
          inputPaddingStart,
          // Label flotante via peer (mantiene espacio cuando hay valor)
          "focus:pt-5 focus:pb-1",
          hasValue ? "pt-5 pb-1" : "",
          // Focus ring
          "focus:outline-none focus:ring-2",
          // disabled / readonly
          "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
          readOnly ? "cursor-default" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-invalid={hasError ? "true" : undefined}
        aria-describedby={
          hasError ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        {...rest}
      />

      {/* Label flotante */}
      <label
        htmlFor={id}
        className={[
          "floating-select-label",
          "absolute top-0 start-0 h-full",
          s.label,
          "flex items-center",
          "pointer-events-none",
          "transition-all ease-in-out duration-150",
          hasError
            ? "text-[var(--color-btn-danger-text,#b91c1c)]"
            : "text-[var(--color-text-muted)]",
          // Focus: label sube y cambia tamaño
          "peer-focus:text-[10px] peer-focus:font-medium",
          hasError
            ? "peer-focus:-translate-y-2 peer-focus:text-[var(--color-btn-danger-text,#b91c1c)]"
            : "peer-focus:-translate-y-2 peer-focus:text-[var(--color-jerarquia3)]",
          // Con valor: label permanece arriba
          hasValue
            ? hasError
              ? "text-[10px] font-medium -translate-y-2 text-[var(--color-btn-danger-text,#b91c1c)]"
              : "text-[10px] font-medium -translate-y-2 text-[var(--color-jerarquia3)]"
            : "",
          // Disabled
          "peer-disabled:opacity-50",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {label}
        {required && (
          <span
            className="ml-0.5 text-[var(--color-btn-danger-text)]"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </label>

      {/* Hint o error debajo del input */}
      {(hasError || hint) && (
        <p
          id={hasError ? `${id}-error` : `${id}-hint`}
          className={[
            "mt-1 text-xs px-1",
            hasError
              ? "text-[var(--color-btn-danger-text,#b91c1c)]"
              : "text-[var(--color-text-muted)]",
          ].join(" ")}
        >
          {hasError ? error : hint}
        </p>
      )}
    </div>
  );
};

export default FloatingInput;
