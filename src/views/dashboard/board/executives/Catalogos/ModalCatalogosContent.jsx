import React, { useState, useEffect } from "react";
import {
  getCatalogoCard,
  getCatalogoValueCard,
} from "../../../../../services/mark/Orochi/LokiServices";

const ModalCatalogosContent = () => {
  const [catalogsData, setCatalogsData] = useState([]);
  const [catalogsValuesData, setCatalogsValuesData] = useState([]);
  const [selectedCatalog, setSelectedCatalog] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null); // Para trackear el valor seleccionado
  const [loading, setLoading] = useState(true);
  const [loadingValues, setLoadingValues] = useState(false);
  const [error, setError] = useState(null);

  // Estados para ordenamiento
  const [catalogSort, setCatalogSort] = useState({ field: null, order: null }); // 'asc' | 'desc' | null
  const [valuesSort, setValuesSort] = useState({ field: null, order: null }); // 'asc' | 'desc' | null

  // Cargar catálogos al montar el componente
  useEffect(() => {
    const loadCatalogs = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("  Cargando catálogos...");

        const response = await getCatalogoCard();
        console.log("  Respuesta de getCatalogoCard:", response);

        if (response && Array.isArray(response)) {
          // Mapear la respuesta del API al formato esperado
          const mappedData = response.map((item) => ({
            idCatalogo: item.idCatalogo,
            catalog: item.catálogo, // Con acento como viene del API
            description: item.descrpición, // Con el error tipográfico como viene del API
          }));

          setCatalogsData(mappedData);

          // Seleccionar el primer catálogo por defecto
          if (mappedData.length > 0) {
            setSelectedCatalog(mappedData[0].catalog);
          }
        } else {
          console.warn("Respuesta vacía o en formato incorrecto:", response);
          setCatalogsData([]);
        }
      } catch (err) {
        console.error("Error al cargar catálogos:", err);
        setError("Error al cargar los catálogos");
        setCatalogsData([]);
      } finally {
        setLoading(false);
      }
    };

    loadCatalogs();
  }, []);

  // Cargar valores de catálogos al montar el componente
  useEffect(() => {
    const loadCatalogValues = async () => {
      try {
        setLoadingValues(true);
        console.log("  Cargando valores de catálogos...");

        const response = await getCatalogoValueCard();
        console.log("  Respuesta de getCatalogoValueCard:", response);

        if (response && Array.isArray(response)) {
          setCatalogsValuesData(response);
        } else {
          console.warn(
            "Respuesta vacía o en formato incorrecto para valores:",
            response,
          );
          setCatalogsValuesData([]);
        }
      } catch (err) {
        console.error("  Error al cargar valores de catálogos:", err);
        setCatalogsValuesData([]);
      } finally {
        setLoadingValues(false);
      }
    };

    loadCatalogValues();
  }, []);

  // Resetear valor seleccionado cuando cambia el catálogo
  useEffect(() => {
    setSelectedValue(null);
  }, [selectedCatalog]);

  // Función para manejar el ordenamiento de catálogos
  const handleCatalogSort = (field) => {
    let newOrder = "asc";

    if (catalogSort.field === field) {
      if (catalogSort.order === "asc") {
        newOrder = "desc";
      } else if (catalogSort.order === "desc") {
        newOrder = null; // Sin ordenar
      } else {
        newOrder = "asc";
      }
    }

    setCatalogSort({ field: newOrder ? field : null, order: newOrder });
  };

  // Función para manejar el ordenamiento de valores
  const handleValuesSort = (field) => {
    let newOrder = "asc";

    if (valuesSort.field === field) {
      if (valuesSort.order === "asc") {
        newOrder = "desc";
      } else if (valuesSort.order === "desc") {
        newOrder = null; // Sin ordenar
      } else {
        newOrder = "asc";
      }
    }

    setValuesSort({ field: newOrder ? field : null, order: newOrder });
  };

  // Función para obtener los datos de catálogos ordenados
  const getSortedCatalogsData = () => {
    if (!catalogSort.field || !catalogSort.order) {
      return catalogsData;
    }

    return [...catalogsData].sort((a, b) => {
      const aValue = a[catalogSort.field]?.toString().toLowerCase() || "";
      const bValue = b[catalogSort.field]?.toString().toLowerCase() || "";

      if (catalogSort.order === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  };

  // Función para obtener los datos de valores ordenados
  const getSortedValuesData = () => {
    // Primero filtrar por el catálogo seleccionado
    let valuesData = [];

    if (selectedCatalog) {
      // Encontrar el catálogo seleccionado para obtener su idCatalogo
      const selectedCatalogData = catalogsData.find(
        (cat) => cat.catalog === selectedCatalog,
      );

      if (selectedCatalogData) {
        // Filtrar los valores que corresponden al idCatalogo seleccionado
        valuesData = catalogsValuesData.filter(
          (value) => value.idCatálogo === selectedCatalogData.idCatalogo,
        );

        console.log(
          "Valores filtrados para idCatalogo",
          selectedCatalogData.idCatalogo,
          ":",
          valuesData.length,
        );
      }
    }

    // Luego aplicar el ordenamiento si está activo
    if (!valuesSort.field || !valuesSort.order) {
      return valuesData;
    }

    return [...valuesData].sort((a, b) => {
      const aValue = a[valuesSort.field]?.toString().toLowerCase() || "";
      const bValue = b[valuesSort.field]?.toString().toLowerCase() || "";

      if (valuesSort.order === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  };

  // Función para obtener el icono de ordenamiento
  const getSortIcon = (field, currentSort) => {
    if (currentSort.field !== field) {
      return " ⇅"; // Sin ordenar
    }

    if (currentSort.order === "asc") {
      return " ↑"; // Ascendente
    } else if (currentSort.order === "desc") {
      return " ↓"; // Descendente
    }

    return " ⇅"; // Sin ordenar
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        maxHeight: "600px",
        gap: "1rem",
      }}
    >
      {/* NIVEL 2: Tabla de Catálogos */}
      <div
        className="bg-[var(--color-card-scripts-bg)] rounded-xl p-4 shadow flex flex-col"
        style={{ flex: 1, minHeight: "280px", maxHeight: "280px" }}
      >
        <div className="flex items-center mb-3 w-full">
          <span
            className="text-sm font-semibold pl-1"
            style={{ color: "var(--color-jerarquia2)", minWidth: 100 }}
          ></span>
        </div>
        <div
          className="scrollbar-gray"
          style={{
            overflowX: "auto",
            overflowY: "auto",
            maxHeight: "200px",
            height: "100%",
            flex: 1,
            minHeight: "200px",
          }}
        >
          <table className="modal-table">
            <thead>
              <tr>
                <th
                  style={{
                    width: "33%",
                    cursor: "pointer",
                    userSelect: "none",
                    position: "sticky",
                    top: 0,
                  }}
                  onClick={() => handleCatalogSort("catalog")}
                  title="Haz clic para ordenar"
                >
                  Catálogo{getSortIcon("catalog", catalogSort)}
                </th>
                <th
                  style={{
                    width: "67%",
                    cursor: "pointer",
                    userSelect: "none",
                    position: "sticky",
                    top: 0,
                  }}
                  onClick={() => handleCatalogSort("description")}
                  title="Haz clic para ordenar"
                >
                  Descripción{getSortIcon("description", catalogSort)}
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="2"
                    className="px-3 py-8 text-center text-gray-500"
                  >
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
                      Cargando catálogos...
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan="2"
                    className="px-3 py-8 text-center text-red-500"
                  >
                    <div className="flex items-center justify-center">
                      <span className="mr-2"></span>
                      {error}
                    </div>
                  </td>
                </tr>
              ) : catalogsData.length === 0 ? (
                <tr>
                  <td
                    colSpan="2"
                    className="px-3 py-8 text-center text-gray-500"
                  >
                    No hay catálogos disponibles
                  </td>
                </tr>
              ) : (
                getSortedCatalogsData().map((item) => (
                  <tr
                    key={item.idCatalogo}
                    className={`cursor-pointer transition-colors ${
                      selectedCatalog === item.catalog
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedCatalog(item.catalog)}
                  >
                    <td
                      className={`font-semibold ${
                        selectedCatalog === item.catalog
                          ? "text-[var(--color-sticky-text)] bg-[var(--color-surface-modal)]"
                          : ""
                      }`}
                    >
                      {item.catalog}
                    </td>
                    <td>{item.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* NIVEL 3: Tabla de Valores */}
      <div
        className="bg-[var(--color-card-scripts-bg)] rounded-xl p-4 shadow flex flex-col"
        style={{ flex: 1, minHeight: "280px", maxHeight: "280px" }}
      >
        <div className="flex items-center mb-3 w-full">
          <span
            className="text-sm font-semibold pl-1"
            style={{ color: "var(--color-jerarquia2)", minWidth: 100 }}
          ></span>
        </div>
        <div
          className="scrollbar-gray"
          style={{
            overflowX: "auto",
            overflowY: "auto",
            maxHeight: "200px",
            height: "100%",
            flex: 1,
            minHeight: "200px",
          }}
        >
          <table className="modal-table">
            <thead>
              <tr>
                <th
                  style={{
                    width: "33%",
                    cursor: "pointer",
                    userSelect: "none",
                    position: "sticky",
                    top: 0,
                  }}
                  onClick={() => handleValuesSort("valor")}
                  title="Haz clic para ordenar"
                >
                  Valor{getSortIcon("valor", valuesSort)}
                </th>
                <th
                  style={{
                    width: "67%",
                    cursor: "pointer",
                    userSelect: "none",
                    position: "sticky",
                    top: 0,
                  }}
                  onClick={() => handleValuesSort("detalle")}
                  title="Haz clic para ordenar"
                >
                  Detalle{getSortIcon("detalle", valuesSort)}
                </th>
              </tr>
            </thead>
            <tbody>
              {loading || loadingValues ? (
                <tr>
                  <td
                    colSpan="2"
                    className="px-3 py-8 text-center text-gray-500"
                  >
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
                      Cargando valores...
                    </div>
                  </td>
                </tr>
              ) : !selectedCatalog ? (
                <tr>
                  <td
                    colSpan="2"
                    className="px-3 py-8 text-center text-gray-500"
                  >
                    Selecciona un catálogo para ver sus valores
                  </td>
                </tr>
              ) : getSortedValuesData().length === 0 ? (
                <tr>
                  <td
                    colSpan="2"
                    className="px-3 py-8 text-center text-gray-500"
                  >
                    No hay valores disponibles para este catálogo
                  </td>
                </tr>
              ) : (
                getSortedValuesData().map((item) => (
                  <tr
                    key={item.idValor}
                    className={`cursor-pointer transition-colors ${
                      selectedValue === item.idValor
                        ? "bg-[var(--color-card-scripts-bg)]"
                        : "hover:bg-[var(--color-card-scripts-bg)]"
                    }`}
                    onClick={() => setSelectedValue(item.idValor)}
                  >
                    <td
                      className={`font-semibold ${
                        selectedValue === item.idValor
                          ? "text-[var(--color-sticky-text)]"
                          : ""
                      }`}
                    >
                      {item.valor || "Sin valor"}
                    </td>
                    <td>{item.detalle || "Sin descripción disponible"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ModalCatalogosContent;
