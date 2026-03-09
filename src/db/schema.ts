// Mock SQLite for web build if needed
let db: any = null;

export const initDatabase = async () => {
  if (typeof window !== 'undefined' && (window as any).expo) {
    const SQLite = await import('expo-sqlite');
    db = SQLite.openDatabaseSync('gardengrid.db');
    
    await db.execAsync(`
      PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, name TEXT, avatarUrl TEXT);
      CREATE TABLE IF NOT EXISTS gardens (id TEXT PRIMARY KEY, userId TEXT NOT NULL, name TEXT NOT NULL, width REAL NOT NULL, height REAL NOT NULL, unit TEXT NOT NULL, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP);
      CREATE TABLE IF NOT EXISTS fields (id TEXT PRIMARY KEY, gardenId TEXT NOT NULL, name TEXT NOT NULL, type TEXT NOT NULL, width REAL NOT NULL, height REAL NOT NULL, x REAL NOT NULL, y REAL NOT NULL, notes TEXT);
      CREATE TABLE IF NOT EXISTS rows (id TEXT PRIMARY KEY, fieldId TEXT NOT NULL, name TEXT NOT NULL, orientation TEXT, length REAL NOT NULL, width REAL NOT NULL, notes TEXT);
      CREATE TABLE IF NOT EXISTS structures (id TEXT PRIMARY KEY, gardenId TEXT NOT NULL, name TEXT NOT NULL, type TEXT NOT NULL, width REAL NOT NULL, height REAL NOT NULL, x REAL NOT NULL, y REAL NOT NULL, notes TEXT, status TEXT DEFAULT 'active');
      CREATE TABLE IF NOT EXISTS plants (id TEXT PRIMARY KEY, gardenId TEXT NOT NULL, fieldId TEXT, rowId TEXT, structureId TEXT, name TEXT NOT NULL, category TEXT, variety TEXT, sowingDate TEXT, plantingDate TEXT, harvestDate TEXT, quantity INTEGER DEFAULT 1, notes TEXT);
      CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY, userId TEXT NOT NULL, title TEXT NOT NULL, type TEXT NOT NULL, date TEXT NOT NULL, status TEXT DEFAULT 'pending', linkedEntityId TEXT, linkedEntityType TEXT, notes TEXT);
    `);
  } else {
    console.log('Running in web mode without SQLite');
  }
};

export { db };
