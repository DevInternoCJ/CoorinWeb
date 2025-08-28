import React from "react";
import LogoConjur from "../../../../assets/ConsorcioLetras_OLD.png";
import CustomSelect from "./SelectWallet";

const CanteraSection = () => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex justify-between items-center">
      <div>
        <img src={LogoConjur} alt="logo-conjur" className="h-14" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Select de Cartera */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cartera
          </label>
          <CustomSelect
            options={["American Express", "Visa", "Mastercard", "Other"]}
            defaultValue="American Express"
          />
        </div>

        {/* Select de Producto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Producto
          </label>
          <CustomSelect
            options={["Amex", "Gold Card", "Platinum", "Centurion"]}
            defaultValue="Amex"
          />
        </div>
      </div>
    </div>
  );
};

export default CanteraSection;