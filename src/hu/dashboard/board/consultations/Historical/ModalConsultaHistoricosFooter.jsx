import React from "react";

const ModalConsultaHistoricosFooter = ({ isIndividual = false }) => {
    const mensajeIndividual = 'Introduzca la cuenta, seleccione que concepto(s) para buscar en histórico y presione "Buscar"';
    const mensajeArchivo = "Seleccione qué concepto(s) y seleccione el libro de Excel (UNA pestaña, UNA columna) con las cuentas para buscarlas en histórico.";

    return (
        <div style={{
            marginTop: "2rem",
            paddingTop: "1rem",
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <p style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "var(--color-jerarquia3)",
                fontStyle: "italic",
                textAlign: "center",
                lineHeight: "1.4"
            }}>
                {isIndividual ? mensajeIndividual : mensajeArchivo}
            </p>
        </div>
    );
};

export default ModalConsultaHistoricosFooter;
