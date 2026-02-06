// useCommentsLogic.js
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { getCatalogoValueCard, UpdateComments, InserExpedientComments, LoadDrivesComments} from "../../../../../services/mark/Orochi/LokiServices";
import { useUserStore } from "../../../../../contextGlobal/userStore";

const VIEW_TYPES = Object.freeze({ ADD: "add", LIST: "list" });

export { VIEW_TYPES };

export const useViewManager = (initial = null) => {
  const [activeView, setActiveView] = useState(initial);
  const toggleView = useCallback((view) => {
    setActiveView((prev) => (prev === view ? null : view));
  }, []);
  return { activeView, toggleView };
};

export const useCommentForm = (initial = {}) => {
  const [selectedWallet, setSelectedWallet] = useState(initial.wallet ?? "");
  const [searchValue, setSearchValue] = useState(initial.search ?? "");
  const [commentText, setCommentText] = useState(initial.comment ?? "");
  const [selectedSituation, setSelectedSituation] = useState(initial.situation ?? "");

  const resetForm = useCallback(() => {
    setSelectedWallet("");
    setSearchValue("");
    setCommentText("");
    setSelectedSituation("");
  }, []);

  const getFormData = useCallback(
    () => ({
      wallet: selectedWallet,
      search: searchValue,
      comment: commentText,
      situation: selectedSituation,
    }),
    [selectedWallet, searchValue, commentText, selectedSituation]
  );

  return {
    selectedWallet,
    setSelectedWallet,
    searchValue,
    setSearchValue,
    commentText,
    setCommentText,
    selectedSituation,
    setSelectedSituation,
    resetForm,
    getFormData,
  };
};

