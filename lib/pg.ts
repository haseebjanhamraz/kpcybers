// pg.ts
// Connection String: postgresql://postgres:root@localhost:5432/kpcybers

import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});
export default pool;
