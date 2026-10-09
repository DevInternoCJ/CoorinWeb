import { postReportCampaign } from "../mark/orochi/LokiServices";
import { ACTIVE_SERVER } from "../../config/backend";

/**
 * Fachada estable para consultas. Conserva la implementación Loki existente
 * mientras permite migrar los formularios sin acoplarlos al archivo legacy.
 */
const ConsultationService = {
  realizarBusqueda(payload) {
    // El backend de pruebas debe recibir siempre el servidor activo, aunque
    // un formulario antiguo conserve un valor de servidor en su payload.
    return postReportCampaign({ ...payload, servidor: ACTIVE_SERVER });
  },
};

export default ConsultationService;
