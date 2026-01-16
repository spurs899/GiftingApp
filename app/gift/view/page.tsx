import { Suspense } from 'react';
import GiftViewClient from '@/components/GiftViewClient';

function GiftViewLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🎁</div>
        <p className="text-gray-600">Loading gift...</p>
      </div>
    </div>
  );
}

export default function GiftViewPage() {
  return (
    <Suspense fallback={<GiftViewLoading />}>
      <GiftViewClient />
    </Suspense>
  );
}
