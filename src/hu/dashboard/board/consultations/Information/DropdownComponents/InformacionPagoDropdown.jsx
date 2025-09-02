import React from "react";

const InformacionPagoDropdown = () => (
    <div style={{ maxWidth: 340, margin: '0 auto', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', marginBottom: '1.2rem' }}>
            <div className="modal-span-2" style={{ marginBottom: 8 }}>Cartera <span style={{ fontWeight: 600 }}>American Express</span></div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <span className="modal-span-2" style={{ minWidth: 80 }}>Consulta</span>
                <select className="modal-dropdown-select" style={{ marginLeft: 8, width: 140 }} defaultValue="">
                    <option value="">- Todas -</option>
                    <option value="pagadas">Pagadas</option>
                    <option value="pendientes">Pendientes</option>
                </select>
            </div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="modal-span-2">Desde</span>
                    <input type="date" className="modal-dropdown-select" style={{ width: 140 }} defaultValue={new Date().toISOString().slice(0,10)} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="modal-span-2">Hasta</span>
                    <input type="date" className="modal-dropdown-select" style={{ width: 140 }} defaultValue={new Date().toISOString().slice(0,10)} />
                </div>
            </div>
            <button className="modal-btn" style={{ background: 'var(--color-jerarquia2)', color: '#fff', width: '100%', marginTop: 8, marginBottom: 8 }}>
                Guardar Excel
            </button>
        </div>
        <div className="modal-span-2" style={{ fontSize: 14, marginTop: 8, textAlign: 'center' }}>
            Elija la consulta de las cuentas que desee los pagos y el periodo. de los pagos.
        </div>
    </div>
);

export default InformacionPagoDropdown;
