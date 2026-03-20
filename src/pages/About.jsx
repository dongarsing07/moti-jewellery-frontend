import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/images/logo1.jpeg';      // Adjust path if needed
import mami from '../assets/images/mami1.jpeg';      // New artist photo

const About = () => {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-primary/20 to-secondary/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-bg.jpg')] opacity-10"></div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-playfair font-bold mb-4 text-secondary"
            >
              Our Story
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-textDark"
            >
              Preserving the legacy of traditional Moti jewellery craftsmanship
            </motion.p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-playfair font-bold mb-6 text-secondary">
              A Legacy of Love & Craftsmanship
            </h2>
            <p className="text-textDark mb-4 leading-relaxed">
              For over 12 years, our family has been devoted to the timeless art of handcrafted Moti jewellery. What began as a heartfelt passion for creating delicate pearl pieces with love and patience has blossomed into a cherished family legacy.

Each design carries the warmth of tradition, the beauty of simplicity, and the elegance of handcrafted perfection. Every pearl is carefully selected, every thread tied with intention, and every piece made to celebrate grace, culture, and individuality.
            </p>
            <p className="text-textDark mb-4 leading-relaxed">
              Every piece we create tells a story - of dedication, of tradition, and of the 
              skilled hands that bring these beautiful designs to life. We source the finest 
              Triple Coated Glass Moti (pearls) and work with local artisans who have inherited this 
              craft through centuries.
            </p>
            <p className="text-textDark leading-relaxed">
              Today, my mother continues this legacy, personally overseeing each creation 
              to ensure it meets our standards of perfection. We're not just creating jewellery; 
              we're preserving a piece of our cultural heritage.
            </p>
          </motion.div>

          {/* Logo - no square styling */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-96 flex items-center justify-center"
          >
            <img 
              src={logo} 
              alt="Kalanand Moti Logo" 
              className="max-h-full max-w-full object-contain"
            />
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-primary/20">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🕊️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-secondary">Traditional Craft</h3>
            <p className="text-textDark">Authentic techniques passed down through generations</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-primary/20">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💎</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-secondary">Quality Materials</h3>
            <p className="text-textDark">Only the finest Moti and materials used in every piece</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-primary/20">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">❤️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-secondary">Made with Love</h3>
            <p className="text-textDark">Each piece crafted with care and attention to detail</p>
          </div>
        </div>

        {/* Meet the Artisan - with new photo mami.jpeg */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12 text-center border border-primary/20">
          <h2 className="text-3xl font-playfair font-bold mb-4 text-secondary">
            Meet the Artist
          </h2>

          <p className="text-textDark max-w-3xl mx-auto mb-8">
            My mother, the heart and soul behind every creation, has spent over 12 years 
            perfecting the art of Moti jewellery. Her passion and dedication shine through 
            in every piece she designs and creates.
          </p>

          <div className="w-48 h-48 rounded-full mx-auto border-4 border-primary overflow-hidden shadow-lg">
            <img
              src={mami}
              alt="Meet the Artist - Mami"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;