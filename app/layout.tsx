import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gifting App - Send Treats to Friends",
  description: "Send delightful treats to friends - coffee, desserts, flowers and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
