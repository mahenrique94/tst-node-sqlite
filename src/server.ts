import fastify from "fastify";

import { register as registerDabasePlugin } from "./plugins/database";

import { register as registerAuthRoutes } from "./routes/auth";
import { register as registerGreetingRoutes } from "./routes/greeting";

export const createServer = async () => {
  const server = fastify({ logger: true });

  // Plugins
  await registerDabasePlugin(server);

  // Routes
  await registerAuthRoutes(server);
  await registerGreetingRoutes(server);

  return server;
};
