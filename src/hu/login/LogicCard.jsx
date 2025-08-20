import React, { useEffect } from "react";

const LogicCard = ({
  id = "interactive-card",
  children,
  className = "",
  intensity = 5,
  scale = 1.05,
  transition = "duration-200 ease-out"
}) => {
  useEffect(() => {
    const card = document.getElementById(id);
    if (!card) {
      console.warn(`Element with ID '${id}' not found for mouse effect.`);
      return;
    }

    const img = card.querySelector("img");
    if (!img) {
      console.warn("Image not found inside card for mouse effect.");
      return;
    }

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -(y - centerY) / intensity;
      const rotateY = (x - centerX) / intensity;

      img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    };

    const handleMouseLeave = () => {
      img.style.transform = "rotateX(0) rotateY(0) scale(1)";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [id, intensity, scale]);

  return (
    <div id={id} className={`perspective ${className}`}>
      {children}
    </div>
  );
};

export default LogicCard;