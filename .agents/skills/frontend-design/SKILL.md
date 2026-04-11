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

| Token semántico | Clase Tailwind | Luz | Oscuro |
|---|---|---|---|
| `--background` | `bg-background` | `#dee5e5` | `#011008` |
| `--background-1` | `bg-background-1` | `#f5f5f5` | `#0f2919` |
| `--foreground` | `text-foreground` | `#1b4838` | `#a7f3d0` |
| `--surface` | `bg-surface` | `#f5f5f5` | `#162b20` |
| `--layer` | `bg-layer` | `#ffffff` | `#101311` |
| `--overlay` | `bg-overlay` | `#efefef` | `#1a2e22` |
| `--border` | `border-border` | `#e5e7eb` | `#2d4a3a` |
| `--muted-foreground` | `text-muted-foreground` | `#6b7280` | `#9ca3af` |
| `--primary` | `bg-primary` | `#3eac91` | `#3eac91` |
| `--destructive` | `bg-destructive` | `#d78b84` | `#b91c1c` |

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
