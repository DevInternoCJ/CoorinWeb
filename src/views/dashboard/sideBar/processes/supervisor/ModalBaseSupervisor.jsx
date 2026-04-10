// src/hu/dashboard/sideBar/processes/supervisor/ModalBaseSupervisor.jsx

import React, { useState, useRef, useEffect } from 'react';
import ModalBase from '../../../board/ModalBase';
import CloseButtonCampanas from '../../../components/CloseButtonReusable';

const MODAL_SIZES = {
    informacion: { maxWidth: "min(1100px, 98vw)", minWidth: "320px", width: "min(1300px, 98vw)", height: "240px", maxHeight: "85vh" },
    "informacion-xl": { maxWidth: "min(1100px, 98vw)", minWidth: "320px", width: "auto", height: "auto", minHeight: "100px", maxHeight: "90vh" },
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
                className={`modal-content bg-white rounded-lg shadow-xl border border-gray-200 ${modalClassName} ${bounce || localBounce ? 'animate-bounce-modal' : ''}`}
                style={mergedModalStyle}
                onClick={(e) => e.stopPropagation()}
            >
                {showHeader && (
                    <div className="relative p-2 sm:p-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <div className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="h-8 w-8" style={{ color: 'var(--color-jerarquia3)' }}>
                                    <path fill="currentColor" d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7a2.5 2.5 0 0 0 0 5M9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5S6 6.34 6 8s1.34 3 3 3m7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75M9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13"/>
                                </svg>
                                <h2 className="text-lg font-semibold text-jerarquia3">Supervisor</h2>
                            </div>
                            {/* Select Cartera */}
                            <div className="relative w-full sm:w-auto">
                                <select
                                    value={cartera}
                                    onChange={(e) => setCartera(e.target.value)}
                                    className="peer p-4 pe-9 block w-full sm:w-45 bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 disabled:bg-gray-200 disabled:text-gray-500"
                                    id="cartera-supervisor-select"
                                >
                                    <option value="" disabled hidden></option>
                                    <option value="1">Cartera 1</option>
                                    <option value="2">Cartera 2</option>
                                    <option value="31">Cartera 31</option>
                                </select>
                                <label
                                    htmlFor="cartera-supervisor-select"
                                    className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                                >
                                    Cartera
                                </label>
                            </div>
                            {/* Radio buttons Asignar / Consultar */}
                            <div className="flex items-center justify-center space-x-4">
                                <label className="flex items-center">
                                    <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center mr-2">
                                        <div className={`w-2 h-2 bg-jerarquia3 rounded-full ${modo === 'Asignar' ? 'opacity-100' : 'opacity-0'}`}></div>
                                    </div>
                                    <input
                                        type="radio"
                                        name="modoSupervisor"
                                        value="Asignar"
                                        checked={modo === 'Asignar'}
                                        onChange={(e) => setModo(e.target.value)}
                                        className="sr-only"
                                    />
                                    <span className={`text-sm ${modo === 'Asignar' ? 'text-jerarquia3 font-semibold' : 'text-gray-700'}`}>
                                        Asignar
                                    </span>
                                </label>
                                <label className="flex items-center">
                                    <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center mr-2">
                                        <div className={`w-2 h-2 bg-jerarquia3 rounded-full ${modo === 'Consultar' ? 'opacity-100' : 'opacity-0'}`}></div>
                                    </div>
                                    <input
                                        type="radio"
                                        name="modoSupervisor"
                                        value="Consultar"
                                        checked={modo === 'Consultar'}
                                        onChange={(e) => setModo(e.target.value)}
                                        className="sr-only"
                                    />
                                    <span className={`text-sm ${modo === 'Consultar' ? 'text-jerarquia3 font-semibold' : 'text-gray-700'}`}>
                                        Consultar
                                    </span>
                                </label>
                            </div>
                        </div>
                        <CloseButtonCampanas onClose={onClose} className="absolute -top-2 -right-2" />
                    </div>
                )}

                <div className={`p-2 sm:p-4 ${contentClassName}`}>
                    {children}
                </div>

                {showFooter && (
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
                        <button onClick={onClose} className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
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