import { useEffect } from "react";

export function useDashboardModalUrlSync(context, modalName) {
  useEffect(() => {
    if (modalName) {
      const newPath = `/${context}/${modalName}`;
      window.history.replaceState(null, "", newPath);
    }
    // Restaurar la URL al cerrar el modal
    return () => {
      window.history.replaceState(null, "", `/${context}`);
    };
  }, [context, modalName]);
}
