const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(process.cwd(), 'vulnerable.db');

let db = null;

export function getDb() {
  if (!db) {
    if (!fs.existsSync(dbPath)) {
      throw new Error('Database not found. Please run: npm run init-db');
    }
    db = new Database(dbPath);
  }
  return db;
}

