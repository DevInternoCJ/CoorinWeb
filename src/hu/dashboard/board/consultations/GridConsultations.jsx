import React from "react";
import CardConsultations from "./CardConsultations";

const GridConsultations = ({ onModalOpen, onModalClose }) => {
    return (
        <>
            <div className="grid-cols-6 sm:grid md:grid-cols-3 xl:grid-cols-6 grid-rows-1 gap-4 sm:pt-8 md:mt-10 xl:mt-0 block ">
                <CardConsultations 
                    onModalOpen={onModalOpen}
                    onModalClose={onModalClose}
                />
            </div>
        </>
    );
};

export default GridConsultations;