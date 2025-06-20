// src/components/LoginCard.jsx
import React, { useEffect } from 'react';
import LoginForm from './LoginForm'; // Importamos LoginForm
import LogoCoorin7 from '../../assets/logo_coorin_7.svg';

const LoginCard = () => {
  useEffect(() => {
    // Asegúrate de que 'card' tenga el ID correcto para que el efecto funcione
    const card = document.getElementById("logo-card"); // <--- CAMBIO AQUÍ: Usar un ID único para la tarjeta del logo
    if (!card) {
      console.warn("Element with ID 'logo-card' not found for mouse effect.");
      return;
    }

    const img = card.querySelector("img");
    if (!img) {
      console.warn("Image not found inside 'logo-card' for mouse effect.");
      return;
    }

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -(y - centerY) / 5;
      const rotateY = (x - centerX) / 5;

      img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
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
  }, []);

  return (
    <>
      <div className="bg-bgcolor1 shadow-2xl shadow-gray-500 rounded-4xl">
        <div className="w-xs sm:w-md md:xl lg:w-3xl rounded-4xl h-4xl block lg:flex justify-center p-4 font-sans bg-cover bg-no-repeat bg-center bg-[url(/src/assets/backgroundLogin.svg)] ">
          <div className="lg:w-1/2">
            <div className="w-full text-center md:pt-8 px-6">
              {/* <div id="card" className="perspective mt-5"> */}
              <div id="logo-card" className="perspective mt-5"> {/* <--- CAMBIO AQUÍ: ID único */}
                <img
                  src={LogoCoorin7}
                  alt="logo-coorin"
                  className="mx-auto my-auto md:mt-5 h-auto max-w-[20vh] lg:max-w-[40vh] rotate-x-30 -rotate-y-30 transition-transform duration-200 ease-out"
                />
              </div>
            </div>
            <div></div>
          </div>
          {/* Aquí es donde LoginForm manejará la lógica de autenticación */}
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginCard;