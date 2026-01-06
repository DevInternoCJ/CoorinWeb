// editar gestiones
import React, { useState } from 'react';

const TabEditManagement = () => {
    const [cartera, setCartera] = useState('');
    const [cuenta, setCuenta] = useState('');
    const [comentario, setComentario] = useState('');
    const [hasBuscado, setHasBuscado] = useState(false);

    const handleBuscar = () => {
        console.log('Buscar cuenta:', cuenta);
        setHasBuscado(true);
    };

    return (
        <div className="p-6 flex flex-col h-full space-y-4">
            {/* Row 1: Select Cartera, Input Cuenta y Botón Buscar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                {/* Select Cartera */}
                <div className="relative flex-1">
                    <select
                        value={cartera}
                        onChange={(e) => setCartera(e.target.value)}
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="cartera-select-edit"
                    >
                        <option value="" disabled hidden></option>
                        <option value="cartera1">Cartera 1</option>
                        <option value="cartera2">Cartera 2</option>
                        <option value="cartera3">Cartera 3</option>
                    </select>
                    <label
                        htmlFor="cartera-select-edit"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Cartera
                    </label>
                </div>

                {/* Input Cuenta (no editable) */}
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={cuenta}
                        onChange={(e) => setCuenta(e.target.value)}
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="cuenta-input"
                        placeholder=" "
                    />
                    <label
                        htmlFor="cuenta-input"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-sm peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Cuenta
                    </label>
                </div>

                {/* Botón Buscar */}
                <div className="flex items-center">
                    <button
                        onClick={handleBuscar}
                        className="btn-info w-full px-6 py-2 text-sm font-medium rounded-lg shadow-sm flex justify-center items-center"
                    >
                        Buscar
                    </button>
                </div>
            </div>

            {/* Row 2: Tabla y Textarea apilados */}
            <div className="flex-1 flex flex-col gap-4 min-h-0">
                {/* Tabla */}
                <div className="flex-1 metas-block metas-block-3 bg-white rounded-lg shadow border border-[var(--color-jerarquia1)] flex flex-col min-w-0 min-h-0 overflow-hidden">
                    <div
                        className="scrollbar-gray w-full flex-1"
                        style={{
                            overflowY: 'auto',
                            maxHeight:
                                window.innerWidth >= 1280 && window.innerWidth < 1536
                                    ? '30vh'
                                    : window.innerWidth >= 1024
                                        ? '30vh'
                                        : '40vh',
                            minHeight: '150px'
                        }}
                    >
                        <table className="modal-table" style={{width: '100%', borderCollapse: 'collapse'}}>
                            <thead>
                                <tr>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Fecha</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Hora</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Contacto</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Situación</th>
                                    <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Ejecutivo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!hasBuscado ? (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', verticalAlign: 'middle', padding: '8px', height: '150px' }}>
                                            <span>Aún no se carga Archivo</span>
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {/* Filas de ejemplo */}
                                        <tr>
                                            <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>05/01/2026</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>09:37:25</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Titular</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Confirmar negociación</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Cesar Enrique Rodr</td>
                                </tr>
                                <tr style={{ background: '#f9f9f9' }}>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>30/12/2025</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>14:09:36</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Titular</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Reporte de pago</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Alan De La O Flores</td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>29/12/2025</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>14:32:40</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Titular</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Confirmar negociación</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Uriel Martinez Pasc</td>
                                </tr>
                                <tr style={{ background: '#f9f9f9' }}>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>29/12/2025</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>13:30:36</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Referencia</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Promesa de pago</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Maria Lopez Garcia</td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>28/12/2025</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>16:45:12</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Titular</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Sin contacto</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Roberto Sanchez Ruiz</td>
                                </tr>
                                <tr style={{ background: '#f9f9f9' }}>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>27/12/2025</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>10:22:18</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Titular</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Acuerdo de pago</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Juan Carlos Mendez</td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>26/12/2025</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>15:18:45</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Referencia</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Número equivocado</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Ana Patricia Torres</td>
                                </tr>
                                <tr style={{ background: '#f9f9f9' }}>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>24/12/2025</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>11:55:30</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Titular</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Liquidación total</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Luis Fernando Gomez</td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>23/12/2025</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>09:12:50</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Titular</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Solicitud de prórroga</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Sofia Ramirez Castro</td>
                                </tr>
                                <tr style={{ background: '#f9f9f9' }}>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>22/12/2025</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>14:40:25</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Referencia</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Información proporcionada</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Diego Hernandez Paz</td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>21/12/2025</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>16:28:15</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Titular</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Reclamo de deuda</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Carmen Gutierrez Vega</td>
                                </tr>
                                <tr style={{ background: '#f9f9f9' }}>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>20/12/2025</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>12:15:42</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Titular</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Confirmar negociación</td>
                                    <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Pedro Morales Silva</td>
                                </tr>                                    </>
                                )}                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Textarea con botón */}
                <div className="relative min-h-[100px] flex-shrink-0">
                    <textarea
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        className="w-full h-full p-4 pr-28 pb-4 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 resize-y"
                        placeholder="prueba de sistemas"
                        style={{ 
                            minHeight: '100px',
                            backgroundImage: 'linear-gradient(135deg, transparent 50%, #000 50%), linear-gradient(45deg, transparent 50%, #000 50%)',
                            backgroundPosition: 'calc(100% - 8px) calc(100% - 8px), calc(100% - 4px) calc(100% - 4px)',
                            backgroundSize: '8px 8px, 8px 8px',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                    <button
                        type="button"
                        className="btn-success absolute right-5 bottom-3 px-6 py-2 text-sm font-medium rounded-lg shadow-sm"
                    >
                        Editar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TabEditManagement;