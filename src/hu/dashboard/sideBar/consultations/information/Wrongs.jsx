import React, { useState, useRef } from "react";
import ModalBase from "../../../board/ModalBase";

const Wrongs = ({ onClose }) => {
    const modalRef = useRef(null);
    const { bounce, handleBackdropClick } = ModalBase.useModalLogic();
    const [buscado, setBuscado] = useState(false);

    return (
        <div className="modal-blur-bg">
            <div className="modal-overlay" onClick={handleBackdropClick} />
            <div
                ref={modalRef}
                className={`modal-content modal-xl-container${bounce ? " animate-bounce-modal" : ""}`}
                onClick={e => e.stopPropagation()}
                style={{
                    maxWidth: "920px",
                    minWidth: "690px",
                    height: "633px",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative"
                }}
            >
                {/* Header personalizado para Wrongs */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                    borderBottom: "1px solid #e0e0e0",
                    paddingBottom: "1rem"
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src="/public/logo_coorin_7.svg" alt="Logo Coorin" style={{ height: 36, marginRight: 8 }} />
                        <h2 className="modal-title">Datos Erróneos</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="modal-btn modal-btn-close ml-4"
                        aria-label="Cerrar"
                    >
                        &times;
                    </button>
                </div>

                {/* Content específico de Wrongs */}
                <div style={{ flex: 1, overflow: "auto", width: '100%' }}>
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
                </div>
            </div>
            <style>{`
                @keyframes bounce-modal {
                    0% { transform: scale(1); }
                    20% { transform: scale(1.05, 0.95); }
                    40% { transform: scale(0.95, 1.05); }
                    60% { transform: scale(1.03, 0.97); }
                    80% { transform: scale(0.97, 1.03); }
                    100% { transform: scale(1); }
                }
                .animate-bounce-modal {
                    animation: bounce-modal 0.5s;
                }
            `}</style>
        </div>
    );
};

export default Wrongs;
