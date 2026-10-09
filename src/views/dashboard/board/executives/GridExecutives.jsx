import React from "react";
import CardExecutive from "./CardExecutive";

const GridExecutives = ({ onModalOpen, onModalClose }) => (
    <div className="dashboard-card-grid">
        <CardExecutive onModalOpen={onModalOpen} onModalClose={onModalClose} />
    </div>
);

export default GridExecutives;