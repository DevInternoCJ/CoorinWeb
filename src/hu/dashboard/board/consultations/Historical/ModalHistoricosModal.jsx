import React, { useState, useCallback } from "react";
import ReusableModal from "../../../../dashboard/board/modalGlobalReboot/ReusableModal";
import ModalConsultaHistoricosFiltros from "./ModalConsultaHistoricosFiltros";
import { IconHistoricos } from "../IconesConsultations";

const HistoricosModal = ({ 
    isOpen, 
    onClose,
    enableBounce = false,
    enableShakeOnBackdropClick = true,
    enableBounceOnBackdropOrEscape = true,
    closeOnBackdropClick = false,
    ...props 
}) => {
    // Estado para el tipo de consulta (individual/archivo)
    const [isIndividual, setIsIndividual] = useState(); // null: ninguno, true: individual, false: archivo

    // Reiniciar el estado al cerrar el modal
    React.useEffect(() => {
        if (!isOpen) {
            setIsIndividual(undefined);
        }
    }, [isOpen]);

    // Función para manejar cambios en el tipo de consulta
    const handleIndividualChange = useCallback((individual) => {
        setIsIndividual(individual);
    }, []);



    // Footer personalizado con mensaje dinámico
    const CustomFooter = () => {
        // Función para determinar el mensaje a mostrar
        const getMessage = () => {
            if (isIndividual === undefined || isIndividual === null) {
                return "Seleccione si son cuentas individuales o por archivo";
            }
            
            if (isIndividual) {
                return 'Introduzca la cuenta, seleccione que concepto(s) para buscar en histórico y presione "Buscar"';
            } else {
                return "Seleccione qué concepto(s) y seleccione el libro de Excel (UNA pestaña, UNA columna) con las cuentas para buscarlas en histórico.";
            }
        };

        return (
            <div className="px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4 
                           bg-gray-50 border-t border-gray-200 flex-shrink-0">
                <p className="text-sm text-justify m-0 italic"
                   style={{ color: "var(--color-jerarquia3)" }}>
                    {getMessage()}
                </p>
            </div>
        );
    };

    return (
        <ReusableModal
            isOpen={isOpen}
            onClose={onClose}
            size={isIndividual === undefined ? "historicos-inicial" : "historicos"}
            showHeader={true}
            title="Históricos - Coorin"
            icon={IconHistoricos}
            iconClassName="text-jerarquia3"
            headerProps={{ titleClassName: "text-jerarquia3" }}
            footerComponent={CustomFooter}
            showFooter={true}
            enableBounce={enableBounce}
            enableShakeOnBackdropClick={enableShakeOnBackdropClick}
            enableBounceOnBackdropOrEscape={enableBounceOnBackdropOrEscape}
            closeOnBackdropClick={closeOnBackdropClick}
            contentClassName="flex flex-col gap-4 h-full !overflow-hidden"
            modalClassName="border-0 shadow-2xl h-[60vh] overflow-hidden"
            {...props}
        >
            {/* Contenido principal con filtros */}
            <div className="flex justify-center w-full flex-1 overflow-hidden">
                <ModalConsultaHistoricosFiltros 
                    onIndividualChange={handleIndividualChange}
                />
            </div>
        </ReusableModal>
    );
};

export default HistoricosModal;