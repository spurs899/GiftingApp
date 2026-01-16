import Link from 'next/link';
import { getDb } from '@/lib/db';

export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export default async function MerchantPage({ params }: { params: Promise<{ merchantId: string }> }) {
  const { merchantId } = await params;
  const db = await getDb();

  const merchant = db.merchants.find(m => m.id === merchantId);

  if (!merchant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Merchant not found</h1>
          <Link href="/" className="text-purple-600 hover:underline">Go home</Link>
        </div>
      </div>
    );
  }

  const locations = merchant.locations;

  return (
    <div className="min-h-screen">
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎁 Gifting
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-purple-100">
          <div className="aspect-[21/9] bg-gradient-to-br from-purple-100 to-pink-100 relative">
            <img
              src={merchant.image_url}
              alt={merchant.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:p-8">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-3">
              {merchant.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{merchant.name}</h1>

            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">📍 Locations</h3>
              <ul className="space-y-1">
                {locations.map((location: string, idx: number) => (
                  <li key={idx} className="text-gray-600">{location}</li>
                ))}
              </ul>
            </div>

            {/* QR Code Scanner */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Validate Gift Redemption</h2>
              <p className="text-gray-600 mb-6">
                Enter the gift code shown on the customer's screen to validate and redeem.
              </p>

              <form action="/api/redeem" method="POST" className="space-y-4">
                <input type="hidden" name="merchant_id" value={merchant.id} />
                
                <div>
                  <label htmlFor="qr_code" className="block text-sm font-medium text-gray-700 mb-1">
                    Gift Code
                  </label>
                  <input
                    type="text"
                    id="qr_code"
                    name="qr_code"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent font-mono"
                    placeholder="e.g., GIFT-ABC123XYZ456"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Validate & Redeem Gift
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
