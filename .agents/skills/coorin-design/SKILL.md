---
name: coorin-design
description: Sistema visual de CoorinWeb para formularios, consultas, catálogos y modales.
---

# CoorinWeb Design System

Usa siempre los tokens semánticos del tema para conservar consistencia entre modo claro y oscuro. No introduzcas `bg-white`, `bg-gray-*`, `text-gray-*` ni colores hexadecimales dentro de componentes.

## Superficies y texto

- `bg-background`: fondo de aplicación.
- `bg-surface`: paneles principales.
- `bg-layer`: tarjetas y modales.
- `bg-surface-secondary`: controles, cabeceras y filas alternas.
- `text-foreground`: texto principal.
- `text-muted-foreground`: texto secundario.
- `border-border`: bordes y divisores.

## Acentos y estados

- `bg-primary` o `bg-jerarquia2`: acción principal.
- `text-jerarquia3`: títulos y énfasis.
- `bg-jerarquia4`: encabezados de tablas.
- `bg-destructive`, `text-destructive`: errores y eliminación.
- En botones usar `disabled:opacity-50 disabled:pointer-events-none` y estados de foco Preline (`focus:ring-2 focus:ring-jerarquia2`).

## Formularios

Usa `CatalogSelect`, `FloatingSelect` y `FloatingInput` en lugar de controles nativos. Los identificadores deben ser únicos, los valores controlados y los selects dependientes deben limpiar su selección cuando cambia su padre. Mantén espaciado `gap-3`, radios `rounded-lg` y tablas con `modal-table`.

## Modales de consulta

Estructura recomendada: encabezado fijo, cuerpo con `overflow-y-auto`, paneles `bg-surface` y footer separado. Los resultados deben mostrar estados vacío, carga y error con tokens semánticos, sin colores hardcodeados.
