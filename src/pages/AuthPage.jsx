import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, LogIn, UserPlus } from 'lucide-react';
import { loginUser, registerUser } from "../services/authService";

const AuthPage = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // ================= LOGIN =================
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser({
        email: loginData.email,
        password: loginData.password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Login successful ✅");
      navigate("/"); // redirect to home

    } catch (err) {
      alert(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ================= SIGNUP =================
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const res = await registerUser({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Signup successful ✅");
      navigate("/"); // redirect

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ================= HANDLERS =================
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-pinkBg to-soft flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-primary/20"
      >

        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-playfair font-bold text-secondary">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
        </div>

        {/* TOGGLE */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 rounded-full ${isLogin ? 'bg-secondary text-white' : 'bg-primary/10'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 rounded-full ${!isLogin ? 'bg-secondary text-white' : 'bg-primary/10'}`}
          >
            Sign Up
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={isLogin ? 'login' : 'signup'}>

            {/* ================= LOGIN ================= */}
            {isLogin ? (
              <form onSubmit={handleLoginSubmit} className="space-y-6">

                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                />

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Password"
                    required
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-secondary text-white py-3 rounded-lg"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

              </form>
            ) : (

              /* ================= SIGNUP ================= */
              <form onSubmit={handleSignupSubmit} className="space-y-5">

                <input
                  type="text"
                  name="name"
                  value={signupData.name}
                  onChange={handleSignupChange}
                  placeholder="Full Name"
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                />

                <input
                  type="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                />

                <input
                  type="password"
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  placeholder="Password"
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                />

                <input
                  type="password"
                  name="confirmPassword"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  placeholder="Confirm Password"
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-secondary text-white py-3 rounded-lg"
                >
                  {loading ? "Creating..." : "Sign Up"}
                </button>

              </form>
            )}

          </motion.div>
        </AnimatePresence>

      </motion.div>
    </div>
  );
};

export default AuthPage;