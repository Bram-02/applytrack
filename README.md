# ApplyTrack

> A full-stack job & internship application tracker — built with TypeScript, PostgreSQL, Docker, and a CI/CD pipeline.

ApplyTrack helps job seekers keep every application in one place: which company, which position, current stage (applied → test → interview → offer), deadlines, and notes. It started from a real problem: tracking many internship applications across email, job portals, and spreadsheets.

![status](https://img.shields.io/badge/status-in%20development-orange)
![license](https://img.shields.io/badge/license-MIT-blue)

## Features

**Available now**
- REST API with Express 5 + TypeScript
- Health-check endpoint for monitoring and container orchestration
- PostgreSQL schema (Prisma ORM) for users and applications
- Local database with Docker Compose
- Automated tests (Vitest + Supertest) and GitHub Actions CI

**Planned** — see [docs/ROADMAP.md](docs/ROADMAP.md)
- JWT authentication (register / login)
- Application CRUD with filtering, search, and pagination
- Kanban board (drag & drop between stages)
- Dashboard with statistics and upcoming deadlines
- Containerized deployment, monitoring (Prometheus + Grafana), Kubernetes manifests

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js 22, Express 5, TypeScript, Zod |
| Database | PostgreSQL 16, Prisma ORM |
| Frontend (planned) | React, Vite, Tailwind CSS |
| Testing | Vitest, Supertest |
| DevOps | Docker, Docker Compose, GitHub Actions |

## Project Structure

```
applytrack/
├── apps/
│   └── api/                # REST API (Express + TypeScript)
│       ├── prisma/         # Database schema & migrations
│       ├── src/
│       │   ├── middleware/ # Error handling, 404
│       │   ├── routes/     # Route modules
│       │   ├── app.ts      # Express app (no listen, testable)
│       │   ├── config.ts   # Environment config
│       │   └── server.ts   # Entry point
│       └── tests/
├── docs/
├── docker-compose.yml
└── .github/workflows/      # CI pipeline
```

## Getting Started

### Prerequisites
- Node.js 22+
- Docker & Docker Compose

### Run locally

```bash
# 1. Start PostgreSQL
docker compose up -d db

# 2. Install API dependencies
cd apps/api
cp .env.example .env
npm install

# 3. Apply database migrations
npx prisma migrate dev

# 4. Start the API in watch mode
npm run dev
```

Check that it works:

```bash
curl http://localhost:4000/api/health
```

### Run tests

```bash
cd apps/api
npm test
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Service health status |

## Author

**Bram Modestus Naibaho** — Computer Technology student, Institut Teknologi Del

- LinkedIn: [bram-modestus-naibaho](https://www.linkedin.com/in/bram-modestus-naibaho-95866b387)
- Portfolio: [bram-modestus-naibaho.vercel.app](https://bram-modestus-naibaho.vercel.app)

## License

[MIT](LICENSE)
