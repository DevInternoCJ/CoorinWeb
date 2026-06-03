---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.

---

## Preline UI as Base Framework

**CRITICAL RULE**: ALWAYS use [Preline UI](https://preline.co/) components and utility classes as the foundational base for any new UI element, especially buttons, inputs, modals, and navigation elements.

- **Buttons**: Do not write custom CSS buttons from scratch. Use Preline's button class structures (e.g., `py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[var(--color-jerarquia2)] text-white hover:bg-[var(--color-jerarquia3)] disabled:opacity-50 disabled:pointer-events-none`) adapted to our CSS variables.
- **Form Elements**: Checkboxes, selects, and inputs must use Preline's form structures, leveraging the Tailwind Forms plugin aesthetics combined with our theme colors.
- **Modals and Overlays**: Base any new modal or overlay on Preline's modal components.
- **Consistency**: By anchoring everything in Preline, we ensure consistent accessibility, focus states (`focus:ring-2`, `focus:outline-none`), disabled states (`disabled:opacity-50 disabled:pointer-events-none`), and responsive behaviors. Adapt the colors using `var(--color-jerarquiaX)` o our semantic tailwind classes (`bg-primary`, `bg-surface`, etc.) to match the CoorinWeb theme.

---

## CoorinWeb — Reusable Select/Input Component System

These three components live in `src/components/Select/` and share the same design tokens (`--color-*` CSS variables) enabling automatic dark-mode support. **Always prefer these over native `<select>` or `<input>` elements.**

### 1. `FloatingSelect` — `FloatingSelect.jsx`
A controlled select with floating label. Use for any dropdown choice.

```jsx
import FloatingSelect from "../../../../../components/Select/FloatingSelect";

<FloatingSelect
  id="cartera-select"           // required — unique ID for a11y
  label="Cartera"               // floating label text
  value={cartera}               // controlled value
  onChange={(e) => setCartera(e.target.value)}
  options={[                    // array of { value, label } OR plain strings
    { value: "1", label: "Cartera 1" },
    { value: "2", label: "Cartera 2" },
  ]}
  required                      // shows * and adds HTML5 required
  disabled={isLoading}          // disables with 50% opacity
  placeholder="Seleccionar…"   // empty option text (default: "Seleccionar…")
  size="md"                     // "sm" | "md" (default) | "lg"
  icon={<SomeIcon />}           // optional SVG icon on the left
  className=""                  // extra classes on wrapper div
/>
```

**Key behaviour**: Options can also be plain strings — the component normalises them internally. When `value !== ""` the label stays in its condensed "floated" position.

---

### 2. `FloatingInput` — `FloatingInput.jsx`
A controlled text input with floating label. Mirrors `FloatingSelect` API.

```jsx
import FloatingInput from "../../../../../components/Select/FloatingInput";

<FloatingInput
  id="rfc-input"
  label="RFC"
  value={rfc}
  onChange={(e) => setRfc(e.target.value)}
  type="text"                   // any HTML input type (default: "text")
  required
  disabled={false}
  readOnly={false}
  maxLength={13}
  autoComplete="off"
  error="RFC inválido"          // shows error message + red border
  hint="13 caracteres máximo"   // helper text (hidden when error is set)
  size="md"                     // "sm" | "md" | "lg"
  icon={<SomeIcon />}
  onBlur={handler}
  onFocus={handler}
  onKeyDown={handler}
/>
```

---

### 3. `ConsultFilter` — `ConsultFilter.jsx`
Internally wraps `FloatingSelect` and **loads its options dynamically from the API** based on `filterType`. Use when the options depend on a category selected elsewhere.

```jsx
import ConsultFilter from "../../../../../components/Select/ConsultFilter";

<ConsultFilter
  id="situacion-select"
  label="Situación"
  filterType={cuenta}           // "Cuenta" | "Producto" | "Conteos" | "Fechas"
  idProducto={idProducto}       // number — required for "Producto" filter
  defaultValue=""
  options={[]}                  // fallback static options (optional)
  onSelectionChange={(opt) => setSituacion(opt)}   // receives full {value, label, concepto}
  onAllOptionsLoaded={(opts) => setAllOpts(opts)}  // receives full loaded list
/>
```

**Supported `filterType` values and their data source:**
| filterType | API call | Filter condition |
|---|---|---|
| `"Cuenta"` | `chargueCatalog` | `item.detalle === "Cuenta"` |
| `"Producto"` | `getColumsProduct` | all items |
| `"Conteos"` | `chargueCatalog` | `item.detalle === "Conteos"` |
| `"Fechas"` | `chargueCatalog` | `item.detalle === "Fechas"` |

While loading, the underlying `FloatingSelect` shows `"Cargando…"` as placeholder and is disabled automatically.

---

### Design System Notes
- All three components use `var(--color-surface-secondary)` for background, `var(--color-border)` for borders, and `var(--color-jerarquia2/3)` for focus rings — no `bg-gray-*` or hardcoded colours allowed.
- The label floats when `value !== ""` or on focus — no extra CSS class is needed.
- `size` prop controls padding and font size consistently; prefer `"md"` unless space is tight.

---

## CoorinWeb — Sistema de Tematización (Preline Themes)

### Arquitectura

Los colores del proyecto viven en **`src/themes/coorin.css`** (importado en `index.css`). Este archivo define los tokens semánticos de Preline mapeados a la paleta verde de CoorinWeb.

```
index.css
  └── @import "preline/variants.css"
  └── @import "./themes/coorin.css"   ← fuente única de verdad
```

### Cómo se conecta todo

| Capa | Dónde vive | Qué hace |
|---|---|---|
| `coorin.css :root` | `src/themes/coorin.css` | Valores reales de colores (luz) |
| `coorin.css .dark` | `src/themes/coorin.css` | Override automático en modo oscuro |
| `index.css @theme` | `src/index.css` | Mapea a Tailwind (`bg-jerarquia2`, etc.) |
| `index.css :root/.dark` | `src/index.css` | Alias `--color-*` mínimos de compat. |

### Regla de oro para mode claro/oscuro

> **Usar la clase semántica de Tailwind, NO la clase `dark:`.**

En lugar de:
```jsx
// ❌ Requiere dos clases
className="bg-white dark:bg-[var(--color-surface)]"
```

Usar:
```jsx
// ✅ Una sola clase — cambia sola al alternar .dark
className="bg-surface"        // fondo panel
className="bg-background"     // fondo dashboard
className="bg-layer"          // fondo cards/modales
className="text-foreground"   // texto principal
className="text-muted-foreground" // texto secundario
className="border-line-2"     // borde estándar
className="bg-primary"        // botón/acento teal
```

### Tokens semánticos más usados en CoorinWeb

| Token semántico | Clase / CSS Variable | Luz | Oscuro | Descripción |
|---|---|---|---|---|
| `--background` | `bg-background` | `#dee5e5` | `#011008` | Fondo de la aplicación |
| `--background-1` | `bg-background-1` | `#f5f5f5` | `#0f2919` | Fondo alternativo |
| `--foreground` | `text-foreground` | `#1b4838` | `#a7f3d0` | Texto principal |
| `--surface` | `bg-surface` | `#f5f5f5` | `#162b20` | Superficies de contenedores principales |
| `--layer` | `bg-layer` | `#ffffff` | `#101311` | Capa base de cards y modales |
| `--overlay` | `bg-overlay` | `#efefef` | `#1a2e22` | Superposiciones / backdrops |
| `--border` | `border-border` | `#e5e7eb` | `#2d4a3a` | Bordes estándar |
| `--muted-foreground` | `text-muted-foreground` | `#6b7280` | `#9ca3af` | Texto secundario o muted |
| `--primary` | `bg-primary` | `#3eac91` | `#3eac91` | Color primario de marca (Verde Coorin) |
| `--destructive` | `bg-destructive` | `#d78b84` | `#b91c1c` | Color destructivo / peligro |

### Variables del sistema de diseño (CSS custom properties)

| Variable CSS | Valor Claro | Valor Oscuro | Uso común en la app |
|---|---|---|---|
| `--color-text-primary` | `#1b4838` | `#96c9b2` | Texto de títulos y etiquetas principales |
| `--color-text-secondary`| `#374151` | `#d1d5db` | Texto de cuerpo e inputs |
| `--color-text-muted` | `#6b7280` | `#9ca3af` | Subtítulos y textos de soporte |
| `--color-surface` | `#ffffff` | `#090e0a` | Fondo principal de paneles y layouts |
| `--color-surface-secondary`| `#f5f5f5` | `#001007` | Fondos de inputs, selectores y cabeceras |
| `--color-surface-modal` | `#efefef` | `#11271a` | Fondo base de las ventanas modales |
| `--color-border` | `#e5e7eb` | `#2d4a3a` | Líneas divisorias y bordes de elementos |
| `--color-jerarquia1` | `#9dc5bc` | `#4b9989` | Acento secundario (Verde claro) |
| `--color-jerarquia2` | `#3eac91` | `#3eac91` | Color principal de acción / foco (Verde medio) |
| `--color-jerarquia3` | `#147f5e` | `#50c9a8` | Color de énfasis destacado (Verde oscuro) |
| `--color-jerarquia4` | `#1b4838` | `#44be71` | Fondo de cabeceras o etiquetas seleccionadas |

### Tokens propios del proyecto (via `@theme`)

| Clase Tailwind | Descripción |
|---|---|
| `bg-jerarquia1/2/3/4` | Paleta de acento verde por jerarquía |
| `bg-background-dashboard` | Fondo del área principal |
| `bg-surface-secondary` | Fondo de inputs/paneles secundarios |
| `bg-surface-modal` | Fondo de modales |
| `text-text-primary` | Texto principal (alias de `text-foreground`) |
| `bg-btn-danger-bg` | Fondo botón danger |
| `bg-card-metas-bg`, etc. | Cards de ejecutivos |

### Modificar colores globalmente

Para cambiar un color en **toda la app** (claro y oscuro) editar **solo** `src/themes/coorin.css`:

```css
/* coorin.css */
:root  { --primary: #mi-nuevo-color-luz; }
.dark  { --primary: #mi-nuevo-color-oscuro; }
```

No es necesario tocar ningún componente.

---

## CoorinWeb — Compact Search Bar Pattern

Use this pattern for internal search filters within data-rich modals or sidebars. It maximizes density while maintaining professional accessibility.

### JSX Pattern

```jsx
const [query, setQuery] = useState("");

<div className="relative mb-2">
  {/* Magnifying Glass Icon (Start) */}
  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
    <svg className="size-3.5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
  </div>
  
  <input
    type="text"
    className="py-1.5 ps-9 pe-8 block w-full bg-background-dashboard border-transparent rounded-lg text-xs font-medium focus:border-jerarquia2 focus:ring-jerarquia2 placeholder:text-muted-foreground/60 transition-all"
    placeholder="Buscar..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />

  {/* Clear Button (End) — Only visible when query has text */}
  {query && (
    <button
      type="button"
      onClick={() => setQuery("")}
      className="absolute inset-y-0 end-0 flex items-center pe-3 text-muted-foreground/60 hover:text-destructive transition-colors focus:outline-none"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
    </button>
  )}
</div>
```

### Key Design Guidelines
1. **Vertical Alignment**: Icons must be perfectly centered (`inset-y-0 flex items-center`).
2. **Padding Balance**: Use `ps-9` (start) for the search icon and `pe-8` (end) for the clear button to prevent text overlap.
3. **Interactive Feedback**: The clear button should use `text-muted-foreground/60` and transition to `text-destructive` on hover for rapid visual feedback.
4. **Contextual Styling**: Prefer `bg-background-dashboard` for inputs inside white panels to create subtle depth without high-contrast borders.
5. **Aaccessible Text**: Default to `text-xs` with `font-medium` for dense data tables within modals.
