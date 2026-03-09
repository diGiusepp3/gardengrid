import { db } from './index';
import * as schema from './schema';
import { eq, and, desc } from 'drizzle-orm';
import { Garden, Field, Task } from '@/types';

export const gardenRepository = {
  getGardens: async (userId: string): Promise<Garden[]> => {
    return await db.query.gardens.findMany({
      where: eq(schema.gardens.userId, userId),
      orderBy: [desc(schema.gardens.createdAt)],
    }) as Garden[];
  },
  
  createGarden: async (garden: Omit<Garden, 'createdAt'>): Promise<void> => {
    await db.insert(schema.gardens).values({
      id: garden.id,
      userId: garden.userId,
      name: garden.name,
      width: garden.width,
      height: garden.height,
      unit: garden.unit,
    });
  },

  getGardenById: async (id: string): Promise<Garden | null> => {
    const result = await db.query.gardens.findFirst({
      where: eq(schema.gardens.id, id),
    });
    return (result as Garden) || null;
  },

  deleteGarden: async (id: string): Promise<void> => {
    await db.delete(schema.gardens).where(eq(schema.gardens.id, id));
  }
};

export const fieldRepository = {
  getFieldsByGarden: async (gardenId: string): Promise<Field[]> => {
    return await db.query.fields.findMany({
      where: eq(schema.fields.gardenId, gardenId),
    }) as Field[];
  },
  
  createField: async (field: Field): Promise<void> => {
    await db.insert(schema.fields).values(field);
  }
};

export const taskRepository = {
  getTasks: async (userId: string): Promise<Task[]> => {
    return await db.query.tasks.findMany({
      where: eq(schema.tasks.userId, userId),
      orderBy: [schema.tasks.date],
    }) as Task[];
  },
  
  createTask: async (task: Task): Promise<void> => {
    await db.insert(schema.tasks).values(task);
  },

  updateTask: async (task: Task): Promise<void> => {
    await db.update(schema.tasks)
      .set({
        title: task.title,
        type: task.type,
        date: task.date,
        status: task.status,
        notes: task.notes,
        reminderAt: task.reminderAt,
      })
      .where(eq(schema.tasks.id, task.id));
  }
};
