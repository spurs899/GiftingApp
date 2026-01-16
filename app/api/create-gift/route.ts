import { NextRequest, NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';
import { nanoid } from 'nanoid';

export const dynamic = 'force-static';
export const revalidate = false;

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const item_id = formData.get('item_id') as string;
  const sender_name = formData.get('sender_name') as string;
  const recipient_message = formData.get('recipient_message') as string || null;

  if (!item_id || !sender_name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const db = await getDb();

  const item = db.items.find(i => i.id === item_id);
  if (!item) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  const gift_id = nanoid(10);
  const qr_code = 'GIFT-' + nanoid(12);
  const now = new Date().toISOString();

  db.gifts.push({
    id: gift_id,
    item_id,
    sender_name,
    recipient_message,
    qr_code,
    value_cents: item.value_cents,
    is_redeemed: false,
    redeemed_at: null,
    created_at: now
  });

  await saveDb(db);

  return NextResponse.redirect(new URL(`/gift/${gift_id}`, request.url));
}
