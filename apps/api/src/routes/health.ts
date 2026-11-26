import { Router } from "express";

export function healthRouter(): Router {
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

  return router;
}
