import React, { useState } from "react";

const InformacionArrepentimientosDropdown = () => {
    const [valor, setValor] = useState("");

    return (
        <div style={{ width: '100%', maxWidth: 700, margin: '0 auto', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 18, width: '100%' }}>
                <span className="modal-span-2">Cartera</span>
                <span style={{ fontWeight: 600 }}>American Express</span>
            </div>
            <div style={{ display: 'flex', width: '100%', gap: 8, marginBottom: 18, justifyContent: 'center' }}>
                <input
                    className="modal-dropdown-select"
                    style={{ flex: 1, minWidth: 200, maxWidth: 350, height: 32 }}
                    type="text"
                    value={valor}
                    onChange={e => setValor(e.target.value)}
                    placeholder="Cuenta"
                />
                <button className="modal-btn" style={{ background: '#8BC48A', color: '#fff', minWidth: 120, height: 32 }}>
                    Buscar
                </button>
            </div>
            <div style={{ width: '100%', height: 2, background: '#bdbdbd', borderRadius: 2, marginBottom: 18 }} />
            <div className="modal-span-2" style={{ fontSize: 15, marginTop: 8, textAlign: 'center', color: '#526581' }}>
                Escriba la cuenta y presione Buscar para mostrar sus arrepentimientos.
            </div>
        </div>
    );
};

export default InformacionArrepentimientosDropdown;
