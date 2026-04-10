import React from "react";

const ModalScriptsFooter = () => {
    return (
        <div className="flex justify-between items-end mt-6 pt-4 border-t-2 border-[var(--color-jerarquia1)]">
            <div className="text-sm text-[var(--color-jerarquia3)] font-medium">
                <div>Escriba el texto que desee para el script y/o arrastre los campos que desee que se muestren.</div>
                <div>Seleccione el texto a remarcar o resaltar y oprima el botón correspondiente.</div>
            </div>
        </div>
    );
};

export default ModalScriptsFooter;