import React, { useState, useEffect } from "react";
import SelectWallet from "../../../../board/screenFields/SelectWallet";
import ButtonSave from "../ButtonSave";
import { SaveCreateTemplate } from "../../../../../../services/LokiServices";
import { DeleteTemplate } from "../../../../../../services/LokiServices";
import { useUserStore } from "../../../../../../contextGlobal/userStore";
import { toast } from "sonner";

const Template = ({ saldo, plantillas = [], onActualizarPlantillas }) => {
  const [idCorreoScript, setIdCorreoScript] = useState(
    plantillas[0]?.idCorreoScript ?? null
  );
  const [loading, setLoading] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [textoPago, setTextoPago] = useState("");
  const [vistaPrevia, setVistaPrevia] = useState(false);
  const [selectedPlantilla, setSelectedPlantilla] = useState(
    plantillas[0]?.nombre ?? ""
  );

  useEffect(() => {
    setSelectedPlantilla(plantillas[0]?.nombre ?? "");
    setIdCorreoScript(plantillas[0]?.idCorreoScript ?? null);
  }, [plantillas]);

  // Esta función te permite obtener el idCorreoScript de la plantilla seleccionada
  const handleSelectChange = (nombreSeleccionado) => {
    setSelectedPlantilla(nombreSeleccionado);
    const plantillaObj = plantillas.find(
      (p) => p.nombre === nombreSeleccionado
    );
    if (plantillaObj) {
      setTitulo(plantillaObj.nombre || "");
      setMensaje(plantillaObj.asunto || "");
      setTextoPago(plantillaObj.mensaje || "");
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
      // Validar que no exista una plantilla con el mismo nombre
      const existeNombre = plantillas.some(
        (p) => p.nombre.trim().toLowerCase() === titulo.trim().toLowerCase()
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
        nombre: titulo,
        asunto: mensaje,
        mensaje: textoPago,
        idEjecutivo,
      };
      await SaveCreateTemplate(payload);
      // Puedes mostrar un toast o limpiar los campos aquí
      if (plantillas.length > 0) {
        setSelectedPlantilla(plantillas[0].nombre);
        setTitulo(plantillas[0].nombre || "");
        setMensaje(plantillas[0].asunto || "");
        setTextoPago(plantillas[0].mensaje || "");
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
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className=" w-full bg-transparent border-b border-background-dashboard focus:border-jerarquia3 focus:outline-none py-1 text-neutral-200"
            placeholder="Nombre"
          />

          {/* Input para el mensaje */}
          <input
            type="text"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className="mt-4 w-full bg-transparent border-b border-background-dashboard focus:border-jerarquia3 focus:outline-none py-1 text-neutral-200"
            placeholder="Asunto"
          />

          {/* Input para el texto de pago */}
          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={textoPago}
              onChange={(e) => setTextoPago(e.target.value)}
              className="w-full bg-transparent border-b border-background-dashboard focus:border-jerarquia3 focus:outline-none py-1 text-neutral-200"
              placeholder="Mensaje"
            />
            <span className=" ml-2 text-neutral-200">
              {vistaPrevia ? `[${saldo}]` : '["Saldo"]'}
            </span>
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
                    !titulo.trim() || !mensaje.trim() || !textoPago.trim()
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
