import 'dotenv/config';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

async function main() {
    console.log('Testing database connection with Pool (WebSockets)...');

    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        console.error('Error: DATABASE_URL is not defined.');
        return;
    }

    try {
        const pool = new Pool({ connectionString });
        const db = drizzle(pool);

        console.log('Attempting to query database...');
        const start = Date.now();
        // Pool query
        const result = await pool.query('SELECT 1 as result');
        const duration = Date.now() - start;

        console.log(`Success! Query result: ${JSON.stringify(result.rows)}`);
        console.log(`Query took ${duration}ms`);

        await pool.end();
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

main();
