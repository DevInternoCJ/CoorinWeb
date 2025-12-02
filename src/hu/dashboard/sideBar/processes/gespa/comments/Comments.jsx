import React, { useRef, useState } from "react";
import ModalBase from "../../../../board/ModalBase";
import IconCircular from "../../../../../../components/iconos/IconCircular";
import SelectWallet from "../../../../../../hu/dashboard/board/screenFields/SelectWallet";
import SaveButton from "../../../Administration/gespa/ButtonSave";
import LogoCoorin from "../../../../../../assets/logo_coorin_7.svg";
import { IconComment } from "../comments/IconsComments";

// Hook para manejar la lógica de vistas
const useViewManager = () => {
  const [activeView, setActiveView] = useState(null);
  const toggleView = (view) => {
    setActiveView(activeView === view ? null : view);
  };
  return { activeView, toggleView };
};

// Hook para manejar el formulario de comentarios
const useCommentForm = () => {
  const [selectedWallet, setSelectedWallet] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [commentText, setCommentText] = useState("");
  const resetForm = () => {
    setSelectedWallet("");
    setSearchValue("");
    setCommentText("");
  };

  const getFormData = () => ({
    wallet: selectedWallet,
    search: searchValue,
    comment: commentText,
  });
  return {
    selectedWallet,
    setSelectedWallet,
    searchValue,
    setSearchValue,
    commentText,
    setCommentText,
    resetForm,
    getFormData,
  };
};

// CONSTANTES Y CONFIGURACIÓN (Open/Closed)
const WALLET_OPTIONS = [
  { value: "numero de cuenta", label: "Numero de cuenta" },
  { value: "expediente", label: "Expediente" },
];
const SITUATION_OPTIONS = [
  { value: "activa", label: "Activa" },
  { value: "suspendida", label: "Suspendida" },
  { value: "en_proceso", label: "En Proceso" },
  { value: "cerrada", label: "Cerrada" },
  { value: "pendiente", label: "Pendiente" },
  { value: "escalada", label: "Escalada" },
  { value: "resuelta", label: "Resuelta" },
];
const VIEW_TYPES = {
  ADD: "add",
  LIST: "list",
};

const createCheckboxOptions = (activeView, onViewChange) => [
  {
    id: "add-checkbox",
    label: "Cambiar situacion",
    view: VIEW_TYPES.ADD,
    checked: activeView === VIEW_TYPES.ADD,
    onChange: () => onViewChange(VIEW_TYPES.ADD),
  },
  {
    id: "list-checkbox",
    label: "Insertar comentarios",
    view: VIEW_TYPES.LIST,
    checked: activeView === VIEW_TYPES.LIST,
    onChange: () => onViewChange(VIEW_TYPES.LIST),
  },
];

// COMPONENTES ATÓMICOS (Single Responsibility)
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
      aria-label="Cerrar modal">
      &times;
    </button>
  </header>
);

const CheckboxGroup = ({ options, situationOptions,
  selectedSituation,
  onSituationChange,}) => (
  <div className="w-1/2 flex flex-col justify-between items-start gap-3">
    {options.map((option) => (
      <label
        key={option.id}
        htmlFor={option.id}
        className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          id={option.id}
          checked={option.checked}
          onChange={option.onChange}
          className="shrink-0 w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
        />
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
          {option.label}
        </span>
      </label>
    ))}
        <SelectWallet
      options={situationOptions}
      value={selectedSituation}
      onChange={onSituationChange}
      label="Seleccionar Situación"
      id="situation-select"
    />
  </div>
);

const FloatingInput = ({ id, label, value, onChange, type = "text" }) => (
  <div className="relative">
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="peer px-2 pt-3 pb-1 block w-full bg-gray-100 border-2 border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:outline-none focus:border-jerarquia2 focus:ring-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-4 focus:pb-1 not-placeholder-shown:pt-2 not-placeholder-shown:pb-2"
      placeholder={label}
    />
    <label
      htmlFor={id}
      className="absolute top-0 left-0 p-2 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 origin-[0_0] peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
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
      className="peer p-4 block w-full min-h-40 bg-gray-200 border-2 border-gray-200 focus:outline-none transition-colors duration-200 rounded-lg text-sm placeholder:text-transparent focus:border-2 focus:border-jerarquia2 focus:ring-jerarquia2 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2"
      placeholder={label}
    />
    <label
      htmlFor={id}
      className="absolute top-0 left-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
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
      label="Buscar"
      value={searchValue}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  </div>
);

const ControlsSection = ({
  checkboxOptions,
  walletOptions,
  selectedWallet,
  onWalletChange,
  searchValue,
  onSearchChange,
  activeView,
  situationOptions,
  selectedSituation,
  onSituationChange,
}) => (
  <section className="flex w-full justify-center items-start px-6 py-4 bg-white border-b border-gray-200">
    <CheckboxGroup options={checkboxOptions} />
    {activeView === VIEW_TYPES.ADD ? (
      <SituationSelectSection
        walletOptions={walletOptions}
        selectedWallet={selectedWallet}
        onWalletChange={onWalletChange}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        situationOptions={situationOptions}
        selectedSituation={selectedSituation}
        onSituationChange={onSituationChange}
      />
    ) : (
      <SelectSection
        walletOptions={walletOptions}
        selectedWallet={selectedWallet}
        onWalletChange={onWalletChange}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
      />
    )}
  </section>
);
// NUEVO: Componente para select de situaciones
const SituationSelectSection = ({
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
      label="Buscar"
      value={searchValue}
      onChange={(e) => onSearchChange(e.target.value)}
    />

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
      Cartera seleccionada: <span className="font-semibold">{wallet || "Ninguna"}</span>
    </p>
  </div>
);
// COMPONENTE PRINCIPAL (Dependency Inversion)
const Comments = ({ onClose, onSaveComment }) => {
  const modalRef = useRef(null);
  const { bounce } = ModalBase.useModalLogic();
  const { activeView, toggleView } = useViewManager();
   const {
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
  } = useCommentForm();

  const handleSave = () => {
    const formData = getFormData();   
    if (onSaveComment) {
      onSaveComment(formData);
    } else {
      console.log("Guardando comentario:", formData);
    }  
    resetForm();
  };

  const checkboxOptions = createCheckboxOptions(activeView, toggleView);
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
               <ControlsSection
            checkboxOptions={checkboxOptions}
            walletOptions={WALLET_OPTIONS}
            selectedWallet={selectedWallet}
            onWalletChange={setSelectedWallet}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            activeView={activeView}
            situationOptions={SITUATION_OPTIONS}
            selectedSituation={selectedSituation}
            onSituationChange={setSelectedSituation}
          />
          <CommentForm
            commentText={commentText}
            onCommentChange={setCommentText}
            onSave={handleSave}
          />
          {activeView === VIEW_TYPES.LIST && <ListView wallet={selectedWallet} />}
        </div>
      </div>
    </div>
  );
};

export default Comments;