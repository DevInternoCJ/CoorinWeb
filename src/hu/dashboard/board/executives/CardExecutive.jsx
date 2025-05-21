import React from "react";
import dataDash from "../../dataDash";
import { ExecutiveChart } from "../../DashboardIcons";
const CardExecutive = () => {
  return (
    <>
      {dataDash.map((catalog) => (
        <div
          className="card card-sm sm:max-w-sm rounded-xl p-1"
          key={catalog.id}
          style={{ backgroundColor: `var(--${catalog.color})` }}
        >
          <div className="card-header">
            <h5
              className="card-title font-weight-600"
              style={{ color: `var(--${catalog.fontcolor})` }}
            >
              {catalog.title}
            </h5>
          </div>
          <div key={catalog.id} className="card-body">
            <div className="flex justify-center">
              <ExecutiveChart
                className="
                 size-8"
                style={{ color: `var(--${catalog.fontcolor})` }}
              />
            </div>
          </div>
          <div className="card-footer text-center">
            <p className="text-base-content">Abrir</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardExecutive;
