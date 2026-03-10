import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { gardens } from '../db/schema';

export const gardenRepository = {
  listByUser: async (userId: string) => {
    return db.select().from(gardens).where(eq(gardens.userId, userId));
  },
  getById: async (id: string) => {
    const result = await db.select().from(gardens).where(eq(gardens.id, id));
    return result[0] ?? null;
  },
};
