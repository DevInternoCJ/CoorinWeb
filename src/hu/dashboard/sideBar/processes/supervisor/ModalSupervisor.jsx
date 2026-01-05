// src/hu/dashboard/sideBar/processes/supervisor/ModalSupervisor.jsx

import React, { useState } from 'react';
import ModalBaseSupervisor from './ModalBaseSupervisor';

const ModalSupervisor = ({ onClose }) => {
    const [cartera, setCartera] = useState('');
    const [modo, setModo] = useState('Asignar');

    // Estados para Asignar
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [consulta, setConsulta] = useState('');
    const [cuentas, setCuentas] = useState(0);

    // Datos de ejemplo para la tabla
    const tableData = [
        { usuario: 'user1', nombreEjecutivo: 'Juan Pérez', segmento: 'VIP' },
        { usuario: 'user2', nombreEjecutivo: 'María García', segmento: 'Regular' },
        { usuario: 'user3', nombreEjecutivo: 'Carlos López', segmento: 'Nuevo' },
        { usuario: 'user4', nombreEjecutivo: 'Ana Rodríguez', segmento: 'VIP' },
        { usuario: 'user5', nombreEjecutivo: 'Pedro Martínez', segmento: 'Regular' },
        { usuario: 'user6', nombreEjecutivo: 'Laura Sánchez', segmento: 'Nuevo' },
        { usuario: 'user7', nombreEjecutivo: 'Miguel González', segmento: 'VIP' },
        { usuario: 'user8', nombreEjecutivo: 'Sofia Díaz', segmento: 'Regular' },
        { usuario: 'user9', nombreEjecutivo: 'David Hernández', segmento: 'Nuevo' },
        { usuario: 'user10', nombreEjecutivo: 'Elena Jiménez', segmento: 'VIP' },
        { usuario: 'user11', nombreEjecutivo: 'Roberto Fernández', segmento: 'Regular' },
        { usuario: 'user12', nombreEjecutivo: 'Carmen Ruiz', segmento: 'Nuevo' },
        { usuario: 'user13', nombreEjecutivo: 'Antonio Morales', segmento: 'VIP' },
        { usuario: 'user14', nombreEjecutivo: 'Isabel Torres', segmento: 'Regular' },
    ];

    const handleCheckboxChange = (usuario) => {
        setSelectedUsers(prev =>
            prev.includes(usuario)
                ? prev.filter(u => u !== usuario)
                : [...prev, usuario]
        );
    };

    const handleAsignar = () => {
        console.log('Asignar:', { selectedUsers, consulta, cuentas });
        // Lógica de asignación
    };

    const renderContent = () => {
        if (modo === 'Asignar') {
            return (
                <div className="p-2 sm:p-4">
                    <div className="metas-block metas-block-3 bg-white rounded-lg shadow border border-[var(--color-jerarquia1)] flex flex-col min-w-0 min-h-0 w-full h-full overflow-hidden mb-2">
                        {/* Contenedor de tabla con scroll */}
                        <div
                            className="scrollbar-gray w-full flex-1"
                            style={{
                                overflowY: 'auto',
                                maxHeight: '400px',
                                minHeight: 0
                            }}
                        >
                            <table className="modal-table" style={{width: '100%', borderCollapse: 'collapse'}}>
                                <thead>
                                    <tr>
                                        <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Asignar</th>
                                        <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Usuario</th>
                                        <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10, minWidth: '200px' }}>Nombre Ejecutivo</th>
                                        <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Segmento</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((row, index) => (
                                        <tr key={index} style={index % 2 === 1 ? { background: '#f9f9f9' } : {}}>
                                            <td style={{ textAlign: 'center', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedUsers.includes(row.usuario)}
                                                    onChange={() => handleCheckboxChange(row.usuario)}
                                                />
                                            </td>
                                            <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.usuario}</td>
                                            <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.nombreEjecutivo}</td>
                                            <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.segmento}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 mb-4">
                        <div className="relative w-full sm:w-48">
                            <select
                                value={consulta}
                                onChange={(e) => setConsulta(e.target.value)}
                                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 disabled:bg-gray-200 disabled:text-gray-500"
                                id="consulta-select"
                            >
                                <option value="" disabled hidden></option>
                                <option value="consulta1">Consulta 1</option>
                                <option value="consulta2">Consulta 2</option>
                                <option value="consulta3">Consulta 3</option>
                            </select>
                            <label
                                htmlFor="consulta-select"
                                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                            >
                                Consulta
                            </label>
                        </div>
                        <div className="flex items-center justify-between w-full sm:w-auto sm:justify-center sm:gap-2">
                            <button
                                onClick={() => setCuentas(Math.max(0, cuentas - 1))}
                                className="w-8 h-8 bg-jerarquia1 text-white rounded hover:bg-jerarquia2 flex items-center justify-center text-sm font-medium"
                            >
                                -
                            </button>
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    value={cuentas}
                                    onChange={(e) => setCuentas(Math.max(0, parseInt(e.target.value) || 0))}
                                    className="peer p-4 block w-full sm:w-20 bg-gray-50 border-transparent rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 disabled:bg-gray-200 disabled:text-gray-500"
                                    id="cuentas-input"
                                    min="0"
                                />
                                <label
                                    htmlFor="cuentas-input"
                                    className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                                >
                                    Cuentas
                                </label>
                            </div>
                            <button
                                onClick={() => setCuentas(cuentas + 1)}
                                className="w-8 h-8 bg-jerarquia1 text-white rounded hover:bg-jerarquia2 flex items-center justify-center text-sm font-medium"
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={handleAsignar}
                            className="px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-jerarquia1 text-white cursor-pointer hover:bg-jerarquia2 w-full sm:w-auto"
                        >
                            Asignar
                        </button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="p-2 sm:p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 mb-4">
                        <div className="relative flex-1">
                            <input
                                type="date"
                                className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                id="fecha-desde-consulta"
                                placeholder=" "
                            />
                            <label
                                htmlFor="fecha-desde-consulta"
                                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
                            >
                                Desde
                            </label>
                        </div>
                        <div className="relative flex-1">
                            <input
                                type="date"
                                className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                                id="fecha-hasta-consulta"
                                placeholder=" "
                            />
                            <label
                                htmlFor="fecha-hasta-consulta"
                                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
                            >
                                Hasta
                            </label>
                        </div>
                        <button
                            className="px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-jerarquia1 text-white cursor-pointer hover:bg-jerarquia2 w-full sm:w-auto"
                        >
                            Buscar
                        </button>
                    </div>
                </div>
            );
        }
    };

    return (
        <ModalBaseSupervisor
            onClose={onClose}
            cartera={cartera}
            setCartera={setCartera}
            modo={modo}
            setModo={setModo}
        >
            {renderContent()}
        </ModalBaseSupervisor>
    );
};

export default ModalSupervisor;