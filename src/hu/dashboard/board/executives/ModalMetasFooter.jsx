import React from "react";

const ModalMetasFooter = () => {
    return (
        <div className="px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4 
                        flex flex-col sm:flex-row justify-between items-start sm:items-center 
                        border-t-2 border-[var(--color-jerarquia1)]
                        gap-2 sm:gap-0">
            <div className="text-xs sm:text-sm md:text-sm 
                           text-[var(--color-jerarquia3)] font-medium
                           leading-relaxed">
                Seleccione los ejecutivos para guardar sus Metas Diarias
            </div>
        </div>
    );
};

export default ModalMetasFooter;