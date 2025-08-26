import React, { useState } from "react";
import { getRegrest } from "../../../../../../services/LokiServices";

const InformacionArrepentimientosDropdown = () => {
    const [valor, setValor] = useState("");
    const [resultados, setResultados] = useState(null); // array de arrepentimientos
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleBuscar = async () => {
        setResultados(null);
        setError(null);
        if (!valor) {
            setError("Ingrese una cuenta para buscar.");
            return;
        }
        setLoading(true);
        try {
            const data = await getRegrest({ idCartera: 1, cuenta: valor });
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
        } catch (err) {
            setError("Error al consultar arrepentimientos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: 700, margin: '0 auto', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 18, width: '100%' }}>
                <span className="modal-span-2">Cartera</span>
                <span style={{ fontWeight: 600 }}>1</span>
            </div>
            <div style={{ display: 'flex', width: '100%', gap: 8, marginBottom: 18, justifyContent: 'center' }}>
                <input
                    className="modal-dropdown-select"
                    style={{ flex: 1, minWidth: 200, maxWidth: 350, height: 32 }}
                    type="text"
                    value={valor}
                    onChange={e => setValor(e.target.value)}
                    placeholder="Cuenta"
                    disabled={loading}
                />
                <button
                    className="modal-btn"
                    style={{ background: '#8BC48A', color: '#fff', minWidth: 120, height: 32 }}
                    onClick={handleBuscar}
                    disabled={loading}
                >
                    {loading ? "Buscando..." : "Buscar"}
                </button>
            </div>
            <div style={{ width: '100%', height: 2, background: '#bdbdbd', borderRadius: 2, marginBottom: 18 }} />
            {error && (
                <div style={{ color: 'red', fontSize: 15, textAlign: 'center', marginBottom: 8 }}>{error}</div>
            )}
            {!resultados && !error && (
                <div className="modal-span-2" style={{ fontSize: 15, marginTop: 8, textAlign: 'center', color: '#526581' }}>
                    Escriba la cuenta y presione Buscar para mostrar sus arrepentimientos.
                </div>
            )}
            {resultados && resultados.length > 0 && (
                <div
                    className="modal-table-scroll"
                    style={{
                        width: '100%',
                        maxHeight: 260,
                        overflowY: 'auto',
                        overflowX: 'auto',
                        marginTop: 8
                    }}
                >
                    <table className="modal-table">
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
                                    <td>{
                                        (() => {
                                            // Quitar la 'T' y los milisegundos
                                            if (!item.fecha_Hora) return '';
                                            const [fecha, hora] = item.fecha_Hora.split('T');
                                            if (!hora) return fecha;
                                            // Quitar milisegundos si existen
                                            const horaSinMs = hora.split('.')[0];
                                            return `${fecha} ${horaSinMs}`;
                                        })()
                                    }</td>
                                    <td>{item.arrepintio}</td>
                                    <td>{item.concepto}</td>
                                    <td>{item.dato}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {resultados && resultados.length === 0 && !error && (
                <div style={{ fontSize: 15, marginTop: 8, textAlign: 'center', color: '#526581' }}>
                    No se encontraron arrepentimientos para la cuenta ingresada.
                </div>
            )}
        </div>
    );
};

export default InformacionArrepentimientosDropdown;
