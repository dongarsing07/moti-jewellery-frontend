import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import { motion } from 'framer-motion';

const CategoryPage = () => {
  const { slug } = useParams();
  
  // Convert slug to category name format
  const categoryName = slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  const categoryProducts = products.filter(p => p.category === categoryName);
  const category = categories.find(c => c.slug === slug);

  return (
    <div className="pt-20 min-h-screen bg-pinkBg">
      {/* Category Header */}
      <div className="relative h-48 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
        <h1 className="text-4xl font-playfair font-bold text-white">{categoryName}</h1>
      </div>

      {/* Category Description (NEW) */}
      {category?.description && (
        <div className="max-w-3xl mx-auto text-center my-8 px-4">
          <p className="text-textDark/80 text-lg leading-relaxed">
            {category.description}
          </p>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Product Image */}
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square bg-gray-200">
                    {product.images && product.images[0] ? (
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.log("Image failed to load:", product.images[0]);
                          e.target.style.display = 'none';
                          e.target.parentNode.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">Image not found</div>';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-500">No image</span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-playfair font-semibold mb-2 hover:text-secondary transition">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-textDark/70 text-sm mb-3">
                    {product.description}
                  </p>
                  <Link 
                    to={`/product/${product.id}`}
                    className="inline-block bg-primary/10 hover:bg-secondary text-secondary hover:text-white px-4 py-2 rounded-lg transition text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-textDark text-lg">No products found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;