import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const config :PoolConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  port: 5432,
  database: process.env.DB_NAME,
};

const pool: Pool = new Pool(config)

export default pool;
