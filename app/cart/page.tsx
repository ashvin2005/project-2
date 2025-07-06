'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import CartItem from '@/components/CartItem';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingBagIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function CartPage() {
  const { items, total, clearCart } = useCart();
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <div>
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <ShoppingBagIcon className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('yourCartIsEmpty')}</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium transform hover:scale-105 shadow-lg"
            >
              {t('continueShopping')}
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200 hover:scale-105 transform"
          >
            {t('clearCart')}
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between text-xl font-bold text-gray-900 mb-6">
            <span>{t('total')}: ₹{total.toLocaleString()}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 bg-gray-100 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium text-center transform hover:scale-105"
            >
              {t('continueShopping')}
            </Link>
            <Link
              href="/checkout"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium text-center flex items-center justify-center transform hover:scale-105 shadow-lg"
            >
              {t('proceedToCheckout')}
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}