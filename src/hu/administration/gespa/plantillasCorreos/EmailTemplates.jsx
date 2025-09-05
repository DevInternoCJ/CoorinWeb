import React, { useState } from "react";
import WalletSection from "../WalletSection";
import ModalHeader from "../ModalHeader";
import Template from "./Template";
import { IconTemplate } from "../IconsTemplates";

const PlantillasCorreoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-blur-bg fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-300">
        <ModalHeader icon={<IconTemplate className="size-6" />} title="Plantillas Correos" onClose={onClose} />
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] bg-gray-50 space-y-4">
          <WalletSection />
        </div>
        <Template />
      </div>
    </div>
  );
};

export default PlantillasCorreoModal;
