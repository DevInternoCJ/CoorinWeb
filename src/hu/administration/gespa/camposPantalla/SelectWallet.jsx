import React from "react";

const SelectWallet = ({ options, defaultValue, className = "", onChange }) => (
  <div className="relative">
    <select
      defaultValue={defaultValue}
      className={`w-full ps-2 pe-7 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-jerarquia2 focus:border-jerarquia2 appearance-none ${className}`}
      onChange={(e) => onChange && onChange(e.target.value)}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </div>
  </div>
);

export default SelectWallet;