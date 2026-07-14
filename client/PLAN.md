# PM-FE — Industrial-Grade Frontend Scaffold Plan

## Goal

Scaffold a production-grade React frontend for a project-management app, wired with the
confirmed stack and organized with Atomic Design. Everything maps to a clean, testable,
documented structure ready to connect to a separate Express.js backend.

## Confirmed Decisions

| Concern              | Choice                                                         |
| -------------------- | -------------------------------------------------------------- |
| Language             | TypeScript (strict)                                            |
| Build                | Vite + React 19                                                |
| Styling              | Tailwind CSS **v4** (via `@tailwindcss/vite`)                  |
| Client/UI state      | Zustand                                                        |
| Server state         | TanStack Query (`@tanstack/react-query`)                       |
| Tabulation           | `react-data-table-component@8.0` (reactdatatable.com)          |
| Routing + middleware | `react-router@8.2.0` (unified pkg, `react-router/dom`)         |
| Realtime             | `socket.io-client` behind a clean interface                    |
| Kanban DnD           | `@dnd-kit/core` + `@dnd-kit/sortable` (modern "React DnD")     |
| Query builder        | `@react-querybuilder`                                          |
| Forms                | React Hook Form (no FE schema; validation on BE only)          |
| Component docs       | Storybook 8 **Autodocs** (the "Swagger/Scalar for components") |
| Testing              | Jest + Testing Library (jsdom)                                 |
| Architecture         | Atomic Design                                                  |
| Code quality         | ESLint + Prettier (implied by "industrial grade")              |

> React Router 8.2.0 peer-deps require React >= 19, so we use React 19.
> `react-data-table-component@8.0` declares "No peer deps · React 18+", so React 19 is fine.

---

## Project Structure

```
starter-pm-fe/
├── .storybook/
│   ├── main.ts                 # framework: @storybook/react-vite, autodocs
│   └── preview.ts              # global decorators (Tailwind, themes)
├── public/
├── src/
│   ├── main.tsx                # Vite entry → renders <App/> in RouterProvider
│   ├── App.tsx                 # mounts Router + QueryClientProvider + SocketProvider
│   ├── index.css               # @import "tailwindcss"; + @theme tokens
│   ├── vite-env.d.ts
│   │
│   ├── components/             # ATOMIC DESIGN
│   │   ├── atoms/              # Button, Input, Typography, Badge, Spinner, ...
│   │   │   └── <Name>/Name.tsx | .stories.tsx | .test.tsx | index.ts
│   │   ├── molecules/          # FormField, DataTable, QueryBuilder, Modal
│   │   ├── organisms/          # Navbar, Sidebar, KanbanBoard, DataTablePage
│   │   ├── templates/          # DashboardLayout, AuthLayout
│   │   └── index.ts            # barrel exports
│   │
│   ├── pages/                  # route-level: Dashboard, Login, Kanban, TableDemo
│   │
│   ├── routes/
│   │   ├── router.tsx          # createBrowserRouter (nested)
│   │   ├── guards.tsx          # auth loader + ProtectedRoute
│   │   └── paths.ts            # central path constants
│   │
│   ├── store/                  # Zustand
│   │   ├── authStore.ts        # token, user, login/logout, hydrate
│   │   ├── uiStore.ts          # sidebar, theme, toasts
│   │   ├── socketStore.ts      # connection status, last event
│   │   └── index.ts
│   │
│   ├── api/
│   │   ├── client.ts           # axios instance + interceptors
│   │   ├── queryClient.ts      # QueryClient config
│   │   └── queries/            # useXQuery / useXMutation hooks
│   │
│   ├── sockets/
│   │   ├── SocketManager.ts     # typed singleton wrapper (clean interface)
│   │   ├── events.ts            # typed event map
│   │   └── SocketProvider.tsx   # context + auto-connect
│   │
│   ├── hooks/                  # useAuth, useDebounce, useSocket, useTheme
│   ├── lib/                    # cn.ts (clsx+tailwind-merge), utils
│   ├── types/                  # shared domain types
│   ├── config/                 # env.ts (typed import.meta.env)
│   └── test/                   # jest.setup.ts, test-utils.tsx
│
├── jest.config.ts
├── jest.setup.ts
├── tailwind handled by v4 (no config file needed; tokens in index.css @theme)
├── .eslintrc.cjs / eslint.config.js
├── .prettierrc
├── tsconfig.json | tsconfig.node.json
├── vite.config.ts
├── package.json
└── README.md
```

---

## Dependencies

**runtime:** react@19, react-dom@19, react-router@8.2.0, zustand, @tanstack/react-query,
react-data-table-component@8.0, socket.io-client, @dnd-kit/core, @dnd-kit/sortable,
@dnd-kit/utilities, @react-querybuilder, react-hook-form, axios, clsx, tailwind-merge

**dev:** vite, @vitejs/plugin-react, typescript, tailwindcss@4, @tailwindcss/vite,
jest, ts-jest (or @swc/jest), jest-environment-jsdom, @testing-library/react,
@testing-library/jest-dom, @testing-library/user-event, identity-obj-proxy,
eslint, prettier, storybook, @storybook/react-vite

> Install latest at scaffold time; pin `react-router@8.2.0` and `react-data-table-component@8.0` exactly.

---

## Key Integration Patterns

### Routing + Middleware (react-router 8.2.0)

