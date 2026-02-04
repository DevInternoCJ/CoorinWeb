import React, { useRef } from "react";
import ModalBase from "../../../board/ModalBase";
import IconCircular from "../../../../../components/iconos/IconCircular";
import SelectWallet from "../../../board/screenFields/SelectWallet";
import SaveButton from "../../Administration/gespa/ButtonSave";
import { IconComment } from "./IconsComments";
import {
  useViewManager,
  useCommentForm,
  useSituationCatalog,
  useSaveComment,
  VIEW_TYPES,
} from "./useCommentsLogic";
import PreviewRenderer from "./PreviewRenderer";
import FileUploader from "./FileUploader";

/* LAS OPCIONES CARTERA */
const WALLET_OPTIONS = [
  { value: "numero de cuenta", label: "Numero de cuenta" },
  { value: "expediente", label: "Expediente" },
];

// Componentes pequeños
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
      className="peer px-5 pt-4 pb-1 block w-full bg-gray-100 border-2 border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:outline-none focus:border-jerarquia2 focus:ring-jerarquia2 disabled:opacity-50"
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
      className="peer px-5 pt-5 pb-1 block w-full min-h-40 bg-gray-200 border-2 border-gray-200 transition-colors focus:pt-4 duration-200 focus:border-jerarquia3 rounded-lg text-sm placeholder:text-transparent"
    />
    <label
      htmlFor={id}
      className="absolute top-0 left-0 px-5 p-2 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
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

const CommentForm = ({
  commentText,
  onCommentChange,
  onSave,
  commentError,
  showTextarea = true,
}) => (
  <div className="bg-gray-50">
    <div className="m-5">
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
        <p className="mt-2 text-sm text-red-500">{commentError}</p>
      ) : null}
    </div>
  </div>
);

// --- Componente principal ---
const Comments = ({ onClose, onSaveComment }) => {
  const modalRef = useRef(null);
  const { bounce } = ModalBase.useModalLogic();

  // lógica de hook
  const { activeView, toggleView } = useViewManager();
  const { situationOptions, loading } = useSituationCatalog();
  const form = useCommentForm();

  //   SOLUCIÓN 1: Pasar form directamente al hook
  const { handleSave } = useSaveComment({
    form: form,
    situationOptions,
    onSaveComment,
    // Pasar si el checkbox "Cambiar situacion" está activo
    changeSituationActive: activeView === VIEW_TYPES.ADD,
  });

  // estados de archivo (gestionados aquí; la previsualización la renderiza PreviewRenderer)
  const fileStateRef = useRef({ file: null, name: "" });

  // Para asegurar que PreviewRenderer se actualice al cambiar el archivo, mantenemos un pequeño estado sincronizado:
  const [, setFileTick] = React.useState(0);
  const handleFileChange = (file, name) => {
    fileStateRef.current.file = file;
    fileStateRef.current.name = name;
    setFileTick((t) => t + 1);
  };

  const onSaveFileAction = () => {
    if (!fileStateRef.current.file) return;
    // pasamos allowEmpty=true porque en la vista LIST el textarea está oculto y el comentario puede venir del archivo
    handleSave({ allowEmpty: true });
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
        } bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border border-gray-300 flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader onClose={onClose} />
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <section className="flex w-full justify-center items-start px-6 py-4 bg-white border-b border-gray-200">
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
