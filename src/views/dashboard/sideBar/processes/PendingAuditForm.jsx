import React from "react";

const PendingAuditForm = ({ title, formId, description }) => (
  <section className="flex h-full flex-col items-center justify-center p-8 text-center">
    <div className="max-w-lg rounded-2xl border border-border bg-layer p-6 shadow-sm">
      <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
        pending-audit
      </span>
      <h2 className="mt-4 text-xl font-semibold text-foreground">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <dl className="mt-5 rounded-xl bg-surface-secondary p-4 text-left text-sm">
        <div className="flex justify-between gap-4">
          <dt className="font-medium text-muted-foreground">Formulario legacy</dt>
          <dd className="font-semibold text-foreground">{formId}</dd>
        </div>
        <div className="mt-2 flex justify-between gap-4">
          <dt className="font-medium text-muted-foreground">Escrituras HTTP</dt>
          <dd className="font-semibold text-amber-700">Bloqueadas</dd>
        </div>
      </dl>
    </div>
  </section>
);

export default PendingAuditForm;
