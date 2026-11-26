import { createApp } from "./app";
import { config } from "./config";

const app = createApp();

const server = app.listen(config.PORT, () => {
  console.log(`ApplyTrack API listening on http://localhost:${config.PORT} (${config.NODE_ENV})`);
});

function shutdown(signal: string) {
  console.log(`${signal} received, shutting down gracefully...`);
  server.close(() => process.exit(0));
  // Force exit if connections do not close in time
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
