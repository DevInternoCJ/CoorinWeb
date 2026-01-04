// src/hu/dashboard/sideBar/processes/supervisor/ModalBaseSupervisor.jsx

import React, { useState, useRef, useEffect } from 'react';
import ModalBase from '../../../board/ModalBase';
import CloseButtonCampanas from '../../../components/CloseButtonReusable';
import ConsorcioLogo from '../../../../../assets/logo_coorin_7.svg';

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
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <img src={ConsorcioLogo} alt="Coorin Logo" className="h-8 w-8" />
                            <h2 className="text-lg font-semibold text-gray-900">Supervisor</h2>
                            {/* Select Cartera */}
                            <div className="relative">
                                <select
                                    value={cartera}
                                    onChange={(e) => setCartera(e.target.value)}
                                    className="peer p-4 pe-9 block w-45 bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 disabled:bg-gray-200 disabled:text-gray-500"
                                    id="cartera-supervisor-select"
                                >
                                    <option value="" disabled hidden></option>
                                    <option value="cartera1">Cartera 1</option>
                                    <option value="cartera2">Cartera 2</option>
                                    <option value="cartera3">Cartera 3</option>
                                </select>
                                <label
                                    htmlFor="cartera-supervisor-select"
                                    className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                                >
                                    Cartera
                                </label>
                            </div>
                            {/* Radio buttons Asignar / Consultar */}
                            <div className="flex items-center space-x-4 mr-4">
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
                        <CloseButtonCampanas onClose={onClose} />
                    </div>
                )}

                <div className={`p-4 ${contentClassName}`}>
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