import React from "react";
import { IconMetas } from "./IconesEjecutives";

const ModalMetasHeader = ({ onClose }) => {
    return (
        <div className="px-3 pt-4 pb-3 sm:px-4 sm:pt-5 sm:pb-4 md:px-6 md:pt-6 md:pb-4 
                        flex items-center justify-between 
                        border-b-2 border-[var(--color-jerarquia1)]
                        gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <IconMetas 
                    className="size-5 sm:size-6 flex-shrink-0" 
                    style={{ color: "var(--color-jerarquia3)" }}
                />
                <div className="min-w-0">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold 
                                   text-[var(--color-jerarquia3)] 
                                   truncate sm:whitespace-normal
                                   leading-tight">
                        <span className="hidden sm:inline">Metas diarias ejecutivos - Coorin</span>
                        <span className="sm:hidden">Metas Ejecutivos</span>
                    </h2>
                </div>
            </div>
            
            <div className="flex-shrink-0">
                <button
                    onClick={onClose}
                    className="text-[var(--color-jerarquia3)] hover:text-red-600 
                             transition-colors duration-200 
                             rounded-full p-1 sm:p-1.5
                             hover:bg-gray-100 focus:bg-gray-100
                             focus:outline-none focus:ring-2 focus:ring-red-300"
                    style={{ fontSize: "1.25rem", lineHeight: 1 }}
                    aria-label="Cerrar modal"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default ModalMetasHeader;