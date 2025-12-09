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
import { toast } from "sonner";
import { PostComments } from "../../../../../services/mark/orochi/LokeServices";
import LogoCoorin from "../../../../../assets/logo_coorin_7.svg";
import { IconComment, IconFile } from "./IconsComments";
import { getCatalogoValueCard } from "../../../../../services/mark/orochi/LokeServices";
import { useUserStore } from "../../../../../contextGlobal/userStore";
import * as XLSX from "xlsx";

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

// ---------------------- Main component ----------------------
const Comments = ({ onClose, onSaveComment }) => {
  const user = useUserStore((state) => state.user);
  const idEjecutivo = user?.idEjecutivo;
  const idCartera = 1;
  const servidor = "Orochi";
  const modalRef = useRef(null);
  const { bounce } = ModalBase.useModalLogic();

  const { activeView, toggleView } = useViewManager();
  const { situationOptions, loading } = useSituationCatalog();
  const form = useCommentForm();
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewText, setPreviewText] = useState(null);
  const [previewTable, setPreviewTable] = useState(null);
  const fileInputRef = useRef(null);
  const prevUrlRef = useRef(null);

  // Generate preview when a file is selected: images -> object URL, text -> read as text
  useEffect(() => {
    let mounted = true;
    if (!selectedFile) {
      // cleanup previous
      if (prevUrlRef.current) {
        try {
          URL.revokeObjectURL(prevUrlRef.current);
        } catch {
          /* ignore */
        }
        prevUrlRef.current = null;
      }
      setPreviewUrl(null);
      setPreviewText(null);
      return;
    }

    const file = selectedFile;
    const isImage = file.type && file.type.startsWith("image/");

    if (isImage) {
      const url = URL.createObjectURL(file);
      // revoke previous
      if (prevUrlRef.current && prevUrlRef.current !== url) {
        try {
          URL.revokeObjectURL(prevUrlRef.current);
        } catch {
          /* ignore */
        }
      }
      prevUrlRef.current = url;
      if (mounted) {
        setPreviewUrl(url);
        setPreviewText(null);
      }
      return () => {
        mounted = false;
      };
    }

    // try reading text-like files
    const isText = file.type && file.type.startsWith("text/");
    const textExt = /\.csv$|\.txt$|\.json$/i.test(file.name || "");
    if (isText || textExt) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!mounted) return;
        const txt = String(e.target.result || "").slice(0, 100000); // limit
        setPreviewText(txt);
        setPreviewUrl(null);
      };
      reader.onerror = () => {
        if (!mounted) return;
        setPreviewText(null);
        setPreviewUrl(null);
      };
      reader.readAsText(file);
      return () => {
        mounted = false;
      };
    }

    // excel files (.xls/.xlsx)
    const isExcel = /\.xlsx?$|\.xls$/i.test(file.name || "");
    if (isExcel) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target.result;
          // read with cellDates so date cells may become Date objects
          const workbook = XLSX.read(data, { type: "array", cellDates: true });
          const firstSheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[firstSheetName];
          // read raw values (no automatic formatting) and process dates/times ourselves
          const rows = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            raw: true,
          });

          // helpers to format date and time according to requirement
          const pad = (n) => String(n).padStart(2, "0");
          const excelSerialToDate = (v) => {
            // Excel stores days since 1899-12-31; convert serial to JS Date (UTC)
            try {
              const ms = Math.round((v - 25569) * 86400 * 1000);
              return new Date(ms);
            } catch {
              return null;
            }
          };

          const formatDate = (val) => {
            if (val == null || val === "") return "";
            if (val instanceof Date && !isNaN(val)) {
              return `${pad(val.getDate())}/${pad(
                val.getMonth() + 1
              )}/${val.getFullYear()}`;
            }
            if (typeof val === "number") {
              const d = excelSerialToDate(val);
              if (d && !isNaN(d))
                return `${pad(d.getDate())}/${pad(
                  d.getMonth() + 1
                )}/${d.getFullYear()}`;
            }
            // try parsing strings
            const parsed = new Date(String(val));
            if (!isNaN(parsed))
              return `${pad(parsed.getDate())}/${pad(
                parsed.getMonth() + 1
              )}/${parsed.getFullYear()}`;
            return String(val);
          };

          const formatTime = (val) => {
            if (val == null || val === "") return "";
            let dateObj = null;

            if (val instanceof Date && !isNaN(val)) {
              dateObj = val;
            } else if (typeof val === "number") {
              // fractional day (e.g., 0.5 -> 12:00:00) or full serial
              if (val > 1) {
                dateObj = excelSerialToDate(val);
              } else {
                const ms = Math.round(val * 24 * 3600 * 1000);
                dateObj = new Date(ms);
              }
            } else {
              const s = String(val).trim();
              // try match hh:mm[:ss] [am|pm]
              const m = s.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(am|pm)?$/i);
              if (m) {
                let hh = parseInt(m[1], 10);
                const mm = parseInt(m[2], 10);
                const ss = m[3] ? parseInt(m[3], 10) : 0;
                const ampm = m[4] ? m[4].toLowerCase() : null;
                if (ampm === "pm" && hh < 12) hh += 12;
                if (ampm === "am" && hh === 12) hh = 0;
                dateObj = new Date();
                dateObj.setHours(hh, mm, ss, 0);
              } else {
                const parsed = new Date(s);
                if (!isNaN(parsed)) dateObj = parsed;
              }
            }

            if (!dateObj || isNaN(dateObj)) return String(val);

            const hh24 = dateObj.getHours();
            const minutes = dateObj.getMinutes();
            const seconds = dateObj.getSeconds();
            let hh12 = hh24 % 12;
            if (hh12 === 0) hh12 = 12;
            const ampm = hh24 >= 12 ? "pm" : "am"; // lowercase per requirement
            return `${pad(hh12)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
          };

          // apply formatting to expected columns: index 1 -> Fecha, index 2 -> Hora
          const formatted = rows.map((row) => {
            const r = Array.isArray(row) ? row.slice() : [];
            r[1] = formatDate(r[1]);
            r[2] = formatTime(r[2]);
            return r;
          });

          // keep only first 50 rows to avoid heavy renders
          setPreviewTable(formatted.slice(0, 50));
          setPreviewUrl(null);
          setPreviewText(null);
        } catch (err) {
          console.error("Error parsing excel for preview:", err);
          setPreviewTable(null);
        }
      };
      reader.onerror = () => {
        setPreviewTable(null);
      };
      reader.readAsArrayBuffer(file);
      return () => {
        mounted = false;
      };
    }

    // other file types: no preview
    setPreviewUrl(null);
    setPreviewText(null);
    setPreviewTable(null);
    return () => {
      mounted = false;
    };
  }, [selectedFile]);

  // cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (prevUrlRef.current) {
        try {
          URL.revokeObjectURL(prevUrlRef.current);
        } catch {
          /* ignore */
        }
        prevUrlRef.current = null;
      }
    };
  }, []);

  const handleSave = useCallback(async () => {
    // Validación: mínimo 10 caracteres (sin contar espacios al inicio/final)
    const text = String(form.commentText || "").trim();
    if (text.length < 10) {
      toast.error("El comentario debe tener al menos 10 caracteres.");
      // enfocar textarea
      const ta = document.getElementById("comment-textarea");
      if (ta) ta.focus();
      return;
    }

    const formData = form.getFormData();
    const selectedId = form.selectedSituation || null;
    const selectedOpt = selectedId
      ? situationOptions.find((o) => String(o.value) === String(selectedId))
      : null;

    const payload = {
      situacion: selectedOpt ? selectedOpt.label : null,
      idSituacion: selectedId
        ? isNaN(Number(selectedId))
          ? selectedId
          : Number(selectedId)
        : null,
      idCartera: idCartera || null,
      idCuenta: form.searchValue || null,
      comentario: form.commentText || null,
      idEjecutivo: idEjecutivo || null,
      servidor: servidor || null,
    };
    console.log("Payload para guardar comentario:", payload);
    try {
      const resp = await PostComments(payload);
      toast.success("Comentario guardado correctamente");
      // Si el caller pasó un callback, notificarle también
      if (onSaveComment) onSaveComment(formData, resp);
      else console.log("Guardando comentario:", formData, resp);
      form.resetForm();
    } catch (err) {
      console.error("Error guardando comentario:", err);
      toast.error(err?.message || "Error al guardar comentario");
    }
  }, [form, onSaveComment, idEjecutivo, idCartera, servidor, situationOptions]);

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
        } bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border border-gray-300 flex flex-col max-h-[90vh]`}
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

          {/* Toolbar para la vista 'Insertar comentarios' */}
          {activeView === VIEW_TYPES.LIST && (
            <div className="my-3 mx-5 bg-neutral-100 flex items-center gap-5 rounded-md border-none">
              <div className="flex-1 bg-background-tertiary border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 truncate">
                {selectedFileName || "Seleccione archivo"}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files && e.target.files[0];
                  if (f) {
                    setSelectedFileName(f.name);
                    setSelectedFile(f);
                    // reset previous previews
                    setPreviewUrl(null);
                    setPreviewText(null);
                  } else {
                    setSelectedFileName("");
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    setPreviewText(null);
                  }
                }}
              />
              <SaveButton
                tooltip="Seleccionar archivo"
                className="btn-info w-14"
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
              >
                {" "}
                <IconFile className="size-5.5 " />
              </SaveButton>

              <SaveButton
                className={`btn-success ${
                  !selectedFile ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => {
                  if (!selectedFile) return;
                  handleSave();
                }}
                disabled={!selectedFile}
                aria-disabled={!selectedFile}
                title={
                  !selectedFile
                    ? "Seleccione un archivo antes de guardar"
                    : "Guardar"
                }
              >
                Guardar
              </SaveButton>
            </div>
          )}

          {/* Preview area: cuando la vista es LIST mostramos la previsualización en lugar del textarea */}
          {activeView === VIEW_TYPES.LIST && (
            <div className="px-5 pb-5">
              {previewUrl ? (
                <div className="border-none rounded p-2 bg-white">
                  <img
                    src={previewUrl}
                    alt={selectedFileName || "preview"}
                    className="max-h-96 w-auto mx-auto"
                  />
                </div>
              ) : previewTable ? (
                <div className="border-none rounded-lg bg-white max-h-96 overflow-auto text-xs">
                  <table className="min-w-full table-auto rounded-lg border-collapse text-sm">
                    <thead>
                      <tr className=" bg-jerarquia4">
                        {[
                          "Cuenta",
                          "Fechas",
                          "Horas",
                          "Ejecutivo",
                          "Comentario",
                        ].map((label, ci) => (
                          <th
                            key={ci}
                            className="border-none px-2 py-1 text-white text-left"
                          >
                            {label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewTable.slice(1, 51).map((row, ri) => (
                        <tr key={ri} className={ri % 2 ? "bg-gray-100" : ""}>
                          {[0, 1, 2, 3, 4].map((ci) => (
                            <td
                              key={ci}
                              className="border-none px-2 py-1 align-top"
                            >
                              {String((row || [])[ci] ?? "")}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : previewText ? (
                <div className="border-none rounded p-3 bg-white max-h-96 overflow-auto text-xs">
                  <pre className="whitespace-pre-wrap">{previewText}</pre>
                </div>
              ) : selectedFileName ? (
                <div className="border-none rounded p-3 bg-white text-sm text-gray-600">
                  Vista previa no disponible para este tipo de archivo:{" "}
                  <strong>{selectedFileName}</strong>
                </div>
              ) : (
                <div className="border-none rounded-lg p-3 bg-white text-sm text-gray-500">
                  No hay archivo seleccionado
                </div>
              )}
            </div>
          )}

          <CommentForm
            commentText={form.commentText}
            onCommentChange={(val) => {
              form.setCommentText(val);
            }}
            onSave={handleSave}
            showTextarea={activeView !== VIEW_TYPES.LIST}
          />
        </div>
      </div>
    </div>
  );
};

export default Comments;
