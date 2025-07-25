import React, { useState } from "react";
import { IconProductividad } from "../IconesConsultations";

const DropdownArrow = () => (
    <span
        style={{
            pointerEvents: "none",
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "1.15rem",
            color: "#222",
            display: "flex",
            alignItems: "center"
        }}
    >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M6 8l4 4 4-4" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </span>
);

const ModalProductividadContent = () => {
    const [selectedPeriod, setSelectedPeriod] = useState("mensual");
    const [selectedTeam, setSelectedTeam] = useState("todos");
    const [selectedIndicator, setSelectedIndicator] = useState("productividad");

    // Datos de ejemplo para la tabla de productividad por ejecutivo
    const executiveData = [
        { id: 5, negociaciones: 45, montoNegociaciones: 125000, saldoSolucionado: 98000, montoPromedio: 2778, saldo: 27000 },
        { id: 7, negociaciones: 38, montoNegociaciones: 110000, saldoSolucionado: 87000, montoPromedio: 2895, saldo: 23000 },
        { id: 8, negociaciones: 42, montoNegociaciones: 118000, saldoSolucionado: 95000, montoPromedio: 2810, saldo: 23000 },
        { id: 9, negociaciones: 35, montoNegociaciones: 98000, saldoSolucionado: 78000, montoPromedio: 2800, saldo: 20000 },
        { id: 10, negociaciones: 48, montoNegociaciones: 135000, saldoSolucionado: 108000, montoPromedio: 2813, saldo: 27000 },
        { id: 11, negociaciones: 41, montoNegociaciones: 115000, saldoSolucionado: 92000, montoPromedio: 2805, saldo: 23000 },
        { id: 12, negociaciones: 39, montoNegociaciones: 108000, saldoSolucionado: 86000, montoPromedio: 2769, saldo: 22000 },
        { id: 13, negociaciones: 44, montoNegociaciones: 122000, saldoSolucionado: 97000, montoPromedio: 2773, saldo: 25000 },
        { id: 14, negociaciones: 36, montoNegociaciones: 102000, saldoSolucionado: 81000, montoPromedio: 2833, saldo: 21000 },
        { id: 15, negociaciones: 47, montoNegociaciones: 130000, saldoSolucionado: 105000, montoPromedio: 2766, saldo: 25000 },
        { id: 16, negociaciones: 33, montoNegociaciones: 95000, saldoSolucionado: 76000, montoPromedio: 2879, saldo: 19000 },
        { id: 17, negociaciones: 40, montoNegociaciones: 112000, saldoSolucionado: 89000, montoPromedio: 2800, saldo: 23000 },
        { id: 18, negociaciones: 37, montoNegociaciones: 105000, saldoSolucionado: 84000, montoPromedio: 2838, saldo: 21000 },
        { id: 19, negociaciones: 43, montoNegociaciones: 120000, saldoSolucionado: 96000, montoPromedio: 2791, saldo: 24000 },
        { id: 20, negociaciones: 34, montoNegociaciones: 97000, saldoSolucionado: 77000, montoPromedio: 2853, saldo: 20000 },
        { id: 21, negociaciones: 46, montoNegociaciones: 128000, saldoSolucionado: 102000, montoPromedio: 2783, saldo: 26000 },
        { id: 22, negociaciones: 41, montoNegociaciones: 114000, saldoSolucionado: 91000, montoPromedio: 2780, saldo: 23000 }
    ];

    // Calcular totales
    const totals = executiveData.reduce((acc, exec) => ({
        negociaciones: acc.negociaciones + exec.negociaciones,
        montoNegociaciones: acc.montoNegociaciones + exec.montoNegociaciones,
        saldoSolucionado: acc.saldoSolucionado + exec.saldoSolucionado,
        montoPromedio: 0,
        saldo: acc.saldo + exec.saldo
    }), { negociaciones: 0, montoNegociaciones: 0, saldoSolucionado: 0, montoPromedio: 0, saldo: 0 });

    totals.montoPromedio = Math.round(totals.montoNegociaciones / totals.negociaciones);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] h-full flex flex-col" style={{ minWidth: 0 }}>
            {/* Fila de filtros con label a la izquierda, selects centrados */}
            <div className="flex items-center mb-2 w-full">
                <span className="text-xs font-semibold pl-1 mr-4" style={{ color: "var(--color-jerarquia2)" }}>Filtros</span>
                <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <select 
                                value={selectedIndicator}
                                onChange={(e) => setSelectedIndicator(e.target.value)}
                                className="w-32 font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                            >
                                <option value="productividad">Productividad</option>
                                <option value="negociaciones">Negociaciones</option>
                                <option value="rendimiento">Rendimiento</option>
                            </select>
                            <DropdownArrow />
                        </div>
                        <div className="relative">
                            <select 
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                className="w-32 font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                            >
                                <option value="diario">Diario</option>
                                <option value="semanal">Semanal</option>
                                <option value="mensual">Mensual</option>
                                <option value="trimestral">Trimestral</option>
                            </select>
                            <DropdownArrow />
                        </div>
                        <div className="relative">
                            <select 
                                value={selectedTeam}
                                onChange={(e) => setSelectedTeam(e.target.value)}
                                className="w-45 font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                            >
                                <option value="todos">Todos los equipos</option>
                                <option value="ventas">Equipo de Ventas</option>
                                <option value="cobranza">Equipo de Cobranza</option>
                                <option value="atencion">Atención al Cliente</option>
                            </select>
                            <DropdownArrow />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabla con scroll */}
            <div
                style={{
                    overflowX: "auto",
                    overflowY: "auto",
                    maxHeight: "31vh",
                    height: "100%",
                    scrollbarColor: "#b0b0b0 #f5f5f5",
                    scrollbarWidth: "thin",
                    flex: 1
                }}
                className="scrollbar-gray"
            >
                <table className="text-xs mb-2 text-black" style={{ minWidth: "890px", width: "max-content" }}>
                    <thead style={{ position: "sticky", top: 0, zIndex: 2, background: "var(--color-background-secondary)" }}>
                        <tr className="bg-[var(--color-background-secondary)] text-white">
                            <th className="px-2 py-1 text-center border-r border-[var(--color-jerarquia1)] rounded-tl-md">Ejecutivos</th>
                            <th className="px-2 py-1 text-center border-r border-[var(--color-jerarquia1)]">Negociaciones</th>
                            <th className="px-2 py-1 text-center border-r border-[var(--color-jerarquia1)]">MontoNegociaciones</th>
                            <th className="px-2 py-1 text-center border-r border-[var(--color-jerarquia1)]">SaldoSolucionado</th>
                            <th className="px-2 py-1 text-center border-r border-[var(--color-jerarquia1)]">MontoPromedio</th>
                            <th className="px-2 py-1 text-center rounded-tr-md">Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {executiveData.map((executive, i) => (
                            <tr key={executive.id}>
                                <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)] text-center font-semibold">{executive.id}</td>
                                <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)] text-center">{executive.negociaciones}</td>
                                <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)] text-right">{formatCurrency(executive.montoNegociaciones)}</td>
                                <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)] text-right">{formatCurrency(executive.saldoSolucionado)}</td>
                                <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)] text-right">{formatCurrency(executive.montoPromedio)}</td>
                                <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)] text-right">{formatCurrency(executive.saldo)}</td>
                            </tr>
                        ))}
                        {/* Fila de totales */}
                        <tr className="bg-[var(--color-background-secondary)] text-white font-bold">
                            <td className="px-2 py-1 text-center">Total</td>
                            <td className="px-2 py-1 text-center">{totals.negociaciones}</td>
                            <td className="px-2 py-1 text-right">{formatCurrency(totals.montoNegociaciones)}</td>
                            <td className="px-2 py-1 text-right">{formatCurrency(totals.saldoSolucionado)}</td>
                            <td className="px-2 py-1 text-right">{formatCurrency(totals.montoPromedio)}</td>
                            <td className="px-2 py-1 text-right">{formatCurrency(totals.saldo)}</td>
                        </tr>
                    </tbody>
                </table>
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

export default ModalProductividadContent;
                                    