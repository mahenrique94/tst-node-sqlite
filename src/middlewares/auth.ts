import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

import { config } from "../config";

export const middleware = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return reply.status(403).send({ error: "Not allowed!" });
  }

  if (!authorization.startsWith("Bearer ")) {
    return reply.status(403).send({ error: "Not allowed!" });
  }

  try {
    if (!jwt.verify(authorization.split(" ").at(-1), config.API_SECRET)) {
      return reply.status(403).send({ error: "Not allowed!" });
    }
  } catch (err) {
    return reply.status(403).send({ error: "Not allowed!" });
  }
};
