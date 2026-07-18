import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb() {
  if (!env.DB) {
    throw new Error(
      "O banco de dados não está disponível neste ambiente. Configure o binding `DB` antes de usar a aplicação."
    );
  }

  return drizzle(env.DB, { schema });
}
