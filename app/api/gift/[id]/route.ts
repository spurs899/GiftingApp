import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import QRCode from 'qrcode';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = await getDb();

  const gift = db.gifts.find(g => g.id === id);

  if (!gift) {
    return NextResponse.json({ error: 'Gift not found' }, { status: 404 });
  }

  const item = db.items.find(i => i.id === gift.item_id);
  const merchant = item ? db.merchants.find(m => m.id === item.merchant_id) : null;

  if (!item || !merchant) {
    return NextResponse.json({ error: 'Gift data incomplete' }, { status: 404 });
  }

  const giftData = {
    ...gift,
    item_name: item.name,
    item_image_url: item.image_url,
    item_description: item.description,
    merchant_name: merchant.name,
    merchant_locations: merchant.locations,
    merchant_id: merchant.id
  };

  // Generate QR code as data URL
  const qrUrl = await QRCode.toDataURL(giftData.qr_code, {
    width: 300,
    margin: 2,
    color: {
      dark: '#7c3aed',
      light: '#ffffff'
    }
  });

  return NextResponse.json({
    ...giftData,
    qr_url: qrUrl
  });
}
