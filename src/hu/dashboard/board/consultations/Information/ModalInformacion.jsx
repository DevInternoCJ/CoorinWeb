import React from "react";
import ModalBaseInformacion from "./ModalBaseInformacion";
import ModalInformacionHeader from "./ModalInformacionHeader";
import ModalInformacionFooter from "./ModalInformacionFooter";

const ModalInformacion = ({ onClose }) => {
    return (
        <ModalBaseInformacion>
            <ModalInformacionHeader onClose={onClose} />
            {/* Content y Footer pueden ir aquí */}
            <div style={{ flex: 1, minHeight: 0 }}></div>
            <ModalInformacionFooter />
        </ModalBaseInformacion>
    );
};

export default ModalInformacion;
