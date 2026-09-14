import api from "../../loki/apiConfig";
import { clearAuth, getToken } from "../mark/orochi/LokiServices";

const request = async (config) => {
  if (!getToken()) throw new Error("No hay token de autenticación disponible.");
  try {
    const response = await api.request(config);
    return response;
  } catch (error) {
    if ([401, 403].includes(error.response?.status)) clearAuth();
    throw error;
  }
};

export const VisitService = {
  async buscarCuenta(params) {
    const response = await request({
      method: "GET",
      url: "/procesos/visitas/captura/buscar-cuenta",
      params,
    });
    return response.data;
  },

  async guardar(payload) {
    const response = await request({
      method: "POST",
      url: "/procesos/visitas/captura/guardar",
      data: payload,
    });
    return response.data;
  },

  async cargar({ idCartera, archivo, complemento = false, idEjecutivo }) {
    const formData = new FormData();
    formData.append("idCartera", String(idCartera));
    formData.append("complemento", String(complemento));
    if (idEjecutivo != null) formData.append("idEjecutivo", String(idEjecutivo));
    formData.append("archivo", archivo);
    const response = await request({
      method: "POST",
      url: "/procesos/visitas/carga",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  },

  async consultar(payload) {
    const response = await request({
      method: "POST",
      url: "/procesos/visitas/consulta",
      data: payload,
      responseType: "blob",
    });
    return response;
  },

  async buscarCorreccion(params) {
    const response = await request({
      method: "GET",
      url: "/procesos/visitas/corregir/buscar",
      params,
    });
    return response.data;
  },

  async editarCorreccion(payload) {
    const response = await request({
      method: "PUT",
      url: "/procesos/visitas/corregir/editar",
      data: payload,
    });
    return response.data;
  },

  async eliminar({ idCartera, archivo }) {
    const formData = new FormData();
    formData.append("idCartera", String(idCartera));
    formData.append("archivo", archivo);
    const response = await request({
      method: "POST",
      url: "/procesos/visitas/eliminar",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};

export default VisitService;
