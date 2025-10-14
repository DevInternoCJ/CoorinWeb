import React, { useEffect } from "react";
import LogoCoorin from "../../../../../assets/logo_coorin_7.svg";
import CustomSelect from "../../../board/screenFields/SelectWallet";
import { GetVerifyProduct } from "../../../../../services/mark/albaz/LokiServices";
import { toast } from 'sonner';

const PRODUCT_OPTIONS = [
  { label: "Producto", value: 0 },
  { label: "Amex", value: 1 },
];
const CARTERA_OPTIONS = [
  { label: "American Express", value: "American Express" },
];

const ModalHeader = ({
  onClose,
  title,
  icon,
  selectedProduct,
  setSelectedProduct,
  verifyResult,
  setVerifyResult,
  loading,
  setLoading,
  // onProductSelect ya no es necesaria, la lógica está aquí
}) => {

  const servidor = "Thor";
  // ✅ Efecto para la verificación del producto (MOVIDO DESDE WalletSection)
  useEffect(() => {
    console.log("selectedProduct for verification:", selectedProduct);
    if (!selectedProduct || selectedProduct.value === 0) {
      setVerifyResult(null); // Limpiar resultado si el producto es 0 o null
      // Si cambian la selección a "Producto", cerramos la verificación anterior si existe
      toast.dismiss('product-verify'); 
      return;
    }
    // Usaremos un ID de toast para mantener un solo mensaje de carga
    const toastId = 'product-verify';
    const fetchVerifyProduct = async () => {
      setLoading(true);
      // 🚀 MOSTRAR TOAST DE CARGA
      toast.loading("Verificando producto, por favor espera...", { id: toastId });
      try {
        const result = await GetVerifyProduct(selectedProduct.value);
        // 🚀 MOSTRAR TOAST DE ÉXITO
        toast.success("✅ Producto verificado correctamente.", { 
            id: toastId, 
            duration: 3000 
        });
        setVerifyResult(result);
      } catch (error) {
        const errorMessage = error.message || "Error al verificar el producto.";
        toast.error(`❌ ${errorMessage}`, { 
            id: toastId,
            duration: 5000 
        });
          setVerifyResult(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVerifyProduct();
  }, [selectedProduct, servidor, setLoading, setVerifyResult]);

  return (
    <div className="p-3 w-full flex gap-5 justify-between items-start border-b border-gray-200">
      <div className="block md:flex items-start justify-between w-3/4 gap-3">
         <div className="flex items-center gap-2 text-jerarquia3">
        {icon}
        <h2 className="text-xl font-bold text-jerarquia3">
          {title}
        </h2>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-4 mb-3">
          <div>
            <img src={LogoCoorin} alt="logo-conjur" className="h-10" />
          </div>
          <div className="block md:grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-jerarquia2 mb-1">
                Cartera
              </label>
              <CustomSelect
                options={CARTERA_OPTIONS}
                defaultValue={CARTERA_OPTIONS[0].value}
                disabled // Opcional: Deshabilitar si siempre es fijo
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-jerarquia2 mb-1">
                Producto
              </label>
              <CustomSelect
                options={PRODUCT_OPTIONS}
                onChange={(value) => {
                  const found = PRODUCT_OPTIONS.find(
                    (opt) => opt.value === Number(value) || opt.value === value
                  );
                  setSelectedProduct(found ? { ...found } : null);
                }}
              />
            </div>
          </div>
        </div>  
      </div>
      </div>
      <div>
          <button
          onClick={onClose}
          className="text-jerarquia3 hover:bg-background-dashboard hover:text-red-600 text-4xl rounded-full w-8 h-8 flex items-center justify-center transition-colors ">
          &times;
        </button>
      </div>
    </div>
  );
};

export default ModalHeader;
