import React, { useState } from 'react';
import SelectWallet from "../../../board/screenFields/SelectWallet";

const EditionScripts = ({ scripts = [] }) => {
  const [selectedScript, setSelectedScript] = useState(null);

  // ✅ Convertir los scripts a options para el SelectWallet
  const scriptOptions = scripts.map(script => ({
    value: script.idScript.toString(),
    label: script.nombre
  }));

  // ✅ Agregar opción por defecto
  const walletOptions = scriptOptions;

  const handleWalletChange = (selectedValue) => {
    console.log("Script seleccionado:", selectedValue);
    
    // ✅ Encontrar el script completo basado en el id seleccionado
    const script = scripts.find(s => s.idScript.toString() === selectedValue);
    setSelectedScript(script);
  };

  // ✅ Función para limpiar el texto del script
  const cleanScriptText = (text) => {
    if (!text) return "";
    return text
      .replace(/&/g, '')
      .replace(/\*/g, '')
      .trim();
  };

  return (
    <div>
      <div className="flex justify-start items-center gap-2 mb-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Script
        </label>
        <SelectWallet
          options={walletOptions}
          label="Selecciona"
          onChange={handleWalletChange}
          defaultValue=""
        />
      </div>       
      
      <div className="bg-gray-700 rounded-lg p-4 text-background-tertiary"> 
        <div className="mb-3">
          <div className="">
            Nombre: {selectedScript ? selectedScript.nombre : "Selecciona un script"}
          </div>
          
          {selectedScript && (
            <div className="text-sm text-background-tertiary mt-1">
              Descripción: {selectedScript.descripcion || "Sin descripción"}
            </div>
          )}
        </div>
        
        <div className="border-1 p-3 border-jerarquia1 overflow-auto max-h-40 rounded-lg min-h-[200px] leading-relaxed bg-gray-800">        
          {selectedScript ? (
            <pre className="whitespace-pre-wrap text-sm font-sans">
              {cleanScriptText(selectedScript.script)}
            </pre>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Selecciona un script para ver su contenido
            </div>
          )}
        </div>
      </div>

      {/* ✅ Mensaje cuando no hay scripts disponibles */}
      {scripts.length === 0 && (
        <div className="text-center py-4 text-gray-500 text-sm">
          No hay scripts disponibles. Los scripts se cargarán automáticamente cuando se seleccione un producto.
        </div>
      )}
    </div>
  );
};

export default EditionScripts;