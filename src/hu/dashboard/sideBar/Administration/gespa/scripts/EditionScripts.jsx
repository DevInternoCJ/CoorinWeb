import React, {} from 'react'
import SelectWallet from "../../../../board/screenFields/SelectWallet";

const EditionScripts = () => {
      const walletOptions = [
    { value: "wallet1", label: "Wallet 1" },
    { value: "wallet2", label: "Wallet 2" },
    // ... más opciones
  ];
  const handleWalletChange = (selectedValue) => {
    console.log("Wallet seleccionado:", selectedValue);
    // Aquí tu lógica para manejar el cambio
  };

  return (
    <div>
        <div className="flex justify-start items-center gap-2 mb-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Script
            </label>
               <SelectWallet
        options={walletOptions}
        label="Selecciona"
        onChange={handleWalletChange}
        defaultValue=""
      />
          </div>       
        <div className=" bg-gray-700 rounded-lg p-4"> 
        <div className="border-1 p-3 border-jerarquia1 rounded-lg min-h-[200px] leading-relaxed">        
        </div>
      </div>
    </div>
  )
}

export default EditionScripts
