'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart, Product } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingCartIcon, EyeIcon, TagIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="product-card card-3d group">
      <div className="relative aspect-square overflow-hidden rounded-t-2xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="badge-electric backdrop-blur-sm">
            {t(product.category.toLowerCase())}
          </span>
        </div>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-4 right-4">
            <span className="badge-neon animate-pulse">
              {product.discount}% OFF
            </span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex space-x-2">
            <Link
              href={`/product/${product.id}`}
              className="glass p-3 rounded-xl hover:bg-dark-tertiary transition-all duration-200 shadow-glow"
            >
              <EyeIcon className="h-5 w-5 text-accent-electric" />
            </Link>
            <button
              onClick={handleAddToCart}
              className="btn-primary p-3 rounded-xl"
            >
              <ShoppingCartIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-text-primary mb-2 line-clamp-2 group-hover:text-gradient-primary transition-all duration-200">
          {product.name}
        </h3>
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-gradient-primary">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-text-muted line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center text-xs text-accent-purple bg-dark-tertiary px-3 py-1 rounded-full border border-border-accent"
            >
              <TagIcon className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>

        <div className="flex space-x-3">
          <Link
            href={`/product/${product.id}`}
            className="btn-secondary flex-1 text-center flex items-center justify-center"
          >
            <EyeIcon className="h-4 w-4 mr-2" />
            {t('viewDetails')}
          </Link>
          
          <button
            onClick={handleAddToCart}
            className="btn-primary flex-1 flex items-center justify-center"
          >
            <ShoppingCartIcon className="h-4 w-4 mr-2" />
            {t('addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
}