- `createBrowserRouter` with nested routes; `RouterProvider` in `App.tsx`.
- Auth gate via **loader** (the v8 idiom for middleware):
  ```ts
  export const authLoader = () => {
    const token = useAuthStore.getState().token;
    if (!token) return redirect(paths.login);
    return null;
  };
  ```
- Protected section: `DashboardLayout` route (loader: `authLoader`) wraps child pages.
- `paths.ts` holds all route constants to avoid string drift.

### State (Zustand)

- `authStore`: `{ token, user, login(), logout(), hydrate() }` — hydrated from `localStorage` on boot.
- `uiStore`: sidebar/theme/toast — pure client state.
- `socketStore`: mirrors connection status from `SocketManager`.
- Persist only `authStore` (zustand `persist` middleware).

### Data layer (TanStack Query + axios)

- `client.ts`: axios instance, `baseURL = config.apiUrl`, request interceptor injects
  `Authorization: Bearer <token>` from `authStore`, response interceptor triggers
  `logout()` + redirect on 401.
- `queryClient.ts`: sensible defaults (staleTime, retry, refetchOnWindowFocus).
- `queries/`: `useProjectsQuery()`, `useUpdateTaskMutation()`, etc.

### Realtime (Socket.IO, behind interface)

- `SocketManager.ts`: singleton wrapping `io()`, exposes `connect/disconnect/emit/on/off`
  with a typed event map from `events.ts`. No component imports socket.io directly.
- `useSocket(event, handler)` hook handles subscribe/unsubscribe + cleanup.
- Connection state pushed into `socketStore`.

### Tabulation → `DataTable` molecule (react-data-table-component)

- Thin generic wrapper `<DataTable<T> columns data />` over default export `DataTable`.
- Preconfigure: `pagination`, `highlightOnHover`, `striped`, a dark-mode-friendly theme
  via `createTheme`, and a `toolbar`/`subHeader` slot for search/filter actions.
- Columns typed as `TableColumn<T>[]` (exported by the lib) — fully inferred from data.
- Reused by `DataTablePage` organism and any list page; data fed from TanStack Query.

### Kanban → `KanbanBoard` organism (@dnd-kit)

- `DndContext` + droppable columns + draggable cards; `onDragEnd` optimistically
  updates local state and calls a mutation hook.

### Query Builder → `QueryBuilder` molecule

- Wraps `@react-querybuilder` with default Tailwind-styled controls.

### Forms (RHF, validation BE-side)

- `FormField` molecule: label + `Input` atom + error, wired via `Controller`/`useFormContext`.
- RHF used for form state, dirty/touched, and submit handling **only**.
- **No FE schema validation** — all validation lives on the Express BE (single source of truth, no double validation). FE surfaces BE field errors via the axios error response mapped into `setError()`.

### Storybook Autodocs

- `.storybook/main.ts`: `framework: @storybook/react-vite`, `docs: { autodocs: 'tag' }`.
- Every component ships a `.stories.tsx` with `tags: ['autodocs']` → prop tables +
  types + usage auto-generate on `npm run storybook` (the "Scalar for components").

### Jest

- `jest.config.ts`: `preset: ts-jest` (or `@swc/jest`), `testEnvironment: jsdom`,
  `moduleNameMapper` for `@/` aliases + CSS, `setupFilesAfterEnv: [jest.setup.ts]`.
- `test-utils.tsx`: `render` wrapper providing Router + QueryClient + providers.
- Sample `.test.tsx` per atom/molecule to lock the pattern.

---

## Implementation Phases (ordered)

1. **Init** — `npm create vite@latest . -- --template react-ts`; install all deps; set path alias `@/*`.
2. **Tailwind v4** — add `@tailwindcss/vite`, `@import "tailwindcss"`, `@theme` tokens in `index.css`.
3. **Quality** — ESLint + Prettier configs.
4. **Foundation** — `lib/cn.ts`, `config/env.ts`, `types/`, error boundary.
5. **Atoms** — Button, Input, Typography, Badge, Spinner (each: tsx + stories + test).
6. **Molecules** — FormField (RHF), DataTable (react-data-table-component), QueryBuilder.
7. **Organisms** — Navbar, Sidebar, KanbanBoard (@dnd-kit), DataTablePage.
8. **Templates** — DashboardLayout, AuthLayout.
9. **Stores** — authStore, uiStore, socketStore.
10. **API** — client + queryClient + sample queries.
11. **Sockets** — SocketManager + SocketProvider + useSocket.
12. **Routes + Pages** — router, guards/loaders, paths, App, sample pages.
13. **Storybook** — config + autodocs verification.
14. **Jest** — config + setup + sample tests.
15. **Docs** — README with scripts + architecture overview.

---

## Verification

- `npm run dev` → app boots, dashboard + login + kanban render.
- `npm run build` → TypeScript typechecks and Vite builds with no errors.
- `npm run test` → Jest suite passes (atoms/molecules).
- `npm run storybook` → component docs auto-generate (autodocs) per component.
- `npm run lint` → ESLint clean.

## Open notes / assumptions

- Tailwind **v4** chosen for "latest"; if team prefers v3 config style, swap to `tailwindcss@3` + `tailwind.config.ts` + postcss.
- `@dnd-kit` used in place of legacy `react-dnd` (modern, maintained, React 19 compatible).
- Zod added alongside RHF for schema validation (industrial-grade, TS-native) — flag if unwanted.
- Package manager: npm (default). Swap to pnpm if preferred.
- Sample data mocked initially; swap `api/client.ts` baseURL to the Express BE when ready.
  .ts` baseURL to the Express BE when ready.
