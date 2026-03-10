import { db } from '../db/client';
import {
  gardens,
  fields,
  plants,
  rows,
  structures,
  tasks,
  users,
} from '../db/schema';
import { makeId } from '../../core/utils/ids';
import { eq } from 'drizzle-orm';

const now = () => new Date().toISOString();
const defaultUserId = 'matthias-gielen';
const defaultUserEmail = 'gielenmatthias68@gmail.com';
const defaultUserPassword = '7824';

const ensureDefaultUser = async () => {
  const timestamp = now();
  const existingUser = await db.select().from(users).where(eq(users.email, defaultUserEmail));

  if (existingUser.length === 0) {
    await db.insert(users).values({
      id: defaultUserId,
      email: defaultUserEmail,
      password: defaultUserPassword,
      name: 'Matthias Gielen',
      lastLogin: null,
      createdAt: timestamp,
      updatedAt: timestamp,
      syncStatus: 'local',
      version: 1,
    });
    return defaultUserId;
  }

  const user = existingUser[0];
  await db
    .update(users)
    .set({
      password: defaultUserPassword,
      name: user.name?.trim() ? user.name : 'Matthias Gielen',
      updatedAt: timestamp,
    })
    .where(eq(users.id, user.id));

  return user.id;
};

export const seedIfEmpty = async () => {
  const userId = await ensureDefaultUser();
  const existing = await db.select().from(gardens);
  if (existing.length > 0) return;

  const gardenId = makeId();
  await db.insert(gardens).values({
    id: gardenId,
    userId,
    name: 'Backyard Kitchen Garden',
    width: 12,
    height: 8,
    unit: 'm',
    notes: 'Sunny southern exposure.',
    createdAt: now(),
    updatedAt: now(),
    syncStatus: 'local',
    version: 1,
  });

  const fieldId = makeId();
  await db.insert(fields).values({
    id: fieldId,
    gardenId,
    name: 'Main Beds',
    type: 'raised',
    width: 8,
    height: 4,
    x: 1,
    y: 1,
    orientation: 0,
    notes: 'Rotations planned in zones.',
    createdAt: now(),
    updatedAt: now(),
    syncStatus: 'local',
    version: 1,
  });

  await db.insert(rows).values({
    id: makeId(),
    fieldId,
    name: 'Row 1',
    length: 8,
    width: 0.6,
    orientation: 0,
    x: 1,
    y: 1.4,
    notes: 'Leafy greens',
    createdAt: now(),
    updatedAt: now(),
    syncStatus: 'local',
    version: 1,
  });

  await db.insert(structures).values({
    id: makeId(),
    gardenId,
    type: 'greenhouse',
    name: 'Glasshouse',
    width: 2.5,
    height: 3.5,
    x: 9,
    y: 1,
    status: 'active',
    notes: 'Tomatoes + peppers.',
    createdAt: now(),
    updatedAt: now(),
    syncStatus: 'local',
    version: 1,
  });

  await db.insert(plants).values({
    id: makeId(),
    name: 'Tomato',
    category: 'Fruit',
    variety: 'Roma',
    sowingDate: '2026-02-15',
    plantingDate: '2026-04-10',
    harvestDate: '2026-07-20',
    quantity: 6,
    spacingCm: 45,
    companionNotes: 'Pairs well with basil.',
    notes: 'Prune weekly.',
    createdAt: now(),
    updatedAt: now(),
    syncStatus: 'local',
    version: 1,
  });

  await db.insert(tasks).values({
    id: makeId(),
    userId,
    title: 'Water greenhouse beds',
    type: 'watering',
    dueDate: '2026-03-10',
    status: 'scheduled',
    notes: 'Morning watering schedule.',
    linkedType: 'structure',
    linkedId: null,
    createdAt: now(),
    updatedAt: now(),
    syncStatus: 'local',
    version: 1,
  });
};
