import React, { useState, useEffect } from "react";
import JerarquiaConR from "../../executives/JerarquiaConR/JerarquiaConR";
import { obetenerJerarquiaEncargados } from '../../../../../services/LokiServices';


const ModalProductividadContent = ({ 
    timeFilter,
    selectedIndicator, 
    selectedExecutiveNode, 
    setSelectedExecutiveNode, 
    productivityData, 
    loadingProductivity, 
    errorProductivity 
}) => {
    // Estados mínimos para la jerarquía
    const [executiveTree, setExecutiveTree] = useState([]);
    const [loadingJerarquia, setLoadingJerarquia] = useState(false);
    const [errorJerarquia, setErrorJerarquia] = useState(null);
    const [selectedExecutives, setSelectedExecutives] = useState([]);
    const [allHierarchyIds, setAllHierarchyIds] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [editValues, setEditValues] = useState({});

    // Obtener la jerarquía de ejecutivos (idéntico a otros modales)
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
                let tree = [];
                if (Array.isArray(data)) {
                    const found = data.find(n => n.idEjecutivo === idEjecutivo);
                    if (found) {
                        tree = data;
                    } else {
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

    // Calcular todos los ids de la jerarquía al cargar
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const idEjecutivo = userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
        if (!idEjecutivo || !executiveTree.length) return;
        const rootNode = executiveTree.find(n => n.idEjecutivo === idEjecutivo);
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
            const allIds = getAllHierarchyIds(rootNode)
                .map(id => Number(id))
                .filter(id => Number.isInteger(id) && id > 0);
            setAllHierarchyIds(allIds);
            
            // Seleccionar automáticamente el primer ejecutivo si no hay ninguno seleccionado
            if (!selectedExecutiveNode && allIds.length > 0) {
                setSelectedExecutiveNode(allIds[0]);
            }
        } else {
            setAllHierarchyIds([]);
        }
    }, [executiveTree, selectedExecutiveNode, setSelectedExecutiveNode]);

    // Renderizado recursivo para la jerarquía
    const renderExecutiveTree = (tree, level = 0) => {
        if (!Array.isArray(tree)) return null;
        return tree.map((node, idx) => {
            const isSelected = node.idEjecutivo === selectedExecutiveNode;
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
                        onClick={() => setSelectedExecutiveNode(node.idEjecutivo)}
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

    // Función para renderizar las columnas de la tabla según el indicador
    const renderTableHeaders = () => {
        // Distinguir entre "Negociaciones" de Día vs Hora
        if (selectedIndicator === 'Negociaciones') {
            if (timeFilter === 'Dia') {
                return (
                    <>
                        <th>Encargado</th>
                        <th>Ejecutivo</th>
                        <th>Negociaciones</th>
                        <th>MontoNegociaciones</th>
                        <th>SaldoSolucionado</th>
                        <th>MontoPromedio</th>
                        <th>SaldoPromedio</th>
                    </>
                );
            } else {
                // timeFilter === 'Hora'
                return (
                    <>
                        <th>Encargado</th>
                        <th>Ejecutivo</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                        <th>9</th>
                        <th>10</th>
                        <th>11</th>
                        <th>12</th>
                        <th>13</th>
                        <th>14</th>
                        <th>15</th>
                        <th>16</th>
                        <th>17</th>
                        <th>18</th>
                        <th>19</th>
                        <th>20</th>
                        <th>21</th>
                        <th>22</th>
                        <th>Total</th>
                    </>
                );
            }
        }

        switch (selectedIndicator) {
            // Radio Button "Día"
            case 'Sesiones':
                return (
                    <>
                        <th>Encargado</th>
                        <th>Ejecutivo</th>
                        <th>Extensión</th>
                        <th>Ingreso</th>
                        <th>Salida</th>
                        <th>Primer Gestión</th>
                        <th>Modo</th>
                        <th>TiempoEnModo</th>
                    </>
                );
            case 'Contactos':
                return (
                    <>
                        <th>Encargado</th>
                        <th>Ejecutivo</th>
                        <th>Cuentas</th>
                        <th>Gestiones</th>
                        <th>Entrada</th>
                        <th>Titulares</th>
                        <th>Conocidos</th>
                        <th>Desconocidos</th>
                        <th>SinContacto</th>
                    </>
                );
            case 'Porcentajes':
                return (
                    <>
                        <th>Encargado</th>
                        <th>Ejecutivo</th>
                        <th>Negociación</th>
                        <th>Gestiones x Cuenta</th>
                        <th>Entrada</th>
                        <th>Titulares</th>
                        <th>Conocidos</th>
                        <th>Desconocidos</th>
                        <th>SinContacto</th>
                    </>
                );
            case 'Tiempos':
                return (
                    <>
                        <th>Encargado</th>
                        <th>Ejecutivo</th>
                        <th>Sesión</th>
                        <th>Cuentas</th>
                        <th>Pausas</th>
                        <th>Muerto</th>
                        <th>Consulta</th>
                        <th>Gestión</th>
                        <th>Permiso</th>
                        <th>Curso</th>
                        <th>Comida</th>
                        <th>Baño</th>
                    </>
                );
            case 'Tiempo Promedio':
                return (
                    <>
                        <th>Encargado</th>
                        <th>Ejecutivo</th>
                        <th>Negociaciones</th>
                        <th>Cuentas</th>
                        <th>Titulares</th>
                        <th>Conocidos</th>
                        <th>Desconocidos</th>
                        <th>SinContacto</th>
                    </>
                );
            // Radio Button "Hora" - Todos los indicadores tienen el mismo formato
            case 'Cuentas':
            case 'Titulares':
            case 'Conocidos':
            case 'Desconocidos':
            case 'Sin Contacto': 
            case 'Monto Negociaciones':
            case 'Saldo Solucionado':
                return (
                    <>
                        <th>Encargado</th>
                        <th>Ejecutivo</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                        <th>9</th>
                        <th>10</th>
                        <th>11</th>
                        <th>12</th>
                        <th>13</th>
                        <th>14</th>
                        <th>15</th>
                        <th>16</th>
                        <th>17</th>
                        <th>18</th>
                        <th>19</th>
                        <th>20</th>
                        <th>21</th>
                        <th>22</th>
                        <th>Total</th>
                    </>
                );
        }
    };

    // Función para determinar número de columnas según el indicador
    const getColumnCount = () => {
        // Distinguir entre "Negociaciones" de Día vs Hora
        if (selectedIndicator === 'Negociaciones') {
            if (timeFilter === 'Dia') {
                return 7; // Encargado, Ejecutivo, Negociaciones, MontoNegociaciones, SaldoSolucionado, MontoPromedio, SaldoPromedio
            } else {
                return 20; // Encargado, Ejecutivo, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, Total
            }
        }

        switch (selectedIndicator) {
            // Radio Button "Día"
            case 'Sesiones':
                return 8; // Encargado, Ejecutivo, Extensión, Ingreso, Salida, Primer Gestión, Modo, TiempoEnModo
            case 'Contactos':
                return 9; // Encargado, Ejecutivo, Cuentas, Gestiones, Entrada, Titulares, Conocidos, Desconocidos, SinContacto
            case 'Porcentajes':
                return 9; // Encargado, Ejecutivo, Negociación, Gestiones x Cuenta, Entrada, Titulares, Conocidos, Desconocidos, SinContacto
            case 'Tiempos':
                return 12; // Encargado, Ejecutivo, Sesión, Cuentas, Pausas, Muerto, Consulta, Gestión, Permiso, Curso, Comida, Baño
            case 'Tiempo Promedio':
                return 8; // Encargado, Ejecutivo, Negociaciones, Cuentas, Titulares, Conocidos, Desconocidos, SinContacto
            // Radio Button "Hora" - Todos tienen el mismo número de columnas
            case 'Cuentas':
            case 'Titulares':
            case 'Conocidos':
            case 'Desconocidos':
            case 'Sin Contacto':
            case 'Monto Negociaciones':
            case 'Saldo Solucionado':
                return 20; // Encargado, Ejecutivo, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, Total
        }
    };

    // Función para renderizar las filas de datos
    const renderTableRows = () => {
        const columnCount = getColumnCount();
        
        if (loadingProductivity) {
            return (
                <tr>
                    <td colSpan={columnCount} className="text-center py-4">
                        Cargando datos...
                    </td>
                </tr>
            );
        }

        if (errorProductivity) {
            return (
                <tr>
                    <td colSpan={columnCount} className="text-center py-4 text-red-600">
                        {errorProductivity}
                    </td>
                </tr>
            );
        }

        // Validar que productivityData sea un array
        if (!Array.isArray(productivityData) || productivityData.length === 0) {
            return (
                <tr>
                    <td colSpan={columnCount} className="text-center py-4">
                        No hay datos disponibles
                    </td>
                </tr>
            );
        }

        // Mapear los datos según el indicador seleccionado
        return productivityData.map((item, index) => {
            // Convertir el objeto a array de valores, manejando diferentes estructuras
            let values = [];
            if (Array.isArray(item)) {
                values = item;
            } else if (typeof item === 'object' && item !== null) {
                values = Object.values(item);
            } else {
                values = [item];
            }
            
            const columnCount = getColumnCount();
            
            // Asegurar que tenemos el número correcto de columnas
            while (values.length < columnCount) {
                values.push('-');
            }
            
            return (
                <tr key={index}>
                    {values.slice(0, columnCount).map((value, idx) => (
                        <td key={idx} className={idx === 0 ? "font-semibold" : ""}>
                            {value !== null && value !== undefined ? String(value) : '-'}
                        </td>
                    ))}
                </tr>
            );
        });
    };


    return (
        <>
            <div className="flex gap-4 h-full">
                {/* Columna izquierda - Jerarquía de Ejecutivos */}
                <JerarquiaConR
                    executiveTree={executiveTree}
                    loadingJerarquia={loadingJerarquia}
                    errorJerarquia={errorJerarquia}
                    selectedExecutiveNode={selectedExecutiveNode}
                    allHierarchyIds={allHierarchyIds}
                    setSelectedExecutives={setSelectedExecutives}
                    setSelectedRows={setSelectedRows}
                    setEditValues={setEditValues}
                    setSelectedExecutiveNode={setSelectedExecutiveNode}
                    renderExecutiveTree={renderExecutiveTree}
                />

                {/* Columna derecha - Tabla de datos */}
                <div className="flex-1 bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] flex flex-col" style={{ minWidth: 0 }}>
                    {/* Información del ejecutivo seleccionado */}
                    {selectedExecutiveNode && (
                        <div className="flex items-center gap-2 mb-3">
                            <span className="modal-span-1">Ejecutivo:</span>
                            <span className="modal-span-2">
                                {(() => {
                                    // Buscar recursivamente en toda la jerarquía
                                    const findExecutive = (tree, id) => {
                                        for (const node of tree) {
                                            if (node.idEjecutivo === id) return node;
                                            if (node.subordinados && node.subordinados.length > 0) {
                                                const found = findExecutive(node.subordinados, id);
                                                if (found) return found;
                                            }
                                        }
                                        return null;
                                    };
                                    const executive = findExecutive(executiveTree, selectedExecutiveNode);
                                    return executive ? `${executive.usuario} - ${executive.nombreEjecutivo}` : 'Ejecutivo seleccionado';
                                })()}
                            </span>
                        </div>
                    )}

                    {/* Fila de información */}
                    <div className="flex items-center mb-2 w-full">
                        <span className="modal-span-1 pl-1 mr-4">
                            {loadingProductivity ? 'Cargando datos...' : 
                            errorProductivity ? 'Error al cargar datos' :
                            !selectedExecutiveNode ? 'Seleccione un indicador y ejecutivo' :
                            productivityData.length > 0 ? `Datos de productividad - ${productivityData.length} registros` :
                            'Sin datos disponibles para el ejecutivo seleccionado'}
                        </span>
                    </div>

                    {/* Tabla con scroll */}
                    <div
                        style={{
                            overflowX: "auto",
                            overflowY: "auto",
                            maxHeight: "31vh",
                            height: "100%",
                            flex: 1
                        }}
                        className="scrollbar-gray"
                    >
                        <table className="modal-table mb-2">
                            <thead>
                                <tr>
                                    {renderTableHeaders()}
                                </tr>
                            </thead>
                            <tbody>
                                {renderTableRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalProductividadContent;