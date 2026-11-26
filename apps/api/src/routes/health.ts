import { Router } from "express";

export type HealthDeps = {
  /** Resolves when the database answers, rejects otherwise. */
  checkDatabase: () => Promise<void>;
};

export function healthRouter({ checkDatabase }: HealthDeps): Router {
  const router = Router();

  // Liveness: the process is up and able to answer requests.
  router.get("/", (_req, res) => {
    res.json({
      status: "ok",
      service: "applytrack-api",
      uptime: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    });
  });

  // Readiness: dependencies (PostgreSQL) are reachable.
  // Used by Docker / Kubernetes to decide when to send traffic.
  router.get("/ready", async (_req, res) => {
    try {
      await checkDatabase();
      res.json({ status: "ready", checks: { database: "up" } });
    } catch {
      res.status(503).json({ status: "not_ready", checks: { database: "down" } });
    }
  });

  return router;
}
