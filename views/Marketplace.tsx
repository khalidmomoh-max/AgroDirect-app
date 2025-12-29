
import React, { useState, useMemo } from 'react';
import { Product, Category, CartItem } from '../types';
import { MOCK_PRODUCTS, NIGERIA_LOCATIONS } from '../constants';
import { Search, MapPin, Filter, ShoppingCart, Star, ChevronRight } from 'lucide-react';

interface MarketplaceProps {
  addToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ addToCart, onSelectProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const categories = ['All', ...Object.values(Category)];

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchLocation = selectedLocation === 'All' || p.location === selectedLocation;
      return matchSearch && matchCategory && matchLocation;
    });
  }, [searchTerm, selectedCategory, selectedLocation]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search products (yam, tomatoes...)"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none transition-all"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="All">All Regions (Nigeria)</option>
                {NIGERIA_LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as Category | 'All')}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-emerald-100">
            <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                <Star className="w-3.5 h-3.5 text-orange-400 fill-current" />
                <span className="text-xs font-bold text-gray-700">{product.rating}</span>
              </div>
              <div className="absolute bottom-3 left-3">
                <span className="bg-emerald-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md tracking-wider">
                  {product.category}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{product.name}</h3>
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                <MapPin className="w-3 h-3" />
                <span>{product.location} • By {product.farmerName}</span>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-xl font-extrabold text-emerald-600">₦{product.price.toLocaleString()}</span>
                  <span className="text-gray-400 text-[10px] ml-1">/ {product.unit}</span>
                </div>
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white p-2.5 rounded-xl transition-all active:scale-95"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No products found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
