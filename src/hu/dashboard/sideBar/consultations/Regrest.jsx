import React, { useState, useEffect } from "react";
import ConsorcioLogo from "../../../../assets/logo_coorin_7.svg";
import { getRegrest, infoEjecutivo } from "../../../../services/mark/albaz/LokiServices";

const RegrestContent = () => {
    
    const [valor, setValor] = useState("");
    const [resultados, setResultados] = useState(null); // array de arrepentimientos
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [cartera, setCartera] = useState(() => {
        const ud = JSON.parse(localStorage.getItem('userData') || '{}');
        return ud?.idCartera || ud?.idcartera || ud?.cartera || 1;
    });
    const [carterasOptions, setCarterasOptions] = useState([]);

    // Obtener idCartera desde localStorage
    const getIdCartera = () => {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        return userData?.idCartera || userData?.idcartera || userData?.cartera || 1; // fallback a 1 si no existe
    };

    // Obtener idEjecutivo desde localStorage
    const getIdEjecutivo = () => {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        return userData?.idEjecutivo ?? userData?.idejecutivo ?? userData?.ejecutivo ?? null;
    };

    // Cargar carteras (similar a Addresses.jsx)
    useEffect(() => {
        const idEjecutivo = getIdEjecutivo();
        if (!idEjecutivo) return;
        infoEjecutivo(idEjecutivo)
            .then((data) => {
                const carterasUnicas = Array.isArray(data)
                    ? Array.from(new Map(data.map(item => [item.idCartera, { id: item.idCartera, nombre: item.NombreCartera || `Cartera ${item.idCartera}` }])).values())
                    : [];
                setCarterasOptions(carterasUnicas);
                // Si cartera actual no está en opciones, mantenerla
            })
            .catch(() => setCarterasOptions([]));
    }, []);

    const handleBuscar = async () => {
        setResultados(null);
        setError(null);
        if (!valor) {
            setError("Ingrese una cuenta para buscar.");
            return;
        }
        
        const idCartera = getIdCartera();
        console.log('🔍 Usando idCartera:', idCartera);
        
        setLoading(true);
        try {
            const data = await getRegrest({ idCartera, cuenta: valor });
            if (Array.isArray(data) && data.length > 0) {
                // Ordenar por fecha y hora descendente
                const ordenados = [...data].sort((a, b) => {
                    const fechaA = new Date(a.fecha_Hora);
                    const fechaB = new Date(b.fecha_Hora);
                    return fechaB - fechaA;
                });
                setResultados(ordenados);
            } else {
                setResultados([]);
            }
        } catch (error) {
            console.error('Error al buscar arrepentimientos:', error);
            setError("Verifica que la cuenta sea correcta.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full p-6 box-border flex flex-col min-h-[360px]">
            <div className="mb-3">
                <img src={ConsorcioLogo} alt="Logo Coorin" className="h-20 w-20 object-contain mx-auto" />
                <div className="relative w-full max-w-[160px] mb-3 mx-auto">
                    <select
                        id="cartera-select"
                        className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                        value={cartera}
                        onChange={e => setCartera(e.target.value)}
                    >
                        {carterasOptions.length === 0 && <option value={cartera}>{`Cartera ${cartera}`}</option>}
                        {carterasOptions.map(item => (
                            <option key={item.id} value={item.id}>{item.nombre}</option>
                        ))}
                    </select>
                    <label
                        htmlFor="cartera-select"
                        className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                    >
                        Cartera
                    </label>
                </div>
            </div>

            <div className="flex flex-col items-center gap-3 mb-4">
                <div className="mx-auto">
                    <input
                        type="text"
                        value={valor}
                        onChange={e => setValor(e.target.value)}
                        placeholder="Ingrese nú. de cuenta"
                        className="block w-full max-w-[160px] bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia2"
                        disabled={loading}
                    />
                </div>

                <div className="w-full flex justify-center">
                    <button
                        className="btn-success min-w-[95px] px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm hover:brightness-95 inline-flex items-center justify-center"
                        onClick={handleBuscar}
                        disabled={loading}
                    >
                        {loading ? "Buscando..." : "Buscar"}
                    </button>
                </div>
            </div>

            {error && (
                <div className="text-sm text-red-600 mb-2">{error}</div>
            )}

            {resultados && resultados.length > 0 ? (
                <div className="w-full max-w-full overflow-auto" style={{ maxHeight: 260 }}>
                    <table className="modal-table w-full">
                        <thead>
                            <tr>
                                <th>Fecha/Hora</th>
                                <th>Arrepintió</th>
                                <th>Concepto</th>
                                <th>Dato</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultados.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{(() => {
                                        if (!item.fecha_Hora) return '';
                                        const [fecha, hora] = item.fecha_Hora.split('T');
                                        if (!hora) return fecha;
                                        const horaSinMs = hora.split('.')[0];
                                        return `${fecha} ${horaSinMs}`;
                                    })()}</td>
                                    <td>{item.arrepintio}</td>
                                    <td>{item.concepto}</td>
                                    <td>{item.dato}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : resultados && resultados.length === 0 && !error ? (
                <div className="text-sm text-[var(--color-jerarquia2)] mt-2">No se encontraron arrepentimientos para la cuenta ingresada.</div>
            ) : null}

            {/* Mensaje de ayuda al final (footer-like) */}
            <div className="mt-auto pt-4">
                <div className="text-sm text-gray-600">Escriba la cuenta y presione Buscar para mostrar sus arrepentimientos.</div>
            </div>
        </div>
    );
};

export default RegrestContent;