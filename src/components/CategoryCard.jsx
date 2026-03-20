import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ 
        y: -12,
        scale: 1.03,
        transition: { type: 'spring', stiffness: 300 }
      }}
      className="relative"
    >
      <Link to={`/category/${category.slug}`}>
        <div className="relative group overflow-hidden rounded-2xl shadow-lg border-2 border-pinkLight">
          <div className="aspect-square">
            <motion.img 
              src={category.image} 
              alt={category.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.6 }}
            />
          </div>
          
          {/* Gradient overlay that shifts on hover */}
          <motion.div 
            initial={{ background: 'linear-gradient(to top, rgba(180, 83, 9, 0.9), rgba(180, 83, 9, 0.4), transparent)' }}
            whileHover={{ background: 'linear-gradient(to top, rgba(180, 83, 9, 1), rgba(180, 83, 9, 0.6), transparent)' }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:translate-y-[-5px]">
              <h3 className="text-2xl font-playfair font-bold mb-1 drop-shadow-lg">
                {category.name}
              </h3>
              <p className="text-sm opacity-90 drop-shadow">
                {category.count} Designs
              </p>
            </div>
          </motion.div>

          {/* Subtle shine effect on hover */}
          <motion.div 
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;