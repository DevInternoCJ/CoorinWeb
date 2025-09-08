import React from 'react';

const TablasInformacionCliente = () => {
  // Datos de ejemplo basados en la imagen
  const datosDeudor = {
    nombreDeudor: 'CUSTAVO CARRIZALES RODRIGUEZ',
    rfc: 'CARG6610253Y6',
    numeroCliente: '13673',
    saldo: '6000'
  };

  const datosPrestamo = {
    batchDate: '13/07/2020',
    idCuenta: '376667870121003',
    customerId: '923706974099MXN',
    name: '19680330',
    birthDate: 'SB',
    loanProductCode: 'TMAC',
    recovered: 'TMAC'
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Información del Cliente</h1>
      
      {/* Primera tabla: Información del Deudor */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Datos del Deudor</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">NombreDeudor</th>
                <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">RFC</th>
                <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">NúmeroCliente</th>
                <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">Saldo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-300">{datosDeudor.nombreDeudor}</td>
                <td className="px-4 py-2 border border-gray-300">{datosDeudor.rfc}</td>
                <td className="px-4 py-2 border border-gray-300">{datosDeudor.numeroCliente}</td>
                <td className="px-4 py-2 border border-gray-300">{datosDeudor.saldo}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Segunda tabla: Datos del Préstamo */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Datos del Préstamo</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">batchdate</th>
                <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">idCuenta</th>
                <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">customerid</th>
                <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">name</th>
                <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">birthdate</th>
                <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">loan_productcode</th>
                <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">recoverd</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-300">{datosPrestamo.batchDate}</td>
                <td className="px-4 py-2 border border-gray-300">{datosPrestamo.idCuenta}</td>
                <td className="px-4 py-2 border border-gray-300">{datosPrestamo.customerId}</td>
                <td className="px-4 py-2 border border-gray-300">{datosPrestamo.name}</td>
                <td className="px-4 py-2 border border-gray-300">{datosPrestamo.birthDate}</td>
                <td className="px-4 py-2 border border-gray-300">{datosPrestamo.loanProductCode}</td>
                <td className="px-4 py-2 border border-gray-300">{datosPrestamo.recovered}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablasInformacionCliente;