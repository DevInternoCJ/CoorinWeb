import React, { useEffect, useState } from "react";
import LogoCoorin from "../../../../../assets/logo_coorin_7.svg";
import CustomSelect from "../../../board/screenFields/SelectWallet";
import { GetVerifyProduct, getCarteras, getCarterasProductos} from "../../../../../services/mark/orochi/LokiServices";
import { toast } from "sonner";


const ModalHeader = ({
  onClose,
  title,
  icon,
  selectedProduct,
  setSelectedProduct,
  setVerifyResult,
  setLoading,
  setShowDataTables,
}) => {
  const servidor = "Orochi";
  const [carteraOptions, setCarteraOptions] = useState([
    { label: "Cargando...", value: 0 }
  ]);
  
  const [productOptions, setProductOptions] = useState([
    { label: "Cargando...", value: 0 }
  ]);
  // Efecto para cargar las carteras
  useEffect(() => {
    const fetchCarteras = async () => {
      try {
        const carteras = await getCarteras();
        
        // Mapear la respuesta al formato necesario para el select
        const options = carteras.map(cartera => ({
          label: cartera.cartera,
          value: cartera.idCartera
        }));
        
        setCarteraOptions(options);
      } catch (error) {
        console.error("Error fetching carteras:", error);
        toast.error("Error al cargar las carteras");
        setCarteraOptions([{ label: "Error al cargar", value: 0 }]);
      }
    };

    fetchCarteras();
  }, []);

    // Efecto para cargar las carteras
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productos = await getCarterasProductos();
        
        // Mapear la respuesta al formato necesario para el select
        const options = productos.map(producto => ({
          label: producto.producto,
          value: producto.idProducto
        }));

        setProductOptions(options);
      } catch (error) {
        console.error("Error fetching productos:", error);
        toast.error("Error al cargar los productos");
        setProductOptions([{ label: "Error al cargar", value: 0 }]);
      }
    };

    fetchProductos();
  }, []);

  // Efecto para la verificación del producto
  useEffect(() => {
    console.log("selectedProduct for verification:", selectedProduct);
    if (!selectedProduct || selectedProduct.value === 0) {
      setVerifyResult(null);
      toast.dismiss("product-verify");
      return;
    }
    
    const toastId = "product-verify";
    const fetchVerifyProduct = async () => {
      setLoading(true);
      toast.loading("Verificando producto, por favor espera...", {
        id: toastId,
      });
      try {
        const result = await GetVerifyProduct(selectedProduct.value);
        toast.success("Producto verificado correctamente.", {
          id: toastId,
          duration: 3000,
        });
        setVerifyResult(result);
      } catch (error) {
        const errorMessage = error.message || "Error al verificar el producto.";
        toast.error(` ${errorMessage}`, {
          id: toastId,
          duration: 5000,
        });
        setVerifyResult(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVerifyProduct();
  }, [selectedProduct, servidor, setLoading, setVerifyResult]);

  return (
    <div className="bg-neutral-100 px-3 pt-3 w-full flex gap-5 justify-between items-start border-b border-gray-200">
      <div className="block md:flex items-start justify-between w-3/4 gap-3">
        <div className="flex items-center gap-2 text-jerarquia3">
          {icon}
          <h2 className="text-xl font-bold text-jerarquia3">{title}</h2>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-4 mb-3">
            <div></div>
            <div className="block md:grid grid-cols-2 gap-4">
              <div>
                <CustomSelect
                  options={carteraOptions}
                  defaultValue={carteraOptions[0]?.value}
                  label="Cartera"
                />
              </div>
              <div>
                <CustomSelect
                  options={productOptions}
                  defaultValue={productOptions[0]?.value}
                  label="Producto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={onClose}
          className="text-jerarquia3 hover:bg-background-dashboard hover:text-red-600 text-4xl rounded-full w-8 h-8 flex items-center justify-center transition-colors"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ModalHeader;