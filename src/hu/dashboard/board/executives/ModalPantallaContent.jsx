import React, { useState } from "react";
import ConsorcioLogo from "../../../../assets/logo_coorin_5.svg";

// Flecha tipo chevron moderna
const DropdownArrow = () => (
    <span
        style={{
            pointerEvents: "none",
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "1.15rem",
            color: "#2b463c",
            display: "flex",
            alignItems: "center"
        }}
    >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M6 8l4 4 4-4" stroke="#2b463c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </span>
);

const ModalPantallaContent = () => {
    const [selectedCartera, setSelectedCartera] = useState("American Express");
    const [selectedProducto, setSelectedProducto] = useState("Amex");

    // Datos de ejemplo para los selects
    const carteras = ["American Express", "Visa", "MasterCard", "Bancomer"];
    const productos = ["Amex", "Visa Classic", "MasterCard Gold", "Bancomer Premium"];

    // Datos de ejemplo para la sección Info/Empresa
    const infoEmpresa = {
        empresa: "Campos Pantalla - Coorin",
        ingresos: "No \\ CBO \\ 912.00",
        asigna: "21/07/2023",
        segment: "Primes 45",
        saldoActual: "$ 135,657.67",
        estado: "DISTRITO FEDERAL",
        cancel: "17/07/2023",
        producto: "Lending OP",
        saldoInicial: "$ 126,685.63",
        diasOA: "741",
        aniv: "23/12/2021",
        agencyID: "411CTLCO",
        minMasAtrasado: "$ 4,280.17",
        ejecutivo: "MELI",
        corte: "19/08/2025",
        inv: "RECENT",
        ultimoPago: "",
        fchUltPago: ""
    };

    // Datos de ejemplo para la tabla de campos
    const camposData = [
        { posicion: 1, alias: "Empresa", campos: "[employersname].[employersaddress]", formatoCampo: "Texto", resaltado: "Resaltado" },
        { posicion: 2, alias: "WO \\ CBO / Ingresos", campos: "[WO?] \\ [CBO] \\ [BloqueoHerramienta] \\ [monthlyincome]", formatoCampo: "Número", resaltado: "Sobre Resaltado" },
        { posicion: 3, alias: "Asigna", campos: "[patchdate]", formatoCampo: "Fecha", resaltado: "Resaltado" },
        { posicion: 4, alias: "Segment", campos: "[CollectibilityCode] [SegmentoAMX] [DescuentoAMX]", formatoCampo: "Texto", resaltado: "Sobre Resaltado" },
        { posicion: 5, alias: "Saldo Actual", campos: "[Currentbalance]", formatoCampo: "Moneda", resaltado: "Sobre Resaltado" },
        { posicion: 6, alias: "Estado", campos: "[Estado]", formatoCampo: "Texto", resaltado: "Normal" }
    ];

    // Datos de ejemplo para la tabla inferior
    const datosTabla = [
        {
            batchdate: "21/07/2023",
            customerid: "643865868404MXN",
            name: "",
            birthdate: "19851214",
            loan_productcode: "OP",
            recoveredcode: "MCLC",
            receiptdate: "21/07/2023",
            lastpaymentdate: "19/07/2023",
            initialbalance: "126685.63"
        },
        {
            batchdate: "19/05/2025",
            customerid: "058026184404MXN",
            name: "",
            birthdate: "19760424",
            loan_productcode: "OP",
            recoveredcode: "XXXX",
            receiptdate: "12/09/2023",
            lastpaymentdate: "20/10/2023",
            initialbalance: "65969.01"
        },
        {
            batchdate: "18/12/2023",
            customerid: "073024023099MXN",
            name: "",
            birthdate: "19940702",
            loan_productcode: "OP",
            recoveredcode: "PLCC",
            receiptdate: "17/12/2023",
            lastpaymentdate: "17/10/2023",
            initialbalance: "46854.60"
        },
        {
            batchdate: "23/07/2025",
            customerid: "103024175097MXN",
            name: "",
            birthdate: "19771219",
            loan_productcode: "OP",
            recoveredcode: "W2LC",
            receiptdate: "13/12/2024",
            lastpaymentdate: "27/08/2024",
            initialbalance: "61164.32"
        },
        {
            batchdate: "05/09/2022",
            customerid: "375406142402MXN",
            name: "",
            birthdate: "19790210",
            loan_productcode: "OP",
            recoveredcode: "TLCC",
            receiptdate: "01/09/2021",
            lastpaymentdate: "16/07/2021",
            initialbalance: "2090.51"
        }
    ];

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            gap: "0.5rem"
        }}>
            {/* Sección superior con dropdowns, logo e info */}
            <div style={{
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                minHeight: "200px"
            }}>
                {/* Columna izquierda: Logo y Dropdowns */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    width: "300px"
                }}>
                    {/* Logo */}
                    <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        padding: "1rem",
                    }}>
                        <img 
                            src={ConsorcioLogo} 
                            alt="Consorcio Jurídico" 
                            style={{ height: "58px", width: "auto" }}
                        />
                    </div>

                    {/* Selects debajo del logo */}
                    <div style={{ 
                        display: "flex", 
                        flexDirection: "column",
                        gap: "1rem",
                        padding: "1rem",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px",
                        border: "1px solid var(--color-jerarquia1)"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <label style={{
                                fontSize: "0.875rem",
                                fontWeight: "500",
                                color: "var(--color-jerarquia3)",
                                minWidth: "60px",
                                flexShrink: 0
                            }}>
                                Cartera:
                            </label>
                            <div style={{ position: "relative", flex: 1 }}>
                                <select
                                    value={selectedCartera}
                                    onChange={(e) => setSelectedCartera(e.target.value)}
                                    className="font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                                    style={{ fontSize: "14px", width: "100%", cursor: "pointer" }}
                                >
                                    {carteras.map(cartera => (
                                        <option key={cartera} value={cartera}>{cartera}</option>
                                    ))}
                                </select>
                                <DropdownArrow />
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <label style={{
                                fontSize: "0.875rem",
                                fontWeight: "500",
                                color: "var(--color-jerarquia3)",
                                minWidth: "60px",
                                flexShrink: 0
                            }}>
                                Producto:
                            </label>
                            <div style={{ position: "relative", flex: 1 }}>
                                <select
                                    value={selectedProducto}
                                    onChange={(e) => setSelectedProducto(e.target.value)}
                                    className="font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                                    style={{ fontSize: "14px", width: "100%", cursor: "pointer" }}
                                >
                                    {productos.map(producto => (
                                        <option key={producto} value={producto}>{producto}</option>
                                    ))}
                                </select>
                                <DropdownArrow />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección Info/Empresa a la derecha */}
                <div style={{
                    backgroundColor: "#4a5568",
                    color: "white",
                    padding: "1.5rem",
                    borderRadius: "8px",
                    border: "1px solid var(--color-jerarquia1)",
                    flex: 1,
                    minHeight: "200px"
                }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "1rem",
                        fontSize: "0.875rem"
                    }}>
                        <div><strong>Empresa:</strong> {infoEmpresa.empresa}</div>
                        <div><strong>/ WO \\ CBO:</strong> <span style={{color: "#90EE90"}}>{infoEmpresa.ingresos}</span></div>
                        <div><strong>Ingresos:</strong></div>
                        <div><strong>Asigna:</strong> <span style={{color: "#87CEEB"}}>{infoEmpresa.asigna}</span></div>
                        <div><strong>Segment:</strong> <span style={{color: "#90EE90"}}>{infoEmpresa.segment}</span></div>
                        <div><strong>Saldo Actual:</strong> <span style={{color: "#90EE90"}}>{infoEmpresa.saldoActual}</span></div>
                        <div><strong>Estado:</strong> {infoEmpresa.estado}</div>
                        <div><strong>Cancel:</strong> {infoEmpresa.cancel}</div>
                        <div><strong>Producto:</strong> <span style={{color: "#90EE90"}}>{infoEmpresa.producto}</span></div>
                        <div><strong>Saldo Inicial:</strong> <span style={{color: "#90EE90"}}>{infoEmpresa.saldoInicial}</span></div>
                        <div><strong>Días OA:</strong> <span style={{color: "#90EE90"}}>{infoEmpresa.diasOA}</span></div>
                        <div><strong>Aniv:</strong> {infoEmpresa.aniv}</div>
                        <div><strong>AgencyID:</strong> {infoEmpresa.agencyID}</div>
                        <div><strong>Min Más Atrasado:</strong> <span style={{color: "#90EE90"}}>{infoEmpresa.minMasAtrasado}</span></div>
                        <div><strong>Ejecutivo:</strong> <span style={{color: "#90EE90"}}>{infoEmpresa.ejecutivo}</span></div>
                        <div><strong>Corte:</strong> {infoEmpresa.corte}</div>
                        <div><strong>Inv:</strong> {infoEmpresa.inv}</div>
                        <div><strong>Último Pago:</strong> {infoEmpresa.ultimoPago}</div>
                        <div><strong>Fch Ult Pago:</strong> {infoEmpresa.fchUltPago}</div>
                    </div>
                </div>
            </div>

            {/* Tabla de Campos */}
            <div style={{
                border: "1px solid var(--color-jerarquia1)",
                borderRadius: "8px",
                overflow: "hidden"
            }}>
                <div style={{
                    overflowX: "auto",
                    overflowY: "auto",
                    maxHeight: "200px"
                }}
                className="scrollbar-gray">
                    <table style={{ width: "100%", fontSize: "0.875rem" }}>
                        <thead style={{ position: "sticky", top: 0, backgroundColor: "#4a5568", color: "white" }}>
                            <tr>
                                <th style={{ padding: "0.75rem", textAlign: "left" }}>Posición</th>
                                <th style={{ padding: "0.75rem", textAlign: "left" }}>Alias</th>
                                <th style={{ padding: "0.75rem", textAlign: "left" }}>Campos</th>
                                <th style={{ padding: "0.75rem", textAlign: "left" }}>Formato Campo</th>
                                <th style={{ padding: "0.75rem", textAlign: "left" }}>Resaltado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {camposData.map((item, index) => (
                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "white" : "#f8f9fa" }}>
                                    <td style={{ padding: "0.75rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                        {item.posicion}
                                    </td>
                                    <td style={{ padding: "0.75rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                        {item.alias}
                                    </td>
                                    <td style={{ padding: "0.75rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                        {item.campos}
                                    </td>
                                    <td style={{ padding: "0.75rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                        {item.formatoCampo}
                                    </td>
                                    <td style={{ padding: "0.75rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                        {item.resaltado}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Tabla inferior - Datos */}
            <div style={{
                border: "1px solid var(--color-jerarquia1)",
                borderRadius: "8px",
                overflow: "hidden"
            }}>
                <div style={{
                    overflowX: "auto",
                    overflowY: "auto",
                    maxHeight: "200px"
                }}
                className="scrollbar-gray">
                    <table style={{ width: "100%", fontSize: "0.875rem" }}>
                        <thead style={{ position: "sticky", top: 0, backgroundColor: "#4a5568", color: "white" }}>
                            <tr>
                                <th style={{ padding: "0.75rem", textAlign: "left" }}>batchdate</th>
                                <th style={{ padding: "0.75rem", textAlign: "left" }}>customerid</th>
                                <th style={{ padding: "0.75rem", textAlign: "left" }}>name</th>
                                <th style={{ padding: "0.75rem", textAlign: "left" }}>birthdate</th>
                                <th style={{ padding: "0.75rem", textAlign: "left" }}>loan_productcode</th>
                                <th style={{ padding: "0.75rem", textAlign: "left" }}>recoveredcode</th>
                                <th style={{ padding: "0.75rem", textAlign: "left" }}>receiptdate</th>
                                <th style={{ padding: "0.75rem", textAlign: "left" }}>lastpaymentdate</th>
                                <th style={{ padding: "0.75rem", textAlign: "left" }}>initialbalance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datosTabla.map((item, index) => (
                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "white" : "#f8f9fa" }}>
                                    <td style={{ padding: "0.75rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                        {item.batchdate}
                                    </td>
                                    <td style={{ padding: "0.75rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                        {item.customerid}
                                    </td>
                                    <td style={{ padding: "0.75rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                        {item.name}
                                    </td>
                                    <td style={{ padding: "0.75rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                        {item.birthdate}
                                    </td>
                                    <td style={{ padding: "0.75rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                        {item.loan_productcode}
                                    </td>
                                    <td style={{ padding: "0.75rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                        {item.recoveredcode}
                                    </td>
                                    <td style={{ padding: "0.75rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                        {item.receiptdate}
                                    </td>
                                    <td style={{ padding: "0.75rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                        {item.lastpaymentdate}
                                    </td>
                                    <td style={{ padding: "0.75rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                        {item.initialbalance}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ModalPantallaContent;