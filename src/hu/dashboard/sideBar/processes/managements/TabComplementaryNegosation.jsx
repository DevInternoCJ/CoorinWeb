// negociacion complemento
import React, { useState } from 'react';

const TabComplementaryNegosation = () => {
    const [cartera, setCartera] = useState('');
    const [producto, setProducto] = useState('');
    const [cuenta, setCuenta] = useState('');
    const [monto, setMonto] = useState('');
    const [fecha, setFecha] = useState('');
    const [recurrente, setRecurrente] = useState(false);
    const [usuario, setUsuario] = useState('');
    const [montoNego, setMontoNego] = useState('');
    const [montoReq, setMontoReq] = useState('');
    const [saldo, setSaldo] = useState('');
    const [descuento, setDescuento] = useState('');
    const [tieneRegistros, setTieneRegistros] = useState(false);

    const handleAgregar = () => {
        console.log('Agregar negociación');
        setTieneRegistros(true);
    };

    return (
        <div className="p-6 flex flex-col h-full space-y-4">
            {/* Row 1: Select Cartera, Select Producto, Input Cuenta */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                {/* Select Cartera */}
                <div className="relative flex-1">
                    <select
                        value={cartera}
                        onChange={(e) => setCartera(e.target.value)}
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="cartera-select-negosation"
                    >
                        <option value="" disabled hidden></option>
                        <option value="cartera1">Cartera 1</option>
                        <option value="cartera2">Cartera 2</option>
                        <option value="cartera3">Cartera 3</option>
                    </select>
                    <label
                        htmlFor="cartera-select-negosation"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Cartera
                    </label>
                </div>

                {/* Select Producto */}
                <div className="relative flex-1">
                    <select
                        value={producto}
                        onChange={(e) => setProducto(e.target.value)}
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="producto-select-negosation"
                    >
                        <option value="" disabled hidden></option>
                        <option value="producto1">Producto 1</option>
                        <option value="producto2">Producto 2</option>
                        <option value="producto3">Producto 3</option>
                    </select>
                    <label
                        htmlFor="producto-select-negosation"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Producto
                    </label>
                </div>

                {/* Input Cuenta */}
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={cuenta}
                        onChange={(e) => setCuenta(e.target.value)}
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="cuenta-input-negosation"
                        placeholder=" "
                    />
                    <label
                        htmlFor="cuenta-input-negosation"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-sm peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Cuenta
                    </label>
                </div>
            </div>

            {/* Row 2: Input Monto, Fecha y Checkbox Recurrente */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                {/* Input Monto */}
                <div className="relative flex-1">
                    <input
                        type="number"
                        value={monto}
                        onChange={(e) => setMonto(e.target.value)}
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="monto-input-negosation"
                        placeholder=" "
                    />
                    <label
                        htmlFor="monto-input-negosation"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-sm peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Monto
                    </label>
                </div>

                {/* Input Fecha */}
                <div className="relative flex-1">
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="fecha-input-negosation"
                        placeholder=" "
                    />
                    <label
                        htmlFor="fecha-input-negosation"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                        Fecha
                    </label>
                </div>

                {/* Checkbox Recurrente */}
                <div className="flex items-center justify-center flex-1">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={recurrente}
                            onChange={(e) => setRecurrente(e.target.checked)}
                            className="w-4 h-4 text-jerarquia1 bg-gray-50 border-gray-300 rounded focus:ring-jerarquia1 focus:ring-2"
                        />
                        <span className="ml-2 text-sm text-gray-700">Recurrente</span>
                    </label>
                </div>
            </div>

            {/* Row 3: Inputs Usuario, Monto Nego, Monto Req, Saldo, Descuento y Botón Agregar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-4 lg:flex-nowrap">
                {/* Input Usuario */}
                <div className="relative flex-1 sm:basis-[calc(33.333%-0.667rem)] lg:basis-auto">
                    <input
                        type="text"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="usuario-input-negosation"
                        placeholder=" "
                    />
                    <label
                        htmlFor="usuario-input-negosation"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-sm peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Usuario
                    </label>
                </div>

                {/* Input Monto Nego */}
                <div className="relative flex-1 sm:basis-[calc(33.333%-0.667rem)] lg:basis-auto">
                    <input
                        type="number"
                        value={montoNego}
                        onChange={(e) => setMontoNego(e.target.value)}
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="monto-nego-input-negosation"
                        placeholder=" "
                    />
                    <label
                        htmlFor="monto-nego-input-negosation"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-sm peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Monto Nego
                    </label>
                </div>

                {/* Input Monto Req */}
                <div className="relative flex-1 sm:basis-[calc(33.333%-0.667rem)] lg:basis-auto">
                    <input
                        type="number"
                        value={montoReq}
                        onChange={(e) => setMontoReq(e.target.value)}
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="monto-req-input-negosation"
                        placeholder=" "
                    />
                    <label
                        htmlFor="monto-req-input-negosation"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-sm peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Monto Req
                    </label>
                </div>

                {/* Input Saldo */}
                <div className="relative flex-1 sm:basis-[calc(33.333%-0.667rem)] lg:basis-auto">
                    <input
                        type="number"
                        value={saldo}
                        onChange={(e) => setSaldo(e.target.value)}
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="saldo-input-negosation"
                        placeholder=" "
                    />
                    <label
                        htmlFor="saldo-input-negosation"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-sm peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Saldo
                    </label>
                </div>

                {/* Input Descuento */}
                <div className="relative flex-1 sm:basis-[calc(33.333%-0.667rem)] lg:basis-auto">
                    <input
                        type="number"
                        value={descuento}
                        onChange={(e) => setDescuento(e.target.value)}
                        className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="descuento-input-negosation"
                        placeholder=" "
                    />
                    <label
                        htmlFor="descuento-input-negosation"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-sm peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Descuento
                    </label>
                </div>

                {/* Botón Agregar */}
                <div className="flex items-center sm:basis-[calc(33.333%-0.667rem)] lg:basis-auto">
                    <button
                        onClick={handleAgregar}
                        className="btn-success w-full px-6 py-2 text-sm font-medium rounded-lg shadow-sm flex justify-center items-center"
                    >
                        Agregar
                    </button>
                </div>
            </div>

            {/* Tabla de Negociaciones */}
            <div className="flex-1 metas-block metas-block-3 bg-white rounded-lg shadow border border-[var(--color-jerarquia1)] flex flex-col min-w-0 min-h-0 overflow-hidden">
                <div
                    className="scrollbar-gray w-full flex-1"
                    style={{
                        overflowY: 'auto',
                        maxHeight: !tieneRegistros
                            ? (window.innerWidth >= 1024 ? '15vh' : '20vh')
                            : (window.innerWidth >= 1280 && window.innerWidth < 1536
                                ? '30vh'
                                : window.innerWidth >= 1024
                                    ? '30vh'
                                    : '40vh'),
                        minHeight: '150px'
                    }}
                >
                    <table className="modal-table" style={{width: '100%', borderCollapse: 'collapse'}}>
                        <thead>
                            <tr>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Plazo</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Cuenta</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Monto</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Fecha</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!tieneRegistros ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', verticalAlign: 'middle', padding: '8px', height: '150px' }}>
                                        <span>Aún no se carga Archivo</span>
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    {/* Filas de ejemplo */}
                                    <tr>
                                        <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>12 meses</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>00000017288</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>$15,000.00</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>05/01/2026</td>
                                <td style={{ textAlign: 'center', padding: '8px' }}>
                                    <button className="text-red-600 hover:text-red-800 text-sm">Eliminar</button>
                                </td>
                            </tr>
                            <tr style={{ background: '#f9f9f9' }}>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>6 meses</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>00000017289</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>$8,500.00</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>30/12/2025</td>
                                <td style={{ textAlign: 'center', padding: '8px' }}>
                                    <button className="text-red-600 hover:text-red-800 text-sm">Eliminar</button>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>24 meses</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>00000017290</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>$22,000.00</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>29/12/2025</td>
                                <td style={{ textAlign: 'center', padding: '8px' }}>
                                    <button className="text-red-600 hover:text-red-800 text-sm">Eliminar</button>
                                </td>
                            </tr>
                            <tr style={{ background: '#f9f9f9' }}>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>18 meses</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>00000017291</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>$12,300.00</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>28/12/2025</td>
                                <td style={{ textAlign: 'center', padding: '8px' }}>
                                    <button className="text-red-600 hover:text-red-800 text-sm">Eliminar</button>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>9 meses</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>00000017292</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>$9,750.00</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>27/12/2025</td>
                                <td style={{ textAlign: 'center', padding: '8px' }}>
                                    <button className="text-red-600 hover:text-red-800 text-sm">Eliminar</button>
                                </td>
                            </tr>
                            <tr style={{ background: '#f9f9f9' }}>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>36 meses</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>00000017293</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>$28,500.00</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>26/12/2025</td>
                                <td style={{ textAlign: 'center', padding: '8px' }}>
                                    <button className="text-red-600 hover:text-red-800 text-sm">Eliminar</button>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>15 meses</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>00000017294</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>$18,200.00</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>25/12/2025</td>
                                <td style={{ textAlign: 'center', padding: '8px' }}>
                                    <button className="text-red-600 hover:text-red-800 text-sm">Eliminar</button>
                                </td>
                            </tr>
                            <tr style={{ background: '#f9f9f9' }}>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>10 meses</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>00000017295</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>$11,400.00</td>
                                <td style={{ textAlign: 'left', padding: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>24/12/2025</td>
                                <td style={{ textAlign: 'center', padding: '8px' }}>
                                    <button className="text-red-600 hover:text-red-800 text-sm">Eliminar</button>
                                </td>
                            </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TabComplementaryNegosation;