import React from "react";

const CapturaVisitsF6 = () => (
  <div className="area-f5 p-2 rounded mb-2 h-full">
    <h3 className="font-bold text-sm mb-2">Teléfonos – F6</h3>
    <div className="mb-2">
      <label className="block text-xs mb-1">Teléfono</label>
      <input
        className="px-4 p-1 block w-full rounded-lg sm:text-sm bg-gray-50 border-transparent focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1"
        style={{ color: 'var(--color-jerarquia3)' }}
      />
    </div>
    <div
      style={{
        overflowX: "auto",
        overflowY: "auto",
        scrollbarColor: "#b0b0b0 #f5f5f5",
        scrollbarWidth: "thin",
        maxHeight: "190px"
      }}
      className="scrollbar-gray w-full"
    >
      <table className="modal-table text-xs lg:text-sm" style={{ minWidth: '100%' }}>
        <thead>
          <tr>
            <th style={{ position: 'sticky', top: 0, background: 'var(--color-jerarquia3)', color: '#fff', zIndex: 2 }}>Teléfono</th>
            <th style={{ position: 'sticky', top: 0, background: 'var(--color-jerarquia3)', color: '#fff', zIndex: 2 }}>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {["5551234567","5559876543","5551112222","5553334444","5555556666","5557778888","5559990000","5552223333","5554445555","5556667777","5558889999"].map((tel, idx) => (
            <tr key={tel+idx}>
              <td>{tel}</td>
              <td className="text-center align-middle">
                <span className="flex justify-center items-center w-full h-full">
                  <svg
                    role="button"
                    tabIndex={0}
                    aria-label="Eliminar"
                    className="w-5 h-5 text-red-500 cursor-not-allowed"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default CapturaVisitsF6;
