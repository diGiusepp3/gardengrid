import { sqliteTable, text, real, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name'),
  avatarUrl: text('avatarUrl'),
});

export const gardens = sqliteTable('gardens', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  name: text('name').notNull(),
  width: real('width').notNull(),
  height: real('height').notNull(),
  unit: text('unit').notNull(), // 'meters' | 'feet' | 'centimeters'
  createdAt: text('createdAt').default('CURRENT_TIMESTAMP'),
});

export const fields = sqliteTable('fields', {
  id: text('id').primaryKey(),
  gardenId: text('gardenId').notNull(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  width: real('width').notNull(),
  height: real('height').notNull(),
  x: real('x').notNull(),
  y: real('y').notNull(),
  notes: text('notes'),
});

export const rows = sqliteTable('rows', {
  id: text('id').primaryKey(),
  fieldId: text('fieldId').notNull(),
  name: text('name').notNull(),
  orientation: text('orientation'),
  length: real('length').notNull(),
  width: real('width').notNull(),
  notes: text('notes'),
});

export const structures = sqliteTable('structures', {
  id: text('id').primaryKey(),
  gardenId: text('gardenId').notNull(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  width: real('width').notNull(),
  height: real('height').notNull(),
  x: real('x').notNull(),
  y: real('y').notNull(),
  notes: text('notes'),
  status: text('status').default('active'),
});

export const plants = sqliteTable('plants', {
  id: text('id').primaryKey(),
  gardenId: text('gardenId').notNull(),
  fieldId: text('fieldId'),
  rowId: text('rowId'),
  structureId: text('structureId'),
  name: text('name').notNull(),
  category: text('category'),
  variety: text('variety'),
  sowingDate: text('sowingDate'),
  plantingDate: text('plantingDate'),
  harvestDate: text('harvestDate'),
  quantity: integer('quantity').default(1),
  notes: text('notes'),
});

export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  title: text('title').notNull(),
  type: text('type').notNull(),
  date: text('date').notNull(),
  status: text('status').default('pending'), // 'pending' | 'completed'
  linkedEntityId: text('linkedEntityId'),
  linkedEntityType: text('linkedEntityType'),
  notes: text('notes'),
  reminderAt: text('reminderAt'),
});
