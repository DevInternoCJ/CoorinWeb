import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import ReusableModal from "../../modalGlobalReboot/ReusableModal";
import DefaultModalHeader from "../../modalGlobalReboot/DefaultModalHeader";
import { IconEjecutivos } from "../../../board/consultations/IconesConsultations";
import ConsorcioLogo from "../../../../../assets/logo_coorin_7.svg";
import {
  ReportEjecutives,
  obetenerJerarquiaEncargados,
  obetenerDropdownsEncargados,
} from "../../../../../services/mark/orochi/LokeServices";

// Puedes importar íconos si lo deseas, por ejemplo:
// import { UserGroupIcon } from '@heroicons/react/24/outline';

const ModalConsultaEjecutivosModal = ({ isOpen, onClose }) => {
  // Fechas por defecto: desde = primer día del mes (o ayer si el primer día es posterior a ayer), hasta = ayer
  // Helper para formatear fecha local YYYY-MM-DD sin usar toISOString (evita problemas de zona horaria)
  const toLocalISO = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const yesterdayISO = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return toLocalISO(d);
  })();
  const firstDayISO = (() => {
    const d = new Date();
    d.setDate(1);
    const fd = toLocalISO(d);
    // Si el primer día del mes es posterior a ayer (p. ej. hoy es 1ro), usar ayer como fallback
    return fd > yesterdayISO ? yesterdayISO : fd;
  })();

  const [cartera, setCartera] = useState("american_express");
  const [producto, setProducto] = useState("american_express");
  const [encargado, setEncargado] = useState("");
  const [desde, setDesde] = useState(firstDayISO);
  const [hasta, setHasta] = useState(yesterdayISO);
  const [indicador, setIndicador] = useState("Todos");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState(null); // null = todas
  const [encargadosOptions, setEncargadosOptions] = useState([]);
  const [rawJerarquia, setRawJerarquia] = useState([]);
  const [dropdownsEncargados, setDropdownsEncargados] = useState([]);
  const [selectedRowKey, setSelectedRowKey] = useState(null);

  // Funciones placeholder para los botones
  const handleBuscar = async () => {
    setError(null);
    setLoading(true);
    try {
      // Validaciones de fechas: desde <= hasta y hasta <= ayer
      if (!desde || !hasta) {
        setError("Seleccione rango de fechas válido");
        setLoading(false);
        return;
      }
      if (desde > hasta) {
        setError("La fecha inicial no puede ser mayor que la fecha final");
        setLoading(false);
        return;
      }
      if (hasta > yesterdayISO) {
        setError("La fecha final no puede ser hoy ni en el futuro");
        setLoading(false);
        return;
      }
      const userData = JSON.parse(localStorage.getItem("userData")) || {};
      console.log(
        "ModalConsultaEjecutivos - userData from localStorage:",
        userData
      );
      const idCartera = userData?.idCartera || 1;
      const idProducto = userData?.idProducto || 1;
      // Resolver qué enviar en 'encargado': preferimos enviar el Usuario (código) si existe para el NombreEjecutivo seleccionado.
      // El select guarda ahora el NombreEjecutivo como value. Buscamos el objeto en encargadosOptions para obtener Usuario.
      let encargadoToSend = null;
      if (encargado) {
        // El select ahora puede devolver:
        // - Usuario (código) si existe
        // - NombreEjecutivo (texto)
        // - idEjecutivo (número como string)
        const val = String(encargado).trim();
        // Buscar por Usuario primero
        let match = (encargadosOptions || []).find(
          (e) =>
            e.Usuario && String(e.Usuario).toUpperCase() === val.toUpperCase()
        );
        if (!match) {
          // Buscar por NombreEjecutivo
          match = (encargadosOptions || []).find(
            (e) =>
              String(e.NombreEjecutivo ?? e.nombreEjecutivo ?? e.nombre) === val
          );
        }
        if (!match) {
          // Buscar por idEjecutivo
          match = (encargadosOptions || []).find(
            (e) => String(e.idEjecutivo ?? "") === val
          );
        }
        if (match && match.Usuario) {
          encargadoToSend = String(match.Usuario).toUpperCase();
        } else if (match && (match.NombreEjecutivo || match.idEjecutivo)) {
          // fallback: enviar el valor más robusto disponible
          encargadoToSend = match.Usuario
            ? String(match.Usuario).toUpperCase()
            : match.idEjecutivo
            ? Number(match.idEjecutivo)
            : String(match.NombreEjecutivo ?? val);
        } else {
          // fallback: enviar el valor seleccionado tal cual
          encargadoToSend = val;
        }
      } else {
        // Si no hay selección en UI, preferir datos de sesión
        if (userData?.usuario)
          encargadoToSend = String(userData.usuario).toUpperCase();
        else if (userData?.idEjecutivo)
          encargadoToSend = Number(userData.idEjecutivo);
        else encargadoToSend = null;
      }
      console.log(
        "ModalConsultaEjecutivos - encargado resolved value (to send):",
        encargadoToSend
      );

      const body = {
        idCartera,
        idProducto,
        encargado: encargadoToSend,
        fechaInicial: desde,
        fechaFinal: hasta,
      };
      console.log(
        "ModalConsultaEjecutivos - request body for ReportEjecutives:",
        body
      );
      // Log JSON stringified payload so we can see exactly what is sent over the wire
      try {
        console.log(
          "ModalConsultaEjecutivos - Enviando ReportEjecutives payload (JSON):",
          JSON.stringify(body, (k, v) => (v === undefined ? null : v), 2)
        );
      } catch (jsonErr) {
        console.warn(
          "No se pudo serializar el body a JSON para logging:",
          jsonErr
        );
      }

      const resp = await ReportEjecutives(body);
      console.log("ModalConsultaEjecutivos - ReportEjecutives response:", resp);
      const data = resp?.data ?? [];
      if (Array.isArray(data)) setResultados(data);
      else setResultados([]);

      // --- Construir opciones del dropdown "Encargados" basadas en matchesInDropdowns === 1 ---
      try {
        const getVal = (obj, ...keys) => {
          for (const k of keys) {
            if (obj && Object.prototype.hasOwnProperty.call(obj, k))
              return obj[k];
          }
          return undefined;
        };

        // Agrupar dropdowns por idEjecutivo para detectar matches
        const ddByEjecutivo = (dropdownsEncargados || []).reduce((acc, d) => {
          const didRaw = getVal(
            d,
            "idEjecutivo",
            "idEj",
            "idEje",
            "id_ejecutivo"
          );
          const did =
            didRaw === undefined || didRaw === null ? null : Number(didRaw);
          if (!did) return acc;
          if (!acc[did]) acc[did] = [];
          acc[did].push(d);
          return acc;
        }, {});

        // Encontrar nombres candidatos: los NombreEjecutivo de rawJerarquia que tengan al menos 1 match en dropdownsEncargados
        const candidates = (rawJerarquia || [])
          .map((item) => {
            const idEje =
              Number(
                getVal(item, "idEjecutivo", "idejecutivo", "idEj", "id") ?? 0
              ) || 0;
            const nombre =
              getVal(item, "NombreEjecutivo", "nombreEjecutivo", "nombre") ??
              null;
            const usuario = getVal(item, "usuario", "Usuario", "user") ?? null;
            const matches = ddByEjecutivo[idEje] || [];
            return { idEje, nombre, usuario, matchesCount: matches.length };
          })
          .filter((x) => x.matchesCount && x.matchesCount > 0);
        // Normalizador de nombres: quita acentos, trim, collapse spaces y lowercase
        const normalize = (s) => {
          if (!s && s !== "") return "";
          try {
            return String(s)
              .normalize("NFD")
              .replace(/\p{Diacritic}/gu, "")
              .replace(/\s+/g, " ")
              .trim()
              .toLowerCase();
          } catch {
            // Fallback para entornos que no soporten \p{Diacritic}
            return String(s)
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/\s+/g, " ")
              .trim()
              .toLowerCase();
          }
        };

        // Ahora cruzar con los resultados de ReportEjecutives por NombreEjecutivo (usando normalización)
        const reportNames = new Set(
          (data || [])
            .map((r) =>
              normalize(
                getVal(r, "NombreEjecutivo", "nombreEjecutivo", "nombre") ?? ""
              )
            )
            .filter(Boolean)
        );

        const candidatesWithNorm = candidates.map((c) => ({
          ...c,
          nombreNorm: normalize(c.nombre),
        }));

        const finalOptions = candidatesWithNorm
          .filter((c) => c.nombre && reportNames.has(c.nombreNorm))
          .map((c) => ({ NombreEjecutivo: c.nombre, Usuario: c.usuario }));

        console.log(
          "Diagnostic counts: ddByEjecutivo keys=",
          Object.keys(ddByEjecutivo).length,
          "candidates=",
          candidates.length,
          "reportRows=",
          (data || []).length,
          "reportNames=",
          reportNames.size,
          "finalOptions=",
          finalOptions.length
        );
        console.log(
          "Encargados finalOptions from ReportEjecutives cross-check:",
          finalOptions.slice(0, 20)
        );

        // Construir entrada del ejecutivo de sesión (mostrar NombreEjecutivo pero cuando se envíe, se usará Usuario)
        const sessionNombre =
          (userData?.NombreEjecutivo ??
            userData?.nombreEjecutivo ??
            userData?.nombre ??
            userData?.usuario) ||
          "";
        const sessionUsuario = userData?.usuario
          ? String(userData.usuario).toUpperCase()
          : null;
        const sessionIdEj = userData?.idEjecutivo
          ? Number(userData.idEjecutivo)
          : null;
        const sessionEntry = {
          NombreEjecutivo:
            sessionNombre ||
            sessionUsuario ||
            (sessionIdEj ? String(sessionIdEj) : ""),
          Usuario: sessionUsuario,
          idEjecutivo: sessionIdEj,
        };

        // Helper para comprobar si la lista ya contiene al sesión (por Usuario o por nombre normalizado)
        const includesSession = (arr) => {
          if (!arr || !Array.isArray(arr)) return false;
          const sUsuario = sessionEntry.Usuario
            ? String(sessionEntry.Usuario).toUpperCase()
            : null;
          const sNombreNorm = sessionEntry.NombreEjecutivo
            ? normalize(sessionEntry.NombreEjecutivo)
            : null;
          return arr.some((a) => {
            const aUsuario = a.Usuario ? String(a.Usuario).toUpperCase() : null;
            const aNombreNorm = a.NombreEjecutivo
              ? normalize(a.NombreEjecutivo)
              : null;
            if (sUsuario && aUsuario && sUsuario === aUsuario) return true;
            if (sNombreNorm && aNombreNorm && sNombreNorm === aNombreNorm)
              return true;
            return false;
          });
        };

        // Si no hay coincidencias en el cruce, hacer fallback: mostrar los candidatos que tienen matchesInDropdowns
        if (finalOptions.length === 0 && candidatesWithNorm.length > 0) {
          // console.warn('No se encontraron coincidencias entre ReportEjecutives y candidatos; aplicando fallback y mostrando candidatos con matchesInDropdowns.');
          const fallback = candidatesWithNorm.map((c) => ({
            NombreEjecutivo: c.nombre,
            Usuario: c.usuario,
          }));
          // Normalizar Usuario a mayúsculas
          let normalizedFallback = fallback.map((a) => ({
            ...a,
            Usuario: a.Usuario ? String(a.Usuario).toUpperCase() : null,
          }));
          // Asegurar que el ejecutivo de sesión esté como primera opción
          if (
            !includesSession(normalizedFallback) &&
            (sessionEntry.NombreEjecutivo || sessionEntry.Usuario)
          ) {
            normalizedFallback.unshift({
              NombreEjecutivo: sessionEntry.NombreEjecutivo,
              Usuario: sessionEntry.Usuario
                ? String(sessionEntry.Usuario).toUpperCase()
                : null,
            });
          }
          setEncargadosOptions(normalizedFallback);
        } else if (finalOptions.length > 0) {
          // Normalizar Usuario a mayúsculas
          let normalizedFinal = finalOptions.map((a) => ({
            ...a,
            Usuario: a.Usuario ? String(a.Usuario).toUpperCase() : null,
          }));
          // Asegurar que el ejecutivo de sesión esté como primera opción
          if (
            !includesSession(normalizedFinal) &&
            (sessionEntry.NombreEjecutivo || sessionEntry.Usuario)
          ) {
            normalizedFinal.unshift({
              NombreEjecutivo: sessionEntry.NombreEjecutivo,
              Usuario: sessionEntry.Usuario
                ? String(sessionEntry.Usuario).toUpperCase()
                : null,
            });
          }
          setEncargadosOptions(normalizedFinal);
        }
      } catch (crossErr) {
        console.warn(
          "Error construyendo opciones de encargados desde ReportEjecutives:",
          crossErr
        );
      }
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al consultar el reporte");
      setResultados([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExportar = () => {
    // Exportar los resultados visibles como CSV respetando el filtro de columnas (`indicador`)
    if (!resultados || resultados.length === 0) return;
    // Si visibleColumns es null exportamos todas las columnas, si no usamos su orden/selección
    const headers =
      visibleColumns &&
      Array.isArray(visibleColumns) &&
      visibleColumns.length > 0
        ? visibleColumns
        : Object.keys(resultados[0]);
    // Normalizar y escapar preservando caracteres en español (ñ, acentos, etc.)
    // 1) Normalizamos a NFC para composiciones (acentos compuestos) cuando esté disponible.
    // 2) Escapamos dobles comillas según RFC4180.
    // 3) Añadimos BOM UTF-8 al inicio para mejorar compatibilidad con Excel en Windows.
    const normalizeCell = (v) => {
      if (v === null || v === undefined) return "";
      const s = String(v);
      try {
        // Normalizar a NFC para preservar acentos y caracteres compuestos
        return s.normalize("NFC");
      } catch {
        return s;
      }
    };

    const escapeCell = (v) => {
      const cell = normalizeCell(v);
      // Reemplazar " por "" y encerrar en comillas
      return '"' + cell.replace(/"/g, '""') + '"';
    };

    // Campos que deben llevar el símbolo $ (comparación case-insensitive)
    const moneyFields = new Set([
      "montonegociado",
      "saldoasoluconar", // possible misspelling fallback (will also include correct variant below)
      "saldoasolucionar",
      "montoscumplidos",
      "montospagados",
      "saldosolucionado",
      "metamontocumplido",
      "metasaldosolucionado",
    ]);

    // Normalize header name and decide whether to prefix $ to value
    const formatAndEscapeByHeader = (h, v) => {
      const headerNorm = String(h || "").toLowerCase();
      let cell = normalizeCell(v);
      if (cell !== "" && moneyFields.has(headerNorm)) {
        // Si ya tiene un símbolo $ al inicio, no duplicar
        if (!cell.trim().startsWith("$")) cell = "$" + cell;
      }
      return '"' + cell.replace(/"/g, '""') + '"';
    };

    const csvRows = [headers.map((h) => escapeCell(h)).join(",")];
    for (const row of resultados) {
      const values = headers.map((h) => formatAndEscapeByHeader(h, row[h]));
      csvRows.push(values.join(","));
    }
    const csvContent = csvRows.join("\n");
    const bom = "\uFEFF"; // Byte Order Mark para que Excel detecte UTF-8
    const blob = new Blob([bom + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    // Añadir timestamp al archivo para evitar sobreescrituras y facilitar rastreo
    const stamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    a.download = `reporte_ejecutivos_${stamp}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Calcula qué columnas mostrar según el valor de `indicador`.
  const applyIndicadorFilter = (indicadorValue, allColumns) => {
    if (!allColumns || allColumns.length === 0) return null;
    // Normalizamos nombres comunes usados en el backend (si existen)
    const cols = allColumns.slice();

    const byNames = (names) => names.filter((n) => cols.includes(n));

    switch (indicadorValue) {
      case "Todos":
        return null; // todas

      case "Gestiones":
        // C# usaba indices 4..15 inclusive; como fallback usamos slice por índice
        if (cols.length >= 16) return cols.slice(4, 16);
        return null;

      case "Negociaciones":
        // C#: muestra cols que no estén en (i < 16 && i > 3) || i > 22 => visible else false
        // Simplificamos: si hay >=23 columnas, permitimos 0..3,16..22
        if (cols.length >= 23)
          return cols.filter((c, i) => i <= 3 || (i >= 16 && i <= 22));
        return null;

      case "Búsquedas":
        // C#: ocultaba i>3 && i<23 || i>24 -> muestra resto
        if (cols.length >= 25)
          return cols.filter((c, i) => !(i > 3 && i < 23) && !(i > 24));
        return null;

      case "Metas": {
        // Mostrar un conjunto específico por nombre cuando exista, si no, intentar por índices
        const metasNames = [
          "CuentasGestionadas",
          "MetaCuentas",
          "%Cuentas",
          "Titulares",
          "MetaTitulares",
          "%Titulares",
          "Negociaciones",
          "MetaNegociaciones",
          "%Negociaciones",
          "Cumplidas",
          "MetaCumplimientos",
          "%Cumplimientos",
          "MontosCumplidos",
          "MetaMontoCumplido",
          "%MontoCumplido",
          "SaldoSolucionado",
          "MetaSaldoSolucionado",
          "%SaldoSolucionado",
        ];
        const found = byNames(metasNames);
        if (found.length > 0) return found;
        // fallback: ocultar todo desde index 4
        if (cols.length > 4) return cols.slice(0, 4); // muestra solo primeras 4
        return null;
      }

      case "Tiempos":
        // Según C#: ocultar i>3 && i<43 -> mostrar 0..3 y >=43
        if (cols.length >= 44) return cols.filter((c, i) => !(i > 3 && i < 43));
        return null;

      default:
        return null;
    }
  };

  // Aplicar filtro cada vez que cambie indicador o resultados
  useEffect(() => {
    if (!resultados || resultados.length === 0) {
      setVisibleColumns(null);
      return;
    }
    const allCols = Object.keys(resultados[0]);
    const cols = applyIndicadorFilter(indicador, allCols);
    // Asegurar que los primeros 4 campos siempre estén presentes en ese orden al inicio
    const primaryOrder = [
      "nombreEjecutivo",
      "ejecutivo",
      "nombreEncargado",
      "encargado",
    ];
    // Construir lista inicial con los primarios que existan en allCols
    const primariesPresent = primaryOrder.filter((p) => allCols.includes(p));

    if (!cols || cols === null) {
      // Si cols es null significa "todas", construimos con primarios al inicio y luego el resto
      const rest = allCols.filter((c) => !primariesPresent.includes(c));
      setVisibleColumns([...primariesPresent, ...rest]);
    } else {
      // cols es un subconjunto; asegurar orden y eliminar duplicados
      const colsList = Array.isArray(cols) ? cols : [];
      const restFiltered = colsList.filter(
        (c) => !primariesPresent.includes(c)
      );
      setVisibleColumns([...primariesPresent, ...restFiltered]);
    }
  }, [indicador, resultados]);

  // Cargar lista de encargados según jerarquía y dropdowns (combinado)
  useEffect(() => {
    if (!isOpen) return;
    const loadEncargados = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData")) || {};
        const idEj = userData?.idEjecutivo;
        if (!idEj) return;
        // Obtener jerarquía
        const resp = await obetenerJerarquiaEncargados(idEj);
        console.log("obetenerJerarquiaEncargados response:", resp);
        const lista = Array.isArray(resp) ? resp : resp?.data ?? [];

        // Obtener dropdowns (productos por ejecutivo)
        let dd = [];
        try {
          const respDd = await obetenerDropdownsEncargados();
          console.log("obetenerDropdownsEncargados response:", respDd);
          dd = Array.isArray(respDd) ? respDd : respDd?.data ?? [];
        } catch (e) {
          console.warn(
            "No se pudo obtener obetenerDropdownsEncargados, proceder sin product-filter:",
            e
          );
          dd = [];
        }

        // Log de diagnóstico (muestras)
        console.log(
          "rawJerarquia length:",
          lista.length,
          "dropdownsEncargados length:",
          (dd || []).length
        );
        if (lista && lista.length > 0)
          console.log("rawJerarquia sample keys:", Object.keys(lista[0]));
        if (dd && dd.length > 0)
          console.log("dropdownsEncargados sample keys:", Object.keys(dd[0]));

        setRawJerarquia(lista);
        setDropdownsEncargados(dd);

        // Prefill encargado select with session Usuario when possible (most robust for sending). Si no existe, usar NombreEjecutivo para mostrar.
        const sessionUsuario = userData?.usuario
          ? String(userData.usuario).toUpperCase()
          : null;
        const sessionNombre =
          userData?.NombreEjecutivo ??
          userData?.nombreEjecutivo ??
          userData?.nombre ??
          userData?.usuario ??
          "";
        if (sessionUsuario) setEncargado(String(sessionUsuario));
        else if (sessionNombre) setEncargado(String(sessionNombre));
      } catch (err) {
        console.error(
          "Error cargando jerarquía de encargados o dropdowns:",
          err
        );
      }
    };
    loadEncargados();
  }, [isOpen]);

  // Recalcular la lista visible de encargados cuando cambien los datos crudos o el producto seleccionado
  useEffect(() => {
    if (!rawJerarquia || rawJerarquia.length === 0) {
      setEncargadosOptions([]);
      return;
    }
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const idNum = Number(userData?.idEjecutivo ?? 0);
    // Preferir el producto de la sesión (userData.idProducto). Si no existe, usar el producto seleccionado en UI.
    const sessionProduct = Number(userData?.idProducto ?? 0);
    const productoSelected =
      sessionProduct && sessionProduct > 0
        ? sessionProduct
        : producto && !isNaN(Number(producto))
        ? Number(producto)
        : 0;

    // función auxiliar para normalizar claves
    const getVal = (obj, ...keys) => {
      for (const k of keys) {
        if (obj && Object.prototype.hasOwnProperty.call(obj, k)) return obj[k];
      }
      return undefined;
    };

    console.log(
      "sessionProduct:",
      sessionProduct,
      "productoSelected:",
      productoSelected
    );

    const filtered = (rawJerarquia || []).filter((item) => {
      const jer =
        Number(getVal(item, "Jerarquía", "Jerarquia", "jerarquia", "jer")) || 0;
      const idAreaRaw = getVal(item, "idÁrea", "idArea", "idarea");
      const idArea =
        idAreaRaw === undefined || idAreaRaw === null
          ? null
          : Number(idAreaRaw) || 0;
      const idEnc =
        Number(
          getVal(item, "idEncargado", "idencargado", "idEnc", "id_encargado")
        ) || 0;
      const idEjeRaw = getVal(item, "idEjecutivo", "idejecutivo", "idEj", "id");
      const idEje = Number(idEjeRaw ?? 0) || 0;

      // filtros estáticos
      if (!(jer > 0)) return false;
      // Aplicar la regla de idArea===1204 solo si la propiedad existe en la fila
      if (idArea !== null && !(idArea === 1204)) return false;
      if (idEnc === 1) return false;

      // limitar a equipo: mostrar si es el propio ejecutivo o si es gestionado por él
      if (!(idEnc === idNum || idEje === idNum)) return false;

      // Si disponemos de dropdowns para productos por ejecutivo, aplicar filtrado por producto
      if (dropdownsEncargados && dropdownsEncargados.length > 0) {
        // encontrar entradas en dropdowns donde coincida idEjecutivo (comparación tolerante)
        const matches = dropdownsEncargados.filter((d) => {
          const did = getVal(d, "idEjecutivo", "idEj", "idEje", "id_ejecutivo");
          if (did === undefined || did === null) return false;
          return (
            String(did).trim() === String(idEje).trim() || Number(did) === idEje
          );
        });
        if (matches.length === 0) {
          // Si no hay matches en dropdowns para este ejecutivo, excluir
          return false;
        }
        // Filtrado por producto: prioridad al producto de la sesión (sessionProduct). Si existe, exigir coincidencia.
        if (sessionProduct && sessionProduct > 0) {
          const prodMatchSession = matches.some((d) => {
            const pid = getVal(d, "idProducto", "idProd", "id_producto");
            // Si pid es null/undefined, lo tratamos como comodín (match)
            if (pid === null || pid === undefined) return true;
            return (
              Number(pid) === sessionProduct ||
              String(pid).trim() === String(sessionProduct).trim()
            );
          });
          if (!prodMatchSession) return false;
        } else if (productoSelected && productoSelected > 0) {
          // Si no hay producto en sesión pero sí se seleccionó uno en UI, aplicar ese filtro
          const prodMatch = matches.some((d) => {
            const pid = getVal(d, "idProducto", "idProd", "id_producto");
            if (pid === null || pid === undefined) return true;
            return (
              Number(pid) === productoSelected ||
              String(pid).trim() === String(productoSelected).trim()
            );
          });
          if (!prodMatch) return false;
        }
      }

      return true;
    });

    console.log(
      "Computed filtered encargados:",
      filtered.length,
      "from rawJerarquia:",
      rawJerarquia.length,
      "with dropdowns:",
      dropdownsEncargados.length
    );
    // Si el filtrado devuelve vacío, hacer un diagnóstico adicional para mostrar qué ejecutivos no coincidieron y por qué
    if (filtered.length === 0) {
      try {
        const diag = (rawJerarquia || []).slice(0, 20).map((item) => {
          const idEjeRaw = getVal(
            item,
            "idEjecutivo",
            "idejecutivo",
            "idEj",
            "id"
          );
          const idEjeVal = Number(idEjeRaw ?? 0) || 0;
          const idAreaRawLocal = getVal(item, "idÁrea", "idArea", "idarea");
          const matches = (dropdownsEncargados || []).filter((d) => {
            const did = getVal(
              d,
              "idEjecutivo",
              "idEj",
              "idEje",
              "id_ejecutivo"
            );
            return (
              did !== undefined &&
              (String(did).trim() === String(idEjeVal).trim() ||
                Number(did) === idEjeVal)
            );
          });
          const prods = Array.from(
            new Set(
              matches.map((m) =>
                getVal(m, "idProducto", "idProd", "id_producto")
              )
            )
          ).slice(0, 10);
          return {
            idEjecutivo: idEjeVal,
            NombreEjecutivo: getVal(
              item,
              "NombreEjecutivo",
              "nombreEjecutivo",
              "nombre"
            ),
            matchesInDropdowns: matches.length,
            sampleProducts: prods,
            idAreaRaw: idAreaRawLocal,
          };
        });
        try {
          console.log(
            "Diagnóstico filtrado encargados (primeras 20 filas):",
            JSON.stringify(diag, null, 2)
          );
        } catch {
          console.log(
            "Diagnóstico filtrado encargados (primeras 20 filas):",
            diag
          );
        }
      } catch (dErr) {
        console.warn("Error al construir diagnóstico:", dErr);
      }
    }
    // Normalizar claves para que el select siempre encuentre 'Usuario' y 'NombreEjecutivo'
    let normalized = (filtered || []).map((it) => ({
      ...it,
      Usuario: it.Usuario ?? it.usuario ?? it.user ?? null,
      NombreEjecutivo:
        it.NombreEjecutivo ?? it.nombreEjecutivo ?? it.nombre ?? "",
    }));

    // Asegurar que la entrada del ejecutivo de sesión esté presente como primera opción
    const sessionUsuario = userData?.usuario
      ? String(userData.usuario).toUpperCase()
      : null;
    const sessionNombre =
      userData?.NombreEjecutivo ??
      userData?.nombreEjecutivo ??
      userData?.nombre ??
      userData?.usuario ??
      "";
    const sessionOption = {
      NombreEjecutivo: sessionNombre || sessionUsuario || "",
      Usuario: sessionUsuario,
    };
    const existsSession = normalized.some((n) => {
      const nUser = n.Usuario ? String(n.Usuario).toUpperCase() : null;
      const nName = n.NombreEjecutivo ? String(n.NombreEjecutivo).trim() : null;
      if (sessionUsuario && nUser && sessionUsuario === nUser) return true;
      if (!sessionUsuario && sessionNombre && nName && sessionNombre === nName)
        return true;
      return false;
    });
    if (
      !existsSession &&
      (sessionOption.NombreEjecutivo || sessionOption.Usuario)
    ) {
      normalized.unshift(sessionOption);
    }

    console.log(
      "encargadosOptions -> normalized sample:",
      normalized
        .slice(0, 20)
        .map((x) => ({
          Usuario: x.Usuario,
          NombreEjecutivo: x.NombreEjecutivo,
          idEjecutivo: x.idEjecutivo,
        }))
    );
    setEncargadosOptions(normalized);
  }, [rawJerarquia, dropdownsEncargados, producto, isOpen]);

  // Helper para formatear celdas en la tabla (moneda, porcentajes, números preservando decimales)
  const formatCellByKey = (h, v) => {
    const normalizeHeaderKey = (s) =>
      String(s || "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
    const headerKey = normalizeHeaderKey(h);

    if (v === null || v === undefined || v === "") return "";

    // Detect numeric values (number type or numeric string)
    const isNumberType = typeof v === "number";
    const raw = String(v).trim();
    const numericStringRE = /^-?\d+(?:\.\d+)?(?:e[+-]?\d+)?$/i;
    const isNumericString = numericStringRE.test(raw);

    const moneyKeys = new Set([
      "montonegociado",
      "saldoasolucionar",
      "montoscumplidos",
      "montospagados",
      "saldosolucionado",
      "metamontocumplido",
      "metasaldosolucionado",
    ]);

    // Porcentajes: columnas que contienen '%' o nombres claros
    const isPercentKey =
      headerKey.includes("porcentaje") ||
      headerKey.includes("%") ||
      headerKey.startsWith("pct") ||
      (headerKey.includes("meta") && headerKey.includes("%"));

    // Formateadores locales
    const nfCurrency = new Intl.NumberFormat("es-ES", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      useGrouping: true,
    });
    const nfNumber = new Intl.NumberFormat("es-ES", {
      maximumFractionDigits: 6,
      useGrouping: true,
    });

    // Si es campo monetario
    if (
      moneyKeys.has(headerKey) ||
      headerKey.includes("monto") ||
      headerKey.includes("saldo")
    ) {
      // Mantener precisión para números pequeños
      if (isNumberType) {
        // Para números < 1, mostrar hasta 6 decimales
        const abs = Math.abs(v);
        if (abs > 0 && abs < 1) return "$" + nfNumber.format(Number(v));
        return "$" + nfCurrency.format(Number(v));
      }
      if (isNumericString) {
        const num = Number(raw);
        if (!isFinite(num)) return raw;
        if (Math.abs(num) > 0 && Math.abs(num) < 1)
          return "$" + nfNumber.format(num);
        return "$" + nfCurrency.format(num);
      }
      // Si no es numérico, devolver tal cual (normalizado)
      return "$" + String(v);
    }

    // Porcentajes: mostrar como entero con %
    if (isPercentKey) {
      if (isNumberType) return (Number(v) * 100).toFixed(0) + "%";
      if (isNumericString) return (Number(raw) * 100).toFixed(0) + "%";
    }

    // Si es numérico (pero no monetario), preservar decimales hasta 6 lugares
    if (isNumberType) {
      return nfNumber.format(v);
    }
    if (isNumericString) {
      // Dejar la representación numérica, pero con formato local
      const num = Number(raw);
      if (!isFinite(num)) return raw;
      return nfNumber.format(num);
    }

    // Fallback: texto normalizado (preservar acentos)
    try {
      return String(v).normalize("NFC");
    } catch {
      return String(v);
    }
  };

  return (
    <ReusableModal
      isOpen={isOpen}
      onClose={onClose}
      size="ejecutivos"
      showHeader
      headerComponent={DefaultModalHeader}
      headerProps={{
        title: (
          <span className="font-bold text-[#147f5e]">
            Reporte Ejecutivos - Coorin
          </span>
        ),
        icon: IconEjecutivos,
        iconClassName: "text-[#147f5e]",
        onClose,
        closeButtonClassName:
          "transition-colors duration-200 rounded-full p-1 sm:p-1.5 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300",
        // El color base y hover se controlan por eventos inline para igualar el comportamiento de Metas
        closeButtonStyle: {
          color: "#147f5e",
          fontSize: "1.25rem",
          lineHeight: 1,
        },
        closeButtonEvents: {
          onMouseEnter: (e) => (e.target.style.color = "#dc2626"),
          onMouseLeave: (e) => (e.target.style.color = "#147f5e"),
        },
      }}
      contentClassName="h-[92vh] overflow-y-auto"
      modalClassName="h-[98vh]"
      enableBounce={false}
      enableBounceOnBackdropOrEscape={true}
      closeOnBackdropClick={false}
      closeOnEscape={false}
    >
      <div
        className="coorin-modal-xl-container"
        style={{ maxWidth: "98vw", overflowX: "auto" }}
      >
        {/* Header y formulario */}
        <div className="flex items-center gap-6 mb-4 mt-4 px-4">
          {/* Logo */}
          <div className="w-32 h-32 flex flex-col items-center justify-center bg-gray-50 rounded-full overflow-hidden">
            <img
              src={ConsorcioLogo}
              alt="Consorcio Jurídico"
              style={{ height: "90px", width: "90px", objectFit: "cover" }}
            />
          </div>
          {/* Formulario reorganizado */}
          <form className="flex-1 space-y-3">
            {/* Row 1: 3 columnas, Cartera, Producto, Encargado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 w-full min-w-0 justify-center">
              {/* Cartera */}
              <div className="relative w-full">
                <select
                  className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                  value={cartera}
                  onChange={(e) => setCartera(e.target.value)}
                  id="cartera-select"
                >
                  <option value="" disabled hidden></option>
                  <option value="american_express">American Express</option>
                </select>
                <label
                  htmlFor="cartera-select"
                  className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                >
                  Cartera
                </label>
              </div>
              {/* Producto */}
              <div className="relative w-full">
                <select
                  className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                  value={producto}
                  onChange={(e) => setProducto(e.target.value)}
                  id="producto-select"
                >
                  <option value="" disabled hidden></option>
                  <option value="american_express">American Express</option>
                </select>
                <label
                  htmlFor="producto-select"
                  className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                >
                  Producto
                </label>
              </div>

              {/* Encargado moved here (after Indicador) */}
              <div className="relative w-full">
                <select
                  className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                  value={encargado}
                  onChange={(e) => setEncargado(e.target.value)}
                  id="encargado-select-row2"
                >
                  <option value="" disabled hidden></option>
                  {encargadosOptions && encargadosOptions.length > 0 ? (
                    encargadosOptions.map((item, idx) => (
                      <option
                        key={item.NombreEjecutivo ?? item.nombre ?? idx}
                        value={String(
                          item.Usuario ??
                            item.NombreEjecutivo ??
                            item.nombre ??
                            item.idEjecutivo ??
                            ""
                        )}
                      >
                        {item.NombreEjecutivo ??
                          item.nombreEjecutivo ??
                          item.nombre}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
                <label
                  htmlFor="encargado-select-row2"
                  className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                >
                  Encargado
                </label>
              </div>
              {/* Indicador moved to row1 col4 (replaces placeholder) */}
              <div className="relative w-full">
                <select
                  className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                  value={indicador}
                  onChange={(e) => setIndicador(e.target.value)}
                  id="indicador-select-row1"
                >
                  <option value="" disabled hidden></option>
                  <option value="Todos">Todos</option>
                  <option value="Gestiones">Gestiones</option>
                  <option value="Negociaciones">Negociaciones</option>
                  <option value="Búsquedas">Búsquedas</option>
                  <option value="Metas">Metas</option>
                  <option value="Tiempos">Tiempos</option>
                </select>
                <label
                  htmlFor="indicador-select-row1"
                  className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                >
                  Indicador
                </label>
              </div>
            </div>
            {/* Row 2: 4 columnas centradas: Desde | Hasta | Buscar | Exportar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 w-full min-w-0 mt-2 justify-center items-end">
              {/* Desde - col 1 */}
              <div className="flex justify-center">
                <div className="hs-input-group w-full max-w-full sm:max-w-[260px] md:max-w-[180px]">
                  <span className="hs-input-group-text min-w-[70px]">
                    Desde
                  </span>
                  <input
                    type="date"
                    max={yesterdayISO}
                    className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    value={desde}
                    onChange={(e) => setDesde(e.target.value)}
                  />
                </div>
              </div>

              {/* Hasta - col 2 */}
              <div className="flex justify-center">
                <div className="hs-input-group w-full max-w-full sm:max-w-[260px] md:max-w-[180px]">
                  <span className="hs-input-group-text min-w-[70px]">
                    Hasta
                  </span>
                  <input
                    type="date"
                    max={yesterdayISO}
                    className="bg-gray-50 py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    value={hasta}
                    onChange={(e) => setHasta(e.target.value)}
                  />
                </div>
              </div>

              {/* Buscar - col 3 */}
              <div className="flex justify-center">
                <button
                  type="button"
                  className="btn-success w-full sm:w-auto sm:min-w-[120px] px-4 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                  onClick={handleBuscar}
                >
                  Buscar
                </button>
              </div>

              {/* Exportar - col 4 */}
              <div className="flex justify-center">
                <button
                  className="btn-info w-full sm:w-auto sm:min-w-[120px] px-4 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
                  type="button"
                  onClick={handleExportar}
                >
                  Exportar
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Fila de acciones eliminada: ahora todo está en el row de arriba */}

        {/* Tabla de resultados */}
        <div
          className="overflow-x-auto overflow-y-scroll relative"
          style={{ maxHeight: "600px", overflowY: "scroll", overflowX: "auto" }}
        >
          {/* Spinner overlay centered */}
          {loading && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.6)", zIndex: 90 }}
            >
              <div className="flex flex-col items-center">
                <div
                  className="animate-spin rounded-full h-16 w-16 border-t-4 border-jerarquia1"
                  style={{ borderRightColor: "transparent" }}
                ></div>
                <div className="mt-2 text-sm text-gray-700">
                  Cargando resultados...
                </div>
              </div>
            </div>
          )}

          <table className="modal-table min-w-[900px] min-h-[280px] sm:min-h-[320px]">
            <thead>
              <tr>
                {resultados && resultados.length > 0 ? (
                  (visibleColumns || Object.keys(resultados[0])).map((h) => {
                    const keyNorm = String(h || "").toLowerCase();
                    const isStickyNombre = keyNorm === "nombreejecutivo";
                    const isStickyEjecutivo = keyNorm === "ejecutivo";
                    // widths in px for sticky columns
                    const firstWidth = 240; // NombreEjecutivo
                    const secondWidth = 40; // Ejecutivo (reducido)
                    const thStyle = {};
                    let thClass = "whitespace-nowrap";
                    if (isStickyNombre) {
                      thStyle.position = "sticky";
                      thStyle.top = 0;
                      thStyle.left = 0;
                      thStyle.zIndex = 80;
                      thStyle.background = "var(--color-background-secondary)";
                      thStyle.color = "#fff";
                      thStyle.fontWeight = 600;
                      thStyle.minWidth = firstWidth + "px";
                      thClass += " border-r";
                    } else if (isStickyEjecutivo) {
                      thStyle.position = "sticky";
                      thStyle.top = 0;
                      thStyle.left = firstWidth;
                      thStyle.zIndex = 70;
                      thStyle.background = "var(--color-background-secondary)";
                      thStyle.color = "#fff";
                      thStyle.fontWeight = 600;
                      thStyle.minWidth = secondWidth + "px";
                      thClass += " border-r";
                    }
                    return (
                      <th key={h} className={thClass} style={thStyle}>
                        {h}
                      </th>
                    );
                  })
                ) : (
                  <>
                    <th
                      className="whitespace-nowrap"
                      style={{
                        position: "sticky",
                        top: 0,
                        left: 0,
                        zIndex: 70,
                        background: "var(--color-background-secondary)",
                        color: "#fff",
                        fontWeight: 600,
                        minWidth: "240px",
                      }}
                    >
                      NombreEjecutivo
                    </th>
                    <th
                      className="whitespace-nowrap"
                      style={{
                        position: "sticky",
                        top: 0,
                        left: 240,
                        zIndex: 60,
                        background: "var(--color-background-secondary)",
                        color: "#fff",
                        fontWeight: 600,
                        minWidth: "40px",
                      }}
                    >
                      Ejecutivo
                    </th>
                    <th className="whitespace-nowrap">NombreEncargado</th>
                    <th className="whitespace-nowrap">Encargado</th>
                    <th className="whitespace-nowrap">CuentasGestionadas</th>
                    <th className="whitespace-nowrap">GestionesT</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={
                      resultados && resultados.length > 0
                        ? visibleColumns
                          ? visibleColumns.length
                          : Object.keys(resultados[0]).length
                        : 6
                    }
                    className="text-center py-4"
                  >
                    Cargando resultados...
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td
                    colSpan={
                      resultados && resultados.length > 0
                        ? visibleColumns
                          ? visibleColumns.length
                          : Object.keys(resultados[0]).length
                        : 6
                    }
                    className="text-center text-red-600 py-4"
                  >
                    {error}
                  </td>
                </tr>
              )}
              {!loading && !error && resultados && resultados.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No hay resultados
                  </td>
                </tr>
              )}

              {!loading &&
                resultados &&
                resultados.length > 0 &&
                resultados.map((row, idx) => (
                  <tr
                    key={idx}
                    onClick={() => setSelectedRowKey(idx)}
                    style={{ cursor: "pointer" }}
                  >
                    {(visibleColumns || Object.keys(row)).map((k) => {
                      const keyNorm = String(k || "").toLowerCase();
                      const isStickyNombre = keyNorm === "nombreejecutivo";
                      const isStickyEjecutivo = keyNorm === "ejecutivo";
                      const firstWidth = 240;
                      const secondWidth = 40;
                      const tdStyle = {};
                      let tdClass = "whitespace-nowrap";
                      if (isStickyNombre) {
                        tdStyle.position = "sticky";
                        tdStyle.left = 0;
                        tdStyle.zIndex = 79;
                        // If this row is selected, show jerarquia3 background, otherwise keep white for sticky cells
                        tdStyle.background =
                          selectedRowKey === idx
                            ? "var(--color-jerarquia3)"
                            : "#fff";
                        if (selectedRowKey === idx) tdStyle.color = "#fff";
                        tdStyle.minWidth = firstWidth + "px";
                        tdStyle.borderRight =
                          "1px solid var(--color-jerarquia3)";
                        tdClass += " border-r";
                      } else if (isStickyEjecutivo) {
                        tdStyle.position = "sticky";
                        tdStyle.left = firstWidth;
                        tdStyle.zIndex = 69;
                        tdStyle.background =
                          selectedRowKey === idx
                            ? "var(--color-jerarquia3)"
                            : "#fff";
                        if (selectedRowKey === idx) tdStyle.color = "#fff";
                        tdStyle.minWidth = secondWidth + "px";
                        tdStyle.borderRight =
                          "1px solid var(--color-jerarquia3)";
                        tdClass += " border-r";
                      }
                      // Apply selected row background for non-sticky cells as well
                      if (
                        !isStickyNombre &&
                        !isStickyEjecutivo &&
                        selectedRowKey === idx
                      ) {
                        tdStyle.background = "var(--color-jerarquia3)";
                        tdStyle.color = "#fff";
                      }
                      return (
                        <td key={k + idx} className={tdClass} style={tdStyle}>
                          {formatCellByKey(k, row[k])}
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </ReusableModal>
  );
};

export default ModalConsultaEjecutivosModal;