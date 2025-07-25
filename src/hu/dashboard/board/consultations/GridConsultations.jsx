import React from "react";
import CardConsultations from "./CardConsultations";

const GridConsultations = () => {
    return (
        <>
            <div className="grid-cols-4 sm:grid md:grid-cols-3 xl:flex xl:w-full xl:gap-4 grid-rows-1 gap-4 sm:pt-8 md:mt-10 xl:mt-0 block [&>*]:xl:flex-1 [&>*]:xl:min-w-[220px]">
                <CardConsultations />
            </div>
        </>
    );
};

export default GridConsultations;