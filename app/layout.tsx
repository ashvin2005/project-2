import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import CustomerSupport from '@/components/CustomerSupport';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cartzy - Modern E-commerce Store',
  description: 'Discover amazing products at great prices with Cartzy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <div className="min-h-screen bg-gray-50">
                {children}
                <CustomerSupport />
              </div>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}