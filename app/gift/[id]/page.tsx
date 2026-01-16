'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function GiftPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [gift, setGift] = useState<any>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/gift/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          notFound();
        } else {
          setGift(data);
          setQrCodeUrl(data.qr_url);
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  }, [id]);

  const giftUrl = typeof window !== 'undefined' ? window.location.href : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(giftUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaWhatsApp = () => {
    const text = `${gift.sender_name} sent you a gift! 🎁`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n' + giftUrl)}`);
  };

  const shareViaEmail = () => {
    const subject = `${gift.sender_name} sent you a gift!`;
    const body = `Hi!\n\n${gift.sender_name} has sent you a treat: ${gift.item_name}\n\nView and redeem your gift here: ${giftUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gift...</p>
        </div>
      </div>
    );
  }

  if (!gift) {
    notFound();
  }

  const locations = gift.merchant_locations;

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
              {qrCodeUrl && (
                <img src={qrCodeUrl} alt="QR Code" className="mx-auto w-48 h-48" />
              )}
              <p className="text-xs text-gray-500 mt-3">Code: {gift.qr_code}</p>
            </div>

            {gift.is_redeemed ? (
              <div className="mt-6 bg-gray-100 rounded-xl p-4 text-center">
                <p className="text-gray-600 font-medium">✓ This gift has been redeemed</p>
              </div>
            ) : null}
          </div>
        </div>

        {/* Share Options */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
          <h3 className="font-semibold text-gray-900 mb-4">Share this gift</h3>
          
          <div className="space-y-3">
            <button
              onClick={copyToClipboard}
              className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {copied ? '✓ Copied!' : '📋 Copy Link'}
            </button>

            <button
              onClick={shareViaWhatsApp}
              className="w-full bg-green-100 hover:bg-green-200 text-green-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              💬 Share via WhatsApp
            </button>

            <button
              onClick={shareViaEmail}
              className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              ✉️ Share via Email
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-purple-600 font-medium hover:underline">
            ← Send another gift
          </Link>
        </div>
      </div>
    </div>
  );
}
