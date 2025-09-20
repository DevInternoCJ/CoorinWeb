import React, { useState } from 'react';
import CustomSelect from '../camposPantalla/SelectWallet';

const Template = ({saldo}) => {
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [textoPago, setTextoPago] = useState('');

  return (
    <div className=" bg-neutral-100 rounded-lg text-white mt-5">
      <div className="flex justify-start items-center mb-4 gap-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Plantilla
        </label>
        <CustomSelect
          options={["Recordatorio de Pago"]}
          defaultValue="Recordatorio de Pago"
        />
      </div>

      <div className=" bg-jerarquia1 rounded-lg p-4 mt-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-jerarquia4 font-bold text-lg">Texto</span>
        </div>
        <div className="border-1 p-3 border-background-dashboard rounded-lg min-h-[200px] leading-relaxed">
          {/* Input para el título */}
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className=" w-full bg-transparent border-b border-background-dashboard focus:border-jerarquia3 focus:outline-none py-1 text-white"
            placeholder="Recordatorio de pago"
          />
          
          {/* Input para el mensaje */}
          <input
            type="text"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className="mt-4 w-full bg-transparent border-b border-background-dashboard focus:border-jerarquia3 focus:outline-none py-1 text-gray-300"
            placeholder="Recordarle al th"
          />
          
          {/* Input para el texto de pago */}
          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={textoPago}
              onChange={(e) => setTextoPago(e.target.value)}
              className="w-full bg-transparent border-b border-background-dashboard focus:border-jerarquia3 focus:outline-none py-1 text-white"
              placeholder="Tiene que pagar"
            />
            <span className="font-bold ml-2 whitespace-nowrap">[{saldo || 'Saldo'}]</span>
          </div>
          
          <button className="mt-4 px-4 py-2 bg-red-700 rounded-md hover:bg-red-600 transition-colors">
            Borrar
          </button>
          <div className="flex items-center text-jerarquia3 mt-4">
            <input
              type="checkbox"
              id="vista-previa"
              className="form-checkbox h-4 w-4 text-jerarquia3 rounded"
            />
            <label
              htmlFor="vista-previa"
              className="ml-2 text-sm text-jerarquia3"
            >
              Vista Previa
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;