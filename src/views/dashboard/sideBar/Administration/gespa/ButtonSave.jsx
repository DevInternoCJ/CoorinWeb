import React from 'react';

const SaveButton = ({
  children = 'Guardar',
  onClick,
  disabled = false,
  loading = false,
  size = 'medium',
  variant = 'primary',
  type = 'button',
  className = ''
}) => {
  // Clases base para todos los botones
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-lg transition-[color,background-color,border-color,box-shadow] duration-150 ease-out motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Tamaños
  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg"
  };
  
  // Variantes de color
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-jerarquia3 border-transparent focus:ring-jerarquia2 hover:shadow-lg",
    secondary: "bg-surface-secondary text-foreground border border-border hover:bg-surface focus:ring-jerarquia2",
    outline: "border-2 border-jerarquia2 text-foreground hover:bg-primary/10 focus:ring-jerarquia2"
  };
  
  // Estado disabled
  const disabledClasses = "bg-surface-secondary text-muted-foreground opacity-50 pointer-events-none";
  
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
