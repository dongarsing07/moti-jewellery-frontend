// WriteReview.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const WriteReview = () => {
  const { productId } = useParams(); // if your route includes product id
  const navigate = useNavigate();

  // Check authentication (using the same user state from navbar)
  // For simplicity, we'll read from localStorage directly here.
  const user = JSON.parse(localStorage.getItem('user'));

  // If not logged in, redirect to login page with return url
  if (!user) {
    return <Navigate to={`/auth?returnTo=/write-review/${productId}`} replace />;
  }

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    if (!comment.trim()) {
      setError('Please write a comment');
      return;
    }

    setSubmitting(true);
    setError('');

    // Mock API call – replace with your actual endpoint
    try {
      // Example: await fetch('/api/reviews', { method: 'POST', body: JSON.stringify({ productId, rating, title, comment, userId: user.id }) })
      console.log('Submitting review:', { productId, rating, title, comment, user: user.email });
      // Simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));

      // After success, go back to product page or reviews list
      navigate(`/product/${productId}`); // adjust as needed
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-soft py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-playfair font-bold text-primary mb-2">
          Write a Review
        </h1>
        <p className="text-textDark/70 mb-6">Share your experience with this product</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Rating Stars */}
          <div className="mb-6">
            <label className="block text-textDark font-medium mb-2">Rating *</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-textDark font-medium mb-2">
              Review Title (optional)
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              className="w-full px-4 py-2 border border-pinkLight rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Review Comment */}
          <div className="mb-6">
            <label htmlFor="comment" className="block text-textDark font-medium mb-2">
              Your Review *
            </label>
            <textarea
              id="comment"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like or dislike? What was your experience like?"
              className="w-full px-4 py-2 border border-pinkLight rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default WriteReview;