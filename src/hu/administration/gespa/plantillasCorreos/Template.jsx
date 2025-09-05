import React, { useState } from 'react';
import CustomSelect from '../camposPantalla/SelectWallet';

const Template = () => {

  return (
     <div className=" bg-neutral-100 p-6 rounded-lg text-white">
              <div className='flex justify-start items-center mb-4 gap-3'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plantilla
          </label>
          <CustomSelect
            options={["Recordatorio de Pago"]}
            defaultValue="Recordatorio de Pago"
          />
        </div>

      <div className=" bg-background-secondary rounded-lg p-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-gray-400">Texto</span>
        </div>
        <div className=" border-1 p-3 border-jerarquia1 rounded-lg min-h-[200px] leading-relaxed">
          <p className="font-bold">recordatorio de pago</p>
          <p className="mt-2 text-gray-300">recordarle al th</p>
          <p className="mt-2 text-white">tiene que pagar <span className="font-bold">[Saldo]</span></p>
          <button className="mt-4 px-4 py-2 bg-red-800 rounded-md hover:bg-red-700 transition-colors">
            Borrar
          </button>
                  <div className="flex items-center mt-4">
          <input type="checkbox" id="vista-previa" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
          <label htmlFor="vista-previa" className="ml-2 text-sm text-gray-300">Vista Previa</label>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Template;