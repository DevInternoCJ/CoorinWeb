import React from "react";
import ConsorcioLogo from "../../../../../assets/logo_coorin_7.svg";

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

const ReportingPaymentsContent = ({ mostrarTabla, setMostrarTabla }) => {
    // El tamaño del modal ahora lo controla el padre, así que solo usamos mostrarTabla/setMostrarTabla
    return (
        <div style={{ width: '100%', height: '100%' }} className="flex flex-col items-center min-h-[400px]">
            {/* Logo centrado arriba de los campos */}
            <div className="flex flex-col items-center w-full">
                <img src={ConsorcioLogo} alt="Logo Coorin" className="h-20 w-20 object-contain mx-auto" />
            </div>
            {/* Contenedor centralizado para los campos y botones */}
            <div
                className="flex flex-col items-center w-full"
                style={{
                    flex: 1,
                    marginTop: mostrarTabla ? '2.2rem' : '1.2rem', // más espacio cuando la tabla está visible
                    transition: 'margin-top 0.2s',
                }}
            >
                <div
                    className="flex gap-3 w-full max-w-xs justify-center"
                    style={{ marginBottom: mostrarTabla ? '1.2rem' : '1.2rem' }}
                >
                    <div className="hs-input-group w-full">
                        <span className="hs-input-group-text min-w-[90px]">Desde</span>
                        <input
                            type="date"
                            className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            defaultValue={new Date().toISOString().slice(0, 10)}
                        />
                    </div>
                    <div className="hs-input-group w-full">
                        <span className="hs-input-group-text min-w-[90px]">Hasta</span>
                        <input
                            type="date"
                            className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            defaultValue={new Date().toISOString().slice(0, 10)}
                        />
                    </div>
                </div>
                {/* Dropdown Consulta con estilos de Preline */}
                <div className="relative w-full max-w-xs" style={{ marginBottom: '0.7rem' }}>
                    <select
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        defaultValue=""
                        id="consulta-select-reporting"
                    >
                        <option value="">- Todas -</option>
                        <option value="pagadas">Pagadas</option>
                        <option value="pendientes">Pendientes</option>
                    </select>
                    <label
                        htmlFor="consulta-select-reporting"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Consulta
                    </label>
                </div>
                <div className="flex gap-3 w-full max-w-xs justify-center" style={{ marginBottom: '0.7rem' }}>
                    <button
                        type="button"
                        className="btn-success w-full sm:w-auto min-w-[120px] max-w-full px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                        style={{ margin: '0 auto', display: 'block' }}
                        onClick={() => setMostrarTabla(true)}
                    >
                        Buscar
                    </button>
                    <button
                        type="button"
                        className="btn-info w-full sm:w-auto min-w-[120px] max-w-full px-6 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                        style={{ margin: '0 auto', display: 'block' }}
                        disabled={!mostrarTabla}
                    >
                        Exportar
                    </button>
                </div>
            </div>
            {mostrarTabla && (
                <div style={{ width: '100%', maxWidth: 1000, marginTop: 0, marginBottom: 12, borderRadius: 8, border: '1px solid #e0e0e0', background: '#fff', overflow: 'visible' }}>
                    <table className="modal-table" style={{ minWidth: 900, width: '100%', maxWidth: '100%' }}>
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
            {/* Footer informativo */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', minHeight: 32, marginTop: 8 }}>
                {!mostrarTabla ? (
                    <span className="text-gray-600 text-sm pl-2">
                        Seleccione un intervalo para mostrar los pagos reportados y dé click en "Buscar".
                    </span>
                ) : (
                    <span className="text-gray-600 text-sm pl-2">
                        Búsqueda realizada exitosamente, oprima 'Exportar' si desea que el se exporte a Excel
                    </span>
                )}
            </div>
        </div>
    );
};

export default ReportingPaymentsContent;
