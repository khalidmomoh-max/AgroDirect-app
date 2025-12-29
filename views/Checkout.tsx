
import React, { useState } from 'react';
import { CartItem } from '../types';
import { CreditCard, Truck, ShieldCheck, MapPin, Trash2, ArrowRight } from 'lucide-react';

interface CheckoutProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, q: number) => void;
  onComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, removeFromCart, updateQuantity, onComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.cartQuantity), 0);
  const deliveryFee = subtotal > 0 ? 2500 : 0;
  const total = subtotal + deliveryFee;

  const handlePaystackPayment = () => {
    setIsProcessing(true);
    // Simulate Paystack popup and response delay
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2500);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Truck className="w-12 h-12 text-gray-300" />
        </div>
        <h2 className="text-2xl font-black mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Go to the marketplace and find some fresh produce!</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-black mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-lg font-bold">Shopping Cart</h2>
              <span className="text-emerald-600 font-bold text-sm">{cart.length} items</span>
            </div>
            <div className="divide-y divide-gray-50">
              {cart.map(item => (
                <div key={item.id} className="p-6 flex gap-4">
                  <img src={item.imageUrl} className="w-20 h-20 rounded-xl object-cover" alt={item.name} />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="font-bold text-emerald-600">₦{(item.price * item.cartQuantity).toLocaleString()}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Farmer: {item.farmerName}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.cartQuantity - 1))}
                          className="w-6 h-6 flex items-center justify-center font-bold text-emerald-600 hover:bg-emerald-100 rounded transition-colors"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold min-w-[20px] text-center">{item.cartQuantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-emerald-600 hover:bg-emerald-100 rounded transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold">Delivery Address</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="Full Name" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
              <input placeholder="Phone Number" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
              <input placeholder="Street Address" className="w-full md:col-span-2 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-emerald-50 p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Delivery Fee (Lagos)</span>
                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>
              <div className="h-px bg-gray-50 my-4" />
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total Amount</span>
                <span className="text-2xl font-black text-emerald-600">₦{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={handlePaystackPayment}
                disabled={isProcessing}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
              >
                {isProcessing ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Secure Pay with Paystack
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-2 py-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Secured & Verified Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
