import React from "react";
import ButtonSave from "../ButtonSave";

export const InputPhrases = () => {
  return (
    <div className="m-5">
      <div className="w-full">
        <label for="textarea-label" className="block text-sm font-medium mb-2 ">
          Escribe la frase
        </label>
        <textarea
          id="textarea-label"
          className="py-2 px-3 sm:py-3 sm:px-4 block w-full border-gray-300 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          rows="3"
          placeholder="Frase..."
        ></textarea>
      </div> 
      <div className="flex justify-end mt-4">
        <ButtonSave
          className=""
          loading={''}
          onClick={''}
          disabled={''}
        />
      </div>
    </div>
  );
};
