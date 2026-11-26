# ApplyTrack Roadmap

Goal: a production-style full-stack app, finished and deployed before the internship starts (early February 2027).
Every item below is sized to be one or two focused commits.

## Phase 0 — Foundation (26 Nov 2026) ✅

- [x] Monorepo layout, README, license, editor config
- [x] Express 5 + TypeScript API skeleton with config validation (Zod)
- [x] Health (liveness) and readiness endpoints
- [x] PostgreSQL schema with Prisma (users, applications, status history)
- [x] Docker Compose for local PostgreSQL
- [x] Automated tests (Vitest + Supertest)
- [x] GitHub Actions CI (typecheck, test, build, Docker image build)
- [x] Multi-stage Dockerfile for the API

## Phase 1 — Backend core (27 Nov – 6 Dec)

- [ ] Initial database migration + seed script with demo data
- [ ] Auth: register, login, `GET /me` (bcrypt + JWT), auth middleware
- [ ] Applications CRUD (`/api/applications`) with Zod validation
- [ ] Ownership checks (users only see their own applications)
- [ ] Filtering by status, search by company/position, sorting, pagination
- [ ] Status change endpoint that records history (timeline)
- [ ] Stats endpoint: totals per stage, response rate, upcoming deadlines
- [ ] Integration tests against a real PostgreSQL service in CI
- [ ] OpenAPI (Swagger) documentation at `/api/docs`
- [ ] Rate limiting and structured logging (pino)

## Phase 2 — Frontend (7 – 20 Dec)

- [ ] React + Vite + TypeScript + Tailwind CSS app in `apps/web`
- [ ] Routing, layout, dark/light theme
- [ ] Login & register pages, protected routes
- [ ] Applications table with filters and search
- [ ] Add / edit application form with validation
- [ ] Kanban board with drag & drop between stages (dnd-kit)
- [ ] Dashboard: stage funnel, weekly activity chart, deadline list
- [ ] Application detail page with status timeline
- [ ] Responsive / mobile layout, loading and empty states

## Phase 3 — DevOps (21 Dec – 3 Jan)

- [ ] Frontend Dockerfile (Nginx) and full-stack Docker Compose
- [ ] Push images to GitHub Container Registry from CI
- [ ] Deploy (API + database + web) with automatic deploy on `main`
- [ ] Prometheus metrics endpoint + Grafana dashboard
- [ ] Kubernetes manifests (Deployment, Service, Ingress, Secret) tested on kind
- [ ] Database migration job in the deploy pipeline

## Phase 4 — Polish (4 – 25 Jan)

- [ ] End-to-end tests with Playwright
- [ ] Demo account and live demo link in README
- [ ] Screenshots / GIF and architecture diagram in README
- [ ] CSV export of applications
- [ ] Final review: security headers, error handling, accessibility
