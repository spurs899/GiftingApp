import Link from 'next/link';
import { notFound } from 'next/navigation';
import GiftForm from '@/components/GiftForm';
import ImageWithFallback from '@/components/ImageWithFallback';

async function loadStaticData() {
  const fs = await import('fs/promises');
  const path = await import('path');
  const dataPath = path.join(process.cwd(), 'public', 'static-data.json');
  
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load static data:', error);
    return { items: [], merchants: [], gifts: [] };
  }
}

export async function generateStaticParams() {
  const db = await loadStaticData();
  return db.items.map((item: any) => ({
    id: item.id,
  }));
}

export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await loadStaticData();

  const item = db.items.find((i: any) => i.id === id);

  if (!item) {
    notFound();
  }

  const merchant = db.merchants.find((m: any) => m.id === item.merchant_id);

  if (!merchant) {
    notFound();
  }

  const itemData = {
    ...item,
    merchant_name: merchant.name,
    merchant_id: merchant.id,
    locations: merchant.locations
  };
  const locations = itemData.locations;

  return (
    <div className="min-h-screen">
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/browse/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ← Back to Browse
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-purple-100">
          {/* Item Image */}
          <div className="aspect-[16/9] bg-gradient-to-br from-purple-100 to-pink-100 relative">
            <ImageWithFallback
              src={itemData.image_url}
              alt={itemData.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Item Details */}
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-3">
                {itemData.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {itemData.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">{itemData.merchant_name}</p>
              {itemData.description && (
                <p className="text-gray-700 mb-4">{itemData.description}</p>
              )}
              <div className="text-3xl font-bold text-purple-600">
                ${(itemData.value_cents / 100).toFixed(2)}
              </div>
            </div>

            {/* Locations */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">📍 Redemption Locations</h3>
              <ul className="space-y-1">
                {locations.map((location: string, idx: number) => (
                  <li key={idx} className="text-gray-600">{location}</li>
                ))}
              </ul>
            </div>

            {/* Send Gift Form */}
            <GiftForm 
              itemId={itemData.id}
              itemName={itemData.name}
              valueCents={itemData.value_cents}
              merchantId={itemData.merchant_id}
              itemImageUrl={itemData.image_url}
              itemDescription={itemData.description || ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
