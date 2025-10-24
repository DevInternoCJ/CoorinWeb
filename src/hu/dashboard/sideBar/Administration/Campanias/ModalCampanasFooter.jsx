import React from "react";


const ModalConsultaCuentasFooter = () => {
    return (
        <>
            <div className="flex flex-col items-center gap-2 mt-2">
                {/* Se eliminaron el botón, radios y tabla para dejar el modal más corto */}
            </div>
            <div className="modal-footer-help">
                <span className="modal-span-2 text-gray-500">
                    Indique los parámetros que desea buscar y presione Agregar.
                </span>
            </div>
        </>
    );
};

export default ModalConsultaCuentasFooter;