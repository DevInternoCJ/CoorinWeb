import React, { useState, useEffect, useMemo, useCallback } from "react";
import JerarquiaConR from "../../branchs/JerarquiaConR";
import ConsorcioLogo from "../../../../../assets/logo_coorin_5.svg";
import {
  obetenerJerarquiaEncargados,
  ValidatorsNormal,
  Validatorsregrets,
  InsertDeletedValidators,
  InsertDeletedValidatorsRegrets,
} from "../../../../../services/mark/albaz/LokiServices";
import { toast } from "sonner";


function ModalValidadoresContent(props) {
  // Todos los hooks y lógica van dentro de la función principal
  const [executiveTree, setExecutiveTree] = useState([]);
  const [usuariosValidadores, setUsuariosValidadores] = useState([]);
  const [arrepentimientos, setArrepentimientos] = useState(false);
  const [validadoresFromAPI, setValidadoresFromAPI] = useState([]);
  const [isLoadingValidadores, setIsLoadingValidadores] = useState(false);
  const [isProcessingChange, setIsProcessingChange] = useState(false);
  // Estados para el footer
  const [lastAction, setLastAction] = useState(null); // 'added' | 'removed' | null
  const [lastUser, setLastUser] = useState(null);
  const [producto, setProducto] = useState("");
  const [cartera, setCartera] = useState("american_express");
  const { onFooterDataChange } = props;
  // Función para obtener validadores del API
  const fetchValidadores = useCallback(
    async (idProducto, esArrepentimientos = false) => {
      if (!idProducto) return;
      setIsLoadingValidadores(true);
      try {
        let response;
        if (esArrepentimientos) {
          response = await Validatorsregrets(idProducto);
        } else {
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
      className="flex flex-col md:flex-row w-full h-full gap-4"
      style={{ minWidth: '18.75rem' }}
    >
      {/* Árbol a la izquierda en desktop, arriba en mobile */}
      <div
        className="flex flex-col order-2 md:order-1 mt-4 md:mt-0"
        style={{ width: '18.75rem', minWidth: '18.75rem', maxWidth: '18.75rem' }}
      >
        {/* Label y árbol directamente en el layout principal */}
        {/* Solo el contador, sin mostrar usuario de sesión arriba del árbol */}
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
        {executiveTree.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '1rem', color: '#666', fontStyle: 'italic' }}>
            {!producto
              ? 'Selecciona un producto para ver los validadores'
              : 'No hay usuarios disponibles'}
          </div>
        ) : (
          <JerarquiaConR
            executiveTree={executiveTree}
            useCheckbox={true}
            usuariosValidadores={usuariosValidadores}
            handleSeleccionarUsuario={handleSeleccionarUsuario}
            producto={producto}
            style={{ height: '100%', width: '100%' }}
          />
        )}
      </div>

      {/* Controles a la derecha en desktop, abajo en mobile */}
      <div
      className="flex flex-col items-center md:items-stretch order-1 md:order-2 mx-auto md:mx-0"
      style={{ width: '14rem', minWidth: '14rem', maxWidth: '14rem' }}
      >
        {/* Logo arriba en mobile, a la derecha en desktop */}
        <div className="flex justify-center items-center bg-white p-4 w-full order-1">
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={ConsorcioLogo}
              alt="Consorcio Jurídico"
              style={{ height: "70px", width: "auto", objectFit: "contain", display: 'block', margin: '0 auto' }}
            />
          </div>
        </div>
        {/* Controles: Cartera, Producto, Arrepentimientos */}
        <div className="flex flex-col gap-2 w-full order-2 px-2 md:px-0 mt-2" style={{ alignContent: 'center' }}>
          <div className="relative mb-2" style={{ width: '14rem', minWidth: '14rem', maxWidth: '12.5rem', alignContent: 'center' }}>
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
          <div className="relative mb-2" style={{ width: '14rem', minWidth: '14rem', maxWidth: '12.5rem', alignContent: 'center' }}>
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
