import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Share2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ColorCustomizer from './ColorCustomizerPage';
import Reviews from './ReviewsPage';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  const [selectedImage, setSelectedImage] = useState(0);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [customization, setCustomization] = useState(null);
  const [showContactOptions, setShowContactOptions] = useState(false);

  if (!product) {
    return (
      <div className="pt-20 text-center py-20">
        <h2 className="text-2xl">Product not found</h2>
        <Link to="/shop" className="text-primary hover:underline mt-4 inline-block">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleCustomizationChange = (options) => {
    setCustomization(options);
  };

  const getMessageText = () => {
    return `Hi, I'm interested in ${product.name}
Link: ${window.location.href}

${customization ? `Customization:
- Metal: ${customization.metal}
- Pearl: ${customization.pearl}
${customization.stone !== 'none' ? `- Stone: ${customization.stone}` : ''}` : ''}`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/917756025758?text=${encodeURIComponent(getMessageText())}`,
      '_blank'
    );
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-pinkBg to-soft">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/" className="text-gray-500 hover:text-secondary">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/shop" className="text-gray-500 hover:text-secondary">Shop</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-secondary">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT - IMAGES */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-soft shadow-lg group">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={() => setSelectedImage(prev => Math.max(0, prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft />
                  </button>

                  <button 
                    onClick={() => setSelectedImage(prev => Math.min(product.images.length - 1, prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}

              {/* Share & WhatsApp */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={handleShare} className="bg-white p-2 rounded-full shadow">
                  <Share2 className="w-4 h-4 text-secondary" />
                </button>

                <button onClick={handleWhatsApp} className="bg-green-500 p-2 rounded-full shadow">
                  <MessageCircle className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-secondary' : ''
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">

            <div>
              <h1 className="text-4xl font-bold text-secondary">{product.name}</h1>
              <p className="text-gray-500">{product.category}</p>
            </div>

            <p>{product.description}</p>

            {/* Stock */}
            <p className={product.inStock ? "text-green-600" : "text-red-600"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>

            {/* Customizer */}
            <button onClick={() => setShowCustomizer(!showCustomizer)} className="flex items-center text-secondary">
              <Sparkles className="mr-2" /> Customize
            </button>

            {showCustomizer && (
              <ColorCustomizer product={product} onColorChange={handleCustomizationChange} />
            )}

            {/* Contact Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                onClick={() => setShowContactOptions(true)}
                className="flex-1 bg-secondary text-white py-4 rounded-xl"
              >
                Contact for Price
              </button>

              <button className="p-4 border-2 border-secondary text-secondary rounded-xl">
                <Heart />
              </button>
            </div>

            {/* WhatsApp Quick */}
            <button
              onClick={handleWhatsApp}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Chat on WhatsApp
            </button>

          </motion.div>
        </div>

        {/* CONTACT MODAL */}
        {showContactOptions && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-80 text-center shadow-xl">

              <h2 className="text-xl font-bold mb-4 text-secondary">Contact Seller</h2>

              <a href="tel:7756025758" className="block bg-blue-500 text-white py-3 rounded-lg mb-3">
                📞 Call Now
              </a>

              <a
                href={`https://wa.me/917756025758?text=${encodeURIComponent(getMessageText())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-green-500 text-white py-3 rounded-lg mb-3"
              >
                💬 WhatsApp
              </a>

              <a
                href={`sms:7756025758?body=${encodeURIComponent(getMessageText())}`}
                className="block bg-gray-500 text-white py-3 rounded-lg mb-3"
              >
                ✉️ SMS
              </a>

              <a
                href={`mailto:pravinlaxmanmahale@gmail.com?subject=${encodeURIComponent(product.name)}&body=${encodeURIComponent(getMessageText())}`}
                className="block bg-purple-500 text-white py-3 rounded-lg mb-3"
              >
                📧 Email
              </a>

              <button
                onClick={() => setShowContactOptions(false)}
                className="mt-2 text-gray-500"
              >
                Cancel
              </button>

            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-16">
          {/* Header with Write Review button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-secondary">Customer Reviews</h2>
            <Link
              to={`/write-review/${product.id}`}
              className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition inline-flex items-center"
            >
              Write a Review
            </Link>
          </div>
          <Reviews productId={product.id} />
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;