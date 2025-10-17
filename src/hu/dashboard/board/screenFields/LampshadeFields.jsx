import React, { useState, useCallback, useMemo } from "react";
import ModalHeader from "../../sideBar/Administration/gespa/ModalHeader";
import InfoSection from "./InfoSection";
import TableEditFields from "./TableEditFields";
import GridLampsFields from "./GridLampsFields";
import { IconScreens } from "../../sideBar/Administration/gespa/IconsTemplates";

const LampshadeFields = ({ isOpen, onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [fieldNames, setFieldNames] = useState([]);
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);

   const handleRowSelect = useCallback((rowData) => {
    console.log("LampshadeFields - Fila seleccionada:", rowData);
    setSelectedRowData(rowData);
  }, []);

   const handleFieldNamesChange = useCallback((names) => {
    console.log("LampshadeFields - FieldNames recibidos:", names.length);
    setFieldNames(names);
  }, []);

    // ✅ USAR useMemo para memoizar componentes y evitar re-montaje
  const memoizedTableEditFields = useMemo(() => {
    if (!selectedProduct || selectedProduct.value === 0) return null;
    
    return (
      <TableEditFields
        key={`table-${selectedProduct.value}`} // ✅ Key única por producto
        idProducto={selectedProduct.value}
        selectedRowData={selectedRowData} 
        onFieldNamesChange={handleFieldNamesChange}
      />
    );
  }, [selectedProduct, selectedRowData, handleFieldNamesChange]);
  
  const memoizedGridLampsFields = useMemo(() => {
    if (!selectedProduct || selectedProduct.value === 0) return null;
    
    return (
      <GridLampsFields
        key={`grid-${selectedProduct.value}`} // ✅ Key única por producto
        idProducto={selectedProduct.value}
        onRowClick={handleRowSelect}
      />
    );
  }, [selectedProduct, handleRowSelect]);

  const memoizedInfoSection = useMemo(() => {
    if (!selectedProduct) return null;
    
    return (
      <InfoSection
        key={`info-${selectedProduct.value}`} // ✅ Key única por producto
        idProducto={selectedProduct.value}
        fieldNames={fieldNames}
      />
    );
  }, [selectedProduct, fieldNames])

   if (!isOpen) return null;

  return (
    <div className=" modal-blur-bg fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-6xl max-h-[90vh] overflow-hidden border border-gray-300">
        <ModalHeader
          icon={<IconScreens className="size-6" />}
          title="Campos Pantalla"
          onClose={onClose}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct} // <-- ¡Verifica que esta línea sea idéntica!
          verifyResult={verifyResult}
          setVerifyResult={setVerifyResult}
          loading={loading}
          setLoading={setLoading}
        />
        <div className="p-4 overflow-auto max-h-[calc(90vh-120px)] bg-gray-50 space-y-4">
          {memoizedInfoSection}
          {selectedProduct && selectedProduct.value !== 0 && (
            <>
              {memoizedTableEditFields}
              {memoizedGridLampsFields}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LampshadeFields;
