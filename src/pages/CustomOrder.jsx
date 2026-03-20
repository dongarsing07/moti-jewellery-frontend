import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Upload, Sparkles, Check } from 'lucide-react';
import { createCustomOrder } from "../services/customOrderService";
import API from "../api";


const CustomOrder = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jewelleryType: '',
    description: '',
    budget: '',
    reference: '',
    deadline: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const jewelleryTypes = [
    "Mangalsutra",
    "Traditional Nath",
    "Necklace Set",
    "Bangles",
    "Earrings",
    "Maang Tikka",
    "Braclet",
    "Paijan",
    "Invisible set",
    "Mundavlya",
    "Hair Accessiories",
    "Nose Ring",
    "Kashmiri Watch",
    "Haath ful",
    "Chokar set",
    "Baby Shower Set",
    "Other"
  ];

  const budgetRanges = [
    "Under ₹250",
    "₹250 - ₹500",
    "₹500 - ₹1000",
    "₹1000 - ₹1500",
    "Above ₹1500"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleFileChange = (e) => {
  if (e.target.files[0]) {
    setSelectedFile(e.target.files[0]); // ✅ NOT .name
  }
};
const handleSubmit = async (e) => {
  e.preventDefault();
   console.log("🔥 Submit clicked");
  try {
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("jewelleryType", formData.jewelleryType);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("budget", formData.budget);
    formDataToSend.append("deadline", formData.deadline);

    if (selectedFile) {
      formDataToSend.append("referenceImage", selectedFile);
    }

    const res = await API.post("/custom-orders", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Backend Response:", res.data);

    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        jewelleryType: '',
        description: '',
        budget: '',
        reference: '',
        deadline: ''
      });
      setSelectedFile(null);
    }, 5000);

  } catch (error) {
  console.log("❌ FULL ERROR:", error);
  console.log("❌ MESSAGE:", error?.message);
  console.log("❌ RESPONSE:", error?.response);

  alert("Failed to submit ❌");
}
};
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-pinkBg to-soft">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-secondary py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern-bg.jpg')] bg-repeat"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
              Design Your Dream Jewellery
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Tell us your vision, and our artisans will bring it to life with love and craftsmanship
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-primary/20">
              <h2 className="text-3xl font-playfair font-bold mb-6 text-secondary">
                Why Choose Custom?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Sparkles className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Unique Design</h3>
                    <p className="text-textDark/70">Get a one-of-a-kind piece that reflects your personal style</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <span className="text-2xl">💎</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Choose Your Materials</h3>
                    <p className="text-textDark/70">Select from premium Moti pearls, stones, and metals</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <span className="text-2xl">✍️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Personal Touch</h3>
                    <p className="text-textDark/70">Add initials, special symbols, or birthstones</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <span className="text-2xl">👩‍🎨</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Expert Craftsmanship</h3>
                    <p className="text-textDark/70">Made by skilled artisans with 50+ years of tradition</p>
                  </div>
                </div>
              </div>

              {/* Process Steps */}
              <div className="mt-8 pt-8 border-t border-primary/10">
                <h3 className="font-semibold text-lg mb-4">How It Works:</h3>
                <div className="flex items-center justify-between">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="text-center">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-1">
                        <span className="text-sm font-bold text-secondary">{step}</span>
                      </div>
                      <p className="text-xs text-textDark/60">
                        {step === 1 && "Share Idea"}
                        {step === 2 && "Discuss"}
                        {step === 3 && "Create"}
                        {step === 4 && "Deliver"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-primary/20">
              <h2 className="text-2xl font-playfair font-bold mb-6 text-secondary">
                Tell Us Your Vision
              </h2>

              {isSubmitted && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                  <Check className="w-5 h-5 mr-2" />
                  Thank you! We'll contact you within 24 hours.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-textDark">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-secondary transition"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-textDark">Email Address *</label>
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

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-textDark">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-secondary transition"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Jewellery Type */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-textDark">Jewellery Type *</label>
                  <select
                    name="jewelleryType"
                    required
                    value={formData.jewelleryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-secondary transition"
                  >
                    <option value="">Select type</option>
                    {jewelleryTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-textDark">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-secondary transition"
                  >
                    <option value="">Select budget</option>
                    {budgetRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-textDark">Describe Your Idea *</label>
                  <textarea
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-secondary transition"
                    placeholder="Tell us about your dream jewellery... (design, colors, stones, occasion, etc.)"
                  />
                </div>

                {/* Reference Image Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-textDark">Reference Image (Optional)</label>
                  <div className="relative">
                    <input
  type="file"
  accept="image/*"
  name="referenceImage"  // ✅ FIXED
  onChange={handleFileChange}
  className="w-full px-4 py-3 border border-primary/20 rounded-lg ..."
/>
                  </div>
                  {selectedFile && (
                    <p className="text-sm text-textDark/60 mt-1">Selected: {selectedFile}</p>
                  )}
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-textDark">Expected Delivery Date (Optional)</label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-secondary transition"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary/90 text-white py-4 rounded-xl font-semibold transition transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Custom Request</span>
                </button>

                <p className="text-xs text-textDark/60 text-center">
                  We'll get back to you within 24 hours to discuss your design
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CustomOrder;