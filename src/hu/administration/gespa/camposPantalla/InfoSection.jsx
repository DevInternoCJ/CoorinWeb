import React from "react";

const InfoSection = ({ infoData }) => {
  return (
    <div className="bg-background-secondary p-4 rounded-lg shadow-sm">
      <h3 className="text-lg text-white font-bold mb-3">Info</h3>
      <div className="overflow-x-auto">
        <table className="table-border border border-background-primary rounded-lg text-white w-full">
          <tbody>
            {infoData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-jerarquia1 last:border-b-0">
                {row.map((item, cellIndex) => (
                  <React.Fragment key={cellIndex}>
                    <td className="py-2 px-2 font-semibold ">
                      {item.label}
                    </td>
                    <td className={`py-2 px-2 text-green-500 ${item.highlight ? "font-medium" : ""}`}>
                      {item.value}
                    </td>
                  </React.Fragment>
                ))}
                {/* Añadir celdas vacías para completar la tabla */}
                {rowIndex === 1 && (
                  <>
                    <td className="py-2 px-3"></td>
                    <td className="py-2 px-3"></td>
                  </>
                )}
                {rowIndex === 3 && (
                  <>
                    <td className="py-2 px-3"></td>
                    <td className="py-2 px-3"></td>
                    <td className="py-2 px-3"></td>
                    <td className="py-2 px-3"></td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InfoSection;