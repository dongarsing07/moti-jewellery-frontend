import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Send, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ColorCustomizerPage = () => {
  const [selectedMetal, setSelectedMetal] = useState('gold');
  const [selectedPearl, setSelectedPearl] = useState('white');
  const [selectedStone, setSelectedStone] = useState('none');
  const [selectedProduct, setSelectedProduct] = useState('mangalsutra');
  const [showPreview, setShowPreview] = useState(false);

  const products = [
    { id: 'mangalsutra', name: 'Mangalsutra', image: '/src/assets/images/mayur-short-mangalsutra.png' },
    { id: 'nath', name: 'Nath', image: '/src/assets/images/ad-stone-nath.png' },
    { id: 'necklace', name: 'Necklace Set', image: '/src/assets/images/mayur-set.png' },
    { id: 'bangles', name: 'Bangles', image: '/src/assets/images/bangles.png' },
  ];

  const metalColors = [
    { id: 'gold', name: 'Gold', color: '#FFD700', bg: 'bg-yellow-500', text: 'text-yellow-800' },
    { id: 'rose', name: 'Rose Gold', color: '#B76E79', bg: 'bg-pink-400', text: 'text-pink-800' },
    { id: 'silver', name: 'Silver', color: '#C0C0C0', bg: 'bg-gray-400', text: 'text-gray-800' },
    { id: 'platinum', name: 'Platinum', color: '#E5E4E2', bg: 'bg-gray-300', text: 'text-gray-800' }
  ];

  const pearlColors = [
    { id: 'white', name: 'White Pearl', color: '#FFFFFF', bg: 'bg-white border-2 border-gray-200' },
    { id: 'cream', name: 'Cream Pearl', color: '#FFFDD0', bg: 'bg-yellow-50' },
    { id: 'pink', name: 'Pink Pearl', color: '#FFC0CB', bg: 'bg-pink-200' },
    { id: 'golden', name: 'Golden Pearl', color: '#FFD700', bg: 'bg-yellow-300' },
    { id: 'black', name: 'Black Pearl', color: '#1A1A1A', bg: 'bg-gray-800' }
  ];

  const stoneColors = [
    { id: 'none', name: 'No Stones', color: 'transparent' },
    { id: 'emerald', name: 'Emerald', color: '#50C878', bg: 'bg-green-500' },
    { id: 'ruby', name: 'Ruby', color: '#E0115F', bg: 'bg-red-500' },
    { id: 'sapphire', name: 'Sapphire', color: '#0F52BA', bg: 'bg-blue-600' },
    { id: 'amethyst', name: 'Amethyst', color: '#9966CC', bg: 'bg-purple-500' },
    { id: 'topaz', name: 'Topaz', color: '#FFC87C', bg: 'bg-orange-300' }
  ];

  const getMetalColor = () => {
    return metalColors.find(m => m.id === selectedMetal)?.color || '#FFD700';
  };

  const getPearlColor = () => {
    return pearlColors.find(p => p.id === selectedPearl)?.color || '#FFFFFF';
  };

  const getStoneColor = () => {
    return stoneColors.find(s => s.id === selectedStone)?.color || 'transparent';
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-pinkBg to-soft">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4"
          >
            Color Customizer
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90"
          >
            Choose your perfect combination of metals, pearls, and stones
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Preview */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h2 className="text-2xl font-playfair font-bold mb-4 text-secondary">Live Preview</h2>
              
              {/* Product Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-textDark">Select Product Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {products.map(product => (
                    <button
                      key={product.id}
                      onClick={() => setSelectedProduct(product.id)}
                      className={`p-2 rounded-lg transition ${
                        selectedProduct === product.id
                          ? 'bg-secondary text-white'
                          : 'bg-soft text-textDark hover:bg-primary/20'
                      }`}
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-soft mb-4">
                <img 
                  src={products.find(p => p.id === selectedProduct)?.image}
                  alt="Preview"
                  className="w-full h-full object-contain"
                  style={{
                    filter: `drop-shadow(0 10px 15px -3px rgba(0,0,0,0.1))`
                  }}
                />
                
                {/* Color Indicators */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2">
                  <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs flex items-center">
                    <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: getMetalColor() }}></span>
                    Metal
                  </div>
                  <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs flex items-center">
                    <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: getPearlColor() }}></span>
                    Pearl
                  </div>
                  {selectedStone !== 'none' && (
                    <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs flex items-center">
                      <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: getStoneColor() }}></span>
                      Stone
                    </div>
                  )}
                </div>
              </div>

              {/* Preview Button */}
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white py-2 rounded-lg transition"
              >
                {showPreview ? 'Hide Preview' : 'Show Detailed Preview'}
              </button>

              {showPreview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 bg-soft rounded-xl"
                >
                  <h3 className="font-semibold mb-2">Your Selection:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Metal: {metalColors.find(m => m.id === selectedMetal)?.name}</li>
                    <li>• Pearl: {pearlColors.find(p => p.id === selectedPearl)?.name}</li>
                    {selectedStone !== 'none' && (
                      <li>• Stone: {stoneColors.find(s => s.id === selectedStone)?.name}</li>
                    )}
                  </ul>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column - Customizer */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-playfair font-bold mb-6 text-secondary flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Customize Your Colors
              </h2>

              {/* Metal Color */}
              <div className="mb-8">
                <h3 className="font-semibold mb-3 text-textDark">Metal Color</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {metalColors.map(metal => (
                    <button
                      key={metal.id}
                      onClick={() => setSelectedMetal(metal.id)}
                      className="relative group"
                    >
                      <div className={`aspect-square rounded-lg ${metal.bg} shadow-md transform transition group-hover:scale-110 ${
                        selectedMetal === metal.id ? 'ring-4 ring-secondary scale-110' : ''
                      }`}
                        style={{ backgroundColor: metal.color }}
                      />
                      {selectedMetal === metal.id && (
                        <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-md w-5 h-5" />
                      )}
                      <p className="text-xs mt-1 text-center text-textDark">{metal.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pearl Color */}
              <div className="mb-8">
                <h3 className="font-semibold mb-3 text-textDark">Pearl Color</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {pearlColors.map(pearl => (
                    <button
                      key={pearl.id}
                      onClick={() => setSelectedPearl(pearl.id)}
                      className="relative group"
                    >
                      <div className={`aspect-square rounded-lg ${pearl.bg} shadow-md transform transition group-hover:scale-110 ${
                        selectedPearl === pearl.id ? 'ring-4 ring-secondary scale-110' : ''
                      }`}
                        style={{ backgroundColor: pearl.color }}
                      />
                      {selectedPearl === pearl.id && (
                        <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-secondary drop-shadow-md w-5 h-5" />
                      )}
                      <p className="text-xs mt-1 text-center text-textDark">{pearl.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stone Color */}
              <div className="mb-8">
                <h3 className="font-semibold mb-3 text-textDark">Stone Color</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {stoneColors.map(stone => (
                    <button
                      key={stone.id}
                      onClick={() => setSelectedStone(stone.id)}
                      className="relative group"
                    >
                      {stone.id === 'none' ? (
                        <div className={`aspect-square rounded-lg bg-gray-200 border-2 border-dashed border-gray-400 transform transition group-hover:scale-110 ${
                          selectedStone === stone.id ? 'ring-4 ring-secondary scale-110' : ''
                        } flex items-center justify-center`}>
                          <span className="text-xs text-gray-500">No</span>
                        </div>
                      ) : (
                        <div className={`aspect-square rounded-lg ${stone.bg} shadow-md transform transition group-hover:scale-110 ${
                          selectedStone === stone.id ? 'ring-4 ring-secondary scale-110' : ''
                        }`}
                          style={{ backgroundColor: stone.color }}
                        />
                      )}
                      {selectedStone === stone.id && stone.id !== 'none' && (
                        <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-md w-5 h-5" />
                      )}
                      <p className="text-xs mt-1 text-center text-textDark">{stone.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary & Action */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6">
                <h3 className="font-semibold mb-3 text-secondary">Your Custom Combination:</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-white px-3 py-1 rounded-full text-sm flex items-center">
                    <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: getMetalColor() }}></span>
                    {metalColors.find(m => m.id === selectedMetal)?.name}
                  </span>
                  <span className="bg-white px-3 py-1 rounded-full text-sm flex items-center">
                    <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: getPearlColor() }}></span>
                    {pearlColors.find(p => p.id === selectedPearl)?.name}
                  </span>
                  {selectedStone !== 'none' && (
                    <span className="bg-white px-3 py-1 rounded-full text-sm flex items-center">
                      <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: getStoneColor() }}></span>
                      {stoneColors.find(s => s.id === selectedStone)?.name}
                    </span>
                  )}
                </div>

                <div className="flex space-x-3">
                  <Link
                    to="/custom-order"
                    className="flex-1 bg-secondary hover:bg-primary text-white py-3 rounded-lg font-semibold transition transform hover:scale-105 flex items-center justify-center"
                  >
                    Request This Design
                    <Send className="w-4 h-4 ml-2" />
                  </Link>
                  <button className="px-4 py-3 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white rounded-lg transition">
                    Save
                  </button>
                </div>
              </div>

              {/* Share Options */}
              <div className="mt-6 text-center">
                <p className="text-sm text-textDark/60 mb-2">Share your creation:</p>
                <div className="flex justify-center space-x-3">
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition">
                    f
                  </button>
                  <button className="p-2 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-600 hover:text-white transition">
                    in
                  </button>
                  <button className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition">
                    wa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inspiration Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-playfair font-bold mb-6 text-secondary">Popular Combinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="text-center">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Classic Gold + White</p>
                <p className="text-xs text-textDark/60">1,234 customizations</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorCustomizerPage;