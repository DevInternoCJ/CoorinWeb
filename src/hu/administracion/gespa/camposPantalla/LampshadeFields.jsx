import React, { useState } from 'react';
import LogoCoorin from "../../../../assets/logo_coorin_3.svg"
import LogoConjur from "../../../../assets/ConsorcioLetras_OLD.png"

const LampshadeFields = ({ isOpen, onClose }) => {
    const [editando, setEditando] = useState(false);

    if (!isOpen) return null;

    // Datos de ejemplo para la tabla
    const tableData = [
        { customerid: '923706974099MXN', batchdate: '13/07/2020', name: '19680330', loan_productcode: 'SB', recoveredcode: 'TMAC', receiptdate: '10/10/2019', lastpaymentdate: '20/06/2019', initialbalance: '4904.23' },
        { customerid: '399170560091MXN', batchdate: '08/01/2020', name: '19840918', loan_productcode: 'PR', recoveredcode: 'PCMC', receiptdate: '08/01/2020', lastpaymentdate: '24/10/2019', initialbalance: '33880.77' },
        { customerid: '761870246099MXN', batchdate: '19/10/2021', name: '19700923', loan_productcode: 'PR', recoveredcode: 'PCMC', receiptdate: '19/10/2021', lastpaymentdate: '08/10/2021', initialbalance: '5548.90' },
        { customerid: '630139719092MXN', batchdate: '17/04/2025', name: '19760403', loan_productcode: 'PL', recoveredcode: 'WHIC', receiptdate: '09/01/2023', lastpaymentdate: '03/10/2022', initialbalance: '359258.74' },
        { customerid: '602525651095MXN', batchdate: '04/03/2022', name: '19900507', loan_productcode: 'GL', recoveredcode: 'XXXX', receiptdate: '30/10/2020', lastpaymentdate: '02/11/2020', initialbalance: '44287.02' }
    ];

    return (
        <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden border border-gray-300">
                {/* Header */}
                <div className=" text-jerarquia3 p-3 flex justify-between items-center ">
                    <div className=' flex items-center gap-2'><img src={LogoCoorin} alt="Logo-coorin" className=' h-8' /><h2 className="text-xl font-bold">Campos Pantalla - Coorin</h2></div>
                    <button
                        onClick={onClose}
                        className="text-jerarquia3 hover:text-red-600 text-4xl rounded-full w-8 h-8 flex items-center justify-center"
                    >
                        &times;
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)] bg-gray-50 space-y-4">
                    {/* Sección Cantera */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex justify-between">
                        <div>
                            <img src={LogoConjur} alt="logo-conjur" className=' h-14' />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Select de Cartera */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cartera</label>
                                <div className="relative">
                                    <select className="w-full ps-2 pe-7 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 appearance-none">
                                        <option>American Express</option>
                                        <option>Visa</option>
                                        <option>Mastercard</option>
                                        <option>Other</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Select de Producto */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
                                <div className="relative">
                                    <select className="w-full ps-3 pe-7 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 appearance-none">
                                        <option>Amex</option>
                                        <option>Gold Card</option>
                                        <option>Platinum</option>
                                        <option>Centurion</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección Info */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-bold mb-3 text-blue-800 border-b pb-2">Info</h3>
                        <div className="mb-3">
                            <p className="font-medium text-gray-700">Empresa:</p>
                            <div className="ml-4 mt-1 space-y-1">
                                <p className="text-gray-800 font-mono">/ WO \ CBO</p>
                                <p className="text-gray-800 font-mono">No \ 264.00</p>
                                <p className="text-gray-800 font-mono">Ingressos</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-blue-50 p-3 rounded border border-blue-100">
                                <p className="text-sm mb-1"><span className="font-semibold text-blue-800">Asigna:</span> <span className="text-gray-700">08/01/2020</span></p>
                                <p className="text-sm mb-1"><span className="font-semibold text-blue-800">Segment:</span> <span className="text-gray-700">MEDIUM RETURN Primes</span></p>
                                <p className="text-sm mb-1"><span className="font-semibold text-blue-800">Saldo Actual:</span> <span className="text-green-700 font-medium">$ 33,880.77</span></p>
                                <p className="text-sm"><span className="font-semibold text-blue-800">Estado:</span> <span className="text-gray-700">NAYARIT</span></p>
                            </div>
                            <div className="bg-green-50 p-3 rounded border border-green-100">
                                <p className="text-sm mb-1"><span className="font-semibold text-green-800">Cancel:</span> <span className="text-gray-700">04/01/2020</span></p>
                                <p className="text-sm mb-1"><span className="font-semibold text-green-800">Producio:</span> <span className="text-gray-700">Charge PR</span></p>
                                <p className="text-sm mb-1"><span className="font-semibold text-green-800">Saldo Initial:</span> <span className="text-green-700 font-medium">$ 33,880.77</span></p>
                                <p className="text-sm"><span className="font-semibold text-green-800">Dias OA:</span> <span className="text-gray-700">2057</span></p>
                            </div>
                            <div className="bg-purple-50 p-3 rounded border border-purple-100">
                                <p className="text-sm mb-1"><span className="font-semibold text-purple-800">Aniv:</span> <span className="text-gray-700">12/09/2019</span></p>
                                <p className="text-sm mb-1"><span className="font-semibold text-purple-800">AgencyID:</span> <span className="text-gray-700">41 ICMOCO</span></p>
                                <p className="text-sm mb-1"><span className="font-semibold text-purple-800">Min Más Atrasado:</span> <span className="text-red-600 font-medium">$ 23,000.00</span></p>
                                <p className="text-sm"><span className="font-semibold text-purple-800">Ejecutivo:</span> <span className="text-gray-700">E- ANT</span></p>
                            </div>
                            <div className="bg-gray-100 p-3 rounded border border-gray-200">
                                <p className="text-sm mb-1"><span className="font-semibold text-gray-800">Corte:</span> <span className="text-gray-700">06/09/2025</span></p>
                                <p className="text-sm mb-1"><span className="font-semibold text-gray-800">Inv:</span> <span className="text-gray-700">Último Pago</span></p>
                                <p className="text-sm"><span className="font-semibold text-gray-800">Feh Últ Pago:</span> <span className="text-gray-500">-</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Sección Posicion */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-bold mb-3 text-blue-800 border-b pb-2">Posicion</h3>
                        <div className="mb-3">
                            <div className="flex space-x-2 mb-4">
                                <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm border border-blue-200 hover:bg-blue-200 font-medium">Altas</button>
                                <button className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm border border-green-200 hover:bg-green-200 font-medium">Campos</button>
                                <button className="px-3 py-1 bg-purple-100 text-purple-800 rounded text-sm border border-purple-200 hover:bg-purple-200 font-medium">Formato Campo</button>
                                <button className="px-3 py-1 bg-amber-100 text-amber-800 rounded text-sm border border-amber-200 hover:bg-amber-200 font-medium">Resultado</button>
                            </div>

                            <div className="space-y-2">
                                <div className="grid grid-cols-12 gap-2 items-center p-2 hover:bg-blue-50 rounded">
                                    <div className="col-span-1 text-sm font-bold text-blue-800">1</div>
                                    <div className="col-span-4 text-sm text-gray-700">Empresa [employersname]; [employersaddress]</div>
                                    <div className="col-span-2 text-sm text-gray-500 italic">Texto</div>
                                    <div className="col-span-5">
                                        <button className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs border border-blue-200 font-medium">Resultado</button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 gap-2 items-center p-2 hover:bg-green-50 rounded">
                                    <div className="col-span-1 text-sm font-bold text-green-800">2</div>
                                    <div className="col-span-4 text-sm text-gray-700">WO \ CBO / Ingressos [WO?] \ [CBO] \ [BloqueoHerramienta] \ [month/mcome]</div>
                                    <div className="col-span-2 text-sm text-gray-500 italic">Numero</div>
                                    <div className="col-span-5">
                                        <button className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs border border-green-200 font-medium">Sobre Resultado</button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 gap-2 items-center p-2 hover:bg-blue-50 rounded">
                                    <div className="col-span-1 text-sm font-bold text-blue-800">3</div>
                                    <div className="col-span-4 text-sm text-gray-700">Asigna [batchdate]</div>
                                    <div className="col-span-2 text-sm text-gray-500 italic">Fecha</div>
                                    <div className="col-span-5">
                                        <button className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs border border-blue-200 font-medium">Resultado</button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 gap-2 items-center p-2 hover:bg-green-50 rounded">
                                    <div className="col-span-1 text-sm font-bold text-green-800">4</div>
                                    <div className="col-span-4 text-sm text-gray-700">Segment [CollectibilityCode] [SegmentoAMX] [DescuentoAMX]</div>
                                    <div className="col-span-2 text-sm text-gray-500 italic">Texto</div>
                                    <div className="col-span-5">
                                        <button className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs border border-green-200 font-medium">Sobre Resultado</button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 gap-2 items-center p-2 hover:bg-green-50 rounded">
                                    <div className="col-span-1 text-sm font-bold text-green-800">5</div>
                                    <div className="col-span-4 text-sm text-gray-700">Saldo Actual [CurrentbalanceG]</div>
                                    <div className="col-span-2 text-sm text-gray-500 italic">Moneda</div>
                                    <div className="col-span-5">
                                        <button className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs border border-green-200 font-medium">Sobre Resultado</button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 gap-2 items-center p-2 hover:bg-gray-100 rounded">
                                    <div className="col-span-1 text-sm font-bold text-gray-800">6</div>
                                    <div className="col-span-4 text-sm text-gray-700">Estado [Estado]</div>
                                    <div className="col-span-2 text-sm text-gray-500 italic">Texto</div>
                                    <div className="col-span-5">
                                        <button className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs border border-gray-300 font-medium">Normal</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección Batchdate */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-bold mb-3 text-blue-800 border-b pb-2">batchdate</h3>
                        <div className="overflow-x-auto border rounded-lg">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr className="bg-gray-200 border-b">
                                        <th className="py-2 px-3 text-left text-xs font-bold text-gray-700 uppercase bg-gray-300">customerid</th>
                                        <th className="py-2 px-3 text-left text-xs font-bold text-gray-700 uppercase bg-gray-300">batchdate</th>
                                        <th className="py-2 px-3 text-left text-xs font-bold text-gray-700 uppercase bg-gray-300">name</th>
                                        <th className="py-2 px-3 text-left text-xs font-bold text-gray-700 uppercase bg-gray-300">loan_productcode</th>
                                        <th className="py-2 px-3 text-left text-xs font-bold text-gray-700 uppercase bg-gray-300">recoveredcode</th>
                                        <th className="py-2 px-3 text-left text-xs font-bold text-gray-700 uppercase bg-gray-300">receiptdate</th>
                                        <th className="py-2 px-3 text-left text-xs font-bold text-gray-700 uppercase bg-gray-300">lastpaymentdate</th>
                                        <th className="py-2 px-3 text-left text-xs font-bold text-gray-700 uppercase bg-gray-300">initialbalance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((row, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                            <td className="py-2 px-3 text-sm border-b font-mono">{row.customerid}</td>
                                            <td className="py-2 px-3 text-sm border-b">{row.batchdate}</td>
                                            <td className="py-2 px-3 text-sm border-b font-mono">{row.name}</td>
                                            <td className="py-2 px-3 text-sm border-b font-medium">{row.loan_productcode}</td>
                                            <td className="py-2 px-3 text-sm border-b">{row.recoveredcode}</td>
                                            <td className="py-2 px-3 text-sm border-b">{row.receiptdate}</td>
                                            <td className="py-2 px-3 text-sm border-b">{row.lastpaymentdate}</td>
                                            <td className="py-2 px-3 text-sm border-b font-medium">${row.initialbalance}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Sección Editando */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-bold mb-3 text-blue-800 border-b pb-2">Editando</h3>
                        <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-md">
                            <p className="text-center text-yellow-800 font-medium">Modo de edición activado</p>
                            <div className="mt-4 flex justify-center">
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
                                    onClick={() => setEditando(!editando)}
                                >
                                    {editando ? 'Desactivar Edición' : 'Activar Edición'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LampshadeFields;