import React, { useState } from "react";
import CustomSelect from "../camposPantalla/SelectWallet";
import ButtonSave from "../ButtonSave";
import { SaveCreateTemplate}  from "../../../../services/LokiServices";
import { useUserStore } from "../../../../contextGlobal/userStore";

const Template = ({ saldo, plantillas = [] }) => { 
  const [loading, setLoading] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [textoPago, setTextoPago] = useState("");
  const [vistaPrevia, setVistaPrevia] = useState(false);
  const [selectedPlantilla, setSelectedPlantilla] = useState("");

  const user = useUserStore((state) => state.user);
  console.log("Datos de usuario en el store:", user);
  const idEjecutivo = 38764;
  console.log("idEjecutivo del usuario:", idEjecutivo);
  const idProducto = 1;

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        idProducto,
        nombre: titulo,
        asunto: mensaje,
        mensaje: textoPago,
        idEjecutivo,
      };
      await SaveCreateTemplate(payload);
      // Puedes mostrar un toast o limpiar los campos aquí
    } catch (error) {
      // Manejo de error (puedes mostrar un toast)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-100 rounded-lg text-white mt-5">
      <div className="flex justify-start items-center mb-4 gap-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Plantilla
        </label>
        <CustomSelect
          options={[
            ...plantillas.map((p) => ({ label: p.nombre, value: p.id })),
            { label: "Nuevo", value: "nuevo" },
          ]}
          defaultValue={plantillas[0]?.id || "nuevo"}
          onChange={setSelectedPlantilla}
        />
      </div>

      <div className="bg-jerarquia1 rounded-lg p-4 mt-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-jerarquia4 font-bold text-lg">Texto</span>
        </div>
        <div className="border-1 p-3 border-background-dashboard rounded-lg min-h-[200px] leading-relaxed">
          
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className=" w-full bg-transparent border-b border-background-dashboard focus:border-jerarquia3 focus:outline-none py-1 text-white"
            placeholder="Nombre"
          />

          {/* Input para el mensaje */}
          <input
            type="text"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className="mt-4 w-full bg-transparent border-b border-background-dashboard focus:border-jerarquia3 focus:outline-none py-1 text-gray-300"
            placeholder="Asunto"
          />

          {/* Input para el texto de pago */}
          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={textoPago}
              onChange={(e) => setTextoPago(e.target.value)}
              className="w-full bg-transparent border-b border-background-dashboard focus:border-jerarquia3 focus:outline-none py-1 text-white"
              placeholder="Mensaje"
            />
            <span className="font-bold ml-2 text-jerarquia4">
              [{saldo || "Saldo"}]
            </span>
          </div>

          <button className="bg-red-600 p-2 mt-5 rounded-md text-white hover:text-red-100 border-red-600 hover:border-red-500 focus:ring-red-500 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600">
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
                <ButtonSave loading={loading} onClick={handleSave} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
