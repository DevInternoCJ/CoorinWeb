import React, { useState, useEffect } from "react";
import SelectWallet from "../../../../board/screenFields/SelectWallet";
import ButtonSave from "../ButtonSave";
import {
  SaveCreateTemplate,
  UpdateTemplate,
} from "../../../../../../services/mark/albaz/LokiServices";
import { DeleteTemplate } from "../../../../../../services/mark/albaz/LokiServices";
import { useUserStore } from "../../../../../../contextGlobal/userStore";
import { toast } from "sonner";

const Template = ({ plantillas = [], onActualizarPlantillas, datosDeudor, datosProductoCompleto = {} }) => {
  const [idCorreoScript, setIdCorreoScript] = useState(
    plantillas[0]?.idCorreoScript ?? null
  );
  const [loading, setLoading] = useState(false);
  const [nombre, setNombre] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [vistaPrevia, setVistaPrevia] = useState(false);
  const [selectedPlantilla, setSelectedPlantilla] = useState(
    plantillas[0]?.nombre ?? ""
  );
  // Estados para el drag and drop
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  useEffect(() => {
    setSelectedPlantilla(plantillas[0]?.nombre ?? "");
    setIdCorreoScript(plantillas[0]?.idCorreoScript ?? null);
  }, [plantillas]);

  // ========== FUNCIONES DE DRAG AND DROP ==========
  
  // Cuando se arrastra sobre el input de mensaje
  const handleDragOver = (e) => {
     // bloque input mensaje cuando es vista previa
    if (vistaPrevia) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.dropEffect = 'copy';
    setIsDraggingOver(true);
  };

  // Cuando sale del área del input
  const handleDragLeave = (e) => {
    // Evitar que se dispare cuando se arrastra sobre elementos hijos
    if (e.currentTarget === e.target) {
      setIsDraggingOver(false);
    }
  };

  // Cuando se suelta el campo en el input
  const handleDrop = (e) => {
    // bloquea drop en vista previa
    if (vistaPrevia) {
      e.preventDefault();
      toast.warning("No puedes agregar campos en modo Vista Previa. Desactiva la vista previa para editar.");
      return;
    }
    e.preventDefault();
    const droppedText = e.dataTransfer.getData('text/plain'); 
    // Insertar el texto en la posición del cursor o al final
    const inputElement = e.target;
    const cursorPosition = inputElement.selectionStart;
    const textBefore = mensaje.substring(0, cursorPosition);
    const textAfter = mensaje.substring(cursorPosition);
    
    setMensaje(textBefore + droppedText + textAfter);
    setIsDraggingOver(false);
    
    // Mostrar notificación de éxito
    toast.success(`Campo ${droppedText} agregado al mensaje`);
  };

  // ===============================================

   const generarVistaPrevia = (texto) => {
    if (!vistaPrevia) return texto;
    
    console.log("datosDeudor:", datosDeudor);
    console.log("datosProductoCompleto:", datosProductoCompleto);

    // Crear objeto con todos los reemplazos posibles
    const reemplazos = {
      // Datos del deudor (ya existentes)
      "\\[Saldo\\]": datosDeudor?.Saldo || "[Saldo]",
      "\\[NombreDeudor\\]": datosDeudor?.NombreDeudor || "[NombreDeudor]",
      "\\[RFC\\]": datosDeudor?.RFC || "[RFC]",
      "\\[NúmeroCliente\\]": datosDeudor?.NúmeroCliente || "[NúmeroCliente]",
      
      // ¡NUEVO: Agregar todos los campos de datosProductoCompleto!
      ...Object.keys(datosProductoCompleto).reduce((acc, key) => {
        // Crear regex para el placeholder [NombreCampo]
        const placeholder = `\\[${key}\\]`;
        const valor = datosProductoCompleto[key];
        
        // Formatear el valor similar a como lo hace LoadDates
        acc[placeholder] = formatValueForPreview(valor, key);
        return acc;
      }, {})
    };

    let textoConReemplazos = texto;

    // Aplicar todos los reemplazos
    Object.entries(reemplazos).forEach(([placeholder, valor]) => {
      const regex = new RegExp(placeholder, "gi");
      textoConReemplazos = textoConReemplazos.replace(regex, valor);
    });

    return textoConReemplazos;
  };

  // Función auxiliar para formatear valores en la vista previa
const formatValueForPreview = (value, key) => {
  // Si no hay valor, retornar cadena vacía en lugar del placeholder
  if (value === null || value === undefined || value === "") {
    return ""; // ✅ Cambiado: ahora retorna cadena vacía
  }
  
  if (typeof value === "object" && Object.keys(value).length === 0) {
    return ""; // ✅ Cambiado: ahora retorna cadena vacía
  }
  
  // Formatear números como moneda (similar a LoadDates)
  if ((typeof value === "number" || (!isNaN(parseFloat(value)) && isFinite(value))) && 
      key !== "idCuenta") {
    return `$${parseFloat(value).toLocaleString()}`;
  }
  
  // Para fechas u otros formatos específicos
  if (typeof value === "string" && value.match(/\d{2}\/\d{2}\/\d{4}/)) {
    return value;
  }
  
  return String(value);
};

  // Esta función te permite obtener el idCorreoScript de la plantilla seleccionada
  const handleSelectChange = (nombreSeleccionado) => {
    setSelectedPlantilla(nombreSeleccionado);
    const plantillaObj = plantillas.find(
      (p) => p.nombre === nombreSeleccionado
    );
    if (plantillaObj) {
      setNombre(plantillaObj.nombre || "");
      setAsunto(plantillaObj.asunto || "");
      setMensaje(plantillaObj.mensaje || "");
      setIdCorreoScript(plantillaObj.idCorreoScript || null);
    }
  };

  // Función para borrar plantilla
  const handleDelete = async () => {
    if (!idCorreoScript) {
      toast.error("No se ha seleccionado una plantilla válida para borrar.");
      return;
    }
    try {
      const data = { idCorreoScript };
      await DeleteTemplate({ data });
      toast.success("Plantilla eliminada correctamente.");
      // Limpiar los inputs después de borrar
      setNombre("");
      setAsunto("");
      setMensaje("");
      setSelectedPlantilla("");
      setIdCorreoScript(null);
      if (onActualizarPlantillas) {
        await onActualizarPlantillas();
      }
    } catch (error) {
      toast.error("Error al eliminar la plantilla.");
    }
  };

  const user = useUserStore((state) => state.user);
  console.log("Datos de usuario en el store:", user);
  const idEjecutivo = 38764;
  console.log("idEjecutivo del usuario:", idEjecutivo);
  const idProducto = 1;

  const handleSave = async () => {
    setLoading(true);
    try {
      // Si existe idCorreoScript, actualiza la plantilla existente
      if (idCorreoScript) {
        const payload = {
          idCorreoScript,
          idProducto,
          nombre: nombre,
          asunto: asunto,
          mensaje: mensaje,
          idEjecutivo,
        };
        await UpdateTemplate(payload);
        toast.success("Plantilla actualizada correctamente.");
      } else {
        // Validar que no exista una plantilla con el mismo nombre
        const existeNombre = plantillas.some((p) =>
          p.nombre.trim().toLowerCase()
        );
        if (existeNombre) {
          toast.warning(
            "Ya existe una plantilla con ese nombre. Elige otro nombre."
          );
          setLoading(false);
          return;
        }
        const payload = {
          idProducto,
          nombre: nombre,
          asunto: asunto,
          mensaje: mensaje,
          idEjecutivo,
        };
        await SaveCreateTemplate(payload);
        toast.success("Plantilla creada correctamente.");
      }
      // Puedes mostrar un toast o limpiar los campos aquí
      if (plantillas.length > 0) {
        setSelectedPlantilla(plantillas[0].nombre);
        setNombre(plantillas[0].nombre || "");
        setAsunto(plantillas[0].asunto || "");
        setMensaje(plantillas[0].mensaje || "");
      }
      if (onActualizarPlantillas) {
        await onActualizarPlantillas();
      }
    } catch (error) {
      // Manejo de error (puedes mostrar un toast)
    } finally {
      setLoading(false);
    }
  };

  // ✅ Función para manejar el cambio del checkbox de vista previa
  const handleVistaPreviaChange = (e) => {
    const isChecked = e.target.checked;
    setVistaPrevia(isChecked);
    
    // Mostrar mensaje informativo cuando se activa la vista previa
    if (isChecked) {
      toast.info("Modo Vista Previa activado. El mensaje está bloqueado para edición.");
    }
  };

  return (
    <div className=" bg-neutral-100 rounded-lg text-white mt-5">
      <div className="flex justify-start items-center mb-4 gap-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Plantilla
        </label>
        <SelectWallet
          options={plantillas.map((p) => ({
            label: p.nombre,
            value: p.nombre,
            idCorreoScript: p.idCorreoScript,
          }))}
          value={selectedPlantilla}
          onChange={handleSelectChange}
        />
      </div>

      <div className=" bg-gray-700 rounded-lg p-4 mt-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-jerarquia1 font-bold text-lg">Info</span>
        </div>
        <div className="border-1 p-3 border-jerarquia1 rounded-lg min-h-[200px] leading-relaxed">
          {/* Input para el título */}
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className=" w-full bg-transparent border-b border-background-dashboard focus:border-jerarquia3 focus:outline-none py-1 text-neutral-200"
            placeholder="Nombre"
          />

          <input
            type="text"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            className="mt-4 w-full bg-transparent border-b border-background-dashboard focus:border-jerarquia3 focus:outline-none py-1 text-neutral-200"
            placeholder="Asunto"
          />

           {/* Área de mensaje con drop zone */}
          <div 
            className="mt-4 flex items-center relative"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="text"
              value={vistaPrevia ? generarVistaPrevia(mensaje) : mensaje}
              onChange={(e) => {
                // BLOQUEAR edición directa en vista previa
                if (!vistaPrevia) {
                  setMensaje(e.target.value);
                }
              }}
              readOnly={vistaPrevia} // Input de solo lectura en vista previa
              className={`
                w-full bg-transparent border-b focus:outline-none py-1 text-neutral-200
                transition-all duration-200
                ${isDraggingOver && !vistaPrevia 
                  ? 'border-blue-400 border-b-2 bg-blue-900 bg-opacity-20' 
                  : 'border-background-dashboard focus:border-jerarquia3'
                }
                ${vistaPrevia 
                  ? 'cursor-not-allowed opacity-80 bg-gray-800 bg-opacity-30' 
                  : 'cursor-text'
                } // ✅ Estilos para indicar que está bloqueado
              `}
              placeholder={vistaPrevia ? "Vista previa activada (solo lectura)" : "Mensaje (arrastra campos aquí)"}
            />
            
             {isDraggingOver && !vistaPrevia && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={512} viewBox="0 0 640 512"><path fill="currentColor" d="M320 0c17.7 0 32 14.3 32 32v208c0 8.8 7.2 16 16 16s16-7.2 16-16V64c0-17.7 14.3-32 32-32s32 14.3 32 32v176c0 8.8 7.2 16 16 16s16-7.2 16-16V128c0-17.7 14.3-32 32-32s32 14.3 32 32v178.2c-19.2 5.4-34.7 20.4-40.4 40.3l-6.5 22.7l-22.7 6.5c-25.2 7.2-42.5 30.2-42.5 56.4c0 22.1 12.4 42 31.4 51.9c-27.5 17.8-60.2 28.1-95.4 28.1h-19.2c-59.6 0-116.9-22.9-160-64L76.4 341c-16-15.2-16.6-40.6-1.4-56.6s40.6-16.6 56.6-1.4l60.5 57.6c0-1.5-.1-3.1-.1-4.6V64c0-17.7 14.3-32 32-32s32 14.3 32 32v176c0 8.8 7.2 16 16 16s16-7.2 16-16V32c0-17.7 14.3-32 32-32m-7.3 326.6c-1.1-3.9-4.7-6.6-8.7-6.6s-7.6 2.7-8.7 6.6L288 352l-25.4 7.3c-3.9 1.1-6.6 4.7-6.6 8.7s2.7 7.6 6.6 8.7L288 384l7.3 25.4c1.1 3.9 4.7 6.6 8.7 6.6s7.6-2.7 8.7-6.6L320 384l25.4-7.3c3.9-1.1 6.6-4.7 6.6-8.7s-2.7-7.6-6.6-8.7L320 352zM104 120l48.3 13.8c4.6 1.3 7.7 5.5 7.7 10.2s-3.1 8.9-7.7 10.2L104 168l-13.8 48.3c-1.3 4.6-5.5 7.7-10.2 7.7s-8.9-3.1-10.2-7.7L56 168L7.7 154.2C3.1 152.9 0 148.7 0 144s3.1-8.9 7.7-10.2L56 120l13.8-48.3C71.1 67.1 75.3 64 80 64s8.9 3.1 10.2 7.7zm480 288l48.3 13.8c4.6 1.3 7.7 5.5 7.7 10.2s-3.1 8.9-7.7 10.2L584 456l-13.8 48.3c-1.3 4.6-5.5 7.7-10.2 7.7s-8.9-3.1-10.2-7.7L536 456l-48.3-13.8c-4.6-1.3-7.7-5.5-7.7-10.2s3.1-8.9 7.7-10.2L536 408l13.8-48.3c1.3-4.6 5.5-7.7 10.2-7.7s8.9 3.1 10.2 7.7z"></path></svg>
                {/* //<Icon icon="mdi:home" /> */}
              </div>
              
            )}
            
            {/* ✅ Indicador de solo lectura en vista previa */}
            {vistaPrevia && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg 
                  className="w-5 h-5 text-yellow-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                  />
                </svg>
              </div>
            )}
          </div>

          <button
            className="bg-red-700 p-2 mt-5 rounded-md text-white hover:text-red-100 border-red-600 hover:border-red-600 focus:ring-red-500 hover:bg-red-600 hover:shadow-lg hover:shadow-red-600"
            onClick={handleDelete}
            type="button"
            disabled={!idCorreoScript}
          >
            Borrar
          </button>
          <div className="flex items-center justify-between text-jerarquia3 mt-4">
            <div>
              <input
                type="checkbox"
                id="vista-previa"
                className="form-checkbox h-4 w-4 bg-blue-600 text-jerarquia3 rounded cursor-pointer"
                checked={vistaPrevia}
                onChange={handleVistaPreviaChange}
              />
              <label
                htmlFor="vista-previa"
                className="ml-2 text-sm text-jerarquia3 "
              >
                Vista Previa
              </label>
            </div>
            {vistaPrevia && (
              <div className="">
                <ButtonSave
                  loading={loading}
                  onClick={handleSave}
                  disabled={!nombre.trim() || !asunto.trim() || !mensaje.trim()}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;