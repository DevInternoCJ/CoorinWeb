 // src/components/ui/Button.jsx
import React from 'react';

const ButtonLogin = ({
  children,
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  className = '',
  ...props
}) => {
  // Configuración de estilos basada en la variante
  const baseClasses = 'w-full border focus:ring-2 py-2 px-4 rounded-lg text-sm font-medium focus:outline-none cursor-pointer transition duration-200 ease-in-out';
  
  const variants = {
    primary: 'bg-jerarquia2 text-neutral-900 hover:text-neutral-200 border-jerarquia2 hover:border-jerarquia1 focus:ring-jerarquia1 hover:bg-jerarquia3 hover:shadow-lg hover:shadow-jerarquia2',
    secondary: 'bg-gray-500 text-white hover:text-gray-100 border-gray-500 hover:border-gray-400 focus:ring-gray-400 hover:bg-gray-600 hover:shadow-lg hover:shadow-gray-500',
    danger: 'bg-red-600 text-white hover:text-red-100 border-red-600 hover:border-red-500 focus:ring-red-500 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600',
    success: 'bg-green-600 text-white hover:text-green-100 border-green-600 hover:border-green-500 focus:ring-green-500 hover:bg-green-700 hover:shadow-lg hover:shadow-green-600'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${disabledClasses} ${className}`}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default ButtonLogin;