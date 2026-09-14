import React from "react";

const FieldError = ({ id, message, className = "" }) => {
  if (!message) return null;

  return (
    <p id={id} role="alert" className={`mt-1 text-xs font-medium text-destructive ${className}`}>
      {message}
    </p>
  );
};

export default FieldError;

