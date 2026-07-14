# Starter PM-FE

Industrial-grade React frontend for a project-management app. Wired to talk to a separate
Express.js backend (validation lives on the BE only — no double validation on the FE).

## Stack

- **React 19** + **Vite 6** + **TypeScript** (strict)
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **react-router 8.2.0** (loaders as middleware, `createBrowserRouter`)
- **Zustand** (client/UI state) · **TanStack Query v5** (server state)
- **react-data-table-component 8.x** (tabulation)
- **@dnd-kit** (Kanban) · **react-querybuilder** (filter UI)
- **React Hook Form** (form state — validation is BE-only)
- **Socket.IO Client** behind a clean `SocketManager` interface
- **Storybook 8 Autodocs** (the "Swagger/Scalar for components")
- **Jest** + **Testing Library** + **ESLint** + **Prettier**
- **Atomic Design** (atoms / molecules / organisms / templates)

## Scripts

```bash
npm run dev            # Vite dev server on :5173
npm run build          # typecheck + production build
npm run preview        # preview the prod build
npm run lint           # ESLint
npm run format         # Prettier
npm run test           # Jest
npm run storybook      # Storybook on :6006
npm run build-storybook
```

## Environment

Create a `.env.local` for backend wiring (defaults already work for `localhost`):

```
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

## Architecture (Atomic Design)

```
src/
├── components/
│   ├── atoms/         # Button, Input, Typography, Badge, Spinner
│   ├── molecules/     # FormField, DataTable, QueryBuilder, Card
│   ├── organisms/     # Navbar, Sidebar, KanbanBoard, DataTablePage
│   └── templates/     # DashboardLayout, AuthLayout
├── pages/             # Login, Dashboard, Projects, Kanban, TableDemo
├── routes/            # router, guards (loaders), paths
├── store/             # auth, ui, socket (Zustand)
├── api/               # axios client + TanStack Query hooks
├── sockets/           # SocketManager + SocketProvider + useSocket
├── hooks/             # cross-cutting hooks
├── lib/               # cn(), utils
├── types/             # shared domain types
├── config/            # env
└── test/              # jest setup, test-utils
```

Each component ships as a co-located trio: `Component.tsx`, `Component.test.tsx`,
`Component.stories.tsx`. The story has `tags: ['autodocs']` so Storybook auto-generates
a docs page with the prop table and types — no manual docs writing.

## State split

- **Server state** (data from Express BE) → TanStack Query
- **Client/UI state** (token, theme, sidebar, toasts) → Zustand
- **Realtime** (sockets) → typed `SocketManager` + `useSocket` hook

## Validation

All validation lives on the Express BE. React Hook Form handles form state only;
BE field errors are mapped into RHF via `setError()`.

## License

Internal.
