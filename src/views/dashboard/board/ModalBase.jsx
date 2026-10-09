import { useState, useEffect, useRef } from "react";

// Hook personalizado para manejar la lógica del modal
const useModalLogic = () => {
    const [bounce, setBounce] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => () => clearTimeout(timerRef.current), []);

    const triggerBounce = () => {
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
        clearTimeout(timerRef.current);
        setBounce(true);
        timerRef.current = setTimeout(() => setBounce(false), 300);
    };

    const handleBackdropClick = () => {
        triggerBounce();
    };

    const handleEscapeAnimation = () => {
        triggerBounce();
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
