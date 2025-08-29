import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { obetenerTablaMetas, actualizarMetas, obetenerJerarquiaEncargados } from '../../../../services/LokiServices';
import ConsorcioLogo from "../../../../assets/logo_coorin_5.svg";


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
                const usuario = userData?.usuario || '';
                const nombreEjecutivo = userData?.nombre || userData?.nombreEjecutivo || userData?.ejecutivo || '';
                if (!idEjecutivo) throw new Error('No se encontró el idEjecutivo del usuario logueado');
                const data = await obetenerJerarquiaEncargados(idEjecutivo);
                console.log('🟢 Respuesta jerarquía ejecutivos:', data);
                // Si la respuesta NO incluye el nodo raíz, lo agregamos manualmente
                let tree = [];
                if (Array.isArray(data)) {
                    // Buscamos si el propio ejecutivo está en la raíz
                    const found = data.find(n => n.idEjecutivo === idEjecutivo);
                    if (found) {
                        tree = data;
                    } else {
                        // Lo agregamos como nodo raíz
                        tree = [{
                            idEjecutivo,
                            usuario,
                            nombreEjecutivo,
                            subordinados: data
                        }];
                    }
                }
                setExecutiveTree(tree);
            } catch (e) {
                setErrorJerarquia('Error al obtener la jerarquía de ejecutivos');
                setExecutiveTree([]);
            } finally {
                setLoadingJerarquia(false);
            }
        };
        fetchExecutiveTree();
    }, []);


    // Estado para los ejecutivos seleccionados desde la jerarquía (array)
    const [selectedExecutives, setSelectedExecutives] = useState([]); // array de idEjecutivo
    const [allSubordinateIds, setAllSubordinateIds] = useState([]);
    const [allHierarchyIds, setAllHierarchyIds] = useState([]); // ids de toda la jerarquía

    // Handler para click en ejecutivo de la jerarquía (selección inteligente)
    const handleExecutiveClick = (node) => {
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
        setSelectedRows([]);
        setEditValues({});
        setError(null);
        setTablaMetas([]);
        setLoading(true);

        // Si el nodo tiene subordinados, seleccionar solo los subordinados directos
        if (Array.isArray(node.subordinados) && node.subordinados.length > 0) {
            const idsSubordinados = node.subordinados.map(sub => sub.idEjecutivo).filter(Boolean);
            setSelectedExecutives(idsSubordinados);
        } else {
            // Si no tiene subordinados, solo ese ejecutivo
            setSelectedExecutives([node.idEjecutivo]);
        }
        setLoading(false);
    };


    // Renderizado recursivo de la jerarquía, cada ejecutivo es clickeable y solo uno puede estar seleccionado
    const renderExecutiveTree = (tree, level = 0) => {
        if (!Array.isArray(tree)) return null;
        return tree.map((node, idx) => {
            // Seleccionado si todos los subordinados están seleccionados o si es único seleccionado
            const isSelected =
                (Array.isArray(node.subordinados) && node.subordinados.length > 0
                    ? node.subordinados.every(sub => selectedExecutives.includes(sub.idEjecutivo))
                    : selectedExecutives.length === 1 && selectedExecutives[0] === node.idEjecutivo);
            return (
                <React.Fragment key={node.usuario || node.id || idx}>
                    <div
                        className={`executive-hierarchy-item${isSelected ? ' selected' : ''}`}
                        style={{
                            paddingLeft: level * 18,
                            marginBottom: 2,
                            fontWeight: 500,
                            fontSize: 13,
                            color: isSelected ? '#2b463c' : undefined,
                            userSelect: 'none',
                        }}
                        onClick={() => handleExecutiveClick(node)}
                        title={Array.isArray(node.subordinados) && node.subordinados.length > 0 ? "Mostrar solo subordinados" : "Mostrar solo este ejecutivo"}
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



    // Al cargar, seleccionar por defecto el ejecutivo logueado y calcular todos los ids de la jerarquía
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const idEjecutivo = userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
        if (!idEjecutivo || !executiveTree.length) return;
        const rootNode = executiveTree.find(n => n.idEjecutivo === idEjecutivo);
        // Función recursiva para obtener todos los ids de la jerarquía, incluyendo el propio
        const getAllHierarchyIds = (node) => {
            let ids = [];
            if (!node) return ids;
            if (node.idEjecutivo) ids.push(node.idEjecutivo);
            if (Array.isArray(node.subordinados) && node.subordinados.length > 0) {
                for (const sub of node.subordinados) {
                    ids = ids.concat(getAllHierarchyIds(sub));
                }
            }
            return ids;
        };
        if (rootNode) {
            // ids subordinados directos
            if (Array.isArray(rootNode.subordinados) && rootNode.subordinados.length > 0) {
                const idsSubordinados = rootNode.subordinados.map(sub => Number(sub.idEjecutivo)).filter(id => Number.isInteger(id) && id > 0);
                setAllSubordinateIds(idsSubordinados);
                setSelectedExecutives(idsSubordinados);
            } else if (idEjecutivo) {
                setAllSubordinateIds([Number(idEjecutivo)]);
                setSelectedExecutives([Number(idEjecutivo)]);
            }
            // ids de toda la jerarquía (incluyendo el propio)
            const allIds = getAllHierarchyIds(rootNode)
                .map(id => Number(id))
                .filter(id => Number.isInteger(id) && id > 0);
            setAllHierarchyIds(allIds);
        } else {
            setAllHierarchyIds([]);
        }
    }, [executiveTree]);

    // Cuando cambian los ejecutivos seleccionados, buscar sus metas
    useEffect(() => {
        // Filtrar solo ids válidos (enteros > 0) y detectar los inválidos
        // Filtrar solo ids válidos (enteros > 0) y detectar los inválidos
        let validIds = [];
        let invalidIndexes = [];
        if (Array.isArray(selectedExecutives)) {
            selectedExecutives.forEach((id, idx) => {
                const numId = Number(id);
                if (Number.isInteger(numId) && numId > 0 && !isNaN(numId)) {
                    validIds.push(numId);
                } else {
                    invalidIndexes.push(idx);
                }
            });
        }
        // Si hay algún NaN en validIds, limpiar el array
        if (validIds.some(id => isNaN(id))) {
            validIds = validIds.filter(id => Number.isInteger(id) && id > 0 && !isNaN(id));
        }
        // Notificar usuarios omitidos y mostrar ids inválidos en consola
        if (invalidIndexes.length > 0 && Array.isArray(selectedExecutives)) {
            // Lista de ids inválidos
            const idInvalidos = invalidIndexes.map(idx => selectedExecutives[idx]);
            console.warn('Lista de idInvalidos detectados:', idInvalidos);
            // Buscar los usuarios omitidos en la jerarquía
            const omitidos = invalidIndexes.map(idx => {
                // Buscar en executiveTree el usuario correspondiente
                let usuario = selectedExecutives[idx];
                // Buscar nombre si es posible
                let nombre = '';
                const buscarNombre = (tree) => {
                    if (!Array.isArray(tree)) return null;
                    for (const node of tree) {
                        if (node.idEjecutivo === usuario || node.usuario === usuario) {
                            return node.nombreEjecutivo || node.nombre || '';
                        }
                        if (node.subordinados) {
                            const found = buscarNombre(node.subordinados);
                            if (found) return found;
                        }
                    }
                    return null;
                };
                nombre = buscarNombre(executiveTree) || '';
                return `${usuario}${nombre ? ' (' + nombre + ')' : ''}`;
            });
            const mensaje = `Se omitieron los siguientes usuarios por tener id inválido: ${omitidos.join(', ')}`;
            console.warn(mensaje);
            toast.warning(mensaje);
        }
        // Mostrar en consola los ids enviados y el usuario seleccionado
        if (validIds.length > 0) {
            console.log('🟢 Ids enviados a obetenerTablaMetas:', validIds, '| Usuario seleccionado:', selectedExecutives);
        } else {
            console.log('⚠️ No se enviaron ids válidos a obetenerTablaMetas. selectedExecutives:', selectedExecutives);
        }
        if (!validIds.length) {
            setTablaMetas([]);
            return;
        }
        setLoading(true);
        setError(null);
        (async () => {
            try {
                const data = await obetenerTablaMetas(validIds);
                setTablaMetas(Array.isArray(data) ? data.filter(Boolean) : []);
            } catch {
                setError('Error al obtener la tabla de metas');
                setTablaMetas([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [selectedExecutives, executiveTree]);

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
        // Alta de metas para todos los ejecutivos seleccionados (inputs de arriba)
        if (selectedExecutives.length > 0 && selectedRows.length === 0) {
            try {
                for (const idEjecutivo of selectedExecutives) {
                    const payload = {
                        idEjecutivo,
                        cuentas: Number(inputValues.cuentas) || 0,
                        titulares: Number(inputValues.titulares) || 0,
                        negociaciones: Number(inputValues.negociaciones) || 0,
                        cumplimientos: Number(inputValues.cumplimientos) || 0,
                        montoCumplido: Number(inputValues.montoCumplido) || 0,
                        saldoSolucionado: Number(inputValues.saldoSolucionado) || 0,
                        segmento: inputValues.segmento || null,
                        horaEntrada: inputValues.horaEntrada || '',
                        horaSalida: inputValues.horaSalida || '',
                        nuevo: 1
                    };
                    await actualizarMetas(payload);
                }
                toast.success('¡Metas guardadas correctamente!');
                setInputValues({
                    cuentas: '', titulares: '', negociaciones: '', cumplimientos: '', montoCumplido: '', saldoSolucionado: '', segmento: '', horaEntrada: '', horaSalida: ''
                });
                // Refrescar la tabla
                try {
                    const dataArr = await Promise.all(selectedExecutives.map(id => obetenerTablaMetas(id)));
                    setTablaMetas(dataArr.flat().filter(Boolean));
                } catch {
                    toast.error('Error al refrescar la tabla de metas');
                    setTablaMetas([]);
                }
            } catch (e) {
                toast.error('Error al guardar metas: ' + (e?.message || e));
            }
            return;
        }
        // Edición múltiple de filas seleccionadas en la tabla
        if (selectedRows.length === 0) return;
        try {
            for (const rowKey of selectedRows) {
                const row = tablaMetas.find((r, i) => (r.id || r.usuario || i) === rowKey);
                if (!row) continue;
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
                    nuevo: 0
                };
                await actualizarMetas(payload);
            }
            toast.success('¡Metas guardadas correctamente!');
            // Refrescar la tabla
            try {
                const dataArr = await Promise.all(selectedExecutives.map(id => obetenerTablaMetas(id)));
                setTablaMetas(dataArr.flat().filter(Boolean));
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
                {(() => {
                    const userData = JSON.parse(localStorage.getItem('userData'));
                    const idEjecutivoSesion = userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
                    const nombreSesion = userData?.nombre || userData?.nombreEjecutivo || userData?.ejecutivo || '';
                    const usuarioSesion = userData?.usuario || '';
                    if (!idEjecutivoSesion) return null;
                    return (
                        <div
                            className="sticky-session-executive"
                            title="Mostrar metas de TODOS los encargados de la jerarquía"
                            onClick={() => {
                                console.log('🟢 Enviando estos idEjecutivo al endpoint:', allHierarchyIds);
                                setSelectedExecutives(allHierarchyIds);
                            }}
                        >
                            {usuarioSesion} - {nombreSesion}
                        </div>
                    );
                })()}
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
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 70 }}>
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
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 70 }}>
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
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 100 }}>
                            <label>M. Cumplido</label>
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
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                            <label>S. Solucionado</label>
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
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 80 }}>
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
                            <label>H. Entrada</label>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <input
                                    type="time"
                                    value={inputValues.horaEntrada === null ? '' : inputValues.horaEntrada}
                                    onChange={e => setInputValues(v => ({ ...v, horaEntrada: e.target.value === '' ? null : e.target.value }))}
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
                            <label>H. Salida</label>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <input
                                    type="time"
                                    value={inputValues.horaSalida === null ? '' : inputValues.horaSalida}
                                    onChange={e => setInputValues(v => ({ ...v, horaSalida: e.target.value === '' ? null : e.target.value }))}
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
                                    <tr>
                                        <td colSpan={12} style={{ textAlign: 'center', color: '#b71c1c', fontWeight: 500 }}>
                                            {error}
                                        </td>
                                    </tr>
                                )}
                                {!loading && !error && tablaMetas.length === 0 && (
                                    <tr><td colSpan={12} style={{ textAlign: 'center' }}>Sin datos</td></tr>
                                )}
                                {!loading && !error && tablaMetas.map((row, i) => {
                                    const rowKey = row.id || row.usuario || i;
                                    // Normalizar valores para que siempre se pinte algo aunque vengan null/undefined
                                    const safe = (val, def = '') => val !== null && val !== undefined ? val : def;
                                    return (
                                        <tr key={rowKey}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(rowKey)}
                                                    onChange={() => handleRowCheckbox(rowKey)}
                                                />
                                            </td>
                                            <td style={{ minWidth: 180, maxWidth: 260, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={safe(row.ejecutivo) || safe(row.nombreEjecutivo) || safe(row.nombre)}>
                                                {safe(row.ejecutivo) || safe(row.nombreEjecutivo) || safe(row.nombre)}
                                            </td>
                                            <td>{safe(row.usuario) || safe(row.usuarioEjecutivo) || safe(row.clave)}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    value={safe(editValues[rowKey]?.cuentas, safe(row.cuentas, safe(row.totalCuentas, 0)))}
                                                    onChange={e => setEditValues(v => ({ ...v, [rowKey]: { ...v[rowKey], cuentas: e.target.value } }))}
                                                    style={{ width: 60 }}
                                                    disabled={!selectedRows.includes(rowKey)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    value={safe(editValues[rowKey]?.titulares, safe(row.titulares, safe(row.totalTitulares, 0)))}
                                                    onChange={e => setEditValues(v => ({ ...v, [rowKey]: { ...v[rowKey], titulares: e.target.value } }))}
                                                    style={{ width: 60 }}
                                                    disabled={!selectedRows.includes(rowKey)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    value={safe(editValues[rowKey]?.negociaciones, safe(row.negociaciones, safe(row.totalNegociaciones, 0)))}
                                                    onChange={e => setEditValues(v => ({ ...v, [rowKey]: { ...v[rowKey], negociaciones: e.target.value } }))}
                                                    style={{ width: 60 }}
                                                    disabled={!selectedRows.includes(rowKey)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    value={safe(editValues[rowKey]?.cumplimientos, safe(row.cumplimientos, safe(row.totalCumplimientos, 0)))}
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
                                                    value={safe(editValues[rowKey]?.montoCumplido, safe(editValues[rowKey]?.monto_cumplido, safe(row.montoCumplido, safe(row.monto_cumplido, 0))))}
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
                                                    value={safe(editValues[rowKey]?.saldoSolucionado, safe(editValues[rowKey]?.saldo_solucionado, safe(row.saldoSolucionado, safe(row.saldo_solucionado, 0))))}
                                                    onChange={e => setEditValues(v => ({ ...v, [rowKey]: { ...v[rowKey], saldoSolucionado: e.target.value } }))}
                                                    style={{ width: 80 }}
                                                    disabled={!selectedRows.includes(rowKey)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={safe(editValues[rowKey]?.segmento, safe(row.segmento, safe(row.nombreSegmento, '')))}
                                                    onChange={e => setEditValues(v => ({ ...v, [rowKey]: { ...v[rowKey], segmento: e.target.value } }))}
                                                    style={{ width: 80 }}
                                                    disabled={!selectedRows.includes(rowKey)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="time"
                                                    value={editValues[rowKey]?.horaEntrada === null ? '' : safe(editValues[rowKey]?.horaEntrada, safe(row.horaEntrada, safe(row.hora_entrada, '')))}
                                                    onChange={e => setEditValues(v => ({ ...v, [rowKey]: { ...v[rowKey], horaEntrada: e.target.value === '' ? null : e.target.value } }))}
                                                    style={{ width: 120, color: '#111' }}
                                                    disabled={!selectedRows.includes(rowKey)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="time"
                                                    value={editValues[rowKey]?.horaSalida === null ? '' : safe(editValues[rowKey]?.horaSalida, safe(row.horaSalida, safe(row.hora_salida, '')))}
                                                    onChange={e => setEditValues(v => ({ ...v, [rowKey]: { ...v[rowKey], horaSalida: e.target.value === '' ? null : e.target.value } }))}
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