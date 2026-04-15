import React from "react";
import { IconPantalla } from "./IconesEjecutives";

const ModalPantallaHeader = ({ onClose }) => {
    return (

        <div className="flex items-center mb-6 border-b-2 border-jerarquia1 pb-4">
            <div className="flex items-center gap-3">
                <IconPantalla
                    className="size-6 text-jerarquia3"
                />
                <div>
                    <h2 className="text-xl font-bold text-jerarquia3 flex justify-start">
                        Campos Pantalla - Coorin
                    </h2>
                </div>
            </div>

            <div className="ml-auto">
                <button
                    onClick={onClose}
                    className="text-jerarquia3 hover:text-destructive transition-colors duration-200 rounded-full p-1 text-2xl leading-none"
                    aria-label="Cerrar"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default ModalPantallaHeader;