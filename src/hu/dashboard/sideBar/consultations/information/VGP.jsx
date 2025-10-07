import React, { useRef } from "react";
import ModalBase from "../../../board/ModalBase";

const VGP = ({ onClose }) => {
    const modalRef = useRef(null);
    const { bounce, handleBackdropClick } = ModalBase.useModalLogic();

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
                {/* Header personalizado para VGP */}
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
                        <h2 className="modal-title">VGP</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="modal-btn modal-btn-close ml-4"
                        aria-label="Cerrar"
                    >
                        &times;
                    </button>
                </div>

                {/* Content específico de VGP */}
                <div style={{ flex: 1, overflow: "auto", width: '100%' }}>
                    <div style={{ width: 340, margin: '0 auto', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '100%', marginBottom: '1.2rem' }}>
                            <div className="modal-span-2" style={{ marginBottom: 8 }}>Cartera <span style={{ fontWeight: 600 }}>American Express</span></div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                <span className="modal-span-2" style={{ minWidth: 80 }}>Consulta</span>
                                <select className="modal-dropdown-select" style={{ marginLeft: 8, width: 140 }} defaultValue="">
                                    <option value="">- Todas -</option>
                                    <option value="vgp">VGP</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span className="modal-span-2">Desde</span>
                                    <input type="date" className="modal-dropdown-select" style={{ width: 140 }} defaultValue={new Date().toISOString().slice(0, 10)} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span className="modal-span-2">Hasta</span>
                                    <input type="date" className="modal-dropdown-select" style={{ width: 140 }} defaultValue={new Date().toISOString().slice(0, 10)} />
                                </div>
                            </div>
                            <button className="modal-btn" style={{ background: '#8BC48A', color: '#fff', width: '100%', marginTop: 8, marginBottom: 8 }}>
                                Guardar Excel
                            </button>
                        </div>
                        <div className="modal-span-2" style={{ fontSize: 15, marginTop: 8, textAlign: 'center', color: '#8a9a8a' }}>
                            Elija la consulta de las cuentas que desee el reporte VGP y el periodo.
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

export default VGP;