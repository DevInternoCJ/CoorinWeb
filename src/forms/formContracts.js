export const FORM_CONTRACT_STATUS = {
  VERIFIED: "verified",
  PARTIAL: "partial",
  PENDING_AUDIT: "pending-audit",
};

export const formContracts = {
  frmLogin: {
    module: "Autenticación",
    status: FORM_CONTRACT_STATUS.VERIFIED,
    endpoints: [{ method: "POST", path: "/Auth/login" }],
  },
  frmCapturaVisitas: {
    module: "Visitas",
    status: FORM_CONTRACT_STATUS.VERIFIED,
    endpoints: [
      { method: "GET", path: "/procesos/visitas/captura/buscar-cuenta" },
      { method: "POST", path: "/procesos/visitas/captura/guardar" },
    ],
  },
  frmConsultaVisitas: {
    module: "Visitas",
    status: FORM_CONTRACT_STATUS.VERIFIED,
    endpoints: [{ method: "POST", path: "/procesos/visitas/consulta" }],
  },
  frmCargaVisitas: {
    module: "Visitas",
    status: FORM_CONTRACT_STATUS.VERIFIED,
    endpoints: [{ method: "POST", path: "/procesos/visitas/carga" }],
  },
  frmEditarVisitas: {
    module: "Visitas",
    status: FORM_CONTRACT_STATUS.VERIFIED,
    endpoints: [
      { method: "GET", path: "/procesos/visitas/corregir/buscar" },
      { method: "PUT", path: "/procesos/visitas/corregir/editar" },
    ],
  },
  frmEliminaVisitas: {
    module: "Visitas",
    status: FORM_CONTRACT_STATUS.VERIFIED,
    endpoints: [{ method: "POST", path: "/procesos/visitas/eliminar" }],
  },
  frmCargaGestionesTel: {
    module: "Gestiones",
    status: FORM_CONTRACT_STATUS.VERIFIED,
    endpoints: [{ method: "POST", path: "/Gestiones/carga-llamadas" }],
  },
  frmConsultaGestionesTel: {
    module: "Gestiones",
    status: FORM_CONTRACT_STATUS.VERIFIED,
    endpoints: [{ method: "GET", path: "/Gestiones/consulta-llamadas" }],
  },
  frmEditarGestiones: {
    module: "Gestiones",
    status: FORM_CONTRACT_STATUS.VERIFIED,
    endpoints: [
      { method: "GET", path: "/Gestiones/gestiones-cuenta" },
      { method: "PUT", path: "/Gestiones/editar-gestiones" },
    ],
  },
  frmConfiguraciónCorreo: { module: "Correos", status: FORM_CONTRACT_STATUS.PENDING_AUDIT },
  frmEnvíoEjecutivos: { module: "Correos", status: FORM_CONTRACT_STATUS.PENDING_AUDIT },
  frmCargaConversacion: { module: "AMEX", status: FORM_CONTRACT_STATUS.PENDING_AUDIT },
};

export const getFormContract = (formId) => formContracts[formId] ?? {
  status: FORM_CONTRACT_STATUS.PENDING_AUDIT,
};
