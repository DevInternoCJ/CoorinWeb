import React from "react";

const ModalConsultaCuentasFooter = ({
  onConsultar,
  isLoading = false,
  resultData = { data: [], totalRows: 0, excelUrl: "" },
}) => {
  const handleConsultar = () => {
    if (onConsultar && !isLoading) {
      onConsultar();
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4 mt-4">
        {/* Botón de Consultar */}
        <div className="w-full flex justify-center">
          <button
            className="btn-success px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleConsultar}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Consultando...
              </span>
            ) : (
              "Consultar"
            )}
          </button>
        </div>

        {/* Tabla de resultados */}
        <div className="w-full flex justify-center rounded-lg bg-surface p-1 border border-border">
          <div
            className="scrollbar-gray w-full overflow-auto max-h-[250px]"
            style={{ minHeight: 0 }}
          >
            <table className="modal-table rounded-lg">
              {resultData.data.length > 0 ? (
                <>
                  <thead className="sticky top-0 z-10">
                    <tr>
                      {Object.keys(resultData.data[0]).map((header) => (
                        <th key={header} className="py-2 px-3 text-[10px] uppercase tracking-wider">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {resultData.data.map((row, index) => (
                      <tr key={index} className="hover:bg-surface-secondary/50 transition-colors">
                        {Object.values(row).map((value, cellIndex) => (
                          <td key={cellIndex} className="py-1 px-3 text-sm text-foreground">
                            {value && typeof value === "object"
                              ? JSON.stringify(value)
                              : value || ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </>
              ) : (
                <tbody>
                  <tr>
                    <td
                      className="py-12 text-center text-muted-foreground italic text-xs"
                    >
                      No hay consultas realizadas
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalConsultaCuentasFooter;
