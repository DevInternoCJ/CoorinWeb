import React, { useState, useEffect } from "react";
import JerarquiaConR from "../../branchs/JerarquiaConR";
import { obetenerJerarquiaEncargados } from "../../../../../services/mark/Orochi/LokiServices";

const ModalProductividadContent = ({
  timeFilter,
  selectedIndicator,
  selectedExecutiveNode,
  setSelectedExecutiveNode,
  selectedExecutiveInfo,
  setSelectedExecutiveInfo,
  productivityData,
  loadingProductivity,
  errorProductivity,
  setSelectedUserFromTree,
}) => {
  // Estados mínimos para la jerarquía
  const [executiveTree, setExecutiveTree] = useState([]);
  const [loadingJerarquia, setLoadingJerarquia] = useState(false);
  const [errorJerarquia, setErrorJerarquia] = useState(null);
  const [allHierarchyIds, setAllHierarchyIds] = useState([]);

  // Estados requeridos por JerarquiaConR (aunque no se usen directamente aquí)
  const [_selectedExecutives, setSelectedExecutives] = useState([]);
  const [_selectedRows, setSelectedRows] = useState([]);
  const [_editValues, setEditValues] = useState({});

  // Obtener la jerarquía de ejecutivos (idéntico a otros modales)
  useEffect(() => {
    const fetchExecutiveTree = async () => {
      setLoadingJerarquia(true);
      setErrorJerarquia(null);
      try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        const idEjecutivo = userData?.idEjecutivo || null;
        const usuario = userData?.usuario || "";
        // El campo del nombre puede estar en diferentes propiedades según el login
        const nombreEjecutivo = userData?.nombre;
        console.log("Usuario sesión:", {
          idEjecutivo,
          usuario,
          nombreEjecutivo,
        });
        if (!idEjecutivo)
          throw new Error("No se encontró el idEjecutivo del usuario logueado");
        const data = await obetenerJerarquiaEncargados(idEjecutivo);
        let tree = [];
        if (Array.isArray(data)) {
          const found = data.find((n) => n.idEjecutivo === idEjecutivo);
          if (found) {
            tree = data;
          } else {
            tree = [
              {
                idEjecutivo,
                usuario,
                nombreEjecutivo,
                subordinados: data,
              },
            ];
          }
        }
        setExecutiveTree(tree);
      } catch (e) {
        setErrorJerarquia("Error al obtener la jerarquía de ejecutivos", e);
        setExecutiveTree([]);
      } finally {
        setLoadingJerarquia(false);
      }
    };
    fetchExecutiveTree();
  }, []);

  // Calcular todos los ids de la jerarquía al cargar
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const idEjecutivo =
      userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
    if (!idEjecutivo || !executiveTree.length) return;
    const rootNode = executiveTree.find((n) => n.idEjecutivo === idEjecutivo);
    const getAllHierarchyIds = (node) => {
      let ids = [];
      if (!node) return ids;
      if (node.idEjecutivo) ids.push(node.idEjecutivo);
      if (Array.isArray(node.subordinados) && node.subordinados.length > 0) {
        for (const sub of node.subordinados) {
          ids = ids.concat(getAllHierarchyIds(sub));
        }
      }
      return ids;
    };
    if (rootNode) {
      const allIds = getAllHierarchyIds(rootNode)
        .map((id) => Number(id))
        .filter((id) => Number.isInteger(id) && id > 0);
      setAllHierarchyIds(allIds);
      if (!selectedExecutiveNode && allIds.length > 0) {
        setSelectedExecutiveNode(allIds[0]);
      }
    } else {
      setAllHierarchyIds([]);
    }
  }, [executiveTree, selectedExecutiveNode, setSelectedExecutiveNode]);

  // Callback para manejar la selección de un nodo del árbol
  const handleNodeSelect = (node) => {
    console.log("🎯 Nodo seleccionado del árbol:", node);

    // Guardar información completa del nodo seleccionado
    if (setSelectedExecutiveInfo) {
      setSelectedExecutiveInfo({
        idEjecutivo: node.idEjecutivo,
        usuario: node.usuario,
        nombreEjecutivo: node.nombreEjecutivo,
      });
    }

    // Actualizar el ID seleccionado
    setSelectedExecutiveNode(node.idEjecutivo);

    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const idEjecutivoSesion =
      userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
    const isSessionUser = node.idEjecutivo === idEjecutivoSesion;

    // Si es el usuario de sesión, mostrar todos los datos (null = sin filtro)
    // Si es otro usuario, filtrar por su nombre de usuario
    if (isSessionUser) {
      console.log("Usuario de sesión seleccionado - mostrando todos los datos");
      if (setSelectedUserFromTree) setSelectedUserFromTree(null);
    } else {
      console.log(`Usuario seleccionado del árbol: ${node.usuario}`);
      if (setSelectedUserFromTree) setSelectedUserFromTree(node.usuario);
    }
  };

  // Renderizado recursivo para la jerarquía (usado internamente si es necesario)
  const renderExecutiveTree = (tree, level = 0) => {
    if (!Array.isArray(tree)) return null;
    return tree.map((node, idx) => {
      const isSelected = node.idEjecutivo === selectedExecutiveNode;

      return (
        <React.Fragment key={node.usuario || node.id || idx}>
          <div
            className={`executive-hierarchy-item${
              isSelected ? " selected" : ""
            }`}
            style={{
              paddingLeft: level * 18,
              marginBottom: 2,
              fontWeight: 500,
              fontSize: 13,
              color: isSelected ? "#2b463c" : undefined,
              userSelect: "none",
            }}
            onClick={() => {
              setSelectedExecutiveNode(node.idEjecutivo);
              handleNodeSelect(node);
            }}
            title={
              Array.isArray(node.subordinados) && node.subordinados.length > 0
                ? "Mostrar solo subordinados"
                : "Mostrar solo este ejecutivo"
            }
          >
            {node.usuario || ""} - {node.nombreEjecutivo || ""}
          </div>
          {Array.isArray(node.subordinados) &&
            node.subordinados.length > 0 &&
            renderExecutiveTree(node.subordinados, level + 1)}
        </React.Fragment>
      );
    });
  };

  // Obtener títulos de cabecera como array (útil para formateos basados en nombre de columna)
  const getTableHeaderTitles = () => {
    if (selectedIndicator === "Negociaciones") {
      if (timeFilter === "Dia") {
        // Backend returns fields for negociaciones as: Ejecutivo, Encargado, Negociaciones, MontoNegociaciones, SaldoSolucionado, MontoPromedio, SaldoPromedio
        return [
          "Ejecutivo",
          "Encargado",
          "Negociaciones",
          "MontoNegociaciones",
          "SaldoSolucionado",
          "MontoPromedio",
          "SaldoPromedio",
        ];
      } else {
        return [
          "Encargado",
          "Ejecutivo",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "Total",
        ];
      }
    }

    switch (selectedIndicator) {
      case "Sesiones":
        // Orden solicitado: ejecutivo, extension, idEncargado, ingreso, modo, primeraGestion, salida, tiempoEnModo
        return [
          "Ejecutivo",
          "Extensión",
          "Id Encargado",
          "Ingreso",
          "Modo",
          "Primera Gestión",
          "Salida",
          "Tiempo En Modo",
        ];
      case "Contactos":
        return [
          "Ejecutivo",
          "Entrada",
          "Encargado",
          "Cuentas",
          "Gestiones",
          "Titulares",
          "Conocidos",
          "Desconocidos",
          "SinContacto",
        ];
      case "Porcentajes":
        return [
          "Ejecutivo",
          "Encargado",
          "Negociación",
          "Gestión",
          "Entrada",
          "Titulares",
          "Conocidos",
          "Desconocidos",
          "SinContacto",
        ];
      case "Tiempos":
        // Orden correcto: Ejecutivo y Encargado primero, luego los tiempos
        return [
          "Ejecutivo",
          "Encargado",
          "Baño",
          "Comida",
          "Consulta",
          "Cuentas",
          "Curso",
          "Gestión",
          "Muerto",
          "Pausas",
          "Permiso",
          "Sesión",
        ];
      case "TiempoPromedio":
        return [
          "Ejecutivo",
          "Encargado",
          "Negociaciones",
          "Cuentas",
          "Titulares",
          "Conocidos",
          "Desconocidos",
          "SinContacto",
        ];
      case "Cuentas":
      case "Titulares":
      case "Conocidos":
      case "Desconocidos":
      case "SinContacto":
      case "MontoNegociaciones":
      case "SaldoSolucionado":
        return [
          "Encargado",
          "Ejecutivo",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "Total",
        ];
      default:
        return [];
    }
  };

  // Función para renderizar las columnas de la tabla según el indicador
  const renderTableHeaders = () => {
    // Distinguir entre "Negociaciones" de Día vs Hora
    if (selectedIndicator === "Negociaciones") {
      if (timeFilter === "Dia") {
        // Mostrar columnas que envía el backend para "Negociaciones" en modo Día
        return (
          <>
            <th>Ejecutivo</th>
            <th>Encargado</th>
            <th>Negociaciones</th>
            <th>MontoNegociaciones</th>
            <th>SaldoSolucionado</th>
            <th>MontoPromedio</th>
            <th>SaldoPromedio</th>
          </>
        );
      } else {
        // timeFilter === 'Hora'
        return (
          <>
            <th>Encargado</th>
            <th>Ejecutivo</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
            <th>11</th>
            <th>12</th>
            <th>13</th>
            <th>14</th>
            <th>15</th>
            <th>16</th>
            <th>17</th>
            <th>18</th>
            <th>19</th>
            <th>20</th>
            <th>21</th>
            <th>22</th>
            <th>Total</th>
          </>
        );
      }
    }

    switch (selectedIndicator) {
      // Radio Button "Día"
      case "Sesiones":
        return (
          <>
            <th>Ejecutivo</th>
            <th>Extensión</th>
            <th>Encargado</th>
            <th>Ingreso</th>
            <th>Modo</th>
            <th>P. Gestión</th>
            <th>Salida</th>
            <th>T. Modo</th>
          </>
        );
      case "Contactos":
        return (
          <>
            <th>Ejecutivo</th>
            <th>Entrada</th>
            <th>Encargado</th>
            <th>Cuentas</th>
            <th>Gestiones</th>
            <th>Titulares</th>
            <th>Conocidos</th>
            <th>Desconocidos</th>
            <th>SinContacto</th>
          </>
        );
      case "Porcentajes":
        return (
          <>
            <th>Ejecutivo</th>
            <th>Encargado</th>
            <th>Negociación</th>
            <th>Gestión</th>
            <th>Entrada</th>
            <th>Titulares</th>
            <th>Conocidos</th>
            <th>Desconocidos</th>
            <th>SinContacto</th>
          </>
        );
      case "Tiempos":
        return (
          <>
            <th>Baño</th>
            <th>Comida</th>
            <th>Consulta</th>
            <th>Cuentas</th>
            <th>Curso</th>
            <th>Ejecutivo</th>
            <th>Encargado</th>
            <th>Gestión</th>
            <th>Muerto</th>
            <th>Pausas</th>
            <th>Permiso</th>
            <th>Sesión</th>
          </>
        );
      case "TiempoPromedio":
        return (
          <>
            <th>Ejecutivo</th>
            <th>Encargado</th>
            <th>Negociaciones</th>
            <th>Cuentas</th>
            <th>Titulares</th>
            <th>Conocidos</th>
            <th>Desconocidos</th>
            <th>SinContacto</th>
          </>
        );
      // Radio Button "Hora" - Todos los indicadores tienen el mismo formato
      case "Cuentas":
      case "Titulares":
      case "Conocidos":
      case "Desconocidos":
      case "SinContacto":
      case "MontoNegociaciones":
      case "SaldoSolucionado":
        return (
          <>
            <th>Encargado</th>
            <th>Ejecutivo</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
            <th>11</th>
            <th>12</th>
            <th>13</th>
            <th>14</th>
            <th>15</th>
            <th>16</th>
            <th>17</th>
            <th>18</th>
            <th>19</th>
            <th>20</th>
            <th>21</th>
            <th>22</th>
            <th>Total</th>
          </>
        );
    }
  };

  // Función para determinar número de columnas según el indicador
  const getColumnCount = () => {
    // Distinguir entre "Negociaciones" de Día vs Hora
    if (selectedIndicator === "Negociaciones") {
      if (timeFilter === "Dia") {
        return 7; // Ejecutivo, Encargado, Negociaciones, MontoNegociaciones, SaldoSolucionado, MontoPromedio, SaldoPromedio
      } else {
        return 20; // Encargado, Ejecutivo, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, Total
      }
    }

    switch (selectedIndicator) {
      // Radio Button "Día"
      case "Sesiones":
        return 8; // Ejecutivo, Extensión, Id Encargado, Ingreso, Modo, Primera Gestión, Salida, Tiempo En Modo
      case "Contactos":
        return 9; // Ejecutivo, Entrada, Encargado, Cuentas, Gestiones, Titulares, Conocidos, Desconocidos, SinContacto
      case "Porcentajes":
        return 9; // Encargado, Ejecutivo, Negociación, Gestiones x Cuenta, Entrada, Titulares, Conocidos, Desconocidos, SinContacto
      case "Tiempos":
        return 12; // Encargado, Ejecutivo, Sesión, Cuentas, Pausas, Muerto, Consulta, Gestión, Permiso, Curso, Comida, Baño
      case "Tiempo Promedio":
        return 8; // Encargado, Ejecutivo, Negociaciones, Cuentas, Titulares, Conocidos, Desconocidos, SinContacto
      // Radio Button "Hora" - Todos tienen el mismo número de columnas
      case "Cuentas":
      case "Titulares":
      case "Conocidos":
      case "Desconocidos":
      case "SinContacto":
      case "Monto Negociaciones":
      case "Saldo Solucionado":
        return 20; // Encargado, Ejecutivo, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, Total
    }
  };

  // Función para renderizar las filas de datos
  const renderTableRows = () => {
    const columnCount = getColumnCount();

    if (loadingProductivity) {
      return (
        <tr>
          <td colSpan={columnCount} className="text-center py-4">
            Cargando datos...
          </td>
        </tr>
      );
    }

    if (errorProductivity) {
      return (
        <tr>
          <td colSpan={columnCount} className="text-center py-4 text-red-600">
            {errorProductivity}
          </td>
        </tr>
      );
    }

    // Validar que productivityData sea un array
    if (!Array.isArray(productivityData) || productivityData.length === 0) {
      return (
        <tr>
          <td colSpan={columnCount} className="text-center py-4">
            No hay datos disponibles
          </td>
        </tr>
      );
    }

    // Mapear los datos según el indicador seleccionado
    return productivityData.map((item, index) => {
      // Log para debug
      console.log(`📊 Item #${index} para renderizar:`, item);

      // Convertir el objeto a array de valores, manejando diferentes estructuras
      let values = [];
      const columnCount = getColumnCount();

      if (Array.isArray(item)) {
        values = item;
      } else if (typeof item === "object" && item !== null) {
        const headers = getTableHeaderTitles();
        // Mapeos personalizados por indicador
        const indicatorMappings = {
          Sesiones: {
            Ejecutivo: "ejecutivo",
            Extensión: "extension",
            Encargado: "idEncargado",
            Ingreso: "ingreso",
            Modo: "modo",
            "P. Gestión": "primerGestion",
            Salida: "salida",
            "T. Modo": "tiempoEnModo",
          },
          Contactos: {
            Ejecutivo: "Ejecutivo",
            Entrada: "Entrada",
            Encargado: "Encargado",
            Cuentas: "Cuentas",
            Gestiones: "Gestiones",
            Titulares: "Titulares",
            Conocidos: "Conocidos",
            Desconocidos: "Desconocidos",
            SinContacto: "SinContacto",
          },
          Negociaciones: {
            Ejecutivo: "Ejecutivo",
            Encargado: "Encargado",
            Negociaciones: "Negociaciones",
            MontoNegociaciones: "MontoNegociaciones",
            SaldoSolucionado: "SaldoSolucionado",
            MontoPromedio: "MontoPromedio",
            SaldoPromedio: "SaldoPromedio",
          },
          Porcentajes: {
            Ejecutivo: "Ejecutivo",
            Encargado: "Encargado",
            Negociación: "Negociación",
            Gestión: "Gestión",
            Entrada: "Entrada",
            Titulares: "Titulares",
            Conocidos: "Conocidos",
            Desconocidos: "Desconocidos",
            SinContacto: "SinContacto",
          },
          Tiempos: {
            // Las claves coinciden con los headers
            Baño: "Baño",
            Comida: "Comida",
            Consulta: "Consulta",
            Cuentas: "Cuentas",
            Curso: "Curso",
            Ejecutivo: "Ejecutivo",
            Encargado: "Encargado",
            Gestión: "Gestión",
            Muerto: "Muerto",
            Pausas: "Pausas",
            Permiso: "Permiso",
            Sesión: "Sesión",
          },
          "Tiempo Promedio": {
            Ejecutivo: "Ejecutivo",
            Encargado: "Encargado",
            Negociaciones: "Negociaciones",
            Cuentas: "Cuentas",
            Titulares: "Titulares",
            Conocidos: "Conocidos",
            Desconocidos: "Desconocidos",
            SinContacto: "SinContacto",
          },
          // Agrega aquí más mapeos personalizados para otros indicadores si lo necesitas
        };

        const headerToKey = (h) => {
          if (!h) return null;
          const label = typeof h === "object" && h.label ? h.label : h;
          // Si existe mapeo personalizado para el indicador actual
          if (
            indicatorMappings[selectedIndicator] &&
            indicatorMappings[selectedIndicator][label]
          ) {
            return indicatorMappings[selectedIndicator][label];
          }
          // Otros indicadores: normalizar
          if (typeof label === "string") {
            const normalized = label.replace(/\s+/g, "").replace(/\W/g, "");
            return normalized.charAt(0).toLowerCase() + normalized.slice(1);
          }
          return "-";
        };

        if (headers && headers.length > 0) {
          values = headers.map((h) => {
            const key = headerToKey(h);
            const v =
              key && Object.prototype.hasOwnProperty.call(item, key)
                ? item[key]
                : undefined;
            return v !== undefined && v !== null && v !== "" ? v : "--";
          });
        } else {
          values = Object.values(item);
        }
      } else {
        values = [item];
      }

      // Asegurar que tenemos el número correcto de columnas
      while (values.length < columnCount) {
        values.push("-");
      }

      const headers = getTableHeaderTitles();

      return (
        <tr key={index}>
          {values.slice(0, columnCount).map((value, idx) => {
            let display =
              value !== null && value !== undefined && value !== ""
                ? String(value)
                : "--";
            const header = headers[idx] || "";

            // Si la columna es 'Ingreso', extraer la parte de hora tras la 'T' (HH:MM:SS)
            if (header === "Ingreso" && display !== "--") {
              const m = display.match(/T(\d{2}:\d{2}:\d{2})/);
              if (m && m[1]) {
                display = m[1];
              } else {
                const m2 = display.match(/(\d{2}:\d{2}:\d{2})/);
                if (m2 && m2[1]) display = m2[1];
              }
            }

            return (
              <td key={idx} className={idx === 0 ? "font-semibold" : ""}>
                {display}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <>
      <div className="flex gap-4 h-full" style={{ maxHeight: "60vh" }}>
        {/* Columna izquierda - Jerarquía de Ejecutivos */}
        <JerarquiaConR
          executiveTree={executiveTree}
          loadingJerarquia={loadingJerarquia}
          errorJerarquia={errorJerarquia}
          selectedExecutiveNode={selectedExecutiveNode}
          allHierarchyIds={allHierarchyIds}
          setSelectedExecutives={setSelectedExecutives}
          setSelectedRows={setSelectedRows}
          setEditValues={setEditValues}
          setSelectedExecutiveNode={setSelectedExecutiveNode}
          renderExecutiveTree={renderExecutiveTree}
          onNodeSelect={handleNodeSelect}
        />

        {/* Columna derecha - Tabla de datos con scroll interno */}
        <div
          className="flex-1 bg-[var(--color-surface)] rounded-lg pt-[1.5vh] pb-3 px-[1vw] shadow border border-[var(--color-jerarquia1)] flex flex-col overflow-hidden transition-colors duration-300"
          style={{ minWidth: 0, maxHeight: "100%", maxWidth: "70%" }}
        >
          {/* Información del ejecutivo seleccionado */}
          <div className="flex items-center mb-2 w-full flex-shrink-0">
            <span className="modal-span-1 pl-1 mr-4">
              {loadingProductivity
                ? "Cargando datos..."
                : errorProductivity
                  ? "Error al cargar datos"
                  : !selectedExecutiveNode
                    ? "Seleccione un indicador y ejecutivo"
                    : productivityData.length > 0
                      ? `Datos de productividad - ${productivityData.length} registros`
                      : "Sin datos disponibles para el ejecutivo seleccionado"}
            </span>
          </div>

          {/* Tabla con scroll horizontal y vertical interno */}
          <div
            className="scrollbar-gray flex-1 overflow-auto"
            style={{
              minWidth: "100%",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <table
              className="modal-table mb-2"
              style={{ minWidth: "400px", width: "max-content" }}
            >
              <thead>
                <tr>{renderTableHeaders()}</tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalProductividadContent;
