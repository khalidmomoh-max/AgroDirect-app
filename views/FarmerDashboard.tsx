
import React, { useState } from 'react';
import { Product, Category } from '../types';
import { Plus, BarChart3, Package, Settings, Sparkles, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { getPriceRecommendation } from '../services/geminiService';

const FarmerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'listings' | 'analytics' | 'orders'>('listings');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // AI State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiRec, setAiRec] = useState<{recommendedPrice: number, reason: string} | null>(null);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState(Category.CROPS);

  const handleAiPriceRequest = async () => {
    if (!newProductName) return;
    setIsAiLoading(true);
    const result = await getPriceRecommendation(newProductName, 'Lagos', newProductCategory);
    setAiRec(result);
    setIsAiLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Farmer Hub</h1>
          <p className="text-gray-500">Manage your farm outputs and sales</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          List New Product
        </button>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Sales', value: '₦450,000', trend: '+12%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pending Orders', value: '12', trend: 'High', icon: Package, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Returning Buyers', value: '24', trend: '+5%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Store Views', value: '1,420', trend: '+18%', icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-emerald-500 text-xs font-bold">{stat.trend}</span>
            </div>
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="flex border-b">
          {['listings', 'orders', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-4 text-sm font-bold capitalize transition-all ${
                activeTab === tab 
                ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50' 
                : 'text-gray-500 hover:text-emerald-500 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'listings' && (
            <div className="space-y-4">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[1, 2, 3].map(i => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img src={`https://picsum.photos/seed/${i}/40` } className="w-10 h-10 rounded-lg" alt="" />
                          <div>
                            <p className="font-bold text-gray-900">Premium Cassava</p>
                            <p className="text-xs text-gray-400">Category: Tubers</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium">150 Units</td>
                      <td className="px-4 py-4 text-sm font-bold text-emerald-600">₦4,500</td>
                      <td className="px-4 py-4">
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Active</span>
                      </td>
                      <td className="px-4 py-4">
                        <button className="text-emerald-600 font-bold text-xs hover:underline">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black">List New Product</h2>
                <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    placeholder="e.g. Fresh Red Peppers"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                    <select 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none"
                      value={newProductCategory}
                      onChange={(e) => setNewProductCategory(e.target.value as Category)}
                    >
                      {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Price (₦)</label>
                    <input type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                  </div>
                </div>

                {/* AI Price Helper */}
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-bold text-emerald-900">AI Price Recommendation</span>
                    </div>
                    <button 
                      onClick={handleAiPriceRequest}
                      disabled={isAiLoading || !newProductName}
                      className="text-xs font-bold bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-all"
                    >
                      {isAiLoading ? 'Analyzing...' : 'Get Suggestion'}
                    </button>
                  </div>
                  
                  {aiRec ? (
                    <div className="space-y-2">
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        {aiRec.reason}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-emerald-700">₦{aiRec.recommendedPrice.toLocaleString()}</span>
                        <span className="text-[10px] bg-white text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-200">Recommended</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-emerald-400">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-[10px] font-medium">Enter product name to get AI-powered pricing advice</span>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">
                    Submit Listing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;
