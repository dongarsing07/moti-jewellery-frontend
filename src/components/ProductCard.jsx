import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        boxShadow: '0 20px 30px -10px rgba(0,0,0,0.15)'
      }}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-primary/20"
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container with overlay on hover */}
        <div className="relative aspect-square overflow-hidden bg-soft">
          {product.images && product.images[0] ? (
            <>
              <motion.img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/placeholder.jpg";
                }}
              />
              {/* Quick view overlay (optional) */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/20 flex items-center justify-center"
              >
                <span className="bg-white text-secondary px-4 py-2 rounded-full text-sm font-medium transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                  Quick View
                </span>
              </motion.div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-textDark">No image</span>
            </div>
          )}
          
          {/* Featured Badge with animation */}
          {product.featured && (
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
            >
              Featured
            </motion.div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-playfair font-semibold mb-2 text-textDark group-hover:text-secondary transition-colors">
            {product.name}
          </h3>
          <p className="text-textDark/70 text-sm line-clamp-2">
            {product.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;