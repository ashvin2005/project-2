'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { FireIcon, TagIcon, SparklesIcon, GiftIcon } from '@heroicons/react/24/outline';

export default function OffersPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const discountedProducts = products.filter(p => p.discount);
  const flashDeals = discountedProducts.filter(p => p.discount && p.discount >= 25);
  const regularOffers = discountedProducts.filter(p => p.discount && p.discount < 25);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-pink-500/10 to-orange-500/10 rounded-3xl -z-10"></div>
          <div className="py-16 px-8">
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-6">
              Special Offers
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Don&apos;t miss out on these amazing deals! Limited time offers with huge discounts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-lg">
                <FireIcon className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-sm font-medium">Flash Deals</span>
              </div>
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-lg">
                <TagIcon className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium">Up to 50% Off</span>
              </div>
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-lg">
                <GiftIcon className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Flash Deals Section */}
        {flashDeals.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <FireIcon className="h-8 w-8 text-red-500 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Flash Deals</h2>
              <span className="ml-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                Limited Time!
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {flashDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Offers Section */}
        {regularOffers.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <SparklesIcon className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Great Deals</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {regularOffers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Promotional Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Free Shipping</h3>
            <p className="text-purple-100 mb-4">
              Get free shipping on all orders above ₹999. No minimum quantity required!
            </p>
            <div className="flex items-center">
              <GiftIcon className="h-6 w-6 mr-2" />
              <span className="font-medium">Valid on all products</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Weekend Special</h3>
            <p className="text-orange-100 mb-4">
              Extra 10% off on all electronics. Use code WEEKEND10 at checkout.
            </p>
            <div className="flex items-center">
              <TagIcon className="h-6 w-6 mr-2" />
              <span className="font-medium">Code: WEEKEND10</span>
            </div>
          </div>
        </div>

        {discountedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No offers available at the moment. Check back soon!</p>
          </div>
        )}
      </main>
    </div>
  );
}