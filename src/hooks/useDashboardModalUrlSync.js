import { useEffect } from "react";

export function useDashboardModalUrlSync(context, modalName) {
  useEffect(() => {
    if (modalName) {
      // Cuando hay modal abierto, mostrar /SideBar/nombreModal
      const newPath = `/${context}/${modalName}`;
      window.history.replaceState(null, "", newPath);
    } else {
      // Cuando no hay modal, volver a /dashboardPage/
      window.history.replaceState(null, "", "/dashboardPage/");
    }
  }, [context, modalName]);
}
