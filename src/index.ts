import { config } from "./config";
import { createServer } from "./server";

const server = await createServer();

try {
  await server.listen({
    host: config.API_HOST,
    port: config.API_PORT,
  });
} catch (err) {
  console.error(err);
}
