import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

const timestamps = {
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  deletedAt: text('deleted_at'),
};

const syncFields = {
  syncStatus: text('sync_status').notNull().default('local'),
  version: integer('version').notNull().default(1),
};

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  photoUrl: text('photo_url'),
  locale: text('locale'),
  lastLogin: text('last_login'),
  ...timestamps,
  ...syncFields,
});

export const gardens = sqliteTable('gardens', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  name: text('name').notNull(),
  width: real('width').notNull(),
  height: real('height').notNull(),
  unit: text('unit').notNull(),
  notes: text('notes'),
  ...timestamps,
  ...syncFields,
});

export const fields = sqliteTable('fields', {
  id: text('id').primaryKey(),
  gardenId: text('garden_id').notNull(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  width: real('width').notNull(),
  height: real('height').notNull(),
  x: real('x').notNull(),
  y: real('y').notNull(),
  orientation: real('orientation'),
  notes: text('notes'),
  ...timestamps,
  ...syncFields,
});

export const rows = sqliteTable('rows', {
  id: text('id').primaryKey(),
  fieldId: text('field_id').notNull(),
  name: text('name').notNull(),
  length: real('length').notNull(),
  width: real('width').notNull(),
  orientation: real('orientation'),
  x: real('x').notNull(),
  y: real('y').notNull(),
  notes: text('notes'),
  ...timestamps,
  ...syncFields,
});

export const plants = sqliteTable('plants', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category'),
  variety: text('variety'),
  sowingDate: text('sowing_date'),
  plantingDate: text('planting_date'),
  harvestDate: text('harvest_date'),
  quantity: integer('quantity'),
  spacingCm: real('spacing_cm'),
  companionNotes: text('companion_notes'),
  notes: text('notes'),
  ...timestamps,
  ...syncFields,
});

export const plantPlacements = sqliteTable('plant_placements', {
  id: text('id').primaryKey(),
  plantId: text('plant_id').notNull(),
  gardenId: text('garden_id').notNull(),
  fieldId: text('field_id'),
  rowId: text('row_id'),
  structureId: text('structure_id'),
  x: real('x'),
  y: real('y'),
  quantity: integer('quantity'),
  ...timestamps,
  ...syncFields,
});

export const structures = sqliteTable('structures', {
  id: text('id').primaryKey(),
  gardenId: text('garden_id').notNull(),
  type: text('type').notNull(),
  name: text('name').notNull(),
  width: real('width').notNull(),
  height: real('height').notNull(),
  x: real('x').notNull(),
  y: real('y').notNull(),
  status: text('status'),
  notes: text('notes'),
  ...timestamps,
  ...syncFields,
});

export const waterPoints = sqliteTable('water_points', {
  id: text('id').primaryKey(),
  gardenId: text('garden_id').notNull(),
  type: text('type').notNull(),
  name: text('name').notNull(),
  x: real('x').notNull(),
  y: real('y').notNull(),
  coverageRadius: real('coverage_radius'),
  notes: text('notes'),
  ...timestamps,
  ...syncFields,
});

export const feedingPoints = sqliteTable('feeding_points', {
  id: text('id').primaryKey(),
  gardenId: text('garden_id').notNull(),
  name: text('name').notNull(),
  x: real('x').notNull(),
  y: real('y').notNull(),
  notes: text('notes'),
  ...timestamps,
  ...syncFields,
});

export const compostZones = sqliteTable('compost_zones', {
  id: text('id').primaryKey(),
  gardenId: text('garden_id').notNull(),
  name: text('name').notNull(),
  width: real('width').notNull(),
  height: real('height').notNull(),
  x: real('x').notNull(),
  y: real('y').notNull(),
  notes: text('notes'),
  ...timestamps,
  ...syncFields,
});

export const animalZones = sqliteTable('animal_zones', {
  id: text('id').primaryKey(),
  gardenId: text('garden_id').notNull(),
  type: text('type').notNull(),
  name: text('name').notNull(),
  width: real('width').notNull(),
  height: real('height').notNull(),
  x: real('x').notNull(),
  y: real('y').notNull(),
  notes: text('notes'),
  feedNotes: text('feed_notes'),
  waterNotes: text('water_notes'),
  ...timestamps,
  ...syncFields,
});

export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  type: text('type').notNull(),
  dueDate: text('due_date').notNull(),
  status: text('status').notNull(),
  notes: text('notes'),
  linkedType: text('linked_type'),
  linkedId: text('linked_id'),
  ...timestamps,
  ...syncFields,
});

export const settings = sqliteTable('settings', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  language: text('language').notNull(),
  unitSystem: text('unit_system').notNull(),
  ...timestamps,
  ...syncFields,
});

export const outbox = sqliteTable('outbox', {
  id: text('id').primaryKey(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id').notNull(),
  operation: text('operation').notNull(),
  payload: text('payload').notNull(),
  createdAt: text('created_at').notNull(),
});
