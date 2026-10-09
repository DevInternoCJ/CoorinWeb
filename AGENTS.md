# Repository Guidelines

## Project Structure & Module Organization

This repository is a Vite-powered React application. Application code lives in `src/`: reusable UI is under `components/`, screens under `views/`, schemas under `forms/` and `schemas/`, API clients under `services/`, state under `contextGlobal/` and Zustand stores, and helpers under `hooks/`, `utils/`, and `config/`. Static files belong in `public/`; imported assets belong in `src/assets/`. Legacy mappings are documented in `CONTEXTO_*.md` and `MAPEO_*.md`. Generated folders (`dist/`, `graphify-out/`, `legacy-forms-graphify-out/`) should only change when intentionally regenerated.

## Build, Test, and Development Commands

Run these commands from the repository root:

```bash
npm install       # install the locked dependency set
npm run dev       # start the Vite development server
npm run build     # create a production build in dist/
npm run preview   # serve the production build locally
npm run lint      # run ESLint across the repository
```

There is currently no dedicated unit-test script or test framework configured. Treat `npm run lint` and `npm run build` as the required pre-PR checks.

## Coding Style & Naming Conventions

Use four-space indentation, ES modules, and semicolons consistent with existing files. React components use PascalCase (`ModalConsultaCuentas.jsx`); hooks use `useX`; services and utilities follow their directory’s existing casing. Keep API calls in services, validate payloads with Zod, and use Zustand for catalog/session state. Preserve `src/services/mark/orochi/LokiServices.js` and `ACTIVE_SERVER` unless an endpoint contract proves a change is required.

## Testing Guidelines

When changing forms or services, manually exercise the affected route with `npm run dev`, including loading, empty, validation-error, and API-error states. Add automated tests only after introducing the project’s test runner; keep test files adjacent to the feature or under a future `src/**/__tests__/` directory and name them `*.test.jsx` or `*.test.js`.

## Commit & Pull Request Guidelines

Recent commits use short, imperative Spanish descriptions (for example, `Correcciones de consultas...` or `Mejoras de login`). Follow that style, keep each commit focused, and avoid committing generated bundles or secrets. Pull requests should describe the affected legacy form or endpoint, list validation commands run, identify any contract assumptions, and include screenshots or a short recording for visible UI changes. Link the relevant issue or mapping document when available.

## Security & Configuration

Keep tokens and environment-specific URLs in local environment configuration such as `.env.local`; never commit credentials. Verify the selected backend server and catalog source before changing service routing, and do not log authorization headers or sensitive account data.
