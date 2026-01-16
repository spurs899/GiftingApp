import Link from 'next/link';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BrowsePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const db = await getDb();
  const categoryFilter = params.category;

  const allItems = db.items.map(item => {
    const merchant = db.merchants.find(m => m.id === item.merchant_id);
    return {
      ...item,
      merchant_name: merchant?.name,
      locations: merchant?.locations
    };
  });

  const items = categoryFilter
    ? allItems.filter(item => item.category === categoryFilter).sort((a, b) => a.name.localeCompare(b.name))
    : allItems.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

  const categories = [...new Set(db.items.map(item => item.category))]
    .sort()
    .map(category => ({ category }));

  return (
    <div className="min-h-screen">
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🎁 Gifting
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {categoryFilter ? categoryFilter : 'All Treats'}
          </h1>
          
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Link
              href="/browse"
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                !categoryFilter
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-600'
              }`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.category}
                href={`/browse?category=${encodeURIComponent(cat.category)}`}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                  categoryFilter === cat.category
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-600'
                }`}
              >
                {cat.category}
              </Link>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: any) => (
            <Link
              key={item.id}
              href={`/item/${item.id}`}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow border border-purple-100"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 relative">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.merchant_name}</p>
                {item.description && (
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-purple-600">
                    ${(item.value_cents / 100).toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">{item.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
