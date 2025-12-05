import React, { useRef, useState } from "react";
import ModalBase from "../../../board/ModalBase";
import IconCircular from "../../../../../components/iconos/IconCircular";
import { IconProcess, IconDefinition, IconAccountBlock, IconOnlineCharges, IconRepentance, IconStatement } from "./IconsProcessGespa";

const ProcessGespa = ({ onClose }) => {
  const modalRef = useRef(null);
  const { bounce } = ModalBase.useModalLogic();
  
  // Estado para controlar qué tab está activo
  const [activeTab, setActiveTab] = useState('setting');

  // Configuración de tabs
  const tabs = [
    {
      id: 'definicion',
      label: 'Definición',
      icon: (
        <IconDefinition className="size-5" />
      ),
      title: 'Welcome to Your Dashboard',
      content: 'Get a quick overview of your account and activity. Use the tabs on the left to access your settings, manage users, read messages, and view notifications. This dashboard helps you stay organized and manage everything in one place.'
    },
    {
      id: 'arrepentimientos',
      label: 'Arrepentimientos',
      icon: (
        <IconRepentance className="size-5" />
      ),
      title: 'Account',
      content: 'Manage your account preferences here. You can update your personal information, change your password, configure notification settings, and customize your interface preferences to enhance your experience.'
    },
    {
      id: 'bloqueo-cuentas',
      label: 'Bloqueo cuentas',
      icon: (
        <IconAccountBlock className="size-5" />
      ),
      title: 'User Management',
      content: 'View and manage all users associated with your account or platform. You can edit user roles, deactivate accounts, invite new members, and track user activity from this section.'
    },
    {
      id: 'cargos-en-linea',
      label: 'Cargos en línea',
      icon: (
        <IconOnlineCharges className="size-5" />
      ),
      title: 'Your Messages',
      content: 'Stay in touch with your team or customers. This inbox shows all your recent messages, including system alerts and personal messages. Use filters and labels to stay organized.'
    },
    {
      id: 'estados-cuenta',
      label: 'Estados de cuenta',
      icon: (
        <IconStatement className="size-5" />
      ),
      title: 'Recent Notifications',
      content: "Here you'll find real-time alerts about your activity, system updates, user mentions, and more. You can mark them as read or customize what kind of notifications you'd like to receive in the settings tab."
    }
  ];

  return (
    <div className="modal-blur-bg overflow-hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className={`${
          bounce ? "animate-bounce-modal" : ""
        } bg-white rounded-2xl shadow-2xl w-full max-w-7xl overflow-hidden border border-gray-300 flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
             <div className=" bg-neutral-100 px-3 pt-3 w-full flex pb-3 gap-5 justify-between items-start border-b border-gray-200">
      <div className="block md:flex items-start justify-between w-1/3 gap-3">
        <div className="flex items-center gap-2 text-jerarquia3">
           <IconCircular size="size-10">
              <IconProcess className="size-6" />
            </IconCircular>
          <h2 className="text-xl font-bold text-jerarquia3"><span className="text-gray-500">Procesos {">"} </span>Gespa</h2>
        </div>
      </div>
      <div className="w-1/3">
        <span className="text-lg text-jerarquia4 whitespace-pre p-1 rounded-md bg-neutral-300">Cartera - American Express</span>
      </div>
      <div className="w-1/3 right-0 flex justify-end">
        <button
          onClick={onClose}
          className="text-jerarquia3 hover:bg-background-dashboard hover:text-red-600 text-4xl rounded-full w-8 h-8 flex items-center transition-colors"
        >
          &times;
        </button>
      </div>
    </div>

        {/* Tabs Container */}
        <div className="flex items-start gap-10 max-w-4xl">
          {/* Sidebar Tabs */}
          <ul className="space-y-2 min-w-[230px] bg-gray-100 inline-block py-3">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex gap-2 items-center text-sm cursor-pointer py-4 px-6 transition-all ${
                  activeTab === tab.id
                    ? 'text-jerarquia3 bg-white font-semibold'
                    : 'text-slate-900 font-medium hover:text-jerarquia2'
                }`}
              >
                {tab.icon}
                {tab.label}
              </li>
            ))}
          </ul>

          {/* Content Area */}
          <div className="flex-1 mt-4 pr-4">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`max-w-2xl ${activeTab === tab.id ? 'block' : 'hidden'}`}
              >
                <h4 className="text-base font-semibold text-slate-900">
                  {tab.title}
                </h4>
                <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                  {tab.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessGespa;