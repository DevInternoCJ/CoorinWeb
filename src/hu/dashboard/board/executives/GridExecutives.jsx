import React from "react";
import CardExecutive from "./CardExecutive";

const GridExecutives = ({ onModalOpen, onModalClose }) => {
  return (
    <>
      <div className="grid-cols-6 sm:grid md:grid-cols-3 xl:grid-cols-6 grid-rows-1 gap-4 sm:pt-8 md:mt-10 xl:mt-0 block ">
        <CardExecutive 
          onModalOpen={onModalOpen}
          onModalClose={onModalClose}
        />
      </div>
    </>
  );
};

export default GridExecutives;