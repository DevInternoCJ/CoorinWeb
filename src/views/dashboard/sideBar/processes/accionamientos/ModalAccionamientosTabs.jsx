// src/hu/dashboard/sideBar/processes/accionamientos/ModalAccionamientosTabs.jsx

// Importar componentes de información (adaptados de ModalCicle.jsx)
import React from 'react';
import InformeContent from './TabInformeAccionamientos.jsx';
import CargaContent from './TabCargaAccionamientos.jsx';
import CapturaContent from './TabCapturaAccionamientos.jsx';
import ConsultaContent from './TabConsultaAccionamientos.jsx';

// Identificadores para los componentes (basados en ModalCicle.jsx)
const COMPONENT_KEYS = {
    INFORME: "Informe",
    CARGA: "Carga",
    CAPTURA: "Captura Carteo",
    CONSULTA: "Consulta Carteo",
};

// Iconos para cada componente (usa iconos de Heroicons o similares)
const COMPONENT_ICONS = {
    [COMPONENT_KEYS.INFORME]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6">
            <path fill="currentColor" d="M16 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8zM7 7h5v2H7zm10 10H7v-2h10zm0-4H7v-2h10zm-2-4V5l4 4z" />
        </svg>
    ),
    [COMPONENT_KEYS.CARGA]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6">
            <path fill="currentColor" d="M22 5v2h-3v3h-2V7h-3V5h3V2h2v3zm-3 14H5V5h6V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6h-2zm-4-6v4h2v-4zm-4 4h2V9h-2zm-2 0v-6H7v6z" />
        </svg>
    ),
    [COMPONENT_KEYS.CAPTURA]: <span aria-hidden="true" className="text-lg">＋</span>,
    [COMPONENT_KEYS.CONSULTA]: <span aria-hidden="true" className="text-lg">⌕</span>,
};

// Lista de tabs para Accionamientos
export const tabsListAccionamientos = [
    { key: COMPONENT_KEYS.INFORME, component: InformeContent },
    { key: COMPONENT_KEYS.CARGA, component: CargaContent },
    { key: COMPONENT_KEYS.CAPTURA, component: CapturaContent },
    { key: COMPONENT_KEYS.CONSULTA, component: ConsultaContent },
];

// Exportar iconos para uso externo
export { COMPONENT_ICONS as COMPONENT_ICONS_ACCIONAMIENTOS };
