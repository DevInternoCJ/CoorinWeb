import React from "react";

const TableMetas = ({
    tablaMetas,
    loading,
    error,
    selectedRows,
    selectAll,
    handleSelectAll,
    handleRowCheckbox,
    formatCurrencyForDisplay
}) => {
    // Normalizar valores para que siempre se pinte algo aunque vengan null/undefined
    const safe = (val, def = '') => val !== null && val !== undefined ? val : def;
    return (
        <div className="metas-block metas-block-3 bg-white rounded-lg shadow border border-[var(--color-jerarquia1)] flex flex-col min-w-0 min-h-0 w-full h-full overflow-hidden">
            {/* Contenedor de tabla con scroll */}
            <div className="scrollbar-gray w-full flex-1 overflow-auto">
                <table className="modal-table">
                    <thead>
                        <tr>
                            <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <input
                                        type="checkbox"
                                        style={{ marginRight: 6 }}
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                    Cambiar
                                </span>
                            </th>
                            <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>Ejecutivo</th>
                            <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>Usuario</th>
                            <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>Cuentas</th>
                            <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>Titulares</th>
                            <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>Negociaciones</th>
                            <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>Cumplimientos</th>
                            <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>Monto Cumplido</th>
                            <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>Saldo Solucionado</th>
                            <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>Segmento</th>
                            <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>H.Entrada</th>
                            <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 2 }}>H.Salida</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan={12} style={{ textAlign: 'center', height: 120 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 100 }}>
                                        <div className="spinner-sonner" style={{ marginBottom: 12 }}>
                                            <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#111">
                                                <g fill="none" fillRule="evenodd">
                                                    <g transform="translate(1 1)" strokeWidth="3">
                                                        <circle strokeOpacity=".3" cx="18" cy="18" r="18" />
                                                        <path d="M36 18c0-9.94-8.06-18-18-18">
                                                            <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" />
                                                        </path>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                        <span style={{ color: '#2b463c', fontWeight: 500, fontSize: 16 }}>Cargando...</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                        {error && !loading && (
                            <tr>
                                <td colSpan={12} style={{ textAlign: 'center', color: '#b71c1c', fontWeight: 500 }}>
                                    {error}
                                </td>
                            </tr>
                        )}
                        {!loading && !error && tablaMetas.length === 0 && (
                            <tr><td colSpan={12} style={{ textAlign: 'center' }}>Sin datos</td></tr>
                        )}
                        {!loading && !error && tablaMetas
                            .filter(row => {
                                const userData = JSON.parse(localStorage.getItem('userData'));
                                const idEjecutivoSesion = userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
                                return row.idEjecutivo !== Number(idEjecutivoSesion);
                            })
                            .map((row, i) => {
                                const rowKey = row.id || row.usuario || i;
                                return (
                                    <tr
                                        key={rowKey}
                                        className={selectedRows.includes(rowKey) ? 'row-selected' : ''}
                                        style={selectedRows.includes(rowKey)
                                            ? { cursor: 'pointer', background: 'var(--color-jerarquia1)', color: '#000' }
                                            : { cursor: 'pointer' }}
                                        onClick={() => handleRowCheckbox(rowKey)}
                                    >
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(rowKey)}
                                                onChange={() => handleRowCheckbox(rowKey)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </td>
                                        <td style={{ minWidth: '120px', maxWidth: '22vw', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={safe(row.ejecutivo) || safe(row.nombreEjecutivo) || safe(row.nombre)}>
                                            {safe(row.ejecutivo) || safe(row.nombreEjecutivo) || safe(row.nombre)}
                                        </td>
                                        <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={safe(row.usuario) || safe(row.usuarioEjecutivo) || safe(row.clave)}>
                                            {safe(row.usuario) || safe(row.usuarioEjecutivo) || safe(row.clave)}
                                        </td>
                                        <td style={{ textAlign: 'center', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={String(safe(row.cuentas, safe(row.totalCuentas, 0)))}>
                                            {safe(row.cuentas, safe(row.totalCuentas, 0))}
                                        </td>
                                        <td style={{ textAlign: 'center', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={String(safe(row.titulares, safe(row.totalTitulares, 0)))}>
                                            {safe(row.titulares, safe(row.totalTitulares, 0))}
                                        </td>
                                        <td style={{ textAlign: 'center', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={String(safe(row.negociaciones, safe(row.totalNegociaciones, 0)))}>
                                            {safe(row.negociaciones, safe(row.totalNegociaciones, 0))}
                                        </td>
                                        <td style={{ textAlign: 'center', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={String(safe(row.cumplimientos, safe(row.totalCumplimientos, 0)))}>
                                            {safe(row.cumplimientos, safe(row.totalCumplimientos, 0))}
                                        </td>
                                        <td style={{ textAlign: 'center', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={formatCurrencyForDisplay(safe(row.montoCumplido, safe(row.monto_cumplido, 0)))}>
                                            {(() => {
                                                const originalValue = safe(row.montoCumplido, safe(row.monto_cumplido, 0));
                                                return formatCurrencyForDisplay(originalValue);
                                            })()}
                                        </td>
                                        <td style={{ textAlign: 'center', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={formatCurrencyForDisplay(safe(row.saldoSolucionado, safe(row.saldo_solucionado, 0)))}>
                                            {(() => {
                                                const originalValue = safe(row.saldoSolucionado, safe(row.saldo_solucionado, 0));
                                                return formatCurrencyForDisplay(originalValue);
                                            })()}
                                        </td>
                                        <td style={{ textAlign: 'center', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={safe(row.segmento, safe(row.nombreSegmento, '-'))}>
                                            {safe(row.segmento, safe(row.nombreSegmento, '-'))}
                                        </td>
                                        <td style={{ textAlign: 'center', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={safe(row.horaEntrada, safe(row.hora_entrada, '-'))}>
                                            {safe(row.horaEntrada, safe(row.hora_entrada, '-'))}
                                        </td>
                                        <td style={{ textAlign: 'center', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={safe(row.horaSalida, safe(row.hora_salida, '-'))}>
                                            {safe(row.horaSalida, safe(row.hora_salida, '-'))}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default TableMetas;
