import React, { useState } from "react";

const ModalCatalogosContent = () => {
    const [selectedCatalog, setSelectedCatalog] = useState("Sucursales");

    // Datos de los catálogos
    const catalogsData = [
        { 
            catalog: "Sucursales", 
            description: "Sucursales de Consorcio Jurídico distribuidas estratégicamente en diferentes ubicaciones para brindar servicio personalizado a nuestros clientes",
            values: [
                { valor: "Andalucía 245", detalle: "Sucursal principal ubicada en la colonia Roma Norte, Ciudad de México, con servicio completo de atención al cliente y gestión de cuentas" },
                { valor: "Andalucía 254", detalle: "Sucursal secundaria en la misma zona de Roma Norte, especializada en atención express y consultas rápidas" },
                { valor: "Eugenia 4", detalle: "Oficina comercial en la colonia Narvarte, enfocada en nuevos clientes y servicios de prospección" },
                { valor: "Eugenia 8", detalle: "Centro de operaciones en Narvarte, dedicado principalmente a seguimiento de cuentas activas y gestión de cartera" },
                { valor: "Guadalajara", detalle: "Sucursal regional en Jalisco que atiende todo el occidente del país con un equipo especializado en gestión territorial" },
                { valor: "Monterrey", detalle: "Oficina del noreste ubicada en Nuevo León, con cobertura para toda la región norte y servicios empresariales" },
                { valor: "Veracruz", detalle: "Sucursal del golfo que cubre la región sureste con enfoque en clientes del sector portuario e industrial" }
            ]
        },
        { 
            catalog: "Situaciones", 
            description: "Situaciones específicas en las que puede encontrarse una cuenta de cliente durante el proceso de gestión. Estas situaciones determinan el tipo de estrategia a seguir",
            values: [
                { valor: "Activa", detalle: "La cuenta se encuentra en operación normal, con pagos al corriente y sin restricciones de ningún tipo para realizar operaciones" },
                { valor: "Suspendida", detalle: "Cuenta temporalmente suspendida por incumplimiento de pagos o por solicitud del cliente, pendiente de regularización" },
                { valor: "Cancelada", detalle: "Cuenta cerrada definitivamente por decisión empresarial o del cliente, sin posibilidad de reactivación en el sistema actual" },
                { valor: "En revisión", detalle: "Cuenta bajo análisis por el departamento de riesgos debido a patrones irregulares de pago o comportamiento inusual" },
                { valor: "Morosa", detalle: "Cuenta con atraso en pagos superior a 90 días, requiere gestión especializada de cobranza y seguimiento estrecho" }
            ]
        },
        { 
            catalog: "Bajas", 
            description: "Motivos específicos por los cuales se procede a dar de baja a un ejecutivo del sistema, cada uno con implicaciones diferentes para el proceso",
            values: [
                { valor: "Renuncia voluntaria", detalle: "El ejecutivo decidió terminar la relación laboral por motivos personales, entregando carta de renuncia con preaviso reglamentario" },
                { valor: "Despido justificado", detalle: "Terminación del contrato por incumplimiento grave de las obligaciones laborales o violación de políticas internas de la empresa" },
                { valor: "Fin de contrato temporal", detalle: "Finalización natural del período establecido en un contrato por tiempo determinado, sin renovación acordada" },
                { valor: "Restructuración organizacional", detalle: "Eliminación del puesto debido a cambios en la estructura organizacional o reducción de personal por causas económicas" },
                { valor: "Jubilación", detalle: "Retiro del ejecutivo por haber cumplido con los requisitos de edad y tiempo de servicio para acceder a la jubilación" }
            ]
        },
        { 
            catalog: "Niveles", 
            description: "Los cuatro niveles jerárquicos generales que clasifican las cuentas según su complejidad, riesgo y estrategia de gestión requerida",
            values: [
                { valor: "Nivel 1 - Básico", detalle: "Cuentas de nueva creación o con historial simple, requieren gestión estándar con procedimientos básicos de seguimiento" },
                { valor: "Nivel 2 - Intermedio", detalle: "Cuentas con cierta complejidad que requieren atención especializada y seguimiento más frecuente por parte del ejecutivo" },
                { valor: "Nivel 3 - Avanzado", detalle: "Cuentas de alto valor o con situaciones complejas que demandan gestión especializada y toma de decisiones estratégicas" },
                { valor: "Nivel 4 - Experto", detalle: "Cuentas críticas o de máxima complejidad que requieren intervención de ejecutivos senior y autorización de gerencia" }
            ]
        },
        { 
            catalog: "Contactos", 
            description: "Tipos de contactos que se pueden establecer durante una gestión telefónica o presencial, cada uno con implicaciones específicas para el seguimiento",
            values: [
                { valor: "Cliente titular directo", detalle: "Contacto establecido directamente con la persona titular de la cuenta, con capacidad plena para tomar decisiones y comprometerse" },
                { valor: "Familiar autorizado", detalle: "Comunicación con un familiar del titular que cuenta con autorización expresa para recibir información y gestionar la cuenta" },
                { valor: "Tercero con poder legal", detalle: "Persona física o moral que actúa en representación del titular mediante poder notarial o documento legal válido" },
                { valor: "Contestadora automática", detalle: "Mensaje dejado en el sistema de contestadora automática del número registrado, requiere seguimiento posterior" },
                { valor: "Secretaria o asistente", detalle: "Contacto con personal de apoyo en empresas que puede recibir información general pero no tomar decisiones definitivas" }
            ]
        }
    ];

    // Obtener los valores del catálogo seleccionado
    const getSelectedCatalogValues = () => {
        const catalog = catalogsData.find(cat => cat.catalog === selectedCatalog);
        return catalog ? catalog.values : [];
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            gap: "1rem"
        }}>

            {/* NIVEL 2: Tabla de Catálogos */}
            <div className="bg-white rounded-lg p-4 shadow border border-[var(--color-jerarquia1)] flex flex-col" style={{ flex: 1 }}>
                <div className="flex items-center mb-3 w-full">
                    <span className="text-sm font-semibold pl-1" style={{ color: "var(--color-jerarquia2)", minWidth: 100 }}></span>
                </div>
                <div
                    style={{
                        overflowX: "auto",
                        overflowY: "auto",
                        maxHeight: "250px",
                        height: "100%",
                        scrollbarColor: "#b0b0b0 #f5f5f5",
                        scrollbarWidth: "thin",
                        flex: 1
                    }}
                    className="scrollbar-gray"
                >
                    <table className="w-full text-sm mb-2 text-black">
                        <thead style={{ position: "sticky", top: 0, zIndex: 2, background: "var(--color-background-secondary)" }}>
                            <tr className="bg-[var(--color-background-secondary)] text-white">
                                <th className="px-3 py-2 text-left border-r border-[var(--color-jerarquia1)] rounded-tl-md w-1/3">Catálogo</th>
                                <th className="px-3 py-2 text-left rounded-tr-md w-2/3">Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {catalogsData.map((item) => (
                                <tr 
                                    key={item.catalog}
                                    className={`cursor-pointer transition-colors ${selectedCatalog === item.catalog ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                                    onClick={() => setSelectedCatalog(item.catalog)}
                                >
                                    <td className={`px-3 py-2 border-b border-[var(--color-jerarquia1)] font-semibold ${selectedCatalog === item.catalog ? 'text-blue-600' : ''}`}>
                                        {item.catalog}
                                    </td>
                                    <td className="px-3 py-2 border-b border-[var(--color-jerarquia1)]">
                                        {item.description}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* NIVEL 3: Tabla de Valores */}
            <div className="bg-white rounded-lg p-4 shadow border border-[var(--color-jerarquia1)] flex flex-col" style={{ flex: 1 }}>
                <div className="flex items-center mb-3 w-full">
                    <span className="text-sm font-semibold pl-1" style={{ color: "var(--color-jerarquia2)", minWidth: 100 }}></span>
                </div>
                <div
                    style={{
                        overflowX: "auto",
                        overflowY: "auto",
                        maxHeight: "250px",
                        height: "100%",
                        scrollbarColor: "#b0b0b0 #f5f5f5",
                        scrollbarWidth: "thin",
                        flex: 1
                    }}
                    className="scrollbar-gray"
                >
                    <table className="w-full text-sm text-black">
                        <thead style={{ position: "sticky", top: 0, zIndex: 2, background: "var(--color-background-secondary)" }}>
                            <tr className="bg-[var(--color-background-secondary)] text-white border-b border-[var(--color-jerarquia1)]">
                                <th className="px-3 py-2 text-left border-r border-[var(--color-jerarquia1)] rounded-tl-md w-1/3">Valor</th>
                                <th className="px-3 py-2 text-left rounded-tr-md w-2/3">Detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getSelectedCatalogValues().map((item, i) => (
                                <tr key={i} className={i === 0 ? 'bg-blue-50' : ''}>
                                    <td className={`px-3 py-2 border-b border-[var(--color-jerarquia1)] font-semibold ${i === 0 ? 'text-blue-600' : ''}`}>
                                        {item.valor}
                                    </td>
                                    <td className="px-3 py-2 border-b border-[var(--color-jerarquia1)]">
                                        {item.detalle}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <style>{`
                .scrollbar-gray::-webkit-scrollbar {
                    height: 8px;
                    width: 8px;
                    background: #f5f5f5;
                }
                .scrollbar-gray::-webkit-scrollbar-thumb {
                    background: #b0b0b0;
                    border-radius: 4px;
                }
                .scrollbar-gray::-webkit-scrollbar-thumb:hover {
                    background: #888;
                }
            `}</style>
        </div>
    );
};

export default ModalCatalogosContent;