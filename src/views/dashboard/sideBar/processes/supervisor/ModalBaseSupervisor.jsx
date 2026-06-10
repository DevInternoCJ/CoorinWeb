// src/hu/dashboard/sideBar/processes/supervisor/ModalBaseSupervisor.jsx

import React, { useState, useRef, useEffect } from 'react';
import FloatingSelect from "../../../../../components/Select/FloatingSelect";
import ModalBase from '../../../board/ModalBase';
import CloseButtonCampanas from '../../../components/CloseButtonReusable';

const MODAL_SIZES = {
    informacion: { maxWidth: "min(900px, 98vw)", minWidth: "320px", width: "min(900px, 98vw)", height: "auto", maxHeight: "85vh" },
    "informacion-xl": { maxWidth: "min(900px, 98vw)", minWidth: "320px", width: "min(900px, 98vw)", height: "auto", minHeight: "100px", maxHeight: "90vh" },
    custom: {},
};

const ModalBaseSupervisor = ({
    onClose,
    size = "informacion-xl",
    modalStyle = {},
    showHeader = true,
    showFooter = false,
    contentClassName = "",
    modalClassName = "",
    overlayClassName = "",
    enableBounce = true,
    backdropBlur = true,
    cartera,
    setCartera,
    modo,
    setModo,
    children,
    ...props
}) => {
    console.log("ModalBaseSupervisor renderizado");
    const modalRef = useRef(null);
    const { bounce } = ModalBase.useModalLogic?.() || { bounce: false };
    const [localBounce, setLocalBounce] = useState(false);

    const triggerBounce = () => {
        if (!enableBounce) return;
        setLocalBounce(true);
        setTimeout(() => setLocalBounce(false), 500);
    };

    const handleBackdropClick = (e) => {
        if (enableBounce && e.target === e.currentTarget) {
            triggerBounce();
        }
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && enableBounce) {
                triggerBounce();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [enableBounce]);

    const defaultModalStyle = MODAL_SIZES[size] || MODAL_SIZES.informacion;
    const mergedModalStyle = { ...defaultModalStyle, ...modalStyle };

    return (
        <div className="modal-blur-bg">
            <div
                className={`modal-overlay ${overlayClassName} ${backdropBlur ? 'backdrop-blur-sm' : ''}`}
                onClick={handleBackdropClick}
            />
            <div
                ref={modalRef}
                className={`modal-content rounded-xl shadow-2xl ${modalClassName} ${bounce || localBounce ? 'animate-bounce-modal' : ''}`}
                style={mergedModalStyle}
                onClick={(e) => e.stopPropagation()}
            >
                {showHeader && (
                    <div className="relative p-2.5 sm:p-4 border-b border-border sm:flex sm:items-center sm:justify-between">
                        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                            <div className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="h-8 w-8" style={{ color: 'var(--color-jerarquia3)' }}>
                                    <path fill="currentColor" d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7a2.5 2.5 0 0 0 0 5M9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5S6 6.34 6 8s1.34 3 3 3m7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75M9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13"/>
                                </svg>
                                <h2 className="text-lg font-semibold text-jerarquia3">Supervisor</h2>
                            </div>
                            {/* Select Cartera */}
                            <div className="w-full sm:w-auto sm:min-w-[11rem]">
                                <FloatingSelect
                                    id="cartera-supervisor-select"
                                    label="Cartera"
                                    value={cartera}
                                    onChange={(e) => setCartera(e.target.value)}
                                    options={[
                                        { value: "1", label: "Cartera 1" },
                                        { value: "2", label: "Cartera 2" },
                                        { value: "31", label: "Cartera 31" },
                                    ]}
                                />
                            </div>
                            {/* Radio buttons Asignar / Consultar */}
                            <div className="flex items-center justify-center space-x-5">
                                <label className="flex items-center cursor-pointer select-none">
                                    <input
                                        type="radio"
                                        name="modoSupervisor"
                                        value="Asignar"
                                        checked={modo === 'Asignar'}
                                        onChange={(e) => setModo(e.target.value)}
                                        className="modal-radio mr-2"
                                    />
                                    <span className={`text-sm ${modo === 'Asignar' ? 'text-jerarquia3 font-semibold' : 'text-text-primary'}`}>
                                        Asignar
                                    </span>
                                </label>
                                <label className="flex items-center cursor-pointer select-none">
                                    <input
                                        type="radio"
                                        name="modoSupervisor"
                                        value="Consultar"
                                        checked={modo === 'Consultar'}
                                        onChange={(e) => setModo(e.target.value)}
                                        className="modal-radio mr-2"
                                    />
                                    <span className={`text-sm ${modo === 'Consultar' ? 'text-jerarquia3 font-semibold' : 'text-text-primary'}`}>
                                        Consultar
                                    </span>
                                </label>
                            </div>
                        </div>
                        <CloseButtonCampanas onClose={onClose} className="absolute -top-2 -right-2" />
                    </div>
                )}

                <div className={`p-2.5 sm:p-4 ${contentClassName}`}>
                    {children}
                </div>

                {showFooter && (
                    <div className="px-4 py-3 bg-surface-secondary border-t border-border flex justify-end gap-2">
                        <button onClick={onClose} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-border bg-surface text-text-primary shadow-sm hover:bg-surface-secondary disabled:opacity-50 disabled:pointer-events-none transition-colors">
                            Cerrar
                        </button>
                    </div>
                )}
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

export default ModalBaseSupervisor;