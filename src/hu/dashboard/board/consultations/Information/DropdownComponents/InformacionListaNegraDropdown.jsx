import React, { useState } from "react";

const InformacionListaNegraDropdown = () => {
    const [tipo, setTipo] = useState("");
    const [valor, setValor] = useState("");

    return (
        <div style={{ width: '100%', maxWidth: 600, margin: '0 auto', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 18, width: '100%' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <input type="radio" name="tipo" value="telefono" checked={tipo === "telefono"} onChange={() => setTipo("telefono")} />
                    Teléfono
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <input type="radio" name="tipo" value="cuenta" checked={tipo === "cuenta"} onChange={() => setTipo("cuenta")} />
                    Cuenta
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <input type="radio" name="tipo" value="correo" checked={tipo === "correo"} onChange={() => setTipo("correo")} />
                    Correo
                </label>
            </div>
            <div style={{ display: 'flex', width: '100%', gap: 8, marginBottom: 18, justifyContent: 'center' }}>
                <input
                    className="modal-dropdown-select"
                    style={{ flex: 1, minWidth: 200, maxWidth: 350, height: 32 }}
                    type="text"
                    value={valor}
                    onChange={e => setValor(e.target.value)}
                    placeholder={tipo === "telefono" ? "Teléfono" : tipo === "cuenta" ? "Cuenta" : "Correo"}
                />
                <button className="modal-btn" style={{ background: '#526581', color: '#fff', minWidth: 120, height: 32 }}>
                    Buscar
                </button>
            </div>
            <div style={{ width: '100%', height: 2, background: '#bdbdbd', borderRadius: 2, marginBottom: 18 }} />
            <div className="modal-span-2" style={{ fontSize: 15, marginTop: 8, textAlign: 'center', color: '#526581' }}>
                Introduzca el número de teléfono en formato a 10 números sin guiones y presione 'Buscar'
            </div>
        </div>
    );
};

export default InformacionListaNegraDropdown;
