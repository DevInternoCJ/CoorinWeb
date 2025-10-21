import React, { useEffect, useRef, useState } from "react";
import CardConsultations from "./CardConsultations";

const GridConsultations = ({ onModalOpen, onModalClose }) => {
    const containerRef = useRef(null);
    const initialWidthRef = useRef(null);
    const [gridMode, setGridMode] = useState('normal');

    useEffect(() => {
        const update = () => {
            const el = containerRef.current;
            if (!el) return;
            const width = el.clientWidth;

            if (!initialWidthRef.current) initialWidthRef.current = width;
            const initial = initialWidthRef.current || width;
            const ratio = initial > 0 ? width / initial : 1;
            const newCompact = ratio <= 0.45;
            const newMode = ratio <= 0.25 ? 'mobile' : newCompact ? 'compact' : 'normal';
            console.debug('GridConsultations update', { width, initial, ratio, newMode });
            setGridMode(newMode);
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

    let containerClass;
    if (gridMode === 'normal') {
        containerClass = 'grid grid-cols-6 sm:grid md:grid-cols-3 xl:grid-cols-6 grid-rows-1 gap-4 sm:pt-8 md:mt-10 xl:mt-0';
    } else if (gridMode === 'compact') {
        containerClass = 'grid grid-cols-3 grid-rows-2 gap-4 sm:pt-8 md:mt-10 xl:mt-0';
    } else {
        containerClass = 'grid grid-cols-2 grid-rows-3 gap-4 sm:pt-8 md:mt-10 xl:mt-0';
    }

    return (
        <>
            <div ref={containerRef} className={containerClass}>
                <CardConsultations 
                    onModalOpen={onModalOpen}
                    onModalClose={onModalClose}
                />
            </div>
        </>
    );
};

export default GridConsultations;