import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import CustomOrder from './pages/CustomOrder';
import ReviewsPage from './pages/ReviewsPage';
import ColorCustomizerPage from './pages/ColorCustomizerPage';
import WhatsAppButton from './components/WhatsAppButton';
import ParticleBackground from './components/ParticleBackground';
import AuthPage from './pages/AuthPage';
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from './admin/AdminDashboard';
import AddProduct from './admin/AddProduct';
import Productmanage from './admin/ProductManage';
import WriteReview from './components/WriteReview'

// New pages for ordering
import Cart from './pages/Cart';               // optional – if you have a cart page
import Checkout from './pages/Checkout';       // checkout page (protected)
import MyOrders from './pages/MyOrders';       // order history (protected)

function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pinkBg to-soft relative">
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow"
          >
            <Routes location={location}>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/custom-order" element={<CustomOrder />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/color-customizer" element={<ColorCustomizerPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/add" element={<AddProduct />} />
                <Route path="/admin/manage" element={<Productmanage />} />
              <Route path="/write-review/:productId" element={<WriteReview />} />

              {/* Optional: Cart (can be public) */}
              <Route path="/cart" element={<Cart />} />

              {/* Protected routes (require login) */}
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-orders"
                element={
                  <ProtectedRoute>
                    <MyOrders />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </motion.main>
        </AnimatePresence>
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;