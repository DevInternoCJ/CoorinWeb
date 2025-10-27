import React from "react";

const ModalConsultaCuentasFooter = () => {
    return (
        <>
            <div className="flex flex-col items-center gap-4 mt-4">
          
                {/* Tabla de resultados */}
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
                            <tbody>
                                <tr>
                                    <td
                                        style={{
                                            textAlign: "center",
                                            color: "#666",
                                            fontStyle: "italic",
                                            padding: "2rem"
                                        }}
                                    >
                                        No hay consultas realizadas
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
         
        </>
    );
};

export default ModalConsultaCuentasFooter;