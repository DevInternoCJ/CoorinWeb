import React, { useState } from "react";
import { toast } from "sonner";
import ButtonSave from "../ButtonSave";
import { postSavePhrases } from "../../../../../../services/mark/albaz/LokiServices";
import { useWalletProducts } from "../../../../../login/WalletProduct";

export const InputPhrases = ({ onPhraseSaved }) => {
  // Estados
  const [phrase, setPhrase] = useState("");
  const [loading, setLoading] = useState(false);

  // Obtener datos del producto y usuario
  const { walletProducts } = useWalletProducts();
  const idProducto = walletProducts?.[0]?.idProducto;
  const idCartera = walletProducts?.[0]?.idCartera;
  
  // Obtener idEjecutivo del localStorage (ajusta según tu implementación)
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const idEjecutivo = userData?.idEjecutivo || userData?.id || null;

  // Validar que el textarea no esté vacío
  const isValidPhrase = phrase.trim().length > 0;

  // Manejar cambio en el textarea
  const handlePhraseChange = (e) => {
    setPhrase(e.target.value);
  };

  // Manejar el guardado de la frase
  const handleSavePhrase = async () => {
    // Validaciones
    if (!isValidPhrase) {
      toast.error("Por favor, escribe una frase antes de guardar");
      return;
    }

    if (!idProducto || !idCartera) {
      toast.error("No se encontraron datos del producto. Por favor, recarga la página");
      return;
    }

    if (!idEjecutivo) {
      toast.error("No se encontró información del usuario. Por favor, inicia sesión nuevamente");
      return;
    }

    setLoading(true);

    try {
      // Preparar datos para enviar según el formato del endpoint
      const data = {
        idEjecutivo,
        idCartera,
        idProducto,
        textoFrase: phrase.trim()
      };

      console.log("💾 Guardando frase:", data);

      // Llamar al endpoint
      const response = await postSavePhrases(data);

      console.log("📥 Respuesta completa:", response);

      if (response?.exito || response?.success || response?.message) {
        const successMessage = response?.message || response?.mensaje || "Frase guardada exitosamente";
        
        // Mostrar toast de éxito con el mensaje del servidor
        toast.success(successMessage, {
          duration: 4000,
          position: 'top-right',
        });
        
        setPhrase(""); // Limpiar el textarea
        
        // Notificar al componente padre si existe callback
        if (onPhraseSaved) {
          onPhraseSaved(response);
        }
      } else {
        toast.error(response?.mensaje || "Error al guardar la frase");
      }
    } catch (err) {
      console.error("Error al guardar frase:", err);
      
      // Manejo de errores específicos
      if (err.response?.status === 401) {
        toast.error("Sesión expirada. Por favor, inicia sesión nuevamente", {
          duration: 5000,
        });
      } else if (err.response?.data?.mensaje) {
        toast.error(err.response.data.mensaje);
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Error al guardar la frase. Por favor, intenta nuevamente");
      }
    } finally {
      setLoading(false);
    }
  };

  // Manejar Enter + Ctrl para guardar rápido
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      handleSavePhrase();
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      <div className="w-full">
        <h5
          htmlFor="textarea-phrase"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Escribe la frase
        </h5>
        <textarea
          id="textarea-phrase"
          value={phrase}
          onChange={handlePhraseChange}
          onKeyDown={handleKeyDown}
          className="py-2 border border-gray-300 rounded-lg px-3 sm:py-3 sm:px-4 block w-full sm:text-sm focus:ring-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors disabled:opacity-50 disabled:pointer-events-none disabled:bg-gray-100"
          rows="4"
          placeholder="Frase..."
          disabled={loading}
        />
      </div>
      {/* Botón de guardar */}
      <div className="flex justify-end mt-4">
        <ButtonSave
          className=""
          loading={loading}
          onClick={handleSavePhrase}
          disabled={loading || !isValidPhrase}
        />
      </div>
    </div>
  );
};