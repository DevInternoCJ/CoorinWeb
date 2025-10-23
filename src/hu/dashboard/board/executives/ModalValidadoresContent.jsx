import React, { useState, useEffect, useMemo, useCallback } from "react";
import ConsorcioLogo from "../../../../assets/logo_coorin_5.svg";
import {
  obetenerJerarquiaEncargados,
  ValidatorsNormal,
  Validatorsregrets,
  InsertDeletedValidators,
  InsertDeletedValidatorsRegrets,
} from "../../../../services/mark/albaz/LokiServices";
import { toast } from "sonner";

// Flecha tipo chevron moderna
const DropdownArrow = () => (
  <span
    style={{
      pointerEvents: "none",
      position: "absolute",
      right: "0.75rem",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "1.15rem",
      color: "#2b463c",
      display: "flex",
      alignItems: "center",
    }}
  >
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M6 8l4 4 4-4"
        stroke="#2b463c"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const ModalValidadoresContent = ({
  onFooterDataChange, // Nueva prop para comunicar cambios al padre
}) => {
  // Estados principales (idéntico a ModalCampanasEjecutivos)
  const [executiveTree, setExecutiveTree] = useState([]);
  const [usuariosValidadores, setUsuariosValidadores] = useState([]);
  // Otros estados propios del modal
  const [cartera, setCartera] = useState(() => {
    // Usar la función getIdCartera para obtener el valor inicial
    const idCartera = getIdCartera();
    // Si es string, usarlo directo; si es número, convertir a string para el value del select
    return typeof idCartera === 'string' ? idCartera : String(idCartera);
  });
  const [producto, setProducto] = useState(""); // Iniciamos vacío para obligar selección
  const [arrepentimientos, setArrepentimientos] = useState(false);
  const [validadoresFromAPI, setValidadoresFromAPI] = useState([]);
  const [isLoadingValidadores, setIsLoadingValidadores] = useState(false);
  const [isProcessingChange, setIsProcessingChange] = useState(false);
  // Estados para el footer
  const [lastAction, setLastAction] = useState(null); // 'added' | 'removed' | null
  const [lastUser, setLastUser] = useState(null);


  // Función para obtener idCartera desde localStorage (debe ir antes del componente para evitar hoisting)
  function getIdCartera() {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    return userData?.idCartera || userData?.idcartera || userData?.cartera || 1; // fallback a 1 si no existe
  }

  // Función para obtener validadores del API
  const fetchValidadores = useCallback(
    async (idProducto, esArrepentimientos = false) => {
      if (!idProducto) return;

      setIsLoadingValidadores(true);
      try {
        let response;
        if (esArrepentimientos) {
          // Llamar al endpoint de validadores arrepentimientos
          response = await Validatorsregrets(idProducto);
        } else {
          // Llamar al endpoint normal
          response = await ValidatorsNormal(idProducto);
        }

        const validadores = response?.data || [];
        setValidadoresFromAPI(validadores);

        return validadores;
      } catch (error) {
        toast.error("Error al obtener validadores:", error);
        setValidadoresFromAPI([]);
        return [];
      } finally {
        setIsLoadingValidadores(false);
      }
    },
    []
  );

  // Cargar ejecutivos (idéntico a ModalCampanasEjecutivos)
  useEffect(() => {
    const fetchExecutives = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const idEjecutivo =
          userData?.idEjecutivo || userData?.idejecutivo || userData?.id;
        const usuarioSesion = userData?.usuario || userData?.Usuario || "";
        const nombreSesion = userData?.nombreEjecutivo || userData?.nombre || "";
        if (!idEjecutivo) return;
        const data = await obetenerJerarquiaEncargados(idEjecutivo);
        // Filtrar solo ejecutivos propios de nivel 1 (simula tvDependientes.CargaEjecutivosPropios(1))
        const hijos = Array.isArray(data)
          ? data
              .filter(e => (e.jerarquia === undefined || e.jerarquia > 0))
              .map((e) => ({
                usuario: e.usuario || e.Usuario || "",
                nombreEjecutivo: e.nombreEjecutivo || "",
                subordinados: Array.isArray(e.subordinados)
                  ? e.subordinados.filter(s => (s.jerarquia === undefined || s.jerarquia > 0))
                  : [],
                idEjecutivo: e.idEjecutivo || e.idejecutivo || e.id || "",
                idEncargado: e.idEncargado || null,
                seleccionado: false,
                jerarquia: e.jerarquia || 1,
              }))
          : [];

        // Nodo raíz del usuario de sesión
        const nodoSesion = {
          usuario: usuarioSesion,
          nombreEjecutivo: nombreSesion,
          subordinados: hijos,
          idEjecutivo: idEjecutivo,
          idEncargado: null,
          seleccionado: false,
          jerarquia: obetenerJerarquiaEncargados.jerarquia,
        };

        setExecutiveTree([nodoSesion]);
      } catch (error) {
        toast.error("Error al cargar ejecutivos para validadores:", error);
        setExecutiveTree([]);
      }
    };
    fetchExecutives();
  }, []);

  // Filtrar ejecutivos: Replicar comportamiento exacto de ModalCampanasEjecutivos
  const usuariosFiltrados = useMemo(() => {
    if (!executiveTree.length) return [];

    const usuariosValidadores = [];

    // Tomar solo los primeros 13 ejecutivos principales
    const ejecutivosPrincipales = executiveTree.slice(0, 13);

    ejecutivosPrincipales.forEach((ejecutivo) => {
      // Agregar el ejecutivo principal
      usuariosValidadores.push({
        ...ejecutivo,
        usuario: ejecutivo.usuario || ejecutivo.Usuario || "",
        nombreEjecutivo: ejecutivo.nombreEjecutivo || "",
        displayName: `${ejecutivo.usuario || ejecutivo.Usuario || ""} - ${
          ejecutivo.nombreEjecutivo || ""
        }`,
        nivelJerarquia: 1,
        esSubordinado: false,
        seleccionado: false,
      });

      // Agregar sus subordinados si los tiene
      if (
        Array.isArray(ejecutivo.subordinados) &&
        ejecutivo.subordinados.length > 0
      ) {
        ejecutivo.subordinados.forEach((subordinado) => {
          usuariosValidadores.push({
            usuario: subordinado.usuario || subordinado.Usuario || "",
            nombreEjecutivo: subordinado.nombreEjecutivo || "",
            displayName: `${
              subordinado.usuario || subordinado.Usuario || ""
            } - ${subordinado.nombreEjecutivo || ""}`,
            idEjecutivo:
              subordinado.idEjecutivo ||
              subordinado.idejecutivo ||
              subordinado.id ||
              "",
            idEncargado: subordinado.idEncargado || ejecutivo.idEjecutivo,
            nivelJerarquia: 2,
            esSubordinado: true,
            encargadoPadre: ejecutivo.usuario,
            seleccionado: false,
          });
        });
      }
    });

    return usuariosValidadores;
  }, [executiveTree]);

  // Actualizar usuariosValidadores cuando cambie usuariosFiltrados
  useEffect(() => {
    setUsuariosValidadores(usuariosFiltrados);
  }, [usuariosFiltrados]);

  // Calcular contador de validadores asignados vs total
  const contadorValidadores = useMemo(() => {
    const totalValidadores = usuariosValidadores.length;
    const validadoresAsignados = usuariosValidadores.filter(
      (u) => u.seleccionado
    ).length;
    return { asignados: validadoresAsignados, total: totalValidadores };
  }, [usuariosValidadores]);

  // Efecto para comunicar cambios al componente padre (para el footer)
  useEffect(() => {
    if (onFooterDataChange) {
      onFooterDataChange({
        lastAction,
        lastUser,
        producto,
        arrepentimientos,
        isProcessingChange,
      });
    }
  }, [
    lastAction,
    lastUser,
    producto,
    arrepentimientos,
    isProcessingChange,
    onFooterDataChange,
  ]);

  // Función para obtener idProducto basado en la selección
  const getIdProducto = useCallback(() => {
    switch (producto) {
      case "Amex":
        return 1;
      default:
        return null;
    }
  }, [producto]);

  // Efecto para limpiar el estado de la última acción cuando cambie el tipo de validador
  useEffect(() => {
    // Limpiar el estado de la última acción cuando cambie entre normal y arrepentimientos
    setLastAction(null);
    setLastUser(null);
  }, [arrepentimientos]);

  // Efecto para obtener validadores cuando cambie el producto o arrepentimientos
  useEffect(() => {
    const idProducto = getIdProducto();
    if (idProducto && producto) {
      // Pasar el estado de arrepentimientos como parámetro
      fetchValidadores(idProducto, arrepentimientos);
    } else {
      // Si no hay producto seleccionado, limpiar validadores
      setValidadoresFromAPI([]);
    }
  }, [producto, arrepentimientos, getIdProducto, fetchValidadores]);

  // Efecto para actualizar checkboxes cuando cambien los validadores del API o la jerarquía
  useEffect(() => {
    if (validadoresFromAPI.length > 0 && usuariosValidadores.length > 0) {
      // Crear un Set con los idEjecutivo de los validadores para búsqueda rápida
      const validadoresIds = new Set(
        validadoresFromAPI.map((v) => v.idEjecutivo)
      );

      setUsuariosValidadores((prev) => {
        const updated = prev.map((usuario) => ({
          ...usuario,
          seleccionado: validadoresIds.has(usuario.idEjecutivo),
        }));

        const selectedCount = updated.filter((u) => u.seleccionado).length;
        console.log(` ${selectedCount} ejecutivos marcados automáticamente`);

        return updated;
      });
    }
  }, [validadoresFromAPI, usuariosValidadores.length]);

  // Función para enviar cambio de validador al servidor
  const sendValidatorChange = useCallback(
    async (idEjecutivo, inserta) => {
      // Evitar múltiples llamadas simultáneas
      if (isProcessingChange) {
        return;
      }

      const idProducto = getIdProducto();

      if (!idProducto) {
        toast.error("No se puede enviar cambio: producto no seleccionado");
        return;
      }

      const body = {
        idEjecutivo: idEjecutivo,
        idProducto: idProducto,
        inserta: inserta,
      };

      setIsProcessingChange(true);

      try {
        // Usar el endpoint correcto según el tipo de validador
        const response = arrepentimientos
          ? await InsertDeletedValidatorsRegrets(body)
          : await InsertDeletedValidators(body);

        console.log(
          `Cambio de validador ${
            inserta ? "insertado" : "eliminado"
          } correctamente (${
            arrepentimientos ? "ARREPENTIMIENTOS" : "NORMAL"
          }):`,
          response
        );

        // Encontrar el nombre del usuario para el mensaje del footer
        const usuarioData = usuariosValidadores.find(
          (u) => u.idEjecutivo === idEjecutivo
        );
        const nombreUsuario =
          usuarioData?.displayName ||
          usuarioData?.usuario ||
          `ID: ${idEjecutivo}`;

        // Actualizar estados para el footer
        setLastAction(inserta ? "added" : "removed");
        setLastUser(nombreUsuario);

        // Solo mostrar toast de éxito en casos específicos si es necesario
        // toast.success(`Validador ${inserta ? 'agregado' : 'removido'} exitosamente`);
      } catch (error) {
        console.error(
          `Error al ${inserta ? "insertar" : "eliminar"} validador (${
            arrepentimientos ? "ARREPENTIMIENTOS" : "NORMAL"
          }):`,
          error
        );
        // Solo mostrar toast de error, evitando duplicados
        toast.error(`Error al ${inserta ? "agregar" : "remover"} validador`);
      } finally {
        // Pequeño delay para evitar cambios muy rápidos
        setTimeout(() => {
          setIsProcessingChange(false);
        }, 300);
      }
    },
    [
      getIdProducto,
      isProcessingChange,
      arrepentimientos,
      usuariosValidadores,
      setLastAction,
      setLastUser,
    ]
  );

  // Handler para seleccionar/deseleccionar usuarios
  const handleSeleccionarUsuario = async (usuario, index) => {
    // Evitar cambios múltiples mientras se procesa
    if (isProcessingChange) {
      console.log("Cambio en proceso, esperando...");
      return;
    }

    const usuarioActual = usuariosValidadores[index];
    const nuevoEstado = !usuarioActual.seleccionado;

    // Actualizar el estado local inmediatamente para mejor UX
    setUsuariosValidadores((prev) => {
      const updated = prev.map((u, i) =>
        i === index ? { ...u, seleccionado: nuevoEstado } : u
      );

      // Log para debug
      const selectedUsers = updated
        .filter((u) => u.seleccionado)
        .map((u) => u.displayName);
      console.log("Usuarios seleccionados para validadores:", selectedUsers);

      return updated;
    });

    // Enviar cambio al servidor
    await sendValidatorChange(usuarioActual.idEjecutivo, nuevoEstado);
  };

  return (
    <div
      className="flex flex-col md:flex-row w-full h-full gap-4 overflow-y-auto max-h-[90vh]"
      style={{ maxHeight: '130vh', overflowY: 'auto' }}
    >
      {/* Árbol a la izquierda en desktop, arriba en mobile */}
      <div className="w-full md:flex-1 flex flex-col order-2 md:order-1 mt-4 md:mt-0">
        <div
          className="flex flex-col bg-white border border-[var(--color-jerarquia1)] rounded-lg p-4 h-full"
        >
          <label
            className="modal-span-1"
            style={{ color: "var(--color-jerarquia3)" }}
          >
            Validadores ({contadorValidadores.asignados} / {contadorValidadores.total})
            {isLoadingValidadores && (
              <span style={{ marginLeft: "0.5rem", color: "var(--color-jerarquia2)", fontSize: "0.8rem" }}>
                (Cargando...)
              </span>
            )}
          </label>
          <div className="border border-[var(--color-jerarquia1)] rounded-lg bg-white flex-1 overflow-hidden mt-2">
            <div className="scrollbar-gray overflow-y-auto h-full w-full p-2">
              {/* Árbol recursivo con checkboxes y estilo metas */}
              {(() => {
                // Replica el estilo exacto de indentación y stacking del árbol de metas
                const renderValidadorTree = (tree, level = 0) => {
                  if (!Array.isArray(tree)) return null;
                  return tree.map((node, idx) => {
                    const indexUV = usuariosValidadores.findIndex(u => u.idEjecutivo === node.idEjecutivo);
                    const isChecked = indexUV !== -1 ? usuariosValidadores[indexUV].seleccionado : false;
                    return (
                      <React.Fragment key={node.usuario || node.idEjecutivo || idx}>
                        <div
                          className={
                            `executive-hierarchy-item flex items-center${isChecked ? ' selected' : ''}`
                          }
                          style={{
                            paddingLeft: level * 18,
                            marginBottom: 2,
                            fontWeight: 500,
                            fontSize: 13,
                            color: '#2b463c',
                            userSelect: 'none',
                            opacity: !producto ? 0.5 : 1,
                            pointerEvents: !producto ? 'none' : 'auto',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            disabled={!producto}
                            className="modal-checkbox-small mr-2"
                            onChange={e => {
                              e.stopPropagation();
                              if (producto && indexUV !== -1) handleSeleccionarUsuario(node.usuario, indexUV);
                            }}
                          />
                          <span
                            style={{
                              cursor: !producto ? 'not-allowed' : 'pointer',
                              userSelect: 'none',
                            }}
                            onClick={() => { if (producto && indexUV !== -1) handleSeleccionarUsuario(node.usuario, indexUV); }}
                          >
                            {node.usuario} - {node.nombreEjecutivo}
                          </span>
                        </div>
                        {Array.isArray(node.subordinados) && node.subordinados.length > 0 && (
                          renderValidadorTree(node.subordinados, level + 1)
                        )}
                      </React.Fragment>
                    );
                  });
                };
                return executiveTree.length === 0 ? (
                  <div
                    style={{ textAlign: 'center', padding: '1rem', color: '#666', fontStyle: 'italic' }}
                  >
                    {!producto
                      ? 'Selecciona un producto para ver los validadores'
                      : 'No hay usuarios disponibles'}
                  </div>
                ) : (
                  renderValidadorTree(executiveTree, 1)
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Controles a la derecha en desktop, abajo en mobile */}
      <div className="w-full md:w-[320px] flex flex-col items-center md:items-stretch order-1 md:order-2">
        {/* Logo arriba en mobile, a la derecha en desktop */}
        <div className="flex justify-center items-center bg-white p-4 w-full order-1">
          <img
            src={ConsorcioLogo}
            alt="Consorcio Jurídico"
            style={{ height: "70px", width: "auto", objectFit: "contain" }}
          />
            </div>
        {/* Controles: Cartera, Producto, Arrepentimientos */}
        <div className="flex flex-col gap-2 w-full order-2 px-2 md:px-0 mt-2">
          <div className="relative w-full mb-2">
            <select
              className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
              value={cartera}
              onChange={e => setCartera(e.target.value)}
              id="cartera-select"
            >
              <option value="american_express">American Express</option>
              {/* Agrega aquí más opciones de cartera si es necesario */}
            </select>
            <label
              htmlFor="cartera-select"
              className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
            >
              Cartera
            </label>
          </div>
          <div className="relative w-full mb-2">
            <select
              className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
              value={producto}
              onChange={e => setProducto(e.target.value)}
              id="producto-select"
            >
              <option value="" disabled hidden></option>
              <option value="Amex">American Express</option>
            </select>
            <label
              htmlFor="producto-select"
              className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
            >
              Producto
            </label>
          </div>
          <div
            className="flex items-center gap-2 justify-center md:justify-start opacity-100"
            style={{ opacity: !producto ? 0.5 : 1 }}
          >
            <input
              type="checkbox"
              id="arrepentimientos"
              checked={arrepentimientos}
              disabled={!producto}
              onChange={(e) => setArrepentimientos(e.target.checked)}
              style={{ width: "1rem", height: "1rem", accentColor: "var(--color-jerarquia1)" }}
            />
            <label
              htmlFor="arrepentimientos"
              style={{ fontSize: "0.875rem", fontWeight: "500", cursor: !producto ? "not-allowed" : "pointer", color: "var(--color-jerarquia3)" }}
            >
              Arrepentimientos
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalValidadoresContent;
