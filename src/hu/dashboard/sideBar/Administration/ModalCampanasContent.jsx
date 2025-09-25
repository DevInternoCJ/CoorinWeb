
import React from "react";
import ModalCampanasHeader from "./ModalCampanasHeader";
import ModalCampanasCampanias from "./ModalCampanasCampanias";
import ModalCampanasEjecutivos from "./ModalCampanasEjecutivos";
import ModalCampanasFooter from "./ModalCampanasFooter";
import logoCoorin from "../../../../assets/logo_coorin_7.svg";


const ModalCampanas = ({ onClose }) => {
	return (
		<div className="modal-xl-container" style={{ maxWidth: "98vw", overflowX: "hidden" }}>
			<ModalCampanasHeader onClose={onClose} />
			{/* Elementos debajo del título, en dos filas */}
			<div style={{ width: "100%", marginTop: "12px", marginBottom: "10px", display: "flex", flexDirection: "row", alignItems: "center" }}>
				{/* Columna 1: Cartera y Producto */}
				<div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "16px", minWidth: 220 }}>
					<div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "12px" }}>
						<span style={{ fontWeight: 600, color: '#2d4739', minWidth: 80 }}>Cartera</span>
						<span style={{ color: '#2d4739' }}>American Express</span>
					</div>
					<div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "12px" }}>
						<span style={{ fontWeight: 600, color: '#2d4739', minWidth: 80 }}>Producto</span>
						<select style={{ padding: "2px 8px", borderRadius: "4px", border: "1px solid #ccc", minWidth: "120px" }}>
							<option value="amex">Amex</option>
						</select>
					</div>
				</div>
				{/* Columna 2: Logo centrado */}
				<div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
					<img src={logoCoorin} alt="Logo Coorin" style={{ height: 56, margin: "0 auto" }} />
				</div>
				{/* Columna 3: Vacía pero existe */}
				<div style={{ flex: 1 }}></div>
			</div>
			{/* ...existing code... */}
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					gap: "1rem",
					overflowX: "auto",
					width: "100%",
					minHeight: "1px",
					alignItems: "stretch"
				}}
				className="scrollbar-gray"
			>
				<div style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column" }}>
					<ModalCampanasCampanias />
				</div>
				<div style={{ minWidth: 0, flex: "0 0 450px", maxWidth: "450px", display: "flex", flexDirection: "column" }}>
					<ModalCampanasEjecutivos />
				</div>
			</div>
			<div style={{ width: "100%", overflowX: "auto" }}>
				<ModalCampanasFooter />
			</div>
		</div>
	);
};

export default ModalCampanas;