import Link from 'next/link';
import { getDb } from '@/lib/db';

export default async function HomePage() {
  const db = await getDb();
  
  const categories = [...new Set(db.items.map(item => item.category))]
    .sort()
    .map(category => ({ category }));

  const popularItems = db.items
    .map(item => {
      const merchant = db.merchants.find(m => m.id === item.merchant_id);
      return {
        ...item,
        merchant_name: merchant?.name,
        locations: merchant?.locations
      };
    })
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🎁 Gifting
              </h1>
              <p className="text-sm text-gray-600">Send treats, spread joy</p>
            </div>
            <Link 
              href="/browse"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-shadow"
            >
              Send a Gift
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Send treats to friends in
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> under 3 minutes</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Choose a specific treat, add a message, and share instantly. They redeem in-store with a QR code.
          </p>
          <Link 
            href="/browse"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-xl transition-all hover:scale-105"
          >
            Start Gifting →
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link 
              key={cat.category}
              href={`/browse?category=${encodeURIComponent(cat.category)}`}
              className="bg-white p-6 rounded-2xl text-center hover:shadow-lg transition-shadow border border-purple-100"
            >
              <div className="text-3xl mb-2">
                {cat.category.includes('Coffee') ? '☕' : 
                 cat.category.includes('Dessert') ? '🍰' :
                 cat.category.includes('Flower') ? '💐' : '✨'}
              </div>
              <h4 className="font-semibold text-gray-900">{cat.category}</h4>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular This Week</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularItems.map((item: any) => (
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
                <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{item.merchant_name}</p>
                <p className="text-sm text-purple-600 font-medium">
                  ${(item.value_cents / 100).toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-10 text-center">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
            <h4 className="font-semibold text-gray-900 mb-2">Choose a Treat</h4>
            <p className="text-gray-600">Browse our curated collection of coffee, desserts, flowers and more</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
            <h4 className="font-semibold text-gray-900 mb-2">Send with Love</h4>
            <p className="text-gray-600">Add a personal message and share the gift link via text or social</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
            <h4 className="font-semibold text-gray-900 mb-2">Redeem In-Store</h4>
            <p className="text-gray-600">They show the QR code at checkout - simple and delightful</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-purple-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 text-sm">
            © 2026 Gifting App - Send treats, spread joy 💝
          </p>
        </div>
      </footer>
    </div>
  );
}
