import React from "react";

const ModalInformacionFooter = ({ isIndividual = false }) => {
    const mensajeIndividual = 'Introduzca la cuenta, seleccione que concepto(s) para buscar en información y presione "Buscar"';
    const mensajeArchivo = 'Seleccione qué concepto(s) y seleccione el libro de Excel (UNA pestaña, UNA columna) con las cuentas para buscarlas en información.';
    return (
        <div style={{
            padding: "1rem",
            marginTop: "auto"
        }}>
            <p className="text-sm text-[var(--color-jerarquia3)]" style={{
                textAlign: "justify",
                margin: 0,
                fontStyle: "italic"
            }}>
                {isIndividual ? mensajeIndividual : mensajeArchivo}
            </p>
        </div>
    );
};

export default ModalInformacionFooter;
