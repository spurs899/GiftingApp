import GiftPageClient from '@/components/GiftPageClient';

export async function generateStaticParams() {
  const fs = await import('fs/promises');
  const path = await import('path');
  const dataPath = path.join(process.cwd(), 'public', 'static-data.json');
  
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    const db = JSON.parse(data);
    return db.gifts.map((gift: any) => ({
      id: gift.id,
    }));
  } catch {
    return [];
  }
}

export default async function GiftPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <GiftPageClient giftId={id} />;
}
