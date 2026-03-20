import React from 'react';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { categories, products } from '../data/products';

const Home = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <div>
      <Hero />

      {/* Categories Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold mb-4 text-primary">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our exquisite collection of handcrafted Moti jewellery, 
            each piece telling its own unique story.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-pinkLight">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold mb-4 text-primary">Featured Collections</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most loved pieces, crafted with precision and passion
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Traditional Craft Section - Image Removed */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-playfair font-bold mb-6 text-primary">
            Preserving Tradition, <br />One Bead at a Time
          </h2>
          <p className="text-gray-600 mb-8">
            Each piece of Moti jewellery is meticulously handcrafted by skilled artisans 
            who have inherited this art through generations. We take pride in preserving 
            this beautiful tradition while adding contemporary touches.
          </p>
          <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-soft p-4 rounded-xl">
              <h3 className="text-3xl font-bold text-primary">12+</h3>
              <p className="text-gray-600">Years of Tradition</p>
            </div>
            <div className="bg-soft p-4 rounded-xl">
              <h3 className="text-3xl font-bold text-primary">200+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="bg-soft p-4 rounded-xl">
              <h3 className="text-3xl font-bold text-primary">100%</h3>
              <p className="text-gray-600">Handcrafted</p>
            </div>
            <div className="bg-soft p-4 rounded-xl">
              <h3 className="text-3xl font-bold text-primary">24/7</h3>
              <p className="text-gray-600">Customer Support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;