import React, { useState, useCallback } from "react";
import ReusableModal from "../../modalGlobalReboot/ReusableModal";
import ModalValidadoresContent from "./ModalValidadoresContent";
import { IconValidadores } from "../IconesEjecutives";

const ValidadoresModal = ({
    isOpen,
    onClose,
    enableBounce = false,
    enableShakeOnBackdropClick = true,
    enableBounceOnBackdropOrEscape = true,
    closeOnBackdropClick = false,
    ...props
}) => {
    // Estados para el footer dinámico
    const [footerData, setFooterData] = useState({
        lastAction: null,
        lastUser: null,
        producto: "",
        arrepentimientos: false,
        isProcessingChange: false,
        cartera: "american_express"
    });

    // Resetear producto y cartera al cerrar el modal
    React.useEffect(() => {
        if (!isOpen) {
            setFooterData({
                lastAction: null,
                lastUser: null,
                producto: "",
                arrepentimientos: false,
                isProcessingChange: false,
                cartera: "american_express"
            });
        }
    }, [isOpen]);

    // Función para manejar cambios en los datos del footer
    const handleFooterDataChange = useCallback((data) => {
        setFooterData(data);
    }, []);



    // Selectores para pasar al header
    const carteraSelector = (
        <div className="relative mb-0 w-full md:w-auto">
            <select
                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none"
                style={{ minHeight: '3.2rem' }}
                value={footerData.cartera}
                onChange={e => setFooterData(f => ({ ...f, cartera: e.target.value }))}
                id="cartera-select-header"
            >
                <option value="american_express">American Express</option>
            </select>
            <label
                htmlFor="cartera-select-header"
                className="absolute top-0 start-0 p-2 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
            >
                Cartera
            </label>
        </div>
    );
    const productoSelector = (
        <div className="relative mb-0 w-full md:w-auto">
            <select
                className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none"
                style={{ minHeight: '3.2rem' }}
                value={footerData.producto}
                onChange={e => setFooterData(f => ({ ...f, producto: e.target.value }))}
                id="producto-select-header"
            >
                <option value="" disabled hidden></option>
                <option value="Amex">American Express</option>
            </select>
            <label
                htmlFor="producto-select-header"
                className="absolute top-0 start-0 p-2 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
            >
                Producto
            </label>
        </div>
    );
    // Elementos para el header: contador, nodo ejecutivo y checkbox
    const validadoresCounter = (
        <label
            className="modal-span-1"
            style={{ color: "var(--color-jerarquia3)", fontWeight: 600, fontSize: '1.1rem' }}
        >
            {footerData.contadorValidadores
                ? `Validadores (${footerData.contadorValidadores.asignados} / ${footerData.contadorValidadores.total})`
                : 'Validadores (0 / 0)'}
            {footerData.isLoadingValidadores && (
                <span style={{ marginLeft: "0.5rem", color: "var(--color-jerarquia2)", fontSize: "0.8rem" }}>
                    (Cargando...)
                </span>
            )}
        </label>
    );
    const nodoEjecutivoHeader = footerData.nodoSesion ? (
        <div className="px-2 font-bold text-black text-sm flex items-center justify-center whitespace-nowrap">
            {footerData.nodoSesion.nombreEjecutivo} - {footerData.nodoSesion.usuario}
        </div>
    ) : null;
    const arrepentimientosCheckbox = (
        <div className="flex items-center gap-2" style={{ opacity: !footerData.producto ? 0.5 : 1 }}>
            <input
                type="checkbox"
                id="arrepentimientos"
                checked={footerData.arrepentimientos}
                disabled={!footerData.producto}
                onChange={e => setFooterData(f => ({ ...f, arrepentimientos: e.target.checked }))}
                style={{ width: "1rem", height: "1rem", accentColor: "var(--color-jerarquia1)" }}
            />
            <label
                htmlFor="arrepentimientos"
                style={{ fontSize: "0.875rem", fontWeight: "500", cursor: !footerData.producto ? "not-allowed" : "pointer", color: "var(--color-jerarquia3)" }}
            >
                Arrepentimientos
            </label>
        </div>
    );

    return (
        <ReusableModal
            isOpen={isOpen}
            onClose={onClose}
            size="validadores"
            showHeader={true}
            title="Validadores - Coorin"
            icon={IconValidadores}
            iconClassName="text-jerarquia3"
            headerProps={{
                titleClassName: "text-jerarquia3",
                carteraSelector,
                productoSelector,
                validadoresCounter,
                nodoEjecutivoHeader,
                arrepentimientosCheckbox
            }}
            showFooter={true}
            enableBounce={enableBounce}
            enableShakeOnBackdropClick={enableShakeOnBackdropClick}
            enableBounceOnBackdropOrEscape={enableBounceOnBackdropOrEscape}
            closeOnBackdropClick={closeOnBackdropClick}
            contentClassName="flex flex-col gap-4 h-auto"
            modalClassName="border-0 shadow-2xl overflow-hidden"
            {...props}
        >
            {/* Contenido principal con filtros */}
            <div className="flex justify-center w-full flex-1 overflow-hidden">
                <ModalValidadoresContent
                    onFooterDataChange={handleFooterDataChange}
                    producto={footerData.producto}
                    cartera={footerData.cartera}
                    arrepentimientos={footerData.arrepentimientos}
                    omitRootNode={true}
                />
            </div>
        </ReusableModal>
    );
};

export default ValidadoresModal;