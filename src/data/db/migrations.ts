import { SQLiteDatabase } from 'expo-sqlite';

const migrations: string[] = [
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY NOT NULL,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    photo_url TEXT,
    locale TEXT,
    last_login TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT,
    sync_status TEXT NOT NULL DEFAULT 'local',
    version INTEGER NOT NULL DEFAULT 1
  );`,
  `CREATE TABLE IF NOT EXISTS gardens (
    id TEXT PRIMARY KEY NOT NULL,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    width REAL NOT NULL,
    height REAL NOT NULL,
    unit TEXT NOT NULL,
    notes TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT,
    sync_status TEXT NOT NULL DEFAULT 'local',
    version INTEGER NOT NULL DEFAULT 1
  );`,
  `CREATE TABLE IF NOT EXISTS fields (
    id TEXT PRIMARY KEY NOT NULL,
    garden_id TEXT NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    width REAL NOT NULL,
    height REAL NOT NULL,
    x REAL NOT NULL,
    y REAL NOT NULL,
    orientation REAL,
    notes TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT,
    sync_status TEXT NOT NULL DEFAULT 'local',
    version INTEGER NOT NULL DEFAULT 1
  );`,
  `CREATE TABLE IF NOT EXISTS rows (
    id TEXT PRIMARY KEY NOT NULL,
    field_id TEXT NOT NULL,
    name TEXT NOT NULL,
    length REAL NOT NULL,
    width REAL NOT NULL,
    orientation REAL,
    x REAL NOT NULL,
    y REAL NOT NULL,
    notes TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT,
    sync_status TEXT NOT NULL DEFAULT 'local',
    version INTEGER NOT NULL DEFAULT 1
  );`,
  `CREATE TABLE IF NOT EXISTS plants (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    category TEXT,
    variety TEXT,
    sowing_date TEXT,
    planting_date TEXT,
    harvest_date TEXT,
    quantity INTEGER,
    spacing_cm REAL,
    companion_notes TEXT,
    notes TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT,
    sync_status TEXT NOT NULL DEFAULT 'local',
    version INTEGER NOT NULL DEFAULT 1
  );`,
  `CREATE TABLE IF NOT EXISTS plant_placements (
    id TEXT PRIMARY KEY NOT NULL,
    plant_id TEXT NOT NULL,
    garden_id TEXT NOT NULL,
    field_id TEXT,
    row_id TEXT,
    structure_id TEXT,
    x REAL,
    y REAL,
    quantity INTEGER,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT,
    sync_status TEXT NOT NULL DEFAULT 'local',
    version INTEGER NOT NULL DEFAULT 1
  );`,
  `CREATE TABLE IF NOT EXISTS structures (
    id TEXT PRIMARY KEY NOT NULL,
    garden_id TEXT NOT NULL,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    width REAL NOT NULL,
    height REAL NOT NULL,
    x REAL NOT NULL,
    y REAL NOT NULL,
    status TEXT,
    notes TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT,
    sync_status TEXT NOT NULL DEFAULT 'local',
    version INTEGER NOT NULL DEFAULT 1
  );`,
  `CREATE TABLE IF NOT EXISTS water_points (
    id TEXT PRIMARY KEY NOT NULL,
    garden_id TEXT NOT NULL,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    x REAL NOT NULL,
    y REAL NOT NULL,
    coverage_radius REAL,
    notes TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT,
    sync_status TEXT NOT NULL DEFAULT 'local',
    version INTEGER NOT NULL DEFAULT 1
  );`,
  `CREATE TABLE IF NOT EXISTS feeding_points (
    id TEXT PRIMARY KEY NOT NULL,
    garden_id TEXT NOT NULL,
    name TEXT NOT NULL,
    x REAL NOT NULL,
    y REAL NOT NULL,
    notes TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT,
    sync_status TEXT NOT NULL DEFAULT 'local',
    version INTEGER NOT NULL DEFAULT 1
  );`,
  `CREATE TABLE IF NOT EXISTS compost_zones (
    id TEXT PRIMARY KEY NOT NULL,
    garden_id TEXT NOT NULL,
    name TEXT NOT NULL,
    width REAL NOT NULL,
    height REAL NOT NULL,
    x REAL NOT NULL,
    y REAL NOT NULL,
    notes TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT,
    sync_status TEXT NOT NULL DEFAULT 'local',
    version INTEGER NOT NULL DEFAULT 1
  );`,
  `CREATE TABLE IF NOT EXISTS animal_zones (
    id TEXT PRIMARY KEY NOT NULL,
    garden_id TEXT NOT NULL,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    width REAL NOT NULL,
    height REAL NOT NULL,
    x REAL NOT NULL,
    y REAL NOT NULL,
    notes TEXT,
    feed_notes TEXT,
    water_notes TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT,
    sync_status TEXT NOT NULL DEFAULT 'local',
    version INTEGER NOT NULL DEFAULT 1
  );`,
  `CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY NOT NULL,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    due_date TEXT NOT NULL,
    status TEXT NOT NULL,
    notes TEXT,
    linked_type TEXT,
    linked_id TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT,
    sync_status TEXT NOT NULL DEFAULT 'local',
    version INTEGER NOT NULL DEFAULT 1
  );`,
  `CREATE TABLE IF NOT EXISTS settings (
    id TEXT PRIMARY KEY NOT NULL,
    user_id TEXT NOT NULL,
    language TEXT NOT NULL,
    unit_system TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT,
    sync_status TEXT NOT NULL DEFAULT 'local',
    version INTEGER NOT NULL DEFAULT 1
  );`,
  `CREATE TABLE IF NOT EXISTS outbox (
    id TEXT PRIMARY KEY NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    operation TEXT NOT NULL,
    payload TEXT NOT NULL,
    created_at TEXT NOT NULL
  );`,
];

export const runMigrations = async (db: SQLiteDatabase) => {
  await db.execAsync('PRAGMA journal_mode = WAL;');
  for (const statement of migrations) {
    await db.execAsync(statement);
  }

  const userColumns = await db.getAllAsync<{ name: string }>("PRAGMA table_info('users');");
  const hasPasswordColumn = userColumns.some((column) => column.name === 'password');

  if (!hasPasswordColumn) {
    await db.execAsync("ALTER TABLE users ADD COLUMN password TEXT NOT NULL DEFAULT '';");
  }
};
