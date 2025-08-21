import React from "react";
import ModalConsultaHistoricosFiltros from "../Historical/ModalConsultaHistoricosFiltros";

const ModalInformacionContent = ({ onIndividualChange }) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            flex: 1
        }}>
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <label htmlFor="info-dropdown" style={{ fontWeight: 500, color: 'var(--color-jerarquia2)' }}>Tipo de información:</label>
                <select
                    id="info-dropdown"
                    name="info-dropdown"
                    style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #ccc', minWidth: '220px' }}
                    defaultValue=""
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
            <div style={{ display: "flex", justifyContent: "center", width: "100%", flex: 1 }}>
                <ModalConsultaHistoricosFiltros onIndividualChange={onIndividualChange} />
            </div>
        </div>
    );
};

export default ModalInformacionContent;
