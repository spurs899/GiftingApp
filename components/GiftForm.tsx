'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface GiftFormProps {
  itemId: string;
  itemName: string;
  valueCents: number;
  merchantId: string;
  itemImageUrl: string;
  itemDescription: string;
}

export default function GiftForm({ 
  itemId, 
  itemName, 
  valueCents, 
  merchantId,
  itemImageUrl,
  itemDescription
}: GiftFormProps) {
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Generate a unique gift ID (client-side)
    const giftId = 'gift-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    const qrCode = `GIFT-${giftId.toUpperCase()}`;

    // Create gift object
    const gift = {
      id: giftId,
      item_id: itemId,
      item_name: itemName,
      item_image_url: itemImageUrl,
      item_description: itemDescription,
      merchant_id: merchantId,
      sender_name: senderName,
      recipient_message: message,
      value_cents: valueCents,
      qr_code: qrCode,
      created_at: new Date().toISOString(),
      redeemed: false,
      redeemed_at: null
    };

    // Store in localStorage for demo mode
    try {
      const existingGifts = JSON.parse(localStorage.getItem('demo-gifts') || '[]');
      existingGifts.push(gift);
      localStorage.setItem('demo-gifts', JSON.stringify(existingGifts));
      
      // Navigate to gift page
      router.push(`/gift/${giftId}/`);
    } catch (error) {
      console.error('Failed to create gift:', error);
      alert('Failed to create gift. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="sender_name" className="block text-sm font-medium text-gray-700 mb-1">
          Your Name
        </label>
        <input
          type="text"
          id="sender_name"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="e.g., Sarah"
        />
      </div>

      <div>
        <label htmlFor="recipient_message" className="block text-sm font-medium text-gray-700 mb-1">
          Personal Message (Optional)
        </label>
        <textarea
          id="recipient_message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="e.g., Happy Birthday! Enjoy a coffee on me ☕"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-full text-lg font-medium hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Creating Gift...' : 'Create Gift & Get Link 🎁'}
      </button>

      <p className="text-sm text-gray-500 text-center mt-4">
        💳 Demo mode - gift stored locally in your browser
      </p>
    </form>
  );
}
