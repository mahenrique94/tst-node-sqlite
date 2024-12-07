import { z } from "zod";

const envSchema = z.object({
  API_HOST: z.string().optional().default("0.0.0.0"),
  API_PORT: z.number().optional().default(8080),
  API_SECRET: z.string().optional().default("chaves"),
});

export const config = envSchema.parse(process.env);
