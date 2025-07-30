import React from "react";
import ModalMetasHeader from "./ModalMetasHeader";
import ModalMetasContent from "./ModalMetasContent";
import ModalMetasFooter from "./ModalMetasFooter";
import "./modalBaseMetas.css";

const ModalMetasEjecutivos = ({ onClose }) => {
    return (
        <div className="modal-blur-bg">
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal-content">
                <div className="modal-xl-container" style={{ maxWidth: "98vw", overflowX: "hidden" }}>
                    <ModalMetasHeader onClose={onClose} />
                    
                    <div 
                        style={{
                            maxHeight: "calc(85vh - 12rem)",
                            overflowY: "auto",
                            overflowX: "hidden",
                            padding: "0 1rem"
                        }}
                        className="modal-scroll-gray"
                    >
                        <ModalMetasContent />
                    </div>
                    
                    <ModalMetasFooter />
                    
                    <style>{`
                        .modal-scroll-gray::-webkit-scrollbar {
                            width: 8px;
                            background: #f5f5f5;
                        }
                        .modal-scroll-gray::-webkit-scrollbar-thumb {
                            background: #b0b0b00000;
                            border-radius: 4px;
                        }
                        .modal-scroll-gray::-webkit-scrollbar-thumb:hover {
                            background: #888;
                        }
                    `}</style>
                </div>
            </div>
        </div>
    );
};

export default ModalMetasEjecutivos;
