import React, { useState, useEffect } from "react";
import SelectWallet from "../../../../board/screenFields/SelectWallet";
import ButtonSave from "../ButtonSave";
import { SaveCreateTemplate, UpdateTemplate } from "../../../../../../services/LokiServices";
import { DeleteTemplate } from "../../../../../../services/LokiServices";
import { useUserStore } from "../../../../../../contextGlobal/userStore";
import { toast } from "sonner";

const Template = ({ plantillas = [], onActualizarPlantillas, datosDeudor}) => {
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

  useEffect(() => {
    setSelectedPlantilla(plantillas[0]?.nombre ?? "");
    setIdCorreoScript(plantillas[0]?.idCorreoScript ?? null);
  }, [plantillas]);

    // Función para reemplazar los placeholders por valores reales
  const generarVistaPrevia = (texto) => {
  if (!vistaPrevia) return texto;
  console.log("datosDeudor en Template:", datosDeudor);
  
  const reemplazos = {
    '\\[Saldo\\]': datosDeudor?.Saldo || '',
    '\\[NombreDeudor\\]': datosDeudor?.NombreDeudor || '',
    '\\[RFC\\]': datosDeudor?.RFC || '',
    '\\[NúmeroCliente\\]': datosDeudor?.NúmeroCliente || '',
  };
  
  let textoConReemplazos = texto;
  
  Object.entries(reemplazos).forEach(([placeholder, valor]) => {
    const regex = new RegExp(placeholder, 'gi');
    textoConReemplazos = textoConReemplazos.replace(regex, valor);
  });

  return textoConReemplazos;
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
      // Si necesitas guardar el idCorreoScript en un estado, aquí puedes hacerlo
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
        const existeNombre = plantillas.some(
          (p) => p.nombre.trim().toLowerCase()
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

         {/* Input para el texto de pago */}
          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={vistaPrevia ? generarVistaPrevia(mensaje) : mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="w-full bg-transparent border-b border-background-dashboard focus:border-jerarquia3 focus:outline-none py-1 text-neutral-200"
              placeholder="Mensaje"
            />
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
                onChange={(e) => setVistaPrevia(e.target.checked)}
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
                  disabled={
                    !nombre.trim() || !asunto.trim() || !mensaje.trim()
                  }
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
