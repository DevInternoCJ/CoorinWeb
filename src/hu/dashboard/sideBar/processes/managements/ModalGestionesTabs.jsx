// src/hu/dashboard/sideBar/processes/managements/ModalGestionesTabs.jsx

// Importar componentes de gestiones
import React from 'react';
import TabEditComment from './TabEditComment.jsx';
import TabComplementaryNegosation from './TabComplementaryNegosation.jsx';
import TabComplementLoad from './TabComplementLoad.jsx';
import TabEditManagement from './TabEditManagement.jsx';
import TabQueryComplement from './TabQueryComplement.jsx';

// Identificadores para los componentes
const COMPONENT_KEYS = {
    COMPLEMENT_LOAD: "Carga Complemento",
    QUERY_COMPLEMENT: "Consulta Complemento",
    EDIT_MANAGEMENT: "Editar Gestión",
    EDIT_COMMENT: "Editar Comentarios",
    COMPLEMENTARY_NEGOSATION: "Negociaciones Complemento",
};

// Iconos para cada componente
const COMPONENT_ICONS = {
    [COMPONENT_KEYS.EDIT_COMMENT]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6">
            <path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z" />
        </svg>
    ),
    [COMPONENT_KEYS.COMPLEMENTARY_NEGOSATION]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6">
            <path fill="currentColor" d="M12.22 19.85c-.18.18-.5.21-.71 0a.504.504 0 0 1 0-.71l3.39-3.39l-1.41-1.41l-3.39 3.39c-.19.2-.51.19-.71 0a.504.504 0 0 1 0-.71l3.39-3.39l-1.41-1.41l-3.39 3.39c-.18.18-.5.21-.71 0a.513.513 0 0 1 0-.71l3.39-3.39l-1.42-1.41l-3.39 3.39c-.18.18-.5.21-.71 0a.513.513 0 0 1 0-.71L9.52 8.4l1.87 1.86c.95.95 2.59.94 3.54 0c.98-.98.98-2.56 0-3.54l-1.86-1.86l.28-.28c.78-.78 2.05-.78 2.83 0l4.24 4.24c.78.78.78 2.05 0 2.83zm9.61-6.78a4.01 4.01 0 0 0 0-5.66l-4.24-4.24a4.01 4.01 0 0 0-5.66 0l-.28.28l-.28-.28a4.01 4.01 0 0 0-5.66 0L2.17 6.71a3.99 3.99 0 0 0-.4 5.19l1.45-1.45a2 2 0 0 1 .37-2.33l3.54-3.54c.78-.78 2.05-.78 2.83 0l3.56 3.56c.18.18.21.5 0 .71s-.53.18-.71 0L9.52 5.57l-5.8 5.79c-.98.97-.98 2.56 0 3.54c.39.39.89.63 1.42.7a2.46 2.46 0 0 0 2.12 2.12a2.46 2.46 0 0 0 2.12 2.12c.07.54.31 1.03.7 1.42c.47.47 1.1.73 1.77.73s1.3-.26 1.77-.73z"/>
        </svg>
    ),
    [COMPONENT_KEYS.COMPLEMENT_LOAD]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6">
            <path fill="currentColor" d="M9 16h6v-6h4l-7-7l-7 7h4zm-4 2h14v2H5z" />
        </svg>
    ),
    [COMPONENT_KEYS.EDIT_MANAGEMENT]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6">
            <path fill="currentColor" d="M14.06 9.02l.92.92L5.92 19H5v-.92zM17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z" />
        </svg>
    ),
    [COMPONENT_KEYS.QUERY_COMPLEMENT]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6">
            <path fill="currentColor" d="M7 9H2V7h5zm0 3H2v2h5zm13.59 7l-3.83-3.83c-.8.52-1.74.83-2.76.83c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L22 17.59zM17 11c0-1.65-1.35-3-3-3s-3 1.35-3 3s1.35 3 3 3s3-1.35 3-3M2 19h10v-2H2z" />
        </svg>
    ),
};

// Lista de tabs para Gestiones
export const tabsListGestiones = [
    { key: COMPONENT_KEYS.COMPLEMENT_LOAD, component: TabComplementLoad },
    { key: COMPONENT_KEYS.QUERY_COMPLEMENT, component: TabQueryComplement },
    { key: COMPONENT_KEYS.EDIT_MANAGEMENT, component: TabEditManagement },
    { key: COMPONENT_KEYS.EDIT_COMMENT, component: TabEditComment },
    { key: COMPONENT_KEYS.COMPLEMENTARY_NEGOSATION, component: TabComplementaryNegosation },
];

// Exportar iconos para uso externo
export { COMPONENT_ICONS as COMPONENT_ICONS_GESTIONES };
