'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import QRCode from 'qrcode';
import { ShareButtons } from '@/components/ShareButtons';

export default function GiftViewClient() {
  const searchParams = useSearchParams();
  const giftId = searchParams.get('id');
  
  const [gift, setGift] = useState<any>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!giftId) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    async function loadGift() {
      try {
        // First try localStorage for client-created gifts
        const localGifts = localStorage.getItem('demo-gifts');
        if (localGifts) {
          const gifts = JSON.parse(localGifts);
          const localGift = gifts.find((g: any) => g.id === giftId);
          
          if (localGift) {
            // Generate QR code
            const qr = await QRCode.toDataURL(localGift.qr_code, {
              width: 300,
              margin: 2,
              color: {
                dark: '#7c3aed',
                light: '#ffffff'
              }
            });
            setQrCodeUrl(qr);
            setGift(localGift);
            setLoading(false);
            return;
          }
        }

        // Fall back to static data for pre-seeded gifts
        const basePath = process.env.NODE_ENV === 'production' ? '/GiftingApp' : '';
        const response = await fetch(`${basePath}/static-data.json`);
        const db = await response.json();

        const staticGift = db.gifts.find((g: any) => g.id === giftId);
        if (staticGift) {
          const item = db.items.find((i: any) => i.id === staticGift.item_id);
          const merchant = db.merchants.find((m: any) => m.id === item?.merchant_id);

          // Generate QR code
          const qr = await QRCode.toDataURL(staticGift.qr_code, {
            width: 300,
            margin: 2,
            color: {
              dark: '#7c3aed',
              light: '#ffffff'
            }
          });

          setQrCodeUrl(qr);
          setGift({
            ...staticGift,
            item_name: item?.name,
            item_image_url: item?.image_url,
            item_description: item?.description,
            merchant_name: merchant?.name,
            merchant_locations: merchant?.locations,
          });
          setLoading(false);
        } else {
          setNotFound(true);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to load gift:', error);
        setNotFound(true);
        setLoading(false);
      }
    }

    loadGift();
  }, [giftId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🎁</div>
          <p className="text-gray-600">Loading gift...</p>
        </div>
      </div>
    );
  }

  if (notFound || !gift) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gift not found</h1>
          <p className="text-gray-600 mb-4">This gift may have expired or the link is incorrect.</p>
          <Link href="/" className="text-purple-600 font-medium hover:underline">
            ← Go back home
          </Link>
        </div>
      </div>
    );
  }

  const locations = gift.merchant_locations || [];

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
            <p className="text-purple-100">From {gift.sender_name}</p>
          </div>

          <div className="p-6">
            {gift.recipient_message && (
              <div className="bg-purple-50 rounded-xl p-4 mb-6">
                <p className="text-gray-700 italic">"{gift.recipient_message}"</p>
              </div>
            )}

            <div className="flex gap-4 mb-6">
              <img
                src={gift.item_image_url}
                alt={gift.item_name}
                className="w-24 h-24 object-cover rounded-xl"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96"%3E%3Crect fill="%23f3e8ff" width="96" height="96"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="32" fill="%239333ea"%3E🎁%3C/text%3E%3C/svg%3E';
                }}
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">{gift.item_name}</h3>
                <p className="text-gray-600">{gift.merchant_name}</p>
                <p className="text-purple-600 font-semibold mt-1">
                  ${(gift.value_cents / 100).toFixed(2)}
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
              <img src={qrCodeUrl} alt="QR Code" className="mx-auto w-48 h-48" />
              <p className="text-xs text-gray-500 mt-3">Code: {gift.qr_code}</p>
            </div>

            {gift.redeemed ? (
              <div className="mt-6 bg-gray-100 rounded-xl p-4 text-center">
                <p className="text-gray-600 font-medium">✓ This gift has been redeemed</p>
              </div>
            ) : null}
          </div>
        </div>

        {/* Share Options */}
        <ShareButtons 
          giftUrl={typeof window !== 'undefined' ? window.location.href : ''}
          senderName={gift.sender_name}
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
