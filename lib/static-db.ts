// Client-side database for static/demo mode
import { Database, Item, Merchant, Gift, Redemption } from '@/lib/db';

let staticData: Database | null = null;

export async function getStaticDb(): Promise<Database> {
  if (staticData) return staticData;

  try {
    const response = await fetch('/GiftingApp/static-data.json');
    if (!response.ok) {
      // Fallback for local dev
      const localResponse = await fetch('/static-data.json');
      staticData = await localResponse.json();
    } else {
      staticData = await response.json();
    }
    return staticData!;
  } catch (error) {
    console.error('Failed to load static data:', error);
    // Return empty database as fallback
    return {
      merchants: [],
      items: [],
      gifts: [],
      redemptions: []
    };
  }
}

// In-memory storage for demo mode (changes don't persist)
let memoryDb: Database | null = null;

export async function saveStaticDb(db: Database): Promise<void> {
  memoryDb = db;
  // Changes only persist in memory during the session
  console.log('Demo mode: Changes saved to memory (will reset on page refresh)');
}

export async function getClientDb(): Promise<Database> {
  if (memoryDb) return memoryDb;
  
  const data = await getStaticDb();
  memoryDb = JSON.parse(JSON.stringify(data)); // Deep clone
  return memoryDb as Database;
}
