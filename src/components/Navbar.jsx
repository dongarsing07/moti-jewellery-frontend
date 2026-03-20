import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, Heart, Sparkles, Palette, MessageCircle, Star, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/products';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage and listen for changes
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }

    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        if (e.newValue) {
          try {
            setUser(JSON.parse(e.newValue));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    // Optionally clear other user-related state (cart, wishlist) here
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.2 }
    }
  };

  const iconHoverVariants = {
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.2 } }
  };

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-pinkLight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-3xl font-playfair font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Moti
              </span>
              <span className="text-2xl font-playfair text-secondary group-hover:text-primary transition">
                Heritage
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div whileHover={{ y: -2 }}>
              <Link to="/" className="text-textDark hover:text-primary transition font-medium relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link to="/shop" className="text-textDark hover:text-primary transition font-medium relative group">
                Shop
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
            
            {/* Categories Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <motion.button 
                className="text-textDark hover:text-primary transition font-medium flex items-center"
                whileHover={{ y: -2 }}
              >
                Categories
                <motion.svg 
                  className="w-4 h-4 ml-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: showCategories ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>
              <AnimatePresence>
                {showCategories && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-pinkLight overflow-hidden"
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.slug}`}
                        className="block px-4 py-2 hover:bg-soft hover:text-primary text-textDark transition"
                      >
                        {cat.name} ({cat.count})
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Features Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setShowFeatures(true)}
              onMouseLeave={() => setShowFeatures(false)}
            >
              <motion.button 
                className="text-textDark hover:text-primary transition font-medium flex items-center"
                whileHover={{ y: -2 }}
              >
                Features
                <motion.svg 
                  className="w-4 h-4 ml-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: showFeatures ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>
              <AnimatePresence>
                {showFeatures && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-pinkLight overflow-hidden"
                  >
                    <Link to="/custom-order" className="block px-4 py-3 hover:bg-soft hover:text-primary text-textDark border-b border-pinkLight">
                      <div className="flex items-center">
                        <Sparkles className="w-5 h-5 mr-3 text-secondary" />
                        <div>
                          <p className="font-medium">Custom Order</p>
                          <p className="text-xs text-textDark/60">Design your own piece</p>
                        </div>
                      </div>
                    </Link>
                    <Link to="/color-customizer" className="block px-4 py-3 hover:bg-soft hover:text-primary text-textDark border-b border-pinkLight">
                      <div className="flex items-center">
                        <Palette className="w-5 h-5 mr-3 text-secondary" />
                        <div>
                          <p className="font-medium">Color Customizer</p>
                          <p className="text-xs text-textDark/60">Choose your colors</p>
                        </div>
                      </div>
                    </Link>
                    <Link to="/reviews" className="block px-4 py-3 hover:bg-soft hover:text-primary text-textDark">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 mr-3 text-secondary" />
                        <div>
                          <p className="font-medium">Customer Reviews</p>
                          <p className="text-xs text-textDark/60">See what others say</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div whileHover={{ y: -2 }}>
              <Link to="/about" className="text-textDark hover:text-primary transition font-medium relative group">
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -2 }}>
              <Link to="/contact" className="text-textDark hover:text-primary transition font-medium relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
          </div>

          {/* Icons + User Info (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-textDark font-medium">Hi, {user.name || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="text-textDark hover:text-primary transition font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <motion.div variants={iconHoverVariants} whileHover="hover">
                <Link to="/auth" className="p-2 hover:text-primary transition relative">
                  <User className="w-5 h-5 text-textDark hover:text-primary" />
                </Link>
              </motion.div>
            )}
            <motion.div variants={iconHoverVariants} whileHover="hover">
              <Link to="/wishlist" className="p-2 hover:text-primary transition relative">
                <Heart className="w-5 h-5 text-textDark hover:text-primary" />
              </Link>
            </motion.div>
            <motion.div variants={iconHoverVariants} whileHover="hover">
              <Link to="/cart" className="p-2 hover:text-primary transition relative">
                <ShoppingBag className="w-5 h-5 text-textDark hover:text-primary" />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button 
            className="md:hidden text-primary" 
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden overflow-hidden border-t border-pinkLight"
            >
              <div className="py-4">
                <Link to="/" className="block py-2 text-textDark hover:text-primary">Home</Link>
                <Link to="/shop" className="block py-2 text-textDark hover:text-primary">Shop</Link>
                
                {/* Mobile Categories */}
                <div className="pl-4 border-l-2 border-primary/20 ml-2 my-2">
                  <p className="text-xs text-textDark/60 mb-1">CATEGORIES</p>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      className="block py-1 text-textDark hover:text-primary"
                    >
                      {cat.name} ({cat.count})
                    </Link>
                  ))}
                </div>

                {/* Mobile Features */}
                <div className="pl-4 border-l-2 border-secondary/20 ml-2 my-2">
                  <p className="text-xs text-textDark/60 mb-1">FEATURES</p>
                  <Link to="/custom-order" className="block py-2 text-textDark hover:text-primary flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-secondary" />
                    Custom Order
                  </Link>
                  <Link to="/color-customizer" className="block py-2 text-textDark hover:text-primary flex items-center">
                    <Palette className="w-4 h-4 mr-2 text-secondary" />
                    Color Customizer
                  </Link>
                  <Link to="/reviews" className="block py-2 text-textDark hover:text-primary flex items-center">
                    <Star className="w-4 h-4 mr-2 text-secondary" />
                    Customer Reviews
                  </Link>
                </div>

                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block py-2 text-textDark hover:text-primary flex items-center"
                >
                  <MessageCircle className="w-4 h-4 mr-2 text-green-500" />
                  WhatsApp Chat
                </a>

                {/* Mobile User / Auth */}
                {user ? (
                  <>
                    <div className="flex items-center py-2 text-textDark">
                      <User className="w-4 h-4 mr-2 text-secondary" />
                      <span>Hi, {user.name || user.email}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block py-2 text-textDark hover:text-primary flex items-center w-full text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/auth" className="block py-2 text-textDark hover:text-primary flex items-center">
                    <User className="w-4 h-4 mr-2 text-secondary" />
                    Login / Sign Up
                  </Link>
                )}

                <Link to="/about" className="block py-2 text-textDark hover:text-primary">About Us</Link>
                <Link to="/contact" className="block py-2 text-textDark hover:text-primary">Contact</Link>
                
                <div className="flex items-center space-x-4 pt-4 mt-2 border-t border-pinkLight">
                  <Link to="/wishlist" className="flex items-center text-textDark hover:text-primary">
                    <Heart className="w-5 h-5 mr-1" />
                    <span>Wishlist</span>
                  </Link>
                  <Link to="/cart" className="flex items-center text-textDark hover:text-primary">
                    <ShoppingBag className="w-5 h-5 mr-1" />
                    <span>Cart (0)</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;