import React from "react";
import ModalConsultaCuentasHeader from "./ModalConsultaCuentasHeader";
import ModalConsultaCuentasFiltros from "./ModalConsultaCuentasFiltros";
import ModalConsultaCuentasColumnas from "./ModalConsultaCuentasColumnas";
import ModalConsultaCuentasFooter from "./ModalConsultaCuentasFooter";

// Ejemplo de tabla de sesiones con el mismo estilo que Filtros
const CoordinDashboard = () => (
    <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)]">
        <div className="mb-2">
            <span className="text-xs font-semibold pl-1" style={{ color: "var(--color-jerarquia2)" }}>Sesiones</span>
        </div>
        <div
            style={{
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "31vh",
                scrollbarColor: "#b0b0b0 #f5f5f5",
                scrollbarWidth: "thin"
            }}
            className="scrollbar-gray"
        >
            <table className="text-xs mb-2 text-black min-w-[600px] bg-white" style={{ width: "max-content" }}>
                <thead style={{ position: "sticky", top: 0, zIndex: 2, background: "var(--color-background-secondary)" }}>
                    <tr className="bg-[var(--color-background-secondary)] text-white">
                        <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)] rounded-tl-md">Usuario</th>
                        <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Inicio</th>
                        <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Fin</th>
                        <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">IP</th>
                        <th className="px-2 py-1 text-right rounded-tr-md">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Ejemplo de filas */}
                    {Array.from({ length: 10 }).map((_, i) => (
                        <tr key={i}>
                            <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)]">usuario{i + 1}</td>
                            <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)]">2024-06-01 08:00</td>
                            <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)]">2024-06-01 09:00</td>
                            <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)]">192.168.1.{i + 1}</td>
                            <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)] text-right">Activa</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <style>{`
            .scrollbar-gray::-webkit-scrollbar {
                height: 8px;
                width: 8px;
                background: #f5f5f5;
            }
            .scrollbar-gray::-webkit-scrollbar-thumb {
                background: #b0b0b0;
                border-radius: 4px;
            }
            .scrollbar-gray::-webkit-scrollbar-thumb:hover {
                background: #888;
            }
        `}</style>
    </div>
);

const ModalConsultaCuentas = ({ onClose }) => {
    return (
        <div className="modal-xl-container" style={{ maxWidth: "98vw", overflowX: "hidden" }}>
            <ModalConsultaCuentasHeader onClose={onClose} />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    overflowX: "auto",
                    width: "100%",
                    minHeight: "1px",
                    alignItems: "stretch"
                }}
                className="scrollbar-gray"
            >
                <div style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column" }}>
                    <ModalConsultaCuentasFiltros />
                </div>
                <div style={{ minWidth: 0, flex: "0 0 450px", maxWidth: "450px", display: "flex", flexDirection: "column" }}>
                    <ModalConsultaCuentasColumnas />
                </div>
            </div>
            <div style={{ width: "100%", overflowX: "auto" }}>
                <ModalConsultaCuentasFooter />
            </div>
            <style>{`
                .scrollbar-gray::-webkit-scrollbar {
                    height: 8px;
                    width: 8px;
                    background: #f5f5f5;
                }
                .scrollbar-gray::-webkit-scrollbar-thumb {
                    background: #b0b0b0;
                    border-radius: 4px;
                }
                .scrollbar-gray::-webkit-scrollbar-thumb:hover {
                    background: #888;
                }
            `}</style>
        </div>
    );
};

export default CoordinDashboard;