import Database from 'better-sqlite3';
import path from 'path';

// Create database connection
const dbPath = path.join(process.cwd(), 'database.sqlite');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database schema
const initDb = () => {
  // Create services table
  db.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create features table
  db.exec(`
    CREATE TABLE IF NOT EXISTS features (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      service_id INTEGER NOT NULL,
      feature_name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
      UNIQUE(service_id, feature_name)
    )
  `);

  // Create service_plans table
  db.exec(`
    CREATE TABLE IF NOT EXISTS service_plans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      service_id INTEGER NOT NULL,
      plan_name TEXT NOT NULL,
      plan_description TEXT NOT NULL,
      plan_price REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
      UNIQUE(service_id, plan_name)
    )
  `);

  // Create service_plan_features table
  db.exec(`
    CREATE TABLE IF NOT EXISTS service_plan_features (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      service_plan_id INTEGER NOT NULL,
      feature_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (service_plan_id) REFERENCES service_plans(id) ON DELETE CASCADE,
      FOREIGN KEY (feature_id) REFERENCES features(id) ON DELETE CASCADE,
      UNIQUE(service_plan_id, feature_id)
    )
  `);

  // Create indexes for better performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_features_service_id ON features(service_id);
    CREATE INDEX IF NOT EXISTS idx_service_plans_service_id ON service_plans(service_id);
    CREATE INDEX IF NOT EXISTS idx_service_plan_features_plan_id ON service_plan_features(service_plan_id);
    CREATE INDEX IF NOT EXISTS idx_service_plan_features_feature_id ON service_plan_features(feature_id);
  `);
};

// Initialize the database
initDb();

export default db;