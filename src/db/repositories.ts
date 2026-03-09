import { db } from './schema';
import { Garden, Field, Row, Plant, Structure, Task } from '@/types';

export const gardenRepository = {
  getGardens: async (userId: string): Promise<Garden[]> => {
    return await db.getAllAsync<Garden>('SELECT * FROM gardens WHERE userId = ? ORDER BY createdAt DESC', [userId]);
  },
  
  createGarden: async (garden: Omit<Garden, 'createdAt'>): Promise<void> => {
    await db.runAsync(
      'INSERT INTO gardens (id, userId, name, width, height, unit) VALUES (?, ?, ?, ?, ?, ?)',
      [garden.id, garden.userId, garden.name, garden.width, garden.height, garden.unit]
    );
  },

  getGardenById: async (id: string): Promise<Garden | null> => {
    return await db.getFirstAsync<Garden>('SELECT * FROM gardens WHERE id = ?', [id]);
  },

  deleteGarden: async (id: string): Promise<void> => {
    await db.runAsync('DELETE FROM gardens WHERE id = ?', [id]);
  }
};

export const fieldRepository = {
  getFieldsByGarden: async (gardenId: string): Promise<Field[]> => {
    return await db.getAllAsync<Field>('SELECT * FROM fields WHERE gardenId = ?', [gardenId]);
  },
  
  createField: async (field: Field): Promise<void> => {
    await db.runAsync(
      'INSERT INTO fields (id, gardenId, name, type, width, height, x, y, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [field.id, field.gardenId, field.name, field.type, field.width, field.height, field.x, field.y, field.notes]
    );
  }
};

export const taskRepository = {
  getTasks: async (userId: string): Promise<Task[]> => {
    return await db.getAllAsync<Task>('SELECT * FROM tasks WHERE userId = ? ORDER BY date ASC', [userId]);
  },
  
  createTask: async (task: Task): Promise<void> => {
    await db.runAsync(
      'INSERT INTO tasks (id, userId, title, type, date, status, linkedEntityId, linkedEntityType, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [task.id, task.userId, task.title, task.type, task.date, task.status, task.linkedEntityId, task.linkedEntityType, task.notes]
    );
  }
};
