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

  // Limpiar estados al cerrar el modal (cuando isOpen pasa a false)
  useEffect(() => {
    if (props.isOpen === false) {
      setExecutiveTree([]);
      setUsuariosValidadores([]);
      setValidadoresFromAPI([]);
      setIsLoadingValidadores(false);
      setIsProcessingChange(false);
      setLastAction(null);
      setLastUser(null);
    }
  }, [props.isOpen]);
  // Resetear estados al cerrar el modal
  useEffect(() => {
    if (typeof props.onClose === 'function') {
      // Suscribirse al evento de cierre del modal
      const handleClose = () => {
        setExecutiveTree([]);
        setUsuariosValidadores([]);
        setValidadoresFromAPI([]);
        setIsLoadingValidadores(false);
        setIsProcessingChange(false);
        setLastAction(null);
        setLastUser(null);
      };
      props.onClose(handleClose);
      // Limpiar suscripción si el componente se desmonta
      return () => {
        if (props.onClose) props.onClose(null);
      };
    }
  }, [props.onClose]);
  useEffect(() => {
    if (!props.producto) {
      toast.info("Primero debe seleccionar un producto para activar los validadores.");
    }
  }, []);
  // Todos los hooks y lógica van dentro de la función principal
  const [executiveTree, setExecutiveTree] = useState([]);
  const [usuariosValidadores, setUsuariosValidadores] = useState([]);
  const arrepentimientos = props.arrepentimientos ?? false;
  const [validadoresFromAPI, setValidadoresFromAPI] = useState([]);
  const [isLoadingValidadores, setIsLoadingValidadores] = useState(false);
  const [isProcessingChange, setIsProcessingChange] = useState(false);
  // Estados para el footer
  const [lastAction, setLastAction] = useState(null); // 'added' | 'removed' | null
  const [lastUser, setLastUser] = useState(null);
  const { onFooterDataChange, producto, cartera } = props;
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
          userData?.idEjecutivo;
        const usuarioSesion = userData?.usuario || userData?.Usuario || "";
        const nombreSesion = userData?.nombreEjecutivo || userData?.nombre || "";
        if (!idEjecutivo) return;
        const data = await obetenerJerarquiaEncargados(idEjecutivo);
        // Filtrar solo ejecutivos propios de nivel 1 (simula tvDependientes.CargaEjecutivosPropios(1))
        const hijos = Array.isArray(data)
          ? data
              .filter(e => (e.jerarquia === undefined || e.jerarquia > 0)) // Solo excluye jerarquía <= 0
              .map((e) => ({
                usuario: e.usuario,
                nombreEjecutivo: e.nombreEjecutivo || "",
                subordinados: Array.isArray(e.subordinados)
                  ? e.subordinados.filter(s => (s.jerarquia === undefined || s.jerarquia > 0)) // Solo excluye jerarquía <= 0 en subordinados
                  : [],
                idEjecutivo: e.idEjecutivo,
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

    // Función recursiva para recorrer toda la jerarquía y agregar ejecutivos válidos
    const recolectarEjecutivos = (ejecutivo, nivel = 1, encargadoPadre = null) => {
      const lista = [];
      if (ejecutivo && (ejecutivo.jerarquia === undefined || ejecutivo.jerarquia > 0)) {
        lista.push({
          usuario: ejecutivo.usuario || ejecutivo.Usuario || "",
          nombreEjecutivo: ejecutivo.nombreEjecutivo || "",
          displayName: `${ejecutivo.usuario || ejecutivo.Usuario || ""} - ${ejecutivo.nombreEjecutivo || ""}`,
          idEjecutivo: ejecutivo.idEjecutivo || ejecutivo.idejecutivo || ejecutivo.id || "",
          idEncargado: ejecutivo.idEncargado || null,
          nivelJerarquia: nivel,
          esSubordinado: nivel > 1,
          encargadoPadre: encargadoPadre,
          seleccionado: false,
          jerarquia: ejecutivo.jerarquia || 1,
        });
      }
      if (Array.isArray(ejecutivo.subordinados) && ejecutivo.subordinados.length > 0) {
        ejecutivo.subordinados.forEach(sub => {
          lista.push(...recolectarEjecutivos(sub, nivel + 1, ejecutivo.usuario));
        });
      }
      return lista;
    };

    // Recorrer todos los nodos raíz
    let usuariosValidadores = [];
    executiveTree.forEach(ejecutivo => {
      usuariosValidadores.push(...recolectarEjecutivos(ejecutivo, 1, null));
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
        cartera,
        contadorValidadores,
        isLoadingValidadores,
        nodoSesion: executiveTree.length > 0 ? executiveTree[0] : null
      });
    }
  }, [
    lastAction,
    lastUser,
    producto,
    arrepentimientos,
    isProcessingChange,
    onFooterDataChange,
    cartera,
    contadorValidadores,
    isLoadingValidadores,
    executiveTree
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
      toast.info("Cambio en proceso, esperando...");
      return;
    }

    const usuarioActual = usuariosValidadores[index];
    const nuevoEstado = !usuarioActual.seleccionado;

    // Mostrar los datos completos del ejecutivo seleccionado, incluyendo jerarquía
    console.log("Ejecutivo seleccionado:", usuarioActual);

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
    try {
      await sendValidatorChange(usuarioActual.idEjecutivo, nuevoEstado);
      toast.success(
        nuevoEstado
          ? `Usuario ${usuarioActual.displayName} agregado como validador.`
          : `Usuario ${usuarioActual.displayName} removido como validador.`
      );
    } catch (error) {
      toast.error("Error al actualizar validador. Intenta de nuevo.");
    }
  };

  // El contador y el checkbox ahora se pasan al header, así que solo renderizamos el árbol y mensajes aquí
  return (
    <div
      className="grid grid-cols-1 gap-2 w-full h-full min-w-[18.75rem] max-w-full"
      style={{ minWidth: '18.75rem' }}
    >

          <JerarquiaConR
            executiveTree={executiveTree}
            useCheckbox={true}
            usuariosValidadores={usuariosValidadores}
            handleSeleccionarUsuario={handleSeleccionarUsuario}
            producto={producto}
            style={{ height: '100%', width: '100%' }}
            omitSessionExecutive={true}
          />
      
    </div>
  );
};

export default ModalValidadoresContent;
