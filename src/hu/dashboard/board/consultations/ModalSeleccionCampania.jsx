import React from "react";
import ModalBase from "./ModalBase";

const ModalSeleccionCampania = ({ open, onClose, onCargar }) => {
    return (
        <ModalBase open={open} onClose={onClose}>
            <div
                className="bg-white rounded-xl shadow-2xl border border-[var(--color-jerarquia1)] relative flex flex-col items-center"
                style={{
                    minWidth: 380,
                    maxWidth: 480,
                    width: "100%",
                    padding: "1.5rem 1.5rem 1.25rem 1.5rem",
                }}
            >
                {/* Botón de cierre */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white border border-[var(--color-jerarquia3)] text-[var(--color-jerarquia3)] hover:bg-[var(--color-jerarquia3)] hover:text-white transition rounded-full w-8 h-8 flex items-center justify-center shadow"
                    style={{ fontSize: "1.5rem", lineHeight: 1 }}
                    aria-label="Cerrar"
                >
                    &times;
                </button>
                {/* Título */}
                <div className="text-xl font-bold mb-4 text-[var(--color-jerarquia3)] flex items-center gap-2 w-full">
                    <span className="material-icons text-[var(--color-jerarquia3)] text-2xl">table_view</span>
                    Carga filas de trabajo a Campaña - Consorcio Jurídico
                </div>
                {/* Select campaña */}
                <div className="flex items-center mb-4 gap-3 w-full">
                    <span className="font-semibold text-[var(--color-jerarquia4)]">Campaña</span>
                    <div className="relative">
                        <select className="w-40 font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none">
                            <option>ALL CHARGE</option>
                        </select>
                        <span
                            style={{
                                pointerEvents: "none",
                                position: "absolute",
                                right: "0.75rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                fontSize: "1.15rem",
                                color: "#222",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                <path d="M6 8l4 4 4-4" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                    </div>
                </div>
                {/* Tabla */}
                <div
                    className="rounded-lg border border-[var(--color-jerarquia1)] bg-white mb-4 overflow-auto w-full"
                    style={{ maxHeight: "18vh" }}
                >
                    <table className="w-full text-xs text-black min-w-[320px] bg-white" style={{ width: "max-content" }}>
                        <thead style={{ position: "sticky", top: 0, zIndex: 2, background: "var(--color-background-secondary)" }}>
                            <tr className="bg-[var(--color-background-secondary)] text-white">
                                <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)] rounded-tl-md font-semibold">Cuenta</th>
                                <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)] font-semibold">Usuario</th>
                                <th className="px-2 py-1 text-left rounded-tr-md font-semibold">Teléfono</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center py-2 border-t border-[var(--color-jerarquia1)]">
                                    <input type="checkbox" defaultChecked />
                                </td>
                                <td className="text-center py-2 border-t border-[var(--color-jerarquia1)]">
                                    <input type="checkbox" />
                                </td>
                                <td className="text-center py-2 border-t border-[var(--color-jerarquia1)]">
                                    <input type="checkbox" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Botón Cargar */}
                <div className="flex justify-center mb-3 w-full">
                    <button
                        onClick={onCargar}
                        className="bg-[var(--color-jerarquia2)] text-white px-8 py-2 rounded font-semibold shadow hover:bg-[var(--color-jerarquia3)] transition text-base"
                    >
                        Cargar
                    </button>
                </div>
                {/* Mensaje inferior */}
                <div className="text-xs text-[var(--color-jerarquia3)] text-left font-semibold w-full">
                    Seleccione la campaña a la que desea agregar los registros y de clic en Cargar.
                </div>
            </div>
        </ModalBase>
    );
};

export default ModalSeleccionCampania;
