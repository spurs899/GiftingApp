'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Item {
  id: string;
  name: string;
  description: string;
  value_cents: number;
  category: string;
  image_url: string;
  merchant_name?: string;
}

export function BrowseClient() {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const basePath = process.env.NODE_ENV === 'production' ? '/GiftingApp' : '';
        const response = await fetch(`${basePath}/static-data.json`);
        const db = await response.json();

        const itemsWithMerchants = db.items.map((item: any) => {
          const merchant = db.merchants.find((m: any) => m.id === item.merchant_id);
          return {
            ...item,
            merchant_name: merchant?.name
          };
        });

        setItems(itemsWithMerchants);
        
        const uniqueCategories = [...new Set(db.items.map((i: any) => i.category as string))].sort();
        setCategories(uniqueCategories as string[]);
        
        // Check URL for category filter
        const params = new URLSearchParams(window.location.search);
        const cat = params.get('category');
        if (cat) setSelectedCategory(cat);
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to load data:', error);
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredItems = selectedCategory
    ? items.filter(item => item.category === selectedCategory)
    : items;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading items...</p>
        </div>
      </div>
    );
  }

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
            {selectedCategory || 'All Treats'}
          </h1>
          
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                !selectedCategory
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-600'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={`/item/${item.id}/`}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow border border-purple-100"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 relative">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3e8ff" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="48" fill="%239333ea"%3E🎁%3C/text%3E%3C/svg%3E';
                  }}
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

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
