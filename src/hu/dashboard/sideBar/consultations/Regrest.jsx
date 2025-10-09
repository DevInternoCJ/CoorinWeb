import React, { useState } from "react";
import { getRegrest } from "../../../../services/mark/albaz/LokiServices";

const RegrestContent = () => {
    
    const [valor, setValor] = useState("");
    const [resultados, setResultados] = useState(null); // array de arrepentimientos
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Obtener idCartera desde localStorage
    const getIdCartera = () => {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        return userData?.idCartera || userData?.idcartera || userData?.cartera || 1; // fallback a 1 si no existe
    };

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
        <div style={{ width: '100%', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Información de cartera */}
            <div style={{ textAlign: 'center', marginBottom: 12, fontSize: 15, color: '#526581' }}>
                Cartera: <strong>{getIdCartera()}</strong>
            </div>
            
            <div className="modal-form-row">
                <div className="modal-input-group">
                    <label className="modal-label">Cuenta</label>
                    <input
                        type="text"
                        value={valor}
                        onChange={e => setValor(e.target.value)}
                        placeholder="Ingrese número de cuenta"
                        className="modal-input"
                        disabled={loading}
                    />
                </div>
                <button 
                    className="modal-button" 
                    onClick={handleBuscar}
                    disabled={loading}
                >
                    {loading ? "Buscando..." : "Buscar"}
                </button>
            </div>
            
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

export default RegrestContent;