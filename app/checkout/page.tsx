'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircleIcon, ShoppingBagIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber] = useState(() => Math.random().toString(36).substr(2, 9).toUpperCase());
  
  // Delivery form state
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleCheckout = async () => {
    if (!deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.state || !deliveryInfo.pincode) {
      alert('Please fill in all delivery details');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
  };

  if (!isAuthenticated) {
    return null;
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div>
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <ShoppingBagIcon className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No items to checkout</h2>
            <p className="text-gray-600 mb-8">
              Add some items to your cart before proceeding to checkout.
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium transform hover:scale-105 shadow-lg"
            >
              {t('continueShopping')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div>
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <CheckCircleIcon className="h-24 w-24 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
            <p className="text-gray-600 mb-2">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <p className="text-lg font-semibold text-purple-600 mb-8">
              Order Number: #{orderNumber}
            </p>
            <div className="space-y-4">
              <p className="text-gray-600">
                You will receive a confirmation email shortly with your order details.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/orders"
                  className="inline-flex items-center bg-purple-100 text-purple-600 px-6 py-3 rounded-xl hover:bg-purple-200 transition-all duration-200 font-medium"
                >
                  View Orders
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium transform hover:scale-105 shadow-lg"
                >
                  {t('continueShopping')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('orderSummary')}</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between text-lg font-bold text-gray-900">
                <span>{t('total')}</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Delivery Information */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <MapPinIcon className="h-6 w-6 mr-2 text-purple-600" />
                {t('deliveryLocation')}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    value={deliveryInfo.address}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your full address"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={deliveryInfo.city}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, city: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      value={deliveryInfo.state}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, state: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="State"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={deliveryInfo.pincode}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, pincode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Pincode"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('paymentInformation')}</h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('emailAddress')}
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="123"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105 shadow-lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    `${t('completeOrder')} - ₹${total.toLocaleString()}`
                  )}
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-4 text-center">
                This is a demo checkout. No real payment will be processed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}