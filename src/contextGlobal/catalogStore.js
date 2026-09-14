import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import CatalogService from "../services/catalogs/CatalogService";
import { toOptions } from "../schemas/formSchemas";
import { ACTIVE_SERVER } from "../config/backend";

const initialState = {
  status: "idle",
  carteras: [],
  productos: [],
  catalogos: [],
  valores: [],
  consultas: [],
  rechazos: [],
  versiones: [],
  columnasPorProducto: {},
  loadedFor: null,
  error: null,
};

const asRows = (payload, keys = []) => {
  if (Array.isArray(payload)) return payload;
  return keys.reduce((rows, key) => (rows.length ? rows : Array.isArray(payload?.[key]) ? payload[key] : []), []);
};

const normalizeCarteras = (rows) => asRows(rows, ["Carteras", "carteras"]).map((row) => ({
  ...row,
  idCartera: row?.idCartera ?? row?.IdCartera,
  cartera: row?.cartera ?? row?.Cartera ?? row?.NombreCartera,
}));

const normalizeProductos = (rows) => asRows(rows, ["Productos", "productos"]).map((row) => ({
  ...row,
  idProducto: row?.idProducto ?? row?.IdProducto,
  producto: row?.producto ?? row?.Producto ?? row?.NombreProducto,
  idCartera: row?.idCartera ?? row?.IdCartera,
}));

const sessionKey = (user) => {
  const server = ACTIVE_SERVER;
  const identity = user?.idEjecutivo ?? user?.Usuario ?? user?.usuario ?? "session";
  return `${server}:${identity}`;
};

export const useCatalogStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      loadCatalogs: async (user) => {
        const loadedFor = sessionKey(user);
        if (get().status === "loading") return;
        if (get().status === "ready" && get().loadedFor === loadedFor && get().valores.length) return get();

        set({ status: "loading", error: null, loadedFor });
        const results = await Promise.allSettled([
          CatalogService.getCarteras(),
          CatalogService.getCarterasProductos(),
          CatalogService.getCatalogos(),
          CatalogService.getValoresCatalogo(),
          CatalogService.getConsultaBootstrap(),
        ]);

        const [carterasResult, productosResult, catalogosResult, valoresResult, bootstrapResult] = results;
        const bootstrap = bootstrapResult.status === "fulfilled" ? bootstrapResult.value : {};
        const carteras = carterasResult.status === "fulfilled" ? normalizeCarteras(carterasResult.value) : normalizeCarteras(bootstrap.carteras);
        const productos = productosResult.status === "fulfilled" ? normalizeProductos(productosResult.value) : normalizeProductos(bootstrap.productos);
        const errors = results.filter((result) => result.status === "rejected").map((result) => result.reason?.message).filter(Boolean);
        const hasData = carteras.length || productos.length || catalogosResult.status === "fulfilled" || valoresResult.status === "fulfilled";

        set({
          status: hasData ? "ready" : "error",
          carteras,
          productos,
          catalogos: catalogosResult.status === "fulfilled" ? catalogosResult.value : [],
          valores: valoresResult.status === "fulfilled" ? valoresResult.value : [],
          consultas: bootstrap.catalogosConsultas ?? [],
          rechazos: bootstrap.rechazos ?? [],
          versiones: bootstrap.versiones ?? [],
          loadedFor,
          error: errors.length ? errors.join(" ") : null,
        });
        return get();
      },
      loadColumnasProducto: async (idProducto) => {
        const key = String(idProducto ?? "");
        if (!key || get().columnasPorProducto[key]) return get().columnasPorProducto[key] ?? [];
        const columns = await CatalogService.getColumnasProducto(Number(idProducto));
        set((state) => ({ columnasPorProducto: { ...state.columnasPorProducto, [key]: columns } }));
        return columns;
      },
      valoresFor: (idCatalogo, filter = {}) => {
        const include = new Set(filter.includeValues ?? []);
        const exclude = new Set(filter.excludeValues ?? []);
        return get().valores
          .filter((value) => Number(value.idCatálogo) === Number(idCatalogo))
          .filter((value) => filter.nivel == null || Number(value.nivel) === Number(filter.nivel))
          .filter((value) => !include.size || include.has(Number(value.idValor)))
          .filter((value) => !exclude.has(Number(value.idValor)))
          .sort((a, b) => Number(a.orden ?? a.idValor) - Number(b.orden ?? b.idValor));
      },
      clearCatalogs: () => set(initialState),
      invalidateCatalogs: () => set({ status: "idle", error: null, loadedFor: null }),
    }),
    {
      name: "coorin-catalogos-v2",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        ...state,
        status: state.status === "loading" ? "idle" : state.status,
      }),
    },
  ),
);

export const selectCarteraOptions = (state) => toOptions(state.carteras, "idCartera", "cartera");
export const selectProductoOptions = (state, idCartera) =>
  toOptions(state.productos.filter((product) => String(product.idCartera ?? "") === String(idCartera ?? "")), "idProducto", "producto");

export default useCatalogStore;
