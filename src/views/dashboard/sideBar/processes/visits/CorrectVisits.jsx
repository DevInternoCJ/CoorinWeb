import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import FloatingInput from "../../../../../components/Select/FloatingInput";
import FloatingSelect from "../../../../../components/Select/FloatingSelect";
import CatalogSelect from "../../../../../components/Select/CatalogSelect";
import FieldError from "../../../../../components/Formulario/FieldError";
import useZodValidation from "../../../../../hooks/useZodValidation";
import { corregirVisitaSchema } from "../../../../../schemas/formSchemas";
import VisitService from "../../../../../services/visits/VisitService";

const DATA_OPTIONS = [
  { value: "comentario", label: "Comentario" },
  { value: "usuario", label: "Usuario visitador" },
  { value: "fecha", label: "Fecha de visita" },
  { value: "sucursal", label: "Sucursal" },
];

const getStoredUser = () => {
  try {
    return JSON.parse(sessionStorage.getItem("userData") || localStorage.getItem("userData") || "{}");
  } catch {
    return {};
  }
};

const CorrectVisits = () => {
  const user = useMemo(getStoredUser, []);
  const [values, setValues] = useState({
    idCartera: user.idCartera ? String(user.idCartera) : "",
    cuenta: "",
    dato: "",
    sucursal: "",
    usuario: user.usuario || "",
    fecha: new Date().toISOString().slice(0, 10),
    comentario: "",
  });
  const [validatedPayload, setValidatedPayload] = useState(null);
  const [matches, setMatches] = useState([]);
  const [processing, setProcessing] = useState(false);
  const { errors, validate, clearError } = useZodValidation(corregirVisitaSchema);

  const update = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setValidatedPayload(null);
    clearError(field);
  };

  const handleValidate = async (event) => {
    event.preventDefault();
    const parsed = validate(values);
    if (!parsed) {
      toast.error("Revise los campos marcados antes de continuar.");
      return;
    }
    setProcessing(true);
    try {
      const result = await VisitService.buscarCorreccion({ idCartera: parsed.idCartera, cuenta: parsed.cuenta });
      const rows = Array.isArray(result) ? result : result?.data ?? result?.visitas ?? [];
      setMatches(rows);
      setValidatedPayload(parsed);
      toast.success(rows.length ? `Se encontraron ${rows.length} visitas.` : "No se encontraron visitas para corregir.");
    } catch (error) {
      setMatches([]);
      toast.error(error.response?.data?.message || "No se pudieron consultar las visitas.");
    } finally {
      setProcessing(false);
    }
  };

  const handleSave = async () => {
    if (!validatedPayload) return;
    setProcessing(true);
    try {
      await VisitService.editarCorreccion(validatedPayload);
      toast.success("Corrección guardada correctamente.");
    } catch (error) {
      toast.error(error.response?.data?.message || "No se pudo guardar la corrección.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleValidate} className="flex h-full flex-col gap-5 p-5" noValidate>
      <div className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground">
        Consulta la visita antes de guardar una corrección. La cartera y la cuenta se envían como identificadores.
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <CatalogSelect
            id="idCartera"
            label="Cartera"
            value={values.idCartera}
            onChange={(event) => update("idCartera", event.target.value)}
            options={[1, 2, 3, 31].map((id) => ({ value: String(id), label: `Cartera ${id}` }))}
            required
          />
          <FieldError id="idCartera-error" message={errors.idCartera} />
        </div>
        <FloatingInput
          id="cuenta"
          label="Cuenta"
          value={values.cuenta}
          onChange={(event) => update("cuenta", event.target.value)}
          error={errors.cuenta}
          required
        />
        <div>
          <FloatingSelect
            id="dato"
            label="Dato a corregir"
            value={values.dato}
            onChange={(event) => update("dato", event.target.value)}
            options={DATA_OPTIONS}
            required
          />
          <FieldError id="dato-error" message={errors.dato} />
        </div>
        <FloatingInput
          id="sucursal"
          label="Sucursal"
          value={values.sucursal}
          onChange={(event) => update("sucursal", event.target.value)}
          error={errors.sucursal}
        />
        <FloatingInput
          id="usuario"
          label="Usuario"
          value={values.usuario}
          onChange={(event) => update("usuario", event.target.value)}
          error={errors.usuario}
          required
        />
        <FloatingInput
          id="fecha"
          label="Fecha"
          type="date"
          value={values.fecha}
          onChange={(event) => update("fecha", event.target.value)}
          error={errors.fecha}
          required
        />
      </div>

      <div>
        <label htmlFor="comentario" className="mb-1.5 block text-sm font-medium text-foreground">
          Comentario <span aria-hidden="true" className="text-destructive">*</span>
        </label>
        <textarea
          id="comentario"
          name="comentario"
          value={values.comentario}
          onChange={(event) => update("comentario", event.target.value)}
          aria-invalid={Boolean(errors.comentario)}
          aria-describedby={errors.comentario ? "comentario-error" : undefined}
          className="min-h-28 w-full resize-y rounded-lg border border-border bg-surface-secondary px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-jerarquia2 focus:ring-2 focus:ring-jerarquia2/30"
          maxLength={500}
        />
        <div className="flex justify-between gap-3">
          <FieldError id="comentario-error" message={errors.comentario} />
          <span className="mt-1 ms-auto text-xs text-muted-foreground">{values.comentario.length}/500</span>
        </div>
      </div>

      {validatedPayload && (
        <div className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground">
          La operación para la cuenta <strong>{validatedPayload.cuenta}</strong> está lista para conectarse al backend.
        </div>
      )}

      {matches.length > 0 && (
        <div className="max-h-36 overflow-auto rounded-lg border border-border bg-surface-secondary p-3 text-xs text-foreground">
          {matches.slice(0, 20).map((match, index) => (
            <div key={match.id ?? match.idVisita ?? index} className="flex justify-between gap-3 border-b border-border py-1 last:border-0">
              <span>{match.fecha ?? match.Fecha ?? "Visita"}</span>
              <span className="text-muted-foreground">{match.comentario ?? match.Comentario ?? "Registro encontrado"}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto flex justify-end">
        <button
          type={validatedPayload ? "button" : "submit"}
          onClick={validatedPayload ? handleSave : undefined}
          disabled={processing}
          className="inline-flex items-center justify-center gap-x-2 rounded-lg border border-transparent bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-jerarquia3 focus:outline-none focus:ring-2 focus:ring-jerarquia2 disabled:pointer-events-none disabled:opacity-50"
        >
          {processing ? "Procesando…" : validatedPayload ? "Guardar corrección" : "Buscar visita"}
        </button>
      </div>
    </form>
  );
};

export default CorrectVisits;
