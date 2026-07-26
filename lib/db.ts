import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var pgPool: Pool | undefined;
}

// Prevents creating a new pool on every hot-reload in dev
export const pool =
  global.pgPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL, // e.g. postgres://user:pass@host:5432/dbname
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    max: 10,
  });

if (process.env.NODE_ENV !== "production") {
  global.pgPool = pool;
}