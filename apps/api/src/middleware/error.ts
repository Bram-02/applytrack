import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";
import { config } from "../config";
import { HttpError } from "../utils/http-error";

type ErrorBody = { error: { message: string; details?: unknown } };

function body(message: string, details?: unknown): ErrorBody {
  return details === undefined ? { error: { message } } : { error: { message, details } };
}

export const notFound: RequestHandler = (req, _res, next) => {
  next(new HttpError(404, `Route ${req.method} ${req.originalUrl} not found`));
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json(body("Validation failed", err.flatten().fieldErrors));
    return;
  }

  if (err instanceof HttpError) {
    res.status(err.status).json(body(err.message, err.details));
    return;
  }

  // Malformed JSON body (thrown by express.json())
  if (err?.type === "entity.parse.failed") {
    res.status(400).json(body("Invalid JSON body"));
    return;
  }

  if (err?.type === "entity.too.large") {
    res.status(413).json(body("Request body too large"));
    return;
  }

  console.error(err);
  const message =
    config.NODE_ENV === "production" ? "Internal server error" : String(err?.message ?? err);
  res.status(500).json(body(message));
};
