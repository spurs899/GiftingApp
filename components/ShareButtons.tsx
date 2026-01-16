'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  giftUrl: string;
  senderName: string;
}

export function ShareButtons({ giftUrl, senderName }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(giftUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaWhatsApp = () => {
    const text = `${senderName} sent you a gift! 🎁`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n' + giftUrl)}`);
  };

  const shareViaEmail = () => {
    const subject = `${senderName} sent you a gift!`;
    const body = `Hi!\n\n${senderName} has sent you a treat!\n\nView and redeem your gift here: ${giftUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
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
  );
}
