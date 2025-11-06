 // src/components/ui/Button.jsx
import React from 'react';
import LoaderSuspense from '../../components/loading/LoaderSuspense';

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

  const disabledClasses = disabled ? 'bg-jerarquia3 cursor-none' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${disabledClasses} ${className}`}
      {...props}
    >
     {loading ? (
  <div className="flex items-center justify-center gap-3">
    <LoaderSuspense size='sm' color='border-gray-200'/>   
    <div className='text-gray-200'>{children}</div>
  </div>
) : (
        children
      )}
    </button>
  );
};

export default ButtonLogin;