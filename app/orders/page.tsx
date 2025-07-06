'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingBagIcon, CalendarIcon, CurrencyRupeeIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface Order {
  id: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  deliveryLocation: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    loadOrders();
  }, [isAuthenticated, router]);

  const loadOrders = () => {
    // Mock orders data - in real app, this would come from an API
    const mockOrders: Order[] = [
      {
        id: 'ORD001',
        items: [
          {
            id: 1,
            name: 'Wireless Bluetooth Headphones',
            price: 6999,
            quantity: 1,
            image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500'
          },
          {
            id: 2,
            name: 'Smart Fitness Watch',
            price: 15999,
            quantity: 1,
            image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500'
          }
        ],
        total: 22998,
        date: '2024-01-15',
        status: 'delivered',
        deliveryLocation: 'Mumbai, Maharashtra'
      },
      {
        id: 'ORD002',
        items: [
          {
            id: 3,
            name: 'Minimalist Leather Wallet',
            price: 3699,
            quantity: 2,
            image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500'
          }
        ],
        total: 7398,
        date: '2024-01-20',
        status: 'shipped',
        deliveryLocation: 'Delhi, India'
      },
      {
        id: 'ORD003',
        items: [
          {
            id: 4,
            name: 'Organic Cotton T-Shirt',
            price: 2399,
            quantity: 3,
            image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500'
          }
        ],
        total: 7197,
        date: '2024-01-25',
        status: 'processing',
        deliveryLocation: 'Bangalore, Karnataka'
      }
    ];
    
    setOrders(mockOrders);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRefundRequest = (orderId: string) => {
    // Mock refund request - in real app, this would call an API
    alert(`Refund request submitted for order ${orderId}. You will receive an email confirmation shortly.`);
  };

  if (!isAuthenticated) {
    return null;
  }

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBagIcon className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8">
              You haven&apos;t placed any orders yet. Start shopping to see your orders here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Order Header */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order.id}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <div className="flex items-center text-lg font-bold text-purple-600">
                        <CurrencyRupeeIcon className="h-5 w-5" />
                        {order.total.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {order.items.map((item) => (
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

                  {/* Delivery Location */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-1">Delivery Location</p>
                    <p className="text-sm text-gray-600">{order.deliveryLocation}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {order.status === 'delivered' && (
                      <button
                        onClick={() => handleRefundRequest(order.id)}
                        className="flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 font-medium"
                      >
                        <ArrowPathIcon className="h-4 w-4 mr-2" />
                        Request Refund
                      </button>
                    )}
                    <button className="flex items-center justify-center px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors duration-200 font-medium">
                      Track Order
                    </button>
                    <button className="flex items-center justify-center px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium">
                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}