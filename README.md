# PM App — Monorepo

A project-management app split into two sibling packages so the frontend and backend
can live in one repo and stay in sync.

```
.
├── client/   # React 19 + Vite frontend (the existing starter-pm-fe app)
└── server/   # Backend (Express + Socket.IO) — see server/README.md for the contract
```

## Layout

- **`client/`** — the frontend. React 19, Vite 6, TypeScript, Tailwind v4, Zustand,
  TanStack Query, react-router 8.2, react-data-table, @dnd-kit, react-querybuilder,
  React Hook Form, Socket.IO client, Storybook 8, Jest. Its own `README.md` and
  configs (`vite.config.ts`, `jest.config.cjs`, `tsconfig*`, `eslint.config.js`, etc.)
  all live inside `client/` and resolve paths relative to that folder.
- **`server/`** — the backend. Currently empty (just a `.gitkeep` + contract README).
  The frontend already expects an HTTP API + Socket.IO server on **port 3000**; the
  endpoint/event contract is documented in `server/README.md`.

## Running the client

```bash
cd client
npm install
npm run dev          # Vite dev server on :5173 (uses a built-in mock API in dev)
npm run build        # typecheck + production build
npm run test         # Jest
npm run storybook    # Storybook on :6006
```

The client defaults to talking to `http://localhost:3000` (`VITE_API_URL`,
`VITE_SOCKET_URL`). In dev it installs a mock API so it runs without the real server.
Point those env vars at the real `server/` once it exists.

## Keeping the two in sync

- The contract (endpoints, socket events, domain types) is the single source of truth
  in `server/README.md`. Mirror it in both halves.
- Domain types on the client live in `client/src/types/api.ts`.
- All validation belongs on the server; the client only manages form state.
