import bcrypt from "bcrypt";
import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { z } from "zod";

import { Account } from "../types";
import { config } from "../config";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const register = async (server: FastifyInstance) => {
  server.post<{ Body: z.infer<typeof schema> }>(
    "/api/auth/sign-in",
    async function (request, reply) {
      try {
        await schema.parseAsync(request.body);

        const { email, password } = request.body;

        const [account]: Account[] = (await server.db.exec<Account[]>(
          `SELECT * FROM accounts acc WHERE acc.email = '${email}'`
        )) as Account[];

        if (account && bcrypt.compareSync(password, account.password)) {
          return reply.send({
            token: jwt.sign(
              { id: account.id, email: account.email },
              config.API_SECRET
            ),
          });
        }

        return reply.status(401).send({
          message: "Email or password not found!",
        });
      } catch (err) {
        if (err instanceof z.ZodError) {
          return reply.status(400).send({ errors: err.errors });
        }

        if ("code" in err && err.code === "ERR_SQLITE_ERROR") {
          return reply.status(400).send({ error: err.message });
        }

        return reply.status(500).send({ error: err });
      }
    }
  );

  server.post<{ Body: z.infer<typeof schema> }>(
    "/api/auth/sign-up",
    async function (request, reply) {
      try {
        await schema.parseAsync(request.body);

        const { email, password } = request.body;

        const salt = await bcrypt.genSalt(5);

        await server.db.exec(
          `INSERT INTO accounts (id, email, password, salt) values (?, ?, ?, ?)`,
          [crypto.randomUUID(), email, await bcrypt.hash(password, salt), salt]
        );

        return reply.send({
          message: "Account created with success!",
        });
      } catch (err) {
        if (err instanceof z.ZodError) {
          return reply.status(400).send({ errors: err.errors });
        }

        if ("code" in err && err.code === "ERR_SQLITE_ERROR") {
          return reply.status(400).send({ error: err.message });
        }

        return reply.status(500).send({ error: err });
      }
    }
  );
};
