import React, { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const WEEK_DAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

const toIsoDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const fromIsoDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    ? date
    : null;
};

const displayDate = (value) => {
  const date = fromIsoDate(value);
  return date
    ? new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date)
    : "";
};

const buildCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - mondayOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
};

const DatePicker = ({
  id,
  label = "Fecha",
  value = "",
  onChange,
  className = "",
  disabled = false,
  min,
  max,
}) => {
  const generatedId = useId();
  const inputId = id || `datepicker-${generatedId}`;
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectedDate = fromIsoDate(value);
  const [visibleDate, setVisibleDate] = useState(selectedDate || new Date());
  const [position, setPosition] = useState({ top: 0, left: 0, width: 304 });

  const days = useMemo(
    () => buildCalendarDays(visibleDate.getFullYear(), visibleDate.getMonth()),
    [visibleDate],
  );

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const selectedYear = visibleDate.getFullYear();
    const start = Math.min(currentYear - 75, selectedYear - 5);
    const end = Math.max(currentYear + 15, selectedYear + 5);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [visibleDate]);

  const updatePosition = () => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const width = Math.min(304, window.innerWidth - 24);
    const left = Math.min(Math.max(12, rect.left), window.innerWidth - width - 12);
    const estimatedHeight = 382;
    const placeAbove = rect.bottom + estimatedHeight > window.innerHeight && rect.top > estimatedHeight;
    setPosition({
      left,
      top: placeAbove ? Math.max(12, rect.top - estimatedHeight - 8) : rect.bottom + 8,
      width,
    });
  };

  useLayoutEffect(() => {
    if (!isOpen) return;
    updatePosition();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!triggerRef.current?.contains(event.target) && !popoverRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.querySelector("input")?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen]);

  const togglePicker = () => {
    if (disabled) return;
    if (!isOpen) setVisibleDate(selectedDate || new Date());
    setIsOpen((current) => !current);
  };

  const selectDate = (date) => {
    onChange?.(toIsoDate(date));
    setIsOpen(false);
  };

  const changeMonth = (amount) => {
    setVisibleDate((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
  };

  const isUnavailable = (date) => {
    const iso = toIsoDate(date);
    return (min && iso < min) || (max && iso > max);
  };

  return (
    <div ref={triggerRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          id={inputId}
          type="text"
          readOnly
          disabled={disabled}
          value={displayDate(value)}
          placeholder=" "
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          onClick={togglePicker}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              togglePicker();
            }
          }}
          className="peer block w-full cursor-pointer rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-secondary)] py-1 pb-1 pt-4 ps-3 pe-10 text-xs text-[var(--color-text-primary)] transition focus:border-[var(--color-jerarquia2)] focus:outline-none focus:ring-2 focus:ring-[var(--color-jerarquia2)] disabled:pointer-events-none disabled:opacity-50"
        />
        <label
          htmlFor={inputId}
          className={`pointer-events-none absolute start-0 top-0 flex h-full items-center ps-3 text-xs text-[var(--color-text-muted)] transition-all duration-150 peer-focus:-translate-y-2 peer-focus:text-[10px] peer-focus:font-medium peer-focus:text-[var(--color-jerarquia3)] ${value ? "-translate-y-2 text-[10px] font-medium text-[var(--color-jerarquia3)]" : ""}`}
        >
          {label}
        </label>
        <button
          type="button"
          aria-label={isOpen ? "Cerrar calendario" : "Abrir calendario"}
          onClick={togglePicker}
          disabled={disabled}
          className="absolute inset-y-0 end-0 flex w-10 items-center justify-center rounded-e-lg text-[var(--color-jerarquia3)] transition hover:bg-[var(--color-jerarquia1)]/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--color-jerarquia2)] disabled:pointer-events-none"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label={`Seleccionar ${label.toLowerCase()}`}
          className="fixed z-[1100] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-[var(--color-text-primary)] shadow-2xl"
          style={{ top: position.top, left: position.left, width: position.width }}
        >
          <div className="mb-3 grid grid-cols-[2rem_1fr_2rem] items-center gap-2">
            <button type="button" aria-label="Mes anterior" onClick={() => changeMonth(-1)} className="flex size-8 items-center justify-center rounded-full hover:bg-[var(--color-surface-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-jerarquia2)]">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" /></svg>
            </button>
            <div className="flex items-center justify-center gap-1.5">
              <select
                aria-label="Mes"
                value={visibleDate.getMonth()}
                onChange={(event) => setVisibleDate(new Date(visibleDate.getFullYear(), Number(event.target.value), 1))}
                className="rounded-md border-0 bg-transparent px-1 py-1 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--color-jerarquia2)]"
              >
                {MONTHS.map((month, index) => <option key={month} value={index}>{month}</option>)}
              </select>
              <select
                aria-label="Año"
                value={visibleDate.getFullYear()}
                onChange={(event) => setVisibleDate(new Date(Number(event.target.value), visibleDate.getMonth(), 1))}
                className="rounded-md border-0 bg-transparent px-1 py-1 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--color-jerarquia2)]"
              >
                {years.map((year) => <option key={year} value={year}>{year}</option>)}
              </select>
            </div>
            <button type="button" aria-label="Mes siguiente" onClick={() => changeMonth(1)} className="flex size-8 items-center justify-center rounded-full hover:bg-[var(--color-surface-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-jerarquia2)]">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-0.5" role="grid">
            {WEEK_DAYS.map((day) => <span key={day} className="flex h-8 items-center justify-center text-[11px] font-medium text-[var(--color-text-muted)]">{day}</span>)}
            {days.map((date) => {
              const iso = toIsoDate(date);
              const isSelected = iso === value;
              const isToday = iso === toIsoDate(new Date());
              const isOtherMonth = date.getMonth() !== visibleDate.getMonth();
              const unavailable = isUnavailable(date);
              return (
                <button
                  key={iso}
                  type="button"
                  role="gridcell"
                  aria-selected={isSelected}
                  aria-label={new Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(date)}
                  disabled={unavailable}
                  onClick={() => selectDate(date)}
                  className={`relative flex size-9 items-center justify-center rounded-full border text-xs transition focus:outline-none focus:ring-2 focus:ring-[var(--color-jerarquia2)] disabled:pointer-events-none disabled:opacity-30 ${isSelected ? "border-[var(--color-jerarquia3)] bg-[var(--color-jerarquia3)] font-semibold text-white" : isToday ? "border-[var(--color-jerarquia3)] font-semibold text-[var(--color-jerarquia3)] hover:bg-[var(--color-surface-secondary)]" : `border-transparent hover:border-[var(--color-jerarquia2)] hover:text-[var(--color-jerarquia3)] ${isOtherMonth ? "opacity-35" : ""}`}`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-[var(--color-border)] pt-3">
            <button type="button" onClick={() => { onChange?.(""); setIsOpen(false); }} disabled={!value} className="rounded-md px-2 py-1.5 text-xs font-medium text-[var(--color-text-muted)] hover:bg-[var(--color-surface-secondary)] disabled:pointer-events-none disabled:opacity-40">Limpiar</button>
            <button type="button" onClick={() => selectDate(new Date())} disabled={isUnavailable(new Date())} className="rounded-md bg-[var(--color-jerarquia3)] px-3 py-1.5 text-xs font-semibold text-white transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[var(--color-jerarquia2)] focus:ring-offset-2">Hoy</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
