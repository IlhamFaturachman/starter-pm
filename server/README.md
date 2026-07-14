# PM Backend (Server) — WIP

This folder is the **backend** for the project-management app. The frontend lives in
[`../client`](../client) and already expects this server to exist. Keep the contract
below in sync with the client — that is what keeps the two halves working together.

## Expected runtime

- HTTP API + Socket.IO on **port 3000**.
- CORS must allow the client dev server (`http://localhost:5173`).
- Read the JWT from `Authorization: Bearer <token>` on protected routes.

## Required HTTP endpoints

The client's axios instance (`client/src/api/client.ts`) posts to `config.apiUrl`,
which defaults to `http://localhost:3000/api`.

| Method | Path            | Request body                                      | Success response                          |
| ------ | --------------- | ------------------------------------------------- | ----------------------------------------- |
| POST   | `/api/auth/login`     | `{ email, password }`                       | `{ token, user }` — `user` is `User`      |
| POST   | `/api/auth/signup`    | `{ name, email, password, confirmPassword }` | `{ token, user }` — auto-login (client redirects straight to dashboard) |
| POST   | `/api/auth/forgot`    | `{ email }`                                 | `{ ok: true }`                            |
| POST   | `/api/auth/verify-otp`| `{ email, code }`  (forgot-only, no `mode` field) | `{ ok: true }` — client then redirects to login |
| GET    | `/api/projects`       | — (auth)                                    | `Project[]`                               |
| POST   | `/api/projects`       | `Project` (minus `id`/`createdAt`)          | `Project`                                 |
| GET    | `/api/projects/:projectId/tasks` | — (auth)                        | `Task[]`                                  |
| PATCH  | `/api/tasks/:id`      | `{ status?, order?, ... }`                  | `Task`                                    |

## Required Socket.IO events

Client connects via `client/src/sockets/SocketManager.ts` (`transports: ['websocket']`),
passing `auth: { token }`.

**Server → Client** (`ServerToClientEvents`)
- `project:created`, `project:updated`
- `task:created`, `task:updated`, `task:moved`

**Client → Server** (`ClientToServerEvents`)
- `project:subscribe`, `project:unsubscribe`, `ping`

## Domain types (mirror `client/src/types/api.ts`)

```ts
type User = { id: string; email: string; name: string; role: 'admin' | 'member' };
type AuthResponse = { token: string; user: User };
type Project = { id: string; name: string; description: string; status: 'active' | 'archived'; ownerId: string; createdAt: string };
type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';
type Task = { id: string; title: string; description: string; status: TaskStatus; projectId: string; assigneeId: string | null; priority: 'low' | 'medium' | 'high'; order: number };
```

## Wiring notes for the client

- In dev the client installs a **mock API** (`client/src/api/mock.ts`) so it runs standalone.
  To use this real server instead, run the client against a real `VITE_API_URL` /
  `VITE_SOCKET_URL` (or remove `installMockApi()` in `client/src/main.tsx`).
- All validation lives here on the BE. The client's React Hook Form only manages form
  state and maps BE field errors back via `setError()`.
