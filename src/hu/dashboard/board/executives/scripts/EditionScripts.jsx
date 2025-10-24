import React, { useState, useEffect } from "react";
import SelectWallet from "../../../board/screenFields/SelectWallet";

const EditionScripts = ({ scripts = [], onSaveScript }) => {
  const [selectedScript, setSelectedScript] = useState(null);
  const [editedData, setEditedData] = useState({
    nombre: '',
    descripcion: '',
    script: ''
  });
  const [hasChanges, setHasChanges] = useState(false);

  const scriptOptions = scripts.map(script => ({
    value: script.idScript.toString(),
    label: script.nombre
  }));

  useEffect(() => {
    if (selectedScript) {
      setEditedData({
        nombre: selectedScript.nombre || '',
        descripcion: selectedScript.descripcion || '',
        script: cleanScriptText(selectedScript.script || '')
      });
      setHasChanges(false);
    }
  }, [selectedScript]);

  const handleWalletChange = (selectedValue) => {
    if (hasChanges && !window.confirm('Tienes cambios sin guardar. ¿Deseas continuar?')) {
      return;
    }
    
    const script = scripts.find(s => s.idScript.toString() === selectedValue);
    setSelectedScript(script);
  };

  const cleanScriptText = (text) => {
    if (!text) return "";
    return text
      .replace(/&/g, '')
      .replace(/\*/g, '')
      .trim();
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!selectedScript) return;

    try {
      if (onSaveScript) {
        await onSaveScript({
          idScript: selectedScript.idScript,
          ...editedData
        });
      }
      
      setSelectedScript({
        ...selectedScript,
        ...editedData
      });
      
      setHasChanges(false);
      
      alert('Script guardado exitosamente');
    } catch (error) {
      console.error('Error al guardar script:', error);
      alert('Error al guardar el script');
    }
  };

  const handleCancel = () => {
    if (!window.confirm('¿Deseas descartar los cambios?')) {
      return;
    }
    
    setEditedData({
      nombre: selectedScript?.nombre || '',
      descripcion: selectedScript?.descripcion || '',
      script: cleanScriptText(selectedScript?.script || '')
    });
    setHasChanges(false);
  };

  return (
    <div className="rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-0.5">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-300">
            Script
          </label>
          <SelectWallet
            options={scriptOptions}
            label="Selecciona un script"
            onChange={handleWalletChange}
            value={selectedScript?.idScript.toString() || ''}
          />
        </div>

        {/* Botones solo cuando hay cambios */}
        {selectedScript && hasChanges && (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
            >
              ✅ Guardar
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
            >
              ❌ Cancelar
            </button>
          </div>
        )}
      </div>

      {/* Contenido - Siempre editable */}
      <div className="bg-gray-700 rounded-lg p-4 gap-2">
        {selectedScript ? (
          <div className="space-y-4">
            {/* Nombre - Siempre editable */}
            <div className="mb-2">
              <input
                type="text"
                value={editedData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                className="w-full px-2 py-1 text-white border bg-gray-800 border-gray-800 rounded-lg focus:ring-2 focus:ring-jerarquia2 focus:border-transparent transition-all"
                placeholder="Nombre del script"
              />
            </div>

            {/* Descripción - Siempre editable */}
            <div className="mb-2">
              <input
                type="text"
                value={editedData.descripcion}
                onChange={(e) => handleInputChange('descripcion', e.target.value)}
                className="w-full px-2 py-1 bg-gray-800 text-white border border-gray-800 rounded-lg focus:ring-2 focus:ring-jerarquia2 focus:border-transparent resize-none transition-all"
                rows="2"
                placeholder="Descripción del script"
              />
            </div>

            {/* Contenido - Siempre editable */}
            <div>
              <textarea
                value={editedData.script}
                onChange={(e) => handleInputChange('script', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-800 rounded-lg focus:ring-2 focus:ring-jerarquia2 focus:border-transparent font-mono text-sm resize-none transition-all"
                rows="12"
                placeholder="Contenido del script..."
              />
            </div>

            {/* Indicador de cambios */}
            {hasChanges && (
              <div className="flex items-center gap-2 text-yellow-400 text-sm">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                Hay cambios sin guardar
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-400">
            <p>📝 Selecciona un script para ver y editar su contenido</p>
          </div>
        )}
      </div>

      {scripts.length === 0 && (
        <div className="text-center py-8 text-gray-400 text-sm bg-gray-800 rounded-lg mt-4">
          <p>No hay scripts disponibles.</p>
        </div>
      )}
    </div>
  );
};

export default EditionScripts;
