import React from 'react';

const SaveButton = ({
  children = 'Guardar',
  onClick,
  disabled = false,
  loading = false,
  size = 'medium',
  variant = 'primary',
  type = 'button',
  icon = true,
  className = ''
}) => {
  // Clases base para todos los botones
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Tamaños
  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg"
  };
  
  // Variantes de color
  const variants = {
    primary: "bg-jerarquia2 text-neutral-900 hover:text-neutral-200 border-jerarquia2 hover:border-jerarquia1 focus:ring-jerarquia1 hover:shadow-lg",
    secondary: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white",
    outline: "border-2 border-green-600 text-green-600 hover:text-white focus:ring-green-500"
  };
  
  // Estado disabled
  const disabledClasses = "bg-gray-300 text-gray-500 cursor-not-allowed";
  
  // Estado loading
  const loadingClasses = "opacity-80 cursor-wait";

  const classes = `
    ${baseClasses}
    ${sizes[size]}
    ${disabled ? disabledClasses : variants[variant]}
    ${loading ? loadingClasses : ''}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >      
      {/* Spinner cuando está cargando */}
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}  
      {loading ? 'Guardando...' : children}
    </button>
  );
};

export default SaveButton;