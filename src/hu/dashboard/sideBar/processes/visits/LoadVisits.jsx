
import React, { useState } from "react";
import ModalBaseInformacion from '../../consultations/information/ModalBaseInformacion';
import ConsorcioLogo from "../../../../../assets/logo_coorin_7.svg";

const LoadVisitsContent = ({ mostrarTabla, setMostrarTabla, onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [footerMsg] = useState("Seleccione un archivo para subir visitas.");
    const [cartera, setCartera] = useState("american_express");

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!selectedFile) return;
        // Aquí va la lógica real de subida
        alert(`Archivo ${selectedFile.name} listo para subir.`);
    };

return (
    <ModalBaseInformacion
        onClose={onClose}
        tipoInformacion="Carga Visitas"
        size="cargaVisitas"
        showHeader={true}
        showFooter={false}
    >
        <div className="w-full max-w-[644px] flex flex-col items-center mx-auto px-2 sm:px-4" style={{ minHeight: 0, height: 'auto', padding: 0 }}>
            <div className="flex flex-col sm:flex-row items-center w-full gap-2 sm:gap-4 mb-4" style={{ padding: 0 }}>
                <div className="w-full sm:w-auto flex justify-center mb-2 sm:mb-0">
                    <img src={ConsorcioLogo} alt="Logo Coorin" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" style={{ minWidth: 24, minHeight: 24 }} />
                </div>
                {/* ...existing code... */}
                <div className="w-full sm:w-auto flex justify-center mb-2 sm:mb-0">
                    <div className="relative w-full sm:w-1/4 min-w-[140px] max-w-[260px]">
                        <select
                            className="peer p-2 sm:p-4 pe-6 block w-full bg-gray-50 border-transparent rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-4 focus:pb-1 not-placeholder-shown:pt-4 not-placeholder-shown:pb-1 autofill:pt-4 autofill:pb-1"
                            value={cartera}
                            onChange={(e) => setCartera(e.target.value)}
                            id="cartera-select"
                        >
                            <option value="" disabled hidden></option>
                            <option value="american_express">American Express</option>
                        </select>
                        <label
                            htmlFor="cartera-select"
                            className="absolute top-0 start-0 p-2 sm:p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                        >
                            Cartera
                        </label>
                    </div>
                </div>
                <div className="w-full sm:w-auto flex justify-center mb-2 sm:mb-0">
                    <input
                        type="file"
                        accept=".csv,.xlsx"
                        className="px-4 p-1 block w-full rounded-lg sm:text-sm bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1"
                        onChange={handleFileChange}
                        style={{ color: 'var(--color-jerarquia3)', minWidth: 0 }}
                    />
                </div>
                <div className="w-full sm:w-auto flex justify-center mb-2 sm:mb-0">
                    <button
                        type="button"
                        className="btn-success w-full sm:w-auto sm:min-w-[100px] px-2 sm:px-4 py-2 text-xs sm:text-base font-medium rounded-lg shadow-sm flex justify-center"
                        onClick={handleUpload}
                    >
                        Buscar
                    </button>
                </div>
            </div>
            {/* Footer informativo debajo */}
            <div className="w-full flex justify-center items-center mt-2" style={{ padding: 0 }}>
                <span className="text-gray-600 text-xs sm:text-sm pl-2">
                    {footerMsg}
                </span>
            </div>
        </div>
    </ModalBaseInformacion>
);
};

export default LoadVisitsContent;