export const useSituationCatalog = () => {
  const [situationOptions, setSituationOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        const data = await getCatalogoValueCard();
        console.log("Datos del catálogo de situaciones:", data);
        
        const allowedIds = [1001, 1002, 1003, 1012, 1030, 1042];
        const formatted = Array.isArray(data)
          ? data
              .filter((it) => allowedIds.includes(it.idValor))
              .map((it, idx) => ({
                value: it.idValor ?? `option-${idx}`,
                label: it.valor ?? it.detalle ?? String(it.idValor),
              }))
          : [];

        if (mounted) {
          setSituationOptions(formatted.length ? formatted : []);
          setError(null);
        }
      } catch (err) {
        console.error("Error al cargar catálogo:", err);
        if (mounted) {
          setError(err?.message ?? String(err));
          setSituationOptions([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCatalog();

    return () => {
      mounted = false;
    };
  }, []);

  return { situationOptions, loading, error };
};

/**
 * Hook para guardar comentarios normales (sin archivo)
 */
export const useSaveComment = ({ 
  form,
  situationOptions, 
  onSaveComment, 
  idCartera = 1,
  changeSituationActive = false,
} = {}) => {
  const user = useUserStore((state) => state.user);
  const idEjecutivo = user?.idEjecutivo;

  const handleSave = useCallback(async (opts = {}) => {
    const text = String(form.commentText || "").trim();

    console.log("handleSave invoked - commentText (trimmed):", text, {
      raw: form.commentText,
      length: text.length,
      selectedSituation: form.selectedSituation,
      searchValue: form.searchValue,
    });

    // si opts.allowEmpty es true, saltamos la validación de longitud
    if (!opts.allowEmpty && text.length < 10) {
      toast.error(`El comentario debe tener al menos 10 caracteres (actual: ${text.length}).`);
      const ta = document.getElementById("comment-textarea");
      if (ta) ta.focus();
      return false;
    }

    const selectedId = form.selectedSituation || null;

    // Validar la situación solo si el checkbox "Cambiar situacion" está activo
    if (changeSituationActive) {
      const isValidSituation = situationOptions.some(
        (opt) => String(opt.value) === String(selectedId),
      );

      if (selectedId && !isValidSituation) {
        toast.error("La situación seleccionada no es válida.");
        return false;
      }
    }

    const payload = {
      situacion: changeSituationActive ? 1 : 0,
      idSituacion: changeSituationActive
        ? (selectedId ? (isNaN(Number(selectedId)) ? selectedId : Number(selectedId)) : null)
        : 0,
      idCartera: idCartera || null,
      idCuenta: form.searchValue || null,
      comentario: form.commentText || null,
      idEjecutivo: idEjecutivo || null,
    };
    
    console.log("Payload completo para guardar:", payload);
    
    try {
      let resp;
      // Si la cartera seleccionada es 'expediente', usar el servicio específico
      if (String(form.selectedWallet).toLowerCase() === "expediente") {
        payload.esExpediente = true;
        resp = await InserExpedientComments(payload);
        toast.success("Comentario insertado correctamente (expediente)");
      } else {
        resp = await UpdateComments(payload);
        toast.success("Comentario actualizado correctamente");
      }

      if (onSaveComment) onSaveComment(form, resp);
      form.resetForm();
      return resp ?? true;
    } catch (err) {
      console.error(" Error guardando comentario:", err, err?.response?.data);
      
      let serverMsg = "Error al guardar comentario";
      const body = err?.response?.data;
      if (body) {
        if (typeof body === "string") {
          serverMsg = body;
        } else if (body?.message) {
          serverMsg = String(body.message);
        } else if (body?.errors && typeof body.errors === "object") {
          const parts = Object.entries(body.errors).map(([k, v]) => {
            if (Array.isArray(v)) return `${k}: ${v.join(", ")}`;
            return `${k}: ${String(v)}`;
          });
          serverMsg = parts.join(" | ");
        } else {
          try {
            serverMsg = JSON.stringify(body);
          } catch {
            serverMsg = String(body);
          }
        }
      } else if (err?.message) {
        serverMsg = String(err.message);
      }
        
      toast.error(serverMsg || "Error al guardar comentario");
      return false;
    }
  }, [
    form,
    situationOptions,
    onSaveComment,
    idCartera,
    idEjecutivo,
    changeSituationActive,
  ]);

  return { handleSave };
};

/**
 * Hook para guardar comentarios con archivo (carga masiva)
 */
export const useSaveCommentWithFile = ({ 
  form,  
  onSaveComment, 
  idCartera = 1,
  changeSituationActive = false,
} = {}) => {
  const user = useUserStore((state) => state.user);
  const idEjecutivo = user?.idEjecutivo;

  const handleSaveWithFile = useCallback(async (file) => {
    if (!file) {
      toast.error("Debe seleccionar un archivo");
      return false;
    }

    console.log(" Iniciando carga de archivo:", file.name);

    // Validar tamaño del archivo (máx 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`El archivo es demasiado grande. Tamaño máximo: 10MB`);
      return false;
    }

    // Validar tipo de archivo
    const allowedTypes = [
      'application/vnd.ms-excel', // .xls
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'text/csv', // .csv
    ];
    
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(xls|xlsx|csv)$/i)) {
      toast.error("Tipo de archivo no permitido. Use Excel (.xls, .xlsx) o CSV");
      return false;
    }

    // Preparar datos adicionales para enviar junto al archivo
    const datosAdicionales = {
      situacion: changeSituationActive ? 1 : 0,
      idSituacion: changeSituationActive
        ? (form.selectedSituation ? Number(form.selectedSituation) : 0)
        : 0,
      idCartera: idCartera || null,
      idCuenta: form.searchValue || null,
      comentario: form.commentText || null,
      idEjecutivo: idEjecutivo || null,
    };

    console.log(" Datos adicionales a enviar:", datosAdicionales);

    try {
      const resp = await LoadDrivesComments(file, datosAdicionales);
      
      console.log("Archivo cargado exitosamente:", resp);
      
      // Verificar cuántos registros se guardaron
      if (resp?.guardados !== undefined && resp?.total !== undefined) {
        if (resp.guardados < resp.total) {
          toast.warning(
            `Se guardaron ${resp.guardados} de ${resp.total} registros. Revise los errores.`
          );
          console.warn("Resumen de guardado:", {
            total: resp.total,
            guardados: resp.guardados,
            errores: resp.errores || []
          });
        } else {
          toast.success(`Archivo procesado: ${resp.guardados} comentarios insertados correctamente`);
        }
      } else {
        toast.success("Archivo cargado correctamente");
      }

      if (onSaveComment) onSaveComment(form, resp);
      form.resetForm();
      
      return resp ?? true;
      
    } catch (err) {
      console.error("Error cargando archivo:", err);
      console.error("Detalles del error:", err.response?.data);
      
      let serverMsg = "Error al cargar el archivo";
      const body = err?.response?.data;
      
      if (body) {
        if (typeof body === "string") {
          serverMsg = body;
        } else if (body?.message) {
          serverMsg = String(body.message);
        } else if (body?.errors && typeof body.errors === "object") {
          const parts = Object.entries(body.errors).map(([k, v]) => {
            if (Array.isArray(v)) return `${k}: ${v.join(", ")}`;
            return `${k}: ${String(v)}`;
          });
          serverMsg = parts.join(" | ");
        } else {
          try {
            serverMsg = JSON.stringify(body);
          } catch {
            serverMsg = String(body);
          }
        }
      } else if (err?.message) {
        serverMsg = String(err.message);
      }
      
      toast.error(serverMsg);
      return false;
    }
  }, [
    form,
    onSaveComment,
    idCartera,
    idEjecutivo,
    changeSituationActive,
  ]);

  return { handleSaveWithFile };
};