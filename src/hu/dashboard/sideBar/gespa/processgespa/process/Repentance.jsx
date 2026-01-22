import React, { useState, useEffect} from "react";
import SaveButton from "../../../Administration/gespa/ButtonSave";
import SelectWallet from "../../../../board/screenFields/SelectWallet"; // ajusta el path
import { getCarteras } from "../../../../../../services/mark/orochi/LokiServices";
import { toast } from "sonner";

const Repentance = ({ searchValue, onSearchClick, onSearchChange, cartera,
  onCarteraChange,}) => {
  const [carteraOptions, setCarteraOptions] = useState([
    { value: "", label: "Seleccione una cartera" },
  ]);
  const [cuenta, setCuenta] = useState("");

    useEffect(() => {
      const fetchCarteras = async () => {
        try {
          const carteras = await getCarteras();
  
          const options = [
            { value: "", label: "Seleccione una cartera" },
            ...carteras.map((cartera) => ({
              label: cartera.cartera,
              value: cartera.idCartera,
            }))
          ];
  
          setCarteraOptions(options);
        } catch (error) {
          console.error("Error fetching carteras:", error);
          toast.error("Error al cargar las carteras");
          setCarteraOptions([{ value: "", label: "Error al cargar" }]);
        }
      };
  
      fetchCarteras();
    }, []);

  const cuentaOptions = [
    { value: "", label: "Selecciona un tipo" },
    { value: "individual", label: "Individual" },
    { value: "archivo", label: "Archivo" },
    { value: "lote", label: "Lote" },
  ];

  const handleBuscar = () => {
    console.log("Buscar:", {
      cartera,
      cuenta,
      busqueda: searchValue,
    });
    onSearchClick();
  };

  return (
    <div className=" w-full">
      {/* Formulario */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {/* Select Cartera */}
          <SelectWallet
          label="Cartera"
          value={cartera}
          onChange={onCarteraChange}
          options={carteraOptions}
          />

          {/* Select Cuenta */}
          <SelectWallet
            label="Cuenta"
            options={cuentaOptions}
            value={cuenta}
            onChange={setCuenta}
          />

          {/* Input + Botón */}
          <div className="flex items-center">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-gray-200 h-8 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
            />
            <SaveButton onClick={onSearchClick} className="btn-success">
              Buscar
            </SaveButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repentance;
