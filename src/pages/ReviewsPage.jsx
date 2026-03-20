import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Camera, Heart, MessageCircle, ChevronRight, Filter } from 'lucide-react';

const ReviewsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      date: "2 days ago",
      comment: "Absolutely beautiful piece! The craftsmanship is exquisite and it looks even better in person. My husband loved it on our anniversary.",
      product: "Mayur Short Mangalsutra",
      productImage: "/src/assets/images/mayur-short-mangalsutra.png",
      userImage: `https://ui-avatars.com/api/?name=Priya+Sharma&background=8B5A2B&color=fff`,
      likes: 24,
      verified: true
    },
    {
      id: 2,
      name: "Rahul Mehta",
      rating: 5,
      date: "1 week ago",
      comment: "Bought this for my mother and she hasn't stopped wearing it. The Moti pearls are of excellent quality. Thank you Moti Heritage!",
      product: "Saraswati Mangalsutra",
      productImage: "/src/assets/images/saraswati-mangalsutra.png",
      userImage: `https://ui-avatars.com/api/?name=Rahul+Mehta&background=8B5A2B&color=fff`,
      likes: 18,
      verified: true
    },
    {
      id: 3,
      name: "Neha Patil",
      rating: 4,
      date: "2 weeks ago",
      comment: "Very elegant design. The gold plating is perfect and the pearls have a nice luster. Slight delay in delivery but worth the wait.",
      product: "Chandra Mangalsutra Set",
      productImage: "/src/assets/images/chandra-set.png",
      userImage: `https://ui-avatars.com/api/?name=Neha+Patil&background=8B5A2B&color=fff`,
      likes: 12,
      verified: true
    },
    {
      id: 4,
      name: "Amit Kumar",
      rating: 5,
      date: "3 weeks ago",
      comment: "The Ad Stone Nath is stunning! My wife loved it for our wedding. The stones are genuine and the pearls are beautiful.",
      product: "Ad Stone Nath",
      productImage: "/src/assets/images/ad-stone-nath.png",
      userImage: `https://ui-avatars.com/api/?name=Amit+Kumar&background=8B5A2B&color=fff`,
      likes: 31,
      verified: true
    },
    {
      id: 5,
      name: "Sneha Desai",
      rating: 5,
      date: "1 month ago",
      comment: "The Mayur Set is absolutely gorgeous! Received so many compliments at my sister's wedding. The craftsmanship is top-notch.",
      product: "Mayur Set",
      productImage: "/src/assets/images/mayur-set.png",
      userImage: `https://ui-avatars.com/api/?name=Sneha+Desai&background=8B5A2B&color=fff`,
      likes: 45,
      verified: true
    },
    {
      id: 6,
      name: "Vikram Singh",
      rating: 4,
      date: "1 month ago",
      comment: "Good quality bangles. The pearl work is intricate and the gold plating is even. Would definitely recommend.",
      product: "Traditional Moti Bangles",
      productImage: "/src/assets/images/bangles.png",
      userImage: `https://ui-avatars.com/api/?name=Vikram+Singh&background=8B5A2B&color=fff`,
      likes: 8,
      verified: true
    }
  ]);

  const filters = ['all', '5 star', '4 star', 'with photos', 'verified'];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-secondary fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredReviews = reviews.filter(review => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === '5 star') return review.rating === 5;
    if (selectedFilter === '4 star') return review.rating === 4;
    if (selectedFilter === 'verified') return review.verified;
    return true;
  });

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-pinkBg to-soft">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4"
          >
            Customer Reviews
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90"
          >
            See what our happy customers have to say
          </motion.p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-secondary">500+</p>
              <p className="text-textDark/60">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-secondary">4.8</p>
              <p className="text-textDark/60">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-secondary">150+</p>
              <p className="text-textDark/60">With Photos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-secondary">100%</p>
              <p className="text-textDark/60">Verified Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex items-center space-x-4 overflow-x-auto pb-4">
          <Filter className="w-5 h-5 text-secondary" />
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full transition whitespace-nowrap ${
                selectedFilter === filter
                  ? 'bg-secondary text-white'
                  : 'bg-white text-textDark hover:bg-soft'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <div className="p-6">
                {/* User Info */}
                <div className="flex items-start space-x-4">
                  <img
                    src={review.userImage}
                    alt={review.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-textDark">{review.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <StarRating rating={review.rating} />
                          <span className="text-xs text-textDark/40">{review.date}</span>
                        </div>
                      </div>
                      {review.verified && (
                        <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="mt-4">
                  <p className="text-textDark/80">{review.comment}</p>
                </div>

                {/* Product Info */}
                <div className="mt-4 flex items-center justify-between">
                  <Link 
                    to={`/product/${review.id}`}
                    className="flex items-center space-x-2 group"
                  >
                    <img
                      src={review.productImage}
                      alt={review.product}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-textDark group-hover:text-secondary transition">
                        {review.product}
                      </p>
                      <p className="text-xs text-textDark/40">View Product</p>
                    </div>
                  </Link>

                  <button className="flex items-center space-x-1 text-textDark/40 hover:text-secondary transition">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{review.likes}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="bg-secondary hover:bg-primary text-white px-8 py-3 rounded-full font-semibold transition transform hover:scale-105">
            Load More Reviews
          </button>
        </div>

        {/* Write Review CTA */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-playfair font-bold mb-2 text-secondary">
            Have you tried our jewellery?
          </h2>
          <p className="text-textDark/70 mb-4">
            Share your experience and help others make their choice
          </p>
          <Link
            to="/write-review"
            className="inline-flex items-center bg-secondary hover:bg-primary text-white px-6 py-3 rounded-full font-semibold transition transform hover:scale-105"
          >
            Write a Review
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition flex items-center justify-center group"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 whitespace-nowrap">
            Chat with us
          </span>
        </a>
      </div>
    </div>
  );
};

export default ReviewsPage;