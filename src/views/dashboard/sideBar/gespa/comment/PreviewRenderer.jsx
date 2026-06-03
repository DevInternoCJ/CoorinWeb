// PreviewRenderer.jsx
import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";

/**
 * PreviewRenderer
 * - recibe `file` y muestra vista previa: imagen, texto, tabla (excel), o mensaje no disponible.
 * - mantiene la misma lógica de formateo de fechas y horas del original.
 */
const PreviewRenderer = ({ file, fileName }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewText, setPreviewText] = useState(null);
  const [previewTable, setPreviewTable] = useState(null);
  const prevUrlRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    // cleanup helper
    const cleanupPrevUrl = () => {
      if (prevUrlRef.current) {
        try {
          URL.revokeObjectURL(prevUrlRef.current);
        } catch {
          /* ignore */
        }
        prevUrlRef.current = null;
      }
    };

    if (!file) {
      cleanupPrevUrl();
      setPreviewUrl(null);
      setPreviewText(null);
      setPreviewTable(null);
      return;
    }

    // images
    const isImage = file.type && file.type.startsWith("image/");
    if (isImage) {
      const url = URL.createObjectURL(file);
      if (prevUrlRef.current && prevUrlRef.current !== url) cleanupPrevUrl();
      prevUrlRef.current = url;
      if (mounted) {
        setPreviewUrl(url);
        setPreviewText(null);
        setPreviewTable(null);
      }
      return () => {
        mounted = false;
      };
    }

    // text-like
    const isText = file.type && file.type.startsWith("text/");
    const textExt = /\.csv$|\.txt$|\.json$/i.test(file.name || "");
    if (isText || textExt) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!mounted) return;
        const txt = String(e.target.result || "").slice(0, 100000);
        setPreviewText(txt);
        setPreviewUrl(null);
        setPreviewTable(null);
      };
      reader.onerror = () => {
        if (!mounted) return;
        setPreviewText(null);
      };
      reader.readAsText(file);
      return () => {
        mounted = false;
      };
    }

    // excel
    const isExcel = /\.xlsx?$|\.xls$/i.test(file.name || "");
    if (isExcel) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "array", cellDates: true });
          const firstSheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[firstSheetName];
          const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true });

          const pad = (n) => String(n).padStart(2, "0");
          const excelSerialToDate = (v) => {
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
              return `${pad(val.getDate())}/${pad(val.getMonth() + 1)}/${val.getFullYear()}`;
            }
            if (typeof val === "number") {
              const d = excelSerialToDate(val);
              if (d && !isNaN(d)) return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
            }
            const parsed = new Date(String(val));
            if (!isNaN(parsed)) return `${pad(parsed.getDate())}/${pad(parsed.getMonth() + 1)}/${parsed.getFullYear()}`;
            return String(val);
          };

          const formatTime = (val) => {
            if (val == null || val === "") return "";
            let dateObj = null;
            if (val instanceof Date && !isNaN(val)) {
              dateObj = val;
            } else if (typeof val === "number") {
              if (val > 1) {
                dateObj = excelSerialToDate(val);
              } else {
                const ms = Math.round(val * 24 * 3600 * 1000);
                dateObj = new Date(ms);
              }
            } else {
              const s = String(val).trim();
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
            const ampm = hh24 >= 12 ? "pm" : "am";
            return `${pad(hh12)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
          };

          const formatted = rows.map((row) => {
            const r = Array.isArray(row) ? row.slice() : [];
            r[1] = formatDate(r[1]);
            r[2] = formatTime(r[2]);
            return r;
          });

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

    // other types
    setPreviewUrl(null);
    setPreviewText(null);
    setPreviewTable(null);

    return () => {
      mounted = false;
    };
  }, [file]);

  // cleanup on unmount
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

  // Render
  if (!file) {
    return (
      <div className="border-none rounded-lg p-3 bg-white dark:bg-[var(--color-surface)] text-sm text-gray-500">
        No hay archivo seleccionado
      </div>
    );
  }

  if (previewUrl) {
    return (
      <div className="border border-[var(--color-border)] rounded p-2 bg-[var(--color-surface)]">
        <img src={previewUrl} alt={fileName || "preview"} className="max-h-96 w-auto mx-auto" />
      </div>
    );
  }

  if (previewTable) {
    return (
      <div className="border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] max-h-96 overflow-auto text-xs coorin-modal-scroll-gray">
        <table className="modal-table">
          <thead>
            <tr>
              {["Cuenta", "Fechas", "Horas", "Ejecutivo", "Comentario"].map((label, ci) => (
                <th key={ci} className="sticky top-0 bg-[var(--color-background-secondary)] text-white text-left p-2 border-none">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {previewTable.slice(1, 51).map((row, ri) => (
              <tr key={ri} className="even:bg-[var(--color-surface-secondary)]/50">
                {[0, 1, 2, 3, 4].map((ci) => (
                  <td key={ci} className="p-2 align-top text-[var(--color-text-secondary)] border-b border-[var(--color-border)]">
                    {String((row || [])[ci] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (previewText) {
    return (
      <div className="border border-[var(--color-border)] rounded p-3 bg-[var(--color-surface)] text-[var(--color-text-secondary)] max-h-96 overflow-auto text-xs coorin-modal-scroll-gray">
        <pre className="whitespace-pre-wrap">{previewText}</pre>
      </div>
    );
  }

  return (
    <div className="border border-[var(--color-border)] rounded p-3 bg-[var(--color-surface)] text-sm text-[var(--color-text-secondary)]">
      Vista previa no disponible para este tipo de archivo: <strong>{fileName}</strong>
    </div>
  );
};

export default PreviewRenderer;
