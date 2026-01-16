# 🎁 Gifting App - Demo Version

A modern, mobile-first web application for sending delightful treats to friends. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🌐 Live Demo

**GitHub Pages**: [https://YOUR_USERNAME.github.io/GiftingApp/](https://YOUR_USERNAME.github.io/GiftingApp/)

> ⚠️ **Demo Mode**: The GitHub Pages version runs in demo mode with in-memory storage. Changes won't persist between sessions.

## ✨ Features

- **Browse & Send Gifts**: Curated catalogue of treats (coffee, desserts, flowers)
- **Personal Messages**: Add a heartfelt note to your gift
- **QR Code Redemption**: Recipients redeem in-store via QR code
- **Merchant Validation**: Simple validation system for merchants
- **Mobile-First Design**: Optimized for mobile devices
- **Instant Sharing**: Share gift links via WhatsApp, email, or copy link

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with better-sqlite3
- **QR Codes**: qrcode library
- **IDs**: nanoid for unique identifiers

## 📋 Prerequisites

- Node.js 18+ and npm

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd gifting-app
npm install
```

### 2. Setup Database

The database will be automatically set up when you run the build command, or you can set it up manually:

```bash
npm run db:setup
```

This creates a SQLite database with:
- 5 merchants (cafés, dessert shops, florists)
- 13 items across categories
- 2 sample gifts for testing

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 User Flows

### Sender Flow

1. Browse treats by category or view all
2. Select a specific item
3. Enter your name and optional personal message
4. Click "Create Gift & Get Link"
5. Share the gift link via messaging apps

### Receiver Flow

1. Open gift link on mobile
2. View gift details and personal message
3. See QR code for redemption
4. Visit merchant location
5. Show QR code at checkout

### Merchant Flow

1. Navigate to `/merchant/[merchantId]`
2. Customer shows their QR code
3. Enter the gift code (e.g., `GIFT-ABC123XYZ456`)
4. Click "Validate & Redeem Gift"
5. System validates and marks as redeemed

## 🗂️ Project Structure

```
gifting-app/
├── app/
│   ├── page.tsx              # Homepage
│   ├── browse/               # Browse all items
│   ├── item/[id]/            # Individual item page
│   ├── gift/[id]/            # Gift view (after creation)
│   ├── merchant/[merchantId]/ # Merchant validation page
│   └── api/
│       ├── create-gift/      # Create gift API
│       ├── gift/[id]/        # Get gift details + QR
│       └── redeem/           # Redeem gift API
├── components/               # Reusable components (future)
├── lib/
│   ├── db.ts                 # Database utilities
│   └── utils.ts              # Helper functions
├── scripts/
│   └── setup-db.js           # Database seeding script
├── public/                   # Static assets
└── gifting.db                # SQLite database (generated)
```

## 🎯 Key Routes

- `/` - Homepage with categories and popular items
- `/browse` - Browse all treats (filterable by category)
- `/browse?category=Coffee%20%26%20Matcha` - Filter by category
- `/item/[id]` - Item details and gift creation
- `/gift/[id]` - View created gift with QR code
- `/merchant/[merchantId]` - Merchant validation page

## 🧪 Testing the Demo

### Test Gift Redemption

1. Go to homepage
2. Click "Send a Gift" or browse items
3. Select "Cappuccino" from Brew & Bean
4. Fill in: Name: "Test User", Message: "Testing!"
5. Click "Create Gift & Get Link"
6. Copy the gift URL
7. Find the merchant ID in the database or URL
8. Go to `/merchant/[merchantId]`
9. Copy the QR code from the gift page (e.g., `GIFT-ABC123XYZ456`)
10. Paste and redeem

### Pre-seeded Test Gifts

The database includes 2 sample gifts you can test:
- Cappuccino gift from Sarah
- Macarons gift from Mike

Query the database to get their QR codes:
```sql
SELECT qr_code, sender_name FROM gifts;
```

## 🗃️ Database Schema

### Tables

- **merchants**: Store information (name, category, locations)
- **items**: Individual treats with pricing
- **gifts**: Created gifts with QR codes
- **redemptions**: Redemption history

### Sample Merchants

1. **Brew & Bean** (Coffee & Matcha)
2. **Sweet Moments** (Desserts & Chocolate)
3. **Bloom Garden** (Flowers & Plants)
4. **Matcha House** (Coffee & Matcha)
5. **Artisan Chocolates** (Desserts & Chocolate)

## 🎨 Design Features

- Gradient purple-to-pink brand colors
- Mobile-first responsive design
- Smooth animations and transitions
- Accessible form controls
- Clean, modern UI with rounded corners
- High-contrast text for readability

## 🔒 Demo Limitations

This is a **demo version** with fake data and simplified functionality:

- ❌ No real payment processing
- ❌ No authentication/user accounts
- ❌ No email notifications
- ❌ No merchant dashboard
- ❌ QR scanning requires manual code entry
- ❌ No delivery options
- ✅ Full gift creation and redemption flow
- ✅ QR code generation
- ✅ Share functionality

## 🚧 Future Enhancements (Post-Demo)

- Payment integration (Stripe)
- User authentication
- Merchant self-serve portal
- Email notifications
- Native QR scanning with camera
- Scheduled gifting
- Group gifting
- Gift analytics dashboard
- Cross-merchant redemption
- Mobile app (React Native)

## 📝 Environment Variables (Future)

For production, you'd add:

```env
DATABASE_URL=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_APP_URL=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
```

## 🤝 Contributing

This is a demo project. Feel free to fork and extend!

## 📄 License

MIT License - Free to use and modify

## 💡 Tips

- The app works best on mobile browsers
- Use the browser's "Share" feature to share gift links
- Test redemption flow with different merchants
- Check the database file (`gifting.db`) to see data structure

---

Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS
