import React, { useEffect, useRef, useState } from "react";
import CardExecutive from "./CardExecutive";

const GridExecutives = ({ onModalOpen, onModalClose }) => {
  const containerRef = useRef(null);
  const [hideTitle, setHideTitle] = useState(false);

  useEffect(() => {
    const update = () => {
      const el = containerRef.current;
      if (!el || typeof window === "undefined") return;
      const width = el.clientWidth;
      const vw = window.innerWidth || document.documentElement.clientWidth;
      setHideTitle(vw > 0 ? width / vw <= 0.45 : false);
    };

    update();

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(update);
      if (containerRef.current) ro.observe(containerRef.current);
    }

    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      if (ro && ro.disconnect) ro.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="grid-cols-6 sm:grid md:grid-cols-3 xl:grid-cols-6 grid-rows-1 gap-4 sm:pt-8 md:mt-10 xl:mt-0 block ">
        <CardExecutive 
          onModalOpen={onModalOpen}
          onModalClose={onModalClose}
          hideTitle={hideTitle}
        />
      </div>
    </>
  );
};

export default GridExecutives;