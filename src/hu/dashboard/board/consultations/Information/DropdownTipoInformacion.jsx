import React, { useState } from "react";

const DropdownTipoInformacion = ({ children }) => {
    const [selected, setSelected] = useState("");

    // Buscar el hijo que coincida con el valor seleccionado
    let childToShow = null;
    React.Children.forEach(children, child => {
        if (child && child.props && child.props.value === selected) {
            childToShow = child;
        }
    });

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: 16 }}>
                <img src="/public/logo_coorin_7.svg" alt="Logo Coorin" style={{ height: 36, marginRight: 8 }} />
                <label htmlFor="info-dropdown" className="modal-span-2" style={{ fontWeight: 500, fontSize: 18 }}>Tipo de información:</label>
                <select
                    id="info-dropdown"
                    name="info-dropdown"
                    className="modal-dropdown-select"
                    value={selected}
                    onChange={e => setSelected(e.target.value)}
                >
                    <option value="" disabled>Selecciona una opción</option>
                    <option value="Pagos">Pagos</option>
                    <option value="Pagos reportados">Pagos reportados</option>
                    <option value="Datos Erroneos">Datos Erroneos</option>
                    <option value="Domicilios">Domicilios</option>
                    <option value="Correos">Correos</option>
                    <option value="Busqueda">Busqueda</option>
                    <option value="Ofrecimientos">Ofrecimientos</option>
                    <option value="Comentarios">Comentarios</option>
                    <option value="Lista Negra">Lista Negra</option>
                    <option value="Arrepentimientos">Arrepentimientos</option>
                </select>
            </div>
            <div style={{ width: '100%' }}>
                {childToShow}
            </div>
        </>
    );
};

export default DropdownTipoInformacion;
