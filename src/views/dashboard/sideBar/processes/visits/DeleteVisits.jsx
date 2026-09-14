import React, { useMemo, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import CatalogSelect from "../../../../../components/Select/CatalogSelect";
import FieldError from "../../../../../components/Formulario/FieldError";
import useZodValidation from "../../../../../hooks/useZodValidation";
import { visitFileSchema } from "../../../../../schemas/formSchemas";
import VisitService from "../../../../../services/visits/VisitService";

const getInitialWallet = () => {
  try {
    const user = JSON.parse(sessionStorage.getItem("userData") || localStorage.getItem("userData") || "{}");
    return user.idCartera ? String(user.idCartera) : "";
  } catch {
    return "";
  }
};

const DeleteVisits = () => {
  const inputRef = useRef(null);
  const [idCartera, setIdCartera] = useState(getInitialWallet);
  const [archivo, setArchivo] = useState(null);
  const [complemento, setComplemento] = useState(false);
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const schema = useMemo(() => visitFileSchema, []);
  const { errors, validate, clearError, setErrors } = useZodValidation(schema);

  const readPreview = async (file) => {
    try {
      const workbook = XLSX.read(await file.arrayBuffer(), { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });
      setRows(data.slice(0, 100));
      setHeaders(data[0] ? Object.keys(data[0]) : []);
      if (!data.length) setErrors({ archivo: "El archivo no contiene registros." });
    } catch {
      setRows([]);
      setHeaders([]);
      setErrors({ archivo: "No fue posible leer el archivo seleccionado." });
    }
  };

  const handleFile = (event) => {
    const file = event.target.files?.[0] || null;
    const parsed = schema.shape.archivo.safeParse(file);
    setArchivo(file);
    setConfirmed(false);
    if (!parsed.success) {
      setRows([]);
      setHeaders([]);
      setErrors({ archivo: parsed.error.issues[0]?.message });
      return;
    }
    clearError("archivo");
    readPreview(file);
  };

  const handlePrepare = async (event) => {
    event.preventDefault();
    const payload = validate({ idCartera, archivo, complemento });
    if (!payload || !rows.length) {
      toast.error("Seleccione un archivo válido con registros.");
      return;
    }
    if (!confirmed) {
      setErrors((current) => ({ ...current, confirmacion: "Confirme que revisó los registros." }));
      return;
    }
    setProcessing(true);
    try {
      await VisitService.eliminar({ idCartera: payload.idCartera, archivo: payload.archivo });
      toast.success("Visitas eliminadas correctamente.");
      setRows([]);
      setHeaders([]);
      setArchivo(null);
      setConfirmed(false);
      if (inputRef.current) inputRef.current.value = "";
    } catch (error) {
      toast.error(error.response?.data?.message || "No se pudieron eliminar las visitas.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handlePrepare} className="flex h-full min-h-0 flex-col gap-4 p-5" noValidate>
      <div className="rounded-xl border border-amber-400/40 bg-amber-100/60 px-4 py-3 text-sm text-amber-900">
        <span className="font-semibold">Acción destructiva.</span>{" "}
        Revise el preview y confirme explícitamente antes de enviar el archivo al backend.
      </div>

      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[minmax(180px,0.7fr)_minmax(280px,1.3fr)]">
        <div>
          <CatalogSelect
            id="idCartera"
            label="Cartera"
            value={idCartera}
            onChange={(event) => {
              setIdCartera(event.target.value);
              clearError("idCartera");
            }}
            options={[1, 2, 3, 31].map((id) => ({ value: String(id), label: `Cartera ${id}` }))}
            required
          />
          <FieldError id="idCartera-error" message={errors.idCartera} />
        </div>

        <div>
          <input ref={inputRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} className="hidden" />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-surface-secondary px-4 py-3 text-left text-sm text-foreground transition hover:border-jerarquia2 focus:outline-none focus:ring-2 focus:ring-jerarquia2"
          >
            <span className="truncate">{archivo?.name || "Seleccionar archivo de visitas"}</span>
            <span className="shrink-0 font-semibold text-jerarquia3">Examinar</span>
          </button>
          <FieldError id="archivo-error" message={errors.archivo} />
        </div>
      </div>

      <label className="inline-flex w-fit items-center gap-2 text-sm text-foreground">
        <input
          type="checkbox"
          checked={complemento}
          onChange={(event) => setComplemento(event.target.checked)}
          className="size-4 rounded border-border text-primary focus:ring-jerarquia2"
        />
        El archivo es complemento
      </label>

      <div className="min-h-44 flex-1 overflow-auto rounded-xl border border-border bg-layer">
        {!rows.length ? (
          <div className="grid h-full min-h-44 place-items-center px-6 text-center text-sm text-muted-foreground">
            Seleccione un archivo para revisar hasta 100 registros antes de preparar la eliminación.
          </div>
        ) : (
          <table className="min-w-full divide-y divide-border text-sm">
            <thead className="sticky top-0 bg-surface-secondary text-foreground">
              <tr>{headers.map((header) => <th key={header} className="px-3 py-2 text-left font-semibold">{header}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row, index) => (
                <tr key={index} className="hover:bg-surface-secondary/60">
                  {headers.map((header) => <td key={header} className="max-w-60 truncate px-3 py-2 text-foreground">{String(row[header] ?? "")}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex flex-col justify-between gap-3 border-t border-border pt-4 sm:flex-row sm:items-center">
        <div>
          <label className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(event) => {
                setConfirmed(event.target.checked);
                clearError("confirmacion");
              }}
              className="size-4 rounded border-border text-destructive focus:ring-destructive"
            />
            Revisé los {rows.length} registros mostrados
          </label>
          <FieldError id="confirmacion-error" message={errors.confirmacion} />
        </div>
        <button
          type="submit"
          disabled={!rows.length || processing}
          className="inline-flex items-center justify-center rounded-lg border border-transparent bg-destructive px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-destructive disabled:pointer-events-none disabled:opacity-50"
        >
          {processing ? "Eliminando…" : "Eliminar visitas"}
        </button>
      </div>
    </form>
  );
};

export default DeleteVisits;
