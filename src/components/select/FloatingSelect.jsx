/**
 * FloatingSelect — Componente reutilizable de select con label flotante
 * Patrón: Preline Advanced Select (floating label)
 * Soporta: modo claro / oscuro · opciones como string o { value, label } · ícono opcional
 *
 * @param {string}   id          — ID único del select (requerido para a11y)
 * @param {string}   label       — Texto del label flotante
 * @param {string}   value       — Valor controlado
 * @param {Function} onChange    — Handler de cambio (e) => void
 * @param {Array}    options     — Array de strings o { value, label }
 * @param {boolean}  required    — Muestra asterisco y agrega validación HTML5
 * @param {boolean}  disabled    — Deshabilita el select
 * @param {string}   className   — Clases extra para el wrapper
 * @param {React.ReactNode} icon — Ícono SVG opcional (se renderiza a la izquierda)
 * @param {string}   placeholder — Texto de la opción vacía (default: "Seleccionar…")
 * @param {string}   size        — "sm" | "md" (default) | "lg"
 */
import React from "react";

const SIZE_MAP = {
  sm: {
    select: "ps-3 pe-9 pt-4 pb-1 text-xs",
    label: "ps-3 text-xs",
    icon: "w-4 h-4",
    iconWrap: "left-3 top-1/2 -translate-y-1/2",
  },
  md: {
    select: "ps-4 pe-9 pt-5 pb-2 text-sm",
    label: "ps-4 text-sm",
    icon: "w-4 h-4",
    iconWrap: "left-4 top-1/2 -translate-y-1/2",
  },
  lg: {
    select: "ps-5 pe-9 pt-6 pb-2 text-base",
    label: "ps-5 text-base",
    icon: "w-5 h-5",
    iconWrap: "left-5 top-1/2 -translate-y-1/2",
  },
};

const FloatingSelect = ({
  id,
  label,
  value,
  onChange,
  options = [],
  required = false,
  disabled = false,
  className = "",
  icon = null,
  placeholder = "Seleccionar…",
  size = "md",
}) => {
  const s = SIZE_MAP[size] || SIZE_MAP.md;

  // Normaliza las opciones para soportar strings o { value, label }
  const normalizedOptions = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt,
  );

  const hasValue = value !== "" && value !== null && value !== undefined;
  const iconPadding = icon
    ? "ps-10"
    : s.select.split(" ").find((c) => c.startsWith("ps-"));

  return (
    <div className={`floating-select-wrapper relative ${className}`}>
      {/* Ícono opcional */}
      {icon && (
        <span
          className={`absolute ${s.iconWrap} pointer-events-none text-[var(--color-text-muted)] z-10`}
          aria-hidden="true"
        >
          <span className={s.icon}>{icon}</span>
        </span>
      )}

      {/* Select */}
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={[
          "floating-select peer block w-full rounded-lg",
          "border border-[var(--color-border)]",
          "bg-[var(--color-surface-secondary)]",
          "text-[var(--color-text-primary)]",
          "transition-colors duration-150",
          // padding dinámico según tamaño y si hay ícono
          icon ? `${s.select.replace(/ps-\S+/, "ps-10")}` : s.select,
          // ring al focus usando variables de jerarquía
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-jerarquia2)]",
          "focus:border-[var(--color-jerarquia2)]",
          // label flotante via peer
          "focus:pt-5 focus:pb-1",
          hasValue ? "pt-5 pb-1" : "",
          // disabled
          "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
          // apariencia nativa del select
          "appearance-none",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label={label}
      >
        {/* Opción vacía → necesaria para el comportamiento del label flotante */}
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {normalizedOptions.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-[var(--color-surface-modal)] text-[var(--color-text-primary)]"
          >
            {opt.label}
          </option>
        ))}
      </select>

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
          "text-[var(--color-text-muted)]",
          "peer-focus:text-[10px] peer-focus:font-medium",
          "peer-focus:-translate-y-2 peer-focus:text-[var(--color-jerarquia3)]",
          // cuando tiene valor
          hasValue
            ? "text-[10px] font-medium -translate-y-2 text-[var(--color-jerarquia3)]"
            : "",
          // disabled
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

      {/* Chevron personalizado (reemplaza flecha nativa) */}
      <span
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
};

export default FloatingSelect;
