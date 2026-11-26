import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config";
import { errorHandler, notFound } from "./middleware/error";
import { healthRouter, type HealthDeps } from "./routes/health";

/** External dependencies are injected so tests can replace them. */
export type AppDeps = HealthDeps;

/**
 * Builds the Express app without starting a server,
 * so tests can call it directly with Supertest.
 */
export function createApp(deps: AppDeps): Express {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: config.CORS_ORIGIN }));
  app.use(express.json({ limit: "100kb" }));

  app.use("/api/health", healthRouter(deps));

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
