// src/hu/dashboard/sideBar/processes/accionamientos/ModalAccionamientosTabs.jsx

// Importar componentes de información (adaptados de ModalCicle.jsx)
import React, { useState, useEffect } from 'react';
import InformeContent from './TabInformeAccionamientos.jsx';
import CargaContent from './TabCargaAccionamientos.jsx';
import CapturaContent from './TabCapturaAccionamientos.jsx';
import ConsultaContent from './TabConsultaAccionamientos.jsx';

// Identificadores para los componentes (basados en ModalCicle.jsx)
const COMPONENT_KEYS = {
    INFORME: "Informe",
    CARGA: "Carga",
    CAPTURA: "Captura",
    CONSULTA: "Consulta",
};

// Iconos para cada componente (usa iconos de Heroicons o similares)
const COMPONENT_ICONS = {
    [COMPONENT_KEYS.INFORME]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-4 h-4">
            <path fill="currentColor" d="M16 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8zM7 7h5v2H7zm10 10H7v-2h10zm0-4H7v-2h10zm-2-4V5l4 4z" />
        </svg>
    ),
    [COMPONENT_KEYS.CARGA]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-4 h-4">
            <path fill="currentColor" d="M22 5v2h-3v3h-2V7h-3V5h3V2h2v3zm-3 14H5V5h6V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6h-2zm-4-6v4h2v-4zm-4 4h2V9h-2zm-2 0v-6H7v6z" />
        </svg>
    ),
    [COMPONENT_KEYS.CAPTURA]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-4 h-4">
            <path fill="currentColor" d="M7 14H5v5h5v-2H7zm-2-4h2V7h3V5H5zm12 7h-3v2h5v-5h-2zM14 5v2h3v3h2V5z" />
        </svg>
    ),
    [COMPONENT_KEYS.CONSULTA]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-4 h-4">
            <path fill="currentColor" d="M7 9H2V7h5zm0 3H2v2h5zm13.59 7l-3.83-3.83c-.8.52-1.74.83-2.76.83c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L22 17.59zM17 11c0-1.65-1.35-3-3-3s-3 1.35-3 3s1.35 3 3 3s3-1.35 3-3M2 19h10v-2H2z" />
        </svg>
    ),
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
