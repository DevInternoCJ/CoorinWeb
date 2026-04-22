import React, { useState, useCallback, useMemo } from "react";
import ModalHeader from "../../sideBar/Administration/gespa/ModalHeader";
import InfoSection from "./InfoSection";
import TableEditFields from "./TableEditFields";
import GridLampsFields from "./GridLampsFields";
import IconCircular from "../../../../components/Iconos/IconCircular";
import { IconPantalla } from "../../board/executives/IconesEjecutives";
import { IconWarning } from "../../board/executives/scripts/IconScripts";

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

  // USAR useMemo para memoizar componentes y evitar re-montaje
  const memoizedTableEditFields = useMemo(() => {
    if (!selectedProduct || selectedProduct.value === 0) return null;

    return (
      <TableEditFields
        key={`table-${selectedProduct.value}`} // Key única por producto
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
        key={`grid-${selectedProduct.value}`} // Key única por producto
        idProducto={selectedProduct.value}
        onRowClick={handleRowSelect}
      />
    );
  }, [selectedProduct, handleRowSelect]);

  const memoizedInfoSection = useMemo(() => {
    if (!selectedProduct) return null;

    return (
      <InfoSection
        key={`info-${selectedProduct.value}`} // Key única por producto
        idProducto={selectedProduct.value}
        fieldNames={fieldNames}
      />
    );
  }, [selectedProduct, fieldNames]);

  if (!isOpen) return null;

  return (
    <div className=" modal-blur-bg overflow-hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-surface-modal)] rounded-lg shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col max-h-[90vh]">
        <ModalHeader
          icon={
            <IconCircular size="size-10">
              <IconPantalla className="size-5" />
            </IconCircular>
          }
          title="Campos Pantalla"
          onClose={onClose}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct} // <-- ¡Verifica que esta línea sea idéntica!
          verifyResult={verifyResult}
          setVerifyResult={setVerifyResult}
          loading={loading}
          setLoading={setLoading}
        />
        {selectedProduct ? (
          <div className="p-4 overflow-auto scrollbar-gray  max-h-[calc(90vh-120px)] bg-[var(--color-surface-modal)] space-y-4">
            {memoizedInfoSection}
            {selectedProduct && selectedProduct.value !== 0 && (
              <>
                {memoizedTableEditFields}
                {memoizedGridLampsFields}
              </>
            )}
          </div>
        ) : (
          <div>
            <div className="flex m-5 flex-col items-center justify-center text-center text-gray-500 bg-[var(--color-surface-modal)] rounded-lg py-20">
              <IconWarning className="size-8" />
              <p className="text-sm text-gray-400 mt-1">
                Seleccione el producto para gestionar scripts.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LampshadeFields;
