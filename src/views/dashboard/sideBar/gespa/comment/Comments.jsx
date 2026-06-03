import React, { useRef } from "react";
import ModalBase from "../../../board/ModalBase";
import IconCircular from "../../../../../components/Iconos/IconCircular";
import SelectWallet from "../../../board/screenFields/SelectWallet";
import SaveButton from "../../Administration/gespa/ButtonSave";
import { IconComment } from "./IconsComments";
import {
  useViewManager,
  useCommentForm,
  useSituationCatalog,
  useSaveComment,
  useSaveCommentWithFile,
  VIEW_TYPES,
} from "./useCommentsLogic";
import PreviewRenderer from "./PreviewRenderer";
import FileUploader from "./FileUploader";
import { toast } from "sonner";

/* LAS OPCIONES CARTERA */
const WALLET_OPTIONS = [
  { value: "numero de cuenta", label: "Numero de cuenta" },
  { value: "expediente", label: "Expediente" },
];

// Componentes pequeños
const ModalHeader = ({ onClose }) => (
  <header className="bg-[var(--color-surface-secondary)] p-3 pt-3 w-full flex gap-5 justify-between items-start border-b border-[var(--color-border)]">
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
      className="text-jerarquia3 hover:bg-[var(--color-surface)] hover:text-red-600 text-4xl rounded-full w-8 h-8 flex items-center justify-center transition-colors"
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
          className="modal-checkbox"
        />
        <span className="text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
          {opt.label}
        </span>
      </label>
    ))}
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
      className="peer px-5 pt-4 pb-1 block w-full bg-[var(--color-surface-secondary)] border-2 border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg text-sm placeholder:text-transparent focus:outline-none focus:border-jerarquia2 focus:ring-jerarquia2 disabled:opacity-50"
    />
    <label
      htmlFor={id}
      className="absolute top-0 left-0 px-5 p-2 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 origin-[0_0] peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-[var(--color-text-muted)] peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-[var(--color-text-muted)] text-[var(--color-text-muted)]"
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
      className="peer px-5 pt-5 pb-1 block w-full min-h-40 bg-[var(--color-surface-secondary)] border-2 border-[var(--color-border)] text-[var(--color-text-primary)] transition-colors focus:pt-4 duration-200 focus:border-jerarquia3 rounded-lg text-sm placeholder:text-transparent"
    />
    <label
      htmlFor={id}
      className="absolute top-0 left-0 px-5 p-2 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-[var(--color-text-muted)] peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-[var(--color-text-muted)] text-[var(--color-text-muted)]"
    >
      {label}
    </label>
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
      <div className="text-sm text-[var(--color-text-muted)]">Cargando situaciones...</div>
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

const CommentForm = ({
  commentText,
  onCommentChange,
  onSave,
  commentError,
  showTextarea = true,
}) => (
  <div className="bg-[var(--color-surface-secondary)]">
    <div className="m-5 py-4">
      {showTextarea ? (
        <>
          <FloatingTextarea
            id="comment-textarea"
            label="Comentario"
            value={commentText}
            onChange={(e) => onCommentChange(e.target.value)}
          />
          <div className="flex justify-end mt-3">
            <SaveButton className="btn-success" onClick={onSave} />
          </div>
        </>
      ) : null}
      {commentError ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{commentError}</p>
      ) : null}
    </div>
  </div>
);

// --- Componente principal ---
const Comments = ({ onClose, onSaveComment }) => {
  const modalRef = useRef(null);
  const { bounce } = ModalBase.useModalLogic();

  const { activeView, toggleView } = useViewManager();
  const { situationOptions, loading } = useSituationCatalog();
  const form = useCommentForm();

  // Hook para guardar comentario normal (sin archivo)
  const { handleSave } = useSaveComment({
    form: form,
    situationOptions,
    onSaveComment,
    changeSituationActive: activeView === VIEW_TYPES.ADD,
  });

  // Hook para guardar con archivo
  const { handleSaveWithFile } = useSaveCommentWithFile({
    form: form,
    situationOptions,
    onSaveComment,
    changeSituationActive: activeView === VIEW_TYPES.LIST,
  });

    // Estados de archivo
  const fileStateRef = useRef({ file: null, name: "" });
  const [, setFileTick] = React.useState(0);

  const handleFileChange = (file, name) => {
    fileStateRef.current.file = file;
    fileStateRef.current.name = name;
    setFileTick((t) => t + 1);
  };

   const onSaveFileAction = async () => {
    if (!fileStateRef.current.file) {
      toast.error("Debe seleccionar un archivo");
      return;
    }
    
    const success = await handleSaveWithFile(fileStateRef.current.file);
    
    if (success) {
      // Limpiar el archivo después de guardar exitosamente
      fileStateRef.current.file = null;
      fileStateRef.current.name = "";
      setFileTick((t) => t + 1);
    }
  };

  const checkboxOptions = [
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
  ];

  return (
    <div className="modal-blur-bg overflow-hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className={`${
          bounce ? "animate-bounce-modal" : ""
        } bg-[var(--color-surface)] rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border border-[var(--color-border)] flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader onClose={onClose} />
        <div className="flex-1 overflow-y-auto bg-[var(--color-surface-secondary)]">
          <section className="flex w-full justify-center items-start px-6 py-4 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
            <CheckboxGroup
              options={checkboxOptions}
              childrenBelow={
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

            {/* Right column */}
            {activeView === VIEW_TYPES.ADD ? (
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
            )}
          </section>

          {/* Toolbar para la vista 'Insertar comentarios' */}
          {activeView === VIEW_TYPES.LIST && (
            <FileUploader
              onFileChange={handleFileChange}
              onSave={onSaveFileAction}
              saveDisabled={!fileStateRef.current.file}
            />
          )}

          {/* Preview area */}
          {activeView === VIEW_TYPES.LIST && (
            <div className="px-5 pb-5">
              <PreviewRenderer
                file={fileStateRef.current.file}
                fileName={fileStateRef.current.name}
              />
            </div>
          )}

          {/* Comment form */}
          <CommentForm
            commentText={form.commentText}
            onCommentChange={(val) => form.setCommentText(val)}
            onSave={handleSave}
            showTextarea={activeView !== VIEW_TYPES.LIST}
          />
        </div>
      </div>
    </div>
  );
};

export default Comments;
