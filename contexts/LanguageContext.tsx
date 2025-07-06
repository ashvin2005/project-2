'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Navigation
    home: 'Home',
    cart: 'Cart',
    checkout: 'Checkout',
    orders: 'Orders',
    offers: 'Offers',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    
    // Common
    search: 'Search products...',
    addToCart: 'Add to Cart',
    viewDetails: 'View Details',
    price: 'Price',
    category: 'Category',
    quantity: 'Quantity',
    total: 'Total',
    
    // Cart
    yourCartIsEmpty: 'Your cart is empty',
    continueShopping: 'Continue Shopping',
    proceedToCheckout: 'Proceed to Checkout',
    clearCart: 'Clear Cart',
    
    // Checkout
    orderSummary: 'Order Summary',
    paymentInformation: 'Payment Information',
    deliveryLocation: 'Delivery Location',
    completeOrder: 'Complete Order',
    
    // Auth
    emailAddress: 'Email Address',
    password: 'Password',
    fullName: 'Full Name',
    
    // Customer Support
    needHelp: 'Need Help?',
    customerSupport: 'Customer Support',
    howCanWeHelp: 'How can we help you today?',
    sendMessage: 'Send Message',
    
    // Categories
    all: 'All',
    electronics: 'Electronics',
    clothing: 'Clothing',
    beauty: 'Beauty',
    homeAndGarden: 'Home & Garden',
    books: 'Books',
    sports: 'Sports',
  },
  hi: {
    // Navigation
    home: 'होम',
    cart: 'कार्ट',
    checkout: 'चेकआउट',
    orders: 'ऑर्डर',
    offers: 'ऑफर',
    login: 'लॉगिन',
    signup: 'साइन अप',
    logout: 'लॉगआउट',
    
    // Common
    search: 'उत्पाद खोजें...',
    addToCart: 'कार्ट में जोड़ें',
    viewDetails: 'विवरण देखें',
    price: 'कीमत',
    category: 'श्रेणी',
    quantity: 'मात्रा',
    total: 'कुल',
    
    // Cart
    yourCartIsEmpty: 'आपका कार्ट खाली है',
    continueShopping: 'खरीदारी जारी रखें',
    proceedToCheckout: 'चेकआउट पर जाएं',
    clearCart: 'कार्ट साफ़ करें',
    
    // Checkout
    orderSummary: 'ऑर्डर सारांश',
    paymentInformation: 'भुगतान जानकारी',
    deliveryLocation: 'डिलीवरी स्थान',
    completeOrder: 'ऑर्डर पूरा करें',
    
    // Auth
    emailAddress: 'ईमेल पता',
    password: 'पासवर्ड',
    fullName: 'पूरा नाम',
    
    // Customer Support
    needHelp: 'सहायता चाहिए?',
    customerSupport: 'ग्राहक सहायता',
    howCanWeHelp: 'आज हम आपकी कैसे सहायता कर सकते हैं?',
    sendMessage: 'संदेश भेजें',
    
    // Categories
    all: 'सभी',
    electronics: 'इलेक्ट्रॉनिक्स',
    clothing: 'कपड़े',
    beauty: 'सौंदर्य',
    homeAndGarden: 'घर और बगीचा',
    books: 'किताबें',
    sports: 'खेल',
  },
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('cartzy_language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('cartzy_language', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}