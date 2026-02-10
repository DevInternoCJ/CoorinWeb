import React, { useEffect, useState, useMemo } from "react";
import {
  obetenerJerarquiaEncargados,
  asignaEjecutivoCampanas,
  UsuarioRestante,
} from "../../../../../services/mark/Orochi/LokiServices";
import { toast } from "sonner";

const ModalConsultaCuentasColumnas = ({ idCampaña, nombreCampaña }) => {
  const [executiveTree, setExecutiveTree] = useState([]);
  const [loadingRow, setLoadingRow] = useState(null);
  const [loadingRestantes, setLoadingRestantes] = useState(false);

  useEffect(() => {
    const fetchExecutives = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const idEjecutivo = userData?.idEjecutivo;
        if (!idEjecutivo) {
          console.warn("No se encontró idEjecutivo en userData");
          return;
        }
        const data = await obetenerJerarquiaEncargados(idEjecutivo);
        const mapped = Array.isArray(data)
          ? data.map((e) => ({
              usuario: e.usuario || e.Usuario || "",
              nombreEjecutivo: e.nombreEjecutivo || "",
              asignado: e.asignado ?? false,
              restantes: e.restantes ?? 0,
              subordinados: Array.isArray(e.subordinados) ? e.subordinados : [],
              idEjecutivo: e.idEjecutivo || e.idejecutivo || e.id || "",
              idEncargado: e.idEncargado || null,
              sesionAbierta: e.sesionAbierta ?? false,
              bloqueado: e.bloqueado,
            }))
          : [];

        console.log("Ejecutivos cargados del endpoint:", mapped.length);
        setExecutiveTree(mapped);
      } catch (error) {
        console.error("Error al cargar ejecutivos:", error);
        toast.error("Error al cargar la lista de ejecutivos");
        setExecutiveTree([]);
      }
    };
    fetchExecutives();
  }, []);

  // Consumir UsuarioRestante cada vez que cambie idCampaña
  useEffect(() => {
    if (!idCampaña) {
      console.log("No hay idCampaña, saltando fetchRestantes");
      return;
    }

    const fetchRestantes = async () => {
      setLoadingRestantes(true);
      try {
        console.log("Llamando a UsuarioRestante con idCampaña:", idCampaña);
        const respuesta = await UsuarioRestante(idCampaña);
        console.log("Respuesta UsuarioRestante:", respuesta);

        // Verificar si la respuesta tiene la estructura esperada
        if (!respuesta) {
          console.warn("Respuesta vacía de UsuarioRestante");
          return;
        }

        // Manejar diferentes estructuras de respuesta
        const data = respuesta.data || respuesta;
        
        if (Array.isArray(data) && data.length > 0) {
          setExecutiveTree((prev) =>
            prev.map((ej) => {
              const encontrado = data.find(
                (r) => r.idEjecutivo === ej.idEjecutivo || r.IdEjecutivo === ej.idEjecutivo
              );
              return encontrado
                ? { 
                    ...ej, 
                    restantes: encontrado.Restantes || encontrado.restantes || 0, 
                    asignado: true 
                  }
                : { ...ej, restantes: 0, asignado: false };
            })
          );

          if (nombreCampaña) {
            toast.success(`Datos cargados para "${nombreCampaña}"`);
          }
        } else {
          console.log("No se encontraron datos en la respuesta");
          // Resetear a valores por defecto
          setExecutiveTree((prev) =>
            prev.map((ej) => ({
              ...ej,
              restantes: 0,
              asignado: false,
            }))
          );
        }
      } catch (error) {
        console.error("Error completo al consumir UsuarioRestante:", error);
        console.error("Error response:", error.response);
        console.error("Error message:", error.message);

        // Verificar si es un error 404 (No se encontraron datos)
        if (error.response?.status === 404) {
          const mensajeError = nombreCampaña
            ? `No hay ejecutivos asignados a "${nombreCampaña}"`
            : "No se encontraron datos para esta campaña";
          toast.info(mensajeError); // Cambié a toast.info porque es informativo, no un error crítico

          // Limpiar todos los checkboxes
          setExecutiveTree((prev) =>
            prev.map((ej) => ({
              ...ej,
              restantes: 0,
              asignado: false,
            }))
          );
        } else if (error.response?.status === 400) {
          toast.error("Solicitud incorrecta al servidor");
        } else if (error.response?.status === 500) {
          toast.error("Error interno del servidor");
        } else {
          // Error de red u otro tipo
          const errorMsg = error.message || "Error al cargar datos de ejecutivos";
          toast.error(errorMsg);
        }
      } finally {
        setLoadingRestantes(false);
      }
    };

    fetchRestantes();
  }, [idCampaña, nombreCampaña]);

  // Mostrar todos los ejecutivos de la jerarquía con hijos al final
  const ejecutivosOrdenados = useMemo(() => {
    if (!executiveTree.length) return [];

    const ejecutivosFiltrados = [];
    const ejecutivosPrincipales = executiveTree;
    const listaEjecutivosPrincipales = [];
    const listaSubordinados = [];

    ejecutivosPrincipales.forEach((ejecutivo) => {
      listaEjecutivosPrincipales.push({
        ...ejecutivo,
        nivelJerarquia: 1,
        esSubordinado: false,
      });

      if (
        Array.isArray(ejecutivo.subordinados) &&
        ejecutivo.subordinados.length > 0
      ) {
        ejecutivo.subordinados.forEach((subordinado) => {
          listaSubordinados.push({
            usuario: subordinado.usuario || subordinado.Usuario || "",
            asignado: subordinado.asignado ?? false,
            restantes: subordinado.restantes ?? 0,
            subordinados: subordinado.subordinados ?? [],
            idEjecutivo:
              subordinado.idEjecutivo ||
              subordinado.idejecutivo ||
              subordinado.id ||
              "",
            idEncargado: subordinado.idEncargado || ejecutivo.idEjecutivo,
            nivelJerarquia: 2,
            esSubordinado: false,
            encargadoPadre: ejecutivo.usuario,
          });
        });
      }
    });

    listaSubordinados.reverse();
    ejecutivosFiltrados.push(
      ...listaEjecutivosPrincipales,
      ...listaSubordinados,
    );

    return ejecutivosFiltrados;
  }, [executiveTree]);

  // Calcular contador de ejecutivos asignados vs total
  const contadorEjecutivos = useMemo(() => {
    const totalEjecutivos = ejecutivosOrdenados.length;
    const ejecutivosAsignados = ejecutivosOrdenados.filter(
      (e) => e.asignado,
    ).length;
    return { asignados: ejecutivosAsignados, total: totalEjecutivos };
  }, [ejecutivosOrdenados]);

  // Handler para asignar ejecutivo a campaña
  const handleAsignar = async (checked, row, idx) => {
    if (!idCampaña || !row.idEjecutivo) {
      toast.error("Faltan datos para asignar el ejecutivo");
      return;
    }
    
    setLoadingRow(idx);
    try {
      console.log("Asignando ejecutivo:", {
        checked,
        idCampaña,
        idEjecutivo: row.idEjecutivo,
      });

      const response = await asignaEjecutivoCampanas(
        checked,
        idCampaña,
        row.idEjecutivo,
      );

      console.log("Respuesta de asignación:", response);

      // Si la respuesta fue exitosa, actualiza el estado
      if (response?.data?.success || response?.status === 200) {
        setExecutiveTree((prev) =>
          prev.map((r) => 
            r.idEjecutivo === row.idEjecutivo 
              ? { ...r, asignado: checked } 
              : r
          )
        );
        toast.success(
          checked 
            ? `Ejecutivo ${row.usuario} asignado` 
            : `Ejecutivo ${row.usuario} desasignado`
        );
      }
    } catch (error) {
      console.error("Error al asignar ejecutivo:", error);
      toast.error("Error al actualizar la asignación");
    } finally {
      setLoadingRow(null);
    }
  };

  return (
    <div
      className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] h-full flex flex-col"
      style={{ minWidth: 0, width: "300px", maxWidth: "300px" }}
    >
      <div className="flex items-center mb-2 w-full">
        <span
          className="modal-span-1 pl-1"
          style={{ color: "var(--color-jerarquia2)", minWidth: 80 }}
        >
          Ejecutivos ({contadorEjecutivos.asignados} /{" "}
          {contadorEjecutivos.total})
        </span>
        {loadingRestantes && (
          <span className="ml-2 text-xs text-gray-500">Cargando...</span>
        )}
      </div>
      <div
        style={{
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: "45vh",
          height: "100%",
          flex: 1,
          width: "100%",
          maxWidth: "100%",
        }}
        className="scrollbar-gray"
      >
        <table
          className="modal-table text-base"
          style={{
            borderCollapse: "collapse",
            tableLayout: "fixed",
            minWidth: "260px",
            width: "100%",
            maxWidth: "260px",
          }}
        >
          <thead>
            <tr>
              <th
                className="modal-table-th"
                style={{
                  padding: "2px 2px",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textAlign: "center",
                  width: "32px",
                  minWidth: "22px",
                  position: "sticky",
                  top: 0,
                  zIndex: 2,
                }}
              >
                Asignado
              </th>
              <th
                className="modal-table-th"
                style={{
                  padding: "2px 2px",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textAlign: "center",
                  width: "80px",
                  minWidth: "40px",
                  position: "sticky",
                  top: 0,
                  zIndex: 2,
                }}
              >
                Usuario
              </th>
              <th
                className="modal-table-th"
                style={{
                  padding: "2px 2px",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textAlign: "center",
                  width: "32px",
                  minWidth: "22px",
                  position: "sticky",
                  top: 0,
                  zIndex: 2,
                }}
              >
                Restantes
              </th>
            </tr>
          </thead>
          <tbody>
            {ejecutivosOrdenados.map((row, i) => (
              <tr
                key={row.idEjecutivo || i}
                style={{
                  background: row.asignado
                    ? "var(--color-jerarquia1)"
                    : undefined,
                }}
              >
                <td
                  className="modal-table-td"
                  style={{
                    padding: "2px 2px",
                    textAlign: "center",
                    width: "32px",
                    minWidth: "22px",
                  }}
                >
                  <div className="flex items-center justify-center">
                    <label
                      htmlFor={`switch-asignado-${row.idEjecutivo || i}`}
                      className="relative inline-block w-8 h-5 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id={`switch-asignado-${row.idEjecutivo || i}`}
                        className="peer sr-only"
                        checked={row.asignado || false}
                        disabled={loadingRow === i || loadingRestantes}
                        onChange={(e) =>
                          handleAsignar(e.target.checked, row, i)
                        }
                      />
                      <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-jerarquia3"></span>
                      <span className="absolute top-1/2 start-0.5 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
                      <span className="absolute top-1/2 start-0.5 -translate-y-1/2 flex justify-center items-center text-gray-500 peer-checked:text-white transition-colors duration-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={13}
                          height={13}
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                          ></path>
                        </svg>
                      </span>
                      <span className="absolute top-1/2 end-0.5 -translate-y-1/2 flex justify-center items-center text-gray-500 peer-checked:text-jerarquia3 transition-colors duration-200 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={13}
                          height={13}
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
                          ></path>
                        </svg>
                      </span>
                    </label>
                  </div>
                </td>
                <td
                  className="modal-table-td"
                  style={{
                    padding: "2px 2px",
                    textAlign: "center",
                    width: "80px",
                    minWidth: "40px",
                    fontFamily: "monospace",
                    letterSpacing: "1px",
                    fontSize: "0.9rem",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    {row.usuario}
                  </span>
                </td>
                <td
                  className="modal-table-td"
                  style={{
                    padding: "2px 2px",
                    textAlign: "center",
                    width: "32px",
                    minWidth: "22px",
                  }}
                >
                  {row.restantes ?? 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModalConsultaCuentasColumnas;