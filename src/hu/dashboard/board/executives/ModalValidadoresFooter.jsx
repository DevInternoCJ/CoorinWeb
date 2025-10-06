import React from "react";

const ModalValidadoresFooter = ({ 
    lastAction, 
    lastUser, 
    producto, 
    arrepentimientos, 
    isProcessingChange 
}) => {
    
    // Función para determinar el mensaje a mostrar
    const getMessage = () => {
        // Si no hay producto seleccionado
        if (!producto) {
            return "Selecciona un producto primero para gestionar validadores.";
        }
        
        // Si se está procesando un cambio
        if (isProcessingChange) {
            return "Procesando cambio de validador...";
        }
        
        // Determinar el tipo de validador
        const tipoValidador = arrepentimientos ? "validador de arrepentimientos" : "validador";
        
        // Si hay una acción reciente
        if (lastAction && lastUser) {
            if (lastAction === 'added') {
                return `Se dio de alta al ${tipoValidador}: ${lastUser}`;
            } else if (lastAction === 'removed') {
                return `Se dio de baja al ${tipoValidador}: ${lastUser}`;
            }
        }
        
        // Mensaje por defecto según el tipo de validador
        const tipoActual = arrepentimientos ? "Validadores de Arrepentimientos" : "Validadores";
        return `${tipoActual}. Selecciona usuarios para asignar o quitar como validadores.`;
    };

    return (
        <p className="text-sm text-[var(--color-jerarquia3)]" style={{ 
            textAlign: "justify",
            margin: 0,
            fontStyle: "italic"
        }}>
            {getMessage()}
        </p>
    );
};

export default ModalValidadoresFooter;