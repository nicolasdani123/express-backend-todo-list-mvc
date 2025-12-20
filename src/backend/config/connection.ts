import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const getCurrentDate = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT NOW() as date_now");
    return result.rows[0].date_now;
  } catch (error: any) {
    throw new Error("Error ao listar Date.");
  } finally {
    client.release();
  }
};

export default pool;
