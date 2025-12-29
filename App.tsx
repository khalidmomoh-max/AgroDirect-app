
import React, { useState, useCallback } from 'react';
import { View, User, UserRole, Product, CartItem } from './types';
import Navbar from './components/Navbar';
import Marketplace from './views/Marketplace';
import FarmerDashboard from './views/FarmerDashboard';
import Checkout from './views/Checkout';
// Fix: Added missing ShoppingCart import from lucide-react
import { CheckCircle2, Home, ArrowLeft, ShoppingCart } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setView] = useState<View>('marketplace');
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 'u1',
    name: 'Sade Adebayo',
    role: UserRole.FARMER, // Default to farmer for demo purposes
    location: 'Lagos',
    phone: '+2348000000000'
  });
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item);
      }
      return [...prev, { ...product, cartQuantity: 1 }];
    });
  }, []);

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, q: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, cartQuantity: q } : item));
  };

  const handleCheckoutComplete = () => {
    setCart([]);
    setShowSuccess(true);
    setView('home');
  };

  const renderView = () => {
    if (showSuccess) {
      return (
        <div className="max-w-xl mx-auto py-20 px-4 text-center animate-in fade-in zoom-in duration-300">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Order Successful!</h1>
          <p className="text-gray-500 mb-8">Your order has been sent to the farmer. They will contact you shortly to arrange delivery.</p>
          <button 
            onClick={() => { setShowSuccess(false); setView('marketplace'); }}
            className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-100"
          >
            Back to Marketplace
          </button>
        </div>
      );
    }

    switch (currentView) {
      case 'home':
      case 'marketplace':
        return <Marketplace addToCart={addToCart} onSelectProduct={(p) => { setSelectedProduct(p); setView('product-detail'); }} />;
      case 'farmer-dashboard':
        return <FarmerDashboard />;
      case 'checkout':
        return <Checkout cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} onComplete={handleCheckoutComplete} />;
      case 'product-detail':
        if (!selectedProduct) return <Marketplace addToCart={addToCart} onSelectProduct={setSelectedProduct} />;
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <button onClick={() => setView('marketplace')} className="flex items-center gap-2 text-emerald-600 font-bold mb-6 hover:translate-x-[-4px] transition-transform">
              <ArrowLeft className="w-5 h-5" />
              Back to Results
            </button>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-[400px] md:h-full">
                  <img src={selectedProduct.imageUrl} className="w-full h-full object-cover" alt={selectedProduct.name} />
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{selectedProduct.category}</span>
                    <div className="flex items-center gap-1 text-orange-400 font-bold text-sm">
                       <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                       <span className="text-gray-500">Verified Listing</span>
                    </div>
                  </div>
                  <h1 className="text-4xl font-black text-gray-900 mb-2">{selectedProduct.name}</h1>
                  <p className="text-gray-500 text-lg leading-relaxed mb-8">{selectedProduct.description}</p>
                  
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-4xl font-black text-emerald-600">₦{selectedProduct.price.toLocaleString()}</span>
                    <span className="text-gray-400 font-bold">/ {selectedProduct.unit}</span>
                  </div>

                  <div className="space-y-4 pt-8 border-t border-gray-100">
                    <button 
                      onClick={() => { addToCart(selectedProduct); setView('checkout'); }}
                      className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95"
                    >
                      Buy Now
                    </button>
                    <button 
                      onClick={() => addToCart(selectedProduct)}
                      className="w-full bg-emerald-50 text-emerald-600 py-5 rounded-2xl font-black text-lg hover:bg-emerald-100 transition-all"
                    >
                      Add to Basket
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Marketplace addToCart={addToCart} onSelectProduct={setSelectedProduct} />;
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar 
        currentView={currentView} 
        setView={(v) => { setView(v); setShowSuccess(false); }} 
        user={currentUser} 
        cartCount={cart.reduce((s, i) => s + i.cartQuantity, 0)} 
      />
      <main>
        {renderView()}
      </main>
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
        <button onClick={() => setView('marketplace')} className={`flex flex-col items-center gap-1 ${currentView === 'marketplace' ? 'text-emerald-600' : 'text-gray-400'}`}>
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold">Market</span>
        </button>
        <button onClick={() => setView('farmer-dashboard')} className={`flex flex-col items-center gap-1 ${currentView === 'farmer-dashboard' ? 'text-emerald-600' : 'text-gray-400'}`}>
          <CheckCircle2 className="w-6 h-6" />
          <span className="text-[10px] font-bold">My Hub</span>
        </button>
        <button onClick={() => setView('checkout')} className={`flex flex-col items-center gap-1 ${currentView === 'checkout' ? 'text-emerald-600' : 'text-gray-400'}`}>
          <ShoppingCart className="w-6 h-6" />
          <span className="text-[10px] font-bold">Cart</span>
        </button>
      </div>
    </div>
  );
};

export default App;
