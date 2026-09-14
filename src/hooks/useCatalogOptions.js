import { useEffect } from "react";
import { useCatalogStore, selectCarteraOptions, selectProductoOptions } from "../contextGlobal/catalogStore";
import { useUserStore } from "../contextGlobal/userStore";

export const useCatalogOptions = ({ loadProducts = true, idCartera = "" } = {}) => {
  const user = useUserStore((state) => state.user);
  const store = useCatalogStore();
  const loadCatalogs = useCatalogStore((state) => state.loadCatalogs);

  useEffect(() => {
    if (user) loadCatalogs(user);
  }, [user, loadCatalogs]);

  return {
    ...store,
    carteraOptions: selectCarteraOptions(store),
    productoOptions: loadProducts ? selectProductoOptions(store, idCartera) : [],
  };
};

export default useCatalogOptions;

