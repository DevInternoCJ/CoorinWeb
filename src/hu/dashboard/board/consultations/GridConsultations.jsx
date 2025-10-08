import React from "react";
import CardConsultations from "./CardConsultations";

const GridConsultations = () => {
    return (
        <>
            <div className="grid-cols-4 sm:grid md:grid-cols-3 xl:grid-cols-4 grid-rows-1 gap-4 sm:pt-8 md:mt-10 xl:mt-0 block">
                <CardConsultations />
            </div>
        </>
    );
};

export default GridConsultations;