import React, { useEffect, useState } from "react";
import LogoCoorin from "../../../../../assets/logo_coorin_7.svg";
import CustomSelect from "../../../board/screenFields/SelectWallet";
import { GetVerifyProduct } from "../../../../../services/mark/Orochi/LokiServices";
import useCatalogOptions from "../../../../../hooks/useCatalogOptions";
import { ACTIVE_SERVER } from "../../../../../config/backend";
import { toast } from "sonner";

const ModalHeader = ({
  onClose,
  title,
  icon,
  selectedProduct,
  setSelectedProduct,
  setSelectedCartera, // ⭐ Nueva prop del padre
  setVerifyResult,
  setLoading,
  setShowDataTables, // opcional: notificar al padre para mostrar LoadDates
}) => {
  const servidor = ACTIVE_SERVER;
  // Estado interno para manejar la cartera localmente
  const [internalSelectedCartera, setInternalSelectedCartera] = useState("");
  const { carteraOptions: storedCarteraOptions, productoOptions: storedProductOptions } = useCatalogOptions({
    idCartera: internalSelectedCartera,
  });
  const carteraOptions = [{ label: "Seleccione una cartera", value: "" }, ...storedCarteraOptions];
  const productOptions = internalSelectedCartera
    ? [{ label: "Seleccione un producto", value: "" }, ...storedProductOptions]
    : [{ label: "Selecciona una cartera primero", value: "" }];

  // Efecto para la verificación del producto
  useEffect(() => {
    if (
      !selectedProduct ||
      !selectedProduct.value ||
      selectedProduct.value === "" ||
      selectedProduct.value === 0
    ) {
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
        toast.error(`${errorMessage}`, {
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

  // ⭐ Handler actualizado para notificar al componente padre
  const handleCarteraChange = (value) => {
    setInternalSelectedCartera(value);

    // ⭐ Notificar al componente padre (ModalCampanas)
    if (setSelectedCartera) {
      setSelectedCartera(value ? Number(value) : null);
    }

    // Resetear el producto seleccionado cuando cambia la cartera
    if (setSelectedProduct) {
      setSelectedProduct(null);
    }
  };

  const handleProductChange = (value) => {
    console.log("Producto seleccionado:", value);
    // Solo actualizar si se seleccionó un producto válido
    if (value && value !== "" && setSelectedProduct) {
      setSelectedProduct({ value: Number(value) });
      if (typeof setShowDataTables === "function") setShowDataTables(true);
    } else if (setSelectedProduct) {
      setSelectedProduct(null);
      if (typeof setShowDataTables === "function") setShowDataTables(false);
    }
  };

  return (
    <div className=" px-3 pt-3 w-full flex gap-5 justify-between items-start border-b border-border dark:border-gray-800 mb-2">
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
                  defaultValue=""
                  label="Cartera"
                  onChange={handleCarteraChange}
                />
              </div>
              <div>
                <CustomSelect
                  options={productOptions}
                  defaultValue=""
                  label="Producto"
                  onChange={handleProductChange}
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
          aria-label="Cerrar"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ModalHeader;
