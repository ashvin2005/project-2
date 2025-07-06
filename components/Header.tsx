'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingCartIcon, MagnifyingGlassIcon, UserIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Header({ searchQuery = '', onSearchChange }: HeaderProps) {
  const { itemCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="header-glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-glow">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-3xl font-bold text-gradient-primary">
              Cartzy
            </span>
          </Link>

          {/* Search Bar */}
          {onSearchChange && (
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-accent-electric" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={t('search')}
                  className="input-dark w-full pl-12 pr-4 py-3 rounded-2xl focus:ring-2 focus:ring-accent-electric/20"
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-text-secondary hover:text-accent-electric font-medium transition-all duration-200 hover:scale-105 transform relative group"
            >
              {t('home')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <Link
              href="/offers"
              className="text-text-secondary hover:text-accent-neon font-medium transition-all duration-200 hover:scale-105 transform relative group"
            >
              {t('offers')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center text-text-secondary hover:text-accent-purple font-medium transition-colors duration-200 glass px-3 py-2 rounded-xl"
              >
                <GlobeAltIcon className="h-5 w-5 mr-2" />
                {language.toUpperCase()}
              </button>
              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-36 glass-card rounded-xl py-2 z-50 border border-border-accent">
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setShowLanguageMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-dark-tertiary transition-colors duration-200"
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('hi');
                      setShowLanguageMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-dark-tertiary transition-colors duration-200"
                  >
                    हिंदी
                  </button>
                </div>
              )}
            </div>

            <Link
              href="/cart"
              className="relative flex items-center text-text-secondary hover:text-accent-magenta font-medium transition-all duration-200 hover:scale-105 transform group"
            >
              <ShoppingCartIcon className="h-6 w-6 mr-2" />
              {t('cart')}
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-secondary text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold pulse-glow">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center text-text-secondary hover:text-accent-electric font-medium transition-colors duration-200 glass px-4 py-2 rounded-xl"
                >
                  <UserIcon className="h-5 w-5 mr-2" />
                  {user?.name}
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 glass-card rounded-xl py-2 z-50 border border-border-accent">
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-dark-tertiary transition-colors duration-200"
                      onClick={() => setShowUserMenu(false)}
                    >
                      {t('orders')}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-dark-tertiary transition-colors duration-200"
                    >
                      {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-text-secondary hover:text-accent-electric font-medium transition-colors duration-200"
                >
                  {t('login')}
                </Link>
                <Link
                  href="/signup"
                  className="btn-primary"
                >
                  {t('signup')}
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}