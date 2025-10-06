import { useState, useEffect } from "react";

// Hook personalizado para manejar la lógica del modal
const useModalLogic = () => {
    const [bounce, setBounce] = useState(false);

    // Efecto para manejar la tecla Escape
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") {
                setBounce(true);
                setTimeout(() => setBounce(false), 500);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const handleBackdropClick = () => {
        setBounce(true);
        setTimeout(() => setBounce(false), 500);
    };

    const handleEscapeAnimation = () => {
        setBounce(true);
        setTimeout(() => setBounce(false), 500);
    };

    return {
        bounce,
        handleBackdropClick,
        handleEscapeAnimation
    };
};

// Función para obtener el componente correspondiente a la opción seleccionada
const getSelectedComponent = (selectedOption, componentsMap) => {
    return componentsMap[selectedOption] || null;
};

const ModalBase = {
    useModalLogic,
    getSelectedComponent
};

export default ModalBase;