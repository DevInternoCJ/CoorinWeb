import React from "react";

const ModalConsultaCuentasFooter = () => {
    return (
        <>
            <div className="flex flex-col items-center gap-4 mt-4">
          
                {/* Tabla vacía visual con mismo estilo que Filtros */}
                <div className="w-full flex justify-center rounded-lg bg-white border border-[var(--color-jerarquia1)] p-0.5">
                    <div
                        style={{
                            overflowX: "auto",
                            overflowY: "auto",
                            maxHeight: "20vh",
                            width: "100%",
                        }}
                        className="scrollbar-gray"
                    >
                        <table className="modal-table">
                            <thead>
                                <tr>
                                    {Array.from({ length: 14 }).map((_, j) => (
                                        <th key={j}>Columna {j + 1}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 25 }).map((_, i) => (
                                    <tr key={i}>
                                        {Array.from({ length: 14 }).map((_, j) => (
                                            <td key={j}>Dato {j + 1}-{i + 1}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
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