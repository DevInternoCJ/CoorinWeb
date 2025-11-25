import React, { useState, useCallback } from "react";
import ReusableModal from "../../../../dashboard/board/modalGlobalReboot/ReusableModal";
import ModalConsultaHistoricosFiltros from "./ModalConsultaHistoricosFiltros";
import HistoricosTipoSelector from "./HistoricosTipoSelector";
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
    // Estados para los controles
    const [cartera, setCartera] = useState("");
    const [carteras, setCarteras] = useState(["American Express"]);
    const [carterasProductosData, setCarterasProductosData] = useState([]);
    const [producto, setProducto] = useState("");
    const [productos, setProductos] = useState(["-Sin Producto-"]);
    const [tipoSeleccionado, setTipoSeleccionado] = useState(null);

    // Reiniciar el estado al cerrar el modal
    React.useEffect(() => {
        if (!isOpen) {
            setIsIndividual(undefined);
        } else if (isOpen && (isIndividual === undefined || isIndividual === null)) {
            // Mostrar toast solo en el modal inicial
            import("sonner").then(({ toast }) => {
                toast.info("Seleccione si son cuentas individuales o por archivo");
            });
        }
    }, [isOpen, isIndividual]);

    // Función para manejar cambios en el tipo de consulta
    const handleIndividualChange = useCallback((individual) => {
        setIsIndividual(individual);
    }, []);


    // Pasar controles al header solo si el modal está expandido
    const carteraSelector = (isIndividual !== null && isIndividual !== undefined) ? (
        <HistoricosTipoSelector
            cartera={cartera}
            setCartera={setCartera}
            carteras={carteras}
            carterasProductosData={carterasProductosData}
            setProductos={setProductos}
            setProducto={setProducto}
            isIndividual={isIndividual}
            setTipoSeleccionado={setTipoSeleccionado}
            handleTipoSeleccion={setIsIndividual}
            modoHeader={true}
        />
    ) : null;

    return (
        <ReusableModal
            isOpen={isOpen}
            onClose={onClose}
            size={isIndividual === undefined ? "historicos-inicial" : "historicos"}
            showHeader={true}
            title="Históricos - Coorin"
            icon={IconHistoricos}
            iconClassName="text-jerarquia3"
            headerProps={{ titleClassName: "text-jerarquia3", carteraSelector }}
            showFooter={false}
            enableBounce={enableBounce}
            enableShakeOnBackdropClick={enableShakeOnBackdropClick}
            enableBounceOnBackdropOrEscape={enableBounceOnBackdropOrEscape}
            closeOnBackdropClick={closeOnBackdropClick}
            contentClassName="flex flex-col gap-4 h-full !overflow-hidden"
            modalClassName="border-0 shadow-2xl h-[30vh] overflow-hidden"
            {...props}
        >
            {/* Contenido principal con filtros */}
            <div className="flex justify-center w-full flex-1 overflow-hidden">
                <ModalConsultaHistoricosFiltros
                    onIndividualChange={handleIndividualChange}
                    cartera={cartera}
                    setCartera={setCartera}
                    carteras={carteras}
                    carterasProductosData={carterasProductosData}
                    setProductos={setProductos}
                    setProducto={setProducto}
                    isIndividual={isIndividual}
                    setTipoSeleccionado={setTipoSeleccionado}
                />
            </div>
        </ReusableModal>
    );
};

export default HistoricosModal;