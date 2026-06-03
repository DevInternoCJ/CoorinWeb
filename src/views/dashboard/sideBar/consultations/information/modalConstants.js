// Tamaños predefinidos para los distintos tipos de modal
export const MODAL_SIZES = {
  informacion: {
    maxWidth: "min(1100px, 98vw)",
    minWidth: "320px",
    width: "min(1300px, 98vw)",
    height: "auto",
    maxHeight: "85vh",
  },
  "informacion-xl": {
    maxWidth: "min(1100px, 98vw)",
    minWidth: "320px",
    width: "min(1300px, 98vw)",
    height: "auto",
    minHeight: "300px",
    maxHeight: "90vh",
  },
  "pagos-xl": {
    maxWidth: "min(1800px, 95vw)",
    minWidth: "320px",
    width: "min(1700px, 95vw)",
    height: "85vh",
    maxHeight: "90vh",
  },
  pagos: {
    maxWidth: "min(420px, 95vw)",
    minWidth: "280px",
    width: "min(380px, 95vw)",
    height: "340px",
    maxHeight: "85vh",
  },
  consultaVisits: {
    maxWidth: "min(800px, 95vw)",
    minWidth: "320px",
    width: "auto",
    height: "auto",
    maxHeight: "90vh",
  },
  capturaVisit: {
    maxWidth: "min(805px, 95vw)",
    minWidth: "320px",
    width: "auto",
    height: "auto",
    maxHeight: "90vh",
  },
  "capturaVisit-expanded": {
    maxWidth: "min(805px, 95vw)",
    minWidth: "320px",
    width: "min(370px, 95vw)",
    height: "380px",
    maxHeight: "90vh",
  },
  cargaVisitas: {
    maxWidth: "min(1100px, 95vw)",
    minWidth: "320px",
    width: "auto",
    height: "auto",
    maxHeight: "95vh",
  },
  "accionamientos-xl": {
    maxWidth: "min(1135px, 98vw)",
    minWidth: "320px",
    width: "min(1335px, 98vw)",
    height: "auto",
    maxHeight: "auto",
  },
  "gestiones-xl": {
    maxWidth: "min(1135px, 98vw)",
    minWidth: "320px",
    width: "min(1335px, 98vw)",
    height: "auto",
    maxHeight: "auto",
  },
  custom: {},
};

// Títulos de cada tipo de modal
export const TITULOS_MODAL = {
  información: "Información",
  Accionamientos: "Accionamientos",
  Gestiones: "Gestiones",
  "Consulta Visitas": "Consulta Visitas - Coorin",
  "Captura Visitas": "Captura Visitas - Coorin",
  "Carga Visitas": "Carga de Visitas - Coorin",
  VGP: "VGP - Coorin",
};

// Animación CSS de bounce para el modal
export const BOUNCE_MODAL_STYLES = `
  @keyframes bounce-modal {
    0%   { transform: scale(1); }
    20%  { transform: scale(1.05, 0.95); }
    40%  { transform: scale(0.95, 1.05); }
    60%  { transform: scale(1.03, 0.97); }
    80%  { transform: scale(0.97, 1.03); }
    100% { transform: scale(1); }
  }
  .animate-bounce-modal {
    animation: bounce-modal 0.5s;
  }
`;
