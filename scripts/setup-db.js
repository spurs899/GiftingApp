const { nanoid } = require('nanoid');
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const dbPath = path.join(dataDir, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Seed merchants
const merchants = [
  {
    id: nanoid(10),
    name: 'Brew & Bean',
    category: 'Coffee & Matcha',
    locations: ['123 Main St, Downtown', '456 Oak Ave, Midtown'],
    image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    created_at: new Date().toISOString()
  },
  {
    id: nanoid(10),
    name: 'Sweet Moments',
    category: 'Desserts & Chocolate',
    locations: ['789 Elm St, City Center'],
    image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    created_at: new Date().toISOString()
  },
  {
    id: nanoid(10),
    name: 'Bloom Garden',
    category: 'Flowers & Plants',
    locations: ['321 Pine St, Garden District'],
    image_url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop',
    created_at: new Date().toISOString()
  },
  {
    id: nanoid(10),
    name: 'Matcha House',
    category: 'Coffee & Matcha',
    locations: ['654 Maple Dr, Westside'],
    image_url: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=300&fit=crop',
    created_at: new Date().toISOString()
  },
  {
    id: nanoid(10),
    name: 'Artisan Chocolates',
    category: 'Desserts & Chocolate',
    locations: ['987 Cherry Ln, Historic Quarter'],
    image_url: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=300&fit=crop',
    created_at: new Date().toISOString()
  }
];

// Seed items
const items = [
  // Brew & Bean
  { merchant_id: merchants[0].id, name: 'Cappuccino', description: 'Creamy espresso with steamed milk', value_cents: 550, category: 'Coffee & Matcha', image_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop' },
  { merchant_id: merchants[0].id, name: 'Flat White', description: 'Smooth espresso with microfoam', value_cents: 600, category: 'Coffee & Matcha', image_url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&h=300&fit=crop' },
  { merchant_id: merchants[0].id, name: 'Cold Brew', description: 'Smooth, refreshing cold coffee', value_cents: 650, category: 'Coffee & Matcha', image_url: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop' },
  
  // Sweet Moments
  { merchant_id: merchants[1].id, name: 'Chocolate Croissant', description: 'Buttery pastry with dark chocolate', value_cents: 650, category: 'Desserts & Chocolate', image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop' },
  { merchant_id: merchants[1].id, name: 'Macarons Box (6)', description: 'Assorted French macarons', value_cents: 1200, category: 'Desserts & Chocolate', image_url: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=300&fit=crop' },
  { merchant_id: merchants[1].id, name: 'Tiramisu Slice', description: 'Classic Italian dessert', value_cents: 850, category: 'Desserts & Chocolate', image_url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop' },
  
  // Bloom Garden
  { merchant_id: merchants[2].id, name: 'Sunflower Bouquet', description: 'Bright and cheerful sunflowers', value_cents: 2500, category: 'Flowers & Plants', image_url: 'https://images.unsplash.com/photo-1597848212624-e50b21b717a8?w=400&h=300&fit=crop' },
  { merchant_id: merchants[2].id, name: 'Succulent Trio', description: 'Three mini succulents in pots', value_cents: 1800, category: 'Flowers & Plants', image_url: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=300&fit=crop' },
  { merchant_id: merchants[2].id, name: 'Rose Bouquet', description: 'Six fresh roses, mixed colors', value_cents: 3500, category: 'Flowers & Plants', image_url: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=300&fit=crop' },
  
  // Matcha House
  { merchant_id: merchants[3].id, name: 'Matcha Latte', description: 'Premium ceremonial matcha', value_cents: 700, category: 'Coffee & Matcha', image_url: 'https://images.unsplash.com/photo-1536013564325-e6e7e8cd7307?w=400&h=300&fit=crop' },
  { merchant_id: merchants[3].id, name: 'Iced Matcha', description: 'Refreshing iced matcha latte', value_cents: 750, category: 'Coffee & Matcha', image_url: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=400&h=300&fit=crop' },
  
  // Artisan Chocolates
  { merchant_id: merchants[4].id, name: 'Truffle Collection', description: 'Handmade chocolate truffles (8 pcs)', value_cents: 1500, category: 'Desserts & Chocolate', image_url: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&h=300&fit=crop' },
  { merchant_id: merchants[4].id, name: 'Dark Chocolate Bar', description: '75% single origin dark chocolate', value_cents: 850, category: 'Desserts & Chocolate', image_url: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=300&fit=crop' },
].map(item => ({
  ...item,
  id: nanoid(10),
  created_at: new Date().toISOString()
}));

// Create sample gifts
const sampleGifts = [
  {
    id: nanoid(10),
    item_id: items.find(i => i.name === 'Cappuccino').id,
    sender_name: 'Sarah',
    recipient_message: 'Happy Birthday! Enjoy a coffee on me ☕',
    qr_code: 'GIFT-' + nanoid(12),
    value_cents: 550,
    is_redeemed: false,
    redeemed_at: null,
    created_at: new Date().toISOString()
  },
  {
    id: nanoid(10),
    item_id: items.find(i => i.name === 'Macarons Box (6)').id,
    sender_name: 'Mike',
    recipient_message: 'Thanks for everything! 🎁',
    qr_code: 'GIFT-' + nanoid(12),
    value_cents: 1200,
    is_redeemed: false,
    redeemed_at: null,
    created_at: new Date().toISOString()
  }
];

// Create database object
const db = {
  merchants,
  items,
  gifts: sampleGifts,
  redemptions: []
};

// Write to file
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');

console.log('✅ Database setup complete!');
console.log(`📍 Database location: ${dbPath}`);
console.log(`📦 Seeded ${merchants.length} merchants`);
console.log(`🎁 Seeded ${items.length} items`);
console.log(`💝 Created ${sampleGifts.length} sample gifts`);
console.log('\nSample gift codes for testing:');
sampleGifts.forEach(gift => {
  console.log(`  - ${gift.qr_code} (${items.find(i => i.id === gift.item_id).name})`);
});
