import React, { useEffect, useState } from "react";
import JerarquiaConR from "../../branchs/JerarquiaConR.jsx";
import { obetenerJerarquiaEncargados } from "../../../../../services/mark/Orochi/LokiServices.js";

const TreeMetas = ({
  setSelectedExecutives,
  setSelectedRows,
  selectedExecutiveNode,
  setSelectedExecutiveNode,
}) => {
  const [executiveTree, setExecutiveTree] = useState([]);
  const [loadingJerarquia, setLoadingJerarquia] = useState(false);
  const [errorJerarquia, setErrorJerarquia] = useState(null);
  const [allHierarchyIds, setAllHierarchyIds] = useState([]);

  useEffect(() => {
    const fetchExecutiveTree = async () => {
      setLoadingJerarquia(true);
      setErrorJerarquia(null);
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const idEjecutivo =
          userData?.idEjecutivo ||
          userData?.idejecutivo ||
          userData?.id ||
          null;
        const usuario = userData?.usuario || "";
        const nombreEjecutivo =
          userData?.nombre ||
          userData?.nombreEjecutivo ||
          userData?.ejecutivo ||
          "";
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
      if (
        Array.isArray(rootNode.subordinados) &&
        rootNode.subordinados.length > 0
      ) {
        const idsSubordinados = rootNode.subordinados
          .map((sub) => Number(sub.idEjecutivo))
          .filter((id) => Number.isInteger(id) && id > 0);
        setSelectedExecutives(idsSubordinados);
        setSelectedExecutiveNode(idEjecutivo);
      } else if (idEjecutivo) {
        setSelectedExecutives([Number(idEjecutivo)]);
        setSelectedExecutiveNode(idEjecutivo);
      }
      const allIds = getAllHierarchyIds(rootNode)
        .map((id) => Number(id))
        .filter((id) => Number.isInteger(id) && id > 0);
      setAllHierarchyIds(allIds);
    } else {
      setAllHierarchyIds([]);
    }
  }, [executiveTree, setSelectedExecutiveNode, setSelectedExecutives]);

  return (
    <div
      className="metas-block metas-block-1 w-full lg:w-auto bg-white rounded-lg shadow border border-[var(--color-jerarquia1)] p-1.5"
      style={{ fontSize: "0.92em" }}
    >
      <JerarquiaConR
        executiveTree={executiveTree}
        loadingJerarquia={loadingJerarquia}
        errorJerarquia={errorJerarquia}
        selectedExecutiveNode={selectedExecutiveNode}
        allHierarchyIds={allHierarchyIds}
        setSelectedExecutives={setSelectedExecutives}
        setSelectedRows={setSelectedRows}
        setSelectedExecutiveNode={setSelectedExecutiveNode}
      />
    </div>
  );
};

export default TreeMetas;
