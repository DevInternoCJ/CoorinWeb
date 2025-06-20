import React from "react";

const DropdownArrow = () => (
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
);

const ModalSeleccionCampania = ({ open, onClose, onCargar }) => {
    if (!open) return null;
    

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        >
            <div
                className="bg-white rounded-xl shadow-2xl border border-[var(--color-jerarquia1)] relative flex flex-col"
                style={{
                    minWidth: 300,
                    maxWidth: 800,
                    width: "100%",
                    height: "500px",
                    padding: "1.5rem 1.5rem 1.25rem 1.5rem",
                }}
            >
                {/* Botón de cierre en esquina superior derecha */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[var(--color-jerarquia3)] hover:text-red-600 transition rounded-full p-1"
                    style={{ fontSize: "1.5rem", lineHeight: 1 }}
                    aria-label="Cerrar"
                >
                    &times;
                </button>
                
                {/* Título */}
                <div className="text-xl font-bold mb-8 text-[var(--color-jerarquia3)] flex items-center gap-2 w-full">
                    Carga filas de trabajo a Campaña - Consorcio Jurídico
                </div>
                
                {/* Select campaña centrado */}
                <div className="flex items-center justify-center mb-4 gap-3 w-full">
                    <span className="font-semibold text-[var(--color-jerarquia4)]">Campaña</span>
                    <div className="relative">
                        <select className="w-32 font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none">
                            <option>ALL CHARGE</option>
                        </select>
                        <DropdownArrow />
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
                
                {/* Tabla expandida */}
                <div
                    className="rounded-lg border border-[var(--color-jerarquia1)] bg-white mb-6 overflow-auto w-full flex-1 flex flex-col"
                    style={{ minHeight: "200px" }}
                >
                    <table className="w-full text-xs text-black bg-white">
                        <thead style={{ position: "sticky", top: 0, zIndex: 2, background: "var(--color-background-secondary)" }}>
                            <tr className="bg-[var(--color-background-secondary)] text-white">
                                <th className="px-2 py-1 text-center border-r border-[var(--color-jerarquia1)] rounded-tl-md font-semibold">Cuenta</th>
                                <th className="px-2 py-1 text-center border-r border-[var(--color-jerarquia1)] font-semibold">Usuario</th>
                                <th className="px-2 py-1 text-center rounded-tr-md font-semibold">Teléfono</th>
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
                
                {/* Botón Cargar más delgado */}
                <div className="flex justify-center mb-4 w-full">
                    <button
                        onClick={onCargar}
                        className="bg-[var(--color-jerarquia2)] text-white px-6 py-1 rounded font-semibold shadow hover:bg-[var(--color-jerarquia3)] transition text-base"
                    >
                        Cargar
                    </button>
                </div>
                
                {/* Mensaje inferior alineado a la izquierda con color negro */}
                <div className="w-full mt-8 mb-2 flex justify-start">
                <span className="text-base text-[var(--color-jerarquia4)] ">
                    Seleccione la campaña a la que desea agregar los registros y de clic en Cargar.
                </span>
            </div>
            </div>
        </div>
    );
};

export default ModalSeleccionCampania;