// src/hu/dashboard/sideBar/processes/managements/ModalGestiones.jsx

import React from 'react';
import ModalCicle from '../../consultations/information/ModalCicle'; // Ajusta la ruta según tu estructura
import { tabsListGestiones, COMPONENT_ICONS_GESTIONES } from './ModalGestionesTabs';

const ModalGestiones = ({ mostrarTabla, setMostrarTabla, onNavigationReady, onSizeChange, headerControlsActive = false, headerStates = {} }) => {
    // Pasar las tabs específicas de Gestiones a ModalCicle
    return (
        <ModalCicle
            tabsList={tabsListGestiones}
            componentIcons={COMPONENT_ICONS_GESTIONES}
            mostrarTabla={mostrarTabla}
            setMostrarTabla={setMostrarTabla}
            onNavigationReady={onNavigationReady}
            onSizeChange={onSizeChange}
            headerControlsActive={headerControlsActive}
            headerStates={headerStates}
        />
    );
};

export default ModalGestiones;
