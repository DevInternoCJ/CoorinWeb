import React from "react";

const IconCircular = ({ 
  children, 
  bgColor = "bg-gray-200", 
  textColor = "text-gray-800", 
  borderColor = "border-gray-50",
  size = "size-8",
  borderWidth = "border-4",
  tooltip = "",
  tooltipPlacement = "top"
}) => {
  if (tooltip) {
    return (
      <div className={`hs-tooltip [--placement:${tooltipPlacement}] inline-block`}>
        <span 
          className={`hs-tooltip-toggle modal-span-1 inline-flex justify-center items-center ${size} rounded-full ${borderWidth} ${borderColor} ${bgColor} ${textColor} cursor-pointer`}
        >
          {children}
          <span
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm"
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
      className={`modal-span-1 inline-flex justify-center items-center ${size} rounded-full ${borderWidth} ${borderColor} ${bgColor} ${textColor}`}
    >
      {children}
    </span>
  );
};

export default IconCircular;
