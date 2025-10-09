import React, { useEffect, useState } from "react";
import LogoCoorin from "../../../../assets/logo_coorin_3.svg";
import SelectWallet from "./SelectWallet";
import { GetVerifyProduct } from "../../../../../../services/mark/albaz/LokiServices";

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
  const servidor = "Thor";

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
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex justify-evenly items-center">
      <div>
        <img src={LogoCoorin} alt="logo-conjur" className="h-20" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Select de Cartera */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cartera
          </label>
          <SelectWallet
            options={["American Express"]}
            defaultValue="American Express"
          />
        </div>
        {/* Select de Producto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Producto
          </label>
          <SelectWallet
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
