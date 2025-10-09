import React, { useEffect, useState } from "react";
import { ShowFieldScreen } from "../../../../services/mark/albaz/LokiServices"; // Ajusta la ruta según tu estructura

const InfoSection = ({ idProducto }) => {
  const [infoData, setInfoData] = useState([]);

  useEffect(() => {
    if (!idProducto) return;
    const fetchInfo = async () => {
      try {
        const response = await ShowFieldScreen(idProducto);
        // Transforma la respuesta para mostrar solo los valores y estilos
        const formatted = Object.entries(response).map(([label, obj]) => ({
          label,
          valor: obj.valor,
          fontWeight: obj.fontWeight,
          color: obj.color,
        }));
        setInfoData(formatted);
      } catch (error) {
        setInfoData([]);
      }
    };
    fetchInfo();
  }, [idProducto]);

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg text-jerarquia1 font-bold mb-3">Info</h3>
      <div className="overflow-x-auto">
        <table className="table-border border border-jerarquia1 rounded-lg text-background-dashboard w-full">
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIdx) => {
              const start = rowIdx * 4;
              const rowItems = infoData.slice(start, start + 4);
              return (
                <tr
                  key={rowIdx}
                  className="border-b border-jerarquia4 last:border-b-0"
                >
                  {rowItems.map((item, colIdx) => (
                    <React.Fragment key={colIdx}>
                      <td className="py-2 px-2 font-semibold">
                        {item?.label || ""}
                      </td>
                      <td
                        className="py-2 px-2"
                        style={{
                          fontWeight:
                            item?.fontWeight === "font-weight-bold"
                              ? "bold"
                              : "normal",
                          color: item ? `#${item.color}` : "transparent",
                        }}
                      >
                        {item?.valor || ""}
                      </td>
                    </React.Fragment>
                  ))}
                  {/* Si faltan columnas, rellena con celdas vacías */}
                  {Array.from({ length: 4 - rowItems.length }).map(
                    (_, emptyIdx) => (
                      <React.Fragment key={`empty-${emptyIdx}`}>
                        <td className="py-2 px-2 font-semibold"></td>
                        <td className="py-2 px-2"></td>
                      </React.Fragment>
                    )
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InfoSection;
