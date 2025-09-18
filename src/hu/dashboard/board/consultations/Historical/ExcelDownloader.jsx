import React from "react";

/**
 * Componente para descargar archivos Excel desde un blob.
 * @param {Blob} blob - El blob del archivo Excel.
 * @param {string} fileName - El nombre del archivo a descargar.
 */
const ExcelDownloader = ({ blob, fileName = "historico_individual.xlsx" }) => {
  React.useEffect(() => {
    if (blob) {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    }
  }, [blob, fileName]);

  return null; // No renderiza nada, solo descarga
};

export default ExcelDownloader;
