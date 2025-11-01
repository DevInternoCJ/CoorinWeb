
import React from "react";
import ModalCampanasHeader from "./ModalCampanasHeader";
import ModalCampanasCampanias from "./ModalCampanasCampanias";
import ModalCampanasEjecutivos from "./ModalCampanasEjecutivos";
import ModalCampanasFooter from "./ModalCampanasFooter";


const ModalCampanas = ({ onClose }) => {
	const [campañaSeleccionada, setCampañaSeleccionada] = React.useState({ id: null, nombre: "" });

	const handleSeleccionCampaña = (idCampaña, nombreCampaña) => {
		setCampañaSeleccionada({ id: idCampaña, nombre: nombreCampaña || "" });
	};

	return (
		<div className="modal-xl-container" style={{ maxWidth: "98vw", overflowX: "hidden" }}>
			<ModalCampanasHeader onClose={onClose} />

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