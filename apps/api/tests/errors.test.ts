import request from "supertest";
import { describe, expect, it } from "vitest";
import { buildTestApp } from "./helpers";

describe("error handling", () => {
  it("returns 404 JSON for unknown routes", async () => {
    const res = await request(buildTestApp()).get("/api/does-not-exist");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      error: { message: "Route GET /api/does-not-exist not found" },
    });
  });

  it("returns 400 for malformed JSON bodies", async () => {
    const res = await request(buildTestApp())
      .post("/api/health")
      .set("Content-Type", "application/json")
      .send('{"company": "Acme",');

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: { message: "Invalid JSON body" } });
  });

  it("allows the configured CORS origin", async () => {
    const res = await request(buildTestApp())
      .get("/api/health")
      .set("Origin", "http://localhost:5173");

    expect(res.headers["access-control-allow-origin"]).toBe("http://localhost:5173");
  });
});
