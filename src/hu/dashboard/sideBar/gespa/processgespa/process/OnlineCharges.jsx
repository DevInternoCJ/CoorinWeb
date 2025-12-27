import React, { useState } from "react";
import SaveButton from "../../../Administration/gespa/ButtonSave";

const OnlineCharges = () => {
  const [action, setAction] = useState("autorizar");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    // Simula una petición
    setTimeout(() => {
      setLoading(false);
      console.log("Acción seleccionada:", action);
    }, 2000);
  };

  const actionOptions = [
    { value: "autorizar", label: "Autorizar" },
    { value: "corregir", label: "Corregir" },
    { value: "consultar", label: "Consultar" }
  ];

  return (
    <div className="py-4 w-full">
      {/* Contenido principal */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl flex flex-col gap-4">
          
          {/* Texto descriptivo */}
          <div className="text-center mb-2">
            <p className="text-sm text-gray-600">
              Cartera <span className="font-semibold">American Express</span>
            </p>
          </div>

          {/* Radio buttons con el estilo de SearchForm */}
          <div className="flex flex-col gap-1">
            <div className="flex gap-6 justify-center">
              {actionOptions.map((option) => (
                <label 
                  key={option.value} 
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="action"
                    value={option.value}
                    checked={action === option.value}
                    onChange={() => setAction(option.value)}
                    className="cursor-pointer"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* Loading spinner */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="relative w-12 h-12">
                {/* Spinner circular con puntos */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-600 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 45}deg) translate(20px) translate(-50%, -50%)`,
                      animation: `spinnerPulse 1s ease-in-out ${i * 0.125}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Botón de acción */}
          {!loading && (
            <div className="flex justify-center mt-4">
              <SaveButton
                onClick={handleSubmit}
              className="btn-success"
              >
                Procesar
              </SaveButton>
            </div>
          )}
        </div>
      </div>

      {/* Estilos para la animación del spinner */}
      <style jsx>{`
        @keyframes spinnerPulse {
          0%, 100% { 
            opacity: 0.2;
            transform: rotate(${0}deg) translate(20px) translate(-50%, -50%) scale(0.8);
          }
          50% { 
            opacity: 1;
            transform: rotate(${0}deg) translate(20px) translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default OnlineCharges;