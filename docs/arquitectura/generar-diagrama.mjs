import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const schema = JSON.parse(fs.readFileSync(path.join(dir, 'tldraw-schema.json'), 'utf8').replace(/^\uFEFF/, ''));
const records = [
    { id: 'document:document', typeName: 'document', name: 'CoorinWeb · Arquitectura', gridSize: 10, meta: {} },
    { id: 'page:page', typeName: 'page', name: 'Arquitectura del proyecto', index: 'a1', meta: {} },
];
let order = 0;
const shapes = [];
const palette = { blue: ['#eaf2ff', '#3368ac'], green: ['#eaf7ef', '#28724e'], violet: ['#f1ecff', '#7353ad'], orange: ['#fff3df', '#a66b16'], black: ['#f5f7fa', '#38475b'] };
function shape(id, type, x, y, props) {
    const record = { id: `shape:${id}`, typeName: 'shape', type, x, y, rotation: 0, isLocked: false, opacity: 1, parentId: 'page:page', index: `a${'123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'[order++]}`, meta: {}, props };
    records.push(record);
    return record;
}
function text(id, x, y, value, w, size = 's', color = 'black') {
    shape(id, 'text', x, y, { text: value, w, size, color, font: 'sans', textAlign: 'start', autoSize: false, scale: 1 });
}
function box(id, x, y, w, h, title, lines, color = 'blue') {
    shape(id, 'geo', x, y, { geo: 'rectangle', w, h, color, labelColor: 'black', fill: 'solid', dash: 'solid', size: 's', font: 'sans', text: '', align: 'middle', verticalAlign: 'middle', growY: 0, url: '', scale: 1 });
    text(`${id}-title`, x + 18, y + 16, title, w - 36, 'm', color);
    text(`${id}-body`, x + 18, y + 62, lines.join('\n'), w - 36);
    shapes.push({ id, x, y, w, h, title, lines, color });
}
const edges = [];
function arrow(id, x1, y1, x2, y2, label = '') {
    shape(id, 'arrow', x1, y1, { color: 'black', labelColor: 'black', fill: 'none', dash: 'solid', size: 's', font: 'sans', text: label, bend: 0, start: { x: 0, y: 0 }, end: { x: x2 - x1, y: y2 - y1 }, arrowheadStart: 'none', arrowheadEnd: 'arrow', labelPosition: 0.5, scale: 1 });
    edges.push({ x1, y1, x2, y2, label });
}
text('heading', 40, 20, 'CoorinWeb / Arquitectura del proyecto', 1550, 'xl');
text('subtitle', 40, 80, 'React 19 · Vite 6 · SPA de operación y cobranza | Contexto revisado: 07 oct 2026', 1550);
text('frontend-label', 40, 145, '01 / NAVEGADOR · FRONTEND VERIFICADO EN EL REPOSITORIO', 1150, 'm', 'blue');
box('user', 40, 210, 250, 170, 'Usuario / ejecutivo', ['Accede desde el navegador', 'Login y selección de', 'cartera / producto'], 'black');
box('entry', 350, 210, 350, 170, 'Entrada y navegación', ['main.jsx → App.jsx', 'BrowserRouter + lazy/Suspense', '/ → LoginPage', 'ProtectedRoute → Dashboard']);
box('modules', 770, 210, 450, 230, 'Módulos de operación', ['CoorinDashboard + CoorinSidebar', 'Consultas: cuentas, generales, históricos', 'Ejecutivos, campañas y catálogos', 'GESPA, gestiones, visitas, accionamientos', 'Información y reportes']);
box('state', 40, 510, 330, 240, 'Estado · Zustand', ['userStore: usuario y autenticación', 'catalogStore: catálogos por sesión', 'themeStore: tema visual', 'Stores de selección y producto', 'sessionStorage + localStorage'], 'violet');
box('forms', 440, 510, 370, 240, 'Formularios y contratos', ['schemas/formSchemas.js · Zod', 'hooks/useZodValidation.js', 'forms/queryAdapters.js → DTO', 'forms/formContracts.js', 'verified / partial / pending-audit'], 'violet');
box('ui', 880, 510, 340, 240, 'UI compartida', ['components/Modal · GlobalModal', 'Select, CatalogSelect y campos', 'Tablas, filtros y notificaciones', 'Tailwind 4 + Preline + Sonner', 'utils/ExcelExporter.js · XLSX']);
text('services-label', 40, 840, '02 / SERVICIOS Y COMUNICACIÓN', 1150, 'm', 'green');
box('services', 40, 910, 535, 235, 'Servicios por dominio', ['CatalogService → normaliza y valida respuestas', 'ConsultationService → fachada de consultas Loki', 'VisitService → CRUD / cargas FormData', 'dayExecutiveService → reporte validado con Zod', 'AuthServices → login con servidor Albaz'], 'green');
box('legacy', 645, 910, 575, 235, 'Integración Loki y configuración', ['services/mark/orochi/LokiServices.js', 'services/mark/albaz/LokiServices.js', 'Módulos conservan llamadas directas a Loki', 'config/backend.js: ACTIVE_SERVER = "albaz"', 'Consultas y catálogos usan el servidor activo'], 'green');
box('http', 350, 1230, 560, 205, 'Cliente HTTP · Axios', ['loki/apiConfig.js · instancia compartida', 'baseURL: import.meta.env.VITE_API_URL', 'Interceptor: Authorization Bearer salvo login', 'Servicios concretos manejan errores de sesión'], 'green');
text('external-label', 1320, 145, '03 / SISTEMAS EXTERNOS', 550, 'm', 'orange');
box('api', 1320, 210, 535, 330, 'Backend CoorinWeb · API', ['Controladores C# según documentación local', 'Auth · campañas · catálogos · campos pantalla', 'Búsquedas · productividad · día del ejecutivo', 'Visitas · gestiones · procesos GESPA', '', 'Rutas relativas a VITE_API_URL', 'Implementación fuera de este frontend'], 'orange');
box('data', 1320, 650, 535, 200, 'Servidor de datos seleccionado', ['Albaz: selector activo del frontend', 'La API resuelve el acceso a los datos', 'Topología, motores y despliegue:', 'sin verificar en este repositorio'], 'orange');
box('legacy-context', 1320, 960, 535, 210, 'Contexto de migración', ['Formularios legacy → equivalentes React', 'CONTEXTO_*.md + MAPEO_ENDPOINTS_*', 'Grafo legacy existente como referencia', 'PendingAuditForm para contratos pendientes'], 'black');
arrow('user-entry', 290, 295, 350, 295);
arrow('entry-modules', 700, 295, 770, 295);
arrow('entry-state', 350, 355, 240, 510);
arrow('modules-forms', 865, 440, 700, 510);
arrow('modules-ui', 1090, 440, 1090, 510);
arrow('state-services', 205, 750, 205, 910);
arrow('forms-services', 600, 750, 460, 910);
arrow('modules-legacy', 1235, 330, 1235, 1020);
arrow('services-http', 340, 1145, 490, 1230);
arrow('legacy-http', 830, 1145, 780, 1230);
arrow('http-api', 910, 1325, 1295, 1325, 'HTTP / JSON · Bearer');
arrow('http-api-up', 1295, 1325, 1295, 440);
arrow('http-api-in', 1295, 440, 1320, 440);
arrow('api-data', 1585, 540, 1585, 650, 'Resolución del servidor');
text('legend', 40, 1510, 'AZUL: presentación   ·   VIOLETA: estado y contratos   ·   VERDE: integración   ·   NARANJA: sistemas externos documentados', 1800);
text('footnote', 40, 1555, 'Flechas: dependencias / flujo de solicitud. La respuesta regresa por las mismas capas. No se presupone que todos los módulos legacy estén migrados.', 1800);
fs.writeFileSync(path.join(dir, 'coorinweb-arquitectura.tldr'), JSON.stringify({ tldrawFileFormatVersion: 1, schema, records }, null, 2));
const esc = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
let svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1900 1630"><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8" fill="#617187"/></marker></defs><rect width="1900" height="1630" fill="white"/>';
for (const b of shapes) { const [fill, stroke] = palette[b.color]; svg += `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="12" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`; }
for (const e of edges) { svg += `<path d="M${e.x1} ${e.y1}L${e.x2} ${e.y2}" stroke="#617187" stroke-width="2" fill="none" marker-end="url(#arrow)"/>`; if (e.label) svg += `<text x="${(e.x1 + e.x2) / 2}" y="${(e.y1 + e.y2) / 2 - 12}" font-family="Arial" font-size="16" text-anchor="middle">${esc(e.label)}</text>`; }
for (const r of records.filter(r => r.type === 'text')) { const p = r.props; const size = { s: 18, m: 24, xl: 38 }[p.size]; const color = palette[p.color]?.[1] || '#38475b'; p.text.split('\n').forEach((line, i) => { svg += `<text x="${r.x}" y="${r.y + size + i * size * 1.45}" font-family="Arial, sans-serif" font-size="${size}" fill="${color}" ${p.size !== 's' ? 'font-weight="600"' : ''}>${esc(line)}</text>`; }); }
fs.writeFileSync(path.join(dir, 'coorinweb-arquitectura.svg'), svg + '</svg>');
console.log(`Generado: ${records.length} registros; ${shapes.length} bloques; ${edges.length} conexiones.`);
