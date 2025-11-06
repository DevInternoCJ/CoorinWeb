import React, { Children } from "react";

const LoaderSuspense = ({ overlay = false, size = "md", color = "border-blue-500" }) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-26 w-26",
    Children:{},
  };

  const spinner = (
    <div className="flex items-center justify-center h-full">
      <div
        className={`animate-spin rounded-full border-t-2 ${color} ${sizeClasses[size]}`}
      ></div>
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-background-dashboard bg-opacity-30 flex items-center justify-center z-[9999]">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoaderSuspense;
