import React, { useEffect, useState, useMemo } from "react";
import {
  obetenerJerarquiaEncargados,
  asignaEjecutivoCampanas,
  UsuarioRestante,
} from "../../../../services/mark/albaz/LokiServices";
import { toast } from "sonner";

const ModalConsultaCuentasColumnas = ({ idCampaña, nombreCampaña }) => {
  const [executiveTree, setExecutiveTree] = useState([]);
  const [loadingRow, setLoadingRow] = useState(null); // Para mostrar loading en el row

  useEffect(() => {
    const fetchExecutives = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const idEjecutivo =
          userData?.idEjecutivo || userData?.idejecutivo || userData?.id;
        if (!idEjecutivo) return;
        const data = await obetenerJerarquiaEncargados(idEjecutivo);
        // Mapeo: estructura completa según el endpoint
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

        console.log("📊 Ejecutivos cargados del endpoint:", mapped.length);
        console.log("🔍 Estructura de datos:", mapped.slice(0, 2)); // Mostrar primeros 2 para debug
        setExecutiveTree(mapped);
      } catch (error) {
        console.error("Error al cargar ejecutivos:", error);
        setExecutiveTree([]);
      }
    };
    fetchExecutives();
  }, []);

  // Consumir UsuarioRestante cada vez que cambie idCampaña
  useEffect(() => {
    if (!idCampaña) return;
    const fetchRestantes = async () => {
      try {
        const respuesta = await UsuarioRestante(idCampaña);
        console.log("Respuesta UsuarioRestante:", respuesta);
        // Actualizar el campo 'restantes' y 'asignado' en la tabla de ejecutivos
        if (respuesta && Array.isArray(respuesta.data)) {
          setExecutiveTree((prev) =>
            prev.map((ej) => {
              const encontrado = respuesta.data.find(
                (r) => r.idEjecutivo === ej.idEjecutivo
              );
              return encontrado
                ? { ...ej, restantes: encontrado.Restantes, asignado: true }
                : { ...ej, restantes: 0, asignado: false };
            })
          );

          // Mostrar mensaje de éxito cuando se cargan datos para la campaña
          if (respuesta.data.length > 0 && nombreCampaña) {
            const mensajeExito = `Datos cargados para la campaña "${nombreCampaña}"`;
            toast.success(mensajeExito);
          }
        }
      } catch (error) {
        console.error("Error al consumir UsuarioRestante:", error);

        // Verificar si es un error 404 (No se encontraron datos)
        if (error.response?.status === 404) {
          const mensajeError = nombreCampaña
            ? `No se encontraron ejecutivos para la campaña "${nombreCampaña}"`
            : "No se encontraron datos";
          toast.error(mensajeError);

          // Limpiar todos los checkboxes (resetear asignado y restantes a valores por defecto)
          setExecutiveTree((prev) =>
            prev.map((ej) => ({
              ...ej,
              restantes: 0,
              asignado: false,
            }))
          );
        }
      }
    };
    fetchRestantes();
  }, [idCampaña, nombreCampaña]);

  // Mostrar todos los ejecutivos de la jerarquía con hijos al final
  const ejecutivosOrdenados = useMemo(() => {
    if (!executiveTree.length) return [];

    console.log("🔍 Mostrando TODOS los ejecutivos de la jerarquía...");
    console.log("📊 Total ejecutivos del endpoint:", executiveTree.length);

    const ejecutivosFiltrados = [];

    // Tomar TODOS los ejecutivos principales (sin límite)
    const ejecutivosPrincipales = executiveTree;

    // Separar principales y subordinados
    const listaEjecutivosPrincipales = [];
    const listaSubordinados = [];

    ejecutivosPrincipales.forEach((ejecutivo) => {
      // Agregar el ejecutivo principal a su lista
      listaEjecutivosPrincipales.push({
        ...ejecutivo,
        nivelJerarquia: 1,
        esSubordinado: false,
      });

      // Recopilar subordinados para agregar al final
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
            esSubordinado: false, // Quitar marca de subordinado para no mostrar indentación
            encargadoPadre: ejecutivo.usuario,
          });
        });
      }
    });

    // Ordenar subordinados en orden inverso (último hijo arriba, primer hijo abajo)
    listaSubordinados.reverse();

    // Combinar: primero ejecutivos principales, luego subordinados al final
    ejecutivosFiltrados.push(
      ...listaEjecutivosPrincipales,
      ...listaSubordinados
    );

    console.log(
      "✅ Ejecutivos mostrados (TODOS los principales + subordinados al final):",
      ejecutivosFiltrados.length
    );
    console.log(
      "📋 Ejecutivos principales:",
      listaEjecutivosPrincipales.map((e) => e.usuario)
    );
    console.log(
      "📋 Subordinados al final (orden inverso):",
      listaSubordinados.map((e) => `${e.usuario} (hijo de ${e.encargadoPadre})`)
    );

    return ejecutivosFiltrados;
  }, [executiveTree]);

  // Calcular contador de ejecutivos asignados vs total
  const contadorEjecutivos = useMemo(() => {
    const totalEjecutivos = ejecutivosOrdenados.length;
    const ejecutivosAsignados = ejecutivosOrdenados.filter(
      (e) => e.asignado
    ).length;
    return { asignados: ejecutivosAsignados, total: totalEjecutivos };
  }, [ejecutivosOrdenados]);

  // Handler para asignar ejecutivo a campaña
  const handleAsignar = async (checked, row, idx) => {
    if (!idCampaña || !row.idEjecutivo) return;
    setLoadingRow(idx);
    try {
      // inserta = checked (true/false), idCampaña = prop, idEjecutivo = row.idEjecutivo
      const response = await asignaEjecutivoCampanas(
        checked,
        idCampaña,
        row.idEjecutivo
      );
      // Si la respuesta fue exitosa, actualiza el estado asignado
      if (response?.data?.success || response?.status === 200) {
        setExecutiveTree((prev) =>
          prev.map((r, i) => (i === idx ? { ...r, asignado: checked } : r))
        );
      }
    } catch (error) {
      console.error("Error al asignar ejecutivo:", error);
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
      </div>
      <div
        style={{
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: "35vh",
          height: "100%",
          flex: 1,
          width: "100%",
          maxWidth: "100%",
        }}
        className="scrollbar-gray"
      >
        <table
          className="modal-table"
          style={{
            borderCollapse: "collapse",
            tableLayout: "fixed",
            minWidth: "0",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th
                className="modal-table-th"
                style={{
                  padding: "2px 2px",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textAlign: "center",
                  width: "60px",
                  minWidth: "40px",
                }}
              >
                Asignado
              </th>
              <th
                className="modal-table-th"
                style={{
                  padding: "2px 2px",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textAlign: "center",
                  width: "80px",
                  minWidth: "60px",
                }}
              >
                Usuario
              </th>
              <th
                className="modal-table-th"
                style={{
                  padding: "2px 2px",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textAlign: "center",
                  width: "60px",
                  minWidth: "40px",
                }}
              >
                Restantes
              </th>
            </tr>
          </thead>
          <tbody>
            {ejecutivosOrdenados.map((row, i) => (
              <tr key={i}>
                <td
                  className="modal-table-td"
                  style={{
                    padding: "2px 2px",
                    textAlign: "center",
                    width: "60px",
                    minWidth: "40px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={row.asignado || false}
                    disabled={loadingRow === i}
                    className="modal-checkbox-small"
                    onChange={(e) => handleAsignar(e.target.checked, row, i)}
                  />
                </td>
                <td
                  className="modal-table-td"
                  style={{
                    padding: "2px 2px",
                    textAlign: "center",
                    width: "80px",
                    minWidth: "60px",
                    fontFamily: "monospace",
                    letterSpacing: "1px",
                    fontSize: "1rem",
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
                    width: "60px",
                    minWidth: "40px",
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
