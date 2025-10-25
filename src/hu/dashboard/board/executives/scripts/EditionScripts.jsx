import React, { useState, useEffect, useRef } from "react";
import SelectWallet from "../../../board/screenFields/SelectWallet";
import ButtonSave from "../../../sideBar/Administration/gespa/ButtonSave";

const EditionScripts = ({ scripts = [], onSaveScript }) => {
  const [selectedScript, setSelectedScript] = useState(null);
  const [editedData, setEditedData] = useState({
    nombre: '',
    descripcion: '',
    script: ''
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [isEditingScript, setIsEditingScript] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // ✅ Estado para vista previa
  const textareaRef = useRef(null);

  const scriptOptions = scripts.map(script => ({
    value: script.idScript.toString(),
    label: script.nombre
  }));

  useEffect(() => {
    if (selectedScript) {
      setEditedData({
        nombre: selectedScript.nombre || '',
        descripcion: selectedScript.descripcion || '',
        script: selectedScript.script || ''
      });
      setHasChanges(false);
      setIsEditingScript(false);
      setShowPreview(false); // ✅ Resetear vista previa
    }
  }, [selectedScript]);

  const handleWalletChange = (selectedValue) => {
    if (hasChanges && !window.confirm('Tienes cambios sin guardar. ¿Deseas continuar?')) {
      return;
    }
    
    const script = scripts.find(s => s.idScript.toString() === selectedValue);
    setSelectedScript(script);
  };

  const renderFormattedScript = (text) => {
    if (!text) return null;
    
    const parts = [];
    let currentText = '';
    let isBold = false;
    let isColored = false;
    let key = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      
      if (char === '*') {
        if (currentText) {
          parts.push(
            <span 
              key={key++} 
              className={`${isBold ? 'font-bold' : ''} ${isColored ? 'text-lime-500' : ''}`}
            >
              {currentText}
            </span>
          );
          currentText = '';
        }
        isBold = !isBold;
      } else if (char === '&') {
        if (currentText) {
          parts.push(
            <span 
              key={key++} 
              className={`${isBold ? 'font-bold' : ''} ${isColored ? 'text-lime-500' : ''}`}
            >
              {currentText}
            </span>
          );
          currentText = '';
        }
        isColored = !isColored;
      } else {
        currentText += char;
      }
    }

    if (currentText) {
      parts.push(
        <span 
          key={key++} 
          className={`${isBold ? 'font-bold' : ''} ${isColored ? ' text-lime-500' : ''}`}
        >
          {currentText}
        </span>
      );
    }

    return parts;
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const insertFormatMarker = (marker) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = editedData.script;
    const selectedText = text.substring(start, end);

    let newText;
    if (selectedText) {
      newText = text.substring(0, start) + marker + selectedText + marker + text.substring(end);
    } else {
      newText = text.substring(0, start) + marker + marker + text.substring(end);
    }

    handleInputChange('script', newText);

    setTimeout(() => {
      if (selectedText) {
        textarea.setSelectionRange(start + marker.length + selectedText.length + marker.length, start + marker.length + selectedText.length + marker.length);
      } else {
        textarea.setSelectionRange(start + marker.length, start + marker.length);
      }
      textarea.focus();
    }, 0);
  };

  // ✅ Función para limpiar marcadores de formato
  const cleanFormatMarkers = () => {
    if (!editedData.script) return;
    
    const cleanedText = editedData.script
      .replace(/\*/g, '')
      .replace(/&/g, '');
    
    handleInputChange('script', cleanedText);
  };

  // ✅ Función para borrar todo el contenido
  const clearScript = () => {
    if (window.confirm('¿Estás seguro de borrar todo el contenido del script?')) {
      handleInputChange('script', '');
    }
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
      setIsEditingScript(false);
      setShowPreview(false); // ✅ Resetear vista previa después de guardar
      
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
      script: selectedScript?.script || ''
    });
    setHasChanges(false);
    setIsEditingScript(false);
    setShowPreview(false); // ✅ Resetear vista previa
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

      {/* Contenido */}
      <div className="bg-gray-700 rounded-lg p-4 gap-2">
        {selectedScript ? (
          <div className="space-y-4">
            {/* Nombre */}
            <div className="mb-2">
              <input
                type="text"
                value={editedData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                className="w-full px-2 py-1 text-white border bg-gray-800 border-gray-800 rounded-lg focus:ring-2 focus:ring-jerarquia2 focus:border-transparent transition-all"
                placeholder="Nombre del script"
              />
            </div>

            {/* Descripción */}
            <div className="mb-2">
              <input
                type="text"
                value={editedData.descripcion}
                onChange={(e) => handleInputChange('descripcion', e.target.value)}
                className="w-full px-2 py-1 bg-gray-800 text-white border border-gray-800 rounded-lg focus:ring-2 focus:ring-jerarquia2 focus:border-transparent resize-none transition-all"
                placeholder="Descripción del script"
              />
            </div>

            {/* Contenido del Script */}
            <div className="">
              <div className="block md:flex justify-between">
                {/* ✅ Botones de formato - Solo visibles cuando NO está en vista previa */}
                {!showPreview && (
                  <div className="flex gap-2 mb-2">
                    <button
                      onClick={() => insertFormatMarker('*')}
                      disabled={!isEditingScript}
                      className="px-2.5 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-full text-sm transition-colors font-bold"
                      title="Negrita"
                    >
                      <strong>N</strong>
                    </button>
                    <button
                      onClick={() => insertFormatMarker('&')}
                      disabled={!isEditingScript}
                      className="px-2.5 pt-0.5 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-800 disabled:cursor-not-allowed text-lime-500 rounded-full text-sm transition-colors font-bold"
                      title="Color verde-lima"
                    >
                      C
                    </button>
                    <button
                      onClick={cleanFormatMarkers}
                      className="px-2 py-2 hover:bg-gray-600 bg-gray-800 text-lime-500 rounded-full text-sm transition-colors font-bold"
                      title="Limpiar marcadores de formato"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 32 32">
                        <path fill="currentColor" d="M26 20h-6v-2h6zm4 8h-6v-2h6zm-2-4h-6v-2h6z"></path>
                        <path fill="currentColor" d="M17.003 20a4.9 4.9 0 0 0-2.404-4.173L22 3l-1.73-1l-7.577 13.126a5.7 5.7 0 0 0-5.243 1.503C3.706 20.24 3.996 28.682 4.01 29.04a1 1 0 0 0 1 .96h14.991a1 1 0 0 0 .6-1.8c-3.54-2.656-3.598-8.146-3.598-8.2m-5.073-3.003A3.11 3.11 0 0 1 15.004 20c0 .038.002.208.017.469l-5.9-2.624a3.8 3.8 0 0 1 2.809-.848M15.45 28A5.2 5.2 0 0 1 14 25h-2a6.5 6.5 0 0 0 .968 3h-2.223A16.6 16.6 0 0 1 10 24H8a17.3 17.3 0 0 0 .665 4H6c.031-1.836.29-5.892 1.803-8.553l7.533 3.35A13 13 0 0 0 17.596 28Z"></path>
                      </svg>
                    </button>
                    <button
                      onClick={clearScript}
                      className="px-2 py-1 hover:bg-gray-600 bg-gray-800 text-red-500 rounded-full text-sm transition-colors font-bold"
                      title="Borrar todo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 576 512">
                        <path fill="currentColor" d="M178.5 416h123l65.3-65.3l-173.5-173.5L66.6 303.9l112 112zm45.5 64h-45.5c-17 0-33.3-6.7-45.3-18.7L17 345C6.1 334.1 0 319.4 0 304s6.1-30.1 17-41L263 17c10.9-10.9 25.6-17 41-17s30.1 6.1 41 17l182 182c10.9 10.9 17 25.6 17 41s-6.1 30.1-17 41L392 416h120c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                      </svg>
                    </button>
                  </div>
                )}

                {/* ✅ Controles derechos */}
                <div className="flex items-center right-auto left-auto absolute gap-3">
                  <div className="items-center text-center">
                    <input
                      type="checkbox"
                      id="vista-previa"
                      className="form-checkbox mt-0.5 h-4 w-4 bg-blue-600 text-jerarquia1 rounded cursor-pointer"
                      checked={showPreview}
                      onChange={(e) => setShowPreview(e.target.checked)}
                    />
                    <label htmlFor="vista-previa" className="ml-1 text-sm text-jerarquia1 cursor-pointer">
                      Vista Previa
                    </label>
                  </div>
                  
                  {/* ✅ Botón guardar - Solo visible cuando está en vista previa */}
                  {showPreview && (
                    <ButtonSave
                      onClick={handleSave}
                      className="btn-success"
                    />
                  )}
                </div>
              </div>
             
              {/* Vista Previa o Editor */}
              <div>
                {showPreview ? (
                  // ✅ Vista Previa con formato
                  <div className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-800 rounded-lg min-h-[288px] max-h-96 overflow-auto">
                    <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">
                      {renderFormattedScript(editedData.script)}
                    </pre>
                  </div>
                ) : (
                  // ✅ Editor de texto
                  <textarea
                    ref={textareaRef}
                    value={editedData.script}
                    onChange={(e) => handleInputChange('script', e.target.value)}
                    onFocus={() => setIsEditingScript(true)}
                    onBlur={() => setIsEditingScript(false)}
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-800 rounded-lg focus:ring-2 focus:ring-jerarquia2 focus:border-transparent font-mono text-sm resize-none transition-all"
                    rows="12"
                    placeholder="Contenido del script... 
Usa * para negrita: *texto en negrita*
Usa & para color verde-lima: &texto en verde&"
                  />
                )}
              </div>
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