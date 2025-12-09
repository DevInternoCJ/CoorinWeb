// useCommentsLogic.js
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { PostComments, getCatalogoValueCard } from "../../../../../services/mark/orochi/LokeServices";
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
 * handleSaveComment: ejecuta el PostComments con la información del formulario.
 * Retorna una función memoizada.
 */
export const useSaveComment = ({ formRef, situationOptions, onSaveComment, idCartera = 1, servidor = "Orochi" } = {}) => {
  const user = useUserStore((state) => state.user);
  const idEjecutivo = user?.idEjecutivo;

  const handleSave = useCallback(async () => {
    const form = formRef.current;
    const text = String(form.commentText || "").trim();
    if (text.length < 10) {
      toast.error("El comentario debe tener al menos 10 caracteres.");
      const ta = document.getElementById("comment-textarea");
      if (ta) ta.focus();
      return;
    }

    const selectedId = form.selectedSituation || null;
    const selectedOpt = selectedId
      ? situationOptions.find((o) => String(o.value) === String(selectedId))
      : null;

    const payload = {
      situacion: selectedOpt ? selectedOpt.label : null,
      idSituacion: selectedId ? (isNaN(Number(selectedId)) ? selectedId : Number(selectedId)) : null,
      idCartera: idCartera || null,
      idCuenta: form.searchValue || null,
      comentario: form.commentText || null,
      idEjecutivo: idEjecutivo || null,
      servidor: servidor || null,
    };

    try {
      const resp = await PostComments(payload);
      toast.success("Comentario guardado correctamente");
      if (onSaveComment) onSaveComment(form, resp);
      form.resetForm();
    } catch (err) {
      console.error("Error guardando comentario:", err);
      toast.error(err?.message || "Error al guardar comentario");
    }
  }, [formRef, situationOptions, onSaveComment, idCartera, idEjecutivo, servidor]);

  return { handleSave };
};
