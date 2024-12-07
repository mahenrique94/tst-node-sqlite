import { FastifyInstance } from "fastify";

import { middleware } from "../middlewares/auth";

export const register = async (server: FastifyInstance) => {
  server.get("/api/greeting", { onRequest: middleware }, async (_, reply) => {
    return reply.send({ message: "Welcome back" });
  });
};
