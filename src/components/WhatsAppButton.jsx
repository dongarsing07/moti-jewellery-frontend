import React, { useState } from 'react';
import { MessageCircle, X, Send, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const phoneNumber = "7756025758"; // Your WhatsApp number with country code

  const handleSendMessage = () => {
    if (message.trim()) {
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
      setMessage('');
      setIsOpen(false);
    }
  };

  const quickMessages = [
    "Hi, I'm interested in your Moti jewellery",
    "Do you have custom order options?",
    "Can you share more photos of your products?",
    "What's the delivery time?",
    "Do you ship internationally?"
  ];

  return (
    <>
      {/* WhatsApp Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50 group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          1
        </span>
      </motion.button>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-8 w-80 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <h3 className="font-semibold">Chat with us</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-1 rounded-full transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-white/80 mt-1">
                Typically replies within 1 hour
              </p>
            </div>

            {/* Body */}
            <div className="p-4">
              <div className="mb-4">
                <p className="text-sm text-textDark/60 mb-2">Quick messages:</p>
                <div className="space-y-2">
                  {quickMessages.map((msg, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(msg)}
                      className="w-full text-left text-sm p-2 bg-soft hover:bg-primary/10 rounded-lg transition flex items-center justify-between group"
                    >
                      <span className="text-textDark">{msg}</span>
                      <ChevronRight className="w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 transition" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:border-secondary text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-textDark/40 text-center mt-3">
                By chatting you agree to our Terms & Privacy
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppButton;