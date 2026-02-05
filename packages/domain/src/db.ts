import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

/**
 * Configuration de la connexion à la base de données
 */

if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL environment variable is required. Please set it in your .env file.'
  );
}

const client = postgres(process.env.DATABASE_URL);

export const db = drizzle(client, { schema });
