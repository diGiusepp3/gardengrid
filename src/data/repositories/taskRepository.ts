import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { tasks } from '../db/schema';

export const taskRepository = {
  listByUser: async (userId: string) => {
    return db.select().from(tasks).where(eq(tasks.userId, userId));
  },
};
