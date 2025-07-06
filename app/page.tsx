'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { SparklesIcon, FireIcon, GiftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, selectedCategory]);

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

  const filterProducts = () => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const discountedProducts = products.filter(p => p.discount).slice(0, 6);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-primary">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="shimmer w-12 h-12 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-electric/10 via-accent-purple/10 to-accent-magenta/10 rounded-3xl -z-10 blur-3xl"></div>
          <div className="glass-card py-20 px-8 rounded-3xl">
            <h1 className="text-6xl lg:text-8xl font-bold text-gradient-primary mb-8 float-animation">
              Welcome to Cartzy
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
              Discover amazing products at unbeatable prices. Shop with confidence and enjoy fast delivery across India in our premium dark shopping experience.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="glass px-6 py-3 rounded-full border border-border-glow">
                <div className="flex items-center">
                  <SparklesIcon className="h-6 w-6 text-accent-electric mr-3" />
                  <span className="text-sm font-medium text-text-primary">Premium Quality</span>
                </div>
              </div>
              <div className="glass px-6 py-3 rounded-full border border-border-glow">
                <div className="flex items-center">
                  <FireIcon className="h-6 w-6 text-accent-neon mr-3" />
                  <span className="text-sm font-medium text-text-primary">Hot Deals</span>
                </div>
              </div>
              <div className="glass px-6 py-3 rounded-full border border-border-glow">
                <div className="flex items-center">
                  <GiftIcon className="h-6 w-6 text-accent-magenta mr-3" />
                  <span className="text-sm font-medium text-text-primary">Free Shipping</span>
                </div>
              </div>
            </div>
            <Link
              href="/offers"
              className="btn-primary text-lg px-10 py-4 rounded-2xl inline-flex items-center space-x-3"
            >
              <span>Explore Offers</span>
              <SparklesIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Special Offers Section */}
        {discountedProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold text-text-primary flex items-center">
                <FireIcon className="h-10 w-10 text-accent-neon mr-4" />
                <span className="text-gradient-secondary">Special Offers</span>
              </h2>
              <Link
                href="/offers"
                className="text-accent-electric hover:text-accent-purple font-medium transition-colors duration-200"
              >
                View All Offers →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {discountedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-primary text-white shadow-glow'
                  : 'glass text-text-secondary hover:bg-dark-tertiary border border-border-accent'
              }`}
            >
              {t(category.toLowerCase())}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="glass-card p-12 rounded-3xl">
              <p className="text-text-muted text-xl">No products found matching your criteria.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}