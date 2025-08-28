import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { obetenerTablaMetas, actualizarMetas, obetenerJerarquiaEncargados } from '../../../../services/LokiServices';
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
            <path d="M6 8l4 4 4-4" stroke="#2b463c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </span>
);


const ModalMetasContent = () => {
    const [tablaMetas, setTablaMetas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Estado para la jerarquía de ejecutivos (lógica separada)
    const [executiveTree, setExecutiveTree] = useState([]);
    const [loadingJerarquia, setLoadingJerarquia] = useState(false);
    const [errorJerarquia, setErrorJerarquia] = useState(null);
    // Estado para checkboxes y edición de inputs
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [editValues, setEditValues] = useState({}); // { rowKey: { campo: valor, ... } }
    // Estado para los inputs de arriba
    const [inputValues, setInputValues] = useState({
        cuentas: '',
        titulares: '',
        negociaciones: '',
        cumplimientos: '',
        montoCumplido: '',
        saldoSolucionado: '',
        segmento: '',
        horaEntrada: '',
        horaSalida: ''
    });


    // Lógica separada para obtener la jerarquía de ejecutivos
    useEffect(() => {
        const fetchExecutiveTree = async () => {
            setLoadingJerarquia(true);
            setErrorJerarquia(null);
            try {
                const userData = JSON.parse(localStorage.getItem('userData'));
                const idEjecutivo = userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
                if (!idEjecutivo) throw new Error('No se encontró el idEjecutivo del usuario logueado');
                const data = await obetenerJerarquiaEncargados(idEjecutivo);
                console.log('🟢 Respuesta jerarquía ejecutivos:', data);
                setExecutiveTree(Array.isArray(data) ? data : []);
            } catch (e) {
                setErrorJerarquia('Error al obtener la jerarquía de ejecutivos');
                setExecutiveTree([]);
            } finally {
                setLoadingJerarquia(false);
            }
        };
        fetchExecutiveTree();
    }, []);

    // Handler para click en ejecutivo de la jerarquía
    const handleExecutiveClick = (node) => {
        // Prepara los inputs para el ejecutivo seleccionado
        setInputValues({
            cuentas: '',
            titulares: '',
            negociaciones: '',
            cumplimientos: '',
            montoCumplido: '',
            saldoSolucionado: '',
            segmento: '',
            horaEntrada: '',
            horaSalida: ''
        });
        // Guarda el idEjecutivo seleccionado para el envío
        setSelectedExecutive(node.idEjecutivo);
    };

    // Estado para el ejecutivo seleccionado desde la jerarquía
    const [selectedExecutive, setSelectedExecutive] = useState(null);

    // Renderizado recursivo de la jerarquía, cada ejecutivo es clickeable
    const renderExecutiveTree = (tree, level = 0) => {
        if (!Array.isArray(tree)) return null;
        return tree.map((node, idx) => {
            const isSelected = selectedExecutive === node.idEjecutivo;
            return (
                <React.Fragment key={node.usuario || node.id || idx}>
                    <div
                        className={`executive-hierarchy-item${isSelected ? ' selected' : ''}`}
                        style={{
                            paddingLeft: level * 18,
                            marginBottom: 2,
                            fontWeight: 500,
                            fontSize: 13,
                            color: isSelected ? '#2b463c' : undefined
                        }}
                        onClick={() => handleExecutiveClick(node)}
                        title="Seleccionar ejecutivo para alta de metas"
                    >
                        {node.usuario || ''} - {node.nombreEjecutivo || ''}
                    </div>
                    {Array.isArray(node.subordinados) && node.subordinados.length > 0 && (
                        renderExecutiveTree(node.subordinados, level + 1)
                    )}
                </React.Fragment>
            );
        });
    };


    useEffect(() => {
        const fetchTablaMetas = async () => {
            setLoading(true);
            setError(null);
            try {
                // Obtener idEjecutivo del usuario logueado desde localStorage
                const userData = JSON.parse(localStorage.getItem('userData'));
                const idEjecutivo = userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
                console.log('🟢 idEjecutivo (usuario logueado) que se enviará al endpoint:', idEjecutivo, userData);
                if (!idEjecutivo) throw new Error('No se encontró el idEjecutivo del usuario logueado');
                const data = await obetenerTablaMetas(idEjecutivo);
                setTablaMetas(Array.isArray(data) ? data : []);
            } catch {
                setError('Error al obtener la tabla de metas');
                setTablaMetas([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTablaMetas();
    }, []);


    // Manejo de selección individual
    const handleRowCheckbox = (rowKey) => {
        setSelectedRows(prev =>
            prev.includes(rowKey)
                ? prev.filter(k => k !== rowKey)
                : [...prev, rowKey]
        );
    };

    // Manejo de selección global
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
            setSelectAll(false);
        } else {
            setSelectedRows(tablaMetas.map((row, i) => row.id || row.usuario || i));
            setSelectAll(true);
        }
    };

    // Sincronizar selectAll si cambia la selección manual
    useEffect(() => {
        if (tablaMetas.length > 0) {
            setSelectAll(selectedRows.length === tablaMetas.length);
        } else {
            setSelectAll(false);
        }
    }, [selectedRows, tablaMetas]);

    // Handler para el botón Guardar
    const handleGuardar = async () => {
        // Si hay un ejecutivo seleccionado desde la jerarquía, se hace alta directa
        if (selectedExecutive) {
            const payload = {
                idEjecutivo: selectedExecutive,
                cuentas: Number(inputValues.cuentas) || 0,
                titulares: Number(inputValues.titulares) || 0,
                negociaciones: Number(inputValues.negociaciones) || 0,
                cumplimientos: Number(inputValues.cumplimientos) || 0,
                montoCumplido: Number(inputValues.montoCumplido) || 0,
                saldoSolucionado: Number(inputValues.saldoSolucionado) || 0,
                segmento: inputValues.segmento || null,
                horaEntrada: inputValues.horaEntrada || '',
                horaSalida: inputValues.horaSalida || '',
                nuevo: 1 // Alta de metas para ejecutivo seleccionado
            };
            try {
                console.log('➡️ Enviando payload a actualizarMetas (alta):', payload);
                await actualizarMetas(payload);
                toast.success('¡Metas guardadas correctamente!');
                setSelectedExecutive(null); // Limpiar selección
                setInputValues({
                    cuentas: '', titulares: '', negociaciones: '', cumplimientos: '', montoCumplido: '', saldoSolucionado: '', segmento: '', horaEntrada: '', horaSalida: ''
                });
                // Refrescar la tabla después de guardar
                try {
                    const userData = JSON.parse(localStorage.getItem('userData'));
                    const idEjecutivo = userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
                    if (idEjecutivo) {
                        const data = await obetenerTablaMetas(idEjecutivo);
                        setTablaMetas(Array.isArray(data) ? data : []);
                    }
                } catch {
                    toast.error('Error al refrescar la tabla de metas');
                    setTablaMetas([]);
                }
            } catch (e) {
                toast.error('Error al guardar metas: ' + (e?.message || e));
            }
            return;
        }
        // ...lógica original para edición múltiple...
        if (selectedRows.length === 0) return;
        try {
            for (const rowKey of selectedRows) {
                // Buscar la fila original
                const row = tablaMetas.find((r, i) => (r.id || r.usuario || i) === rowKey);
                if (!row) continue;
                // Tomar valores del estado de los inputs de arriba
                const payload = {
                    idEjecutivo: row.idEjecutivo || row.id || row.usuario || rowKey,
                    cuentas: Number(inputValues.cuentas) || 0,
                    titulares: Number(inputValues.titulares) || 0,
                    negociaciones: Number(inputValues.negociaciones) || 0,
                    cumplimientos: Number(inputValues.cumplimientos) || 0,
                    montoCumplido: Number(inputValues.montoCumplido) || 0,
                    saldoSolucionado: Number(inputValues.saldoSolucionado) || 0,
                    segmento: inputValues.segmento || null,
                    horaEntrada: inputValues.horaEntrada || '',
                    horaSalida: inputValues.horaSalida || '',
                    nuevo: 0 // Siempre enviar 0 cuando se selecciona el checkbox
                };
                console.log('➡️ Enviando payload a actualizarMetas:', payload);
                await actualizarMetas(payload);
            }
            toast.success('¡Metas guardadas correctamente!');
            // Refrescar la tabla después de guardar
            try {
                const userData = JSON.parse(localStorage.getItem('userData'));
                const idEjecutivo = userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
                if (idEjecutivo) {
                    const data = await obetenerTablaMetas(idEjecutivo);
                    setTablaMetas(Array.isArray(data) ? data : []);
                }
            } catch {
                toast.error('Error al refrescar la tabla de metas');
                setTablaMetas([]);
            }
        } catch (e) {
            toast.error('Error al guardar metas: ' + (e?.message || e));
        }
    };

    return (
        <div className="flex gap-4 h-full">
            {/* Logo Consorcio Jurídico arriba de la ramificación, fuera de su div */}
            <div style={{ width: '18rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginBottom: 8, position: 'absolute', zIndex: 2, marginTrim: "4rem" }}>
                <img src={ConsorcioLogo} alt="Consorcio Jurídico" style={{ maxWidth: 120, maxHeight: 60, objectFit: 'contain', filter: 'drop-shadow(0 2px 8px #bdbdbd)' }} />
            </div>

            {/* Columna izquierda - Jerarquía de Ejecutivos */}
            <div className="productividad-branch" style={{ overflowX: 'auto', overflowY: 'auto', height: '56vh', width: '18rem', marginTop: 60, background: '#ffffff', borderRadius: 8, border: '1px solid #e0e0e0', padding: 8 }}>
                {/* Usuario y Ejecutivo principal */}
                {tablaMetas.length > 0 && (
                    <div style={{ marginBottom: 10, padding: 6, background: 'var(--color-bgcolor2)', borderRadius: 4, fontWeight: 600, color: '#2b463c', fontSize: 14, textAlign: 'center' }}>
                        {tablaMetas[0].usuario || ''} - {tablaMetas[0].ejecutivo || tablaMetas[0].nombreEjecutivo || tablaMetas[0].nombre || ''}
                    </div>
                )}
                {loadingJerarquia ? (
                    <div style={{ color: '#2b463c', fontWeight: 500, fontSize: 15, textAlign: 'center', marginTop: 30 }}>Cargando jerarquía...</div>
                ) : errorJerarquia ? (
                    <div style={{ color: '#b71c1c', fontWeight: 500, fontSize: 14, textAlign: 'center', marginTop: 30 }}>{errorJerarquia}</div>
                ) : (
                    renderExecutiveTree(executiveTree)
                )}
            </div>

            {/* Columna derecha - Inputs y Tabla principal */}
            <div className="flex-1 flex flex-col gap-3" style={{ minWidth: 0 }}>
                {/* Fila de inputs */}
                <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)]" style={{overflowX: 'auto'}}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', minWidth: 900 }}>
                        {/* Cuentas */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 110 }}>
                            <label>Cuentas</label>
                            <input
                                type="number"
                                value={inputValues.cuentas}
                                onChange={e => setInputValues(v => ({ ...v, cuentas: e.target.value }))}
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400"
                                }}
                            />
                        </div>

                        {/* Titulares */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 110 }}>
                            <label>Titulares</label>
                            <input
                                type="number"
                                value={inputValues.titulares}
                                onChange={e => setInputValues(v => ({ ...v, titulares: e.target.value }))}
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400"
                                }}
                            />
                        </div>

                        {/* Negociaciones */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 110 }}>
                            <label>Negociaciones</label>
                            <input
                                type="number"
                                value={inputValues.negociaciones}
                                onChange={e => setInputValues(v => ({ ...v, negociaciones: e.target.value }))}
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400"
                                }}
                            />
                        </div>

                        {/* Cumplimientos */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 110 }}>
                            <label>Cumplimientos</label>
                            <input
                                type="number"
                                value={inputValues.cumplimientos}
                                onChange={e => setInputValues(v => ({ ...v, cumplimientos: e.target.value }))}
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400"
                                }}
                            />
                        </div>

                        {/* Monto Cumplido */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 130 }}>
                            <label>Monto Cumplido</label>
                            <input
                                type="number"
                                step="0.01"
                                value={inputValues.montoCumplido}
                                onChange={e => setInputValues(v => ({ ...v, montoCumplido: e.target.value }))}
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400"
                                }}
                            />
                        </div>

                        {/* Saldo Solucionado */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 130 }}>
                            <label>SaldoSolucionado</label>
                            <input
                                type="number"
                                step="0.01"
                                value={inputValues.saldoSolucionado}
                                onChange={e => setInputValues(v => ({ ...v, saldoSolucionado: e.target.value }))}
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400"
                                }}
                            />
                        </div>

                        {/* Segmento */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 110 }}>
                            <label>Segmento</label>
                            <input
                                type="text"
                                value={inputValues.segmento}
                                onChange={e => setInputValues(v => ({ ...v, segmento: e.target.value }))}
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400"
                                }}
                            />
                        </div>

                        {/* Hora Entrada */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 110, position: 'relative' }}>
                            <label>Hora Entrada</label>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <input
                                    type="time"
                                    value={inputValues.horaEntrada}
                                    onChange={e => setInputValues(v => ({ ...v, horaEntrada: e.target.value }))}
                                    style={{
                                        backgroundColor: "var(--color-bgcolor2)",
                                        color: "#111",
                                        border: "1px solid var(--color-jerarquia1)",
                                        borderRadius: "0.25rem",
                                        padding: "0.25rem 2.2rem 0.25rem 0.5rem",
                                        fontSize: "0.75rem",
                                        fontWeight: "400",
                                        width: '100%'
                                    }}
                                />
                                <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Hora Salida */}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 110, position: 'relative' }}>
                            <label>Hora Salida</label>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <input
                                    type="time"
                                    value={inputValues.horaSalida}
                                    onChange={e => setInputValues(v => ({ ...v, horaSalida: e.target.value }))}
                                    style={{
                                        backgroundColor: "var(--color-bgcolor2)",
                                        color: "#111",
                                        border: "1px solid var(--color-jerarquia1)",
                                        borderRadius: "0.25rem",
                                        padding: "0.25rem 2.2rem 0.25rem 0.5rem",
                                        fontSize: "0.75rem",
                                        fontWeight: "400",
                                        width: '100%'
                                    }}
                                />
                                <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabla principal */}
                <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] flex-1 flex flex-col" style={{ minWidth: 0 }}>
                    {/* Tabla con scroll */}
                    <div style={{ maxHeight: "calc(60vh - 12rem)", overflow: "auto" }} className="scrollbar-gray">
                        <table className="modal-table">
                            <thead>
                                <tr>
                                    <th>
                                        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                            <input
                                                type="checkbox"
                                                style={{ marginRight: 6 }}
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                            />
                                            Cambiar
                                        </span>
                                    </th>
                                    <th>Ejecutivo</th>
                                    <th>Usuario</th>
                                    <th>Cuentas</th>
                                    <th>Titulares</th>
                                    <th>Negociaciones</th>
                                    <th>Cumplimientos</th>
                                    <th>Monto Cumplido</th>
                                    <th>Saldo Solucionado</th>
                                    <th>Segmento</th>
                                    <th>Hora Entrada</th>
                                    <th>Hora Salida</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && (
                                    <tr>
                                        <td colSpan={12} style={{ textAlign: 'center', height: 120 }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 100 }}>
                                                <div className="spinner-sonner" style={{ marginBottom: 12 }}>
                                                    <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#111">
                                                        <g fill="none" fillRule="evenodd">
                                                            <g transform="translate(1 1)" strokeWidth="3">
                                                                <circle strokeOpacity=".3" cx="18" cy="18" r="18" />
                                                                <path d="M36 18c0-9.94-8.06-18-18-18">
                                                                    <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" />
                                                                </path>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <span style={{ color: '#2b463c', fontWeight: 500, fontSize: 16 }}>Cargando...</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {error && !loading && (
                                    toast.error(error)
                                )}
                                {!loading && !error && tablaMetas.length === 0 && (
                                    <tr><td colSpan={12} style={{ textAlign: 'center' }}>Sin datos</td></tr>
                                )}
                                {!loading && !error && tablaMetas.map((row, i) => {
                                    const rowKey = row.id || row.usuario || i;
                                    return (
                                        <tr key={rowKey}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(rowKey)}
                                                    onChange={() => handleRowCheckbox(rowKey)}
                                                />
                                            </td>
                                            <td style={{ minWidth: 180, maxWidth: 260, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={row.ejecutivo || row.nombreEjecutivo || row.nombre || ''}>
                                                {row.ejecutivo || row.nombreEjecutivo || row.nombre || ''}
                                            </td>
                                            <td>{row.usuario || row.usuarioEjecutivo || row.clave || ''}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    value={editValues[rowKey]?.cuentas ?? row.cuentas ?? row.totalCuentas ?? ''}
                                                    onChange={e => setEditValues(v => ({ ...v, [rowKey]: { ...v[rowKey], cuentas: e.target.value } }))}
                                                    style={{ width: 60 }}
                                                    disabled={!selectedRows.includes(rowKey)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    value={editValues[rowKey]?.titulares ?? row.titulares ?? row.totalTitulares ?? ''}
                                                    onChange={e => setEditValues(v => ({ ...v, [rowKey]: { ...v[rowKey], titulares: e.target.value } }))}
                                                    style={{ width: 60 }}
                                                    disabled={!selectedRows.includes(rowKey)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    value={editValues[rowKey]?.negociaciones ?? row.negociaciones ?? row.totalNegociaciones ?? ''}
                                                    onChange={e => setEditValues(v => ({ ...v, [rowKey]: { ...v[rowKey], negociaciones: e.target.value } }))}
                                                    style={{ width: 60 }}
                                                    disabled={!selectedRows.includes(rowKey)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    value={editValues[rowKey]?.cumplimientos ?? row.cumplimientos ?? row.totalCumplimientos ?? ''}
                                                    onChange={e => setEditValues(v => ({ ...v, [rowKey]: { ...v[rowKey], cumplimientos: e.target.value } }))}
                                                    style={{ width: 60 }}
                                                    disabled={!selectedRows.includes(rowKey)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    step={0.01}
                                                    value={editValues[rowKey]?.montoCumplido ?? editValues[rowKey]?.monto_cumplido ?? row.montoCumplido ?? row.monto_cumplido ?? ''}
                                                    onChange={e => setEditValues(v => ({ ...v, [rowKey]: { ...v[rowKey], montoCumplido: e.target.value } }))}
                                                    style={{ width: 80 }}
                                                    disabled={!selectedRows.includes(rowKey)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    step={0.01}
                                                    value={editValues[rowKey]?.saldoSolucionado ?? editValues[rowKey]?.saldo_solucionado ?? row.saldoSolucionado ?? row.saldo_solucionado ?? ''}
                                                    onChange={e => setEditValues(v => ({ ...v, [rowKey]: { ...v[rowKey], saldoSolucionado: e.target.value } }))}
                                                    style={{ width: 80 }}
                                                    disabled={!selectedRows.includes(rowKey)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={editValues[rowKey]?.segmento ?? row.segmento ?? row.nombreSegmento ?? ''}
                                                    onChange={e => setEditValues(v => ({ ...v, [rowKey]: { ...v[rowKey], segmento: e.target.value } }))}
                                                    style={{ width: 80 }}
                                                    disabled={!selectedRows.includes(rowKey)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="time"
                                                    value={editValues[rowKey]?.horaEntrada ?? row.horaEntrada ?? row.hora_entrada ?? ''}
                                                    onChange={e => setEditValues(v => ({ ...v, [rowKey]: { ...v[rowKey], horaEntrada: e.target.value } }))}
                                                    style={{ width: 120, color: '#111' }}
                                                    disabled={!selectedRows.includes(rowKey)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="time"
                                                    value={editValues[rowKey]?.horaSalida ?? row.horaSalida ?? row.hora_salida ?? ''}
                                                    onChange={e => setEditValues(v => ({ ...v, [rowKey]: { ...v[rowKey], horaSalida: e.target.value } }))}
                                                    style={{ width: 120, color: '#111' }}
                                                    disabled={!selectedRows.includes(rowKey)}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {/* El botón Guardar ahora está fuera de la tabla */}
                    </div>
                </div>
                {/* Botón Guardar centrado debajo de la tabla */}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 18 }}>
                    <button
                        className="modal-btn"
                        style={{ background: '#2b463c', color: '#fff', minWidth: 140, height: 40, fontWeight: 600, fontSize: 16, borderRadius: 6, opacity: selectedRows.length > 0 ? 1 : 0.5, cursor: selectedRows.length > 0 ? 'pointer' : 'not-allowed', boxShadow: '0 2px 8px #bdbdbb33' }}
                        onClick={handleGuardar}
                        disabled={selectedRows.length === 0}
                    >
                        Guardar
                    </button>
                </div>
            </div>

            {/* Scrollbar personalizado ahora solo con la clase global 'scrollbar-gray' */}
        <Toaster position="top-center" richColors />
        </div>
    );
};
export default ModalMetasContent;