import React, { useState, useEffect } from "react";

// Importar componentes de información
import OffersContent from "./Offers";
import PaymentsContent from "./Payments";
import ReportingPaymentsContent from "./ReportingPayments";
import SearchesContent from "./Searches";
import WrongsContent from "./Wrongs";
import DarkListContent from "../DarkList";
import RegrestContent from "../Regrest";
import AddressesContent from "./Addresses";
import EmailsContent from "./Emails";
import CommentsContent from "./Comments";
import VGP from "./VGP";

// Identificadores para los componentes
const COMPONENT_KEYS = {
  OFFERS: "Ofrecimientos",
  PAYMENTS: "Pagos",
  REPORTING_PAYMENTS: "Pagos Reportados",
  SEARCHES: "Búsquedas",
  WRONGS: "Datos Erróneos",
  DARK_LIST: "Lista Negra",
  REGREST: "Arrepentimientos",
  ADDRESSES: "Domicilios",
  EMAILS: "Correos",
  COMMENTS: "Comentarios",
  VGP: "VGP",
};

// Iconos para cada componente
export const COMPONENT_ICONS_INFORMACION = {
  [COMPONENT_KEYS.OFFERS]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
      />
    </svg>
  ),
  [COMPONENT_KEYS.PAYMENTS]: <span className="text-sm font-bold">$</span>,
  [COMPONENT_KEYS.REPORTING_PAYMENTS]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  ),
  [COMPONENT_KEYS.SEARCHES]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  ),
  [COMPONENT_KEYS.WRONGS]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
      />
    </svg>
  ),
  [COMPONENT_KEYS.DARK_LIST]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  ),
  [COMPONENT_KEYS.REGREST]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
      />
    </svg>
  ),
  [COMPONENT_KEYS.ADDRESSES]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
      />
    </svg>
  ),
  [COMPONENT_KEYS.EMAILS]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
      />
    </svg>
  ),
  [COMPONENT_KEYS.COMMENTS]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
      />
    </svg>
  ),
  [COMPONENT_KEYS.VGP]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 56 56"
    >
      <path
        fill="currentColor"
        width={24}
        height={24}
        d="M15.555 53.125h24.89c4.852 0 7.266-2.437 7.266-7.336V10.234c0-4.875-2.414-7.359-7.266-7.359h-24.89c-4.828 0-7.266 2.484-7.266 7.36v35.554c0 4.898 2.438 7.336 7.266 7.336m.187-3.773c-2.414 0-3.68-1.29-3.68-3.633V10.305c0-2.32 1.266-3.657 3.704-3.657h24.492c2.437 0 3.68 1.313 3.68 3.657v35.414c0 2.343-1.243 3.633-3.657 3.633Zm3.399-32.907h17.765c.82 0 1.453-.656 1.453-1.476c0-.797-.632-1.406-1.453-1.406H19.141c-.868 0-1.477.609-1.477 1.406c0 .82.61 1.476 1.477 1.476m0 8.18h17.765c.82 0 1.453-.656 1.453-1.477c0-.796-.632-1.406-1.453-1.406H19.141c-.868 0-1.477.61-1.477 1.406c0 .82.61 1.477 1.477 1.477m0 8.18h8.414c.82 0 1.453-.633 1.453-1.43c0-.82-.633-1.453-1.453-1.453H19.14c-.868 0-1.477.633-1.477 1.453c0 .797.61 1.43 1.477 1.43"
        viewBox="0 0 56 56"
      ></path>
    </svg>
  ),
};

// Lista de tabs para información
export const tabsListInformacion = [
  { key: COMPONENT_KEYS.OFFERS, component: OffersContent },
  { key: COMPONENT_KEYS.PAYMENTS, component: PaymentsContent },
  {
    key: COMPONENT_KEYS.REPORTING_PAYMENTS,
    component: ReportingPaymentsContent,
  },
  { key: COMPONENT_KEYS.SEARCHES, component: SearchesContent },
  { key: COMPONENT_KEYS.WRONGS, component: WrongsContent },
  { key: COMPONENT_KEYS.DARK_LIST, component: DarkListContent },
  { key: COMPONENT_KEYS.REGREST, component: RegrestContent },
  { key: COMPONENT_KEYS.ADDRESSES, component: AddressesContent },
  { key: COMPONENT_KEYS.EMAILS, component: EmailsContent },
  { key: COMPONENT_KEYS.COMMENTS, component: CommentsContent },
  { key: COMPONENT_KEYS.VGP, component: VGP },
];

// Para compatibilidad
export const tabsList = tabsListInformacion;

// Exportar iconos para uso externo
export const COMPONENT_ICONS = COMPONENT_ICONS_INFORMACION;

// Componente de navegación del carrusel (mantenido para compatibilidad con ModalBaseInformacion)
export const CarouselNavigation = ({
  currentIndex,
  currentName,
  componentIcons = COMPONENT_ICONS,
}) => {
  return (
    <div className="flex items-center gap-2">
      <span style={{ color: "var(--color-jerarquia3)" }}>
        {componentIcons[currentName]}
      </span>
      <span
        className="text-sm font-semibold"
        style={{ color: "var(--color-jerarquia3)" }}
      >
        {currentName}
      </span>
      <span className="text-xs text-gray-500">
        ({currentIndex + 1} / {tabsList.length})
      </span>
    </div>
  );
};

