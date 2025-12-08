import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import ModalBase from "../../../board/ModalBase";
import IconCircular from "../../../../../components/iconos/IconCircular";
import SelectWallet from "../../../board/screenFields/SelectWallet";
import SaveButton from "../../Administration/gespa/ButtonSave";
import LogoCoorin from "../../../../../assets/logo_coorin_7.svg";
import { IconComment } from "./IconsComments";
import { getCatalogoValueCard } from "../../../../../services/mark/albaz/LokiServices";

const VIEW_TYPES = Object.freeze({ ADD: "add", LIST: "list" });

const WALLET_OPTIONS = [
  { value: "numero de cuenta", label: "Numero de cuenta" },
  { value: "expediente", label: "Expediente" },
];

// ---------------------- Hooks ----------------------
const useViewManager = (initial = null) => {
  const [activeView, setActiveView] = useState(initial);
  const toggleView = useCallback((view) => {
    setActiveView((prev) => (prev === view ? null : view));
  }, []);
  return { activeView, toggleView };
};

const useCommentForm = (initial = {}) => {
  const [selectedWallet, setSelectedWallet] = useState(initial.wallet ?? "");
  const [searchValue, setSearchValue] = useState(initial.search ?? "");
  const [commentText, setCommentText] = useState(initial.comment ?? "");
  const [selectedSituation, setSelectedSituation] = useState(
    initial.situation ?? ""
  );

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

const useSituationCatalog = () => {
  const [situationOptions, setSituationOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        const data = await getCatalogoValueCard();
        // allowed ids según el original
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

// ---------------------- Small atomic components ----------------------
const ModalHeader = ({ onClose }) => (
  <header className="bg-neutral-100 p-3 pt-3 w-full flex gap-5 justify-between items-start border-b border-gray-200">
    <div className="block md:flex items-start justify-between w-2/4 gap-3">
      <div className="flex items-center gap-2 text-jerarquia3">
        <IconCircular>
          <IconComment className="size-5" />
        </IconCircular>
        <h2 className="text-xl font-bold text-jerarquia3">Comentarios</h2>
      </div>
    </div>
    <button
      onClick={onClose}
      className="text-jerarquia3 hover:bg-background-dashboard hover:text-red-600 text-4xl rounded-full w-8 h-8 flex items-center justify-center transition-colors"
      aria-label="Cerrar modal"
    >
      &times;
    </button>
  </header>
);

const CheckboxGroup = ({ options, childrenBelow }) => (
  <div className="w-1/2 flex flex-col justify-between items-start gap-3">
    {options.map((opt) => (
      <label
        key={opt.id}
        htmlFor={opt.id}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <input
          id={opt.id}
          type="checkbox"
          checked={opt.checked}
          onChange={opt.onChange}
          className="shrink-0 w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        />
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
          {opt.label}
        </span>
      </label>
    ))}

    {/* childrenBelow permite insertar elementos que dependen del estado de la vista */}
    {childrenBelow}
  </div>
);

const FloatingInput = ({ id, label, value, onChange, type = "text" }) => (
  <div className="relative">
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="peer px-5 pt-3 pb-1 block w-full bg-gray-100 border-2 border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:outline-none focus:border-jerarquia2 focus:ring-jerarquia2 disabled:opacity-50"
    />
    <label
      htmlFor={id}
      className="absolute top-0 left-0 px-5 p-2 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 origin-[0_0] peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
    >
      {label}
    </label>
  </div>
);

const FloatingTextarea = ({ id, label, value, onChange }) => (
  <div className="relative">
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="peer p-4 block w-full min-h-40 bg-gray-200 border-2 border-gray-200 focus:outline-none transition-colors duration-200 rounded-lg text-sm placeholder:text-transparent"
    />
    <label
      htmlFor={id}
      className="absolute top-0 left-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500"
    >
      {label}
    </label>
  </div>
);

const SelectSection = ({
  walletOptions,
  selectedWallet,
  onWalletChange,
  searchValue,
  onSearchChange,
}) => (
  <div className="w-1/2 space-y-3">
    <SelectWallet
      options={walletOptions}
      value={selectedWallet}
      onChange={onWalletChange}
      label="Seleccionar"
      id="wallet-select"
    />
    <FloatingInput
      id="search-input"
      label="Ingresar"
      value={searchValue}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  </div>
);

const SituationSelectSection = ({
  situationOptions,
  loading,
  selectedSituation,
  onSituationChange,
}) => (
  <div className="w-1/2 space-y-3">
    {loading ? (
      <div className="text-sm text-gray-500">Cargando situaciones...</div>
    ) : (
      <SelectWallet
        options={situationOptions}
        value={selectedSituation}
        onChange={onSituationChange}
        label="Seleccionar Situación"
        id="situation-select"
      />
    )}
  </div>
);

const CommentForm = ({ commentText, onCommentChange, onSave }) => (
  <div className="bg-gray-50">
    <div className="m-5">
      <FloatingTextarea
        id="comment-textarea"
        label="Comentario"
        value={commentText}
        onChange={(e) => onCommentChange(e.target.value)}
      />
    </div>
    <div className="flex justify-end px-5 pb-5">
      <SaveButton className="btn-success" onClick={onSave} />
    </div>
  </div>
);

const ListView = ({ wallet }) => (
  <div className="transition-all duration-300 ease-in-out p-6 bg-white m-5 rounded-lg">
    <h2 className="text-xl font-semibold mb-4">Lista de Comentarios</h2>
    <p className="text-sm text-gray-600">
      Cartera seleccionada:{" "}
      <span className="font-semibold">{wallet || "Ninguna"}</span>
    </p>
  </div>
);

// ---------------------- Main component ----------------------
const Comments = ({ onClose, onSaveComment }) => {
  const modalRef = useRef(null);
  const { bounce } = ModalBase.useModalLogic();

  const { activeView, toggleView } = useViewManager();
  const { situationOptions, loading } = useSituationCatalog();
  const form = useCommentForm();

  const handleSave = useCallback(() => {
    const formData = form.getFormData();
    if (onSaveComment) onSaveComment(formData);
    else console.log("Guardando comentario:", formData);
    form.resetForm();
  }, [form, onSaveComment]);

  const checkboxOptions = useMemo(
    () => [
      {
        id: "add-checkbox",
        label: "Cambiar situacion",
        view: VIEW_TYPES.ADD,
        checked: activeView === VIEW_TYPES.ADD,
        onChange: () => toggleView(VIEW_TYPES.ADD),
      },
      {
        id: "list-checkbox",
        label: "Insertar comentarios",
        view: VIEW_TYPES.LIST,
        checked: activeView === VIEW_TYPES.LIST,
        onChange: () => toggleView(VIEW_TYPES.LIST),
      },
    ],
    [activeView, toggleView]
  );

  return (
    <div className="modal-blur-bg overflow-hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className={`${
          bounce ? "animate-bounce-modal" : ""
        } bg-white rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden border border-gray-300 flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader onClose={onClose} />
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <section className="flex w-full justify-center items-start px-6 py-4 bg-white border-b border-gray-200">
            <CheckboxGroup
              options={checkboxOptions}
              activeView={activeView}
              onToggle={toggleView}
              childrenBelow={
                // El select de situaciones sólo se muestra cuando la vista ADD está activa
                activeView === VIEW_TYPES.ADD ? (
                  <SituationSelectSection
                    situationOptions={situationOptions}
                    loading={loading}
                    selectedSituation={form.selectedSituation}
                    onSituationChange={form.setSelectedSituation}
                  />
                ) : null
              }
            />

            {/* Right column: wallet / search or situation inputs (keeps original UX) */}
            {activeView === VIEW_TYPES.ADD ? (
              // Si ADD está activo, mostramos la sección primaria para seleccionar cartera y buscar (igual que antes)
              <div className="w-1/2 space-y-3">
                <SelectWallet
                  options={WALLET_OPTIONS}
                  value={form.selectedWallet}
                  onChange={form.setSelectedWallet}
                  label="Seleccionar"
                  id="wallet-select"
                />
                <FloatingInput
                  id="search-input"
                  label="Ingresar"
                  value={form.searchValue}
                  onChange={(e) => form.setSearchValue(e.target.value)}
                />
              </div>
            ) : (
              <SelectSection
                walletOptions={WALLET_OPTIONS}
                selectedWallet={form.selectedWallet}
                onWalletChange={form.setSelectedWallet}
                searchValue={form.searchValue}
                onSearchChange={form.setSearchValue}
              />
            )}
          </section>

          <CommentForm
            commentText={form.commentText}
            onCommentChange={form.setCommentText}
            onSave={handleSave}
          />

          {activeView === VIEW_TYPES.LIST && (
            <ListView wallet={form.selectedWallet} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
