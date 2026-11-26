import { createApp, type AppDeps } from "../src/app";

/** Creates the app with a healthy fake database unless overridden. */
export function buildTestApp(overrides: Partial<AppDeps> = {}) {
  return createApp({
    checkDatabase: async () => {},
    ...overrides,
  });
}