const ModalCicle = ({
  tabsList = tabsListInformacion,
  componentIcons = COMPONENT_ICONS_INFORMACION,
  mostrarTabla,
  setMostrarTabla,
  onNavigationReady,
  onSizeChange,
  headerControlsActive = false,
  headerStates = {},
  activeTab: externalActiveTab,
  setActiveTab: externalSetActiveTab,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(0);

  const activeTab =
    externalActiveTab !== undefined ? externalActiveTab : internalActiveTab;
  const setActiveTab = externalSetActiveTab || setInternalActiveTab;

  // Estados para props de componentes que los requieren
  const [mostrarTablaReporting, setMostrarTablaReporting] = useState(false);
  const [mostrarTablaWrongs, setMostrarTablaWrongs] = useState(false);
  const [mostrarTablaAddresses] = useState(false);
  const [mostrarTablaEmails] = useState(false);
  const [regrestExpanded, setRegrestExpanded] = useState(false);

  // Key única para forzar remontaje de componentes al cambiar de tab
  const [componentKey, setComponentKey] = useState(0);

  // Reiniciar todos los estados cuando cambia el tab activo
  useEffect(() => {
    // Solo limpiar mostrarTablaReporting si el tab activo NO es Pagos Reportados
    if (tabsList[activeTab].key !== COMPONENT_KEYS.REPORTING_PAYMENTS) {
      setMostrarTablaReporting(false);
      localStorage.removeItem("reportingPaymentsParams");
    }
    // Solo limpiar mostrarTablaWrongs si el tab activo NO es Datos Erróneos
    if (tabsList[activeTab].key !== COMPONENT_KEYS.WRONGS) {
      setMostrarTablaWrongs(false);
      localStorage.removeItem("wrongsParams");
    }
    setRegrestExpanded(false);
    setComponentKey((prev) => prev + 1);
  }, [activeTab]);

  // Notificar al padre cuando cambia el tamaño
  useEffect(() => {
    const needsXL =
      mostrarTablaReporting ||
      mostrarTablaWrongs ||
      mostrarTablaAddresses ||
      mostrarTablaEmails ||
      regrestExpanded;
    if (onSizeChange) {
      onSizeChange(needsXL ? "informacion-xl" : "informacion");
    }
  }, [
    mostrarTablaReporting,
    mostrarTablaWrongs,
    mostrarTablaAddresses,
    mostrarTablaEmails,
    regrestExpanded,
    onSizeChange,
  ]);

  const currentTabKey = tabsList[activeTab].key;

  // Notificar al padre sobre la navegación disponible (para el header)
  useEffect(() => {
    if (onNavigationReady) {
      onNavigationReady({
        currentIndex: activeTab,
        currentName: currentTabKey,
        onTabChange: setActiveTab, // Permitir cambio de tab desde el header
      });
    }
  }, [activeTab, currentTabKey, onNavigationReady]);

  // Renderizar el componente según el tab activo
  const renderTabContent = (tabKey) => {
    const tab = tabsList.find((t) => t.key === tabKey);
    if (!tab) return null;

    // Si es un componente de información, usar lógica específica con props
    if (Object.values(COMPONENT_KEYS).includes(tabKey)) {
      switch (tabKey) {
        case COMPONENT_KEYS.REPORTING_PAYMENTS:
          return (
            <ReportingPaymentsContent
              mostrarTabla={mostrarTabla}
              setMostrarTabla={setMostrarTabla}
            />
          );
        case COMPONENT_KEYS.WRONGS:
          return (
            <WrongsContent
              mostrarTabla={mostrarTablaWrongs}
              setMostrarTabla={setMostrarTablaWrongs}
            />
          );
        case COMPONENT_KEYS.ADDRESSES:
          return <AddressesContent mostrarTabla={mostrarTablaAddresses} />;
        case COMPONENT_KEYS.EMAILS:
          return <EmailsContent mostrarTabla={mostrarTablaEmails} />;
        case COMPONENT_KEYS.REGREST:
          return (
            <RegrestContent
              growModal={() => setRegrestExpanded(true)}
              isExpanded={regrestExpanded}
            />
          );
        case COMPONENT_KEYS.OFFERS:
          return (
            <OffersContent
              headerControlsActive={headerControlsActive}
              headerStates={headerStates}
            />
          );
        case COMPONENT_KEYS.PAYMENTS:
          return <PaymentsContent />;
        case COMPONENT_KEYS.SEARCHES:
          return <SearchesContent />;
        case COMPONENT_KEYS.DARK_LIST:
          return <DarkListContent />;
        case COMPONENT_KEYS.COMMENTS:
          return <CommentsContent />;
        case COMPONENT_KEYS.VGP:
          return <VGP />;
        default:
          return null;
      }
    } else {
      // Para otros tabs (como Accionamientos), usar el componente directamente
      const Component = tab.component;
      return <Component setMostrarTabla={setMostrarTabla} />;
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Contenido del tab activo */}
      <div className="flex-1 overflow-auto">
        {tabsList.map((tab, index) => (
          <div
            key={tab.key}
            id={`tab-info-content-${index}`}
            className={activeTab === index ? "" : "hidden"}
            role="tabpanel"
            aria-labelledby={`tab-info-item-${index}`}
          >
            <div key={`component-${index}-${componentKey}`}>
              {activeTab === index && renderTabContent(tab.key)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModalCicle;
