import React from "react";
import ModalProductividadHeader from "./ModalProductividadHeader";
import ModalProductividadContent from "./ModalProductividadContent";
import ModalProductividadFooter from "./ModalProductividadFooter";

const ModalConsultaProductividad = ({ onClose }) => {
    return (
        <div className="modal-xl-container" style={{ maxWidth: "98vw", overflowX: "hidden" }}>
            <ModalProductividadHeader onClose={onClose} />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    overflowY: "auto",
                    width: "100%",
                    minHeight: "400px",
                    maxHeight: "60vh",
                    padding: "1rem 0"
                }}
                className="modal-scroll-gray"
            >
                <ModalProductividadContent />
            </div>
            <div style={{ width: "100%", overflowX: "auto" }}>
                <ModalProductividadFooter />
            </div>
            <style>{`
                .modal-scroll-gray::-webkit-scrollbar {
                    height: 8px;
                    width: 8px;
                    background: #f5f5f5;
                }
                .modal-scroll-gray::-webkit-scrollbar-thumb {
                    background: #b0b0b0;
                    border-radius: 4px;
                }
                .modal-scroll-gray::-webkit-scrollbar-thumb:hover {
                    background: #888;
                }
            `}</style>
        </div>
    );
};

export default ModalConsultaProductividad;
