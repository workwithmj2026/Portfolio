# Portfolio — Vike & React Recreation

## Status: Verified ✅

```
Lint:  ✅ 0 errors, 55 files checked
Build: ✅ Client (935 modules) + SSR (36 modules)
Git:   ✅ Remote: origin → https://github.com/workwithmj2026/Portfolio.git
```

## What's Implemented

- **Pages** (5): Home, Work, Services, About Me, Contact — Framer Motion animations, responsive
- **Components**: CustomCursor (spring physics), Layout (navbar, drawer, footer with social)
- **Design System**: TailwindCSS theme matching `design.json` (colors, fonts, spacing, transitions)
- **Server**: Hono + Vike SSR, Telefunc RPC, Auth.js, Drizzle DB middleware
- **Docker**: Multi-stage Dockerfile (Node 22 build → Deno 2 alpine runtime) + docker-compose (PostgreSQL 17)
- **Deno**: `deno.json` with tasks, compiler options, import alias, lock file
- **Git Hooks**: `.git/hooks/pre-commit` — runs `biome check --write` on commit
- **Lint/Format**: Biome configured with React/JSX/a11y rules, zero errors
- **License**: Proprietary (JKAY Mines and Minerals Pvt. Ltd.)
- **Database**: Drizzle schema (structure-provisioning only, mocked for SSG)

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server (Vike + Hono) |
| `npm run build` | Production build (client + SSR) |
| `npm run preview` | Build + preview |
| `npm run lint` | Biome lint (zero errors) |
| `npm run format` | Biome format |
| `docker compose build` | Docker image build |
| `docker compose up` | Run app + PostgreSQL |

## Requirements

- `NODE_ENV=development` for `npm install` (devDependencies needed)
- Node 22+ for build, Deno 2+ for Docker runtime
