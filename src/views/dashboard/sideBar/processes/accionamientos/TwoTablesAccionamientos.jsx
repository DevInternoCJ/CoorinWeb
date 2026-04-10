// src/hu/dashboard/sideBar/processes/accionamientos/TableCargaAccionamientos.jsx

import React from 'react';

// Componente para la tabla de carga/consulta de accionamientos
const TableCargaAccionamientos = ({ tipo }) => {
    if (tipo === 'carga') {
        return (
            <div className="metas-block metas-block-3 bg-white rounded-lg shadow border border-[var(--color-jerarquia1)] flex flex-col min-w-0 min-h-0 w-full h-full overflow-hidden">
                {/* Contenedor de tabla con scroll */}
                <div
                    className="scrollbar-gray w-full flex-1"
                    style={{
                        overflowY: 'auto',
                        maxHeight:
                            window.innerWidth >= 1280 && window.innerWidth < 1536
                                ? '40vh'
                                : window.innerWidth >= 1024
                                    ? '40vh'
                                    : '50vh',
                        minHeight: 0
                    }}
                >
                    <table className="modal-table" style={{width: '100%', borderCollapse: 'collapse'}}>
                        <thead>
                            <tr>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10, }}>Expediente</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10, }}>Mensaje</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10, }}>Resultados</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Filas de ejemplo - reemplazar con datos reales */}
                            <tr>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>EXP001</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Mensaje de ejemplo 1</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Resultado 1</td>
                            </tr>
                            <tr style={{ background: '#f9f9f9' }}>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>EXP002</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Mensaje de ejemplo 2</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Resultado 2</td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>EXP003</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Mensaje de ejemplo 3</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Resultado 3</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } else if (tipo === 'consulta') {
        return (
            <div className="metas-block metas-block-3 bg-white rounded-lg shadow border border-[var(--color-jerarquia1)] flex flex-col min-w-0 min-h-0 w-full h-full overflow-hidden">
                {/* Contenedor de tabla con scroll */}
                <div
                    className="scrollbar-gray w-full flex-1"
                    style={{
                        overflowY: 'auto',
                        maxHeight:
                            window.innerWidth >= 1280 && window.innerWidth < 1536
                                ? '40vh'
                                : window.innerWidth >= 1024
                                    ? '40vh'
                                    : '50vh',
                        minHeight: 0
                    }}
                >
                    <table className="modal-table" style={{width: '100%', borderCollapse: 'collapse'}}>
                        <thead>
                            <tr>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10, }}>Resultados</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10, }}>Excel</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10, }}>Fecha</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10, }}>Hora</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10, }}>Numero</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10, }}>Nombre</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10, }}>Descripcion</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10, }}>Rechaza</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10, }}>Eliminar</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10, }}>Resultados</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Filas de ejemplo - reemplazar con datos reales */}
                            <tr>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Resultado 1</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Excel 1</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>2023-01-01</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>10:00</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>12345</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Nombre 1</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Descripción 1</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>No</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Eliminar</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Resultado 1</td>
                            </tr>
                            <tr style={{ background: '#f9f9f9' }}>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Resultado 2</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Excel 2</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>2023-01-02</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>11:00</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>67890</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Nombre 2</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Descripción 2</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Sí</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Eliminar</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Resultado 2</td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Resultado 3</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Excel 3</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>2023-01-03</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>12:00</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>11111</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Nombre 3</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Descripción 3</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>No</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Eliminar</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Resultado 3</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
    return null;
};

export default TableCargaAccionamientos;