import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { env } from "@/lib/env";

import * as schema from "./schema";

const sql = env.databaseUrl ? neon(env.databaseUrl) : null;

export const db = sql ? drizzle(sql, { schema }) : null;

export function getDb() {
  if (!db) {
    throw new Error(
      "DATABASE_URL is not configured. Add it before using the Drizzle database layer.",
    );
  }

  return db;
}

export { schema };
