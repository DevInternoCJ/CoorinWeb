import React from "react";

const ModalConsultaInformationFooter = () => {
    return (
        <div className="flex justify-end items-center pt-4 border-t border-[var(--color-jerarquia1)] mt-6">
            <button
                className="bg-[var(--color-jerarquia3)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-jerarquia2)] transition"
                type="button"
            >
                Aceptar
            </button>
        </div>
    );
};

export default ModalConsultaInformationFooter;