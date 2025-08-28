import React from "react";

const BatchdateSection = ({ tableData }) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-bold mb-3 text-blue-800 border-b pb-2">
        batchdate
      </h3>
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 border-b">
              {Object.keys(tableData[0]).map((key) => (
                <th
                  key={key}
                  className="py-2 px-3 text-left text-xs font-bold text-gray-700 uppercase bg-gray-300"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                {Object.values(row).map((value, i) => (
                  <td
                    key={i}
                    className={`py-2 px-3 text-sm border-b ${
                      i === 0 || i === 2
                        ? "font-mono"
                        : i === 3 || i === 7
                        ? "font-medium"
                        : ""
                    }`}
                  >
                    {i === 7 ? `$${value}` : value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BatchdateSection;