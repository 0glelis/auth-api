import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }

  const pool = new pg.Pool({
    connectionString: `postgres://${dbUser}:${dbPassword}@isabelle.db.elephantsql.com/qsqhodwe`,
  });

  global.connection = pool;
  return pool.connect();
}

export { connect };
