import { FastifyInstance } from "fastify";
import { Database, Value } from "../infrastructure/database";
import { StatementResultingChanges } from "node:sqlite";

declare module "fastify" {
  interface FastifyInstance {
    db: {
      exec: <T = unknown>(
        sql: string,
        values?: Value[]
      ) => Promise<StatementResultingChanges | T>;
    };
  }
}

export const register = async (server: FastifyInstance) => {
  const database = new Database();

  await database.connect();
  await database.migrate();

  server.decorate("db", { exec: database.exec.bind(database) });
};
