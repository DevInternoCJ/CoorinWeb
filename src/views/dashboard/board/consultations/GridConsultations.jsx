import React from "react";
import CardConsultations from "./CardConsultations";

const GridConsultations = ({ onModalOpen, onModalClose }) => (
    <div className="dashboard-card-grid">
        <CardConsultations onModalOpen={onModalOpen} onModalClose={onModalClose} />
    </div>
);

export default GridConsultations;