import React, { useRef, useState, lazy, Suspense } from "react";
import ModalBase from "../../../board/ModalBase";
import IconCircular from "../../../../../components/Iconos/IconCircular";
import {
  IconProcess,
  IconDefinition,
  IconAccountBlock,
  IconOnlineCharges,
  IconRepentance,
  IconStatement,
  IconBranchOffice
} from "./IconsProcessGespa";

const Definition = lazy(() => import("./process/Definition"));
const Repentance = lazy(() => import("./process/Repentance"));
const AccountBloking = lazy(() => import("./process/AccountBlocking"));
const OnlineCharges = lazy(() => import("./process/OnlineCharges"));
const AccountStatements = lazy(() => import("./process/AccountStatements"));
const BranchOffice = lazy(() => import("./process/BranchOffice"));

import { IconWarning } from "../../../board/executives/scripts/IconScripts";

const ProcessGespa = ({ onClose }) => {
  const modalRef = useRef(null);
  const { bounce } = ModalBase.useModalLogic();
  // Estado para controlar qué tab está activo
  const [activeTab, setActiveTab] = useState("setting");
  const [cartera, setCartera] = useState("");
  const [tipo, setTipo] = useState("individual");
  const [search, setSearch] = useState("");

  const handleBuscar = () => {
    console.log({
      cartera,
      tipo,
      search,
    });
  };
  // Configuración de tabs
  const tabs = [
    {
      id: "definicion",
      label: "Definición",
      icon: <IconDefinition className="size-5" />,
    },
    {
      id: "arrepentimientos",
      label: "Arrepentimientos",
      icon: <IconRepentance className="size-5" />,
      title: "Account",
      content:
        "Manage your account preferences here. You can update your personal information, change your password, configure notification settings, and customize your interface preferences to enhance your experience.",
    },
    {
      id: "bloqueo-cuentas",
      label: "Bloqueo cuentas",
      icon: <IconAccountBlock className="size-5" />,
      title: "User Management",
      content:
        "View and manage all users associated with your account or platform. You can edit user roles, deactivate accounts, invite new members, and track user activity from this section.",
    },
    {
      id: "cargos-en-linea",
      label: "Cargos en línea",
      icon: <IconOnlineCharges className="size-5" />,
      title: "Your Messages",
      content:
        "Stay in touch with your team or customers. This inbox shows all your recent messages, including system alerts and personal messages. Use filters and labels to stay organized.",
    },
    {
      id: "estados-cuenta",
      label: "Estados de cuenta",
      icon: <IconStatement className="size-5" />,
    },
    {
      id: "sucursales",
      label: "Sucursales",
      icon: <IconBranchOffice className="size-5" />,
    },
  ];

  // indicar si hay una pestaña seleccionada válida
  const isTabSelected = tabs.some((t) => t.id === activeTab);

  return (
    <div className="modal-blur-bg overflow-hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className={`${
          bounce ? "animate-bounce-modal" : ""
        } bg-[var(--color-surface)] rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden border border-[var(--color-border)] flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className=" bg-[var(--color-surface-secondary)] px-3 pt-3 w-full flex pb-3 gap-5 justify-between items-start border-b border-[var(--color-border)]">
          <div className="block md:flex items-start justify-between w-1/3 gap-3">
            <div className="flex items-center gap-2 text-jerarquia3">
              <IconCircular size="size-10">
                <IconProcess className="size-6" />
              </IconCircular>
              <h2 className="text-xl font-bold text-jerarquia3">
                <span className="text-[var(--color-text-muted)]">Procesos {">"} </span>Gespa
              </h2>
            </div>
          </div>
          <div className="w-1/3 right-0 flex justify-end">
            <button
              onClick={onClose}
              className="text-jerarquia3 hover:bg-[var(--color-surface)] hover:text-red-600 text-4xl items-center rounded-full flex w-8 h-8 transition-colors"
            >
              <span className="p-1.5"> &times;</span>
            </button>
          </div>
        </div>

        {/* Tabs Container */}
        <div className="flex items-start gap-8 w-full pr-5">
          {/* Sidebar Tabs */}
          <ul className="space-y-2 min-w-[230px] pl-4 bg-[var(--color-surface-secondary)] inline-block py-3">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex gap-2 items-center text-sm cursor-pointer py-4 px-6 transition-all ${
                  activeTab === tab.id
                    ? "text-jerarquia3 bg-[var(--color-surface)] rounded-l-xl font-semibold"
                    : "text-[var(--color-text-secondary)] font-medium hover:text-jerarquia2"
                }`}
              >
                {tab.icon}
                {tab.label}
              </li>
            ))}
          </ul>

          {/* Content Area */}
          <div className="flex-1 mt-8 pr-4 w-full">
            <Suspense fallback={<div className="text-sm text-[var(--color-text-muted)]">Cargando proceso...</div>}>
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`max-w-2xl ${
                    activeTab === tab.id ? "block" : "hidden"
                  }`}
                >
                  {/* Mostrar SearchBar SOLO en el tab Definición */}
                  {tab.id === "definicion" && (
                    <Definition
                      cartera={cartera}
                      onCarteraChange={setCartera}
                      tipo={tipo}
                      onTipoChange={setTipo}
                      searchValue={search}
                      onSearchChange={setSearch}
                      onSearchClick={handleBuscar}
                    />
                  )}
                  {tab.id === "arrepentimientos" && <Repentance />}
                  {tab.id === "bloqueo-cuentas" && <AccountBloking />}
                  {tab.id === "cargos-en-linea" && <OnlineCharges />}
                  {tab.id === "estados-cuenta" && <AccountStatements />}
                  {tab.id === "sucursales" && (<BranchOffice />)}
                </div>
              ))}
            </Suspense>

            {/* Si no hay pestaña seleccionada, mostrar mensaje */}
            {!isTabSelected && (
                <div className="flex flex-col items-center w-full justify-center text-center text-[var(--color-text-muted)] bg-[var(--color-surface-secondary)] rounded-lg py-20">
                              <IconWarning className="size-8" />
                              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                                Seleccione un proceso.
                              </p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessGespa;
