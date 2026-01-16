import { promises as fs } from 'fs';
import path from 'path';

export interface Merchant {
  id: string;
  name: string;
  category: string;
  locations: string[];
  image_url: string;
  created_at: string;
}

export interface Item {
  id: string;
  merchant_id: string;
  name: string;
  description: string | null;
  value_cents: number;
  image_url: string;
  category: string;
  created_at: string;
}

export interface Gift {
  id: string;
  item_id: string;
  sender_name: string;
  recipient_message: string | null;
  qr_code: string;
  value_cents: number;
  is_redeemed: boolean;
  redeemed_at: string | null;
  created_at: string;
}

export interface Redemption {
  id: string;
  gift_id: string;
  merchant_id: string;
  redeemed_item_id: string | null;
  top_up_cents: number;
  redeemed_at: string;
}

export interface Database {
  merchants: Merchant[];
  items: Item[];
  gifts: Gift[];
  redemptions: Redemption[];
}

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

let cachedDb: Database | null = null;

async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

export async function getDb(): Promise<Database> {
  if (cachedDb) return cachedDb;

  await ensureDataDir();

  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    cachedDb = JSON.parse(data);
    return cachedDb!;
  } catch {
    const emptyDb: Database = {
      merchants: [],
      items: [],
      gifts: [],
      redemptions: []
    };
    await saveDb(emptyDb);
    cachedDb = emptyDb;
    return emptyDb;
  }
}

export async function saveDb(db: Database): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
  cachedDb = db;
}
