
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

			{/* Layout responsivo: lg=2cols lado a lado, md/sm=1col apiladas */}
			<div
				className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 w-full scrollbar-gray"
				style={{
					minHeight: "1px",
					alignItems: "stretch",
					overflowX: "auto"
				}}
			>
				<div className="min-w-0 flex flex-col">
					<ModalCampanasCampanias onSeleccionCampaña={handleSeleccionCampaña} />
				</div>
				<div className="min-w-0 flex flex-col">
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