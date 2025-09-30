import React, { useState, useEffect } from 'react';
import { PostLoadData } from '../../../../services/LokiServices';

const LoadDates = ({ selectedProduct, onSaldoChange, isModalOpen}) => {
  const [datosDeudor, setDatosDeudor] = useState({});
  const [datosProductoCompleto, setDatosProductoCompleto] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    // Función para resetear todos los estados
  const resetAllData = () => {
    setDatosDeudor({});
    setDatosProductoCompleto({});
    setLoading(true);
    setError(null);
    onSaldoChange(''); // Resetear el saldo también
  };
    // Efecto para detectar cuando el modal se cierra y resetear los datos
  useEffect(() => {
    if (!isModalOpen) {
      resetAllData();
    }
  }, [isModalOpen]);


  const fetchData = async (productId = 1) => {
    try {
      const requestData = { idCartera: 1, idProducto: productId };
      const response = await PostLoadData(requestData);

      if (response && response.exito) {
        // Datos del deudor
        if (response.cuenta) {
          const saldoFormateado = response.cuenta.Saldo ? `$${response.cuenta.Saldo.toLocaleString()}` : '$0.00';
          setDatosDeudor({
            nombreDeudor: response.cuenta.NombreDeudor || 'No disponible',
            rfc: response.cuenta.RFC || 'No disponible',
            numeroCliente: response.cuenta.NúmeroCliente || 'No disponible',
            saldo: saldoFormateado
          });
          onSaldoChange(saldoFormateado);
        }
        // Guardar todos los datos del producto para la vista completa
        setDatosProductoCompleto(response.producto);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Cuando cambia el producto seleccionado, cargar nuevos datos
    if (selectedProduct && selectedProduct.value) {
      setLoading(true);
      fetchData(selectedProduct.value);
    }
  }, [selectedProduct]);
  // Función para formatear valores vacíos o undefined
  const formatValue = (value, key) => {
    // Caso especial para el campo "Notas"
    if (key === "Notas") {
      return "Texto Grande";
    }
    // Caso especial para el campo "idCuenta" - tratarlo como string, no como número
    if (key === "idCuenta") {
      return value !== null && value !== undefined && value !== "" ? String(value) : "N/A";
    }
    if (value === null || value === undefined || value === "") {
      return "N/A";
    }
    // Si es un objeto vacío
    if (typeof value === "object" && Object.keys(value).length === 0) {
      return "N/A";
    }
    // Si es un número, formatear como moneda (excepto para campos específicos)
    if ((typeof value === "number" || (!isNaN(parseFloat(value)) && isFinite(value))) &&
      key !== "idCuenta") { // Excluir idCuenta del formateo numérico
      return `$${parseFloat(value).toLocaleString()}`;
    }
    return value;
  };

  // Función para determinar la clase de estilo basada en el valor
  const getValueClass = (value, key) => {
    // Caso especial para el campo "Notas"
    if (key === "Notas") {
      return "text-red-600 font-semibold";
    }

    if (value === null || value === undefined || value === "" ||
      (typeof value === "object" && Object.keys(value).length === 0)) {
      return "text-gray-400 italic";
    }

    // Para valores numéricos importantes (excepto idCuenta)
    if ((typeof value === "number" || !isNaN(parseFloat(value))) && key !== "idCuenta") {
      return "font-mono text-blue-700";
    }
    // Para fechas
    if (typeof value === "string" && value.match(/\d{2}\/\d{2}\/\d{4}/)) {
      return "text-green-700";
    }

    return "text-gray-800";
  };
  

  if (loading) return <div className="text-center py-8">Cargando datos...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Nombre", value: datosDeudor.nombreDeudor, icon: "user", color: "gray" },
            { label: "RFC", value: datosDeudor.rfc, icon: "document", color: "blue" },
            { label: "Número Cliente", value: datosDeudor.numeroCliente, icon: "id", color: "gray" },
            { label: "Saldo", value: datosDeudor.saldo, icon: "currency", color: "green" }
          ].map((item, index) => (
            <div key={index} className="bg-background-primary p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200">
              <div className={`text-xs font-medium text-${item.color}-600 uppercase tracking-wide mb-2`}>{item.label}</div>
              <div className={`text-sm font-semibold text-${item.color}-700`}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Vista de tabla horizontal - TODOS los campos en una sola fila con mejor estilo */}
      <div className="mt-8">
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="bg-white min-w-full">
            <tbody>
              {/* Fila de encabezados */}
              <tr className="bg-background-secondary">
                {Object.keys(datosProductoCompleto).map((key) => (
                  <th
                    key={key}
                    className="py-3 w-auto px-4 border-b border-r-background-secondary text-xs font-semibold text-neutral-100 uppercase tracking-wider whitespace-nowrap align-top"
                  >
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </th>
                ))}
              </tr>

              {/* Fila de valores - CORRECCIÓN: Pasar el key a las funciones */}
              <tr className="hover:bg-gray-50">
                {Object.entries(datosProductoCompleto).map(([key, value], index) => (
                  <td
                    key={index}
                    className={`py-3 px-4 border-b-jerarquia4 text-sm w-auto ${getValueClass(value, key)} break-words align-top`}
                  >
                    {formatValue(value, key)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-2 text-xs text-gray-500 text-center">
          Desliza horizontalmente para ver todos los campos →
        </div>
      </div>
    </div>
  );
};

export default LoadDates;