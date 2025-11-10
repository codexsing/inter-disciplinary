import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  Loader2,
  LogIn,
  Eye,
  EyeOff,
  Shield,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/home");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-gray-200 relative overflow-hidden">
      {/* Glowing background orbs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-700/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-indigo-800/20 blur-[120px] rounded-full" />

      {/* Navbar */}
      <nav className="bg-gray-900/70 border-b border-gray-700/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-90 transition"
          >
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg shadow-blue-500/20">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              BuildCost Pro
            </span>
          </Link>
        </div>
      </nav>

      {/* Main Section */}
      <div className="flex justify-center items-center min-h-[80vh] px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-md"
        >
          {/* Glow border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/40 to-indigo-500/40 rounded-3xl blur-xl opacity-50" />

          {/* Card */}
          <div className="relative bg-gray-900/70 backdrop-blur-xl border border-gray-700/60 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-600/30 mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-gray-400 mt-1 text-sm">
                Sign in to access your dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div>
                <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                  <User className="w-4 h-4" /> Username
                </label>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800/70 border border-gray-700 text-gray-100 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 transition-all duration-300 outline-none"
                  placeholder="Enter your username"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800/70 border border-gray-700 text-gray-100 p-3 pr-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 transition-all duration-300 outline-none"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 transition"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex justify-between text-sm text-gray-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-blue-500 w-4 h-4 rounded focus:ring-blue-500"
                  />
                  <span>Remember me</span>
                </label>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" /> Sign In
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="mt-8 border-t border-gray-700/50 pt-4 text-center text-sm text-gray-500">
              <p>
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
