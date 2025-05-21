import React from 'react';

const LoginWallets = () => {
  return (
    <div className="w-full mt-8 rounded-lg ">
      <div className="relative">
        <select
          className="w-full p-2 px-5 bg-neutral-100 text-neutral-900 border rounded-lg focus:outline-none border-jerarquia2 focus:ring-2 focus:ring-jerarquia2 appearance-none cursor-pointer transition duration-200 ease-in-out"
          defaultValue=""
          aria-label="Select wallet"
        >
          <option value="" disabled hidden className=''>
            Seleccionar Piso
          </option>
          <option value="amex" className=" bg-neutral-100 hover:bg-green-600 p-2">
            Piso 1
          </option>
          <option value="banamex" className="bg-neutral-100 p-2 hover:bg-neutral-700">
            Piso 2
          </option>
          <option value="banorte" className="bg-neutral-100 p-2 hover:bg-neutral-700">
            Piso 4
          </option>
          <option value="bbva" className="bg-neutral-100 p-2 hover:bg-neutral-700">
            Piso 5
          </option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg 
            className="h-5 w-5 text-neutral-900" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      </div>
      <div className="relative mt-5">
        <select
          className="w-full p-2 px-5 bg-neutral-100 border text-neutral-900 rounded-lg focus:outline-none border-jerarquia2 focus:ring-2 focus:ring-jerarquia2 appearance-none cursor-pointer transition duration-200 ease-in-out"
          defaultValue=""
          aria-label="Select wallet"
        >
          <option value="" disabled hidden className=''>
            Seleccionar Cartera
          </option>
          <option value="amex" className=" bg-neutral-100 hover:bg-green-600 p-2">
            AMEX
          </option>
          <option value="banamex" className="bg-neutral-100 p-2 hover:bg-neutral-700">
            Banorte
          </option>
          <option value="banorte" className="bg-neutral-100 p-2 hover:bg-neutral-700">
            Santander
          </option>
          <option value="bbva" className="bg-neutral-100 p-2 hover:bg-neutral-700">
            Banamex
          </option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg 
            className="h-5 w-5 text-neutral-900" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LoginWallets;