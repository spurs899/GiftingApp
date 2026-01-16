import Link from 'next/link';
import { notFound } from 'next/navigation';
import QRCode from 'qrcode';
import { ShareButtons } from '@/components/ShareButtons';

export async function generateStaticParams() {
  const fs = await import('fs/promises');
  const path = await import('path');
  const dataPath = path.join(process.cwd(), 'public', 'static-data.json');
  
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    const db = JSON.parse(data);
    return db.gifts.map((gift: any) => ({
      id: gift.id,
    }));
  } catch {
    return [];
  }
}

async function loadStaticData() {
  const fs = await import('fs/promises');
  const path = await import('path');
  const dataPath = path.join(process.cwd(), 'public', 'static-data.json');
  const data = await fs.readFile(dataPath, 'utf-8');
  return JSON.parse(data);
}

export default async function GiftPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await loadStaticData();
  
  const gift = db.gifts.find((g: any) => g.id === id);
  if (!gift) {
    notFound();
  }

  const item = db.items.find((i: any) => i.id === gift.item_id);
  const merchant = db.merchants.find((m: any) => m.id === item?.merchant_id);

  // Generate QR code
  const qrCodeUrl = await QRCode.toDataURL(gift.qr_code, {
    width: 300,
    margin: 2,
    color: {
      dark: '#7c3aed',
      light: '#ffffff'
    }
  });

  const giftData = {
    ...gift,
    item_name: item?.name,
    item_image_url: item?.image_url,
    item_description: item?.description,
    merchant_name: merchant?.name,
    merchant_locations: merchant?.locations,
    qr_url: qrCodeUrl
  };

  const locations = giftData.merchant_locations;

  return (
    <div className="min-h-screen">
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎁 Gifting
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h2 className="text-xl font-bold text-green-900 mb-1">Gift Created!</h2>
          <p className="text-green-700">Share this link with your friend to redeem their treat</p>
        </div>

        {/* Gift Card Preview */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-purple-100 mb-6">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 text-white text-center">
            <div className="text-5xl mb-3">🎁</div>
            <h1 className="text-2xl font-bold mb-2">You received a gift!</h1>
            <p className="text-purple-100">From {giftData.sender_name}</p>
          </div>

          <div className="p-6">
            {giftData.recipient_message && (
              <div className="bg-purple-50 rounded-xl p-4 mb-6">
                <p className="text-gray-700 italic">"{gift.recipient_message}"</p>
              </div>
            )}

            <div className="flex gap-4 mb-6">
              <img
                src={gift.item_image_url}
                alt={gift.item_name}
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">{giftData.item_name}</h3>
                <p className="text-gray-600">{giftData.merchant_name}</p>
                <p className="text-purple-600 font-semibold mt-1">
                  ${(giftData.value_cents / 100).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">📍 Redeem at:</h4>
              <ul className="space-y-1">
                {locations.map((location: string, idx: number) => (
                  <li key={idx} className="text-sm text-gray-600">{location}</li>
                ))}
              </ul>
            </div>

            {/* QR Code */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <p className="text-sm font-medium text-gray-700 mb-3">Show this QR code in-store:</p>
              <img src={giftData.qr_url} alt="QR Code" className="mx-auto w-48 h-48" />
              <p className="text-xs text-gray-500 mt-3">Code: {giftData.qr_code}</p>
            </div>

            {giftData.is_redeemed ? (
              <div className="mt-6 bg-gray-100 rounded-xl p-4 text-center">
                <p className="text-gray-600 font-medium">✓ This gift has been redeemed</p>
              </div>
            ) : null}
          </div>
        </div>

        {/* Share Options */}
        <ShareButtons 
          giftUrl={`https://spurs899.github.io/GiftingApp/gift/${id}`}
          senderName={giftData.sender_name}
        />

        <div className="text-center mt-6">
          <Link href="/" className="text-purple-600 font-medium hover:underline">
            ← Send another gift
          </Link>
        </div>
      </div>
    </div>
  );
}
