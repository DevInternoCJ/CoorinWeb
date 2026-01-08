// src/hu/dashboard/sideBar/processes/accionamientos/ModalAccionamientos.jsx

import React from 'react';
import ModalCicle from '../../consultations/information/ModalCicle'; // Ajusta la ruta según tu estructura
import { tabsListAccionamientos, COMPONENT_ICONS_ACCIONAMIENTOS } from './ModalAccionamientosTabs';

const ModalAccionamientos = ({ mostrarTabla, setMostrarTabla, onNavigationReady, onSizeChange, headerControlsActive = false, headerStates = {} }) => {
    // Pasar las tabs específicas de Accionamientos a ModalCicle
    return (
        <ModalCicle
            tabsList={tabsListAccionamientos}
            componentIcons={COMPONENT_ICONS_ACCIONAMIENTOS}
            mostrarTabla={mostrarTabla}
            setMostrarTabla={setMostrarTabla}
            onNavigationReady={onNavigationReady}
            onSizeChange={onSizeChange}
            headerControlsActive={headerControlsActive}
            headerStates={headerStates}
        />
    );
};

export default ModalAccionamientos;