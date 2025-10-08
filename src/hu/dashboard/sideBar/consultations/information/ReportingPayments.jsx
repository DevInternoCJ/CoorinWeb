import React, { useState } from "react";

const dataEjemplo = [
    {
        cartera: "American Ex...",
        cuenta: "3401061774...",
        nombre: "Edgar Ramse...",
        fecha: "21/08/2025",
        hora: "08:28:30",
        monto: "$ 1000.00",
        referencia: "",
        sucursal: "bancomer"
    },
    {
        cartera: "American Ex...",
        cuenta: "3401061840...",
        nombre: "Carlos Espin...",
        fecha: "21/08/2025",
        hora: "10:33:20",
        monto: "$ 30000.00",
        referencia: "",
        sucursal: "bancomer"
    },
    {
        cartera: "American Ex...",
        cuenta: "3401062263...",
        nombre: "Karen Daniela...",
        fecha: "20/08/2025",
        hora: "18:19:32",
        monto: "$ 50000.00",
        referencia: "",
        sucursal: "Sanbors"
    },
    {
        cartera: "American Ex...",
        cuenta: "3401067461...",
        nombre: "Angel Gabriel...",
        fecha: "21/08/2025",
        hora: "11:11:29",
        monto: "$ 40850.65",
        referencia: "w1962459053",
        sucursal: "MYCA"
    },
    {
        cartera: "American Ex...",
        cuenta: "3401352373...",
        nombre: "Blanca Veroni...",
        fecha: "21/08/2025",
        hora: "12:26:33",
        monto: "$ 22719.47",
        referencia: "",
        sucursal: "BANAMEX"
    },
    {
        cartera: "American Ex...",
        cuenta: "3401353052...",
        nombre: "Juana Garcia ...",
        fecha: "21/08/2025",
        hora: "10:04:42",
        monto: "$ 1.00",
        referencia: "",
        sucursal: ""
    },
    {
        cartera: "American Ex...",
        cuenta: "3707823707...",
        nombre: "Maria Esther ...",
        fecha: "20/08/2025",
        hora: "11:53:45",
        monto: "$ 6870.00",
        referencia: "535823",
        sucursal: "WALLMART"
    },
    {
        cartera: "American Ex...",
        cuenta: "3707841430...",
        nombre: "Miriam Marti...",
        fecha: "21/08/2025",
        hora: "12:02:45",
        monto: "$ 3700.00",
        referencia: "571361",
        sucursal: "WALLMART"
    }
];

const ReportingPaymentsContent = () => {
    const [mostrarTabla, setMostrarTabla] = useState(false);

    return (
        <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box', overflow: 'hidden' }}>
            <div style={{ width: '100%', marginBottom: '1.2rem', display: 'flex', gap: 16, justifyContent: 'center' }}>
                <input type="date" className="modal-dropdown-select" style={{ width: 140 }} defaultValue={new Date().toISOString().slice(0, 10)} />
                <input type="date" className="modal-dropdown-select" style={{ width: 140 }} defaultValue={new Date().toISOString().slice(0, 10)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12, gap: 12 }}>
                <span className="modal-span-2">Consulta</span>
                <select className="modal-dropdown-select" style={{ width: 140 }} defaultValue="">
                    <option value="">- Todas -</option>
                    <option value="pagadas">Pagadas</option>
                    <option value="pendientes">Pendientes</option>
                </select>
            </div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 12, width: '100%', justifyContent: 'center' }}>
                <button className="modal-btn" style={{ background: '#526581', color: '#fff', minWidth: 120 }} onClick={() => setMostrarTabla(true)}>
                    Buscar
                </button>
                <button className="modal-btn" style={{ background: 'var(--color-jerarquia2)', color: '#fff', minWidth: 120 }} disabled={!mostrarTabla}>
                    Exportar
                </button>
            </div>
            {mostrarTabla && (
                <div style={{ width: '100%', maxWidth: '100%', overflowX: 'auto', marginBottom: 12, maxHeight: 220, overflowY: 'auto', borderRadius: 8, border: '1px solid #e0e0e0', background: '#fff' }}>
                    <table className="modal-table" style={{ minWidth: 700, width: '100%', maxWidth: '100%' }}>
                        <thead>
                            <tr>
                                <th>Cartera</th>
                                <th>Cuenta</th>
                                <th>NombreEje...</th>
                                <th>Fecha Pago</th>
                                <th>Hora</th>
                                <th>Monto Pago</th>
                                <th>Referencia</th>
                                <th>Sucursal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataEjemplo.map((row, idx) => (
                                <tr key={idx}>
                                    <td>{row.cartera}</td>
                                    <td>{row.cuenta}</td>
                                    <td>{row.nombre}</td>
                                    <td>{row.fecha}</td>
                                    <td>{row.hora}</td>
                                    <td>{row.monto}</td>
                                    <td>{row.referencia}</td>
                                    <td>{row.sucursal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="modal-span-2" style={{ fontSize: 14, marginTop: 8, textAlign: 'center' }}>
                {mostrarTabla
                    ? "Búsqueda realizada exitosamente, oprima 'Exportar' si desea que el se exporte a Excel"
                    : ""}
            </div>
        </div>
    );
};

export default ReportingPaymentsContent;
