import React from "react";
import CardConsultations from "./CardConsultations";

const GridConsultations = () => {
    return (
        <>
            <div className="mt-2 grid grid-cols-6 gap-4 sm:mt-8 md:mt-8 lg:mt-0 xl:mt-0">
                <CardConsultations />
            </div>
        </>
    );
};

export default GridConsultations;