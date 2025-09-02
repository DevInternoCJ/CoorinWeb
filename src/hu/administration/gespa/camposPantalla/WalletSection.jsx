import React, { useEffect, useState } from "react";
import LogoConjur from "../../../../assets/ConsorcioLetras_OLD.png";
import CustomSelect from "./SelectWallet";
import { GetVerifyProduct } from "../../../../services/LokiServices";

const PRODUCT_OPTIONS = [
  { label: "Producto", value: 0 },
  { label: "Amex", value: 1 },
];

const WalletSection = ({
  selectedProduct,
  setSelectedProduct,
  verifyResult,
  setVerifyResult,
  loading,
  setLoading,
}) => {
  const servidor = "Cronoss";

  useEffect(() => {
    console.log("selectedProduct:", selectedProduct);
    if (!selectedProduct || selectedProduct.value !== 1) return;
    const fetchVerifyProduct = async () => {
      setLoading(true);
      try {
        const result = await GetVerifyProduct(servidor, selectedProduct.value);
        setVerifyResult(result);
      } catch (error) {
        setVerifyResult(null);
      } finally {
        setLoading(false);
      }
    };
    fetchVerifyProduct();
  }, [selectedProduct, servidor, setLoading, setVerifyResult]);

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
            options={["American Express"]}
            defaultValue="American Express"
          />
        </div>
        {/* Select de Producto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Producto
          </label>
          <CustomSelect
            options={PRODUCT_OPTIONS.map((opt) => opt.label)}
            defaultValue={null}
            onChange={(label) => {
              const found = PRODUCT_OPTIONS.find((opt) => opt.label === label);
              setSelectedProduct(found ? { ...found } : null);
            }}
          />
          {loading && (
            <p className="text-xs text-gray-400 mt-1">
              Verificando producto...
            </p>
          )}
          {verifyResult && (
            <p className="text-xs text-green-600 mt-1">
              Producto verificado correctamente.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletSection;
