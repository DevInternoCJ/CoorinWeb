import React, { useState } from "react";

const InformacionDomiciliosDropdown = () => {
    const [mensaje, setMensaje] = useState("");

    const handleGuardar = () => {
        setMensaje("Guardado cancelado por usuario.");
    };

    return (
        <div style={{ width: 340, margin: '0 auto', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', marginBottom: '1.2rem' }}>
                <div className="modal-span-2" style={{ marginBottom: 8 }}>Cartera <span style={{ fontWeight: 600 }}>American Express</span></div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                    <span className="modal-span-2" style={{ minWidth: 80 }}>Consulta</span>
                    <select className="modal-dropdown-select" style={{ marginLeft: 8, width: 140 }} defaultValue="">
                        <option value="">- Todas -</option>
                        <option value="domicilios">Domicilios</option>
                    </select>
                </div>
                <button className="modal-btn" style={{ background: '#8BC48A', color: '#fff', width: '100%', marginTop: 8, marginBottom: 8 }} onClick={handleGuardar}>
                    Guardar Excel
                </button>
            </div>
            {mensaje && (
                <div className="modal-span-2" style={{ fontSize: 15, marginTop: 8, textAlign: 'center', color: '#8a9a8a' }}>
                    {mensaje}
                </div>
            )}
        </div>
    );
};

export default InformacionDomiciliosDropdown;
