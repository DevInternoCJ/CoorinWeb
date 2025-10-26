import React from "react";

const CapturaVisitsF4 = () => (
  <div className="area-f4 border p-2 rounded mb-2">
    <h3 className="font-bold text-sm mb-2">Visita – F4</h3>
    <div className="grid grid-cols-4 gap-2">
      <div>
        <label className="block text-xs mb-1">Contacto</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Parentesco</label>
        <select disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Atendió</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Situación</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Visita</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" type="date" />
      </div>
      <div>
        <label className="block text-xs mb-1">Hora</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" type="time" />
      </div>
      <div>
        <label className="block text-xs mb-1">No Pago</label>
        <select disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Visitador</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Sucursal</label>
        <select disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Paquete</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div>
        <label className="block text-xs mb-1">Fecha Pago</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" type="date" />
      </div>
      <div>
        <label className="block text-xs mb-1">Monto</label>
        <input disabled className="w-full border rounded text-xs bg-gray-100" />
      </div>
      <div className="col-span-4">
        <label className="block text-xs mb-1">Observación</label>
       <textarea disabled className="w-full border rounded text-xs bg-gray-100 min-h-[3.05rem] h-[4.2rem]" rows={4} />
      </div>
    </div>
  </div>
);

export default CapturaVisitsF4;
