import React, { useEffect, useState } from "react";
import LogoCoorin from "../../../../../assets/logo_coorin_7.svg";
import CustomSelect from "../../../board/screenFields/SelectWallet";
import {
  GetVerifyProduct,
  getCarteras,
  getCarterasProductos,
} from "../../../../../services/mark/orochi/LokiServices";
import { toast } from "sonner";

const ModalHeader = ({
  onClose,
  title,
  icon,
  selectedProduct,
  setSelectedProduct,
  setVerifyResult,
  setLoading,
}) => {
  const servidor = "Orochi";
  const [carteraOptions, setCarteraOptions] = useState([
    { label: "Seleccione una cartera", value: "" }, // ⭐ Opción por defecto
  ]);

  const [productOptions, setProductOptions] = useState([
    { label: "Selecciona una cartera primero", value: "" },
  ]);
  const [selectedCartera, setSelectedCartera] = useState(""); // ⭐ Inicializado como string vacío

  // Efecto para cargar las carteras
  useEffect(() => {
    const fetchCarteras = async () => {
      try {
        const carteras = await getCarteras();

        const options = [
          { label: "Seleccione una cartera", value: "" }, // ⭐ Primera opción
          ...carteras.map((cartera) => ({
            label: cartera.cartera,
            value: cartera.idCartera,
          }))
        ];

        setCarteraOptions(options);
      } catch (error) {
        console.error("Error fetching carteras:", error);
        toast.error("Error al cargar las carteras");
        setCarteraOptions([{ label: "Error al cargar", value: "" }]);
      }
    };

    fetchCarteras();
  }, []);

  // Efecto para cargar y filtrar productos cuando cambia la cartera seleccionada
  useEffect(() => {
    // ⭐ Validación mejorada
    if (!selectedCartera || selectedCartera === "" || selectedCartera === "0" || selectedCartera === 0) {
      setProductOptions([{ label: "Selecciona una cartera primero", value: "" }]);
      return;
    }

    const fetchAndFilterProducts = async () => {
      setProductOptions([{ label: "Cargando productos...", value: "" }]);
      
      try {
        const productos = await getCarterasProductos();

        // Convertir selectedCartera a número para la comparación
        const carteraId = Number(selectedCartera);

        // Filtrar productos por idCartera (comparando números)
        const filteredProducts = productos.filter((producto) => {
          return Number(producto.idCartera) === carteraId;
        });

        console.log(`Encontrados ${filteredProducts.length} productos para la cartera ${carteraId}`);

        if (filteredProducts.length > 0) {
          const options = [
            { label: "Seleccione un producto", value: "" }, // ⭐ Primera opción para productos
            ...filteredProducts.map((producto) => ({
              label: producto.producto,
              value: producto.idProducto,
            }))
          ];
          setProductOptions(options);
        } else {
          setProductOptions([{ label: "Sin productos disponibles", value: "" }]);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
        toast.error("Error al cargar los productos");
        setProductOptions([{ label: "Error al cargar productos", value: "" }]);
      }
    };

    fetchAndFilterProducts();
  }, [selectedCartera]);

  // Efecto para la verificación del producto
  useEffect(() => {
    if (!selectedProduct || !selectedProduct.value || selectedProduct.value === "" || selectedProduct.value === 0) {
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

  const handleCarteraChange = (value) => {
    setSelectedCartera(value);
    // Resetear el producto seleccionado cuando cambia la cartera
    if (setSelectedProduct) {
      setSelectedProduct(null);
    }
  };

  const handleProductChange = (value) => {
    console.log("Producto seleccionado:", value);
    // ⭐ Solo actualizar si se seleccionó un producto válido
    if (value && value !== "" && setSelectedProduct) {
      setSelectedProduct({ value: Number(value) });
    } else if (setSelectedProduct) {
      setSelectedProduct(null);
    }
  };

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
                  defaultValue="" // ⭐ Valor por defecto vacío
                  label="Cartera"
                  onChange={handleCarteraChange}
                />
              </div>
              <div>
                <CustomSelect
                  options={productOptions}
                  defaultValue="" // ⭐ Valor por defecto vacío
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