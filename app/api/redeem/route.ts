import { NextRequest, NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';
import { nanoid } from 'nanoid';

export const dynamic = 'force-static';
export const revalidate = false;

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const qr_code = formData.get('qr_code') as string;
  const merchant_id = formData.get('merchant_id') as string;

  if (!qr_code || !merchant_id) {
    return new NextResponse(
      `<html><body><script>alert('Missing required fields'); window.history.back();</script></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  const db = await getDb();

  const gift = db.gifts.find(g => g.qr_code === qr_code);

  if (!gift) {
    return new NextResponse(
      `<html><body><script>alert('Gift not found. Please check the code and try again.'); window.history.back();</script></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  const item = db.items.find(i => i.id === gift.item_id);

  if (!item) {
    return new NextResponse(
      `<html><body><script>alert('Gift item not found.'); window.history.back();</script></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  if (item.merchant_id !== merchant_id) {
    return new NextResponse(
      `<html><body><script>alert('This gift is not valid at this merchant.'); window.history.back();</script></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  if (gift.is_redeemed) {
    return new NextResponse(
      `<html><body><script>alert('This gift has already been redeemed on ${gift.redeemed_at ? new Date(gift.redeemed_at).toLocaleString() : 'unknown date'}.'); window.history.back();</script></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  const redemption_id = nanoid(10);
  const now = new Date().toISOString();

  gift.is_redeemed = true;
  gift.redeemed_at = now;

  db.redemptions.push({
    id: redemption_id,
    gift_id: gift.id,
    merchant_id,
    redeemed_item_id: gift.item_id,
    top_up_cents: 0,
    redeemed_at: now
  });

  await saveDb(db);

  return new NextResponse(
    `<html>
      <head>
        <style>
          body { font-family: system-ui; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: linear-gradient(135deg, #fce7f3 0%, #f3e8ff 50%, #dbeafe 100%); }
          .success { background: white; padding: 3rem; border-radius: 1.5rem; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); text-align: center; max-width: 500px; }
          h1 { color: #16a34a; margin-bottom: 1rem; }
          .item { font-size: 1.5rem; font-weight: bold; color: #7c3aed; margin: 1rem 0; }
          .btn { display: inline-block; margin-top: 2rem; padding: 1rem 2rem; background: linear-gradient(to right, #7c3aed, #ec4899); color: white; text-decoration: none; border-radius: 9999px; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="success">
          <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
          <h1>Gift Redeemed Successfully!</h1>
          <p class="item">${item.name}</p>
          <p style="color: #6b7280;">Value: $${(gift.value_cents / 100).toFixed(2)}</p>
          <a href="/merchant/${merchant_id}" class="btn">Scan Another Gift</a>
        </div>
      </body>
    </html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}
