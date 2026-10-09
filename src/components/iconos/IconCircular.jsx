import React, { useRef } from "react";

const IconCircular = ({
  children,
  bgColor = "",
  textColor = "",
  borderColor = "",
  size = "",
  borderWidth = "",
  tooltip = "",
  tooltipPlacement = "",
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) => {
  const tooltipRef = useRef(null);

  // Construcción de clases dinámicas
  const isInteractive = !!onClick && !disabled;

  const baseClasses = `
    m-0.5
    inline-flex justify-center items-center rounded-full 
    transition-[transform,filter,box-shadow] duration-200 ease-out motion-reduce:transition-none
    ${size} ${borderWidth} ${borderColor} ${bgColor} ${textColor}
    ${isInteractive ? "cursor-pointer hover:shadow-md hover:brightness-105 active:scale-90 focus:outline-none focus:ring-2 focus:ring-jerarquia1/30" : "cursor-default"}
    ${disabled ? "opacity-50 cursor-not-allowed grayscale-[0.3]" : ""}
    ${className}
  `
    .replace(/\s+/g, " ")
    .trim();

  // Componente interno para el disparador (trigger)
  const Trigger = onClick ? "button" : "span";
  const triggerProps = onClick
    ? { type, onClick, disabled, "aria-label": tooltip || undefined, className: baseClasses }
    : { className: baseClasses };

  if (tooltip) {
    return (
      <div
        ref={tooltipRef}
        data-hs-tooltip-on-scroll-hide="true"
        className="hs-tooltip relative inline-block group hover:z-50 [--trigger:hover] [--placement:top]"
        style={{ "--placement": tooltipPlacement }}
      >
        <Trigger
          {...triggerProps}
          className={`${baseClasses} hs-tooltip-toggle`}
        >
          {children}
        </Trigger>
        <span
          className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity hidden hs-tooltip-shown:inline-block group-hover:inline-block absolute z-[100] py-1.5 px-3 bg-iconCircular text-card-catalogos-font text-[11px] font-medium rounded-md shadow-xl max-w-[min(16rem,80vw)] whitespace-normal break-words border border-border pointer-events-none"
          role="tooltip"
        >
          {tooltip}
        </span>
      </div>
    );
  }

  return <Trigger {...triggerProps}>{children}</Trigger>;
};

export default IconCircular;
