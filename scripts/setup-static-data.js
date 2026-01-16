const { nanoid } = require('nanoid');
const fs = require('fs');
const path = require('path');

// Create static data that will be embedded in the client bundle
const publicDir = path.join(__dirname, '..', 'public');
const dataPath = path.join(publicDir, 'static-data.json');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Seed merchants
const merchants = [
  {
    id: 'merchant1',
    name: 'Brew & Bean',
    category: 'Coffee & Matcha',
    locations: ['123 Main St, Downtown', '456 Oak Ave, Midtown'],
    image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    created_at: new Date().toISOString()
  },
  {
    id: 'merchant2',
    name: 'Sweet Moments',
    category: 'Desserts & Chocolate',
    locations: ['789 Elm St, City Center'],
    image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    created_at: new Date().toISOString()
  },
  {
    id: 'merchant3',
    name: 'Bloom Garden',
    category: 'Flowers & Plants',
    locations: ['321 Pine St, Garden District'],
    image_url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop',
    created_at: new Date().toISOString()
  },
  {
    id: 'merchant4',
    name: 'Matcha House',
    category: 'Coffee & Matcha',
    locations: ['654 Maple Dr, Westside'],
    image_url: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=300&fit=crop',
    created_at: new Date().toISOString()
  },
  {
    id: 'merchant5',
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
  { merchant_id: 'merchant1', name: 'Cappuccino', description: 'Creamy espresso with steamed milk', value_cents: 550, category: 'Coffee & Matcha', image_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop' },
  { merchant_id: 'merchant1', name: 'Flat White', description: 'Smooth espresso with microfoam', value_cents: 600, category: 'Coffee & Matcha', image_url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&h=300&fit=crop' },
  { merchant_id: 'merchant1', name: 'Cold Brew', description: 'Smooth, refreshing cold coffee', value_cents: 650, category: 'Coffee & Matcha', image_url: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop' },
  
  // Sweet Moments
  { merchant_id: 'merchant2', name: 'Chocolate Croissant', description: 'Buttery pastry with dark chocolate', value_cents: 650, category: 'Desserts & Chocolate', image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop' },
  { merchant_id: 'merchant2', name: 'Macarons Box (6)', description: 'Assorted French macarons', value_cents: 1200, category: 'Desserts & Chocolate', image_url: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=300&fit=crop' },
  { merchant_id: 'merchant2', name: 'Tiramisu Slice', description: 'Classic Italian dessert', value_cents: 850, category: 'Desserts & Chocolate', image_url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop' },
  
  // Bloom Garden
  { merchant_id: 'merchant3', name: 'Sunflower Bouquet', description: 'Bright and cheerful sunflowers', value_cents: 2500, category: 'Flowers & Plants', image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop' },
  { merchant_id: 'merchant3', name: 'Succulent Trio', description: 'Three mini succulents in pots', value_cents: 1800, category: 'Flowers & Plants', image_url: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop' },
  { merchant_id: 'merchant3', name: 'Rose Bouquet', description: 'Six fresh roses, mixed colors', value_cents: 3500, category: 'Flowers & Plants', image_url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop' },
  
  // Matcha House
  { merchant_id: 'merchant4', name: 'Matcha Latte', description: 'Premium ceremonial matcha', value_cents: 700, category: 'Coffee & Matcha', image_url: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=300&fit=crop' },
  { merchant_id: 'merchant4', name: 'Iced Matcha', description: 'Refreshing iced matcha latte', value_cents: 750, category: 'Coffee & Matcha', image_url: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=400&h=300&fit=crop' },
  
  // Artisan Chocolates
  { merchant_id: 'merchant5', name: 'Truffle Collection', description: 'Handmade chocolate truffles (8 pcs)', value_cents: 1500, category: 'Desserts & Chocolate', image_url: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&h=300&fit=crop' },
  { merchant_id: 'merchant5', name: 'Dark Chocolate Bar', description: '75% single origin dark chocolate', value_cents: 850, category: 'Desserts & Chocolate', image_url: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=300&fit=crop' },
].map((item, idx) => ({
  ...item,
  id: `item${idx + 1}`,
  created_at: new Date().toISOString()
}));

// Create sample gifts
const sampleGifts = [
  {
    id: 'gift1',
    item_id: 'item1',
    sender_name: 'Sarah',
    recipient_message: 'Happy Birthday! Enjoy a coffee on me ☕',
    qr_code: 'GIFT-DEMO1234ABCD',
    value_cents: 550,
    is_redeemed: false,
    redeemed_at: null,
    created_at: new Date().toISOString()
  },
  {
    id: 'gift2',
    item_id: 'item5',
    sender_name: 'Mike',
    recipient_message: 'Thanks for everything! 🎁',
    qr_code: 'GIFT-DEMO5678EFGH',
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

// Write to public folder for static access
fs.writeFileSync(dataPath, JSON.stringify(db, null, 2), 'utf-8');

console.log('✅ Static data setup complete!');
console.log(`📍 Data location: ${dataPath}`);
console.log(`📦 Created ${merchants.length} merchants`);
console.log(`🎁 Created ${items.length} items`);
console.log(`💝 Created ${sampleGifts.length} sample gifts`);
console.log('\n⚠️  Note: This is DEMO mode - changes won\'t persist!');
