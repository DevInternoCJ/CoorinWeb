
import React from "react";
import ModalCampanasHeader from "./ModalCampanasHeader";
import ModalCampanasCampanias from "./ModalCampanasCampanias";
import ModalCampanasEjecutivos from "./ModalCampanasEjecutivos";
import ModalCampanasFooter from "./ModalCampanasFooter";
import logoCoorin from "../../../../assets/logo_coorin_7.svg";


const ModalCampanas = ({ onClose }) => {
	const [campañaSeleccionada, setCampañaSeleccionada] = React.useState({ id: null, nombre: "" });

	const handleSeleccionCampaña = (idCampaña, nombreCampaña) => {
		setCampañaSeleccionada({ id: idCampaña, nombre: nombreCampaña || "" });
	};

	return (
		<div className="modal-xl-container" style={{ maxWidth: "98vw", overflowX: "hidden" }}>
			<ModalCampanasHeader onClose={onClose} />
			{/* Elementos debajo del título, en dos filas */}
			<div style={{ width: "100%", marginTop: "8px", marginBottom: "6px", display: "flex", flexDirection: "row", alignItems: "center", gap: "12px" }}>
				{/* Columna 1: Cartera y Producto (más compacto) */}
				<div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px", minWidth: 120 }}>
					<div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "6px" }}>
						<span style={{ fontWeight: 600, color: '#2d4739', minWidth: 60, fontSize: 13 }}>Cartera</span>
						<span style={{ color: '#2d4739', fontSize: 13 }}>American Express</span>
					</div>
					<div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "6px" }}>
						<span style={{ fontWeight: 600, color: '#2d4739', minWidth: 60, fontSize: 13 }}>Producto</span>
						<select style={{ padding: "2px 6px", borderRadius: "4px", border: "1px solid #ccc", minWidth: "80px", fontSize: 13 }}>
							<option value="amex">Amex</option>
						</select>
					</div>
				</div>
				{/* Columna 2: Logo centrado (más pequeño) */}
				<div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
					<img src={logoCoorin} alt="Logo Coorin" style={{ height: 36, margin: "0 auto" }} />
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
					<ModalCampanasCampanias onSeleccionCampaña={handleSeleccionCampaña} />
				</div>
				<div style={{ minWidth: 0, flex: "0 0 450px", maxWidth: "300px", display: "flex", flexDirection: "column" }}>
					<ModalCampanasEjecutivos idCampaña={campañaSeleccionada.id} nombreCampaña={campañaSeleccionada.nombre} />
				</div>
			</div>
			<div style={{ width: "100%", overflowX: "auto" }}>
				<ModalCampanasFooter />
			</div>
		</div>
	);
};

export default ModalCampanas;