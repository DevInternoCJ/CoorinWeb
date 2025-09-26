import React from "react";

const ModalConsultaCuentasColumnas = () => (
    <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] h-full flex flex-col" style={{ minWidth: 0, width: '300px', maxWidth: '300px' }}>
        <div className="flex items-center mb-2 w-full">
            <span className="modal-span-1 pl-1" style={{ color: "var(--color-jerarquia2)", minWidth: 80 }}>Ejecutivos -</span>
        </div>
        <div
            style={{
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "35vh",
                height: "100%",
                flex: 1,
                width: "100%",
                maxWidth: "100%"
            }}
            className="scrollbar-gray"
        >
            <table className="modal-table" style={{ borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: '0', width: '100%' }}>
                <thead>
                    <tr>
                        <th className="modal-table-th" style={{ padding: '2px 2px', fontWeight: 600, fontSize: '0.95rem', textAlign: 'center', width: '60px', minWidth: '40px' }}>Asignado</th>
                        <th className="modal-table-th" style={{ padding: '2px 2px', fontWeight: 600, fontSize: '0.95rem', textAlign: 'center', width: '80px', minWidth: '60px' }}>Usuario</th>
                        <th className="modal-table-th" style={{ padding: '2px 2px', fontWeight: 600, fontSize: '0.95rem', textAlign: 'center', width: '60px', minWidth: '40px' }}>Restantes</th>
                    </tr>
                </thead>
                <tbody>
                    {[ 
                        { asignado: false, usuario: "BAPV", restantes: 0 },
                        { asignado: false, usuario: "EBMR", restantes: 0 },
                        { asignado: false, usuario: "ROAC", restantes: 0 },
                        { asignado: false, usuario: "VLYI", restantes: 0 },
                        { asignado: false, usuario: "YORC", restantes: 0 },
                        { asignado: false, usuario: "BGRH", restantes: 0 },
                        { asignado: false, usuario: "ALDF", restantes: 0 },
                        { asignado: false, usuario: "RHJM", restantes: 0 },
                        { asignado: false, usuario: "LUJM", restantes: 0 },
                        { asignado: false, usuario: "MSVJ", restantes: 0 },
                        { asignado: false, usuario: "DEZO", restantes: 0 },
                        { asignado: false, usuario: "IREO", restantes: 0 }
                    ].map((row, i) => (
                        <tr key={i}>
                            <td className="modal-table-td" style={{ padding: '2px 2px', textAlign: 'center', width: '60px', minWidth: '40px' }}><input type="checkbox" checked={row.asignado} readOnly className="modal-checkbox-small" /></td>
                            <td className="modal-table-td" style={{ padding: '2px 2px', textAlign: 'center', width: '80px', minWidth: '60px' }}>{row.usuario}</td>
                            <td className="modal-table-td" style={{ padding: '2px 2px', textAlign: 'center', width: '60px', minWidth: '40px' }}>{row.restantes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default ModalConsultaCuentasColumnas;