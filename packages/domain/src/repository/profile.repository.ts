import { eq } from 'drizzle-orm';
import { db } from '../db';
import { profiles } from '../schema';

export async function findAll() {
  return db.select().from(profiles);
}

export async function findById(id: string) {
  const results = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, id))
    .limit(1);

  return results[0];
}
