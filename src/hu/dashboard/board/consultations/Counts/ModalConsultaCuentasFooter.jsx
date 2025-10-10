import React, { useState } from "react";
import { IconCustomTable } from "../IconesConsultations";
import ModalSeleccionCampania from "../ModalCamapañas/ModalSeleccionCampania";

const ModalConsultaCuentasFooter = () => {
    const [openSeleccionCampania, setOpenSeleccionCampania] = useState(false);
    return (
        <>
            <div className="flex flex-col items-center gap-4 mt-4">
                <div className="flex flex-row w-full items-center">
                    {/* Botón Consultar centrado, alineado con la tabla Filtros (3/4) */}
                    <div className="flex justify-center items-center" style={{ width: "67%" }}>
                        <button
                            className="btn-success"
                        >
                            Consultar
                            <span className="material-icons text-base align-middle"></span>
                        </button>
                        <IconCustomTable
                            className="size-8 cursor-pointer"
                            style={{ color: "var(--color-jerarquia3)" }}
                            onClick={() => setOpenSeleccionCampania(true)}
                        />
                    </div>
                    {/* Radios alineados con la tabla Columnas (1/4) */}
                    <div className="flex justify-center items-center " style={{ width: "33%" }}>
                        <label className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer bg-white hover:bg-[var(--color-jerarquia2)/10]`}>
                            <input
                                type="radio"
                                name="tipo"
                                defaultChecked
                                className="modal-radio"
                            />
                            <span className="modal-span-1">Contar</span>
                        </label>
                        <label className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer bg-white hover:bg-[var(--color-jerarquia2)/10]`}>
                            <input
                                type="radio"
                                name="tipo"
                                className="modal-radio"
                            />
                            <span className="modal-span-1">Detalle</span>
                        </label>
                    </div>
                </div>
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
            {openSeleccionCampania && (
                <ModalSeleccionCampania
                    open={openSeleccionCampania}
                    onClose={() => setOpenSeleccionCampania(false)}
                    onCargar={() => setOpenSeleccionCampania(false)}
                />
            )}
        </>
    );
};

export default ModalConsultaCuentasFooter;