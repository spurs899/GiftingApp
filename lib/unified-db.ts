// Unified database interface that works in both modes
import { Database } from './db';

const isStatic = process.env.GITHUB_PAGES === 'true' || typeof window !== 'undefined';

export async function getUnifiedDb(): Promise<Database> {
  if (typeof window !== 'undefined') {
    // Client-side: use static db
    const { getClientDb } = await import('./static-db');
    return getClientDb();
  } else if (isStatic) {
    // Server-side static build
    const fs = await import('fs/promises');
    const path = await import('path');
    const dataPath = path.join(process.cwd(), 'public', 'static-data.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } else {
    // Server-side dynamic (local dev)
    const { getDb } = await import('./db');
    return getDb();
  }
}

export async function saveUnifiedDb(db: Database): Promise<void> {
  if (typeof window !== 'undefined') {
    // Client-side: save to memory
    const { saveStaticDb } = await import('./static-db');
    return saveStaticDb(db);
  } else if (isStatic) {
    // Static mode: no-op (can't save)
    console.log('Static mode: skipping save');
    return;
  } else {
    // Dynamic mode: save to file
    const { saveDb } = await import('./db');
    return saveDb(db);
  }
}
