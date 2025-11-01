import React, { useEffect, useRef } from "react";

const IconCircular = ({ 
  children, 
  bgColor = "bg-gray-200", 
  textColor = "text-gray-800", 
  borderColor = "border-gray-50",
  size = "size-8",
  borderWidth = "border-4",
  tooltip = "",
  tooltipPlacement = "top",
  onClick
}) => {
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (tooltip && tooltipRef.current && typeof window !== 'undefined') {
      // Importar dinámicamente HSTooltip si está disponible
      import('preline/preline').then(() => {
        if (window.HSTooltip) {
          window.HSTooltip.autoInit();
        }
      }).catch(() => {
        // Si falla la importación, intentar inicializar directamente
        if (window.HSStaticMethods) {
          window.HSStaticMethods.autoInit(['tooltip']);
        }
      });
    }
  }, [tooltip]);

  if (tooltip) {
    return (
      <div 
        ref={tooltipRef}
        className="hs-tooltip inline-block"
        style={{ '--placement': tooltipPlacement }}
      >
        <span 
          className={`hs-tooltip-toggle inline-flex justify-center items-center ${size} rounded-full ${borderWidth} ${bgColor} ${textColor} cursor-pointer`}
          onClick={onClick}
          style={borderColor === "border-orange-custom" ? { border: '2px solid #fb923c' } : undefined}
        >
          {children}
          <span
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-background-secondary text-xs font-medium text-white rounded-md shadow-sm whitespace-nowrap"
            role="tooltip"
          >
            {tooltip}
          </span>
        </span>
      </div>
    );
  }

  return (
    <span 
      className={`inline-flex justify-center items-center ${size} rounded-full ${borderWidth} ${bgColor} ${textColor} ${onClick ? 'cursor-pointer' : ''}`}
      style={borderColor === "border-orange-custom" ? { border: '2px solid #fb923c' } : undefined}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default IconCircular;
