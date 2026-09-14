import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import ReusableModal from "../../modalGlobalReboot/ReusableModal";
import DatePicker from "../../../../../components/Select/DatePicker";
import { IconDayExecutive } from "../IconesConsultations";
import RamificacionSesiones from "../../sessions/RamificacionSesiones";
import { getExecutiveDayReport } from "../../../../../services/reports/dayExecutiveService";
import { diaEjecutivoSchema, getZodFieldErrors } from "../../../../../schemas/formSchemas";
import { ACTIVE_SERVER } from "../../../../../config/backend";

const MIN_DATE = "2016-06-23";

const toIsoDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getYesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return toIsoDate(date);
};

const getValue = (row, ...keys) => {
  for (const key of keys) {
    if (row && row[key] !== undefined && row[key] !== null) return row[key];
  }
  return undefined;
};

const extractErrorMessage = (error) =>
  error?.response?.data?.mensaje ||
  error?.response?.data?.message ||
  error?.message ||
  "No fue posible generar el reporte.";

const compareByStartTime = (left, right) => {
  const a = String(getValue(left, "HoraInicio", "horaInicio", "hora_inicio") || "");
  const b = String(getValue(right, "HoraInicio", "horaInicio", "hora_inicio") || "");
  return a.localeCompare(b, "es", { numeric: true });
};

const escapeCsv = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;

