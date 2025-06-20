import React from "react";

// Ejemplo de tabla de sesiones con el mismo estilo que Filtros
const CoordinDashboard = () => (
    <div className="relative bg-white shadow-lg ring-1 ring-black/5 rounded-2xl flex flex-col p-6 w-full h-82">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
            <span className="mr-2">
                {/* Icono personalizado para Sesiones */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="inline-block w-6 h-6 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                </svg>
            </span>
            Sesiones
        </h3>
        <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] flex-1 w-full">
            <div
                style={{
                    overflowX: "auto",
                    overflowY: "auto",
                    maxHeight: "22vh",
                    scrollbarColor: "#b0b0b0 #f5f5f5",
                    scrollbarWidth: "thin"
                }}
                className="scrollbar-gray w-full"
            >
                <table className="text-xs mb-2 text-black w-full bg-white" style={{ minWidth: "100%" }}>
                    <thead style={{ position: "sticky", top: 0, zIndex: 2, background: "var(--color-background-secondary)" }}>
                        <tr className="bg-[var(--color-background-secondary)] text-white">
                            <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)] rounded-tl-md">Usuario</th>
                            <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Inicio</th>
                            <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Fin</th>
                            <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">IP</th>
                            <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Ubicación</th>
                            <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Duración</th>
                            <th className="px-2 py-1 text-left border-r border-[var(--color-jerarquia1)]">Acciones</th>
                            <th className="px-2 py-1 text-right rounded-tr-md">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Ejemplo de filas */}
                        {Array.from({ length: 15 }).map((_, i) => (
                            <tr key={i}>
                                <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)]">usuario{i + 1}</td>
                                <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)]">2024-06-01 08:00</td>
                                <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)]">2024-06-01 09:00</td>
                                <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)]">192.168.1.{i + 1}</td>
                                <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)]">Oficina {i + 1}</td>
                                <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)]">{i + 1}h 30m</td>
                                <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)]">Consulta</td>
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
    </div>
);

export default CoordinDashboard;