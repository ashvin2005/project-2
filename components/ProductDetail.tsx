'use client';

import Image from 'next/image';
import { useCart, Product } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingCartIcon, TagIcon, StarIcon } from '@heroicons/react/24/outline';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          {product.discount && (
            <div className="absolute top-6 right-6">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-2 rounded-full shadow-lg">
                {product.discount}% OFF
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-purple-100 text-purple-800 text-sm font-medium px-4 py-2 rounded-full">
                {t(product.category.toLowerCase())}
              </span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">(4.2)</span>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {product.name}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center text-sm text-purple-600 bg-purple-50 px-3 py-2 rounded-full border border-purple-200"
              >
                <TagIcon className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          {/* Price and Add to Cart */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-2xl text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-3 transform hover:scale-105 shadow-2xl"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              <span>{t('addToCart')}</span>
            </button>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Free shipping above ₹999
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                7-day return policy
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Secure payment
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                24/7 customer support
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}