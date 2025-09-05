import React, { useState } from "react";

const ModalHeader = ({ onClose }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-white">
    <h2 className="text-xl font-semibold text-gray-800">Plantillas de Correo</h2>
    <button
      onClick={onClose}
      className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
      aria-label="Cerrar modal"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
);

const WalletSection = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
    <h3 className="text-lg font-medium text-gray-700 mb-3">Configuración de Plantillas</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Seleccionar Producto</label>
        <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="0">Producto</option>
          <option value="1">Amex</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de Plantilla</label>
        <input 
          type="text" 
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ingrese el nombre"
        />
      </div>
    </div>
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Contenido del Correo</label>
      <textarea 
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
        placeholder="Escriba el contenido de la plantilla aquí..."
      ></textarea>
    </div>
    <div className="mt-6 flex justify-end space-x-3">
      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200">
        Cancelar
      </button>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
        Guardar Plantilla
      </button>
    </div>
  </div>
);

const PlantillasCorreoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-300">
        <ModalHeader onClose={onClose} />
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] bg-gray-50 space-y-4">
          <WalletSection />
        </div>
      </div>
    </div>
  );
};

export default PlantillasCorreoModal;