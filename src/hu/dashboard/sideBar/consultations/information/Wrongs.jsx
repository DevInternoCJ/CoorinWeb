import React, { useState } from "react";

const Wrongs = () => {
    const [buscado, setBuscado] = useState(false);

    return (
        <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box', overflow: 'hidden' }}>
            <div style={{ width: '100%', marginBottom: '1.2rem', display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center' }}>
                <span className="modal-span-2">Desde</span>
                <input type="date" className="modal-dropdown-select" style={{ width: 140 }} defaultValue={new Date().toISOString().slice(0, 10)} />
                <span className="modal-span-2">Hasta</span>
                <input type="date" className="modal-dropdown-select" style={{ width: 140 }} defaultValue={new Date().toISOString().slice(0, 10)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12, gap: 12, justifyContent: 'center' }}>
                <span className="modal-span-2">Datos Erróneos</span>
                <select className="modal-dropdown-select" style={{ width: 140 }} defaultValue="">
                    <option value="">--Todos--</option>
                    <option value="telefono">Teléfono</option>
                    <option value="correo">Correo</option>
                    <option value="domicilio">Domicilio</option>
                </select>
            </div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 12, width: '100%', justifyContent: 'center' }}>
                <button className="modal-btn" style={{ background: '#526581', color: '#fff', minWidth: 120 }} onClick={() => setBuscado(true)}>
                    Buscar
                </button>
            </div>
            <div style={{ width: '100%', minHeight: 120, background: '#f8f8f8', borderRadius: 8, border: '1px solid #e0e0e0', marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {buscado && (
                    <span className="modal-span-2" style={{ color: '#888', fontSize: 16, textAlign: 'center', padding: 16 }}>
                        No se cuenta con datos reportados como erróneos de la cartera seleccionada.
                    </span>
                )}
            </div>
        </div>
    );
};

export default Wrongs;
