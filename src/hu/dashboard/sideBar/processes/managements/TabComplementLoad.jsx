//carga complemento
import React, { useState } from 'react';

const TabComplementLoad = () => {
    const [cartera, setCartera] = useState('');
    const [rutaArchivo, setRutaArchivo] = useState('');

    const handleFileSelect = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                setRutaArchivo(file.name);
            }
        };
        input.click();
    };

    return (
        <div className="p-6 flex flex-col h-full space-y-4">
            {/* Primera fila con select, input y botón */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                {/* Select Cartera */}
                <div className="relative flex-1">
                    <select
                        value={cartera}
                        onChange={(e) => setCartera(e.target.value)}
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="cartera-select"
                    >
                        <option value="" disabled hidden></option>
                        <option value="cartera1">Cartera 1</option>
                        <option value="cartera2">Cartera 2</option>
                        <option value="cartera3">Cartera 3</option>
                    </select>
                    <label
                        htmlFor="cartera-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Cartera
                    </label>
                </div>

                {/* Input con botón anidado */}
                <div className="relative flex-[2]">
                    <input
                        type="text"
                        value={rutaArchivo}
                        readOnly
                        className="peer p-4 pr-24 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        id="archivo-input"
                        placeholder=" "
                    />
                    <label
                        htmlFor="archivo-input"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-sm peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Archivo
                    </label>
                    <button
                        type="button"
                        onClick={handleFileSelect}
                        className="btn-success absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 text-sm font-medium rounded"
                    >
                        Archivo
                    </button>
                </div>
            </div>

            {/* Tabla vacía con mensaje */}
            <div className="metas-block metas-block-3 bg-white rounded-lg shadow border border-[var(--color-jerarquia1)] flex flex-col min-w-0 min-h-0 w-full h-full overflow-hidden">
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
                        minHeight: '0'
                    }}
                >
                    <table className="modal-table" style={{width: '100%', borderCollapse: 'collapse'}}>
                        <thead>
                            <tr>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Expediente</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Mensaje</th>
                                <th style={{ whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 10 }}>Resultados</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ height: '210px' }}>
                                <td colSpan="3" style={{ textAlign: 'center', verticalAlign: 'middle', padding: '8px' }}>
                                    <span>Aún no se carga Archivo</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TabComplementLoad;