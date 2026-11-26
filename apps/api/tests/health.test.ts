import request from "supertest";
import { describe, expect, it } from "vitest";
import { buildTestApp } from "./helpers";

describe("GET /api/health", () => {
  it("returns 200 with service status", async () => {
    const res = await request(buildTestApp()).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: "ok", service: "applytrack-api" });
    expect(typeof res.body.uptime).toBe("number");
    expect(new Date(res.body.timestamp).toString()).not.toBe("Invalid Date");
  });

  it("sets security headers", async () => {
    const res = await request(buildTestApp()).get("/api/health");

    expect(res.headers["x-content-type-options"]).toBe("nosniff");
    expect(res.headers["x-powered-by"]).toBeUndefined();
  });
});

describe("GET /api/health/ready", () => {
  it("returns 200 when the database is reachable", async () => {
    const res = await request(buildTestApp()).get("/api/health/ready");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ready", checks: { database: "up" } });
  });

  it("returns 503 when the database is down", async () => {
    const app = buildTestApp({
      checkDatabase: async () => {
        throw new Error("connection refused");
      },
    });

    const res = await request(app).get("/api/health/ready");

    expect(res.status).toBe(503);
    expect(res.body).toEqual({ status: "not_ready", checks: { database: "down" } });
  });
});
