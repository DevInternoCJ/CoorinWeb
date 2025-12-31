// src/hu/dashboard/sideBar/processes/accionamientos/ModalBaseAccionamientos.jsx

import React, { useState, useRef, useEffect } from 'react';
import ModalCicle from '../../consultations/information/ModalCicle';
import { tabsListAccionamientos, COMPONENT_ICONS_ACCIONAMIENTOS } from './ModalAccionamientosTabs';

const MODAL_SIZES = {
    informacion: { maxWidth: "min(1100px, 98vw)", minWidth: "320px", width: "min(1300px, 98vw)", height: "240px", maxHeight: "85vh" },
    "informacion-xl": { maxWidth: "min(1100px, 98vw)", minWidth: "320px", width: "min(1300px, 98vw)", height: "auto", minHeight: "300px", maxHeight: "90vh" },
    "pagos-xl": { maxWidth: "min(1800px, 95vw)", minWidth: "320px", width: "min(1700px, 95vw)", height: "85vh", maxHeight: "90vh" },
    pagos: { maxWidth: "min(420px, 95vw)", minWidth: "280px", width: "min(380px, 95vw)", height: "340px", maxHeight: "85vh" },
    consultaVisits: { maxWidth: "min(644px, 95vw)", minWidth: "320px", width: "min(483px, 95vw)", height: "506px", maxHeight: "90vh" },
    capturaVisit: { maxWidth: "min(805px, 95vw)", minWidth: "320px", width: "min(370px, 95vw)", height: "380px", maxHeight: "90vh" },
    cargaVisitas: { maxWidth: "min(1104px, 95vw)", minWidth: "320px", width: "min(900px, 95vw)", height: "220px", maxHeight: "85vh" },
    custom: {},
};

const ModalBaseAccionamientos = ({
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
    ...props
}) => {
    console.log("ModalBaseAccionamientos renderizado");
    const modalRef = useRef(null);
    const [localBounce, setLocalBounce] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const triggerBounce = () => {
        setLocalBounce(true);
        setTimeout(() => setLocalBounce(false), 600);
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
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [enableBounce]);

    useEffect(() => {
        window.dispatchEvent(new CustomEvent('coorin-modal-open', { detail: { open: true } }));
        return () => {
            window.dispatchEvent(new CustomEvent('coorin-modal-open', { detail: { open: false, byClose: true } }));
        };
    }, []);

    const defaultModalStyle = MODAL_SIZES[size] || MODAL_SIZES.informacion;
    const mergedModalStyle = { ...defaultModalStyle, ...modalStyle };

    const headerIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ color: 'var(--color-jerarquia3)' }} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
    );

    return (
        <div className={`fixed inset-0 z-60 flex items-center justify-center ${overlayClassName}`}>
            {backdropBlur && <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={handleBackdropClick} />}
            <div
                ref={modalRef}
                className={`relative bg-white rounded-lg shadow-xl overflow-hidden ${modalClassName} ${localBounce ? 'animate-bounce' : ''}`}
                style={mergedModalStyle}
            >
                {showHeader && (
                    <header className="flex items-center justify-between p-4 border-b border-gray-200">
                        <div className="flex items-center gap-3 flex-1">
                            {headerIcon}
                            <div className="flex gap-2 ml-4">
                                {tabsListAccionamientos.map((tab, index) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(index)}
                                        className={`px-2 py-1 text-sm rounded ${activeTab === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                    >
                                        {COMPONENT_ICONS_ACCIONAMIENTOS[tab.key]}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </header>
                )}
                <div className={`p-4 ${contentClassName}`}>
                    <ModalCicle
                        tabsList={tabsListAccionamientos}
                        componentIcons={COMPONENT_ICONS_ACCIONAMIENTOS}
                        mostrarTabla={false}
                        setMostrarTabla={() => { }}
                        onNavigationReady={() => { }}
                        onSizeChange={() => { }}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        headerControlsActive={false}
                        headerStates={{}}
                    />
                </div>
                {showFooter && (
                    <footer className="p-4 border-t border-gray-200">
                        {/* Footer content */}
                    </footer>
                )}
            </div>
        </div>
    );
};

export default ModalBaseAccionamientos;