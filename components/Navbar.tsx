
import React from 'react';
import { View, UserRole, User } from '../types';
import { ShoppingCart, LayoutDashboard, Store, User as UserIcon, LogOut, Menu } from 'lucide-react';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
  user: User | null;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, user, cartCount }) => {
  return (
    <nav className="sticky top-0 z-50 bg-emerald-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <div className="bg-white p-1.5 rounded-lg">
              <Store className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-xl font-bold tracking-tight">AgroDirect</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => setView('marketplace')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'marketplace' ? 'bg-emerald-700' : 'hover:bg-emerald-500'}`}>
              Marketplace
            </button>
            {user?.role === UserRole.FARMER && (
              <button onClick={() => setView('farmer-dashboard')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'farmer-dashboard' ? 'bg-emerald-700' : 'hover:bg-emerald-500'}`}>
                Farmer Hub
              </button>
            )}
            {user?.role === UserRole.ADMIN && (
              <button onClick={() => setView('admin')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'admin' ? 'bg-emerald-700' : 'hover:bg-emerald-500'}`}>
                Admin
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setView('checkout')} className="relative p-2 hover:bg-emerald-500 rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-emerald-600">
                  {cartCount}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center gap-3 border-l border-emerald-500 pl-4 ml-2">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-semibold leading-none">{user.name}</p>
                  <p className="text-[10px] text-emerald-200">{user.role}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center">
                  <UserIcon className="w-5 h-5" />
                </div>
              </div>
            ) : (
              <button className="bg-white text-emerald-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-emerald-50 transition-colors shadow-sm">
                Login
              </button>
            )}
            
            <button className="md:hidden p-2 hover:bg-emerald-500 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
