import React from "react";

const ModalConsultaCuentasColumnas = () => (
    <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] h-full flex flex-col" style={{ minWidth: 0 }}>
        <div className="flex items-center mb-2 w-full">
            <span className="modal-span-1 pl-1" style={{ color: "var(--color-jerarquia2)", minWidth: 80 }}>Columnas</span>
            <div className="flex-1 flex justify-center">
                <button className="btn-info">
                    Agregar
                </button>
            </div>
        </div>
        <div
            style={{
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "31vh",
                height: "100%",
                flex: 1
            }}
            className="scrollbar-gray"
        >
            <table className="modal-table">
                <thead>
                    <tr>
                        <th>Campo</th>
                        <th>Tipo</th>
                        <th>Descripción</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 20 }).map((_, i) => (
                        <tr key={i}>
                            <td>Campo {i + 1}</td>
                            <td>Tipo {i + 1}</td>
                            <td>Descripción {i + 1}</td>
                            <td style={{ textAlign: "right" }}>
                                <button className="text-red-500 hover:underline">Borrar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default ModalConsultaCuentasColumnas;