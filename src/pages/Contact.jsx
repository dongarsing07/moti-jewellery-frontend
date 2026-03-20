import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { sendMessage } from "../services/contactService";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await sendMessage(formData);

    console.log("Response:", res.data);

    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });

    setTimeout(() => setIsSubmitted(false), 5000);
  } catch (error) {
    console.error(error);
    alert("Failed to send message ❌");
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-playfair font-bold mb-4 text-secondary"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-textDark max-w-2xl mx-auto"
          >
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-playfair font-bold mb-6 text-secondary">Let's Connect</h2>
            <p className="text-textDark mb-8">
              Whether you have a question about our products, want to place a custom order, 
              or just want to say hello, we're here for you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-secondary">Phone</h3>
                  <p className="text-textDark">+91 7756025758</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-secondary">Email</h3>
                  <p className="text-textDark">pravinlaxmanmahale@gmail.com</p>
                  <p className="text-textDark">dongarsingpatil07@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-secondary">Visit Us</h3>
                  <p className="text-textDark">Yashraj Building, Bujalbal Mala</p>
                  <p className="text-textDark">Navnath Nagar, Near Navnath Temple</p>
                  <p className="text-textDark">Rahata (Shirdi), Dist. Ahilyanagar, Maharashtra 423107</p>
                </div>
              </div>
            </div>

            {/* Google Map - Exact coordinates */}
            <div className="mt-8 bg-soft h-64 rounded-xl overflow-hidden border-2 border-primary/20">
              <iframe 
                src="https://maps.google.com/maps?q=19.7089722,74.4840556&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Yashraj Building, Rahata"
                className="grayscale hover:grayscale-0 transition"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-primary/20"
          >
            <h2 className="text-2xl font-playfair font-bold mb-6 text-secondary">Send us a Message</h2>
            
            {isSubmitted && (
              <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-textDark">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-secondary transition"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-textDark">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-secondary transition"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-textDark">Phone Number (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-secondary transition"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-textDark">Message</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-secondary transition"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90 text-white py-3 rounded-lg font-semibold transition transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;