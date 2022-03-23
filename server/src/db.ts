import { Pool } from 'pg';
import { migrate } from 'postgres-migrations';

export const db = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
});

migrate({ client: db }, 'src/migrations');
