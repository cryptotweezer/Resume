import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

async function main() {
  console.log('Testing database connection...');
  
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('Error: DATABASE_URL is not defined in environment variables.');
    return;
  }

  console.log('DATABASE_URL is defined.');
  // Masking the URL for safety in logs
  const maskedUrl = connectionString.replace(/:([^@]+)@/, ':****@');
  console.log(`Connection string: ${maskedUrl}`);

  try {
    const sql = neon(connectionString);
    const db = drizzle(sql);
    
    console.log('Attempting to query database...');
    const start = Date.now();
    const result = await sql`SELECT 1 as result`;
    const duration = Date.now() - start;
    
    console.log(`Success! Query result: ${JSON.stringify(result)}`);
    console.log(`Query took ${duration}ms`);
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

main();
