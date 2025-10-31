// hooks/useWalletProducts.js
import { useEffect } from "react";
import { useWalletProductStore } from "../../contextGlobal/userStore";

export const useWalletProducts = () => {
  const { loadWalletProducts, walletProducts, isLoading, error } = useWalletProductStore();

  useEffect(() => {
    loadWalletProducts();
  }, [loadWalletProducts]);

  return {
    walletProducts,
    isLoading,
    error,
    reload: loadWalletProducts
  };
};