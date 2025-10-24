import React, { useState, useCallback } from "react";
import ModalConsultaCuentasHeader from "./ModalConsultaCuentasHeader";
import ModalConsultaCuentasFiltros from "./ModalConsultaCuentasFiltros";
import ModalConsultaCuentasColumnas from "./ModalConsultaCuentasColumnas";
import ModalConsultaCuentasFooter from "./ModalConsultaCuentasFooter";

const ModalConsultaCuentas = ({ onClose }) => {
    const [situacionOptions, setSituacionOptions] = useState([]);
    const [allAvailableOptions, setAllAvailableOptions] = useState([]);
    const [totalFiltros, setTotalFiltros] = useState(0);
    const [totalColumnas, setTotalColumnas] = useState(0);

    const handleGetSituacionOptions = useCallback((options) => {
        setSituacionOptions(options);
    }, []);

    const handleGetAllAvailableOptions = useCallback((options) => {
        setAllAvailableOptions(options);
    }, []);

    const handleFiltrosCount = useCallback((count) => {
        setTotalFiltros(count);
    }, []);

    const handleColumnasCount = useCallback((count) => {
        setTotalColumnas(count);
    }, []);

    const totalItems = totalFiltros + totalColumnas;

    return (
        <div 
            className="modal-xl-container flex flex-col w-full h-full max-h-[95vh] overflow-hidden"
        >
            {/* Header fijo */}
            <div className="flex-shrink-0 px-2 sm:px-0">
                <ModalConsultaCuentasHeader onClose={onClose} />
            </div>
            
            {/* Contenido con scroll */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-gray px-2 py-2">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 w-full">
                    {/* Sección de Filtros - Toma todo el ancho en móvil, 8/12 columnas en desktop */}
                    <div className="lg:col-span-8 w-full min-w-0 flex flex-col">
                        <ModalConsultaCuentasFiltros 
                            onGetSituacionOptions={handleGetSituacionOptions} 
                            onGetAllAvailableOptions={handleGetAllAvailableOptions}
                            idProducto={1} 
                            idCartera={1}
                            onFiltrosCountChange={handleFiltrosCount}
                            isDateEnabled={totalItems >= 4}
                        />
                    </div>
                    
                    {/* Sección de Columnas - Toma todo el ancho en móvil, 4/12 columnas en desktop */}
                    <div className="lg:col-span-4 w-full min-w-0 flex flex-col">
                        <ModalConsultaCuentasColumnas 
                            situacionOptions={situacionOptions}
                            allAvailableOptions={allAvailableOptions}
                            onColumnasCountChange={handleColumnasCount}
                        />
                    </div>
                </div>
            </div>
            
            {/* Footer fijo */}
            <div className="flex-shrink-0 w-full px-2 sm:px-0">
                <ModalConsultaCuentasFooter />
            </div>
        </div>
    );
};

export default ModalConsultaCuentas;