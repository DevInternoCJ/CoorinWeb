// hooks/useWalletProducts.js
import { useEffect } from "react";
import { useWalletProductStore } from "../../contextGlobal/userStore";

export const useWalletProducts = () => {
  const { loadWalletProducts, walletProducts, isLoading, error } = useWalletProductStore();

  useEffect(() => {
    console.log("🔄 useWalletProducts: Cargando datos...");
    loadWalletProducts();
  }, [loadWalletProducts]);

  console.log("📊 useWalletProducts - Estado actual:", { 
    walletProducts, 
    isLoading, 
    error 
  });

  return {
    walletProducts,
    isLoading,
    error,
    reload: loadWalletProducts
  };
};