'use client';

import Image from 'next/image';
import { useCart, CartItem as CartItemType } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { t } = useLanguage();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          ₹{item.price.toLocaleString()} each
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {t(item.category.toLowerCase())}
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            <MinusIcon className="h-4 w-4 text-gray-600" />
          </button>
          
          <span className="w-8 text-center font-medium text-gray-900">
            {item.quantity}
          </span>
          
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            <PlusIcon className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold text-gray-900">
            ₹{(item.price * item.quantity).toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 transform hover:scale-110"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}