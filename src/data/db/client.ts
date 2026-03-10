import { openDatabaseSync } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';

import * as schema from './schema';

const sqlite = openDatabaseSync('gardengrid.db');

export const db = drizzle(sqlite, { schema });
export const rawDb = sqlite;