const ModalDayExecutive = ({ isOpen, onClose }) => {
  const [date, setDate] = useState(getYesterday);
  const [executiveId, setExecutiveId] = useState("");
  const [selectedExecutive, setSelectedExecutive] = useState(null);
  const [rows, setRows] = useState([]);
  const [loadingReport, setLoadingReport] = useState(false);
  const [reportStatus, setReportStatus] = useState("idle");
  const [loadError, setLoadError] = useState("");
  const [errors, setErrors] = useState({});
  const requestSequence = useRef(0);

  const maxDate = useMemo(getYesterday, [isOpen]);
  const columns = useMemo(() => {
    const keys = [];
    rows.forEach((row) => Object.keys(row || {}).forEach((key) => {
      if (!keys.includes(key)) keys.push(key);
    }));
    return keys;
  }, [rows]);

  useEffect(() => {
    if (!isOpen) return undefined;
    setRows([]);
    setReportStatus("idle");
    setErrors({});
    setLoadError("");
    setDate(getYesterday());
    setExecutiveId("");
    setSelectedExecutive(null);
    requestSequence.current += 1;
    return undefined;
  }, [isOpen]);

  const invalidateReport = (setter) => (value) => {
    setter(value);
    setRows([]);
    setReportStatus("idle");
    setErrors({});
    requestSequence.current += 1;
  };

  const generateReport = async ({
    idEjecutivo = executiveId,
    fecha = date,
  } = {}) => {
    const parsed = diaEjecutivoSchema.safeParse({
      idEjecutivo: String(idEjecutivo),
      fecha,
      servidor: ACTIVE_SERVER,
    });
    if (!parsed.success) {
      setErrors(getZodFieldErrors(parsed.error));
      return;
    }
    if (fecha > maxDate) {
      setErrors({ fecha: "La fecha no puede ser hoy ni una fecha futura." });
      return;
    }

    setLoadingReport(true);
    setReportStatus("loading");
    setErrors({});
    setLoadError("");
    const currentRequest = ++requestSequence.current;
    try {
      const result = await getExecutiveDayReport(parsed.data);
      if (currentRequest !== requestSequence.current) return;
      const orderedRows = [...result.rows].sort(compareByStartTime);
      setRows(orderedRows);
      setReportStatus(orderedRows.length ? "success" : "empty");
      if (!orderedRows.length) toast.info(result.message || "Sin entradas del ejecutivo en el día.");
    } catch (error) {
      if (currentRequest !== requestSequence.current) return;
      const message = extractErrorMessage(error);
      setRows([]);
      setReportStatus("error");
      setLoadError(message);
      toast.error(message);
    } finally {
      if (currentRequest === requestSequence.current) setLoadingReport(false);
    }
  };

  const exportReport = () => {
    if (!rows.length || !columns.length) return;
    const csv = [
      columns.map(escapeCsv).join(","),
      ...rows.map((row) => columns.map((column) => escapeCsv(row[column])).join(",")),
    ].join("\r\n");
    const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dia-ejecutivo-${date}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const selectedExecutiveName = selectedExecutive
    ? String(getValue(selectedExecutive, "NombreEjecutivo", "nombreEjecutivo", "ejecutivo", "nombre") || "").trim()
    : "";
  const selectedExecutiveUser = selectedExecutive
    ? String(getValue(selectedExecutive, "usuario", "Usuario") || "").trim()
    : "";

  return (
    <ReusableModal
      isOpen={isOpen}
      onClose={onClose}
      title="Día del ejecutivo"
      icon={IconDayExecutive}
      iconClassName="text-jerarquia3"
      size="day-executive"
      modalClassName="!min-h-0 h-auto"
      contentClassName="!max-h-[calc(90vh-5rem)] !overflow-y-auto"
      closeOnBackdropClick={false}
      enableShakeOnBackdropClick
    >
      <div className="flex min-h-0 flex-col gap-3">
        <div className="grid min-h-0 grid-cols-1 items-stretch gap-3 lg:grid-cols-[minmax(260px,32%)_1fr]">
          <aside className="min-h-0 overflow-hidden">
            <RamificacionSesiones
              className="lg:!h-[clamp(300px,48vh,430px)]"
              onExecutiveSelect={(id, executive) => {
                const selectedId = String(id);
                invalidateReport(setExecutiveId)(selectedId);
                setSelectedExecutive(executive);
                void generateReport({ idEjecutivo: selectedId, fecha: date });
              }}
            />
            {errors.idEjecutivo && <p className="mt-1 px-1 text-xs text-destructive">{errors.idEjecutivo}</p>}
          </aside>

          <div className="flex min-h-0 flex-col gap-3 lg:h-[clamp(300px,48vh,430px)]">
            <section className="rounded-xl border border-border bg-layer p-3 shadow-sm sm:p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="flex-1">
              <DatePicker
                id="dia-ejecutivo-fecha"
                label="Día a consultar"
                value={date}
                onChange={(selectedDate) => {
                  invalidateReport(setDate)(selectedDate);
                  if (executiveId && selectedDate) {
                    void generateReport({ idEjecutivo: executiveId, fecha: selectedDate });
                  }
                }}
                min={MIN_DATE}
                max={maxDate}
                className="w-full"
              />
              {errors.fecha && <p className="-mt-2 text-xs text-destructive sm:col-start-2">{errors.fecha}</p>}
                </div>
                <div className="flex gap-2">
              <button type="button" onClick={exportReport} disabled={!rows.length || loadingReport} className="inline-flex items-center justify-center gap-x-2 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background-1 focus:outline-none focus:ring-2 focus:ring-primary disabled:pointer-events-none disabled:opacity-50">
                Exportar CSV
              </button>
              <button type="button" onClick={() => generateReport()} disabled={loadingReport || !executiveId || !date} className="inline-flex min-w-32 items-center justify-center gap-x-2 rounded-lg border border-transparent bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                {loadingReport && <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />}
                {loadingReport ? "Consultando…" : "Actualizar"}
              </button>
                </div>
              </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
            <span>Periodo disponible: 23/06/2016 a ayer</span>
            {selectedExecutiveName && <span className="font-medium text-foreground">Ejecutivo: {[selectedExecutiveUser, selectedExecutiveName].filter(Boolean).join(" - ")}</span>}
          </div>
        </section>

        {loadError && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-foreground" role="alert">{loadError}</div>
        )}

        <section className="min-h-56 flex-1 overflow-hidden rounded-xl border border-border bg-layer">
          {loadingReport ? (
            <div className="flex h-full min-h-56 flex-col items-center justify-center gap-3 text-muted-foreground">
              <span className="inline-block size-9 animate-spin rounded-full border-4 border-primary/30 border-t-primary" aria-hidden="true" />
              <p className="text-sm">Generando tiempos del ejecutivo…</p>
            </div>
          ) : rows.length ? (
            <div className="h-full overflow-auto scrollbar-gray">
              <table className="min-w-full divide-y divide-border text-xs">
                <thead className="sticky top-0 z-10 bg-jerarquia4 text-white">
                  <tr>
                    <th className="px-3 py-2.5 text-center font-semibold">#</th>
                    {columns.map((column) => <th key={column} className="whitespace-nowrap px-3 py-2.5 text-left font-semibold">{column}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rows.map((row, rowIndex) => {
                    const account = String(getValue(row, "Cuenta", "cuenta") || "");
                    const previousAccount = rowIndex ? String(getValue(rows[rowIndex - 1], "Cuenta", "cuenta") || "") : null;
                    const groupIndex = rows.slice(0, rowIndex + 1).reduce((count, current, index, list) => {
                      if (!index) return 0;
                      return String(getValue(current, "Cuenta", "cuenta") || "") !== String(getValue(list[index - 1], "Cuenta", "cuenta") || "") ? count + 1 : count;
                    }, 0);
                    return (
                      <tr key={`${account}-${rowIndex}`} className={`${groupIndex % 2 ? "bg-surface" : "bg-layer"} hover:bg-primary/10 ${rowIndex && account !== previousAccount ? "border-t-2 border-primary/40" : ""}`}>
                        <td className="px-3 py-2 text-center font-medium text-muted-foreground">{rowIndex + 1}</td>
                        {columns.map((column) => <td key={column} className="whitespace-nowrap px-3 py-2 text-foreground">{String(row[column] ?? "")}</td>)}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : reportStatus === "empty" ? (
            <div className="flex h-full min-h-56 flex-col items-center justify-center px-6 text-center">
              <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-surface text-muted-foreground"><IconDayExecutive className="size-6" /></span>
              <h3 className="text-sm font-semibold text-foreground">Sin entradas para este día</h3>
              <p className="mt-1 max-w-md text-xs text-muted-foreground">Selecciona otra fecha o ejecutivo para actualizar automáticamente el reporte.</p>
            </div>
          ) : (
            <div className="flex h-full min-h-56 flex-col items-center justify-center px-6 text-center">
              <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary"><IconDayExecutive className="size-6" /></span>
              <h3 className="text-sm font-semibold text-foreground">Selecciona un ejecutivo y una fecha</h3>
              <p className="mt-1 max-w-md text-xs text-muted-foreground">El reporte mostrará sus entradas ordenadas por hora de inicio.</p>
            </div>
          )}
        </section>
          </div>
        </div>
      </div>
    </ReusableModal>
  );
};

export default ModalDayExecutive;
